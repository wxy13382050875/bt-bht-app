<template>
	<view>
		<!-- <nav-bar-shopping-home></nav-bar-shopping-home> -->
		<navBarTitle title="首页"></navBarTitle>
		<bht-layout-container>
			<view class="bht-layout-content">
				<mescroll-uni @init="initMescroll" :down="downOption" :up="upOption" @up="upCallback" @down="downCallback" :fixed="false">
									<xw-dth-banner :dataSource="dataSource.homeBannerList" :height="296"></xw-dth-banner>
									<xw-dth-grid :dataSource="dataSource.functionList"></xw-dth-grid>
									<xw-dth-goods :dataSource="dataSource.bestGoodsList" :count="3" title="商品热卖" state="selling"></xw-dth-goods>
									<xw-dth-goods :dataSource="dataSource.recommendGoodsList" :count="2" title="商品推荐" state="recommended"></xw-dth-goods>
									<xw-dth-goods :dataSource="dataSource.newGoodsList" :count="3" title="新品上市" state="newProduct"></xw-dth-goods>
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
import {
		getFindHomeGoods
	} from '@/api/shop'
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
				use:false,
				auto: false,
				noMoreSize: 5,
				empty: {
					tip: '没有查询到数据',
					icon: '',
				},
				textNoMore: '没有更多数据了'
			},
			dataSource:{}
			
		};
	},
	created() {

		
	},
	methods: {
		//获取mescroll对象
				initMescroll(mescroll) {
					this.mescroll = mescroll;
				},
				//下拉刷新
				downCallback(mescroll) {
					// console.log('downCallback')
					let params={};
					getFindHomeGoods(params).then(res => {
						
						
						let {
							data,
							code
						} = res
						if (code === '200') {
							this.dataSource = data;
						}
						mescroll.endBySize();
						// this.$nextTick(function(){
							
						// })
					})
					mescroll.resetUpScroll();
				},
				//上拉刷新
				upCallback(mescroll) {
					console.log('upCallback')
					this.params.pageIndex = mescroll.num;
					this.params.pageSize = mescroll.size;
					
					
					
					// getGoodsList(this.strUrl,this.params).then(res => {
					// 	let {
					// 		pageInfo	,
					// 		list
					// 	} = res.data
						
						
					// 	if (mescroll.num == 1) this.dataSource = [];
					// 	this.dataSource = this.dataSource.concat(list);
					// 	console.log('1111---' +this.dataSource);
					// 	mescroll.endBySize(
					// 		list.length, pageInfo.rowCount);
					// 	this.$nextTick(() => {
					// 		mescroll.endSuccess(list.length)
					// 	})
					// })
				},
	},
	onShow() {
		console.log("-----userInfo");
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
