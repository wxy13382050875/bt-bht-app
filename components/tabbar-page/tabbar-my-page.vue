<template>
	<view v-show="pageFlag === tabBarFlag">
		<navbarPersonal></navbarPersonal>
		<bht-layout-container class="layout-container">
			<view  class="header">
				<personalHeader></personalHeader>
			</view>
			<view class="body">
				<personalOrder :dataSource ="dataSource.order"></personalOrder>
				<personalOrder :dataSource ="dataSource.tool"></personalOrder>
				<view class="login-out" @click="loginout">
					退出登陆
				</view>
			</view>
			
		</bht-layout-container>
	</view>
</template>

<script>
	import personalHeader from '@/components/personal/xw-dth-personal-header.vue';
	import personalOrder from '../../components/personal/xw-dth-personal-order.vue';
	import navbarPersonal from '@/components/navbar/navbar-personal-home.vue';
	import {mapGetters} from 'vuex'
	export default {
		components:{
			personalHeader,
			personalOrder,
			navbarPersonal
		},
		data() {
			return {
				pageFlag: 'my',
				dataSource: {
					order:{
						title:"我的订单",
						moretitle:"查看全部订单",
						list:[
						{'img':'/static/icon/icon-payment.png',
						'title':'待付款',
						'page':'/pages/personal/my-order-list?currentIndex=0'},
						{'img':'/static/icon/icon-shipments.png',
						'title':'待发货',
						'page':'/pages/personal/my-order-list?currentIndex=1'},
						{'img':'/static/icon/icon-receiving.png',
						'title':'待收货',
						'page':'/pages/personal/my-order-list?currentIndex=2'},
						{'img':'/static/icon/icon-finish.png',
						'title':'已完成',
						'page':'/pages/personal/my-order-list?currentIndex=3'}]
					},
					tool:{
						title:"常用工具",
						moretitle:"查看全部",
						list:[
						{'img':'/static/icon/icon-message.png',
						'title':'消息通知',
						'page':'goods-personnel-query'},
						{'img':'/static/icon/icon-client-server.png',
						'title':'客户服务',
						'page':'vehicle-personnel-query'},
						{'img':'/static/icon/icon-my-address.png',
						'title':'我的地址',
						'page':'/pages/personal/my-address-list'}]
					}
				}
			}
		},
		computed:{
			...mapGetters({
				tabBarFlag: 'utp/getTabBarIndex'
			})
		},
		methods: {
			loginout(){
				
			}
		}
	}
</script>

<style lang="scss">
	.layout-container{
		position: relative;
		.header{
			position: absolute;
			z-index: 80;
			width: 100%;
			height: 380rpx;
		}
		.body{
			margin-top: 334rpx;
			position: absolute;
			z-index: 100;
			width: 100%;
			.login-out{
				color: #636464;
				height: 94rpx;
				width: 95%;
				line-height: 94rpx;
				background: #FFFFFF;
				text-align: center;
				position: fixed;
				margin-left: 20rpx;
				margin-right: 20rpx;
				bottom: 168rpx;
				border-radius: 8px 8px 8px 8px;
				font-size:34rpx;
				font-family:MicrosoftYaHei;
				border: 1rpx solid #e5e5e5;
			}
		}
	}
</style>
