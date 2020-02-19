<template>
	<view>
		<nav-bar-back title="进境运输工具申报" popType="0"></nav-bar-back>
		<vehicle-dec-com></vehicle-dec-com>
	</view>
</template>

<script>
	import VehicleDecCom from '@/components/bmhs/vehicle/vehicle-dec-com.vue'
	export default {
		components: {
			VehicleDecCom
		}
	}
</script>
