<template>
	<view class="bht-news-content">
			<view class="news-title">
				<label class="title">最新信息推荐</label>
				<router-link class="more" to="{name: 'news-list'}">更多>>></router-link>
			</view>
			<view class="news-list">
				<news-list-items :dataList="dataList"></news-list-items>
			</view>
	</view>
</template>

<script>
	import {
		mapGetters
	} from 'vuex'
	import {
		getRegionText
	} from '@/utils/tools.js'
	/**
	 * 商品申报查询数据渲染组件
	 */
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
