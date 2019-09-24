<template>
  <div class="login-container">
    <el-form class="login-form"  ref="form" :model="form" :rule="rules">
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
      <el-form-item prop="captcha" class="email-code">
        <div class="send-email-btn">
          <img @click="resetCaptcha" :src="code.captcha" alt="验证码"/>
        </div>
        <span class="svg-container">
          <i class="el-icon-user"></i>
        </span>
        <el-input
          ref="captcha"
          v-model="form.captcha"
          placeholder="验证码"
          name="captcha"
        >
        </el-input>
      </el-form-item>
      <el-button type="primary" @click.native.prevent="handleRegister">
        注册
      </el-button>
    </el-form>
  </div>
</template>

<script>
export default {
  layout: 'login',

  data() {
  	return {
      form: {
          email: '11111@qq.com',
          captcha: '1234'
      },
      rules: {
      	email: [
            {required: true, message: '请输入邮箱'},
            {type:"email", message:'请输入正确的邮箱格式'}
        ],
        captcha: [
            {required: true, message: '请输入验证码'},
        ],
      },
      code: {
      captcha: '/api/user/captcha'
      },
    }
  },
  methods: {
    resetCaptcha() {
      this.code.captcha = '/api/user/captcha?_t='+new Date().getTime()
    },
    handleRegister() {
      this.$refs.form.validate( async valid => {
      	if(valid){
          let obj = {
              email: this.form.email,
            captcha:this.form.captcha,
          }
          let ret = await this.$http.post('/user/register', obj)
              console.log(ret);
          }
      })
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
