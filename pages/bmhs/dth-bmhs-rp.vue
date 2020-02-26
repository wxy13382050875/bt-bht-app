<template>
	<view>
		<nav-bar-back title="人脸识别" popType="0"></nav-bar-back>
		<bht-layout-container :bottom="0" bgColor="#fff">
			<view class="face-container">
				<view class="btn" @click="dthRpFace">
					<image class="icon" src="/static/bmhs/face_icon.png"></image>
					<label class="title">人脸识别</label>
				</view>
			</view>
		</bht-layout-container>
	</view>
</template>

<script>
	/**
	 * 人脸识别界面
	 */
	import {
		getCivilFaceStatus
	} from '@/api/dth-rp-aly.js'
	import {
		mixin_dth_rp_aly
	} from '@/mixins/dth-rp-mix.js'
	export default {
		mixins: [mixin_dth_rp_aly],
		data() {
			return {
				url: ''
			}
		},
		onLoad(options) {
			this.url = options.url;
		},
		methods: {
			dthRpFace() {
				let {
					idCode,
					phone
				} = uni.getStorageSync('userInfo');
				this.liveFaceVerify(idCode).then(res => {
					setTimeout(() => {
						uni.navigateTo({
							url: this.url
						})
					})
				}).catch(error => {
					uni.showToast({
						title: error,
						icon: 'none',
						duration: 3000
					})
					setTimeout(() => {
						uni.navigateBack();
					}, 3000)

				})
			}
		}
	}
</script>

<style lang="scss">
	.face-container {
		display: flex;
		width: 100%;
		height: 100%;
		align-items: center;
		justify-content: center;
		.btn{
			display: flex;
			align-items: center;
			justify-content: center;
			flex-direction: column;
			width: 240rpx;
			height: 240rpx;
			background-color: #fff;
			box-shadow: 0px 0px 20px #dedede;
			    border-radius: 10px;
			.icon{
				width: 110rpx;
				height: 110rpx;
			}
			.title{
				mariong-top: 5px;
			}
		}
	}
</style>
