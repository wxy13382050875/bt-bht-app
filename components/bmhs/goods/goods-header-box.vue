<template>
	<view class="header-box">
		<view class="box">
			<view class="header">
				<label class="title">结算单号</label>
				<text>{{goodsHeaderData.billingseqno}}</text>
			</view>
			<view class="body">
				<view class="title">
					<label>边民姓名</label>
					<label>车牌号</label>
					<label>商品总额</label>
				</view>
				<view class="value">
					<label>{{goodsHeaderData.civilname}}</label>
					<label>{{goodsHeaderData.vehicleid}}</label>
					<label>￥{{goodsHeaderData.totlagoodsamout}}</label>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			goodsHeaderData: {
				type: Object,
				default: () => {
					return {}
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.header-box {
		padding: 12px;
		height: 120px;

		.box {
			display: flex;
			flex-direction: column;
			height: 100%;
			border-radius: 14px;
			background-color: #fff;
			box-shadow: 0 0 13px 0px #dddddd;

			.header {
				position: relative;
				display: flex;
				align-items: center;
				justify-content: space-between;
				padding: 0 12px;
				height: 42px;
				font-size: 29rpx;

				&::after {
					content: '';
					position: absolute;
					right: 0;
					bottom: 0;
					left: 0;
					height: 1px;
					background-color: #EEEEEE;
				}
			}

			.body {
				flex: 1;
				display: flex;
				flex-direction: column;

				.title {
					font-size: 29rpx;
					color: #8d8d8d;
				}

				.value {
					font-size: 33rpx;
					color: #333;
				}

				.title,
				.value {
					flex: 1;
					display: flex;
					justify-content: space-between;

					label {
						display: flex;
						align-items: center;
						justify-content: center;
						flex: 1;
						text-align: center;
					}
				}
			}

		}
	}
</style>
