<template>
  <div class="article-page">

  <div class="banner">
    <div class="container">

      <h1>{{article.title}}</h1>

      <Meta :article="article"/>

    </div>
  </div>

  <div class="container page">

    <div class="row article-content">
      <div class="col-md-12" v-html="article.body">
      </div>
      <ul class="tag-list">
        <li class="tag-default tag-pill tag-outline" v-for="tag in article.tagList" :key="tag">
          {{tag}}
        </li>
      </ul>
    </div>

    <hr />

    <div class="article-actions">
      <Meta :article="article"/>
    </div>

    <div class="row">

      <div class="col-xs-12 col-md-8 offset-md-2">
          <Comment v-if="user" :article="article" />
          <Unlogin v-else />
      </div>

    </div>
  </div>

</div>
</template>

<script>
import MarkdownIt from 'markdown-it';
import { mapState } from 'vuex';
import { getArticle } from '@/api/article';
import Meta from './components/meta';
import Comment from './components/comment';
import Unlogin from './components/unlogin';

export default {
  name: 'ArticleIndx',
  components: {
    Meta,
    Comment,
    Unlogin
  },
  async asyncData ({ params }) {
    const { data } = await getArticle(params.slug)
    const { article } = data
    const md = new MarkdownIt()
    article.body = md.render(article.body)
    return {
      article: article
    }
  },
  head() {
    return {
      title: `${this.article.title} - RealWorld`,
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: this.article.description
        }
      ]
    }
  },
  computed: {
    ...mapState(['user'])
  },
}
</script>