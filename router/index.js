import Vue from 'vue'
import store from '@/store'
import routesList from '@/router/routes'
import Router from '@/third/uni-app-router';

Vue.use(Router);

const router = new Router({
	routes: routesList
});

router.beforeEach((to, from, next) => {
	let {
		requiresAuth,
		civilStatus
	} = to.meta.auth;
	let isLogin = uni.getStorageSync("isLogin");
	if (requiresAuth) {
		//判断是否登录
		if (!isLogin) {
			next({
				path: '/pages/common/login',
				query: {
					// redirect: to.meta.title
				},
				NAVTYPE: 'push'
			})
		} else {
			let {
				roleId,
				customs
			} = uni.getStorageSync('userInfo');
			if (roleId == 2 && civilStatus) {
				if (customs == undefined) {
					next({
						path: '/pages/user/edit-profile',
						query: {
							// redirect: to.meta.title
						},
						NAVTYPE: 'push'
					})
				} else {
					next();
				}
			} else {
				next();
			}

		}
	} else {
		next()
	}

})

router.afterEach((to, from) => {

})

export default router
