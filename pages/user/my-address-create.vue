<template>
	<view class="my-address-create-container">
		<navbar-back-address-edit title="编辑收货地址"></navbar-back-address-edit>
		<bht-layout-container :bottom="0">
			<view class="bht-layout-content">
				<view class="address-info">
					<view class="cell">
						<input type="text" class="input" placeholder="收货人" placeholder-class="place-style"/>
					</view>
					<view class="cell">
						<input type="number" class="input" placeholder="手机号码" placeholder-class="place-style"/>
						<view class="right">
							<label>+86</label>
							<label class="iconfont aca-youjiantou"></label>
						</view>
					</view>
					<view class="cell">
						<input type="text" class="input" placeholder="所在地区" placeholder-class="place-style"/>
						<view class="right"><label class="iconfont aca-youjiantou"></label></view>
					</view>
					<view class="cell">
						<input type="text" class="input" placeholder="详细地址：如道路、门牌号、小区、楼栋号、单元室等" placeholder-class="place-style"/>
					</view>
				</view>
				<view class="setting-default">
					<view class="title">设置为默认地址</view>
					<view>
						 <switch checked  />
					</view>
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
export default {
	components: {
		NavbarBackAddressEdit
	}
};
</script>

<style lang="scss" scoped>
	.my-address-create-container{
		.address-info{
			background-color: #fff;
			.cell{
				position: relative;
				display: flex;
				align-items: center;
				height: 71rpx;
				padding: 0 $padding-content;
				.place-style{
					font-size: 26rpx;
					color: #999999;
				}
				.input{
					flex: 1;
					margin-left: 5px;
				}
				.right{
					color: #999999;
				}
				
				&::after{
					content:  '';
					position: absolute;
					bottom: 0;
					height: 1px;
					width: 100%;
					background-color: #F2F2F2;
				}
			}
		}
		.setting-default{
			margin-top: $padding-content;
			padding: 0 $padding-content;
			display: flex;
			align-items: center;
			justify-content: space-between;
			height: 71rpx;
			background-color: #fff;
			.title{
				font-size: 26rpx;
				color: #333333;
			}
		}
	}
</style>
