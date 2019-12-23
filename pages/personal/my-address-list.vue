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
	export default {
		components: {
			navbaraddress,
			addresslist
		},
		data() {
			return {
				dataSource: [{
					type:"default",
					surname:"武",
					name:"神仙小武子",
					phone:"13382050875",
					address:"河南省郑州市中原区建设路街道，护国大厦B区20栋"
					
				},{
					type:"default1",
					surname:"武",
					name:"神仙小武子",
					phone:"13382050875",
					address:"河南省郑州市中原区建设路街道，护国大厦B区20栋"
					
				},
				{
					type:"default1",
					surname:"武",
					name:"神仙小武子",
					phone:"13382050875",
					address:"河南省郑州市中原区建设路街道，护国大厦B区20栋"
					
				},
				{
					type:"default1",
					surname:"武",
					name:"神仙小武子",
					phone:"13382050875",
					address:"河南省郑州市中原区建设路街道，护国大厦B区20栋"
					
				}]
			};
		},
		methods: {
			
		}
	}
</script>

<style>

</style>
