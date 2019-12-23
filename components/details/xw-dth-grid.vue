<template>
	<view class="bht-fun-wrapper">
		<view class="bht-fun">
			<navigator hover-class="none" class="items" v-for="(item, index) in dataSource" :key="index" :url="item.page">
				<image class="icon" :style="{ width: iconWdith + 'rpx', height: iconWdith + 'rpx' }" :src="item.pictureUrl"></image>
				<view class="title">{{ item.name }}</view>
			</navigator>
		</view>
	</view>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import { submitInvoice } from '@/api/bill';
export default {
	props: {
		dataSource: {
			type: Array,
			default: () => {
				return [];
			}
		},
		iconWdith: {
			type: Number,
			default: 94
		}
	},
	created() {}
};
</script>

<style lang="scss" scoped>
.bht-fun-wrapper {
	background: #ffffff;
	padding: $padding-content 0;
	.bht-fun {
		display: flex;
		flex-wrap: wrap;
		.items {
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			width: 25%;
			height: 149rpx;
			margin-top: 22rpx;
			.icon {
				width: 94rpx;
				height: 94rpx;
			}
			.title {
				margin-top: 20rpx;
				font-size: 24rpx;
				color: rgba(134, 134, 134, 1);
			}
		}
	}
}
</style>
