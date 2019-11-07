'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
	const { router, controller } = app;
	const jwt = app.middleware.jwt({app});
	router.get('/', controller.home.index);

	// 这个接口，需要登录后 才能获取到
	// 从token信息中，拿到用户数据，然后查库 返回
	router.get('/user/info',jwt, controller.user.info);
	router.get('/user/captcha',controller.user.captcha);
	router.post('/user/register',controller.user.create);
	router.post('/user/login',controller.user.login);
	router.get('/user/isfollow/:id', jwt, controller.user.isFollow);
	router.put('/user/follow/:id', jwt, controller.user.follow);
	router.delete('/user/follow/:id', jwt, controller.user.unfollow);
	router.get('/user/:id/following',controller.user.following);
	router.get('/user/:id/followers',controller.user.followers);
	router.get('/user/article/:id', jwt, controller.user.articleStatus);
	router.put('/user/likeArticle/:id', jwt, controller.user.likeArticle);
	router.delete('/user/likeArticle/:id', jwt, controller.user.cancelLikeArticle);
	router.put('/user/disLikeArticle/:id', jwt, controller.user.dislikeArticle);
	router.delete('/user/disLikeArticle/:id', jwt, controller.user.cancelDislikeArticle);

	router.group({ name:"article", prefix:'/article'}, router=>{
		let { create, detail, list } = controller.article
		router.post('/create',jwt, create)
		router.get('/:id', detail)
		router.get('/', list)
	})
};
