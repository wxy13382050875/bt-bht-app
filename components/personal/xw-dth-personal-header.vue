<template>
	<view class="personal">
		<view class="personal-body">
			<view class="personal-info">
				<view class="left-item">
					<image :src="dataSource.userPicture == null ? '/static/icon/icon-head-portrait.png' : dataSource.userPicture"></image>
					<view style="margin-left: 20rpx; align-items: center;">
						<view class="title" v-if="JSON.stringify(dataSource.realName) != 'null' && JSON.stringify(dataSource.realName) != ''">{{ dataSource.realName }}</view>
						<view class="title" v-else>请完善用户信息</view>
						<view class="describe" v-if="JSON.stringify(dataSource.signature) != 'null' && JSON.stringify(dataSource.signature) != ''">{{ dataSource.signature }}</view>
						<view class="title" v-else>用户什么也没留下</view>
					</view>
				</view>
				<view class="personal-set"  v-show="roleId!=2">
					<view class="qr-code" @click="showQR"><image src="/static/icon/icon-erweima.png" mode="" ></image></view>
					<view class="right-item">
						<navigator url="/pages/user/edit-profile" hover-class="none" class="btn-name">设置</navigator>
						<image src="/static/icon/icon_right_arrow-write.png" mode=""></image>
					</view>
				</view>
			</view>
			<view class="personal-store">
				<!-- <view class="item">
					<view class="">42</view>
					<view class="">商品收藏</view>
				</view>
				<view class="item">
					<view class="">42</view>
					<view class="">店铺关注</view>
				</view>
				<view class="item">
					<view class="">42</view>
					<view class="">我的足迹</view>
				</view> -->
			</view>
		</view>
		
	</view>
</template>

<script>
	import UniPopup from '@/third/uni-popup/uni-popup.vue';
export default {
	components: {
		UniPopup,
	},
	props: {
		dataSource: {
			type: Object,
			default() {
				return {};
			}
		},
		roleId:0
	},
	methods: {
		showQR(e) {
			this.$emit('togglePopup', e);
		}
	}
};
</script>

<style lang="scss">
.personal {
	height: 100%;
	background: #e40011;
	.personal-body {
		.personal-info {
			height: 240rpx;
			display: flex;
			justify-content: space-between;
			margin-left: 30rpx;
			margin-right: 30rpx;
			align-items: center;
			.left-item {
				display: flex;
				align-items: center;
				image {
					width: 100rpx;
					height: 100rpx;
				}
				.title {
					color: #ffffff;
					font-size: 24rpx;
				}
				.describe {
					color: #ffffff;
					font-size: 20rpx;
				}
			}
			.personal-set {
				display: flex;
				justify-content: space-between;
				width: 220rpx;
				.qr-code {
					margin-right: 20rpx;
					image {
						width: 50rpx;
						height: 50rpx;
					}
				}
				.right-item {
					height: 50rpx;
					line-height: 50rpx;
					width: 130rpx;
					display: flex;
					align-items: center;

					border-radius: 25rpx;
					background: #ff727c;
					image {
						width: 12rpx;
						height: 25rpx;
						margin-right: 20rpx;

						opacity: 1;
					}
					.btn-name {
						width: 100%;
						text-align: center;
						color: #ffffff;
					}
				}
			}
		}
		.personal-store {
			background: url(../../static/icon/bg-personal-oredr.png);
			height: 151rpx;
			width: 100%;
			z-index: 100;
			display: flex;
			justify-content: space-between;
			.item {
				width: 33%;
				text-align: center;
				color: #ffffff;
				font-size: 24rpx;
			}
		}
	}
}
</style>
