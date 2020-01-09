<template>
	<view v-show="pageFlag === tabBarFlag">
		<navBarTitle title="个人中心"></navBarTitle>
		<bht-layout-container>
			<view class="bht-layout-content">
				<view class="header"><personalHeader :dataSource="userInfo" @togglePopup="togglePopup"></personalHeader></view>
				<view class="body">
					<personalOrder :dataSource="dataSource.order" sta></personalOrder>
					<personalOrder :dataSource="dataSource.tool"></personalOrder>
				</view>
				<view class="footer"><view class="login-out" @click="loginout">退出登录</view></view>
			</view>
		</bht-layout-container>
		<!-- 插屏弹窗 -->
		<uni-popup ref="showimage" :mask-click="true" @change="change">
			<view class="uni-image">
				<image class="image" style="width: 320rpx;height: 320rpx;" :src="userInfo.idCodeQr" mode="scaleToFill" />
				<view class="uni-image-close" @click="cancel('image')"></view>
			</view>
		</uni-popup>
	</view>
</template>

<script>
import personalHeader from '@/components/personal/xw-dth-personal-header.vue';
import personalOrder from '../../components/personal/xw-dth-personal-order.vue';
import navBarTitle from '@/components/navbar/navbar-title-default.vue';
import UniPopup from '@/third/uni-popup/uni-popup.vue';
import { mapGetters, mapActions } from 'vuex';
export default {
	components: {
		personalHeader,
		personalOrder,
		navBarTitle,
		UniPopup
	},
	data() {
		return {
			pageFlag: 'my',
			dataSource: {
				order: {
					title: '我的订单',
					moretitle: '查看全部订单',
					list: [
						{ pictureUrl: '/static/icon/icon-payment.png', name: '待付款', page: '/pages/personal/my-order-list?currentIndex=1' },
						{ pictureUrl: '/static/icon/icon-shipments.png', name: '待发货', page: '/pages/personal/my-order-list?currentIndex=2' },
						{ pictureUrl: '/static/icon/icon-receiving.png', name: '待收货', page: '/pages/personal/my-order-list?currentIndex=3' },
						{ pictureUrl: '/static/icon/icon-finish.png', name: '已完成', page: '/pages/personal/my-order-list?currentIndex=4' }
					]
				},
				tool: {
					title: '常用工具',
					moretitle: '',
					list: [
						// { pictureUrl: '/static/icon/icon-message.png', name: '消息通知', page: 'goods-personnel-query' },
						// { pictureUrl: '/static/icon/icon-client-server.png', name: '客户服务', page: 'vehicle-personnel-query' },
						{ pictureUrl: '/static/icon/icon-my-address.png', name: '我的地址', page: '/pages/personal/my-address-list?type=0' }
					]
				}
			}
		};
	},
	computed: {
		...mapGetters({
			tabBarFlag: 'utp/getTabBarIndex',
			userInfo: 'user/userInfo'
		})
	},
	methods: {
		...mapActions({
			setTabBarIndex: 'utp/setTabBarIndex'
		}),
		loginout() {
			this.setTabBarIndex('index');
			uni.setStorageSync('isLogin', false);
			uni.redirectTo({
				url: '/pages/common/login'
			});
		},
		togglePopup() {
			if (this.userInfo.idCodeQr != '' && this.userInfo.idCodeQr != null) {
				this.$nextTick(() => {
					this.$refs['showimage'].open();
				});
			} else {
				uni.showToast({
					title: '请完善用户信息',
					icon: 'none'
				});
			}
		},
		cancel(type) {
			this.$refs['showimage'].close();
		},
		change(e) {
			console.log('是否打开:' + e.show);
		},
		onBackPress() {
			this.$refs['showimage'].close();
		}
	},
	watch: {
		tabBarFlag(n, v) {
			if (n === this.pageFlag) {
			}
		}
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
