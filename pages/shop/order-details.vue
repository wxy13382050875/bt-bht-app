<template>
	<view class="order-details-container">
		<nav-bar-back title="订单详情" popType="1"></nav-bar-back>
		<bht-layout-container :bottom="40">
			<view class="bht-layout-content">
				<view class="address-box">
					<view class="address-icon"><image src="/static/icon/address_loaction_icon.png"></image></view>
					<view class="address-info">
						<view class="address-info-user">
							<label class="name">{{ dataSource.orderAddress.name }}</label>
							<label class="phone">{{ dataSource.orderAddress.phone }}</label>
						</view>
						<view class="address-text">{{ dataSource.orderAddress.location }}{{ dataSource.orderAddress.detail }}</view>
					</view>
				</view>
				<view class="order-goods-list" v-for="(item, index) in dataSource.orderList" :key="index">
					<view class="shop-list">
						<view class="header">
							<image class="shop-img" :src="item.storePicture"></image>
							<label class="shop-name">{{ item.storeName }}</label>
						</view>
						<view class="goods-list">
							<view class="items" v-for="(pro, pIndex) in item.goods" :key="pIndex">
								<view class="goods-image"><image :src="pro.goodsPicture"></image></view>
								<view class="goods-details">
									<label class="goods-name">{{ pro.goodsName }}</label>
									<label class="shipping-address">{{ pro.attrName }}:{{ pro.attrValue }}</label>
								</view>
								<view class="goods-pum">
									<view class="price">
										<label class="symbol">¥</label>
										<label class="value">{{ pro.price }}</label>
									</view>
									<view class="num">
										<label class="symbol">x</label>
										<label class="value">{{ pro.goodsNum }}</label>
									</view>
								</view>
							</view>
						</view>
						<view class="desc">
							<view class="items">
								<label>商品价格</label>
								<label>¥{{ item.orderPrice }}</label>
							</view>
							<view class="items">
								<label>运费(快递)</label>
								<label>¥{{ item.expressPrice }}</label>
							</view>
							<view class="items total">
								<label>订单总价</label>
								<label>¥{{ item.goodsAllPrice }}</label>
							</view>
						</view>
					</view>
				</view>
				<view class="order-details">
					<view class="header"><label>订单信息</label></view>
					<view class="details-list">
						<view class="items">
							<label>订单编号</label>
							<label>{{ dataSource.orderInfo.mainOrderId }}</label>
						</view>
						<view class="items">
							<label>交易号</label>
							<label>{{ dataSource.orderInfo.payNo }}</label>
						</view>
						<view class="items">
							<label>创建时间</label>
							<label>{{ dataSource.orderInfo.createTime }}</label>
						</view>
						<view class="items">
							<label>付款时间</label>
							<label>{{ dataSource.orderInfo.payTime }}</label>
						</view>
					</view>
				</view>
			</view>
		</bht-layout-container>
		<view class="o-buttom">
			<view class="o-btttom-btn" v-if="dataSource.orderInfo.statusCd == '10008'">
				<button class="border-gray">联系卖家</button>
				<button class="border-gray">取消订单</button>
				<button class="border-red">付款</button>
			</view>
			<view class="o-btttom-btn" v-if="dataSource.orderInfo.statusCd == '10016'"><button class="border-red">修改地址</button></view>
			<view class="o-btttom-btn" v-if="dataSource.orderInfo.statusCd == '10020'">
				<button class="border-gray">查看物流</button>
				<button class="border-red">确认收货</button>
			</view>
			<view class="o-btttom-btn" v-if="dataSource.orderInfo.statusCd == '10024'">
				<button class="border-gray">删除订单</button>
				<button class="border-red">评价</button>
			</view>
			<view class="o-btttom-btn" v-else>
				<!-- <button class="border-red">评价</button> -->
			</view>
		</view>
	</view>
</template>

<script>
/**
 * 订单详情
 */
import { getOrderDetails } from '@/api/shop.js';
export default {
	data() {
		return {
			orderId: String,
			mainOrderId: String,
			dataSource: {}
		};
	},
	onLoad: function(option) {
		
		let param = {};
		this.orderId = option.orderId;
		this.mainOrderId = option.mainOrderId;
		if(typeof(this.orderId)=='undefined'){
			console.log('typeof(this.mainOrderId)');
			param.mainOrderId = this.mainOrderId;
			
		} else {
			console.log('typeof(this.orderId)');
			param.orderId = this.orderId;
		}
		
		getOrderDetails(param).then(res => {
			let { data, code, msg } = res;
			if (code === '200') {
				this.dataSource = data;
			} else {
				uni.showToast({
					icon: 'none',
					title: msg
				});
			}
		});
	}
};
</script>

