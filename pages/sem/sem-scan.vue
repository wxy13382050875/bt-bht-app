<template>
	<view class="sem-index-container">
		<nav-bar-back title="边民互市二级交易市场"></nav-bar-back>
		<bht-layout-container bgColor="#F2F2F2" :bottom="0">
			<view class="header">
				<view class="box" @click="scanEvent">
					<image src="/static/icon/scan_icon.png" class="icon"></image>
					<text class="title">扫一扫</text>
				</view>
			</view>
			<view class="scan-list-container">
				<view class="list-items" v-for="item in 4">
					<view class="check"><nz-checkbox :circle="true"></nz-checkbox></view>
					<view class="info">
						<view class="info-header">
							<view class="goods-name">木炭,鲜水果、活螃蟹...</view>
							<view class="price">
								<label class="symbol">¥</label>
								<text class="value">8000</text>
							</view>
						</view>
						<view class="info-items">
							<label class="title">边民姓名</label>
							<text class="value">王国富</text>
						</view>
						<view class="info-items">
							<label class="title">车牌号</label>
							<text class="value">云A.22222</text>
						</view>
						<view class="info-items">
							<label class="title">重量</label>
							<text class="value">200kg</text>
						</view>
						<view class="info-items">
							<label class="title">单价</label>
							<text class="value">¥22</text>
						</view>
						<view class="info-items">
							<label class="title">数量</label>
							<text class="value">3333</text>
						</view>
					</view>
				</view>
				<view class="tips">请"扫一扫"添加商品！</view>
			</view>
			<view class="scan-footer">
				<nz-checkbox :circle="true" label="全选"></nz-checkbox>
				<view class="total">
					<label>合计：</label>
					<text class="price">¥323200</text>
				</view>
				<view class="sub-btn">提交订单(22)</view>
			</view>
		</bht-layout-container>
	</view>
</template>

<script>
	import NavBarTitle from '@/components/navbar/navbar-title-default.vue';
	import NzCheckbox from '@/third/acaui/nz-checkbox/nz-checkbox.vue';
	import { mapGetters } from 'vuex';
	export default {
		components: {
			NavBarTitle,
			NzCheckbox
		},
		data() {
			return {
				pageFlag: 'sem'
			};
		},
		computed: {
			...mapGetters({
				tabBarFlag: 'utp/getTabBarIndex'
			})
		},
		methods: {
			scanEvent() {
				uni.scanCode({
					success: function(res) {
						console.log('条码类型：' + res.scanType);
						console.log('条码内容：' + res.result);
					}
				});
			}
		}
	};
</script>

<style lang="scss">
	.sem-index-container {
		.header {
			display: flex;
			justify-content: center;
			height: 140rpx;
			background-color: #ef4455;
			text-align: center;
			.box {
				display: flex;
				flex-direction: column;
				align-items: center;
				justify-content: center;
				.icon {
					width: 62rpx;
					height: 62rpx;
				}
				.title {
					margin-top: 6rpx;
					font-size: 30rpx;
					color: #fff;
				}
			}
		}
		.scan-list-container {
			position: absolute;
			top: 140rpx;
			bottom: 114rpx;
			padding: $padding-content;
			overflow-y: scroll;
			width: 100%;
			.list-items {
				display: flex;
				margin-bottom: $padding-content;
				padding: 0 $padding-content;
				background-color: #fff;
				border-radius: 10px;
				&:last-child {
					margin-bottom: 0;
				}
	
				.check {
					display: flex;
					align-items: center;
					width: 42px;
				}
				.info {
					flex: 1;
					.info-header {
						display: flex;
						justify-content: space-between;
						align-items: center;
						height: 71rpx;
						border-bottom: 2px solid #b2b4b3;
						.goods-name {
							flex: 1;
							text-overflow: hidden;
							font-size: 32rpx;
							color: #333;
						}
						.price {
							width: 80px;
							text-align: right;
							color: #ff3333;
							.symbol {
								font-size: 22rpx;
							}
							.value {
								font-size: 32rpx;
							}
						}
					}
					.info-items {
						display: flex;
						align-items: center;
						justify-content: space-between;
						height: 54rpx;
						font: 26rpx;
						color: #898989;
						border-bottom: 1px solid #e5e5e5;
	
						&:last-child {
							border-bottom: 0;
						}
					}
				}
			}
			.tips {
				display: flex;
				align-items: center;
				justify-content: center;
				height: 100%;
				font-size: 34rpx;
				color: #e40011;
			}
		}
		.scan-footer {
			position: absolute;
			bottom: 0;
			padding: 0 $padding-content;
			display: flex;
			align-items: center;
			justify-content: space-between;
			width: 100%;
			height: 114rpx;
			font-size: 30rpx;
			background-color: #fff;
			.total {
				color: #333333;
				.price {
					color: #ff3333;
				}
			}
			.sub-btn {
				width: 238rpx;
				height: 82rpx;
				line-height: 82rpx;
				text-align: center;
				background-color: #ff6f04;
				border-radius: 41px;
				color: #ffffff;
			}
		}
	}
</style>
