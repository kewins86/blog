'use strict';

const BaseController = require('./base');

class UserController extends BaseController {
	async info() {
		this.success({
			name:'kkb'
		})
	}
	async captcha() {
		const { ctx } = this
		const captcha = this.service.tools.captcha()
		ctx.response.type = 'image/svg+xml'
		ctx.session.captcha = captcha.text
		ctx.body = captcha.data
	}
	async create() {
		const { ctx } = this
		const { captcha } = ctx.request.body
		if(captcha.toUpperCase() == ctx.session.captcha.toUpperCase()){
			this.success('新增成功')
		}else {
			this.error('验证码错误111')
		}
	}
}

module.exports = UserController;
