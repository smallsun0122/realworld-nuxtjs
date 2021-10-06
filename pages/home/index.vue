<template>
  <div class="home-page">

    <div class="banner">
      <div class="container">
        <h1 class="logo-font">conduit</h1>
        <p>A place to share your knowledge.</p>
      </div>
    </div>

    <div class="container page">
      <div class="row">
        <div class="col-md-9">
          <div class="feed-toggle">
            <ul class="nav nav-pills outline-active">
              <li v-if="user" class="nav-item">
                <nuxt-link exact :to="{ name: 'home', query: { tab: 'your_feed' }}" class="nav-link" :class="{ active: tab === 'your_feed' }" href="">Your Feed</nuxt-link>
              </li>
              <li class="nav-item"> 
                <nuxt-link exact :to="{ name: 'home', query: { tab: 'global_feed' }}" class="nav-link" :class="{ active: tab === 'global_feed' }" href="">Global Feed</nuxt-link>
              </li>
               <li v-if="tag" class="nav-item">
                 <!-- 标签导航要携带两个参数 -->
                <nuxt-link :to="{ name: 'home', query: { tab: 'tag', tab: tab }}" :class="{ active: tab === 'tag' }" class="nav-link" href="">#{{ tag }}</nuxt-link>
              </li>
            </ul>
          </div>

          <div class="article-preview" v-for="art in articles" :key="art.slug">
            <div class="article-meta">
              <nuxt-link :to="{name: 'profile', params: { username: art.author.username }}"><img :src="art.author.image" /></nuxt-link>
              <div class="info">
                <nuxt-link :to="{name: 'profile', params: { username: art.author.username }}">{{art.author.username}}</nuxt-link>
                <span class="date">{{ art.createdAt | date('MMM DD,YYYY')}}</span>
              </div>
              <button @click="onClickFavorite(art)" :disabled="art.favoriteDisabled" class="btn btn-outline-primary btn-sm pull-xs-right" :class="{ active: art.favorited }">
                <i class="ion-heart"></i> {{art.favoritesCount}}
              </button>
            </div>
            <nuxt-link :to="{name: 'article', params: { slug: art.slug }}" class="preview-link">
              <h1>{{ art.title }}</h1>
              <p>{{ art.description }}</p>
              <span>Read more...</span>
            </nuxt-link>
          </div>

          <!-- 分页 -->
          <nav>
            <ul class="pagination">
              <li class="page-item" :class="{ active: item === page}" v-for="item in totalPage" :key="item">
                <nuxt-link :to="{ name: 'home', query: { page: item, tag: $route.query.tag, }}" class="page-link" href="">{{ item }}</nuxt-link>
              </li>
            </ul>
          </nav>
        </div>

        <div class="col-md-3">
          <div class="sidebar">
            <p>Popular Tags</p>

            <div class="tag-list">
              <!-- tab 用于标识当前选中高亮 -->
              <nuxt-link :to="{ name: 'home', query: { tag: tag, tab: 'tag' }}" v-for="tag in tagList" :key="tag" href="" class="tag-pill tag-default">{{ tag }}</nuxt-link>
            </div>
          </div>
        </div>

      </div>
    </div>

  </div>
</template>

<script>
import { getArticles, getFeedArticles, addFavorite, delteFavorite } from '@/api/article';
import { getTags } from '@/api/tag';
import { mapState } from 'vuex'

export default {
  name: 'Article',
  async asyncData ({ query }) {
    const page = Number.parseInt(query.page || 1)
    const limit = 20
    const { tag, tab } = query

    const tabName = tab || 'global_feed'
    const methods = tabName === 'global_feed' ? getArticles : getFeedArticles

    const [ artRes, tagRes ] = await Promise.all([
      methods({
        limit,
        offset: (page - 1) * limit,
        tag
      }),
      getTags()
    ])
 
    const { articles, articlesCount } = artRes.data
    const { tags } = tagRes.data

    // 标记快速点击时禁用点赞按钮
    articles.forEach(article => article.favoriteDisabled = false);

    return {
      articles,
      articlesCount,
      tagList: tags,
      limit,
      page,
      tag,
      tab: tab || 'global_feed'
    }
  },
  // 监听路由参数变化，调用 asyncDate 刷新数据
  watchQuery: ['page', 'tag', 'tab'],
  computed: {
    ...mapState(['user']),
    totalPage() {
      return  Math.ceil(this.articlesCount / this.limit)
    }
  },
  methods: {
    async onClickFavorite(article) {
      article.favoriteDisabled = true;

      const methods = article.favorited ? delteFavorite : addFavorite;
      await methods(article.slug);

      if (article.favorited) {
        article.favorited = false;
        article.favoritesCount -= 1;
      } else {
        article.favorited = true;
        article.favoritesCount += 1;
      }

      article.favoriteDisabled = false;
    }
  }
}
</script>