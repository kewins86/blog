'use strict';
const md5 = require('md5')
const BaseController = require('./base');

let HashSalt = 'Kaikeba@123#$!321'
class UserController extends BaseController {
	async info() {
		let {ctx} = this
		let {email} = ctx.state
		const user = await this.checkEmail(email)
		this.success(user)
	}
	// 验证码
	async captcha() {
		const { ctx } = this
		const captcha = this.service.tools.captcha()
		ctx.session.captcha = captcha.text
		ctx.response.type = 'image/svg+xml'
		ctx.body = captcha.data
	}
	// 查询email，该用户是否存在
	async checkEmail(email){
		const user = await this.ctx.model.User.findOne({email})
		return user
	}
	// 登录
	async login() {
		const { ctx, app } = this
		const { email, password } = ctx.request.body
		let user = await ctx.model.User.findOne({
			email,
			password: md5(password + HashSalt),
		})
		if(user) {
			let { nickname } = user
			const token = app.jwt.sign({
				nickname,
				email,
				_id: user._id
			}, app.config.jwt.secret, {
				expiresIn:'1h'
			})
			this.success({token,email,nickname})
		}else {
			this.error('用户名密码错误')
		}
	}
	// 创建用户
	async create() {
		const { ctx } = this
		const { captcha, email, password, nickname} = ctx.request.body
		if(captcha.toUpperCase() == ctx.session.captcha.toUpperCase()){
			if(await this.checkEmail(email)){
				return this.success('邮箱已存在')
			}
			let ret = await ctx.model.User.create({
				email,
				nickname,
				password: md5(password + HashSalt) //密码再次加盐加密
			})
			if (ret._id) {
				this.success('新增成功')
			}

		}else {
			this.error('验证码错误')
		}
	}
}

module.exports = UserController;
