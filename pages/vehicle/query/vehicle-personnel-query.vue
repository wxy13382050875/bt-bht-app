<template>
	<view class="app-content">
		<aca-nav-bar :level="2" title="车辆申报查询"></aca-nav-bar>
		<bht-layout-container>
			<bht-query-box @searchEvent="searchEvent">
				<template class="left" slot="show-left">
					<text class="title">总票数</text>
					<text class="value">{{total.size}}</text>
				</template>
				<template class="right" slot="show-right">
					<text class="title">重量</text>
					<text class="value">{{total.totalWeight}}KG</text>
				</template>
			</bht-query-box>
			<view class="query-main">
				<mescroll-uni @init="initMescroll" :down="downOption" :up="upOption" @down="downCallback" :fixed="false" @up="upCallback">
					<view class="query-show">
						<bht-vehicle-list :dataList="dataList"></bht-vehicle-list>
					</view>
				</mescroll-uni>
			</view>
		</bht-layout-container>
		<popup-modal-query-vehicle v-model="showPopup" @queryEvent="searchHandler" @initModalData="initModalData"></popup-modal-query-vehicle>
	</view>
</template>
<script>
	import PopupModalQueryVehicle from '@/components/modal/popup-modal-query-vehicle.vue'
	import BhtQueryBox from '@/components/common/bht-query-box.vue'
	import BhtVehicleList from '@/components/vehicle/bht-vehicle-list.vue'
	import {
		personneVehiclelQuery
	} from '@/api/bht'
	export default {
		components: {
			PopupModalQueryVehicle,
			BhtQueryBox,
			BhtVehicleList
		},
		data() {
			return {
				//弹窗状态
				showPopup: false,
				//滚动加载配置
				downOption: {
					autoShowLoading: true,
					textInOffset: '下拉即可刷新...',
					textOutOffset: '松开即可刷新...',
					textLoading: '努力加载中...'
				},
				upOption: {
					auto: true,
					noMoreSize: 5,
					empty: {
						tip: '没有查询到数据',
						icon: '',
					},
					textNoMore: '数据已全部加载'
				},
				//数据
				dataList: [],
				//查询参数
				formData: {},
				//统计数据
				total: {
					size: 0,
					totalWeight: 0
				},
				//滚动对象
				mescroll: null
			}
		},
		methods: {
			searchEvent() {
				this.showPopup = true
			},
			//监听弹窗创建时 发射到数据
			initModalData(data) {
				//赋值数据
				this.formData = data
			},
			//获取mescroll对象
			initMescroll(mescroll) {
				this.mescroll = mescroll;
			},
			//处理搜索事件
			searchHandler(data) {
				//重置数据
				this.dataList = [];
				this.total.size = 0;
				this.total.totalWeight = 0;
				//重新赋值请求参数
				this.formData = data;
				//重置mescroll页码
				this.mescroll.setPageNum(1);
				//触发刷新
				this.mescroll.triggerDownScroll();
			},
			//下拉刷新
			downCallback(mescroll) {
				mescroll.resetUpScroll();
			},
			//上拉刷新
			upCallback(mescroll) {
				this.formData.page = mescroll.num;
				this.formData.limit = mescroll.size;
				personneVehiclelQuery(this.formData).then(res => {
					let curPageData = [];
					let totalSize = 0;
					if ((Object.keys(res).length) !== 0) {
						let {
							results,
							total
						} = res;
						this.total = total;
						curPageData = results;
						totalSize = total.size;
					}
					if (mescroll.num == 1) this.dataList = [];
					this.dataList = this.dataList.concat(curPageData);
					mescroll.endBySize(
						curPageData.length, totalSize);
					this.$nextTick(() => {
						mescroll.endSuccess(curPageData.length)
					})
				}).catch(error => {
					mescroll.endErr();
				})
			}
		}
	}
</script>
<style lang="scss" scoped>

</style>
