<template>
	<view>
		<nav-bar-back title="出口商品申报" popType="0"></nav-bar-back>
		<bht-layout-container :bottom="0">
			<view class="goods-dec-container" v-if="goodsData.length>0">
				<view class="goods-header-container">
					<goods-header-box :goods-header-data="goodsHeaderData"></goods-header-box>
				</view>
				<view class="data-list-container">
					<goods-data-list></goods-data-list>
				</view>
				<view class="goods-footer-container">
					<goods-footer :seqNo="seqNo"></goods-footer>
				</view>
			</view>
			<view class="">
				没有可申报的数据
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
					console.log(res)
				})
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
</style>
