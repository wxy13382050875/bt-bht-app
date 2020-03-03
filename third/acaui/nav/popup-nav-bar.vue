<template>
	<view class='nav' :style="{height:(statusHeight + navHeight)+'px'}">
		<view class='status' :style="{height: statusHeight +'px'}"></view>
		<view class='navbar' :style="{height: navHeight +'px'}">
			<view class="nav-level-2">
				<view class="nav-back" @click="backToPrev">
					<label class="icon iconfont icon-nav-back"></label>
					<!-- <text class="back-title">返回</text> -->
				</view>
				<view class="title">{{title}}</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		mapActions,
		mapGetters
	} from 'vuex';
	export default {
		props: {
			/*风格*/
			styleModel: {
				type: String,
				default: '1'
			},
			title: String,
			//导航层级 1/2/3/4
			level: {
				type: Number,
				default: 1
			}
		},
		computed: {
			...mapGetters({
				statusHeight: 'utp/statusHeight',
				navHeight: 'utp/navHeight'
			})
		},
		methods: {
			backToPrev(e) {
				this.$emit('backEvent', e)
			}
		}
	}
</script>

<style lang="scss">
	.nav {
		position: fixed;
		top: 0;
		right: 0;
		left: 0;
		z-index: 1;
		text-align: center;
		background: $nav-bg-color;
	}

	.navbar {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 0 $padding-content;

		.nav-level-2 {
			position: relative;
			display: flex;
			align-items: center;
			width: 100%;
			height: 100%;

			.nav-back {
				display: flex;
				width: 32px;
				height: 100%;
				align-items: center;
				color: $text-color-white;
				font-size: 34rpx;
				z-index: 22;

				.icon {
					font-size: 34rpx;
				}

				.back-title {
					margin-left: 10rpx;
				}

			}

			.title {
				position: absolute;
				left: 0;
				right: 0;
				flex: 1;
				font-size: 30rpx;
				color: $text-color-white;
				height: 100%;
				display: flex;
				align-items: center;
				justify-content: center;
			}
		}

		.navbar-capsule {
			position: absolute;
			width: 85px;
			height: 30px;
			border: 1px solid #C7C7C7;
			border-radius: 50px;
			background-color: trans;
		}

		.navbar-capsule {
			display: flex;
			align-items: center;

			.navbar-icon {
				flex: 1;
				font-size: 40rpx;
				color: #fff;
			}

			.navbar-iccon-split {
				width: 1px;
				height: 85%;
				background: #C7C7C7;
			}
		}
	}
</style>
