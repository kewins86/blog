<template>
  <div class="ssContainer">
    <div>
      <ArticleItem
        v-for="article in articles"
        :article="article"
        :key="article._id"
      >
      </ArticleItem>
    </div>
  </div>
</template>

<script>
import ArticleItem from '~/components/ArticleItem.vue'

export default {
  components: {
    ArticleItem
  },
  data () {
  	return {
  		articles: []
    }
  },
  async mounted () {
    const ret = await this.$http.get('/article')
    if (ret.code == 0){
        this.articles = ret.data
    }
  },
}
</script>

<style>
.container {
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}
.title {
  font-family: 'Quicksand', 'Source Sans Pro', -apple-system, BlinkMacSystemFont,
  'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  display: block;
  font-weight: 300;
  font-size: 100px;
  color: #35495e;
  letter-spacing: 1px;
}

.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}

.links {
  padding-top: 15px;
}
</style>
