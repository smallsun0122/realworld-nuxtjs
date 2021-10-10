<template>
  <div class="editor-page">
    <div class="container page">
      <div class="row">

        <div class="col-md-10 offset-md-1 col-xs-12">
          <form>
            <fieldset>
              <fieldset class="form-group">
                  <input v-model="article.title" type="text" class="form-control form-control-lg" placeholder="Article Title">
              </fieldset>
              <fieldset class="form-group">
                  <input v-model="article.description" type="text" class="form-control" placeholder="What's this article about?">
              </fieldset>
              <fieldset class="form-group">
                  <textarea v-model="article.body" class="form-control" rows="8" placeholder="Write your article (in markdown)"></textarea>
              </fieldset>
              <fieldset class="form-group">
                  <input v-model="article.tagList" type="text" class="form-control" placeholder="Enter tags"><div class="tag-list"></div>
              </fieldset>
              <button @click="onSubmit" class="btn btn-lg pull-xs-right btn-primary" type="button">
                  Publish Article
              </button>
            </fieldset>
          </form>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
import { addArticles } from '@/api/article'

export default {
  // 引入中间件校验是否登录
  middleware: 'authenticated',
  name: 'Editor',
  data() {
    return {
      article: {
        title: "",
        description: "",
        body: "",
        tagList: null
      }
    }
  },
  methods: {
    async onSubmit() {
      const { data } = await addArticles({ article: this.article });
      const { article } = data

      this.$router.push(`/article/${article.slug}`);
    }
  }
}
</script>

<style>

</style>