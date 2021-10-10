<template>
  <div class="profile-page">

    <div class="user-info">
      <div class="container">
        <div class="row">

          <div class="col-xs-12 col-md-10 offset-md-1">
            <img :src="profile.image" class="user-img" />
            <h4>{{ profile.username }}</h4>
            <p>
              {{ profile.bio }}
            </p>
            <button class="btn btn-sm btn-outline-secondary action-btn">
              <i class="ion-plus-round"></i>
              &nbsp;
              Follow {{ profile.username }}
            </button>
          </div>

        </div>
      </div>
    </div>

    <div class="container">
      <div class="row">

        <div class="col-xs-12 col-md-10 offset-md-1">
          <div class="articles-toggle">
            <ul class="nav nav-pills outline-active">
              <li class="nav-item">
                <nuxt-link exact :to="{ name: 'profile', query: { tab: 'my_article' }}" :class="{ active: tab === 'my_article' }" class="nav-link">
                  My Articles
                </nuxt-link>
              </li>
              <li class="nav-item">
                <nuxt-link exact :to="{ name: 'profile', query: { tab: 'favorited_article' }}" :class="{ active: tab === 'favorited_article' }" class="nav-link">
                  Favorited Articles
                </nuxt-link>
              </li>
            </ul>
          </div>

          <article-list ref="article" api-url="/api/articles" :payload="payload" />

        </div>

      </div>
    </div>

  </div>

</template>

<script>
import { getProfiles } from '@/api/user'
import ArticleList from '../components/article-list.vue';

export default {
  middleware: 'authenticated',
  name: 'UserProfile',
  watchQuery: ['tab'],
  components: {
    ArticleList
  },
  async asyncData({ params, query, app }) {
    const { username } = params;
    const { tab } = query;

    const tabName = tab || 'my_article';
    const params_name = tabName === 'my_article' ? 'author' : 'favorited';

    const { data } = await getProfiles(username);
    const { profile } = data;

    const payload = {
      [params_name]: username
    }

    return { 
      profile, 
      tab: tabName,
      payload
    }
  }
}
</script>