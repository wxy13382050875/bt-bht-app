<template>
	<view v-show="pageFlag === tabBarFlag">
		<!-- <aca-nav-bar></aca-nav-bar>
		<bht-layout-container bgColor="#fff">
			根据不同的用户 首页显示不同的内容
			<view class="home-page-wrapper"><statff-home></statff-home></view>
			
		</bht-layout-container> -->

		<!--购物商城首页-->
		<tabbar-shop-home></tabbar-shop-home>
	</view>
</template>

<script>
/**
 * 首页组件(首页内容根据不同用户展示不同的组件内容)
 *
 */
import { mapGetters } from 'vuex';
import StatffHome from '@/components/staff/statff-home.vue';
import TabbarShopHome from '@/components/tabbar-page/tabbar-shop-home.vue';
export default {
	components: {
		StatffHome,
		TabbarShopHome
	},
	computed: {
		...mapGetters({
			tabBarFlag: 'utp/getTabBarIndex'
		})
	},
	data() {
		return {
			pageFlag: 'index'
		};
	}
};
</script>

<style lang="scss">

</style>
