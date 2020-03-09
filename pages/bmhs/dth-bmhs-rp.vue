<template>
	<view></view>
</template>

<script>
/**
 * 人脸识别界面
 */
import { mixin_dth_rp_aly } from '@/mixins/dth-rp-mix.js';
export default {
	mixins: [mixin_dth_rp_aly],
	data() {
		return {
			url: ''
		};
	},
	onLoad(options) {
		this.url = options.url;
		let { roleId, customs } = uni.getStorageSync('userInfo');
		if (customs != undefined) {
			this.dthRpFace();
		}
	},
	onShow() {
		let { roleId, customs } = uni.getStorageSync('userInfo');
		if (customs == undefined) {
			uni.showToast({
				title: '请完善口岸信息',
				icon: 'none',
				duration: 3000
			});
			setTimeout(() => {
				uni.redirectTo({
					url: '/pages/user/edit-profile'
				});
			}, 3000);
		}
	},
	methods: {
		dthRpFace() {
			let { idCode, phone } = uni.getStorageSync('userInfo');
			this.liveFaceVerify(idCode)
				.then(res => {
					uni.redirectTo({
						url: this.url
					});
				})
				.catch(error => {
					uni.showToast({
						title: error,
						icon: 'none',
						duration: 3000
					});
					setTimeout(() => {
						uni.redirectTo({
							url: '/pages/main'
						});
					}, 3000);
				});
		}
	}
};
</script>

<style lang="scss"></style>
