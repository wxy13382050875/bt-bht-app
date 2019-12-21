<template>
	<view>
		<nav-bar-back title="商品详情"></nav-bar-back>
		<bht-layout-container :bottom="layoutBottom">
			<view class="bht-layout-content">
				<detailsInfo :dataSource="dataSource.banner"></detailsInfo>
				<detailsParam @showParamDialog="showParamDialog" @showSpecifiDialog="showSpecifiDialog"></detailsParam>
				<detailsStore></detailsStore>
				<goods :dataSource="dataSource.selling" :count="3"></goods>
				<detailsImage :dataSource="dataSource.banner"></detailsImage>
				<detailsRecommend :dataSource="dataSource.recommended"></detailsRecommend>
			</view>
		</bht-layout-container>
		<paramDialog v-model="bShowParamDialog"></paramDialog>
		<specifiDialog v-model="bShowSpecifiDialog" @tagChange="tagChange"></specifiDialog>
		<xw-dth-details-bottom></xw-dth-details-bottom>
	</view>
</template>

<script>
import detailsInfo from '@/components/details/xw-dth-details-info.vue';
import detailsParam from '@/components/details/xw-dth-details-param.vue';
import detailsStore from '@/components/details/xw-dth-details-store.vue';
import goods from '@/components/details/xw-dth-goods.vue';
import XwDthDetailsBottom from '@/components/details/xw-dth-details-bottom.vue';
import detailsImage from '@/components/details/xw-dth-details-image.vue';
import detailsRecommend from '@/components/details/xw-dth-details-recommend.vue';
import paramDialog from '@/components/details/xw-dth-details-param-dialog.vue';
import specifiDialog from '@/components/details/xw-dth-details-specifi-dialog.vue';

export default {
	components: {
		detailsInfo,
		detailsParam,
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
			dataSource: {
				banner: [{ img: '/static/banner/1.png' }, { img: '/static/banner/2.png' }, { img: '/static/banner/3.png' }],

				selling: {
					title: '店铺推荐',
					list: [
						{ url: '/static/banner/1.png', newPrice: 328, oldPrice: 299, page: '/pages/shop/goods-details' },
						{ url: '/static/banner/1.png', newPrice: 328, oldPrice: 299, page: '/pages/shop/goods-details' },
						{ url: '/static/banner/1.png', newPrice: 328, oldPrice: 299, page: '/pages/shop/goods-details' }
					]
				},
				recommended: {
					title: '商品推荐',
					list: [
						{
							url: '/static/banner/1.png',
							title: '泰国士国牌即食燕窝金丝燕浓缩瓶装6瓶75ML瓶装木糖醇味',
							newPrice: 328,
							oldPrice: 299,
							number: 101,
							page: '/pages/shop/goods-details'
						},
						{
							url: '/static/banner/1.png',
							title: '泰国士国牌即食燕窝金丝燕浓缩瓶装6瓶75ML瓶装木糖醇味',
							newPrice: 328,
							oldPrice: 299,
							number: 101,
							page: '/pages/shop/goods-details'
						},
						{
							url: '/static/banner/1.png',
							title: '泰国士国牌即食燕窝金丝燕浓缩瓶装6瓶75ML瓶装木糖醇味',
							newPrice: 328,
							oldPrice: 299,
							number: 101,
							page: '/pages/shop/goods-details'
						},
						{
							url: '/static/banner/1.png',
							title: '泰国士国牌即食燕窝金丝燕浓缩瓶装6瓶75ML瓶装木糖醇味',
							newPrice: 328,
							oldPrice: 299,
							number: 101,
							page: '/pages/shop/goods-details'
						}
					],
					goodsThreeList: [
						{
							url: '/static/banner/1.png',
							title: '泰国士国牌即食燕窝金丝燕浓缩瓶装6瓶75ML瓶装木糖醇味',
							newPrice: 328,
							oldPrice: 299,
							number: 101,
							page: '/pages/shop/goods-details'
						},
						{
							url: '/static/banner/1.png',
							title: '泰国士国牌即食燕窝金丝燕浓缩瓶装6瓶75ML瓶装木糖醇味',
							newPrice: 328,
							oldPrice: 299,
							number: 101,
							page: '/pages/shop/goods-details'
						},
						{
							url: '/static/banner/1.png',
							title: '泰国士国牌即食燕窝金丝燕浓缩瓶装6瓶75ML瓶装木糖醇味',
							newPrice: 328,
							oldPrice: 299,
							number: 101,
							page: '/pages/shop/goods-details'
						}
					]
				}
			}
		};
	},
	onLoad(option) {
		// 获取参数 {id:xx}
		console.log(option);
	},
	methods: {
		showParamDialog(e) {
			console.log('-----showParamDialog-----');
			this.bShowParamDialog = true;
		},
		showSpecifiDialog(e) {
			console.log('-----showSpecifiDialog-----');
			this.bShowSpecifiDialog = true;
		},
		tagChange(tag, number) {
			console.log(tag + '------- ' + number);
		}
	}
};
</script>

<style></style>
