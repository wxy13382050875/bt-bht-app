<template>
	<view v-show="pageFlag === tabBarFlag" class="sem-index-container">
		<nav-bar-title title="二级交易市场"></nav-bar-title>
		<bht-layout-container>
			<view class="header"><image class="bg" :src="semHeaderBg"></image></view>
			<xw-dth-grid :dataSource="dataSource"></xw-dth-grid>
		</bht-layout-container>
	</view>
</template>

<script>
/**
 * 二级市场首页
 */
import NavBarTitle from '@/components/navbar/navbar-title-default.vue';
import NzCheckbox from '@/third/acaui/nz-checkbox/nz-checkbox.vue';
import XwDthGrid from '@/components/details/xw-dth-grid.vue';
import { mapGetters } from 'vuex';

export default {
	components: {
		NavBarTitle,
		NzCheckbox,
		XwDthGrid
	},
	data() {
		return {
			pageFlag: 'sem',
			semHeaderBg: require('@/static/icon/sem_header_bg.png'),
			dataSource: [
				{ pictureUrl: '/static/icon/icon-my-address.png', name: '扫一扫', url: '/pages/sem/sem-scan-buy' },
				{ pictureUrl: '/static/icon/icon-my-address.png', name: '商品收购', url: '/pages/sem/sem-search-buy' },
				{ pictureUrl: '/static/icon/icon-client-server.png', name: '订单中心', url: '/pages/sem/xw-dth-sem-order' }
			]
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
		.bg {
			width: 100%;
			height: 100%;
		}
	}
}
</style>
