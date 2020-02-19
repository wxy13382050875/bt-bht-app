import Vue from 'vue'
import App from './App'
import store from './store'
import router from './router'
Vue.config.productionTip = false

//全局组件注册
import BhtLayoutContainer from '@/components/common/bht-layout-container.vue'
import AcaNavBar from '@/third/acaui/nav/header-nav-bar.vue'
import NavBarLocation from '@/components/navbar/navbar-location.vue'
import NavBarBack from '@/components/navbar/navbar-back.vue'
import MescrollUni from '@/third/mescroll-uni/mescroll-uni.vue'
import MescrollBody from '@/third/mescroll-uni/mescroll-body.vue'
import routerLink from '@/third/uni-app-router/component/router-link.vue'
import uniCalendar from "@/third/uni-calendar/uni-calendar.vue"
import UniEcharts from '@/components/mpvue-echarts/echarts.vue'
import LbPicker from '@/third/lb-picker'
Vue.component('bht-layout-container', BhtLayoutContainer)
Vue.component('aca-nav-bar', AcaNavBar)
Vue.component('nav-bar-location', NavBarLocation)
Vue.component('nav-bar-back', NavBarBack)
Vue.component('mescroll-uni', MescrollUni)
Vue.component('mescroll-body', MescrollBody)
Vue.component('router-link', routerLink)
Vue.component('uni-calendar', uniCalendar)
Vue.component('uni-echarts', UniEcharts)
Vue.component("lb-picker", LbPicker)
Vue.prototype.$store = store;

App.mpType = 'app'

const app = new Vue({
	store,
	router,
	...App
})
app.$mount()
