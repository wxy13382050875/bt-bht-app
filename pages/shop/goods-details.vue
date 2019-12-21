<template>
	<view>
		<nav-bar-back title="商品详情"></nav-bar-back>
		<bht-layout-container :bottom="layoutBottom">
			<view class="bht-layout-content">
				<!--商品详情-->
				<xw-dth-details-info :dataSource="goodsInfo"></xw-dth-details-info>
				<!--商品参数-->
				<xw-dth-details-param @showParamDialog="showParamDialog" @showSpecifiDialog="showSpecifiDialog"></xw-dth-details-param>
				<!-- <detailsStore></detailsStore>
				<goods :dataSource="dataSource.selling" :count="3"></goods>
				<detailsImage :dataSource="dataSource.banner"></detailsImage>
				<detailsRecommend :dataSource="dataSource.recommended"></detailsRecommend> -->
			</view>
		</bht-layout-container>
		<paramDialog v-model="bShowParamDialog"></paramDialog>
		<specifiDialog v-model="bShowSpecifiDialog" @tagChange="tagChange"></specifiDialog>
		<xw-dth-details-bottom></xw-dth-details-bottom>
	</view>
</template>

<script>
import XwDthDetailsInfo from '@/components/details/xw-dth-details-info.vue';
import XwDthDetailsParam from '@/components/details/xw-dth-details-param.vue';
import detailsStore from '@/components/details/xw-dth-details-store.vue';
import goods from '@/components/details/xw-dth-goods.vue';
import XwDthDetailsBottom from '@/components/details/xw-dth-details-bottom.vue';
import detailsImage from '@/components/details/xw-dth-details-image.vue';
import detailsRecommend from '@/components/details/xw-dth-details-recommend.vue';
import paramDialog from '@/components/details/xw-dth-details-param-dialog.vue';
import specifiDialog from '@/components/details/xw-dth-details-specifi-dialog.vue';
import { findGoodsAllInfoByGodosIdAndStoreId } from '@/api/shop.js';
export default {
	components: {
		XwDthDetailsInfo,
		XwDthDetailsParam,
		detailsStore,
		goods,
		detailsImage,
		XwDthDetailsBottom,
		detailsRecommend,
		paramDialog,
		specifiDialog
	},
	data() {
		return {
			bShowParamDialog: false,
			bShowSpecifiDialog: false,
			layoutBottom: uni.upx2px(119),
			goodsInfo: {
				goods: {
					goodsPictures: [],
					goodsParamRels: []
				}
			}
		};
	},
	onLoad(option) {
		findGoodsAllInfoByGodosIdAndStoreId(option).then(res => {
			this.goodsInfo = res.data.goods;
		});
	},
	methods: {
		/**
		 * 显示商品参数
		 */
		showParamDialog(e) {
			console.log('-----showParamDialog-----');
			this.bShowParamDialog = true;
		},
		/**
		 *
		 */
		showSpecifiDialog(e) {
			console.log('-----showSpecifiDialog-----');
			this.bShowSpecifiDialog = true;
		},
		/**
		 * 套餐选择
		 */
		tagChange(tag, number) {
			console.log(tag + '------- ' + number);
		}
	}
};
</script>

<style></style>
