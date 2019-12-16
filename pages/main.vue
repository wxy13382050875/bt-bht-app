<template>
	<view v-cloak>
		<home-page></home-page>
		<stat-page></stat-page>
		<my-page></my-page>
		<tab-bar></tab-bar>
	</view>
</template>

<script>
//入口文件首页
import TabBar from '@/components/tabbar/TabBar.vue';
import HomePage from '@/components/tabpage/HomePage.vue';
import StatPage from '@/components/tabpage/StatPage.vue';
import MyPage from '@/components/tabpage/MyPage.vue';
export default {
	components: {
		TabBar,
		HomePage,
		StatPage,
		MyPage
	},
	data() {
		return {
			tabBarIndex: 0
		};
	},
	methods: {
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
