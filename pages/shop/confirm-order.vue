<template>
	<view class="confirm-order-container">
		<nav-bar-back title="确认订单" popType="0"></nav-bar-back>
		<bht-layout-container :bottom="bottomHeight">
			<scroll-view scroll-y="true" style="height: 100%;">
				<view class="address-box">
					<navigator url="/pages/personal/my-address-list?type=1" class="address-navigator" hover-class="none">
						<view class="no-address" v-if="address.addressId == ''">请添加收货地址</view>

						<view class="address" v-else>
							<view class="address-icon"><image src="/static/icon/address_loaction_icon.png"></image></view>
							<view class="address-info">
								<view class="address-info-user">
									<label class="name">{{ address.name }}</label>
									<label class="phone">{{ address.phone }}</label>
								</view>
								<view class="address-text">{{ address.location }}{{ address.detail }}</view>
							</view>
							<label class="iconfont aca-youjiantou"></label>
						</view>
					</navigator>
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

				<view class="order-pay-list" style="padding-left: 20rpx;padding-right:20rpx;height:160rpx;">
					<radio-group style="width: 100%;" @change="radioChange">
						<label
							style="display: flex;justify-content: space-between;height: 80rpx;line-height: 80rpx;border-bottom: 1rpx solid #a7a7a7;"
							class="uni-list-cell uni-list-cell-pd"
							v-for="(item, index) in items"
							:key="item.value"
						>
							<view>{{ item.name }}</view>
							<view><radio :value="item.id" :checked="index === current" /></view>
						</label>
					</radio-group>
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
import NzCheckbox from '@/third/acaui/nz-checkbox/nz-checkbox.vue';
/**
 * 提交订单/确认订单
 */
export default {
	components: {
		NzCheckbox
	},
	data() {
		return {
			bottomHeight: uni.upx2px(114),
			dataSource: [],
			totalNum: 0,
			totalPrice: 0,
			commitType: 0,
			address: {},
			title: 'request-payment',
			loading: false,
			price: 1,
			providerList: [],
			payType: 0,
			current: 0,
			payInfo: {},
			items: [
				{
					name: '支付宝',
					value: 0
				},
				{
					name: '微信',
					value: 1
				}
			]
		};
	},
	onShow() {
		// #ifdef APP-PLUS
		// #endif
	},
	methods: {
		radioChange: function(evt) {
			for (let i = 0; i < this.items.length; i++) {
				if (this.items[i].value === evt.target.value) {
					this.current = i;
					break;
				}
			}
		},

		payhandle() {
			var that = this;
			if (this.current == 0) {
				console.log('支付宝');
				uni.requestPayment({
					provider: 'alipay',
					orderInfo: '', // 订单数据
					success: function(res) {
						if (res.resultCode == 6001) {
							uni.showToast({
								title: '支付取消',
								icon: 'none',
								duration: 1500
							});
						} else {
							uni.showToast({
								title: '支付宝支付成功',
								icon: 'success',
								duration: 1500
							});
						}
					},
					fail: function(err) {
						// 支付失败的回调中 用户未付款
						uni.showToast({
							title: '支付取消',
							duration: 1500,
							icon: 'none'
						});
					}
				});
			} else {
				console.log(this.payInfo);

				uni.requestPayment({
					provider: 'wxpay',
					orderInfo: this.payInfo,
					success: res => {
						// uni.showToast({
						// 	title: '感谢您的赞助!'
						// });
						uni.navigateTo({
							url: '/pages/shop/pay-success?type=success'
						});
					},
					fail: res => {
						uni.showModal({
							content: '支付失败,原因为: ' + res.errMsg,
							showCancel: false
						});
						uni.navigateTo({
							url: '/pages/shop/pay-success?type=fail'
						});
					},
					complete: () => {
						this.loading = false;
					}
				});
			}
		},
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
			let userInfo = uni.getStorageSync('userInfo');

			let params = {
				shopCarNbr: userInfo.shopCarNbr,
				goodsInsts: subItems,
				commitType: this.commitType,
				orderAddressId: this.address.addressId
			};
			console.log('-----params-----');
			console.log(params);
			uni.showLoading({
				title: '正在提交...',
				mask: true
			});
			postCommitOrder(params).then(res => {
				console.log(res);
				uni.hideLoading();
				if (res.code == 200) {
					this.current = 1;
					this.payInfo = res.data.payInfo;
					//调用支付
					this.payhandle();
					//通知更新新购物信息
					uni.$emit('updateCart', { msg: '页面更新' });
				} else {
					uni.showToast({
						title: res.msg,
						icon: 'none'
					});
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
		this.address = uni.getStorageSync('defaultAddress');
		console.log(this.address);
	},
	onShow() {
		this.address = uni.getStorageSync('defaultAddress');
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
		justify-content: space-between;
		height: 194rpx;
		@include bht-box;

		.address-navigator {
			display: flex;
			align-items: center;
			width: 100%;
			height: 100%;
			.no-address {
				width: 100%;
				font-size: 32rpx;
				color: #9a9a9a;
				text-align: center;
			}
			.address {
				width: 100%;
				display: flex;
				align-items: center;
				justify-content: space-between;
				.address-icon {
					image {
						width: 76rpx;
						height: 89rpx;
					}
				}
				label {
					font-size: 32rpx;
					color: #9a9a9a;
					width: 50rpx;
				}
				.address-info {
					width: 100%;
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
	.order-pay-list {
		background: #ffffff;
		margin-top: 20rpx;

		.pay-cell {
			margin-left: 20rpx;
			margin-right: 20rpx;
			height: 80rpx;
			line-height: 80rpx;
			display: flex;
			justify-content: space-between;
			border-bottom: 1rpx solid #a7a7a7;
		}
	}
}
</style>
