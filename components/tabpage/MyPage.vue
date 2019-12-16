<template>
	<view v-show="pageFlag === tabBarFlag">我的</view>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
	computed: {
		...mapGetters({
			tabBarFlag: 'utp/getTabBarIndex'
		})
	},
	data() {
		return {
			pageFlag: 'my'
		};
	}
};
</script>

<style></style>
