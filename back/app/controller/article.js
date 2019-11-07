'use strict';
const BaseController = require('./base');
const marked = require('marked')

class ArticleController extends BaseController {
	async list() {
		const { ctx } = this
		let ret = await ctx.model.Article.find().populate('author')
		this.success(ret)
	}
	async detail() {
		const { ctx } = this
		const { id } = ctx.params
		let info = await ctx.model.Article.findOneAndUpdate({_id:id}, {$inc:{'views':1}}).populate('author')
		this.success(info)
	}
	async create() {
		let { ctx } = this
		let { userid } = ctx.state
		const { content } = ctx.request.body
		let title = content.split('\n').find(v=>{
			return v.indexOf('# ') == 0
		})
		let obj = {
			title: title.replace('# ', ''),
			article: content,
			article_html: marked(content),
			author: userid,
		}
		let ret = await ctx.model.Article.create(obj)
		if(ret._id) {
			this.success({
				id: ret._id,
				title: obj.title,
			})
		}else {
				this.error('创建失败')
		}
	}

}

module.exports = ArticleController;
