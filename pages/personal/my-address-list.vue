<template>
	<view>
		<nav-bar-back title="我的地址"></nav-bar-back>
		<bht-layout-container >
			<addresslist :dataSource="dataSource"></addresslist>
		</bht-layout-container>
		
	</view>
</template>

<script>
	import addresslist from '@/components/personal/xw-dth-my-address-cell.vue';
	export default {
		components: {
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
