<template>
	<view class="app-content">
		<aca-nav-bar :level="2" title="新闻列表"></aca-nav-bar>
		<bht-layout-container>
			<mescroll-uni @init="initMescroll" :down="downOption" :up="upOption" @up="upCallback" @down="downCallback" :fixed="false">
				<bht-banner></bht-banner>
				<view class="news-wrapper">
					<view class="title">
						<text class="txt">新闻推荐</text>
					</view>
				</view>
				<view class="news-list">
					<news-list-com :dataList="dataList"></news-list-com>
				</view>
			</mescroll-uni>
		</bht-layout-container>
	</view>
</template>

<script>
	import BhtBanner from '@/components/common/bht-banner'
	import NewsListCom from '@/components/news/news-list-com.vue'
	import {
		newsList
	} from '@/api/news.js'
	export default {
		components: {
			BhtBanner,
			NewsListCom
		},
		data() {
			return {
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
					textNoMore: '没有更多数据了'
				},
				dataList: [],
				params: {}
			}
		},
		methods: {
			//获取mescroll对象
			initMescroll(mescroll) {
				this.mescroll = mescroll;
			},
			//下拉刷新
			downCallback(mescroll) {
				mescroll.resetUpScroll();
			},
			//上拉刷新
			upCallback(mescroll) {
				this.params.page = mescroll.num;
				this.params.limit = mescroll.size;
				newsList(this.params).then(res => {
					let {
						count,
						data
					} = res.data
					if (mescroll.num == 1) this.dataList = [];
					this.dataList = this.dataList.concat(data);
					mescroll.endBySize(
						data.length, count);
					this.$nextTick(() => {
						mescroll.endSuccess(data.length)
					})
				})
			}
		}
	}
</script>

<style lang="scss">
	.news-wrapper {
		padding: 0 $padding-content;

		.title {
			position: relative;
			height: 73rpx;
			line-height: 73rpx;

			&::after {
				content: ' ';
				position: absolute;
				right: 0;
				bottom: 0;
				left: 0;

				height: 1px;
				background: rgba(169, 168, 168, 1);
			}

			.txt {
				position: relative;
				padding-left: 10rpx;
				font-size: 34rpx;
				font-weight: bold;
				color: #E40011;

				&::after {
					content: ' ';
					position: absolute;
					top: 4px;
					left: 0;
					width: 2px;
					height: 34rpx;
					background-color: rgba(254, 89, 6, 1);
				}
			}
		}
	}

	.news-list {
		padding: 0 $padding-content;
	}
</style>
