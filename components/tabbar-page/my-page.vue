<template>
	<view v-show="pageFlag === tabBarFlag"></view>
</template>

<script>
/**
 * 我的组件
 */
import { mapGetters } from 'vuex';
export default {
	components: {},
	computed: {
		...mapGetters({
			tabBarFlag: 'utp/getTabBarIndex'
		})
	},
	data() {
		return {
			pageFlag: 'my'
		};
	},
	methods: {
		change() {},
		onClick() {}
	}
};
</script>

<style></style>
