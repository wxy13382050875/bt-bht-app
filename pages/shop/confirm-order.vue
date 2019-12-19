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
							<image src="../../static/icon/icon-store.png"></image>
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
		height: 220px;
		@include bht-box;
	}
}
</style>
