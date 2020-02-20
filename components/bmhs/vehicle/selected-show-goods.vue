<template>
	<view>
		<popup-nav-bar :level="2" @backEvent="backEvent" title="已添加商品"></popup-nav-bar>
		<bht-layout-container :bottom="0">
			<view class="selected-show-goods">
				<view class="items" v-for="(item, index) in goodsList" :key="index">
					<view class="goods-info">
						<view class="header">
							<label class="title">商品名称</label>
							<label class="value">{{item.name}}</label>
						</view>
						<view class="body">
							<view class="cell">
								<label class="title">商品分类</label>
								<label class="value">{{item.categoryName}}</label>
							</view>
							<view class="cell">
								<label class="title">税号</label>
								<label class="value">{{item.code}}</label>
							</view>
							<view class="cell">
								<label class="title">包装净重 </label>
								<label class="value">{{item.packWeightNew}}</label>
							</view>
							<view class="cell">
								<label class="title">单位 </label>
								<label class="value">{{item.priceUnitNew}}</label>
							</view>
							<view class="cell">
								<label class="title">毛重</label>
								<label class="value">{{item.maxWeight}}</label>
							</view>
							<view class="cell">
								<label class="title">单价 </label>
								<label class="value">{{item.unitPrice}}</label>
							</view>
						</view>
						<view class="footer">
							<view class="del-btn" @click="del(item.seqNo)">删除</view>
						</view>
					</view>
				</view>
			</view>
		</bht-layout-container>
	</view>
</template>

<script>
	/**
	 * 显示已选择的商品
	 */
	import {
		mapGetters,
		mapActions
	} from 'vuex';
	import PopupNavBar from '@/third/acaui/nav/popup-nav-bar.vue'
	export default {
		components: {
			PopupNavBar
		},
		computed: {
			...mapGetters({
				goodsList: 'bmhs/getGoodsList'
			}),
		},
		methods: {
			...mapActions({
				delGoods: 'bmhs/delGoods'
			}),
			/**
			 * 通过seqNo 删除选择的商品
			 * @param {Object} seqNo
			 */
			del(seqNo) {
				uni.showModal({
					title: '提示',
					content: '是否确认删除？',
					success: (res) => {
						if(res.confirm){
							this.delGoods(seqNo);
						}
					}
				})
			},
			backEvent() {
				this.$emit('close', close)
			},
		}

	}
</script>

<style lang="scss">
	@mixin goodsInfo {
		padding: $padding-content 0;
		display: flex;
		align-items: center;
		justify-content: space-between;
		border-bottom: 1px solid #ececec;
		font-size: 26rpx;
		color: #868686;

		.title {
			width: 100px;
		}

		.value {
			flex: 1;
			display: flex;
			justify-content: flex-end;
		}
	}

	.selected-show-goods {
		height: 100%;
		overflow: scroll;

		.items {
			padding: 0 $padding-content;
			margin-bottom: $padding-content;
			display: flex;
			align-items: center;
			background-color: #fff;

			&:last-child {
				margin-bottom: 0;
			}

			.goods-info {
				flex: 1;

				.header {
					@include goodsInfo;
					border-bottom-width: 2px;
				}

				.body {
					.cell {
						@include goodsInfo
					}
				}
			}
		}

		.footer {
			padding: $padding-content 0;

			.del-btn {
				height: 42px;
				text-align: center;
				line-height: 42px;
				background-color: #ff984c;
				border-radius: 50px;
				font-size: 29rpx;
				color: #fff;
			}
		}

	}
</style>
