<template>
	<uni-popup :show="showPopup" type="bottom" @change="uniPopupChange">
		<view class="dialog">
			<view class="dialog-header">商品参数</view>
			<view class="dialog-content">
				<view class="dialog-item">
					<view class="name">生产日期</view>
					<view class="content">2019年04月05日至2019年04月10日</view>
				</view>
				<view class="dialog-item">
					<view class="name">品牌</view>
					<view class="content">云南高原农特</view>
				</view>
				<view class="dialog-item">
					<view class="name">系列</view>
					<view class="content">红茶套餐</view>
				</view>
				<view class="dialog-item">
					<view class="name">包装方式</view>
					<view class="content">包装</view>
				</view>
				<view class="dialog-item">
					<view class="name">包装种类</view>
					<view class="content">罐子装</view>
				</view>
				<view class="dialog-item">
					<view class="name">种类</view>
					<view class="content">金骏梅</view>
				</view>
				<view class="dialog-item">
					<view class="name">级别</view>
					<view class="content">特级</view>
				</view>
				<view class="dialog-item">
					<view class="name">生长季节</view>
					<view class="content">春季</view>
				</view>
				<view class="dialog-item">
					<view class="name">场地</view>
					<view class="content">中国麻栗坡附近</view>
				</view>
			</view>
			<view class="dialog-finish">
			<button class="finish-btn" @click="confirm">完成</button>
			</view>
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
		value: {}
	},
	data() {
		return {
			showPopup: false
		};
	},
	computed: {
		// model: {
		// 	get() {
		// 		console.log('-----' + n);
		// 		return this.value;
		// 	},
		// 	set(n) {
		// 		console.log('-----' + n);
		// 		this.showPopup = n;
		// 	}
		// }
	},
	watch: {
		value(n) {
			this.showPopup = n;
			console.log('---xxx--' + n);
		}
	},

	methods: {
		//确认事件
		confirm() {
			this.showPopup = false;
		},
		uniPopupChange(e) {
			console.log("xxx===>"+e)
			this.$emit('input', e);
		}
	}
};
</script>

<style lang="scss">
.dialog {
	background: #FFFFFF;
	border-radius:30rpx 30rpx 0px 0px;
	.dialog-header {
		height: 80rpx;
		display: flex;
		line-height: 80rpx;
		justify-content: center;
		align-items: center;
		font-size: 30rpx;
		color: #333333;
	}
	.dialog-content{
		margin-left: 20rpx;
		margin-right: 20rpx;
		.dialog-item{
			display: flex;
			height: 80rpx;
			line-height: 80rpx;
			border-bottom: 1rpx solid #A7A7A7;
			
			.name{
				
				width: 200rpx;
				font-size: 28rpx;
				color: #333333;
			}
			.content{
				
				font-size:28rpx;
				color: #9A9A9A;
			}
		}
		
	}
	.dialog-finish{
			height: 117rpx;
			width: 100%;
			display: flex;
			align-items: center;
			.finish-btn{
				height: 87rpx;
				width: 690rpx;
				background:#FF3333;
				opacity:1;
				border-radius:41px 41px 41px 41px;
				color: #FFFFFF;
				font-size: 30rpx;
			}
		}
}
</style>
