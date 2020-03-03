<template>
	<view>
		<bht-layout-container :bottom="0" bgColor="#fff">
			<view class="vehicle-dec-data-container">
				<view class="aca-cell">
					<view class="label">承运人</view>
					<view class="content"><input type="text" v-model="decData.tranMan" class="input" placeholder="请输入承运人" /></view>
				</view>
				<view class="aca-cell">
					<view class="label">车牌号</view>
					<view class="content" @click="showSearchVehile"><input type="text" v-model="decData.vehicleId" class="input"
						 placeholder="请输入车牌号" disabled="disabled" /></view>
				</view>
				<view class="aca-cell">
					<view class="label">证件类型</view>

					<view class="content">
						<picker @change="bindPickerChange" :value="credTypeIndex" :range="credTypeArr">
							<input type="text" v-model="credTypeText" disabled="disabled" class="input" placeholder="请选择证件类型" />
						</picker>
					</view>
				</view>
				<view class="aca-cell">
					<view class="label">证件号码</view>
					<view class="content"><input type="text" v-model="decData.credNum" class="input" placeholder="请输入证件号码" /></view>
				</view>

				<view class="show-selected-goods" @click="showSelectGoods">查看已添加的商品</view>
			</view>
			<view class="vehicle-dec-footer">
				<view class="btn add-goods-btn" @click="addGoodsModal">添加商品</view>
				<view class="btn confirm-dec-btn" @click="confirmDec">确认申报</view>
			</view>
		</bht-layout-container>
		<search-modal @searchInput="searchInput" v-model="showSearchVehicleStatus">
			<view class="search-vehicle-result">
				<view class="item" v-for="item in vehicleList" @click="selectVehicleHandler(item)" :key="item">
					<label class="text">{{item}}</label>
				</view>
			</view>
		</search-modal>
		<uni-drawer ref="addGoodsModal" :zIndex="2000" width="100%">
			<goods-search-modal @close="closeDrawer"></goods-search-modal>
		</uni-drawer>
		<uni-drawer ref="showSelectGoods" :zIndex="2000" width="100%">
			<selected-show-goods @close="closeShowGoods"></selected-show-goods>
		</uni-drawer>
	</view>
</template>
<script>
	import SearchModal from '@/components/common/search-modal.vue'
	import UniDrawer from '@/third/uni-drawer/uni-drawer.vue'
	import GoodsSearchModal from '@/components/bmhs/vehicle/goods-search-modal.vue'
	import SelectedShowGoods from '@/components/bmhs/vehicle/selected-show-goods.vue'
	import formValidate from '@/utils/validate';
	import {
		mapGetters,
		mapActions
	} from 'vuex'
	import {
		getRecordVehicleList,
		declareTransport
	} from '@/api/bmhs.js'
	export default {
		name: 'vehicle-dec-com',
		components: {
			SearchModal,
			UniDrawer,
			GoodsSearchModal,
			SelectedShowGoods
		},
		data() {
			return {
				showSearchVehicleStatus: false,
				vehicleList: [],
				credTypeIndex: 0,
				credTypeArr: [
					'身份证',
					'护照',
					'军官证',
					'港澳通行证',
					'马邦丁',
				],
				credTypeData: [
					'0001',
					'0002',
					'0003',
					'0004',
					'0005'
				],
				credTypeText: '身份证',
				decData: {
					vehicleId: '',
					credType: '0001',
					credNum: '',
					tranMan: '',
					goodsList: []
				},
				rule: [{
						name: 'vehicleId',
						checkType: 'tranMan',
						errorMsg: '请填写承运人'
					}, {
						name: 'vehicleId',
						checkType: 'notnull',
						errorMsg: '请选择车牌号'
					},
					{
						name: 'credNum',
						checkType: 'string',
						checkRule: '18',
						errorMsg: '请正确填写证件号'
					}
				]
			}
		},
		created() {
			//清空保存的数据
			this.$store.state.bmhs.goodsList = [];
		},
		computed: {
			...mapGetters({
				goodsList: 'bmhs/getGoodsList'
			})
		},
		methods: {
			confirmDec() {
				let valid = formValidate.check({ ...this.decData
				}, this.rule);
				if (valid) {
					uni.showModal({
						title: '提示',
						content: '是否确认申报？',
						success: (res) => {
							if (res.confirm) {
								let seqNoArr = [];
								this.goodsList.forEach((item, index) => {
									let seqObj = {
										seqno: item.seqNo
									}
									seqNoArr.push(seqObj);
								})
								this.decData.goodsList = seqNoArr;
								declareTransport(this.decData).then(res => {
									if (res.code == '200') {
										uni.showToast({
											title: '运输工具申报成功',
											icon: 'success',
											duration: 3000,

										})
										setTimeout(() => {
											uni.redirectTo({
												url: '/pages/main'
											})
										}, 2000)
									}
								}).catch(error => {
									uni.showToast({
										title: error.msg,
										icon: 'none',
										duration: 3000
									})
								})
							}
						}
					})
				} else {
					uni.showToast({
						title: formValidate.error,
						icon: 'none'
					});
				}
			},
			/**
			 * 关闭添加商品modal
			 */
			closeDrawer() {
				this.$refs.addGoodsModal.close();
			},
			/**
			 * 显示添加商品
			 */
			addGoodsModal() {
				this.$refs.addGoodsModal.open();
			},
			/**
			 * 显示车辆搜索
			 */
			showSearchVehile() {
				this.vehicleList = [];
				this.showSearchVehicleStatus = true;
			},
			/**
			 * 选择证件类型
			 */
			bindPickerChange(e) {
				this.credTypeIndex = e.target.value;
				this.credTypeText = this.credTypeArr[this.credTypeIndex];
				this.decData.credType = this.credTypeData[this.credTypeIndex];
			},
			/**
			 * 搜索车牌号
			 * @param {Object} value
			 */
			searchInput(value) {
				if (value.length < 3) {
					return;
				}
				getRecordVehicleList({
					vehicleId: value
				}).then(res => {
					let {
						data
					} = res;
					this.vehicleList = data;
				}).catch(error => {
					uni.showToast({
						title: '没有查询到车牌号',
						icon: 'none'
					})
					this.vehicleList = []
				})
			},
			showSelectGoods() {
				this.$refs.showSelectGoods.open();
			},
			closeShowGoods() {
				this.$refs.showSelectGoods.close();
			},
			search(value) {

			},
			selectVehicleHandler(vehicleNo) {
				this.decData.vehicleId = vehicleNo;
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
