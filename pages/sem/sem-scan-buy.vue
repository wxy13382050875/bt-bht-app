<template>
	<view class="sem-scan-container">
		<nav-bar-back title="边民互市二级交易市场"></nav-bar-back>
		<bht-layout-container bgColor="#F2F2F2" :bottom="0">
			<view class="header">
				<view class="box" @click="scanEvent">
					<image src="/static/icon/scan_icon.png" class="icon"></image>
					<text class="title">扫一扫</text>
				</view>
			</view>
			<view class="scan-list-container">
				<sem-scan-list></sem-scan-list>
				<view class="tips" v-if="goodsList.length == 0">请"扫一扫"添加商品！</view>
			</view>
			<!-- <view class="scan-footer">
				<nz-checkbox :circle="true" label="全选"></nz-checkbox>
				<view class="total">
					<label>合计：</label>
					<text class="price">¥323200</text>
				</view>
				<view class="sub-btn">提交订单(22)</view>
			</view> -->
		</bht-layout-container>
	</view>
</template>

<script>
import SemScanList from '@/components/sem/sem-list/sem-scan-list.vue';
import { queryGoodsListByIdCard } from '@/api/sem.js';
import { mapGetters } from 'vuex';
export default {
	components: {
		SemScanList
	},
	data() {
		return {
			pageFlag: 'sem'
		};
	},
	computed: {
		...mapGetters({
			tabBarFlag: 'utp/getTabBarIndex',
			goodsList: 'sem/goodsList'
		})
	},
	onLoad() {
		// #ifdef H5
		//在H5端做模拟
		queryGoodsListByIdCard({ idCode: '536102197708241210' })
			.then(res => {})
			.catch(error => {
				console.log(error);
			});
		// #endif
	},
	methods: {
		scanEvent() {
			//#ifdef H5
			uni.showToast({
				icon: 'none',
				title: '暂时不支持扫描'
			});
			return;
			//#endif
			uni.scanCode({
				success: function(res) {
					queryGoodsListByIdCard({ idCode: res.result })
						.then(res => {
							this.goodsList = res.data;
						})
						.catch(error => {
							console.log(JSON.stringify(error));
						});
				},
				fail: function(error) {
					uni.showToast({
						icon: 'none',
						title: '识别失败，重新扫描'
					});
				}
			});
		}
	}
};
</script>

<style lang="scss">
.sem-scan-container {
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
