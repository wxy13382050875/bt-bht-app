<template>
	<view class="confirm-order-container">
		<nav-bar-back title="确认订单"></nav-bar-back>
		<bht-layout-container :bottom="bottomHeight">
			<view class="bht-layout-content">
				<view class="address-box">
					<view class="address-icon"><image src="/static/icon/address_loaction_icon.png"></image></view>
					<view class="address-info">
						<view class="address-info-user">
							<label class="name">余春林</label>
							<label class="phone">1833944725</label>
						</view>
						<view class="address-text">河南省郑州市中原区建设路街道，护国大厦B区20栋</view>
					</view>
					<navigator class="address-navigator" hover-class="none"><label class="iconfont aca-youjiantou"></label></navigator>
				</view>
				<view class="confirm-order-goods-list" v-for="item in 5">
					<view class="shop-list">
						<view class="header">
							<image class="shop-img" src="/static/icon/icon-store.png"></image>
							<label class="shop-name">高原农特产品</label>
						</view>
						<view class="goods-list">
							<view class="items" v-for="item in 2">
								<view class="goods-image"><image src="/static/small/1.jpg"></image></view>
								<view class="goods-details">
									<label class="goods-name">泰国正品白兰氏即食燕窝美容养颜滋补42ml*6瓶...</label>
									<label class="shipping-address">发货地：云南河口县</label>
								</view>
								<view class="goods-pum">
									<view class="price">
										<label class="symbol">¥</label>
										<label class="value">223.9</label>
									</view>
									<view class="num">
										<label class="symbol">x</label>
										<label class="value">2</label>
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
							<label class="count">共2件</label>
							<label class="title">小计：</label>
							<label class="price">¥447.8</label>
						</view>
					</view>
				</view>
			</view>
		</bht-layout-container>
		<view class="confirm-order-footer"></view>
	</view>
</template>

<script>
/**
 * 提交订单/确认订单
 */
export default {
	data() {
		return {
			bottomHeight: uni.upx2px(114)
		};
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
					font-size: 26rpx;
					color: #999999;
				}
			}
			.address-text {
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
		width: 100%;
		height: 114rpx;
		background-color: #ffffff;
		&::before {
			content: '';
			position: absolute;
			top: 0;
			width: 100%;
			border-top: 1px solid #aaaaaa;
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
