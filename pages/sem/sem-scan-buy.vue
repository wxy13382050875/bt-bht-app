<template>
	<view class="sem-scan-container">
		<nav-bar-back title="边民互市二级交易市场"></nav-bar-back>
		<bht-layout-container bgColor="#F2F2F2" :bottom="0">
			<view class="header">
				<view class="box" @click="scanEventHandler">
					<image src="/static/icon/scan_icon.png" class="icon"></image>
					<text class="title">扫一扫</text>
				</view>
			</view>
			<view class="scan-list-container">
				<sem-goods-list></sem-goods-list>
				<view class="tips" v-if="goodsData.list.length == 0">请"扫一扫"添加商品！</view>
			</view>
			<sem-goods-footer @submitOrderSuccess="submitOrderSuccessHandler"></sem-goods-footer>
		</bht-layout-container>
	</view>
</template>

<script>
/**
 * 扫描身份证购买
 */
import SemGoodsList from '@/components/sem/sem-list/sem-goods-list.vue';
import SemGoodsFooter from '@/components/sem/sem-list/sem-goods-footer.vue';

import { queryGoodsListByIdCard } from '@/api/sem.js';
import { mapActions, mapGetters } from 'vuex';
export default {
	components: {
		SemGoodsList,
		SemGoodsFooter
	},
	data() {
		return {
			totalAmount: 0,
			checkTotalCount: 0,
			checkAll: false
		};
	},
	computed: {
		...mapGetters({
			goodsData: 'sem/goodsData'
		})
	},
	onLoad() {
		// #ifdef H5
		//在H5端做模拟假数据
		queryGoodsListByIdCard({ idCode: '532331199701032644' })
			.then(res => {
				res.data.forEach((item, index) => {
					item.checked = false;
				});
				this.addGoodsData(res.data);
			})
			.catch(error => {
				console.log(error);
			});
		// #endif
	},
	methods: {
		...mapActions({
			addGoodsData: 'sem/addGoodsData'
		}),
		/**
		 * 处理订单成功回调
		 */
		submitOrderSuccessHandler(result){
			
		},
		/**
		 * 扫描处理
		 */
		scanEventHandler() {
			//#ifdef H5
			uni.showToast({
				icon: 'none',
				title: '暂时不支持扫描'
			});
			return;
			//#endif
			var _that = this;
			uni.scanCode({
				success: function(res) {
					//res.result 扫描得到的身份证号码
					queryGoodsListByIdCard({ idCode: '532331199701032644' })
						.then(res => {
							res.data.forEach((item, index) => {
								item.checked = false;
							});
							_that.addGoodsData(res.data);
						})
						.catch(error => {
							console.log(error);
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
}
</style>
