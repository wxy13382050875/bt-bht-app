<template>
	<view>
		<navbaraddress ></navbaraddress>
		<bht-layout-container >
			<addresslist :dataSource="dataSource"></addresslist>
		</bht-layout-container>
	</view>
</template>

<script>
	import addresslist from '@/components/personal/xw-dth-my-address-cell.vue';
	import navbaraddress from '@/components/navbar/navbar-back-address.vue';
	import {
			getUserAddressList
			
		} from '@/api/shop.js'
	export default {
		components: {
			navbaraddress,
			addresslist
		},
		data() {
			return {
				dataSource: []
			};
		},
		methods: {
			
		},
		onLoad() {
			let params = {
				userId:2
			}
			getUserAddressList(params).then(res => {
				
				
				let {
					data,
					code
				} = res
				if (code === '200') {
					console.log( data.addressList);
					this.dataSource = data.addressList;
				}
				
			})
		}
	}
	
</script>

<style>

</style>
