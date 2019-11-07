<template>
    <div>
        <div class="write-btn">
            <el-button @click="submit" type="primary">发布</el-button>
        </div>
        <el-row>
            <el-col :span="12">
                <textarea class="md-editor" :value="content" @input="update"></textarea>
            </el-col>
            <el-col :span="12">
                <div class="markdown-body" v-html="compiledHtml">
                    <!--html显示-->
                </div>
            </el-col>
        </el-row>
    </div>
</template>

<script>
import debounce from 'lodash/debounce'
import marked from 'marked'
export default {
  name: "new",
  layout: "login",
  data() {
    return {
        content: `# new
      * vue入门教程

      `
    }
  },
  methods: {
  	update: debounce(function (e) {
      this.content = e.target.value
    },350),
    async submit() {
      let ret = await this.$http.post('/article/create', {content: this.content})
      if(ret.code==0){
      	this.$notify({
          title:'创建成功',
          type:'success',
          message:`文章《${ret.data.title}》发布成功`
        })
        setTimeout(()=>{
        	this.$router.push({path:'/article/'+ ret.data.id})
        },1000)
      }
    }
  },
  computed: {
  	compiledHtml() {
  		return marked(this.content)
    }
  }
}
</script>

<style scoped>
    .md-editor{
        width:100%;
        height:100vh;
        outline:none;
    }
    .markdown-body{
        height:100vh;
        overflow-y:scroll;
    }
    .write-btn{
        position: fixed;
        z-index:100;
        right:10px;
        top:10px;
    }
</style>
