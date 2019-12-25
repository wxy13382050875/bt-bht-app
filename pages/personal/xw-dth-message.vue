<template>
	<view class="content">
		<nav-bar-back title="消息"></nav-bar-back>
		<bht-layout-container :bottom="0">
			<view class="message-info">
				<view class="msg-left">
					<image src="/static/icon/icon-logistics-info.png" mode=""></image>
				</view>
				<view class="msg-middle">
					<view class="msg-title">交易物流通知</view>
					<view class="msg-dsc">订单签收提醒</view>
				</view>
				<view class="msg-right">
					<view class="msg-time">20/01/08</view>
					<view class="msg-num">5</view>
				</view>
			</view>
		</bht-layout-container>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			
		}
	}
</script>

<style lang="scss">
.message-info{
	height: 150rpx;
	display: flex;
	justify-content: space-between;
	align-items: center;
	width: 100%;
	.msg-left{
		padding: 26rpx;
		image{
			width: 98rpx;
			height: 98rpx;
			
		}
	}
	.msg-middle{
		text-align: left;
		width: 100%;
		height: 120rpx;
		line-height: 60rpx;
		.msg-title{
			
			font-size: 32rpx;
			color: #333333;
		}
		.msg-dsc{
			font-size: 26rpx;
			color: #999999;
		}
	}
	.msg-right{
		text-align: right;
		width: 140rpx;
		margin-right: 20rpx;
		height: 120rpx;
		.msg-time{
			font-size: 32rpx;
			color: #333333;
		}
	}
}
</style>
