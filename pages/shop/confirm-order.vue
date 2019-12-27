<template>
	<view class="confirm-order-container">
		<nav-bar-back title="确认订单"></nav-bar-back>
		<bht-layout-container :bottom="bottomHeight">
			<scroll-view scroll-y="true" style="height: 100%;">
				<view class="address-box">
					<view class="address-icon"><image src="/static/icon/address_loaction_icon.png"></image></view>
					<view class="address-info">
						<view class="address-info-user">
							<label class="name">余春林</label>
							<label class="phone">1833944725</label>
						</view>
						<view class="address-text">河南省郑州市中原区建设路街道，护国大厦B区20栋</view>
					</view>
					<navigator url="/pages/personal/my-address-list" class="address-navigator" hover-class="none"><label class="iconfont aca-youjiantou"></label></navigator>
				</view>
				<view class="confirm-order-goods-list" v-for="(item, index) in dataSource" :key="index">
					<view class="shop-list">
						<view class="header">
							<image class="shop-img" :src="item.storePicture"></image>
							<label class="shop-name">{{ item.storeName }}</label>
						</view>
						<view class="goods-list">
							<view class="items" v-for="(pro, pindex) in item.goodsInst" :key="pindex">
								<view class="goods-image"><image :src="pro.goodsPictures"></image></view>
								<view class="goods-details">
									<label class="goods-name">{{ pro.goodsName }}</label>
									<label class="shipping-address">发货地：{{ pro.producer }}</label>
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
						<view class="delivery">
							<view class="left">
								<label class="title">普通快递</label>
								<label class="value">普通快递</label>
							</view>
							<view class="right">快递 免邮</view>
						</view>
						<view class="remarks">
							<label class="title">订单备注</label>
							<input type="text" placeholder="选填，请先和商家协商一致再备注！" />
						</view>
						<view class="goods-total">
							<label class="count">共{{ item.goodsTotalNum }}件</label>
							<label class="title">小计：</label>
							<label class="price">¥{{ item.goodsTotalPrice }}</label>
						</view>
					</view>
				</view>
			</scroll-view>
		</bht-layout-container>
		<view class="confirm-order-footer">
			<view class="details">
				<label class="count">共{{ totalNum }}件</label>
				<label class="title">合计：</label>
				<label class="amount">¥{{ totalPrice }}</label>
			</view>
			<view class="sub-order-btn" @click="submitOrder">提交订单</view>
		</view>
	</view>
</template>

<script>
import { postCommitOrder } from '@/api/shop.js';
/**
 * 提交订单/确认订单
 */
export default {
	data() {
		return {
			bottomHeight: uni.upx2px(114),
			dataSource: [],
			totalNum: 0,
			totalPrice: 0,
			commitType: 0
		};
	},
	methods: {
		//提交订单处理
		submitOrder() {
			let subItems = [];

			this.dataSource.forEach((item, index) => {
				item.goodsInst.forEach((pro, pindex) => {
					let items = {
						goodsId: pro.goodsId,
						goodsNum: pro.goodsNum,
						storeId: item.storeId,
						goodsInstAttrs: [
							{
								attrId: 1,
								attrValueId: 2
							}
						]
					};
					subItems.push(items);
				});
			});
			let params = {
				shopCarNbr: '1577155815747e4466f8cf9d1422dabe74d9a2c41753a',
				goodsInsts: subItems,
				commitType: this.commitType,
				orderAddressId: ''
			};
			console.log('-----params-----');
			console.log(params);
			postCommitOrder(params).then(res => {
				console.log(res.resultCode);
				if(res.code == 200){
					uni.navigateTo({
						url: '/pages/shop/pay-success'
					});
				} else {
					uni.showToast({
						title:res.msg,
						icon:'none'
					})
				}
				
			});
			
		}
	},
	onLoad: function(option) {
		this.dataSource = JSON.parse(decodeURIComponent(option.item));
		console.log('---wxy---' + option.commitType);
		this.commitType = option.commitType;
		this.dataSource.forEach((item, index) => {
			this.totalNum += Number.parseInt(item.goodsTotalNum);
			this.totalPrice += item.goodsTotalPrice;
		});
	}
};
</script>

<style lang="scss" scoped>
$text-color: #333333;
.confirm-order-container {
	.address-box {
		padding: 0 32rpx;
		display: flex;
		align-items: center;
		height: 194rpx;
		@include bht-box;
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
			}
		}
		.address-navigator {
			display: flex;
			align-items: center;
			justify-content: flex-end;
			width: 120rpx;
			height: 100%;
			label {
				font-size: 32rpx;
				color: #9a9a9a;
			}
		}
	}
	.confirm-order-footer {
		position: absolute;
		bottom: 0;
		display: flex;
		align-items: center;
		justify-content: flex-end;
		width: 100%;
		height: 114rpx;
		background-color: #ffffff;
		&::before {
			content: '';
			position: absolute;
			top: 0;
			right: 0;
			left: 0;
			width: 100%;
			border-top: 1px solid #aaaaaa;
		}
		.details {
			font-size: 30rpx;
			.count {
				color: #868686;
			}
			.title {
				margin-left: 4px;
				color: $text-color;
			}
			.amount {
				margin-left: 4px;
				color: #ff3333;
			}
		}
		.sub-order-btn {
			margin-left: 7px;
			margin-right: $padding-content;
			width: 200rpx;
			height: 82rpx;
			line-height: 82rpx;
			background-color: #ff6f04;
			border-radius: 50px;
			text-align: center;
			font-size: 30rpx;
			color: #fff;
		}
	}
	.bht-layout-content {
		padding: $padding-content;
	}

	.confirm-order-goods-list {
		margin-top: 32rpx;
		padding: $padding-content;
		@include bht-box;

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
			.delivery {
				display: flex;
				justify-content: space-between;
				margin-top: 32rpx;
				font-size: 26rpx;
				.left {
					.title {
						margin-right: 18rpx;
						color: $text-color;
					}
					.value {
						color: #868686;
					}
				}
				.right {
					color: $text-color;
				}
			}
			.remarks {
				display: flex;
				align-items: center;
				margin-top: $padding-content;
				height: 35px;
				line-height: 35px;
				font-size: 26rpx;
				.title {
					margin-right: 18rpx;
					color: $text-color;
				}
				input {
					flex: 1;
					height: 35px;
					line-height: 35px;
					font-size: 26rpx;
				}
			}

			.goods-total {
				margin: 44rpx 0;
				font-size: 26rpx;
				text-align: right;
				.count {
					color: #868686;
					margin-right: 5px;
				}
				.title {
					color: $text-color;
				}
				.price {
					color: #ff3333;
				}
			}
		}
	}
}
</style>
