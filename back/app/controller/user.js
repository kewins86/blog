'use strict';
const md5 = require('md5')
const BaseController = require('./base');

let HashSalt = 'Kaikeba@123#$!321'
class UserController extends BaseController {
	async info() {
		let { ctx } = this
		let { email } = ctx.state
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

	async isFollow(){
		// 把关注的用户id 放在following字段李
		const { ctx } = this
		let me = await ctx.model.User.findById(ctx.state.userid)
		const isFollow = !!me.following.find(v=> v.toString() == ctx.params.id)
		this.success({isFollow})
	}

	// 关注
	async follow() {
		const { ctx } = this
		let me = await ctx.model.User.findById(ctx.state.userid)
		const isFollow = !!me.following.find(v=> v.toString() == ctx.params.id)
		if(!isFollow) {
			me.following.push(ctx.params.id)
			me.save()
			this.message('关注成功')
		}
	}

	// 取消关注
	async unfollow() {
		const { ctx } = this
		let me = await ctx.model.User.findById(ctx.state.userid)
		const index = me.following.map(id => id.toString()).indexOf(ctx.params.id)
		if(index>-1) {
			me.following.splice(ctx.params.id)
			me.save()
			this.message('取消成功')
		}
	}

	// load关注的人
	async following() {
		const { ctx } = this
		const users = await ctx.model.User.findById(ctx.params.id).populate('following')
		this.success(users.following)
	}

	// load粉丝
	async followers() {
		const { ctx } = this
		const users = await ctx.model.User.find({following: ctx.params.id})
		this.success(users)
	}
	async articleStatus () {
		const { ctx } = this
		const me = await ctx.model.User.findById(ctx.state.userid)
		let like = !!me.likeArticle.find(id => id.toString() == ctx.params.id)
		let dislike = !!me.disLikeArticle.find(id => id.toString() == ctx.params.id)
		this.success({
			like,
			dislike
		})
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

	// 点赞
	async likeArticle () {
		const { ctx } = this
		const me = await ctx.model.User.findById(ctx.state.userid)

		if(!me.likeArticle.find(id => id.toString() == ctx.params.id)){
			me.likeArticle.push(ctx.params.id)
			me.save()
			await ctx.model.Article.findByIdAndUpdate(ctx.params.id, { $inc: { like: 1 } })
			return this.message('点赞成功')
		}
		return this.message('点过了')
	}

	// 取消点赞
	async cancelLikeArticle () {
		const { ctx } = this
		const me = await ctx.model.User.findById(ctx.state.userid)
		const index = me.likeArticle.map(id => id.toString()).indexOf(ctx.params.id)
		if(index > -1) {
			me.likeArticle.splice(index, 1)
			me.save()
			await ctx.model.Article.findByIdAndUpdate(ctx.params.id, { $inc: { like: -1 } })
			return this.message('取消成功')
		}
	}

	// 踩
	async dislikeArticle () {
		const { ctx } = this
		const me = await ctx.model.User.findById(ctx.state.userid)

		if(!me.disLikeArticle.find(id => id.toString() == ctx.params.id)){
			me.disLikeArticle.push(ctx.params.id)
			me.save()
			await ctx.model.Article.findByIdAndUpdate(ctx.params.id, { $inc: { dislike: 1 } })
			return this.message('踩成功')
		}
		return this.message('踩过了')
	}

	// 取消踩
	async cancelDislikeArticle () {
		const { ctx } = this
		const me = await ctx.model.User.findById(ctx.state.userid)
		const index = me.disLikeArticle.map(id => id.toString()).indexOf(ctx.params.id)
		if(index > -1) {
			me.disLikeArticle.splice(index, 1)
			me.save()
			await ctx.model.Article.findByIdAndUpdate(ctx.params.id, { $inc: { dislike: -1 } })
			return this.message('取消成功')
		}
	}
}

module.exports = UserController;
