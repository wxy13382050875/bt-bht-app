<template>
	<view class="sem-index-container">
		<universalNavBar   :navType='1' rightTitle="筛选" rightImageName="/static/icon/icon-flitter.png" @leftToPrev="leftToPrev" @rightToPrev="rightToPrev">
			<template name="nav">
				<label class="navTitle">边民互市二级交易市场</label>
			</template>
		</universalNavBar>
		<bht-layout-container bgColor="#F2F2F2" :bottom="0">
			<view class="scan-list-container">
				<view class="list-items" v-for="item in 4">
					<view class="info">
						<view class="info-header">
							<view class="goods-name">木炭,鲜水果、活螃蟹...</view>
							<view class="price">
								<label class="symbol">¥</label>
								<text class="value">8000</text>
							</view>
						</view>
						<view class="info-items">
							<label class="title">边民姓名</label>
							<text class="value">王国富</text>
						</view>
						<view class="info-items">
							<label class="title">车牌号</label>
							<text class="value">云A.22222</text>
						</view>
						<view class="info-items">
							<label class="title">重量</label>
							<text class="value">200kg</text>
						</view>
						<view class="info-items">
							<label class="title">支付状态</label>
							<text class="value" style="color: #008400;">已支付</text>
						</view>
						<view class="info-items">
							<label class="title">发票状态</label>
							<text class="value" style="color: #D20000;">未开发票</text>
						</view>
					</view>
				</view>
			</view>
		</bht-layout-container>
		<view class="right-drawer">
			<uni-drawer :visible="showRight" mode="right" @close="closeDrawer('right')">
				<!-- #ifndef MP-BAIDU || MP-ALIPAY || MP-TOUTIAO -->
				<view class="dialog-title">
					筛选
				</view>
				<view class="flitter-item">
					<view class="item-attr">
						<view class="item-name">
							车牌号
						</view>
						<view class="item-form-input">
							<input class="item-input"   placeholder="请输入车牌号" />
							<view class="arrow-right"></view>
						</view>
					</view>
					<view class="item-attr">
						<view class="item-name">
							商品名称
						</view>
						<view class="item-form-input">
							<input class="item-input"   placeholder="请输入商品名称" />
							<view class="arrow-right"></view>
						</view>
					</view>
					<view class="item-attr">
						<view class="item-name">
							边民姓名
						</view>
						<view class="item-form-input">
							<input class="item-input"  placeholder="请输入边民姓名" />
							<view class="arrow-right"></view>
						</view>
					</view>
					<view class="item-attr">
						<view class="item-name">
							支付状态
						</view>
						<picker @change="pickerPaperTypeChange" :value="payIndex" :range="payArr">
							<view class="item-form-input">
								<input class="item-input" disabled="true" :value="roleText" placeholder="选择支付状态" />
								<view class="arrow-right"><view class="iconfont aca-xiala"></view></view>
							</view>
						</picker>
					</view>
					<view class="item-attr">
						<view class="item-name">
							发票状态
						</view>
						<picker @change="pickerPaperTypeChange" :value="paperTypeIndex" :range="roleArr">
							<view class="item-form-input">
								<input class="item-input" disabled="true" :value="roleText" placeholder="选择发票状态" />
								<view class="arrow-right"><view class="iconfont aca-xiala"></view></view>
							</view>
						</picker>
					</view>
					<view class="item-attr">
						<view class="item-name">
							下单时间
						</view>
						<picker @change="pickerPaperTypeChange" :value="paperTypeIndex" :range="roleArr">
							<view class="item-form-input">
								<input class="item-input" disabled="true" :value="roleText" placeholder="选择下单日期" />
								<view class="arrow-right"><view class="iconfont aca-xiala"></view></view>
							</view>
						</picker>
					</view>
				</view>
				<view class="dialog-bottom">
					<view class="dialog-finish">
						<button class="finish-btn" @click="confirm">查询</button>
						<button class="reset-btn" @click="confirm">重置</button>
					</view>
				</view>
				
			</uni-drawer>
		</view>
		
		<!-- <flitterDialog v-model="bShowFlitterDialog"></flitterDialog> -->
	</view>
</template>

<script>
import universalNavBar from '@/components/navbar/xw-dth-navbar-universal.vue';
// import flitterDialog from '@/components/sem/xw-dth-flitter-dialog.vue';
import uniDrawer from '@/third/uni-drawer/uni-drawer.vue'
export default {
	components: {
		universalNavBar,
		uniDrawer
	},
	data() {
		return {
			showRight: false,
			payArr: ['未支付', '已支付'],
			payIndex: 0,
		};
	},
	methods: {
		leftToPrev(e) {
			console.log('导航左侧按钮' + e);
		},
		rightToPrev(e) {
			console.log('导航右侧按钮' + e);
			this.showRight = !this.showRight;
		},
		closeDrawer(e) {
			this.showRight = false;
		},
	}
};
</script>

