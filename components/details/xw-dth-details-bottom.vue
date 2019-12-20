<template>
	<view class="goods-bottom">
		<view class="left-btn">
			<view class="items">
				<image src="../../static/icon/icon-store.png"></image>
				<view class="title">店铺</view>
			</view>
			<view class="items">
				<image src="../../static/icon/icon-server.png"></image>
				<view class="title">客服</view>
			</view>
			<view :class="status == 1 ? 'selected' : 'default'" @click="changeCollection(status)">
				<image :src="collectionUrl"></image>
				<view class="title">收藏</view>
			</view>
		</view>

		<view class="right-btn">
			<button class="add-cart">加入购物车</button>
			<button class="buy-now" @click="buyNow">立即购买</button>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			status: 0,
			collectionUrl: '../../static/icon/icon-collection.png'
		};
	},
	methods: {
		//确认事件
		changeCollection(status) {
			if (status == 1) {
				this.status = 0;
				this.collectionUrl = '../../static/icon/icon-collection.png';
			} else {
				this.status = 1;
				this.collectionUrl = '../../static/icon/icon-collection-select.png';
			}
		},
		/**
		 * 立即购买处理
		 */
		buyNow() {
			uni.navigateTo({
				url: '/pages/shop/confirm-order'
			});
		}
	}
};
</script>

<style lang="scss" scoped>
.goods-bottom {
	display: flex;
	width: 100%;
	height: 119rpx;
	background: rgba(247, 243, 240, 1);
	opacity: 1;
	position: fixed;
	bottom: 0;
	&::before {
		content: '';
		position: absolute;
		top: 0;
		width: 100%;
		height: 1px;
		background-color: #aaaaaa;
	}
	.left-btn {
		display: flex;
		height: 100%;
		.items {
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			width: 119rpx;
			height: 100%;
			margin-bottom: $margin-bottom;

			image {
				margin-top: 20rpx;
				width: 50rpx;
				height: 50rpx;
			}

			.title {
				margin-top: 5rpx;
				font-size: 24rpx;

				color: rgba(134, 134, 134, 1);
			}
		}
		/*选择*/
		.selected {
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			width: 119rpx;
			height: 100%;
			margin-bottom: $margin-bottom;
			image {
				margin-top: 20rpx;
				width: 50rpx;
				height: 50rpx;
			}
			.title {
				margin-top: 5rpx;
				font-size: 24rpx;

				color: #ff3333;
			}
		}

		/*未选中*/
		.default {
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			width: 119rpx;
			height: 100%;
			margin-bottom: $margin-bottom;
			image {
				margin-top: 20rpx;
				width: 50rpx;
				height: 50rpx;
			}
			.title {
				margin-top: 5rpx;
				font-size: 24rpx;

				color: rgba(134, 134, 134, 1);
			}
		}
	}
	.right-btn {
		margin-top: 20rpx;
		height: 80rpx;
		display: flex;
		align-items: center;
		.add-cart {
			height: 100%;
			background: rgba(255, 111, 4, 1);
			opacity: 1;
			border-radius: 41px 0px 0px 41px;
			color: #ffffff;
			font-size: 30rpx;
		}
		.buy-now {
			height: 100%;

			background: #ff3333;
			opacity: 1;
			border-radius: 0px 41px 41px 0px;
			color: #ffffff;
			font-size: 30rpx;
		}
	}
	/* /* justify-content: space-between; */
}
</style>
