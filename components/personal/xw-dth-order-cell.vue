<template>
	<view class="order-info">
		<view class="order-info-content">
			<view class="store-info">
				<view class="item-left">
					<image class="store-logo" :src="dataSource.storePicture" mode=""></image>
					<view class="store-name">{{dataSource.storeName}}</view>
					<image class="right-icon" src="/static/icon/icon_right_arrow.png" mode=""></image>
				</view>
				<view class="item-right" v-if="dataSource.statusCd==10008">等待买家付款</view>
				<view class="item-right" v-if="dataSource.statusCd==10016">买家以付款</view>
				<view class="item-right" v-if="dataSource.statusCd==10020">卖家以发货</view>
				<view class="item-right" v-if="dataSource.statusCd==10024">交易成功</view>
			</view>
			<view class="xw-order-list"  v-for="(item,index) in dataSource.goodsInsts" :key=index>
				<view class="o-image">
					<image :src="item.goodsPicture" mode=""></image>
				</view>
				<view class="o-info">
					
					<view class="title">{{item.goodsName}}</view>
					<view class="specifi">{{item.specifi}}</view>
					<view class="delivery">{{item.sendAddress}}</view>
				</view>
				<view class="o-price-num">
					
					<view class="price">¥{{item.price}}</view>
					<view class="number">x{{item.goodsNum}}</view>
				</view>
				
			</view>
			<view class="o-delivery" >
				<view class="o-item">
					<view >配送方式</view>
					<view class="distribution">{{dataSource.distributionType}}</view>
				</view>
				<view class="o-item">
					<view >订单备注</view>
					<view class="remark">{{dataSource.remark}}</view>
				</view>
				<view class="o-amount">共{{dataSource.orderGoodsInstNum}}件 小计:¥{{dataSource.orderPrice}}</view>
				
				
			</view>
			<view class="o-buttom">
				<view class="o-btttom-btn">
					<button class="cancel">取消订单</button>
					<button class="payment">付款</button>
				</view>
			</view>
	
			
		</view>
	</view>
</template>

<script>
	export default {
		props:{
			dataSource:{
				type:Object,
				default () {
					return {}
				}
			}
		},
		methods: {
			
		}
	}
</script>

<style lang="scss">
	.order-info{
		// background: #FFFFFF;
		padding: 0 $padding-content;
		margin-top: 10rpx;
		
		.order-info-content{
			background: #FFFFFF;
			padding: 0 $padding-content;
			.store-info{
				
				display: flex;
				justify-content: space-between;
				height: 80rpx;
				line-height: 80rpx;
				.item-left{
					display: flex;
					align-items: center;
					.store-logo{
						width: 34rpx;
						height: 34rpx;
					}
					.store-name{
						margin-left: 20rpx;
						font-size: 32rpx;
						color: #333333;
					}
					.right-icon{
						margin-left: 20rpx;
						width: 16rpx;
						height: 30rpx;
						
					}
				}
				.item-right{
					font-size: 26rpx;
					color: #FF3333;
				}
				
			}
			.xw-order-list{
				border-bottom: 1rpx solid #a7a7a7;
				display: flex;
				background: #FFFFFF;
				.o-image{
					margin-left: 20rpx;
					margin-top: 20rpx;
					margin-bottom: 20rpx;
					image{
						width: 240rpx;
						height: 240rpx;
					}
				}
				.o-info{
					width: 100%;
					margin-left: 28rpx;
					display: block;
					margin-right: 20rpx;
					margin-top: 20rpx;
					margin-bottom: 20rpx;
					.title{
						
						font-size:26rpx;
						color: #333333;
					}
					.specifi{
						line-height: 80rpx;
						font-size:22rpx;
						color: #999999;
					}
					.delivery{
						line-height: 80rpx;
						font-size:22rpx;
						color: #999999;
					}
				}
				.o-price-num{
					display: block;
					margin-right: 20rpx;
					margin-top: 20rpx;
					width: 80rpx;
					text-align: right;
					.price{
						font-size: 22rpx;
						color: #333333;
					}
					.number{
						font-size: 26rpx;
						color: #999999;
					}
				}
			}
			.o-delivery{
				border-bottom: 1rpx solid #a7a7a7;
				.o-item{
					height: 80rpx;
					line-height: 80rpx;
					display: flex;
					justify-content: space-between;
					font-size: 26rpx;
					.distribution{
						color: #868686;
					}
					.remark{
						color: #868686;
					}
				}
				.o-amount{
					height: 80rpx;
					line-height: 80rpx;
					text-align: right;
					font-size: 26rpx;
					color: #333333;
				}
				
			}
			.o-buttom{
				background: #FFFFFF;
				width: 100%;
				height: 120rpx;
				.o-btttom-btn{
					
					display: flex;
					align-items: center;
					width: 360rpx;
					height: 100%;
					float: right;
					.cancel{
						width: 160rpx;
						color: #FF3333;
						font-size: 24rpx;
						border: 1rpx solid rgba(187,187,187,1);
						background: #FFFFFF;
						border-radius: 26rpx;;
						opacity: 1;
						
					}
					.payment{
						width: 160rpx;
						color: rgba(255,255,255,1);
						font-size: 24rpx;
						border: 1rpx solid rgba(187,187,187,1);
						background:linear-gradient(103deg,rgba(228,35,50,1) 0%,rgba(228,0,17,1) 48%,rgba(226,0,17,1) 51%,rgba(177,6,19,1) 100%);
						border-radius: 26rpx;
						opacity: 1;
						
					}
				}
			}
		}
	}
</style>
