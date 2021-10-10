<template>
  <div class="home-page">

    <div class="banner">
      <div class="container">
        <h1 class="logo-font">小太阳</h1>
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

          <article-list :api-url="api" :payload="payload"/>

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
import { getTags } from '@/api/tag';
import { mapState } from 'vuex'
import ArticleList from '../components/article-list.vue';

export default {
  name: 'Article',
  components: {
    ArticleList
  },
  data() {
    return {
      api: '/api/articles'
    }
  },
  async asyncData ({ query }) {
    const { tag, tab } = query

    const tabName = tab || 'global_feed'
    const api = tabName === 'global_feed' ? '/api/articles' : '/api/articles/feed'

    const { data } = await getTags();
    const payload = {
      tag
    }

    return {
      tagList: data.tags,
      tag,
      tab: tab || 'global_feed',
      api,
      payload
    }
  },
  // 监听路由参数变化，调用 asyncDate 刷新数据
  watchQuery: ['page', 'tag', 'tab'],
  computed: {
    ...mapState(['user'])
  }
}
</script>