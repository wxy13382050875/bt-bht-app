<template>
	<view class="bht-fun-wrapper">
		<view class="bht-fun">
			<view hover-class="none" class="items" v-for="(item, index) in dataSource" :key="index" @click="navTo(item.url)">
				<image class="icon" :style="{ width: iconWdith + 'rpx', height: iconWdith + 'rpx' }" :src="item.pictureUrl"></image>
				<view class="title">{{ item.name }}</view>
			</view>
		</view>
	</view>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import { submitInvoice } from '@/api/bill';
import { mixin_dth_rp_aly } from '@/mixins/dth-rp-mix.js';
export default {
	mixins: [mixin_dth_rp_aly],
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
	created() {},
	methods: {
		navTo(url) {
			let { idCode, phone } = uni.getStorageSync('userInfo');
			this.liveFaceVerify(idCode)
				.then(res => {
					uni.showToast({
						title: '认证成功',
						duration: 3000,
						success: () => {
							setTimeout(() => {
								uni.navigateTo({
									url: url
								});
							}, 3000);
						}
					});
				})
				.catch(error => {
					uni.showToast({
						title: error,
						icon: 'none',
						duration: 3000
					});
				});
		}
	}
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
