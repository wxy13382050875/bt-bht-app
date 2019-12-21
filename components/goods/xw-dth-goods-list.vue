<template>
	<view class="" >
		<view class="goods-list"  v-for="(item,index) in dataSource" :key=index>
			<view class="goods-image">
				<image :src="item.goodsPicture" mode=""></image>
			</view>
			<view class="goods-info">
				<view class="title">{{item.goodsName}}</view>
				<view class="details">{{item.details}}</view>
				<view class="goods-price">
					<view>
						<label class="nprice">¥{{item.price}}</label>
						<label class="oprice">¥{{item.originalPrice}}</label>
					</view>
					<view>
						<label class="number" >{{item.goodsSales}}人付款</label>
					</view>
				</view>
			</view>
			
			
		</view>
	</view>
	
</template>

<script>
	export default {
		props:{
			dataSource:{
				type:Array,
				default () {
					return []
				}
			}
		},
		
		methods: {
			
		}
	}
</script>

<style lang="scss">
	.goods-list{
		border-bottom: 1rpx solid #a7a7a7;
		display: flex;
		background: #FFFFFF;
		.goods-image{
			margin-left: 20rpx;
			margin-top: 20rpx;
			margin-bottom: 20rpx;
			image{
				width: 240rpx;
				height: 240rpx;
			}
		}
		.goods-info{
			margin-left: 28rpx;
			display: block;
			margin-right: 20rpx;
			margin-top: 20rpx;
			margin-bottom: 20rpx;
			.title{
				
				font-size:26rpx;
				color: #333333;
			}
			.details{
				line-height: 80rpx;
				font-size:22rpx;
				color: #999999;
			}
			.goods-price{
				display: flex;
				justify-content: space-between;
				margin-bottom: 44rpx;
				.nprice {
					font-size: 32rpx;
					color: #ff3333;
				}
				.oprice {
					font-size: 22rpx;
					color: #999999;
				}
				.number {
					font-size: 22rpx;
					color: #999999;
				}
			}
		}
	}
	
</style>
