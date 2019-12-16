<template>
	<view class="aca-popup" v-show="show">
		<popup-nav-bar :level="2" @backEvent="backEvent" title="请输入查询条件"></popup-nav-bar>
		<bht-layout-container bg-color="#fff">
			<view class="form-wrapper">
				<view class="form-item">
					<view class="form-title">车牌号</view>
					<view class="form-input">
						<input type="text" v-model="formData.vehicleNo" class="input" placeholder="请输入车牌号" />
					</view>
				</view>
				<view class="form-item">
					<view class="form-title">日期</view>
					<view class="form-input" @click="showCalendar">
						<input type="text" disabled="" v-model="showDateTxt" class="input" placeholder="请选择日期" />
					</view>
				</view>

				<view class="form-item">
					<view class="form-title">进出口标识</view>
					<view class="form-input">
						<radio-group @change="flagRadioChange">
							<label class="radio">
								<radio value="I" :checked="formData.inOut==='I'" color="#ff3333" style="transform:scale(0.7)" />
								进口
							</label>
							<label class="radio">
								<radio value="E" :checked="formData.inOut==='E'" color="#ff3333" style="transform:scale(0.7)" />
								出口
							</label>
						</radio-group>
					</view>
				</view>
				<view class="form-item">
					<view class="form-title">申报状态</view>
					<view class="form-input">
						<radio-group @change="statusRadioChange">
							<label class="radio">
								<radio value="A" :checked="formData.status==='A'" color="#ff3333" style="transform:scale(0.7)" />
								全部
							</label>
							<label class="radio">
								<radio value="Y" :checked="formData.status==='Y'" color="#ff3333" style="transform:scale(0.7)" />
								已申报
							</label>
							<label class="radio">
								<radio value="N" :checked="formData.status==='N'" color="#ff3333" style="transform:scale(0.7)" />
								未申报
							</label>
						</radio-group>
					</view>
				</view>
				<view class="form-btn">
					<view class="rest-btn" @click="restForm">重置</view>
					<view class="query-btn" @click="queryEvent">查询</view>
				</view>
			</view>
			<uni-calendar :range="true" :date="formData.endDate" ref="calendar" :insert="false" @confirm="confirm" :startDate="rangeDate.start"
			 :endDate="rangeDate.end" />
		</bht-layout-container>
	</view>
</template>

<script>
	import {
		mapGetters
	} from 'vuex';
	import PopupNavBar from '@/third/acaui/nav/popup-nav-bar.vue'
	import {
		minusDate,
		formatterDate
	} from '@/utils/date'

	export default {
		components: {
			PopupNavBar
		},
		props: {
			value: {
				type: Boolean,
				default: false
			}
		},
		data() {
			return {
				show: this.value,
				formData: {
					vehicleNo: '',
					startDate: formatterDate(new Date(), 'YY-MM-DD'),
					endDate: formatterDate(new Date(), 'YY-MM-DD'),
					status: 'A',
					inOut: 'I'
				},
				rangeDate: {
					start: minusDate(-4),
					end: formatterDate(new Date(), 'YY-MM-DD')
				},
				showDateTxt: formatterDate(new Date(), 'YY-MM-DD') + '/' + formatterDate(new Date(), 'YY-MM-DD')
			}
		},
		computed: {
			...mapGetters('user', ['userInfo'])
		},
		watch: {
			value(n, o) {
				this.show = n
			},
			formData: {
				handler(n, o) {
					this.showDateTxt = n.startDate + '/' + n.endDate
				},
				deep: true
			}
		},
		created() {
			this.formData.organization = this.userInfo.region;
			this.formData.customesCode = this.userInfo.customs;
			this.formData.paperType = this.userInfo.type;
			//发送初始化数据到父组件
			this.$emit("initModalData", this.formData)
		},
		methods: {
			backEvent() {
				this.show = false
				this.$emit('input', this.show)
			},
			flagRadioChange(e) {
				// //进出口标识
				this.formData.inOut = e.target.value;
			},
			statusRadioChange(e) {
				this.formData.status = e.target.value;
			},
			//处理查询事件
			queryEvent(e) {
				this.backEvent();
				this.$emit('queryEvent', this.formData)
			},
			//表单数据重置
			restForm() {
				this.formData.vehicleNo = ''
				this.formData.startDate = formatterDate(new Date(), 'YY-MM-DD')
				this.formData.endDate = formatterDate(new Date(), 'YY-MM-DD')
				this.formData.inOut = 'I'
				this.formData.status = 'A'
			},
			//显示日期选择
			showCalendar() {
				uni.hideKeyboard();
				this.$refs.calendar.open();
			},
			//日期选择确认
			confirm(e) {
				let {
					range,
					fulldate
				} = e
				if (range.begin != '' && range.end != '') {
					this.formData.startDate = range.begin
					this.formData.endDate = range.end
					return
				} else {
					this.formData.startDate = fulldate
					this.formData.endDate = fulldate
					return
				}

				if (range.begin != '') {
					this.formData.startDate = range.begin
					this.formData.endDate = range.begin
					return
				}

				if (range.end != '') {
					this.formData.startDate = range.end
					this.formData.endDate = range.end
					return
				}

			}
		}

	}
</script>

<style scoped lang="scss">
	.aca-popup {
		position: fixed;
		top: 0;
		right: 0;
		left: 0;
		bottom: 0;
		background: #fff;
		z-index: 19931120;
	}

	.form-wrapper {
		padding: 0 $padding-content;

		.form-item {
			margin-top: 20rpx;

			.form-title {
				margin-bottom: 10rpx;
				font-size: 30rpx;
				color: rgba(56, 56, 56, 1);
			}

			.form-input {
				display: flex;
				align-items: center;
				height: 80rpx;
				background: rgba(242, 242, 242, 1);
				border-radius: 8px;

				.input {
					flex: 1;
					padding-left: 20rpx;
					font-size: 28rpx;
				}
			}
		}

		.form-btn {
			margin-top: 30rpx;
			display: flex;

			.rest-btn,
			.query-btn {
				flex: 1;
				display: flex;
				align-items: center;
				justify-content: center;
				height: 94rpx;
				font-size: 34rpx;

			}

			.rest-btn {
				background: rgba(242, 242, 242, 1);
				color: rgba(56, 56, 56, 1);
			}

			.query-btn {
				background: rgba(255, 51, 51, 1);
				color: rgba(255, 255, 255, 1);
			}
		}
	}


	.radio {
		margin-right: 18rpx;
		font-size: 28rpx;
	}
</style>
