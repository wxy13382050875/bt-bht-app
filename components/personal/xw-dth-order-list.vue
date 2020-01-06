<template>
	<!-- <orderList></orderList> -->
	<mescroll-uni class="mescroll" @init="initMescroll" :down="downOption" :up="upOption" @up="upCallback" @down="downCallback" :fixed="false">
		<view v-for="(item, eIndex) in dataSource" :key="eIndex"><ordercell :dataSource="item"></ordercell></view>
	</mescroll-uni>
</template>

<script>
import ordercell from '@/components/personal/xw-dth-order-cell.vue';

import { getOrderList } from '@/api/shop.js';
export default {
	components: {
		ordercell
	},
	data() {
		return {
			lists: [],
			dataSource: [],
			downOption: {
				autoShowLoading: true,
				textInOffset: '下拉即可刷新...',
				textOutOffset: '松开即可刷新...',
				textLoading: '努力加载中...'
			},
			upOption: {
				auto: true,
				noMoreSize: 5,
				empty: {
					tip: '没有查询到数据',
					icon: ''
				},
				textNoMore: '没有更多数据了'
			},

			params: {},
			statusCd: 0
		};
	},
	methods: {
		//获取mescroll对象
		initMescroll(mescroll) {
			this.mescroll = mescroll;
		},
		//下拉刷新
		downCallback(mescroll) {
			console.log('downCallback');
			mescroll.num = 1;
			mescroll.resetUpScroll();
		},
		//上拉刷新
		upCallback(mescroll) {
			console.log('upCallback');

			this.params.pageIndex = mescroll.num;
			this.params.pageSize = mescroll.size;
			this.params.statusCd = this.statusCd;
			let userInfo = uni.getStorageSync('userInfo');

			this.params.shopCarNbr = userInfo.shopCarNbr;

			console.log(this.params);
			getOrderList(this.params).then(res => {
				let { pageInfo, stores } = res.data;

				console.log(stores);
				if (mescroll.num == 1) this.dataSource = [];
				this.dataSource = this.dataSource.concat(stores);
				mescroll.endBySize(stores.length, pageInfo.rowCount);
				this.$nextTick(() => {
					mescroll.endSuccess(stores.length);
				});
			});
		}
	}
};
</script>

<style></style>
