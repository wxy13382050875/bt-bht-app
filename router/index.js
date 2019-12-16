import Vue from 'vue'
import store from '@/store'
import routesList from '@/router/routes'
import Router from '@/third/uni-app-router';

Vue.use(Router);

const router = new Router({
	routes: routesList
});

router.beforeEach((to, from, next) => {
	store.state.utp.curUrl = to.path
	let {
		isLogin,
		userInfo
	} = store.state.user
	let {
		requiresAuth
	} = to.meta.auth
	
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
		}else{
			//判断用户是否填写资料 跳转到填写资料界面
			if(userInfo.name === null || userInfo.name===''){
				
			}else{
				next()
			}
		}
	} else {
		next()
	}
	
})

router.afterEach((to, from) => {

})

export default router
