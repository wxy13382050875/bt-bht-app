<template>
	<view class="app-content">
		<nav-bar-back title="编辑资料" popType="0"></nav-bar-back>
		<bht-layout-container bg-color="#fff" :bottom="0">
			<view class="profile-content">
				<view class="aca-cell">
					<view class="label">姓名</view>
					<view class="content"><input type="text" class="input" v-model="formData.realName" placeholder="请输入姓名" /></view>
				</view>
				<view class="aca-cell">
					<view class="label">性别</view>
					<view class="content">
						<radio-group @change="flagRadioChange">
							<label class="radio">
								<radio value="男" :checked="formData.gender === '男'" color="#ff3333" style="transform:scale(0.7)" />
								男
							</label>
							<label class="radio">
								<radio value="女" :checked="formData.gender === '女'" color="#ff3333" style="transform:scale(0.7)" />
								女
							</label>
						</radio-group>
					</view>
				</view>
				<view class="aca-cell">
					<view class="label">国籍</view>
					<picker @change="pickerNationalityChange" :value="nationIndex" :range="nationArr">
						<view class="content" @click="hideKeyBoard">
							<input type="text" class="input" :value="formData.nation" disabled="" display placeholder="请选择国籍" />
							<view class="arrow-right"><view class="iconfont aca-youjiantou"></view></view>
						</view>
					</picker>
				</view>
				<view class="aca-cell">
					<view class="label">证件类型</view>
					<picker @change="pickerIdTypeChange" :value="idTypeIndex" :range="idTypeArr">
						<view class="content" @click="hideKeyBoard">
							<input type="text" class="input" :value="formData.idType" disabled="" display placeholder="请选择证件类型" />
							<view class="arrow-right"><view class="iconfont aca-youjiantou"></view></view>
						</view>
					</picker>
				</view>
				<view class="aca-cell">
					<view class="label">证件号码</view>
					<view class="content"><input type="text" class="input" v-model="formData.idCode" placeholder="请输入证件号码" /></view>
				</view>
				<view class="aca-cell">
					<view class="label">隶属海关</view>
					<view class="content" @click="showRegion">
						<input type="text" class="input" :value="regionText" disabled placeholder="请选择隶属海关" />
						<view class="arrow-right"><view class="iconfont aca-youjiantou"></view></view>
					</view>
				</view>
				<view class="app-btn" @click="handleUpdate">提交</view>
			</view>
		</bht-layout-container>
		<mp-picker
			mode="multiLinkageSelector"
			@onConfirm="regionConfirm"
			:pickerValueDefault="regionDef"
			:pickerValueArray="regionPickerArry"
			:deepLength="2"
			ref="regionPicker"
		></mp-picker>
	</view>
</template>

<script>
import MpPicker from '@/third/MpPicker/mpvuePicker.vue';
import { regionData } from '@/data/region';
import { mapActions, mapGetters } from 'vuex';
import { saveUser } from '@/api/shop.js';
import formValidate from '@/utils/validate';
export default {
	components: {
		MpPicker
	},
	data() {
		return {
			//国籍
			nationArr: ['中国', '越南', '缅甸', '泰国', '老挝'],
			nationIndex: 0,
			//证件类型
			idTypeArr: ['身份证', '边民证', '护照', '港澳通行证'],
			idTypeIndex: 0,
			formData: {},
			//隶属海关
			regionPickerArry: regionData,
			regionDef: [0, 0],
			regionText: ''
		};
	},
	onLoad() {
		//解构赋值
		this.formData = this.userInfo;
		this.init();
		console.log('this.userInfo')
		console.log(this.userInfo)
	},
	computed: {
		...mapGetters({
			userInfo: 'user/userInfo'
		})
	},
	methods: {
		...mapActions({
			setUserInfo: 'user/setUserInfo'
		}),
		handleUpdate() {
			//验证规则
			let rule = [
				{
					name: 'realName',
					checkType: 'notnull',
					errorMsg: '请填写姓名'
				},
				{
					name: 'gender',
					checkType: 'notnull',
					errorMsg: '请选择性别'
				},
				{
					name: 'nation',
					checkType: 'notnull',
					errorMsg: '请选择国籍'
				},
				{
					name: 'idType',
					checkType: 'notnull',
					errorMsg: '请选择证件类型'
				},
				{
					name: 'idCode',
					checkType: 'notnull',
					errorMsg: '请填写证件号码'
				},
				{
					name: 'idCode',
					checkType: 'string',
					checkRule: '18',
					errorMsg: '证件号不合法'
				},
				{
					name: 'customs',
					checkType: 'notnull',
					errorMsg: '请选择隶属海关'
				}
			];
			var valid = formValidate.check({ ...this.formData }, rule);
			if (valid) {
				saveUser(this.formData).then(res => {
					let { code, msg, data } = res;
					if (code === '500') {
						uni.showToast({
							title: msg,
							icon: 'none'
						});
					}
					if (code === '200') {
						uni.showToast({
							title: '更新成功',
							success: () => {
								this.setUserInfo(this.formData)
								this.$Router.back();
							}
						});
					}
				});
			} else {
				uni.showToast({
					title: formValidate.error,
					icon: 'none'
				});
			}
		},
		//性别选择
		flagRadioChange({ detail }) {
			this.formData.gender = detail.value;
		},
		//国籍选择
		pickerNationalityChange(e) {
			this.nationIndex = e.target.value;
			this.formData.nation = this.nationArr[this.nationIndex];
			this.$forceUpdate();
		},
		//证件类型选择
		pickerIdTypeChange(e) {
			this.idTypeIndex = e.target.value;
			this.formData.idType = this.idTypeArr[this.idTypeIndex];
			this.$forceUpdate();
		},
		//关区选择
		regionConfirm(e) {
			this.formData.customs = e.value[0];
			this.formData.region = e.value[1];
			this.regionText = e.label;
		},
		//显示隶属关区 联动列表
		showRegion() {
			this.hideKeyBoard();
			this.$refs.regionPicker.show();
		},
		//隐藏键盘
		hideKeyBoard() {
			uni.hideKeyboard();
		},
		//初始化默认选项值
		init() {
			let { customs, region } = this.userInfo;
			let regionText = '';
			//隶属关区
			if (customs != '' && customs != null) {
				let regionDef = [];
				regionData.forEach((item, index, arr) => {
					if (customs === item.value) {
						regionDef.push(index);
						regionText = item.label;
						item.children.forEach((cItem, cIndex, cArr) => {
							if (cItem.value === region) {
								regionDef.push(cIndex);
								regionText += '-' + cItem.label;
							}
						});
					}
				});
				this.regionText = regionText;
				this.regionDef = regionDef;
			}
		}
	}
};
</script>

<style lang="scss" scoped>
.profile-content {
	padding: 0 $padding-content;
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
		width: 120rpx;
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

.app-btn {
	margin-top: 140rpx;
	text-align: center;
	line-height: 94rpx;
}
</style>
