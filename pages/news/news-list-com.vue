<template>
	<view>
		<view @click="navTo(item.id)" class="item" v-for="(item,index) in dataList" :key="index">
			<image :src="item.img"></image>
			<view class="detail">
				<view class="title">
					{{item.title}}
				</view>
				<view class="summary">
					{{item.summary}}
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: 'news-list-items',
		props: {
			//数据列表
			dataList: {
				type: Array,
				default: () => {
					return []
				}
			}
		},
		methods: {
			navTo(id) {
				this.$Router.push({
					name: 'news-details',
					params: {
						newsId: id
					}
				})
			}
		}
	}
</script>

<style lang="scss">
	.item {
		position: relative;
		display: flex;
		height: 185rpx;
		margin-bottom: 17rpx;

		image {
			width: 254rpx;
			height: 100%;
		}

		.detail {
			display: flex;
			flex: 1;
			flex-direction: column;
			justify-content: space-between;
			margin-left: 17rpx;

			.title {
				height: 68rpx;
				overflow: hidden;
				font-size: 28rpx;
				color: rgba(23, 23, 23, 1);
				line-height: 36rpx;
			}

			.summary {
				height: 65rpx;
				overflow: hidden;
				font-size: 24rpx;
				color: rgba(99, 99, 99, 1);
				line-height: 36rpx;
			}
		}

		&::last-child {
			margin-bottom: 0;
		}

		&::after {
			content: '';
			position: absolute;
			right: 0;
			bottom: 0;
			left: 0;
			border-bottom: 1px solid rgba(229, 229, 229, 1);
		}
	}
</style>
