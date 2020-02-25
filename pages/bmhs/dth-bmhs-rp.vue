<template>
	<view>
		<nav-bar-back title="人脸识别" popType="0"></nav-bar-back>
		<bht-layout-container :bottom="0">
			<button class="btn" @click="dthRpFace">人脸识别</button>
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
					getCivilFaceStatus({
						idCode: idCode,
						phone: phone
					}).then(res => {
						if (res.code == '200') {
							uni.showToast({
								title: '认证成功',
								icon: 'none'
							})
							setTimeout(() => {
								uni.navigateTo({
									url: this.url
								})
							})
						}
					}).catch(error => {
						let {
							data
						} = error;
						uni.showToast({
							title: data.msg,
							icon: 'none',
							duration: 3000
						})
					})
				}).catch(error => {
					uni.showToast({
						title: error,
						icon: 'none'
					})
				})
			}
		}
	}
</script>

<style>
</style>
