<template>
	<view>
		<nav-bar-back title="查验结果确认" popType="0"></nav-bar-back>
		<bht-layout-container :bottom="0">
			<view v-if="insData != null">
				<view class="ins-rs-container">
					<view class="cell">
						<label class="title">申报人：</label>
						<label class="value">{{insData.civilName}}</label>
					</view>
					<view class="cell">
						<label class="title">申报时间：</label>
						<label class="value">{{insData.declarationTime}} </label>
					</view>
					<view class="cell">
						<label class="title">进出口标识：</label>
						<label class="value">{{insData.inOut}}</label>
					</view>
					<view class="cell">
						<label class="title">商品名称：</label>
						<label class="value">{{insData.goodsName}}</label>
					</view>
					<view class="cell">
						<label class="title">唛码：</label>
						<label class="value">{{insData.lableCode}}</label>
					</view>
					<view class="cell">
						<label class="title">查验过程记录：</label>
						<label class="value">{{insData.visamemo}}</label>
					</view>
					<view class="cell">
						<label class="title">查验结果：</label>
						<label class="value">{{insData.isvisamemo }}</label>
					</view>
					<view class="cell">
						<label class="title">处理意见：</label>
						<label class="value">{{insData.isCheckIdea}}</label>
					</view>
					<view class="cell">
						<label class="title">查验关员：</label>
						<label class="value">{{insData.chkUser}}</label>
					</view>
					<view class="cell">
						<label class="title">查验时间：</label>
						<label class="value">{{insData.dectime}}</label>
					</view>
				</view>
				<view class="ins-rs-footer">
					<view class="btn" @click="checkConfirm">查验结果确认</view>
				</view>
			</view>
			<view v-else class="no-data-container">
				<image class="icon" src="/static/bmhs/no-data-icon.png"></image>
				<label class="msg">没有可确认的信息</label>
			</view>
		</bht-layout-container>
	</view>
</template>

<script>
	/**
	 * 查验结果确认
	 */
	import {
		getWaitingConfirmData,
		commitWaitingConfirm
	} from '@/api/bmhs.js'

	export default {
		data() {
			return {
				insData: null
			}
		},
		onLoad() {
			this.getData();
		},
		methods: {
			getData() {
				getWaitingConfirmData().then(res => {
					this.insData = res.data;
				}).catch(error => {
					this.insData = null
				})
			},
			checkConfirm() {
				commitWaitingConfirm({
					seqNo: this.insData.seqNo
				}).then(res => {
					if (res.code == "200") {
						uni.showToast({
							title: '确认成功',
							icon: 'success',
							duration: 3000
						})
						setTimeout(() => {
							this.getData();
						}, 3000)
					}
				}).catch(error => {
					uni.showToast({
						title: error.msg,
						icon: 'none',
						duration: 3000
					})
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.ins-rs-container {
		position: absolute;
		top: 0;
		bottom: 60px;
		width: 100%;
		overflow-y: scroll;

		.cell {
			display: flex;
			justify-content: space-between;
			padding: 5px $padding-content;
			background-color: #fff;
			margin-bottom: $padding-content;
			font-size: 29rpx;

			.title {
				width: 200rpx;
				text-align: right;
				color: #8d8d8d;
			}

			.value {
				padding-left: 5px;
				flex: 1;
			}
		}

	}

	.ins-rs-footer {
		position: fixed;
		bottom: 0;
		width: 100%;
		display: flex;
		align-items: center;
		padding: 0 12px;
		width: 100%;
		height: 60px;
		background-color: #f7f3f0;

		.btn {
			flex: 1;
			display: flex;
			align-items: center;
			justify-content: center;
			height: 42px;
			color: #fff;
			border-radius: 50px;
			background-color: #ff3333;
		}
	}


	.no-data-container {
		display: flex;
		align-items: center;
		justify-content: center;
		flex-direction: column;
		height: 100%;

		.icon {
			width: 313rpx;
			height: 215rpx;
		}

		.msg {
			margin-top: $padding-content;
			font-size: 24rpx;
			color: #333;
		}
	}
</style>