<style lang="scss">
$text-color: #333333;
.order-details-container {
	.address-box {
		padding: 0 32rpx;
		display: flex;
		align-items: center;
		height: 194rpx;
		background-color: #fff;
		.address-icon {
			image {
				width: 76rpx;
				height: 89rpx;
			}
		}
		.address-info {
			margin: 0 32rpx 0 28rpx;
			.address-info-user {
				.name {
					font-size: 32rpx;
					color: $text-color;
				}
				.phone {
					margin-left: 14rpx;
					font-size: 26rpx;
					color: #999999;
				}
			}
			.address-text {
				margin-top: 14rpx;
				font-size: 26rpx;
				color: $text-color;
				.flag {
					margin-right: 24rpx;
					color: #ff3333;
				}
			}
		}
	}
	.order-goods-list {
		margin-top: 20rpx;
		padding: $padding-content;
		background-color: #fff;

		.shop-list {
			.header {
				display: flex;
				align-items: center;
				height: 62rpx;
				.shop-img {
					width: 34rpx;
					height: 34rpx;
				}
				.shop-name {
					margin-left: 8rpx;
					font-size: 32rpx;
					color: $text-color;
				}
			}
			.goods-list {
				position: relative;
				.items {
					display: flex;
					margin-top: $padding-content;
					.goods-image {
						width: 180rpx;
						height: 180rpx;
						image {
							width: 100%;
							height: 100%;
							border-radius: 9px;
						}
					}
					.goods-details {
						flex: 1;
						display: flex;
						flex-direction: column;
						justify-content: space-between;
						margin-left: $padding-content;
						.goods-name {
							font-size: 26rpx;
							color: $text-color;
						}
						.shipping-address {
							font-size: 22rpx;
							color: #999;
						}
					}
					.goods-pum {
						margin-left: 40rpx;
						text-align: right;
						.price {
							color: $text-color;
							.value {
								font-size: 26rpx;
							}
							.symbol {
								font-size: 22rpx;
							}
						}
						.num {
							color: #999;
							.value {
								font-size: 26rpx;
							}
							.symbol {
								font-size: 22rpx;
							}
						}
					}
				}

				&::after {
					content: '';
					position: absolute;
					width: 100%;
					height: 1px;
					background-color: #868686;
					margin-top: 21rpx;
				}
			}

			.desc {
				margin-top: 32rpx;
				.items {
					display: flex;
					justify-content: space-between;
					align-items: center;
					height: 62rpx;
					font-size: 26rpx;
					color: #868686;
				}
				.total {
					color: $text-color;
				}
			}
		}
	}
	.order-details {
		margin-top: 20rpx;
		padding: 0 $padding-content;
		background-color: #fff;
		.header {
			position: relative;
			height: 81rpx;
			line-height: 81rpx;
			font-size: 32rpx;
			color: $text-color;
			&::after {
				content: '';
				position: absolute;
				right: 0;
				bottom: 0;
				left: 0;
				background-color: #868686;
				height: 1px;
			}
		}
		.details-list {
			.items {
				display: flex;
				justify-content: space-between;
				align-items: center;
				height: 62rpx;
				font-size: 26rpx;
				color: #868686;
			}
		}
	}
	.o-buttom {
		background: #ffffff;
		width: 100%;
		height: 120rpx;
		position: fixed;
		bottom: 0;
		padding: 40rpx;
		.o-btttom-btn {
			display: flex;
			align-items: center;
			// width: 360rpx;
			height: 100%;
			float: right;
			.border-gray {
				// width: 180rpx;
				color: rgba(187, 187, 187, 1);
				font-size: 24rpx;
				border: 1rpx solid rgba(187, 187, 187, 1);
				background: #ffffff;
				border-radius: 26rpx;
				opacity: 1;
				margin-right: 20rpx;
			}
			.border-red {
				// width: 160rpx;
				color: rgba(255, 255, 255, 1);
				font-size: 24rpx;
				border: 1rpx solid rgba(187, 187, 187, 1);
				background: linear-gradient(103deg, rgba(228, 35, 50, 1) 0%, rgba(228, 0, 17, 1) 48%, rgba(226, 0, 17, 1) 51%, rgba(177, 6, 19, 1) 100%);
				border-radius: 26rpx;
				opacity: 1;
			}
		}
	}
	
}
</style>
