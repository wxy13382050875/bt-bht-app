<template>
	<view class="xxx">
		<!--首页组件-->
		<tabbar-map-page></tabbar-map-page>
		<!--统计组件-->
		<stat-page></stat-page>
		<!--二级市场组件-->
		<tabbar-sem-page></tabbar-sem-page>
		<!--购物车页面组件-->
		<shopping-cart></shopping-cart>
		<!--个人中心组件-->
		<my-page></my-page>
		<!--tabbar组件-->
		<tab-bar :tabbar="tabbar"></tab-bar>
	</view>
</template>

<script>
/**
 * 入口页面
 */
//TAB BAR 组件
import TabBar from '@/components/tabbar/TabBar.vue';
//首页组件
import TabbarMapPage from '@/components/tabbar-page/tabbar-main-page.vue';
//统计组件
import StatPage from '@/components/tabbar-page/stat-page.vue';
//我的组件
import MyPage from '@/components/tabbar-page/tabbar-my-page.vue';
//购物车组件
import ShoppingCart from '@/components/tabbar-page/tabbar-shop-cart.vue';
//二级市场组件
import TabbarSemPage from '@/components/tabbar-page/tabbar-sem-page.vue';
export default {
	components: {
		TabBar,
		TabbarMapPage,
		StatPage,
		MyPage,
		ShoppingCart,
		TabbarSemPage
	},
	data() {
		return {
			tabBarIndex: 0,
			tabbar: true,
			windowHeight: 0
		};
	},
	onLoad() {
		uni.getSystemInfo({
			success: res => {
				this.windowHeight = res.windowHeight;
			}
		});
		uni.onWindowResize(res => {
			if (res.size.windowHeight < this.windowHeight) {
				this.tabbar = false;
				// uni.pageScrollTo({
				// 	scrollTop: 200
				// })
			} else {
				this.tabbar = true;
			}
		});
	},
	methods: {
		//tabBar 改变事件
		changeTabBar(index) {
			this.tabBarIndex = index;
		}
	}
};
</script>

<style lang="scss">
.test {
}
</style>
