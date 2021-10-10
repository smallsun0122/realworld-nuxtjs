<template>
  <div>
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
</template>

<script>
import { request } from '@/plugins/request';
import { addFavorite, delteFavorite } from '@/api/article';

export default {
  name: 'ArticleList',
  props: {
    apiUrl: {
      type: String,
      require: true
    },
    payload: {
      type: Object,
      default: () => {}
    }
  },

  watch: {
    apiUrl: {
      handler(newApi, oldApi) {
        this.getArticleList();
      },
      immediate: true
    },
    payload: {
      handler(newVal, oldVal) {
        this.getArticleList();
      }
    }
  },

  computed: {
    totalPage() {
      return Math.ceil(this.articlesCount / this.limit)
    }
  },

  data() {
    return {
      articles:[],
      articlesCount: 0,
      limit: 20,
      page: 1
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
    },
    async getArticleList() {
      const { query } = this.$route
      const page = Number.parseInt(query.page || 1)
      const limit = this.limit

      const params = {
        limit,
        offset: (page - 1) * limit,
      }

      const { data } = await this.onArticle({ ...this.payload, ...params});
      const { articles, articlesCount } = data;

      // 标记快速点击时禁用点赞按钮
      articles.forEach(article => article.favoriteDisabled = false);

      this.articles = articles;
      this.articlesCount = articlesCount;
      this.page = page;
    },
    onArticle(params) {
      return request({
        method: 'GET',
        url: this.apiUrl,
        params
      })
    }
  }
}
</script>