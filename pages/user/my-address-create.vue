<template>
	<view class="my-address-create-container">
		<navbar-back-address-edit title="编辑收货地址" @saveEvent="saveEvent"></navbar-back-address-edit>
		<bht-layout-container :bottom="0">
			<view class="bht-layout-content">
				<view class="address-info">
					<view class="cell"><input type="text" class="input" placeholder="收货人" placeholder-class="place-style" v-model="dataSource.name" /></view>
					<view class="cell">
						<input type="number" class="input" placeholder="手机号码" placeholder-class="place-style" v-model="dataSource.phone" />
						<view class="right">
							<label>+86</label>
							<label class="iconfont aca-youjiantou"></label>
						</view>
					</view>
					<view class="cell" @tap="handleTap('picker3')">
						<!-- <button style="background: #FFFFFF; font-size: 26rpx;text-align: left;" @tap="handleTap('picker3')">选择省市区</button> -->
						<input
							type="button"
							disabled="input"
							class="input"
							placeholder="所在地区"
							placeholder-class="place-style"
							v-model="dataSource.location"
							@tap="handleTap('picker3')"
						/>

						<view class="right"><label class="iconfont aca-youjiantou"></label></view>
					</view>

					<view class="cell">
						<input
							type="text"
							class="input"
							placeholder="详细地址：如道路、门牌号、小区、楼栋号、单元室等"
							placeholder-class="place-style"
							v-model="dataSource.detail"
						/>
					</view>
					<lb-picker
						ref="picker3"
						v-model="value"
						mode="multiSelector"
						:list="list"
						:level="3"
						@change="handleChange"
						@confirm="handleConfirm"
						@cancle="handleCancle"
					></lb-picker>
				</view>
				<view class="setting-default">
					<view class="title">设置为默认地址</view>
					<view><switch checked @change="switchChange" /></view>
				</view>
			</view>
		</bht-layout-container>
	</view>
</template>

<script>
/**
 * 地址新增/更新
 */
import NavbarBackAddressEdit from '@/components/navbar/navbar-back-address-edit.vue';
import areaData from '@/third/lb-picker/area-data-min.js';
import { saveUserAddress } from '@/api/shop.js';
import formValidate from '@/utils/validate';
export default {
	data() {
		return {
			dataSource: {},
			isDefault: false,
			value: [],
			list: areaData
		};
	},
	components: {
		NavbarBackAddressEdit
	},
	onLoad: function(option) {
		if (JSON.stringify(option) == '{}') {
			console.log('新增收货地址');
		} else {
			console.log('修改收货地址');
			this.dataSource = JSON.parse(decodeURIComponent(option.item));
			if (this.dataSource.type == 'default') {
				this.isDefault = true;
			} else {
				this.isDefault = false;
			}
		}
	},
	methods: {
		/**
		 * 显示商品参数
		 */
		switchChange: function(e) {
			console.log('switch1 发生 change 事件，携带值为', e.target.value);
			this.isDefault = e.target.value;
		},
		saveEvent(e) {
			
			//验证规则
			let rule = [
				{
					name: 'name',
					checkType: 'notnull',
					errorMsg: '请填写收货人姓名'
				},
				{
					name: 'phone',
					checkType: 'phoneno',
					errorMsg: '请填写正确的手机号'
				},
				{
					name: 'location',
					checkType: 'notnull',
					errorMsg: '选择省市区'
				},
				{
					name: 'detail',
					checkType: 'notnull',
					errorMsg: '请填写详细地址'
				}
			];
			var valid = formValidate.check({ ...this.dataSource }, rule);

			if (valid) {
				this.dataSource.defaultFlag = this.isDefault ? 0 : 1;
				this.dataSource.userId = 2;
				uni.showLoading({
					title: '提交...',
					mask: true
				});
				saveUserAddress(this.dataSource).then(res => {
					uni.hideLoading();
					let { data, msg, code } = res;
					uni.showToast({
						title: msg,
						icon: 'none'
					});
					if (code === '200') {
						this.$Router.back();
					}
				});
			} else {
				uni.showToast({
					title: formValidate.error,
					icon: 'none'
				});
			}
		},
		handleTap(picker) {
			this.$refs[picker].show();
			
		},
		handleChange(item) {
			console.log('change::', item);
		},
		handleConfirm(item) {
			console.log('confirm::', item);
			this.dataSource.location = '';

			item.item.forEach((tmItem, index) => {
				
				this.dataSource.location += tmItem.label;
			});
			this.$forceUpdate();
		},
		handleCancle(item) {
			console.log('cancle::', item);
		}
	}
};
</script>

<style lang="scss" scoped>
.my-address-create-container {
	.address-info {
		background-color: #fff;
		.cell {
			height: 80rpx;
			line-height: 80rpx;
			position: relative;
			display: flex;
			align-items: center;
			padding: 0 $padding-content;
			.place-style {
				font-size: 26rpx;
				color: #999999;
			}
			.input {
				flex: 1;
				margin-left: 5px;
			}
			.right {
				color: #999999;
			}

			&::after {
				content: '';
				position: absolute;
				bottom: 0;
				height: 1px;
				width: 100%;
				background-color: #f2f2f2;
			}
		}
	}
	.setting-default {
		margin-top: $padding-content;
		padding: 0 $padding-content;
		display: flex;
		align-items: center;
		justify-content: space-between;
		height: 71rpx;
		background-color: #fff;
		.title {
			font-size: 26rpx;
			color: #333333;
		}
	}
}
</style>
