<template>
	<view>
		<nav-bar-back title="出口商品申报" popType="0"></nav-bar-back>
		<bht-layout-container :bottom="0">
			<view class="goods-dec-container" v-if="goodsData.length>0">
				<view class="goods-header-container">
					<goods-header-box :goods-header-data="goodsHeaderData"></goods-header-box>
				</view>
				<view class="data-list-container">
					<goods-data-list :goodsData="goodsData"></goods-data-list>
				</view>
				<view class="goods-footer-container">
					<goods-footer :seqNo="seqNo" @successDec="successDec"></goods-footer>
				</view>
			</view>
			<view class="no-data-container" v-else>
				<image class="icon" src="/static/bmhs/no-data-icon.png"></image>
				<label class="msg">没有可申报数据</label>
			</view>
		</bht-layout-container>
	</view>
</template>

<script>
	/**
	 * 出口商品申报
	 */
	import GoodsHeaderBox from '@/components/bmhs/goods/goods-header-box.vue'
	import GoodsDataList from '@/components/bmhs/goods/goods-data-list.vue'
	import GoodsFooter from '@/components/bmhs/goods/goods-footer.vue'
	import {
		goodsDesList
	} from '@/api/bmhs.js'
	export default {
		components: {
			GoodsHeaderBox,
			GoodsDataList,
			GoodsFooter
		},
		data() {
			return {
				inOut: 1,
				seqNo: '',
				goodsHeaderData: {},
				goodsData: []
			}
		},
		onLoad() {
			this.postDec();
		},
		methods: {
			postDec() {
				goodsDesList(this.inOut).then(res => {
					let {
						data
					} = res;
					this.goodsData = data.goodsList;
					this.goodsHeaderData.civilName = data.civilName;
					this.goodsHeaderData.vehicleId = data.vehicleId;
					this.goodsHeaderData.inOut = data.inOut;
					this.goodsHeaderData.totalGoodsAmout = data.totalGoodsAmout;
					this.goodsHeaderData.billingSeqNo = data.billingSeqNo;
					this.goodsHeaderData.seqNo = data.seqNo;
					this.seqNo = data.seqNo;
				}).catch(error => {
					this.goodsData = [];
				})
			},
			successDec(res) {
				if (res) {
					//如果申报成功，重新加载数据
					this.postDec();
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.goods-dec-container {
		display: flex;
		flex-direction: column;
		height: 100%;

		.goods-header-container {
			height: 120px;
		}

		.data-list-container {
			flex: 1;
			overflow: auto;
			height: 0; //纵向需要滚动条的话

		}

		.goods-footer-container {
			height: 60px;
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
