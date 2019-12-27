<template>
	<uni-popup :show="showPopup" type="bottom" @change="uniPopupChange">
		<view class="dialog">
			<view class="dialog-header">
				<view class="info">
					<image src="../../static/news/1.png" mode=""></image>
					<view class="content">
						<view class="price">¥360.9</view>
						<view class="inventory">库存268件</view>
						<view class="selectType">选择套餐类型</view>
					</view>
				</view>
				<view class="close" @click="closePopup"><image src="../../static/icon/icon_close.png" mode=""></image></view>
			</view>
			<view class="dialog-content">
				<view class="package-type">
					<view class="name">套餐类型</view>
					<view class="tag-list">
						<view class="tag" v-for="(item, index) in dataTag" :key="index">
							<uniTag :type="item.type" :text="item.text" @click="bindClick(item)" inverted="false" :circle="true"></uniTag>
						</view>
					</view>
				</view>
				<view class="buy-number">
					<view class="name">购买数量</view>
					<view class="number-controls"><uniNumberBox :min="0" :max="9" @change="change"></uniNumberBox></view>
				</view>
			</view>
			<view class="dialog-finish"><button class="finish-btn" @click="confirm">完成</button></view>
		</view>
	</uni-popup>
</template>

<script>
import UniPopup from '@/third/uni-popup/uni-popup.vue';
import uniTag from '@/third/uni-tag/uni-tag.vue';
import UniNumberBox from '@/components/cart/uni-number-box.vue';
export default {
	name: 'specifi-dialog',
	components: {
		UniPopup,
		uniTag,
		UniNumberBox
	},
	props: {
		value: {},
		skuData: {
			type: Object,
			default: () => {
				return {};
			}
		}
	},
	data() {
		return {
			showPopup: false,
			type: 'default',
			dataTag: [
				{
					id: 1,
					text: 'taoCAN1',
					type: 'default'
				},
				{
					id: 2,
					text: 'taoCAN1',
					type: 'default'
				},
				{
					id: 3,
					text: 'taoCAN1',
					type: 'default'
				},
				{
					id: 4,
					text: 'taoCAN1',
					type: 'default'
				},
				{
					id: 5,
					text: 'taoCAN1',
					type: 'default'
				},
				{
					id: 6,
					text: 'taoCAN1',
					type: 'default'
				},
				{
					id: 7,
					text: 'taoCAN1',
					type: 'default'
				}
			],
			curTag: null,
			curNumber: 1
		};
	},

	watch: {
		value(n) {
			this.showPopup = n;
		}
	},

	methods: {
		//确认事件
		confirm() {
			if (this.curTag != null) {
				this.showPopup = false;
				this.$emit('tagChange', this.curTag, this.curNumber);
			} else {
				console.log('请选择规格');
				uni.showToast({
					icon: 'none',
					title: '请选择规格'
				});
			}
		},
		closePopup() {
			this.showPopup = false;
		},
		uniPopupChange(e) {
			// console.log('---' +e);
			this.$emit('input', e);
		},
		change(value) {
			this.curNumber = value;
		},
		bindClick(item) {
			this.dataTag.forEach((item, index) => {
				item.type = 'default';
			});
			if (item.type == 'default') {
				item.type = 'success';
				this.curTag = item;
			} else {
				item.type = 'default';
				this.curTag = null;
			}
		}
	}
};
</script>

<style lang="scss">
.dialog {
	background: #ffffff;
	border-radius: 30rpx 30rpx 0px 0px;

	.dialog-header {
		margin-left: 20rpx;
		margin-right: 10px;
		height: 320rpx;
		display: flex;
		justify-content: space-between;
		border-bottom: 1rpx solid #a7a7a7;
		.info {
			display: flex;
			justify-content: space-between;
			align-items: center;

			image {
				width: 240rpx;
				height: 240rpx;
			}
			.content {
				margin-left: 30rpx;
				.price {
					font-size: 32rpx;
					color: #ff3333;
				}
				.inventory {
					font-size: 22rpx;
					color: #999999;
				}
				.selectType {
					font-size: 24rpx;
					color: #333333;
				}
			}
		}
		.close {
			margin-top: 38rpx;
			image {
				width: 38rpx;
				height: 38rpx;
			}
		}
	}
	.dialog-content {
		margin-left: 20rpx;
		margin-right: 20rpx;

		.package-type {
			border-bottom: 1rpx solid #a7a7a7;

			.name {
				height: 80rpx;
				line-height: 80rpx;
				margin-bottom: 20rpx;
				font-size: 28rpx;
				color: #333333;
			}
			.tag-list {
				display: flex;
				flex-wrap: wrap;
				.tag {
					padding: 0 10rpx;
					margin-bottom: 10rpx;
				}
			}
		}
		.buy-number {
			height: 106rpx;
			display: flex;
			justify-content: space-between;
			border-bottom: 1rpx solid #a7a7a7;
			align-items: center;
			.name {
				font-size: 28rpx;
				color: #333333;
			}
			// .number-controls{
			// 	width: 200rpx;
			// 	height: 44rpx;
			// }
		}
	}
	.dialog-finish {
		margin-top: 200rpx;
		margin-left: 20rpx;
		margin-right: 10px;
		height: 117rpx;
		width: 100%;
		display: flex;
		align-items: center;
		.finish-btn {
			height: 87rpx;
			width: 690rpx;
			background: #ff3333;
			opacity: 1;
			border-radius: 41px 41px 41px 41px;
			color: #ffffff;
			font-size: 30rpx;
		}
	}
}
</style>
