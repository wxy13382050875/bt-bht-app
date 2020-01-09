<template>
	<view>
		<navbaraddress></navbaraddress>

		<bht-layout-container>
			<addresslist :dataSource="dataSource" @skipEdit="skipEdit" @didSelectCell="didSelectCell" @refreshData="refreshData"></addresslist>
		</bht-layout-container>
	</view>
</template>

<script>
import addresslist from '@/components/personal/xw-dth-my-address-cell.vue';
import navbaraddress from '@/components/navbar/navbar-back-address.vue';
import { getUserAddressList } from '@/api/shop.js';
import { mapActions } from 'vuex';
export default {
	components: {
		navbaraddress,
		addresslist
	},
	data() {
		return {
			dataSource: [],
			type: '',
			
		};
	},
	methods: {
		...mapActions({
			setAddress: 'utp/setAddress'
		}),
		didSelectCell(e) {
			if (this.type == 1) {
				this.setAddress(e);
				uni.navigateBack();
			}
		},
		skipEdit(e){
			uni.navigateTo({
				url: '/pages/user/my-address-create?item=' + encodeURIComponent(JSON.stringify(e))
			});
		},
		

		refreshData(e) {
			let userInfo = uni.getStorageSync('userInfo');
			let params = {
				userId: userInfo.userId
			};
			getUserAddressList(params).then(res => {
				let { data, code } = res;
				if (code === '200') {
					this.dataSource = data.addressList;
				}
			});
		}
	},
	onShow() {
		let userInfo = uni.getStorageSync('userInfo');
		let params = {
			userId: userInfo.userId
		};
		getUserAddressList(params).then(res => {
			let { data, code } = res;
			if (code === '200') {
				this.dataSource = data.addressList;
			}
		});
	},
	onLoad: function(option) {
		this.type = option.type;
	}
};
</script>

<style></style>
