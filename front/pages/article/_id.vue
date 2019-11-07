<template>
    <div class="ssContainer">
        <UserDisplay :user="article.author">
            <el-button type="success" v-if="isFollow" @click="unfollow">已关注</el-button>
            <el-button v-else @click="follow">关注</el-button>
        </UserDisplay>
        <el-divider></el-divider>
        <div class="article" v-html="article.article_html"></div>
        <el-divider></el-divider>
        <div class="action">
            <el-button @click="likeAction" :type="likeStatus ? 'success' : 'info'">
                <i class="el-icon-thumb">{{article.like}}</i>
            </el-button>
            <el-button @click="dislikeAction" :type="dislikeStatus ? 'success' : 'info'">
                <i class="el-icon-lightning">{{article.dislike}}</i>
            </el-button>
        </div>
    </div>
</template>

<script>
import  UserDisplay from '~/components/UserDisplay.vue'
export default {
  components: {UserDisplay},
  data() {
  	return {
  		likeStatus: false,
		dislikeStatus: false,
        isFollow: false,
        article: {
          title: '' ,
          views: 0,
          author: {}
        }
    }
  },
  mounted() {
	let { id } = this.$route.params
    this.id = id
    this.getArticle()
    let token = localStorage.getItem('token')
    if(token){
      this.getLikeStatus()
    }
  },
  methods: {
  	async follow() {
      let ret = await this.$http.put('/user/follow/' + this.article.author._id)
      this.checkFollowStates()
    },
    // 点赞
    async likeAction() {
      let likeType = this.likeStatus ? 'delete' : 'put'
      if (this.dislikeStatus === false) {
        let offset = this.likeStatus ? -1 : 1
        let ret = await this.$http[likeType]('/user/likeArticle/' + this.id)
        if(ret.code == 0) {
          this.getLikeStatus()
          this.article.like += offset
          this.$notify({
            title : ret.message,
            type: 'success'
          })
        }
      } else {
        this.$notify({
          title : '踩过不能赞',
          type: 'error'
        })
      }
    },
    // 踩
    async dislikeAction() {
      let disliketType = this.dislikeStatus ? 'delete' : 'put'
      if (this.likeStatus === false) {
        let offset = this.dislikeStatus ? -1 : 1
        let ret = await this.$http[disliketType]('/user/disLikeArticle/' + this.id)
        if(ret.code == 0) {
            this.getLikeStatus()
            this.article.dislike += offset
            this.$notify({
                title : ret.message,
                type: 'success'
            })
        }
      } else {
        this.$notify({
          title : '赞过不能踩',
          type: 'error'
        })
      }

    },
    async unfollow() {
      let ret = await this.$http.delete('/user/follow/' + this.article.author._id)
      this.checkFollowStates()
    },
    // 获取用户对当前文章赞和踩的状态
  	async getArticle() {
      let ret = await this.$http.get('/article/'+this.id)
      this.article = ret.data
      this.checkFollowStates()
    },
    // 查询我和文章作者的关注关系
    async checkFollowStates() {
  	  let isFollow = await this.$http.get('/user/isfollow/' + this.article.author._id)
      if(isFollow.code==0){
      	this.isFollow =  isFollow.data.isFollow
      }
    },
    async getLikeStatus() {
      let ret = await this.$http.get('/user/article/' + this.id)
      if(ret.code==0){
        this.likeStatus = ret.data.like
        this.dislikeStatus = ret.data.dislike
      }
    },
  }
}
</script>

<style scoped>

</style>
