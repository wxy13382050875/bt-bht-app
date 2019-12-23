<template>
	<view v-show="pageFlag === tabBarFlag">
		<nav-bar-personal-home></nav-bar-personal-home>
		<bht-layout-container>
			<view class="bht-layout-content">
				<view class="header"><personalHeader></personalHeader></view>
				<view class="body">
					<personalOrder :dataSource="dataSource.order"></personalOrder>
					<personalOrder :dataSource="dataSource.tool"></personalOrder>
				</view>
				<view class="footer"><view class="login-out" @click="loginout">退出登陆</view></view>
			</view>
		</bht-layout-container>
	</view>
</template>

<script>
import personalHeader from '@/components/personal/xw-dth-personal-header.vue';
import personalOrder from '../../components/personal/xw-dth-personal-order.vue';
import NavBarPersonalHome from '@/components/navbar/navbar-personal-home.vue';
import { mapGetters } from 'vuex';
export default {
	components: {
		personalHeader,
		personalOrder,
		NavBarPersonalHome
	},
	data() {
		return {
			pageFlag: 'my',
			dataSource: {
				order: {
					title: '我的订单',
					moretitle: '查看全部订单',
					list: [
						{ pictureUrl: '/static/icon/icon-payment.png', name: '待付款', page: '/pages/personal/my-order-list?currentIndex=0' },
						{ pictureUrl: '/static/icon/icon-shipments.png', name: '待发货', page: '/pages/personal/my-order-list?currentIndex=1' },
						{ pictureUrl: '/static/icon/icon-receiving.png', name: '待收货', page: '/pages/personal/my-order-list?currentIndex=2' },
						{ pictureUrl: '/static/icon/icon-finish.png', name: '已完成', page: '/pages/personal/my-order-list?currentIndex=3' }
					]
				},
				tool: {
					title: '常用工具',
					moretitle: '查看全部',
					list: [
						{ pictureUrl: '/static/icon/icon-message.png', name: '消息通知', page: 'goods-personnel-query' },
						{ pictureUrl: '/static/icon/icon-client-server.png', name: '客户服务', page: 'vehicle-personnel-query' },
						{ pictureUrl: '/static/icon/icon-my-address.png', name: '我的地址', page: '/pages/personal/my-address-list' }
					]
				}
			}
		};
	},
	computed: {
		...mapGetters({
			tabBarFlag: 'utp/getTabBarIndex'
		})
	},
	methods: {
		loginout() {}
	}
};
</script>

<style lang="scss" scoped>
.header {
	width: 100%;
	height: 380rpx;
}

.body {
	margin-top: -62rpx;
}
.footer {
	margin-top: 168rpx;
	padding: 0 $padding-content;
	.login-out {
		height: 94rpx;
		line-height: 94rpx;
		font-size: 34rpx;
		color: #636464;
		text-align: center;
		background: #ffffff;
		border-radius: 8px 8px 8px 8px;
		border: 1rpx solid #e5e5e5;
		box-shadow: 0px 0px 10px #e5e5e5;
	}
}
</style>
