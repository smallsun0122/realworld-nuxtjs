<template>
  <div class="article-meta">
    <nuxt-link :to="{name: 'profile', params: { username: article.author.username }}"><img :src="article.author.image" /></nuxt-link>
    <div class="info">
      <nuxt-link :to="{name: 'profile', params: { username: article.author.username }}">{{ article.author.username }}</nuxt-link>
      <span class="date">{{ article.createdAt | date('MMM DD') }}</span>
    </div>
    <button :class="{ active: article.author.following }" class="btn btn-sm btn-outline-secondary">
      <i class="ion-plus-round"></i>
      &nbsp;
      Follow {{ article.author.username }} <span class="counter">(10)</span>
    </button>
    &nbsp;&nbsp;
    <button :class="{ active: article.favorited }" class="btn btn-sm btn-outline-primary">
      <i class="ion-heart"></i>
      &nbsp;
      Favorite Post <span class="counter">({{ article.favoritesCount }})</span>
    </button>
  </div>
</template>

<script>
export default {
  name: 'ArticleMeta',
  props: {
    article: {
      type: Object,
      require: true,
      default: () => {}
    }
  }
}
</script>