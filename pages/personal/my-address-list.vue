<template>
	<view>
		<navbaraddress></navbaraddress>
		<bht-layout-container><addresslist :dataSource="dataSource" @didSelectCell="didSelectCell"></addresslist></bht-layout-container>
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
			type: ''
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
		}
	},
	onShow(option) {
		let params = {
			userId: 2
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