<style lang="scss">
.sem-index-container {
	.navTitle{
		color: #fff;
		
	}
	.header {
		display: flex;
		justify-content: center;
		height: 140rpx;
		background-color: #ef4455;
		text-align: center;
		.box {
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: center;
			.icon {
				width: 62rpx;
				height: 62rpx;
			}
			.title {
				margin-top: 6rpx;
				font-size: 30rpx;
				color: #fff;
			}
		}
	}
	.scan-list-container {
		position: absolute;
		height: 100%;
		padding: $padding-content;
		overflow-y: scroll;
		width: 100%;
		.list-items {
			display: flex;
			margin-bottom: $padding-content;
			padding: 0 $padding-content;
			background-color: #fff;
			border-radius: 10px;
			&:last-child {
				margin-bottom: 0;
			}

			.check {
				display: flex;
				align-items: center;
				width: 42px;
			}
			.info {
				flex: 1;
				.info-header {
					display: flex;
					justify-content: space-between;
					align-items: center;
					height: 71rpx;
					border-bottom: 2px solid #b2b4b3;
					.goods-name {
						flex: 1;
						text-overflow: hidden;
						font-size: 32rpx;
						color: #333;
					}
					.price {
						width: 80px;
						text-align: right;
						color: #ff3333;
						.symbol {
							font-size: 22rpx;
						}
						.value {
							font-size: 32rpx;
						}
					}
				}
				.info-items {
					display: flex;
					align-items: center;
					justify-content: space-between;
					height: 54rpx;
					font: 26rpx;
					color: #898989;
					border-bottom: 1px solid #e5e5e5;

					&:last-child {
						border-bottom: 0;
					}
				}
			}
		}
		.tips {
			display: flex;
			align-items: center;
			justify-content: center;
			height: 100%;
			font-size: 34rpx;
			color: #e40011;
		}
	}
	.scan-footer {
		position: absolute;
		bottom: 0;
		padding: 0 $padding-content;
		display: flex;
		align-items: center;
		justify-content: space-between;
		width: 100%;
		height: 114rpx;
		font-size: 30rpx;
		background-color: #fff;
		.total {
			color: #333333;
			.price {
				color: #ff3333;
			}
		}
		.sub-btn {
			width: 238rpx;
			height: 82rpx;
			line-height: 82rpx;
			text-align: center;
			background-color: #ff6f04;
			border-radius: 41px;
			color: #ffffff;
		}
	}
	.right-drawer{
		.dialog-title{
			background: #F3F3F3;
			width: 100%;
			height: 44px;
			line-height: 44px;
			text-align: center;
			color: #898989;
			font-size: 30rpx;
		}
		.flitter-item{
			.item-attr{
				display: flex;
				justify-content: space-between;
				align-items: center;
				height: 120rpx;
				line-height: 120rpx;
				.item-name{
					width: 160rpx;
					font-size: 30rpx;
					color: #6B6B6B;
					text-align: right;
				}
				.item-form-input{
					display: flex;
					height: 80rpx;
					line-height: 80rpx;
					margin-right: 10rpx;
					margin-left: 10rpx;
					border-radius: 10rpx;
					border: 1rpx solid #898989;
					.item-input{
						margin-left: 10rpx;
						height: 100%;
						
					}
						
					input::-ms-input-placeholder{
						font-size: 28rpx;
						color: #898989;
					}
					.arrow-right{
						// margin-right: 13rpx;
						width: 60rpx;
						height: 60rpx;
					}
				}
			}
		}
		.dialog-bottom{
			display: flex;
			width: 100%;
			height: 119rpx;
			opacity: 1;
			position: fixed;
			bottom: 0;
			justify-content: center;
			.dialog-finish {
				display: flex;
				justify-content:space-between;
				width: 325rpx;
				.finish-btn {
					height: 58rpx;
					line-height: 58rpx;
					width: 156rpx;
					color: #ffffff;
					font-size: 30rpx;
					background: #FF3300;
				}
				.reset-btn {
					height: 58rpx;
					line-height: 58rpx;
					width: 156rpx;
					color: #FF3300;
					font-size: 30rpx;
					border: 1rpx solid #FF3300;
				}
			}
		}
	}
}
</style>
