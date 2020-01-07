<template>
	<view class="address-list">
		<uni-swipe-action class="swipe-action">
			<uni-swipe-action-item
				class="swipe-action-itme"
				v-for="(item, index) in dataSource"
				:show="isOpened"
				:options="options"
				:key="item.addressId"
				@change="swipeChange"
				@click="swipeClick($event, item.addressId)"
			>
				<view class="address-cell" @click="didSelectCell(item)">
					<view class="a-img">
						<image src="../../static/icon/icon-locate-other.png" mode="" v-if="item.defaultFlag !== 1"></image>
						<image src="../../static/icon/icon-locate-def.png" mode="" v-if="item.defaultFlag === 1"></image>
						<view class="a-surname" v-if="item.defaultFlag !== 1">{{ item.name.slice(0, 1) }}</view>
					</view>
					<view class="a-address-info">
						<view class="a-oneline">
							<view class="a-name">{{ item.name }}</view>
							<view class="a-phone">{{ item.phone }}</view>
						</view>
						<view class="a-twoline">
							<view class="a-address">
								<label class="a-default" v-if="item.defaultFlag === 1">默认</label>
								{{ item.location }}{{ item.detail }}
							</view>
							<navigator :url="'/pages/user/my-address-create?item=' + encodeURIComponent(JSON.stringify(item))" class="a-edit"><view class="">编辑</view></navigator>
						</view>
					</view>
				</view>
			</uni-swipe-action-item>
		</uni-swipe-action>
	</view>
</template>

<script>
import UniSwipeAction from '@/third/uni-swipe-action/uni-swipe-action/uni-swipe-action.vue';
import UniSwipeActionItem from '@/third/uni-swipe-action/uni-swipe-action-item/uni-swipe-action-item.vue';
import { deleteAddress } from '@/api/shop.js';
export default {
	components: {
		UniSwipeActionItem,
		UniSwipeAction
	},
	data() {
		return {
			isOpened: false,
			options: [
				{
					text: '删除',
					style: {
						backgroundColor: '#dd524d'
					}
				}
			]
		};
	},
	props: {
		dataSource: {
			type: Array,
			default() {
				return {};
			}
		}
	},
	onReady() {
		this.$nextTick(() => {
			this.isOpened = true;
		});
	},
	methods: {
		didSelectCell(e) {
			this.$emit('didSelectCell', e);
		},
		bindClick(e) {
			uni.showToast({
				title: `点击了${e.content.text}按钮`,
				icon: 'none'
			});
		},
		setOpened() {
			this.isOpened = !this.isOpened;
		},
		change(e) {
			this.isOpened = e;
			console.log('...返回：', e);
		},
		swipeChange(e) {
			console.log('...返回：', e);
		},
		swipeClick(e, addressId) {
			console.log('234567890');
			let { content } = e;
			console.log(addressId);
			if (content.text === '删除') {
				// console.log(content.text, index);
				uni.showModal({
					title: '提示',
					content: '是否删除',
					success: res => {
						if (res.confirm) {
							// this.swipeList.splice(index, 1);
							let param = {
								addressId: addressId
							};
							deleteAddress(param).then(res => {
								// console.log(res);
								let { data, code, msg } = res;
								uni.showToast({
									title: msg,
									icon: 'none'
								});
								if (code === '200') {
									this.$emit('refreshData', data);
								}
							});
						} else if (res.cancel) {
							console.log('用户点击取消');
						}
					}
				});
			}
		}
	}
};
</script>

<style lang="scss">
.address-list {
	.swipe-action {
		.swipe-action-itme {
			.address-cell {
				width: 100%;
				margin-top: 10rpx;
				margin-bottom: 10rpx;
				background: #ffffff;
				height: 100%;
				display: flex;
				justify-content: space-between;
				align-items: center;
				.a-img {
					margin-left: 20rpx;
					width: 65rpx;
					height: 69rpx;
					// margin: 0 auto; /*水平居中*/
					// position: relative;
					// margin-left: 20rpx;
					// top: 50%; /*偏移*/
					// transform: translateY(-50%);
					image {
						margin: 0 auto; /*水平居中*/
						width: 65rpx;
						height: 79rpx;
						position: absolute;
						z-index: 80;
					}
					.a-surname {
						width: 65rpx;
						height: 79rpx;
						line-height: 79rpx;
						position: absolute;
						z-index: 100;
						color: #ffffff;
						font-size: 32rpx;
						text-align: center;
						vertical-align: middle;
						// top: 50%;
					}
				}
				.a-address-info {
					margin-left: 30rpx;
					margin-right: 20rpx;
					width: 100%;
					.a-oneline {
						display: flex;
						height: 80rpx;
						line-height: 80rpx;
						.a-name {
							color: #333333;
							font-size: 32rpx;
						}
						.a-phone {
							color: #999999;
							font-size: 26rpx;
							margin-left: 13rpx;
						}
					}
					.a-twoline {
						display: flex;
						justify-content: space-between;
						.a-default {
							width: 60rpx;
							color: #ff3333;
							font-size: 26rpx;
							margin-right: 20rpx;
						}
						.a-address {
							color: #333333;
							font-size: 26rpx;
						}
						.a-edit {
							width: 127rpx;
							text-align: center;
							border-left: 1rpx solid #b2b4b3;
							margin-bottom: 10rpx;
						}
					}
				}
			}
		}
	}
}
</style>
