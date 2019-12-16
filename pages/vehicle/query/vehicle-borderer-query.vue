<template>
	<view class="app-content">
		<aca-nav-bar :level="2" title="车辆申报查询"></aca-nav-bar>
		<bht-layout-container>
			<view class="app-query-tabs-warp" :style="{top: navHeight+'px'}">
				<view class="nav">
					<view class="nav-items" v-for="(tab, i) in tabs" :key="i" :class="{'active':curIndex===i}" @click="changeTab(i)">{{tab}}</view>
				</view>
			</view>
			<view class="app-tabs-query-content">
				<!--当前申报查询-->
				<vehicle-borderer-item :i="0" :index="curIndex"></vehicle-borderer-item>
				<!--历史申报查询-->
				<vehicle-borderer-item-h :i="1" :index="curIndex"></vehicle-borderer-item-h>
			</view>
		</bht-layout-container>
	</view>
</template>

<script>
	import {
		mapGetters
	} from 'vuex';
	import VehicleBordererItem from '@/components/vehicle/vehicle-borderer-item.vue'
	import VehicleBordererItemH from '@/components/vehicle/vehicle-borderer-item-h.vue'
	export default {
		components: {
			VehicleBordererItem,
			VehicleBordererItemH
		},
		data() {
			return {
				tabs: ['申报查询', '历史申报'],
				curIndex: 0, // 当前tab的下标
			}
		},
		computed: {
			...mapGetters('utp', ['navHeight'])
		},
		methods: {
			changeTab(i) {
				this.curIndex = i
			}
		}
	}
</script>

<style lang="scss">

</style>
