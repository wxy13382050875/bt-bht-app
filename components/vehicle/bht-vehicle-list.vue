<template>
	<view>
		<view class="query-list-item" v-for="item in dataList" :key="item.id" :class="[item.status == 'Y' ? 'query-is-succcess' : 'query-is-ing']">
			<view class="header">
				<text class="left">{{item.vehicleNo}}</text>
				<view class="right">
					<image v-if="item.status === 'N' " src="/static/icon/declaration_wait_icon.png"></image>
					<image v-else src="/static/icon/declaration_done_icon.png"></image>
					<text>{{item.status ==="Y" ? "已申报":"未申报"}}</text>
				</view>
			</view>
			<view class="content">
				<view class="items">
					<text class="title">商品</text>
					<text class="value">{{item.goodsName}}</text>
				</view>
				<view class="items">
					<text class="title">重量</text>
					<text class="value">{{item.weight}}</text>
				</view>
				<view class="items">
					<text class="title">是否可通行</text>
					<text class="value">{{ item.passStatus == 'Y' ? '可过2号卡' : '不可过2号卡' }}</text>
				</view>
			</view>
			<view class="footer">
				<text>{{regionTxt}}</text>
				<text>{{item.datetime||''}}</text>
				<text class="flag">{{item.inOut =='I'?'进口':'出口'}}</text>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		mapGetters
	} from 'vuex'
	/**
	 * 商品申报查询数据渲染组件
	 */
	import {
		getRegionText
	} from '@/utils/tools.js'
	export default {
		props: {
			dataList: {
				type: Array,
				default: function() {
					return []
				}
			}
		},
		data() {
			return {
				regionTxt: ''
			}
		},
		computed: {
			...mapGetters({
				userInfo: 'user/userInfo'
			})
		},
		created() {
			this.regionTxt = getRegionText(this.userInfo.region)
		}
	}
</script>
<style>
</style>
