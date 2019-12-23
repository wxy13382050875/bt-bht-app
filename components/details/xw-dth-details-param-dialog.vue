<template>
	<uni-popup :show="showPopup" type="bottom" @change="uniPopupChange">
		<view class="dialog">
			<view class="dialog-header">商品参数</view>
			<view class="dialog-content">
				<view class="dialog-item" v-for="(item, index) in paramData" :key="index">
					<view class="name">{{ item.paramName }}</view>
					<view class="content">{{ item.paramValue }}</view>
				</view>
			</view>
			<view class="dialog-finish"><button class="finish-btn" @click="confirm">完成</button></view>
		</view>
	</uni-popup>
</template>

<script>
import UniPopup from '@/third/uni-popup/uni-popup.vue';
export default {
	name: 'stat-date-picker',
	components: {
		UniPopup
	},
	props: {
		value: {},
		paramData: {
			type: Array,
			default: () => {
				return [];
			}
		}
	},
	data() {
		return {
			showPopup: false
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
			this.showPopup = false;
		},
		uniPopupChange(e) {
			this.$emit('input', e);
		}
	}
};
</script>

<style lang="scss">
.dialog {
	background: #ffffff;
	border-radius: 30rpx 30rpx 0px 0px;
	.dialog-header {
		height: 80rpx;
		display: flex;
		line-height: 80rpx;
		justify-content: center;
		align-items: center;
		font-size: 30rpx;
		color: #333333;
	}
	.dialog-content {
		margin-left: 20rpx;
		margin-right: 20rpx;
		.dialog-item {
			display: flex;
			height: 80rpx;
			line-height: 80rpx;
			border-bottom: 1rpx solid #a7a7a7;

			.name {
				width: 200rpx;
				font-size: 28rpx;
				color: #333333;
			}
			.content {
				font-size: 28rpx;
				color: #9a9a9a;
			}
		}
	}
	.dialog-finish {
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
