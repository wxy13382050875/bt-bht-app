<template>
	<view class="pay-success-container">
		<nav-bar-back popType="1"></nav-bar-back>
		<bht-layout-container :bottom="0">
			<view class="pay-success-message">
				<view class="message">
					<image class="icon" src="/static/icon/pay_success_icon.png"></image>
					<label class="txt">{{title}}</label>
				</view>
				<view class="btn-group">
					<navigator url="/pages/main" class="btn" hover-class="none">返回首页</navigator>
					<navigator :url="'/pages/shop/order-details?mainOrderId=' + mainOrderId" class="btn" hover-class="none">查看订单</navigator>
				</view>
				<view class="welcome-txt">欢迎您的再次光临！</view>
			</view>
		</bht-layout-container>
	</view>
</template>

<script>
export default {
	data() {
		return {
			title:"",
			mainOrderId:""
		};
	},
	methods: {},
	onLoad: function(options) {
		this.mainOrderId = options.mainOrderId;
		if(options.type == 'success'){
			this.title = '支付成功';
		} else {
			this.title = '支付失败';
		}
		
		
	},
};
</script>

<style lang="scss">
.pay-success-container {
	.pay-success-message {
		display: flex;
		flex-direction: column;
		align-items: center;
		height: 313rpx;
		background: $nav-bg-color;
		.message {
			display: flex;
			align-items: center;
			margin-top: 14rpx;
			.icon {
				width: 42rpx;
				height: 42rpx;
			}
			.txt {
				font-size: 34rpx;
				color: #fff;
			}
		}
		.btn-group {
			margin-top: 68rpx;
			display: flex;
			.btn {
				width: 182rpx;
				height: 60rpx;
				line-height: 60rpx;
				text-align: center;
				color: #fff;
				border: 1px solid rgba(255, 255, 255, 1);
				border-radius: 41px;
			}
			.btn:last-child{
				margin-left: 53rpx;
			}
		}
		.welcome-txt{
			margin-top: 54rpx;
			font-size: 26rpx;
			color: #fff;
		}
	}
}
</style>
