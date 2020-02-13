<template>
	<view class="data-list">
		<view class="items" v-for="(item, index) in goodsData" :key="index">
			<view class="header">
				<label class="title">商品分类</label>
				<label class="value">{{item.goods_type}}</label>
			</view>
			<view class="body">
				<view class="left">
					<view class="cell">
						<label class="title">税号:</label>
						<label>{{item.goods_tax}}</label>
					</view>
					<view class="cell">
						<label class="title">单位:</label>
						<label>{{item.goods_unit}}</label>
					</view>
					<view class="cell">
						<label class="title">单价:</label>
						<label>{{item.goods_price}}</label>
					</view>
					<view class="cell">
						<label class="title">数量(件/箱):</label>
						<label>{{item.goods_qty}}}</label>
					</view>
				</view>
				<view class="right">
					<view class="cell">
						<label class="title">重量(千克):</label>
						<label>{{item.goods_wt}}</label>
					</view>
					<view class="cell">
						<label class="title">金额:</label>
						<label>{{item.amount}}</label>
					</view>
					<view class="cell">
						<label class="title">交易摊位:</label>
						<label>{{item.store_name}}</label>
					</view>
					<view class="cell">
						<label class="title">唛码:</label>
						<label>{{item.lable_code}}</label>
					</view>
				</view>
			</view>
			<view class="footer">
				<label class="title">商品名称</label>
				<label class="value">{{item.goods_name}}}</label>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			goodsData: {
				type: Array,
				default: () => {
					return []
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.data-list {
		height: 100%;
		.items {
			margin-bottom: 20px;
			font-size: 29rpx;
			background-color: #fff;

			.header,
			.footer {
				position: relative;
				display: flex;
				justify-content: space-around;
				align-items: center;
				padding: 0 12px;
				height: 42px;

				&::after {
					content: '';
					position: absolute;
					height: 1px;
					width: 100%;
					background-color: #EEEEEE;
				}

				.value {
					flex: 1;
					text-align: right;
				}

				.title {
					width: 120px;
				}

			}

			.header {
				&::after {
					bottom: 0;
				}
			}

			.footer {
				&::after {
					top: 0;
				}
			}

			.body {
				display: flex;

				.left,
				.right {
					flex: 1;

					.cell {
						padding: 5px 12px;

						label {
							display: inline-block;
						}

						.title {
							width: 82px;
							margin-right: 5px;
							text-align: right;
						}

					}
				}

				.right {
					text-align: right;
				}
			}
		}
	}
</style>
