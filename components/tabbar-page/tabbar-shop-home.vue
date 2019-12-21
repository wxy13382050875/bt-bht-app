<template>
	<view>
		<nav-bar-shopping-home></nav-bar-shopping-home>
		<bht-layout-container>
			<view class="bht-layout-content">
				<xw-dth-banner :dataSource="dataSource.homeBannerList" :height="296"></xw-dth-banner>
				<xw-dth-grid :dataSource="dataSource.functionList"></xw-dth-grid>
				<xw-dth-goods :dataSource="dataSource.bestGoodsList" :count="3" title="商品热卖" state="selling"></xw-dth-goods>
				<xw-dth-goods :dataSource="dataSource.recommendGoodsList" :count="2" title="商品推荐" state="recommended"></xw-dth-goods>
				<xw-dth-goods :dataSource="dataSource.newGoodsList" :count="3" title="新品上市" state="newProduct"></xw-dth-goods>
			</view>
		</bht-layout-container>
	</view>
</template>

<script>
/**
 * 商城首页
 */
import NavBarShoppingHome from '@/components/navbar/navbar-shopping-home.vue';
import BtBanner from '@/components/common/bht-banner.vue';
import XwDthBanner from '@/components/details/xw-dth-banner.vue';
import XwDthGrid from '@/components/details/xw-dth-grid.vue';
import XwDthGoods from '@/components/details/xw-dth-goods.vue';
import {
		getFindHomeGoods
	} from '@/api/shop'
export default {
	components: {
		BtBanner,
		NavBarShoppingHome,
		XwDthBanner,
		XwDthGrid,
		XwDthGoods
	},
	data() {
		return {
			// downOption: {
			// 	autoShowLoading: true,
			// 	textInOffset: '下拉即可刷新...',
			// 	textOutOffset: '松开即可刷新...',
			// 	textLoading: '努力加载中...'
			// },
			// upOption: {
			// 	auto: true,
			// 	noMoreSize: 5,
			// 	empty: {
			// 		tip: '没有查询到数据',
			// 		icon: '',
			// 	},
			// 	textNoMore: '没有更多数据了'
			// },
			dataSource:{}
			// dataSource: {
			// 	banner: [{ img: '/static/banner/1.png', id: 1 }, { img: '/static/banner/2.png', id: 2 }, { img: '/static/banner/3.png', id: 3 }],
			// 	query: [
			// 		{ img: '/static/fn/goods_query_icon.png', title: '商品申报查询', page: 'goods-personnel-query' },
			// 		{ img: '/static/fn/vehicle_query_icon.png', title: '车辆申报查询', page: 'vehicle-personnel-query' },
			// 		{ img: '/static/fn/vehicle_query_icon.png', title: '待检车辆查询', page: 'vehicle-personnel-query' },
			// 		{ img: '/static/fn/vehicle_check_icon.png', title: '商品申报查询', page: 'vehicle-personnel-check' }
			// 	],
			// 	selling: {
			// 		title: '商品热卖',
			// 		list: [
			// 			{ url: '/static/banner/1.png', newPrice: 328, oldPrice: 299, page: '/pages/shop/goods-details' },
			// 			{ url: '/static/banner/1.png', newPrice: 328, oldPrice: 299, page: '/pages/shop/goods-details' },
			// 			{ url: '/static/banner/1.png', newPrice: 328, oldPrice: 299, page: '/pages/shop/goods-details' }
			// 		]
			// 	},
			// 	recommended: {
			// 		title: '商品推荐',
			// 		list: [
			// 			{
			// 				url: '/static/banner/1.png',
			// 				title: '泰国士国牌即食燕窝金丝燕浓缩瓶装6瓶75ML瓶装木糖醇味',
			// 				newPrice: 328,
			// 				oldPrice: 299,
			// 				number: 101,
			// 				page: '/pages/shop/goods-details'
			// 			},
			// 			{
			// 				url: '/static/banner/1.png',
			// 				title: '泰国士国牌即食燕窝金丝燕浓缩瓶装6瓶75ML瓶装木糖醇味',
			// 				newPrice: 328,
			// 				oldPrice: 299,
			// 				number: 101,
			// 				page: '/pages/shop/goods-details'
			// 			},
			// 			{
			// 				url: '/static/banner/1.png',
			// 				title: '泰国士国牌即食燕窝金丝燕浓缩瓶装6瓶75ML瓶装木糖醇味',
			// 				newPrice: 328,
			// 				oldPrice: 299,
			// 				number: 101,
			// 				page: '/pages/shop/goods-details'
			// 			},
			// 			{
			// 				url: '/static/banner/1.png',
			// 				title: '泰国士国牌即食燕窝金丝燕浓缩瓶装6瓶75ML瓶装木糖醇味',
			// 				newPrice: 328,
			// 				oldPrice: 299,
			// 				number: 101,
			// 				page: '/pages/shop/goods-details'
			// 			}
			// 		],
			// 		goodsThreeList: [
			// 			{
			// 				url: '/static/banner/1.png',
			// 				title: '泰国士国牌即食燕窝金丝燕浓缩瓶装6瓶75ML瓶装木糖醇味',
			// 				newPrice: 328,
			// 				oldPrice: 299,
			// 				number: 101,
			// 				page: '/pages/shop/goods-details'
			// 			},
			// 			{
			// 				url: '/static/banner/1.png',
			// 				title: '泰国士国牌即食燕窝金丝燕浓缩瓶装6瓶75ML瓶装木糖醇味',
			// 				newPrice: 328,
			// 				oldPrice: 299,
			// 				number: 101,
			// 				page: '/pages/shop/goods-details'
			// 			},
			// 			{
			// 				url: '/static/banner/1.png',
			// 				title: '泰国士国牌即食燕窝金丝燕浓缩瓶装6瓶75ML瓶装木糖醇味',
			// 				newPrice: 328,
			// 				oldPrice: 299,
			// 				number: 101,
			// 				page: '/pages/shop/goods-details'
			// 			}
			// 		]
			// 	},
			// 	nowproduct: {
			// 		title: '新品上市',
			// 		list: [
			// 			{ url: '/static/banner/1.png', newPrice: 328, oldPrice: 299, page: '/pages/shop/goods-details' },
			// 			{ url: '/static/banner/1.png', newPrice: 328, oldPrice: 299, page: '/pages/shop/goods-details' },
			// 			{ url: '/static/banner/1.png', newPrice: 328, oldPrice: 299, page: '/pages/shop/goods-details' }
			// 		]
			// 	}
			// }
		};
	},
	created() {
		getFindHomeGoods().then(res => {
			
			
			let {
				data,
				code
			} = res
			if (code === '200') {
				console.log('测试----' + res.data);
				this.dataSource = data;
			}
			
		})
	},
	methods: {
		// change() {},
		// onClick() {},
		//获取mescroll对象
		// initMescroll(mescroll) {
		// 	this.mescroll = mescroll;
		// },
		// //下拉刷新
		// downCallback(mescroll) {
		// 	mescroll.resetUpScroll();
		// },
		// //上拉刷新
		// upCallback(mescroll) {
			
			
		// }
	}
};
</script>

<style lang="scss" scoped>
.goods-list {
	display: flex;
	justify-content: space-between;
	flex-wrap: wrap;
	padding: 0 10px;
	.item {
		background-color: blue;
		// width: calc(50% - 5px);
		// height: 325rpx;
		image {
			width: 100%;
			height: 100%;
		}
	}
}
.bht-layout-content{
	padding-bottom: $padding-content;
}
</style>
