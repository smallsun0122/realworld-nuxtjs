<template>
  <div>
    <form class="card comment-form">
      <div class="card-block">
        <textarea v-model="comment.body" class="form-control" placeholder="Write a comment..." rows="3"></textarea>
      </div>
      <div class="card-footer">
        <img :src="user.image" class="comment-author-img" />
        <button class="btn btn-sm btn-primary" @click="onSubmit">
          Post Comment
        </button>
      </div>
    </form>
    
    <div class="card" v-for="comment in comments" :key="comment.id">
      <div class="card-block">
        <p class="card-text">{{ comment.body }}</p>
      </div>
      <div class="card-footer">
        <nuxt-link :to="{name: 'profile', params: { username: comment.author.username }}" class="comment-author">
          <img :src="comment.author.image" class="comment-author-img" />
        </nuxt-link>
        &nbsp;
        <nuxt-link :to="{name: 'profile', params: { username: comment.author.username }}" class="comment-author">{{ comment.author.username }}</nuxt-link>
        <span class="date-posted">{{ comment.createdAt | date('MMM DD')}}</span>
        <div class="del-block" @click="onDelte(comment.id)"><i class="ion-trash-a"></i></div>
      </div>
    </div>
  </div>
</template>

<script>
import { getComments, addComments, deleteComments } from '@/api/article';
import { mapState } from 'vuex';

export default {
  name: 'ArticleComment',
  props: {
    article: {
      type: Object,
      require: true,
      default: () => {}
    }
  },
  data() {
    return {
      comments: [], // 文章列表
      comment: {
        body: '' // 文章评论内容
      }
    }
  },
  computed: {
    ...mapState(['user'])
  },
  async mounted() {
    const { data } = await getComments(this.article.slug);
    this.comments = data.comments
  },
  methods: {
    async onSubmit() {
      await addComments(this.article.slug, { comment: this.comment })
    },
    async onDelte(id) {
      await deleteComments(this.article.slug, id);
      const idx = this.comments.find(item => item.id === id);

      this.comments.splice(idx, 1);
    }
  }
}
</script>

<style scoped>
.del-block {
  position: absolute;
  bottom: 15px;
  right: 15px;
  cursor: pointer;
}
</style>