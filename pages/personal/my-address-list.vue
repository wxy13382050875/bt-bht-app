<template>
	<view>
		<navbaraddress></navbaraddress>

		<bht-layout-container>
			<mescroll-uni class="mescroll" @init="initMescroll" :down="downOption" :up="upOption" @up="upCallback" @down="downCallback" :fixed="false">
				<addresslist :dataSource="dataSource" @didSelectCell="didSelectCell" @refreshData="refreshData"></addresslist>
			</mescroll-uni>
		</bht-layout-container>
	</view>
</template>

<script>
import addresslist from '@/components/personal/xw-dth-my-address-cell.vue';
import navbaraddress from '@/components/navbar/navbar-back-address.vue';
import { getUserAddressList } from '@/api/shop.js';
export default {
	components: {
		navbaraddress,
		addresslist
	},
	data() {
		return {
			dataSource: [],
			type: '',
			downOption: {
				autoShowLoading: true,
				textInOffset: '下拉即可刷新...',
				textOutOffset: '松开即可刷新...',
				textLoading: '努力加载中...'
			},
			upOption: {
				auto: false,
				noMoreSize: 5,
				empty: {
					tip: '没有查询到数据',
					icon: ''
				},
				textNoMore: '没有更多数据了'
			},
		};
	},
	methods: {
		didSelectCell(e) {
			if (this.type == 1) {
				// var pages = getCurrentPages();
				// var prevPage = pages[pages.length - 2]; //上一个页面
				// prevPage.address = e;
				// console.log("prevPage.address");
				// console.log(prevPage.address);
				uni.setStorageSync('defaultAddress', e);
				uni.navigateBack();
			}
		},
		//获取mescroll对象
		initMescroll(mescroll) {
			this.mescroll = mescroll;
		},
		//下拉刷新
		downCallback(mescroll) {
			console.log('downCallback');
			mescroll.resetUpScroll();
		},
		//上拉刷新
		upCallback(mescroll) {
			console.log('upCallback');
;
			let userInfo = uni.getStorageSync('userInfo');

			console.log('刷新数据');
			let params = {
				userId: userInfo.userId
			};
			getUserAddressList(params).then(res => {
				let { data, code } = res;
				if (code === '200') {
					// console.log(data.addressList);
					// this.dataSource = data.addressList;
					// if (mescroll.num == 1) this.dataSource = [];
					this.dataSource = data.addressList;
					// mescroll.endBySize(data.addressList.length, pageInfo.rowCount);
					this.$nextTick(() => {
						mescroll.endSuccess(data.addressList.length);
					});
				}
			});
		},

		refreshData(e) {
			console.log('刷新数据');
			let userInfo = uni.getStorageSync('userInfo');
			let params = {
				userId: userInfo.userId
			};
			getUserAddressList(params).then(res => {
				let { data, code } = res;
				if (code === '200') {
					console.log(data.addressList);
					this.dataSource = data.addressList;
				}
			});
		}
	},
	onShow(option) {
		let userInfo = uni.getStorageSync('userInfo');
			let params = {
				userId: userInfo.userId
			};
		getUserAddressList(params).then(res => {
			let { data, code } = res;
			if (code === '200') {
				console.log(data.addressList);
				this.dataSource = data.addressList;
			}
		});
	},

	onLoad: function(option) {
		//option为object类型，会序列化上个页面传递的参数
		// console.log(option.type); //打印出上个页面传递的参数
		this.type = option.type;
	}
};
</script>

<style></style>
