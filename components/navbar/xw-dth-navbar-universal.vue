<template>
	<view class="navbar-universal-container" :style="{ height: statusHeight + navHeight + 'px' }">
		<view class="status" :style="{ height: statusHeight + 'px' }"></view>
		<view class="navbar-universal-wrapper" :style="{ height: navHeight + 'px' }">
			<view class="nav-universal-wrapper">
				<view v-show="navType === 1" class="nav-back" @click="backToPrev"><label class="icon iconfont aca-fanhui1"></label></view>
				<view v-show="leftTitle != '' || leftImageName != ''" class="nav-left" @click="leftToPrev">
					<label v-show="leftTitle != ''">{{ leftTitle }}</label>
					<image v-show="leftImageName != ''" :src="leftImageName"></image>
				</view>
				
				<slot></slot>
	
				<view v-show="rightTitle != '' || rightImageName != ''" class="nav-right" @click="rightToPrev">
					<label v-show="rightTitle != ''">{{ rightTitle }}</label>
					<image v-show="rightImageName != ''" :src="rightImageName"></image>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
export default {
	name: 'navbar-back',
	props: {
		leftTitle: '', //导航左侧按钮
		leftImageName: '',
		rightTitle: '', //导航右侧侧按钮
		rightImageName: '',
		title: String,
		navType: 0 //二级页面返回，为 1时，不能有左侧按钮 返回上一级页面 
	},
	data() {
		return {};
	},
	computed: {
		...mapGetters({
			curUrl: 'utp/curUrl',
			statusHeight: 'utp/statusHeight',
			navHeight: 'utp/navHeight'
		})
	},
	created() {},
	methods: {
		...mapActions('utp', ['setNavHeight']),
		backToPrev() {
			if ('/pages/common/login' === this.curUrl) {
				uni.switchTab({
					url: '/pages/index/index'
				});
			} else {
				if (this.popType == 0) {
					this.$Router.back();
				} else {
					uni.navigateTo({
						url: '/pages/main'
					});
				}
			}
		},
		leftToPrev(e) {
			// console.log('导航左侧按钮');
			this.$emit('leftToPrev', e);
		},
		rightToPrev(e) {
			// console.log('导航右侧按钮');
			this.$emit('rightToPrev', e);
		}
	}
};
</script>

<style lang="scss">
.navbar-universal-container {
	position: fixed;
	top: 0;
	right: 0;
	left: 0;
	z-index: 993;
	text-align: center;
	background: $nav-bg-color;
}

.navbar-universal-wrapper {
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding: 0 $padding-content;

	.nav-universal-wrapper {
		position: relative;
		display: flex;
		align-items: center;
		width: 100%;
		height: 100%;
		justify-content: space-between;
		.nav-back {
			display: flex;
			// width: 32px;
			height: 100%;
			align-items: center;
			color: $text-color-white;
			font-size: 34rpx;
			z-index: 22;

			.icon {
				font-size: 34rpx;
			}
		}
		.nav-left {
			display: flex;
			// width: 60px;
			height: 100%;
			align-items: center;
			color: $text-color-white;
			font-size: 30rpx;
			z-index: 22;

			.icon {
				font-size: 30rpx;
			}
			image {
				margin-left: 10rpx;
				width: 40rpx;
				height: 40rpx;
			}
		}
		.nav-right {
			display: flex;
			height: 100%;
			align-items: center;
			color: $text-color-white;
			font-size: 30rpx;
			z-index: 22;
			text-align: center;
			.icon {
				font-size: 30rpx;
			}
			image {
				margin-left: 10rpx;
				width: 40rpx;
				height: 40rpx;
			}
		}
		.title {
			position: absolute;
			top: 0;
			right: 0;
			bottom: 0;
			left: 0;
			display: flex;
			align-items: center;
			justify-content: center;
			height: 100%;
			font-size: 30rpx;
			color: $text-color-white;
		}
	}
}
</style>
