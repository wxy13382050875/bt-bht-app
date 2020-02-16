<template>
	<view class="dec-footer">
		<view class="btn" @click="postData">确认申报</view>
	</view>
</template>

<script>
	import {
		postDecGoods
	} from '@/api/bmhs.js'
	export default {
		props: {
			seqNo: {
				type: String,
				default: ''
			}
		},
		methods: {
			postData() {
				if (this.seqNo == '') {
					uni.showToast({
						title: '暂无可申报数据',
						icon: 'none'
					})
					return;
				}
				uni.moda
				uni.showModal({
					title: '提示',
					content: '是否确认申报？',
					success: (res) => {
						if (res.confirm) {
							postDecGoods({
								seqNo: this.seqNo
							}).then(res => {
								if (res.code == '200') {
									uni.showToast({
										title: '申报成功',
										icon: 'success',
										success: () => {
											this.$emit('successDec', true)
										}
									})
								} else {
									this.$emit('successDec', false)
								}
							}).catch(error => {

							})
						}
					}
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.dec-footer {
		display: flex;
		align-items: center;
		padding: 0 12px;
		width: 100%;
		height: 60px;
		background-color: #f7f3f0;

		.btn {
			flex: 1;
			display: flex;
			align-items: center;
			justify-content: center;
			
			height: 42px;
			color: #fff;
			border-radius: 50px;
			background-color: #ff3333;
		}
	}
</style>
