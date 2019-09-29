<template>
  <div class="login-container">
    <el-form class="login-form"  ref="form" :model="form">
      <div class="title-container">
        <img src="/logo.png" alt="logo" />
      </div>
      <el-form-item prop="email">
        <span class="svg-container">
          <i class="el-icon-mobile"></i>
        </span>
        <el-input
          ref="email"
          v-model="form.email"
          placeholder="邮箱"
          name="email"
        >
        </el-input>
      </el-form-item>
      <el-form-item prop="password">
        <span class="svg-container">
          <i class="el-icon-lock"></i>
        </span>
        <el-input
          ref="password"
          v-model="form.password"
          placeholder="密码"
          name="password"
          type="password"
        >
        </el-input>
      </el-form-item>
      <!--<el-form-item prop="captcha" class="email-code">-->
        <!--<div class="send-email-btn">-->
          <!--<img @click="resetCaptcha" :src="code.captcha" alt="验证码"/>-->
        <!--</div>-->
        <!--<span class="svg-container">-->
          <!--<i class="el-icon-user"></i>-->
        <!--</span>-->
        <!--<el-input-->
          <!--ref="captcha"-->
          <!--v-model="form.captcha"-->
          <!--placeholder="验证码"-->
          <!--name="captcha"-->
        <!--&gt;-->
        <!--</el-input>-->
      <!--</el-form-item>-->
      <el-button type="primary" @click.native.prevent="handleLogin">
        登录
      </el-button>
    </el-form>
  </div>
</template>

<script>
import md5 from 'md5'
export default {
  layout: 'login',
  data() {
  	return {
      form: {
        email: '11111@qq.com',
        password: '12345'
      }
    }
  },
  methods: {
    async handleLogin() {
     let ret= await this.$http.post('/user/login', {
      	email: this.form.email,
        password:md5(this.form.password)
      })
      if(ret.code == 0) {
      	localStorage.setItem('token', ret.data.token)
        this.$notify({
          title: '登录成功',
          type: "success",
        })
        setTimeout(() => {
        	this.$router.push({path:'/'})
        },1000)
      }
      console.log('登录', ret);
    }
  }
}
</script>


<style lang="scss">
  .email-code{
    width:340px;
    position: relative;
    .send-email-btn{
      position: absolute;
      right:-110px;
      .el-button{
        width:90px;
        height:50px;
      }
      img{
        width:90px;
        height:50px;
        cursor: pointer;
      }
    }
  }
</style>
