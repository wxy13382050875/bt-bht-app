<template>
	<view>
		<bht-layout-container class="layout-container">
			<view  class="header">
				<personalHeader></personalHeader>
			</view>
			<view class="body">
				<personalOrder :dataSource ="dataSource.order"></personalOrder>
				<personalOrder :dataSource ="dataSource.tool"></personalOrder>
			</view>
			
		</bht-layout-container>
		
	</view>
</template>

<script>
	import personalHeader from '@/components/personal/xw-dth-personal-header.vue';
	import personalOrder from '../../components/personal/xw-dth-personal-order.vue';
	export default {
		components:{
			personalHeader,
			personalOrder
		},
		data() {
			return {
				dataSource: {
					order:{
						title:"我的订单",
						moretitle:"查看全部订单",
						list:[
						{'img':'/static/icon/icon-payment.png',
						'title':'待付款',
						'page':'goods-personnel-query'},
						{'img':'/static/icon/icon-shipments.png',
						'title':'待发货',
						'page':'vehicle-personnel-query'},
						{'img':'/static/icon/icon-receiving.png',
						'title':'待收货',
						'page':'vehicle-personnel-query'},
						{'img':'/static/icon/icon-finish.png',
						'title':'已完成',
						'page':'vehicle-personnel-check'}]
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
						'page':'vehicle-personnel-query'}]
					}
				}
			}
		},
		methods: {
			
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
			height: 444rpx;
		}
		.body{
			margin-top: 398rpx;
			position: absolute;
			z-index: 100;
			width: 100%;
		}
	}
</style>
