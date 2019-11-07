
// 用户字段设计
module.exports = app=>{
	let mongoose = app.mongoose
	let Schema = mongoose.Schema

	// 定义一个用户模型
	const ArticleSchema = new Schema({
		__v:{type:Number, select:false},
		title: {type:String, required:true},
		article: {type:String, required:true, select:false},
		article_html: {type:String, required:true},
		author: {
			type:Schema.Types.ObjectId,
			ref: 'User',
			required:true
		},
		views:{type:Number, required:false, default: 1},
		like:{type:Number, required:false, default: 0},
		dislike:{type:Number, required:false, default: 0}
	})
	return mongoose.model('Article', ArticleSchema)
}
