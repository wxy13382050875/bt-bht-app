<template>
	<view class="bht-goods-w">
		<view class="bht-goods-content">
			<view class="goods-title">
				<label class="title">{{dataSource.title}}</label>
				<router-link class="more" to="{name: 'goods-list'}">更多>>></router-link>
			</view>
			<view class="goods-list">
				<view :class="{'item-three':count == 3,'item-two':count == 2}" v-for="(item,index) in dataSource.list" :key="index">
					<view :style="{height: height +'px'}"><image :src="item.url"></image></view>
					<view class="title" v-if="count == 2">
						{{item.title}}
					</view>
					<view class="good-info">
						<view>
							<label class="goods-nprice">¥{{item.newPrice}}</label>
							<label class="goods-oprice" v-if="count == 2">¥{{item.oldPrice}}</label>
						</view>
						<view>
							<label class="goods-oprice" v-if="count == 3">¥{{item.oldPrice}}</label>
							<label class="goods-number" v-if="count == 2">¥{{item.number}}</label>
						</view>
					</view>
				</view>	
			</view>
			
		</view>
	</view>
</template>

<script>
	export default{
		props:{
			dataSource:{
				type:Array,
				default () {
					return []
				}
			},
			count:0
		},
		data() {
			return {
				height:0
			}
		},
		created() {
			var sysinfo = uni.getSystemInfoSync(),
			windowWidth = sysinfo.windowWidth;
			//减去底部导航高度
			this.height = (windowWidth - (this.count + 1)* 5)/this.count;
			
		}
		
		
	}
</script>
<style lang="scss">
.bht-goods-w {
	padding: 0 $padding-content;
	margin-top: 10rpx;
	.bht-goods-content {
		padding: 21rpx 21rpx;
		background-color: #fff;
		box-shadow: 0px 0px 10px 0px rgba(134, 134, 134, 0.2);
		border-radius: 8px;

		.goods-title {
			display: flex;
			align-items: center;
			justify-content: space-between;

			label {
				position: relative;
				height: 34rpx;
				padding-left: 10rpx;
				font-size: 34rpx;
				color: rgba(254, 89, 6, 1);

				&::before {
					content: ' ';
					position: absolute;
					left: 0;
					bottom: -3px;
					width: 4rpx;
					height: 34rpx;
					background-color: rgba(254, 89, 6, 1);
				}
			}

			.more {
				font-size: 24rpx;
				color: rgba(99, 99, 99, 1);
			}
		}
		.goods-list {
			margin-top: 17rpx;
			display: flex;
			justify-content: space-between;
			flex-wrap: wrap;
			padding: 5 10rpx;
			.item-three {
				width: calc((100% - 15rpx)/3);
				image {
					width: 100%;
					height: 100%;
					
				}
				.title {
					font-size: 26rpx;
					color: #333333;
				}
				.good-info {
					display: flex;
					justify-content: center;
					.goods-nprice {
						font-size: 32rpx;
						color: #ff3333;
					}
					.goods-oprice {
						font-size: 22rpx;
						color: #999999;
					}
					.goods-number {
						font-size: 22rpx;
						color: #999999;
					}
				}
			}
			.item-two {
				width: calc((100% - 15rpx)/2);
				image {
					width: 100%;
					height: 100%;
					
				}
				.title {
					font-size: 26rpx;
					color: #333333;
				}
				.good-info {
					display: flex;
					justify-content: space-between;
					.goods-nprice {
						font-size: 32rpx;
						color: #ff3333;
					}
					.goods-oprice {
						font-size: 22rpx;
						color: #999999;
					}
					.goods-number {
						font-size: 22rpx;
						color: #999999;
					}
				}
			}
		}
	}
}
</style>
