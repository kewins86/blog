
// 用户字段设计
module.exports = app=>{
	let mongoose = app.mongoose
	let Schema = mongoose.Schema

	// 定义一个用户模型
	const UserSchema = new Schema({
		__v:{type:Number, select:false},
		email: {type:String, required:true},
		password: {type:String, required:true, select:false},
		nickname: {type:String, required:true},
		avatar: {type:String, required:false, default:'/user.png'},
		following:{
			type:[ { type:Schema.Types.ObjectId, ref:'User'} ]
		},
		likeArticle:{
			type:[ { type:Schema.Types.ObjectId, ref:'Article'} ]
		},
		disLikeArticle:{
			type:[ { type:Schema.Types.ObjectId, ref:'Article'} ]
		},
		// 关注用户
		// 喜欢的文章
	}, { timestamps:true})
	return mongoose.model('User', UserSchema)
}
