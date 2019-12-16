<template>
	<view class="app-content">
		<aca-nav-bar :level="2" title="个人信息"></aca-nav-bar>
		<bht-layout-container bg-color="#fff">
			<view class="profile-content">
				<view class="aca-cell">
					<view class="label">手机号</view>
					<view class="content">
						<text>{{formData.mobile}}</text>
					</view>
				</view>
				<view class="aca-cell">
					<view class="label">用户类型</view>
					<view class="content">
						<text>{{typeText}}</text>
					</view>
				</view>
				<view class="aca-cell">
					<view class="label">姓名</view>
					<view class="content">
						<text>{{formData.name}}</text>
					</view>
				</view>
				<view class="aca-cell">
					<view class="label">性别</view>
					<view class="content">
						<text>{{formData.sex}}</text>
					</view>
				</view>
				<view class="aca-cell">
					<view class="label">国籍</view>
					<view class="content">
						<text>{{formData.nationality}}</text>
					</view>
				</view>
				<view class="aca-cell">
					<view class="label">证件类型</view>
					<view class="content">
						<text>{{formData.idType}}</text>
					</view>
				</view>
				<view class="aca-cell">
					<view class="label">证件号码</view>
					<view class="content">
						<text>{{formData.idCode}}</text>
					</view>
				</view>
				<view class="aca-cell">
					<view class="label">隶属海关</view>
					<view class="content">
						<text>{{regionText}}</text>
					</view>
				</view>
			</view>
		</bht-layout-container>
	</view>
</template>

<script>
	import {
		regionData
	} from '@/data/region';
	import {
		mapActions,
		mapGetters
	} from 'vuex'

	export default {
		data() {
			return {
				regionText: '',
				typeText: ''
			}
		},
		computed: {
			...mapGetters({
				userInfo: 'user/userInfo',
				roleData: 'utp/roleData'
			})
		},
		created() {
			this.formData = this.userInfo;
			this.init();
		},
		methods: {
			//初始化默认选项值
			init() {
				let {
					customs,
					region,
					type
				} = this.userInfo;
				let regionText = ''
				//隶属关区
				if (customs != '' && customs != undefined) {
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
				if (type !== undefined) {
					let rs = this.roleData.filter((cur, index, arr) => {
						return cur.code === type
					})
					
					this.typeText = rs[0].value

				}
			}
		}
	}
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
				text-align: right;
				font-size: 30rpx;
			}

			.arrow-right {
				margin-left: 18rpx;
				color: #AAAAAA;
			}
		}

	}

	.app-btn {
		margin-top: 140rpx;
		text-align: center;
		line-height: 94rpx;
	}
</style>
