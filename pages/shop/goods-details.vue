<template>
	<view>
		<nav-bar-back title="商品详情" popType="0"></nav-bar-back>
		<bht-layout-container :bottom="layoutBottom">
			<view class="bht-layout-content">
				<scroll-view scroll-y="true" style="height: 100%;">
					<!--商品详情-->
					<xw-dth-details-info :dataSource="goodsInfo"></xw-dth-details-info>
					<!--商品参数/是规格列表-->
					<xw-dth-details-param @showParamDialog="showParamDialog" @showSpecifiDialog="showSpecifiDialog"></xw-dth-details-param>
					<!--店铺信息-->
					<xw-dth-details-store :storeInfo="goodsInfo.store"></xw-dth-details-store>
					<!--店铺商品推荐-->
					<xw-dth-goods v-if="storeRecommendGoods.length > 0" title="店铺推荐" :dataSource="storeRecommendGoods" :count="3"></xw-dth-goods>
					<!--商品详情（图片/富文本）-->
					<xw-dth-details-image :goodsDetails="goodsInfo.goodsPictures"></xw-dth-details-image>
					<!--看了又看-->
					<xw-dth-detail-recommend :dataSource="seemLookGoods"></xw-dth-detail-recommend>
				</scroll-view>
			</view>
		</bht-layout-container>
		<!--商品参数dialog-->
		<xw-dth-detaails-param-dialog :paramData="goodsInfo.param" v-model="bShowParamDialog"></xw-dth-detaails-param-dialog>
		<!--套餐规格dialog-->
		<xw-dth-details-specifi-dialog :skuData="skuData" v-model="bShowSpecifiDialog" @tagChange="tagChange"></xw-dth-details-specifi-dialog>
		<xw-dth-details-bottom @showSpecifiDialog="showSpecifiDialog"></xw-dth-details-bottom>
	</view>
</template>

<script>
import XwDthDetailsInfo from '@/components/details/xw-dth-details-info.vue';
import XwDthDetailsParam from '@/components/details/xw-dth-details-param.vue';
import XwDthDetailsStore from '@/components/details/xw-dth-details-store.vue';
import XwDthGoods from '@/components/details/xw-dth-goods.vue';
import XwDthDetailsBottom from '@/components/details/xw-dth-details-bottom.vue';
import XwDthDetailsImage from '@/components/details/xw-dth-details-image.vue';
import XwDthDetailRecommend from '@/components/details/xw-dth-details-recommend.vue';
import XwDthDetaailsParamDialog from '@/components/details/xw-dth-details-param-dialog.vue';
import XwDthDetailsSpecifiDialog from '@/components/details/xw-dth-details-specifi-dialog.vue';
import { findGoodsAllInfoByGodosIdAndStoreId, addGoodsCart } from '@/api/shop.js';
export default {
	components: {
		XwDthDetailsInfo,
		XwDthDetailsParam,
		XwDthDetailsStore,
		XwDthGoods,
		XwDthDetailsImage,
		XwDthDetailsBottom,
		XwDthDetailRecommend,
		XwDthDetaailsParamDialog,
		XwDthDetailsSpecifiDialog
	},
	data() {
		return {
			bShowParamDialog: false,
			bShowSpecifiDialog: false,
			layoutBottom: uni.upx2px(119),
			//商品基本信息
			goodsInfo: {
				goodsPictures: [],
				param: [],
				store: {},
				goodsDetails: []
			},
			//商品规格
			skuData: [],
			//商品推荐
			storeRecommendGoods: [],
			//看了又看商品
			seemLookGoods: {
				list: []
			},

			isAddCart: false //是否立即够买
		};
	},
	onLoad(option) {
		findGoodsAllInfoByGodosIdAndStoreId(option).then(res => {
			let { data, code, msg } = res;
			if (code === '200') {
				this.goodsInfo = data.goods;
				this.storeRecommendGoods = data.storeRecommendGoods;
				this.seemLookGoods.list = data.seemLookGoods;

				this.goodsInfo.goodsAttrRels[0].attrs.forEach((item, index) => {
					item.attrValues.forEach((pro, pIndex) => {
						pro.type = 'default';
					});

					this.skuData.push(item);
				});
			} else {
				uni.showToast({
					icon: 'none',
					title: msg
				});
			}

			// console.log('this.skuData');
			// console.log(this.skuData);
		});
	},
	methods: {
		/**
		 * 显示商品参数
		 */
		showParamDialog(e) {
			this.bShowParamDialog = true;
		},
		/**
		 * 显示规格
		 */
		showSpecifiDialog(e) {
			console.log(e);
			this.isAddCart = e;
			this.bShowSpecifiDialog = true;
		},
		/**
		 * 套餐选择
		 */
		tagChange(tag, number) {
			if (this.isAddCart) {
				// console.log('加入购物车');
				uni.showLoading({
					title: ''
				});
				let userInfo = uni.getStorageSync('userInfo');
				let item = {
					shopCarNbr: userInfo.shopCarNbr,
					goodsInst: {
						storeId: this.goodsInfo.store.storeId,
						goodsId: this.goodsInfo.goodsId,
						goodsNum: number,
						goodsInstAttrs: [
							{
								attrId: 1,
								attrValueId: 2
							}
						]
					}
				};
				addGoodsCart(item).then(res => {
					// this.goodsInfo = res.data.goods;
					// this.storeRecommendGoods = res.data.storeRecommendGoods;
					// this.seemLookGoods.list = res.data.seemLookGoods;

					// uni.hideLoading();
					uni.showToast({
						title: res.msg,
						icon: 'none'
					});
				});
			} else {
				console.log('立即购买');
				let userInfo = uni.getStorageSync('userInfo');
				let item = {
					shopCarNbr: userInfo.shopCarNbr,
					storeId: this.goodsInfo.store.storeId,
					storeName: this.goodsInfo.store.storeName,
					storePicture: this.goodsInfo.store.storePicture,
					goodsTotalNum: number,
					goodsTotalPrice: number * this.goodsInfo.price,
					goodsInst: [
						{
							goodsId: this.goodsInfo.goodsId,
							goodsNum: number,
							goodsName: this.goodsInfo.goodsName,
							price: this.goodsInfo.price,
							producer: this.goodsInfo.producer,
							goodsPictures: this.goodsInfo.goodsPictures[0].pictureUrl,
							goodsInstAttrs: [
								{
									attrId: tag.id,
									attrValueId: tag.id
								}
							]
						}
					]
				};
				let goodsItems = [];

				goodsItems.push(item);
				uni.navigateTo({
					url: '/pages/shop/confirm-order?commitType=2&item=' + encodeURIComponent(JSON.stringify(goodsItems))
				});
			}
		}
	}
};
</script>

<style></style>
