<template>
	<view class="personal">
		<view class="personal-header">
			<label class="title">个人中心</label>
		</view>
		<view class="personal-info">
			<view class="left-item">
			<image src="../../static/icon_favicon.ico" ></image>
			<view style="margin-left: 20rpx; align-items: center;">
				<view class="title">成国富</view>
				<view class="describe">个性签名：越努力越幸运</view>
			</view>
		</view>
		<view class="right-item">
			<image src="../../static/icon/icon_right_arrow.png" mode=""></image>
		</view>
		</view>
		
	</view>
	
</template>

<script>
</script>

<style lang="scss">
	.personal{
		background: #E40011;
		.personal-header{
			display: flex;
			justify-content: center;
			align-items: center;
			height: 80rpx;
			width: 100%;
			background: #F2F2F2;
			line-height: 80rpx;;
			.title{
				
				height: 100%;
				font-size: 30rpx;
				color: #999999;
			}
		}
		.personal-info{
			padding: 40rpx;
			display: flex;
			justify-content: space-between;
			.left-item{
				display: flex;
				align-items: center;
				image{
					width: 100rpx;
					height: 100rpx;
				}
				.title{
					color: #ffffff;
					font-size: 24rpx;
				}
				.describe{
					color: #ffffff;
					font-size: 20rpx;
				}
			}
			.right-item{
				display: flex;
				align-items: center;
				
				image{
					width:12rpx ; 
					height: 25rpx;
					vertical-align: middle;
					margin-left: 20rpx;
				}
			}
		}
		
	}
</style>
