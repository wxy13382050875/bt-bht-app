<template>
	<view>
		<bht-layout-container :bottom="0" bgColor="#fff">
			<view class="vehicle-dec-data-container">
				<view class="aca-cell">
					<view class="label">运输工具类型</view>
					<view class="content"><input type="text" class="input" placeholder="请输入姓名" /></view>
				</view>
				<view class="aca-cell">
					<view class="label">承运人</view>
					<view class="content"><input type="text" class="input" placeholder="请输入承运人" /></view>
				</view>
				<view class="aca-cell">
					<view class="label">车牌号</view>
					<view class="content" @click="showSearchVehile"><input type="text" class="input" placeholder="请输入车牌号" disabled="" /></view>
				</view>
				<view class="aca-cell">
					<view class="label">证件类型</view>
					<view class="content"><input type="text" class="input" placeholder="请选择证件类型" /></view>
				</view>
				<view class="aca-cell">
					<view class="label">证件号码</view>
					<view class="content"><input type="text" class="input" placeholder="请输入证件号码" /></view>
				</view>

				<view class="show-selected-goods">查看已添加的商品</view>
			</view>
			<view class="vehicle-dec-footer">
				<view class="btn add-goods-btn" @click="addGoodsModal">添加商品</view>
				<view class="btn confirm-dec-btn" @click="confirmDec">确认申报</view>
			</view>
		</bht-layout-container>
		<searc-modal @searchInput="searchInput" v-model="showSearchVehicleStatus">
			<view class="search-vehicle-result">
				<view class="item" v-for="item in 10" @click="selectVehicleHandler(item)">
					<label class="text">{{item}}</label>
				</view>
			</view>
		</searc-modal>
		<uni-drawer ref="addGoodsModal" :zIndex="2000" width="100%">
			<goods-search-modal @close="closeDrawer"></goods-search-modal>
		</uni-drawer>
	</view>
</template>
<script>
	import SearcModal from '@/components/common/search-modal.vue'
	import UniDrawer from '@/third/uni-drawer/uni-drawer.vue'
	import GoodsSearchModal from '@/components/bmhs/vehicle/goods-search-modal.vue'
	export default {
		components: {
			SearcModal,
			UniDrawer,
			GoodsSearchModal
		},
		data() {

			return {
				showSearchVehicleStatus: false,
			}
		},
		methods: {
			confirmDec() {
				uni.showModal({
					title: '提示',
					content: '是否确认申报？',
					success: (res) => {

					}
				})
			},
			closeDrawer() {
				this.$refs.addGoodsModal.close();
			},
			addGoodsModal() {
				this.$refs.addGoodsModal.open();
			},
			showSearchVehile() {
				this.showSearchVehicleStatus = true;
			},
			searchInput(value) {
				//console.log(value)
			},
			search(value) {

			},
			selectVehicleHandler(vehicleNo) {
				console.log(vehicleNo)
				this.showSearchVehicleStatus = false;
			}
		}
	}
</script>

<style lang="scss">
	.vehicle-dec-data-container {
		position: absolute;
		top: 0;
		bottom: 42px;
		padding: 0 $padding-content;
		width: 100%;

		.show-selected-goods {
			margin-top: 10px;
			height: 42px;
			background-color: #F8F8F8;
			border-radius: 50px;
			text-align: center;
			line-height: 42px;
		}
	}

	.vehicle-dec-footer {
		position: fixed;
		bottom: 0;
		display: flex;
		align-items: center;
		justify-content: space-between;
		width: 100%;
		height: 42px;
		background-color: #fff;

		.btn {
			flex: 1;
			display: flex;
			align-items: center;
			justify-content: center;
			height: 100%;
			font-size: 29rpx;
			color: #fff;
		}

		.add-goods-btn {
			background-color: #ff6f04;
		}

		.confirm-dec-btn {
			background-color: #ff3333;
		}
	}

	.search-box {
		height: 100vh;
		background-color: #fff;
	}

	.aca-cell {
		position: relative;
		display: flex;
		justify-content: space-between;
		align-items: center;
		font-size: 30rpx;
		color: rgba(107, 107, 107, 1);
		height: 80rpx;

		&::after {
			content: '';
			position: absolute;
			right: 0;
			bottom: 0;
			left: 0;
			height: 2rpx;
			background: rgba(229, 229, 229, 1);
		}

		.label {
			width: 180rpx;
			text-align: right;
		}

		.content {
			flex: 1;
			display: flex;
			justify-content: flex-end;
			align-items: center;
			text-align: right;

			.input {
				width: 100%;
				text-align: right;
				font-size: 30rpx;
			}

			.arrow-right {
				margin-left: 18rpx;
				color: #aaaaaa;
			}
		}
	}

	.search-vehicle-result {
		padding: 0 $padding-content;

		.item {
			position: relative;
			display: flex;
			align-items: center;
			height: 72rpx;
			border-bottom: 1px solid #ececec;

			.text {
				color: #333;
			}
		}
	}
</style>
