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
				<view class="package-type" v-for="(item, index) in skuData" :key="index">
					<view class="name">{{ item.attrName }}</view>
					<view class="tag-list">
						<view class="tag" v-for="(pro, pIndex) in item.attrValues" :key="pIndex">
							<view class="tags" v-model="pro.type" :class="{ 'active-tags': pro.type == 'success' }" @click="bindClick(item, pro)">{{ pro.attrValue }}</view>
						</view>
					</view>
				</view>
				<view class="buy-number">
					<view class="name">购买数量</view>
					<uni-number-box :min="1" :max="9" :value="1" v-model="curNumber" :disabled="true" @change="change()"></uni-number-box>

					<!-- <view class="number-controls"><uniNumberBox :min="1" :step="1" :max="9" :value="1" :disabled='false' @change="change"></uniNumberBox></view> -->
				</view>
			</view>
			<view class="dialog-finish"><button class="finish-btn" @click="confirm">完成</button></view>
		</view>
	</uni-popup>
</template>

<script>
import UniPopup from '@/third/uni-popup/uni-popup.vue';
import UniNumberBox from '@/components/cart/uni-number-box.vue';
export default {
	name: 'specifi-dialog',
	components: {
		UniPopup,
		UniNumberBox
	},
	props: {
		value: {},
		skuData: {
			type: Array,
			default: () => {
				return [];
			}
		}
	},
	data() {
		return {
			showPopup: this.value,
			specData: this.skuData,
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
			this.$emit('input', e);
		},
		change(value) {
			console.log(value);
			this.curNumber = value;
		},
		bindClick(item, pro) {
			item.attrValues.forEach((tmItem, index) => {
				tmItem.type = 'default';
			});
			if (pro.type == 'default') {
				pro.type = 'success';
				this.curTag = pro;
			} else {
				pro.type = 'default';
				this.curTag = {};
			}
			this.$forceUpdate();
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

					.tags {
						display: -webkit-box;
						display: flex;
						padding: 0px 16px;
						height: 30px;
						line-height: 30px;
						justify-content: center;
						color: #333;
						border-radius: 2px;
						background-color: #f8f8f8;
						border-width: 1px;
						border-style: solid;
						border-color: #f8f8f8;
						border-radius: 15px;
					}
					.active-tags {
						background-color: #ff3333;
						color: #fff;
					}
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
