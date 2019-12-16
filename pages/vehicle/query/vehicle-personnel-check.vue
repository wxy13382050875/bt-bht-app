<template>
	<view class="app-content">
		<aca-nav-bar :level="2" title="待检车辆列表"></aca-nav-bar>
		<bht-layout-container>
			<view class="check-query-box-bg"></view>
			<view class="check-query-main">
				<view class="check-query-content">
					<view class="box-title">
						<text>序号</text>
						<text>车牌号</text>
						<text>商品名称</text>
						<text>物理重量</text>
					</view>
					<view class="list" :style="{ transform: listTransform }" ref="list">
						<view class="item" v-for="(item, index) in dataList" ref="items" :key="index">
							<text>{{index+1}}</text>
							<text>{{item.vehicleNo}}</text>
							<text>{{item.goodsName}}</text>
							<text>{{item.weight}}</text>
						</view>
						<view v-if="scrollStart" class="item" v-for="(item, index) in dataList" :key="Math.random()" ref="items">
							<text>{{index+1}}</text>
							<text>{{item.vehicleNo}}</text>
							<text>{{item.goodsName}}</text>
							<text>{{item.weight}}</text>
						</view>
					</view>
					<view v-if="dataList.length === 0" class="data-no-tip">
						<image src="/static/icon/no_data.gif"></image>
						<label class="data-no-tip-txt">没有查询到数据～_～</label>
					</view>
				</view>
			</view>
		</bht-layout-container>
	</view>
</template>

<script>
	/**
	 * 待检议车辆查询
	 */
	import {
		mapGetters
	} from 'vuex';
	import {
		checkVehicleQuery
	} from '@/api/bht';
	export default {
		data() {
			return {
				dataList: [],
				listTransform: 'translate(0,0)',
				scrollStart: false,
				height: 200,
				params: {}
			}
		},
		created() {
			this.params.organization = this.userInfo.region;
			this.params.customesCode = this.userInfo.customs;
			//发送请求
			this.list();
		},
		computed: {
			...mapGetters('user', ['userInfo'])
		},
		methods: {
			list() {
				checkVehicleQuery(this.params).then(res => {
					if (res.data !== undefined) {
						this.dataList = res.data;
						this.startMove();
					}
				});
			},
			startMove() {
				this.$nextTick(() => {
					let allHeight = this.dataList.length * 33;
					if (allHeight > this.height) {
						this.scrollStart = true;
						allHeight = allHeight * 2;
						let h = 0;
						setInterval(() => {
							h -= 0.33333333333333333333333333333333333;
							if (allHeight - this.height === Math.abs(h)) {
								h = 0;
								this.listTransform = 'translate(0,0)';
							}
							this.listTransform = 'translate(0,' + h + 'px)';
						}, 100);
					} else {
						this.scrollStart = false;
					}
				});
			}
		}
	}
</script>

<style lang="scss" scoped>
	.check-query-box-bg {
		position: relative;
		z-index: 199;
		height: 120rpx;
		background: rgba(239, 68, 85, 1);
	}

	.check-query-main {
		position: absolute;
		top: 20rpx;
		right: 0;
		bottom: 0;
		left: 0;
		padding: 0 $padding-content;

		.check-query-content {
			height: 1381px;
			background: rgba(255, 255, 255, 1);
			box-shadow: 0px 0px 16px 0px rgba(134, 134, 134, 0.4);
			border-top-right-radius: 10px;
			border-top-left-radius: 10px;

			.box-title {
				position: relative;
				display: flex;
				justify-content: space-around;
				align-items: center;
				height: 100rpx;
				font-size: 30rpx;
				color: rgba(56, 56, 56, 1);
				background: #fff;
				border-top-right-radius: 10px;
				border-top-left-radius: 10px;
				z-index: 1120;

				&::before {
					content: '';
					height: 1px;
					background-color: rgba(169, 168, 168, 1);
					position: absolute;
					bottom: 0;
					width: 100%;
				}

				text {
					flex: 1;
					text-align: center;
				}
			}

			.list {
				transition: all 0ms ease-in 0s;
				overflow: hidden;
				padding: 0 $padding-content;
				font-size: 28rpx;
				color: rgba(107, 107, 107, 1);

				.item {
					position: relative;
					display: flex;
					justify-content: space-between;
					align-items: center;
					height: 70rpx;

					&::before {
						content: '';
						height: 1px;
						background-color: rgba(169, 168, 168, 1);
						position: absolute;
						bottom: 0;
						width: 100%;
					}

					text {
						flex: 1;
						text-align: center;
						overflow: hidden;
						text-overflow: ellipsis;
						word-break: break-word;
						white-space: nowrap;
					}
				}
			}
		}
	}

</style>
