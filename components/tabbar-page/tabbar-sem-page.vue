<template>
	<view v-show="pageFlag === tabBarFlag">
		
	</view>
</template>

<script>
/**
 * 二级市场首页
 */
import NavBarTitle from '@/components/navbar/navbar-title-default.vue';
import NzCheckbox from '@/third/acaui/nz-checkbox/nz-checkbox.vue';
import { mapGetters } from 'vuex';
export default {
	components: {
		NavBarTitle,
		NzCheckbox
	},
	data() {
		return {
			pageFlag: 'sem'
		};
	},
	computed: {
		...mapGetters({
			tabBarFlag: 'utp/getTabBarIndex'
		})
	},
	methods: {
		
	}
};
</script>

<style lang="scss">

</style>
