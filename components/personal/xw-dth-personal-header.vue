<template>
	<view class="personal">
		<view class="personal-header">
			<label class="title">个人中心</label>
		</view>
		<view class="personal-body">
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
			<view class="personal-store">
				<view class="item">
					<view class="">42</view>
					<view class="">商品收藏</view>
				</view>
				<view class="item">
					<view class="">42</view>
					<view class="">店铺关注</view>
				</view>
				<view class="item">
					<view class="">42</view>
					<view class="">我的足迹</view>
				</view>
			</view>
		</view>
		
		
	</view>
	
</template>

<script>
	
</script>

<style lang="scss">
	.personal{
		height: 100%;
		background: #E40011;
		
		.personal-header{
			display: flex;
			justify-content: center;
			align-items: center;
			height: 80rpx;
			width: 100%;
			line-height: 80rpx;;
			.title{
				
				height: 100%;
				font-size: 30rpx;
				color: #ffffff;
			}
		}
		.personal-body{
			.personal-info{
				height: 240rpx;
				display: flex;
				justify-content: space-between;
				margin-left: 30rpx;
				margin-right: 30rpx;
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
			.personal-store{
				background: url(../../static/icon/bg-personal-oredr.png);
				height: 151rpx;
				width: 100%;
				z-index: 100;
				display: flex;
				justify-content: space-between;
				.item{
					width: 33%;
					text-align: center;
					color: #FFFFFF;
					font-size: 24rpx;
				}
			}
		}
		
	}
</style>
