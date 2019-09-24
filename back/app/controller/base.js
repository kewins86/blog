const Controller = require('egg').Controller;


// controller的父类， 提供公用方法
class BaseController extends Controller {
	// 提供成功数据的
	success(data){
		this.ctx.body = {
			code:0,
			data
		}
	}
	// 提供成功消息
	message(msg){
		this.ctx.body ={
			code:0,
			message:msg
		}
	}
	error(msg, code=-1){
		this.ctx.body = {
			code,
			message:msg
		}
	}
}

module.exports = BaseController;
