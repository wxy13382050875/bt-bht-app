<template>
	<view>
		<nav-bar-shopping-home></nav-bar-shopping-home>
		<bht-layout-container>
			<view class="">
				<banner :dataSource="dataSource.banner"></banner>
				<grid :dataSource="dataSource.query"></grid>
				<!-- <goods :dataSource="dataSource.selling" :count="3"></goods>
				<goods :dataSource="dataSource.recommended" :count="2"></goods>
				<goods :dataSource="dataSource.nowproduct" :count="3"></goods> -->
			</view>
		</bht-layout-container>
	</view>
</template>

<script>
/**
 * 商城首页
 */
import NavBarShoppingHome from '@/components/navbar/navbar-shopping-home.vue';
import banner from '@/components/details/xw-dth-banner.vue';
import grid from '@/components/details/xw-dth-grid.vue';
import goods from '@/components/details/xw-dth-goods.vue';
export default {
	components: {
		NavBarShoppingHome,
		banner,
		grid,
		goods
	},
	data() {
		return {
			dataSource: {
				banner: [{ img: '/static/banner/1.png' }, { img: '/static/banner/2.png' }, { img: '/static/banner/3.png' }],
				query: [
					{ img: '/static/fn/goods_query_icon.png', title: '商品申报查询', page: 'goods-personnel-query' },
					{ img: '/static/fn/vehicle_query_icon.png', title: '车辆申报查询', page: 'vehicle-personnel-query' },
					{ img: '/static/fn/vehicle_query_icon.png', title: '待检车辆查询', page: 'vehicle-personnel-query' },
					{ img: '/static/fn/vehicle_check_icon.png', title: '商品申报查询', page: 'vehicle-personnel-check' }
				],
				selling: {
					title: '商品热卖',
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
				},
				nowproduct: {
					title: '新品上市',
					list: [
						{ url: '/static/banner/1.png', newPrice: 328, oldPrice: 299, page: '/pages/shop/goods-details' },
						{ url: '/static/banner/1.png', newPrice: 328, oldPrice: 299, page: '/pages/shop/goods-details' },
						{ url: '/static/banner/1.png', newPrice: 328, oldPrice: 299, page: '/pages/shop/goods-details' }
					]
				}
			}
		};
	},
	created() {},
	methods: {
		change() {},
		onClick() {}
	}
};
</script>

<style lang="scss">
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
</style>
