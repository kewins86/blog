<template>
    <div class="article-item">
        <nuxt-link :to='"/article/"+article._id'>
            <h2 style="width: 900px">
                {{article.title}}
            </h2>
        </nuxt-link>
        <p>
            <UserDisplay :user="article.author"></UserDisplay>
            <span class="action">
                <i class="el-icon-view">{{article.views}}</i>
            </span>
            <span class="action">
                <i class="el-icon-thumb">{{article.like}}</i>
            </span>
            <span class="action">
                <i class="el-icon-thumb">{{article.dislike}}</i>
            </span>
        </p>
    </div>
</template>

<script>
import UserDisplay from './UserDisplay.vue'
export default {
  name: "ArticleItem",
  props: ['article'],
  components: { UserDisplay }
}
</script>

<style lang='scss'>
.article-item{
    padding:20px 15px;
    border-bottom:2px solid #eee;
    a{
        color:#67c23a;
    }
    .action{
        display:inline-block;
        width:50px;

    }
}
</style>
