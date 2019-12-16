<template>
	<view v-show="pageFlag === tabBarFlag">
		<aca-nav-bar></aca-nav-bar>
		<bht-layout-container bgColor="#fff">
			<view class="home-page-wrapper"><statff-home></statff-home></view>
		</bht-layout-container>
	</view>
</template>

<script>
import { mapGetters } from 'vuex';
import StatffHome from '@/components/staff/statff-home.vue';
export default {
	components: {
		StatffHome
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
.home-page-wrapper {
	padding: $padding-content;
}
</style>
