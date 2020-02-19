<template>
	<view>
		<!-- <nav-bar-shopping-home></nav-bar-shopping-home> -->
		<navBarTitle title="首页"></navBarTitle>
		<bht-layout-container>
			<view class="bht-layout-content">
				<mescroll-uni @init="initMescroll" :down="downOption" :up="upOption" @up="upCallback" @down="downCallback" :fixed="false">
					<xw-dth-banner :dataSource="dataSource.homeBannerList" :height="296"></xw-dth-banner>
					<xw-dth-grid :dataSource="dataSource.functionList"></xw-dth-grid>
					<!-- <xw-dth-goods v-show="roleID != 2" :dataSource="dataSource.bestGoodsList" :count="3" title="商品热卖" state="selling"></xw-dth-goods>
					<xw-dth-goods v-show="roleID != 2" :dataSource="dataSource.recommendGoodsList" :count="2" title="商品推荐" state="recommended"></xw-dth-goods>
					<xw-dth-goods v-show="roleID != 2" :dataSource="dataSource.newGoodsList" :count="3" title="新品上市" state="newProduct"></xw-dth-goods> -->
					<navigator url="/pages/bmhs/vehicle-dec-exit">出境运输工具申报</navigator>
				</mescroll-uni>
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
import navBarTitle from '@/components/navbar/navbar-title-default.vue';
import { getFindHomeGoods } from '@/api/shop';
export default {
	components: {
		BtBanner,
		NavBarShoppingHome,
		XwDthBanner,
		XwDthGrid,
		XwDthGoods,
		navBarTitle
	},
	data() {
		return {
			downOption: {
				autoShowLoading: true,
				textInOffset: '下拉即可刷新...',
				textOutOffset: '松开即可刷新...',
				textLoading: '努力加载中...'
			},
			upOption: {
				use: false,
				auto: false,
				noMoreSize: 5,
				empty: {
					tip: '没有查询到数据',
					icon: ''
				},
				textNoMore: '没有更多数据了'
			},
			dataSource: {},
			roleID:0
		};
	},
	created() {
		
		// params.userId = userInfo.userId;
	},
	methods: {
		//获取mescroll对象
		initMescroll(mescroll) {
			this.mescroll = mescroll;
		},
		//下拉刷新
		downCallback(mescroll) {
			let params = {};
			let userInfo = uni.getStorageSync("userInfo");
			this.roleID = userInfo.roleId;
			console.log(this.roleID);
			getFindHomeGoods(params).then(res => {
				let { data, code } = res;
				if (code === '200') {
					this.dataSource = data;
					console.log(JSON.stringify(this.dataSource.bestGoodsList));
				}
				mescroll.endBySize();
				// this.$nextTick(function(){

				// })
			});
			mescroll.resetUpScroll();
		},
		//上拉刷新
		upCallback(mescroll) {
			this.params.pageIndex = mescroll.num;
			this.params.pageSize = mescroll.size;
		}
	},
	onShow() {}
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
.bht-layout-content {
	padding-bottom: $padding-content;
}
</style>
