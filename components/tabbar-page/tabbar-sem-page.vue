<template>
	<view v-show="pageFlag === tabBarFlag" class="sem-index-container">
		<nav-bar-title title="二级交易市场"></nav-bar-title>
		<bht-layout-container>
			<view class="header"><image class="bg" :src="semHeaderBg"></image></view>
			<navigator url="/pages/sem/sem-scan-buy">扫一扫</navigator>
			<navigator url="/pages/sem/sem-search-buy">商品收购</navigator>
		</bht-layout-container>
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
			pageFlag: 'sem',
			semHeaderBg: require('@/static/icon/sem_header_bg.png')
		};
	},
	computed: {
		...mapGetters({
			tabBarFlag: 'utp/getTabBarIndex'
		})
	},
	methods: {}
};
</script>

<style lang="scss">
.sem-index-container {
	.header {
		height: 255rpx;
		.bg{
			width: 100%;
			height: 100%;
		}
	}
}
</style>
