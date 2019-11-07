// 中间件
// 路由中使用
module.exports = ({app})=>{
	return async function verify(ctx,next){
		// 获取token + 认证
		const token = ctx.request.header.authorization.replace('Bearer ','')
		try{
			let ret = await app.jwt.verify(token, app.config.jwt.secret)
			ctx.state.email = ret.email
			ctx.state.userid = ret._id
			await next()
		}catch(err){
			if(err.name=="TokenExpiredError"){
				return ctx.body = {
					code:-666, // token的过期的码
					message:'登录过期'
				}
			}
			console.log('中间件错误',err)
		}
	}
}
