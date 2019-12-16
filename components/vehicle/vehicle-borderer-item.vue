<template>
	<!-- 不能用v-if -->
	<view v-show="i === index">
		<view class="wrapper">
			<mescroll-uni :fixed="false" :down="downOption" :up="upOption" @down="downCallback" @init="mescrollInit">
				<view class="query-show">
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
			</mescroll-uni>
		</view>
	</view>
</template>

<script>
	import {
		mapGetters
	} from 'vuex'
	import {
		bordererVehicleQuery
	} from '@/api/bht'
	import {
		minusDate,
		formatterDate
	} from '@/utils/date';
	import {
		getRegionText
	} from '@/utils/tools.js'
	import BhtVehicleList from '@/components/vehicle/bht-vehicle-list.vue'
	export default {
		props: {
			i: Number, // 每个tab页的专属下标
			index: { // 当前tab的下标
				type: Number,
				default () {
					return 0
				}
			}
		},
		components: {
			BhtVehicleList
		},
		data() {
			return {
				mescroll: null, //mescroll实例对象
				downOption: {
					autoShowLoading: true,
					textInOffset: '下拉即可刷新...',
					textOutOffset: '松开即可刷新...',
					textLoading: '努力加载中...'
				},
				upOption: {
					use: false
				},
				dataList: [], //列表数据
				isInit: false, // 列表是否已经初始化
				params: {
					startDate: formatterDate(new Date(), 'YY-MM-DD'),
					endDate: formatterDate(new Date(), 'YY-MM-DD')
				},
				regionTxt: ''
			}
		},
		computed: {
			...mapGetters({
				userInfo: 'user/userInfo'
			})
		},
		created() {
			//初始化查询参数
			this.params.paperType = this.userInfo.type;
			this.params.organization = this.userInfo.region;
			this.params.customesCode = this.userInfo.customs;
			this.params.name = this.userInfo.name;
			this.params.paperNo = this.userInfo.idCode;

			this.regionTxt = getRegionText(this.userInfo.region)
		},
		mounted() {
			// 第一个tab,自动加载数据
			if (this.i === 0) {
				this.isInit = true; // 标记为true
				this.mescroll.triggerDownScroll();
			}
		},
		watch: {
			// 监听下标的变化
			index(val) {
				if (this.i === val && !this.isInit) {
					this.isInit = true; // 标记为true
					this.mescroll.triggerDownScroll();
				}
			}
		},
		methods: {
			mescrollInit(mescroll) {
				this.mescroll = mescroll;
			},
			downCallback(mescroll) {
				bordererVehicleQuery(this.params).then(res => {
					this.dataList = res.results;
					mescroll.endSuccess();
				});

			}

		}
	}
</script>

<style lang="scss" scoped>
	.wrapper {
		position: absolute;
		top: 0;
		right: 0;
		bottom: 0;
		left: 0;
	}
</style>
