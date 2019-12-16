<template>
	<view v-show="i === index">
		<view class="wrapper">
			<mescroll-uni :fixed="false" :down="downOption" :up="upOption" @down="downCallback" @up="upCallback" @init="mescrollInit">
				<view class="goods-items" v-for="r in dataList" :key="r.declareNo">
					<view class="goods-header">
						<label>申报状态</label>
						<label>{{r.status}}</label>
					</view>
					<view class="goods-item" v-for="c in r.data" :key="c.aa">
						<label class="goods-name">{{c.goodsName}}</label>
						<view class="goods-d">
							<label>¥{{c.amount}}</label>
							<label class="goods-count">x1</label>
						</view>
					</view>
					<view class="goods-total">
						<label>共{{r.count}}商品&nbsp;&nbsp;合计:¥{{r.totalAmount}}</label>
					</view>
					<view class="goods-location">
						<label>
							{{regionTxt}}
						</label>
						<label>
							{{r.datetime}}
						</label>
						<label>
							{{r.vehicleNo}}
						</label>
					</view>
				</view>
				<view class="data-no-tip" v-if="dataList.length === 0">
					<image src="/static/icon/no_data.gif"></image>
					<label class="data-no-tip-txt">没有查询到数据～_～</label>
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
		bordererGoodsCurQuery
	} from '@/api/bht'
	import {
		total
	} from '@/utils/Commonly'
	import {
		getRegionText
	} from '@/utils/tools.js'
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
					auto: false,
					noMoreSize: 5,
					empty: {
						tip: '没有查询到数据',
					}
				},
				dataList: [], //列表数据
				isInit: false, // 列表是否已经初始化
				params: {},
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
			this.params.idCode = this.userInfo.idCode;
			this.params.region = this.userInfo.region;
			this.params.type = this.userInfo.type;
			this.regionTxt = getRegionText(this.userInfo.region)
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
			upCallback(mescroll) {
				bordererGoodsCurQuery(this.params).then(res => {
					let rs = total(res.results);
					this.dataList = rs
					mescroll.endSuccess();
				})
			},
			downCallback(mescroll) {
				mescroll.resetUpScroll();
			}

		}
	}
</script>

<style lang="scss" scoped>
	.wrapper {
		height: 100vh;
		font-size: 28rpx;
	}

	.goods-items {
		margin-bottom: 10px;
		width: 100%;
		background: #fff;
	}

	.goods-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 0 10px;
		border-bottom: 1px solid #f5f5f5;
		height: 32px;
		font-size: 14px;
	}

	.goods-item {
		display: flex;
		justify-content: space-between;
		padding: 10px 10px 0 10px;
		border-bottom: 1px solid #f5f5f5;
	}

	.goods-count {
		padding: 10px 0;
		color: #8d8d8d;
	}

	.goods-name {
		flex: 50%;
	}

	.goods-d {
		display: flex;
		flex: 1;
		flex-direction: column;
		text-align: right;
	}

	.goods-total {
		padding-right: 10px;
		height: 32px;
		line-height: 32px;
		text-align: right;
	}

	.goods-location {
		display: flex;
		justify-content: space-between;
		padding: 0 10px;
		height: 42px;
		line-height: 42px;
	}

	.goods-location i {
		padding-right: 5px;
	}

	.goods-items:last-child {
		margin-bottom: 0;
	}
</style>
