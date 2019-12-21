<template>
	<view class="bht-fun-wrapper">
		<view class="bht-fun">
			<navigator  hover-class="none" class="items" v-for="(item, index) in dataSource" :key="index" :url="item.page">
				<image class="icon" :src="item.img"></image>
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
		url:"",
		dataSource: {
			type: Array,
			default: () => {
				return [];
			}
		}
	},
	created() {}
};
</script>

<style lang="scss" scoped>
.bht-fun-wrapper {
	background: #ffffff;
	.bht-fun {
		display: flex;
		justify-content: space-between;
		flex-wrap: wrap;
		.items {
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			width: 25%;
			height: 149rpx;
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
