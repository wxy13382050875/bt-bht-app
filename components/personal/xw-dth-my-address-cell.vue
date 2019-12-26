<template>
	<view class="address-list">
		<view class="a-info" v-for="(item,index) in dataSource" :key=index>
			<view class="a-img">
				<image src="../../static/icon/icon-locate-other.png" mode="" v-if="item.defaultFlag!==1"></image>
				<image src="../../static/icon/icon-locate-def.png" mode="" v-if="item.defaultFlag===1"></image>
				<view class="a-surname" v-if="item.defaultFlag!==1">{{item.name.slice(0,1)}}</view>
			</view>
			<view class="a-address-info">
				<view class="a-oneline">
					<view class="a-name">{{item.name}}</view>
					<view class="a-phone">{{item.phone}}</view>
				</view>
				<view class="a-twoline">
					<view class="a-address"><label class="a-default" v-if="item.defaultFlag===1">默认</label>{{item.address}}{{item.detail}}</view>
					<navigator :url="'/pages/user/my-address-create?item=' + encodeURIComponent(JSON.stringify(item))" class="a-edit">
						<view class="">编辑</view>
					</navigator>
				</view>
			</view>
			
			
		</view>
	</view>
</template>

<script>
	export default {
		props:{
			dataSource:{
				type:Array,
				default () {
					return {}
				}
			}
		},
		methods: {
			
		}
	}
</script>

<style lang="scss">
	.address-list{
		
		.a-info{
			margin-top: 10rpx;
			background: #FFFFFF;
			height: 193rpx;
			display: flex;
			justify-content: space-between;
			align-items: center;
			.a-img{
				width: 79rpx;
				height: 90rpx;
				margin-left: 30rpx;
				margin-right: 20rpx;
				image{
					width: 79rpx;
					height: 90rpx;
					position: absolute;
					z-index: 80;
				}
				.a-surname{
					width: 79rpx;
					height: 90rpx;
					line-height: 90rpx;
					position: absolute;
					z-index: 100;
					color: #FFFFFF;
					font-family:Microsoft YaHei;
					font-size:32rpx;
					text-align: center;
				}
			}
			.a-address-info{
				margin-left: 22rpx;
				margin-right: 20rpx;
				width: 100%;
				.a-oneline{
					display: flex;
					height: 80rpx;
					line-height: 80rpx;
					.a-name{
						color: #333333;
						font-size: 32rpx;
					}
					.a-phone{
						color:#999999;
						font-size: 26rpx;
						margin-left: 13rpx;
					}
				}
				.a-twoline{
					
					display: flex;
					justify-content: space-between;
					.a-default{
						width: 60rpx;
						color:#FF3333;
						font-size: 26rpx;
						margin-right: 20rpx;
					}
					.a-address{
						
						color:#333333;
						font-size: 26rpx;
					}
					.a-edit{
						width: 127rpx;
						text-align: center;
						border-left: 1rpx solid #B2B4B3;
						margin-bottom: 10rpx;
					}
				}
			}
			
			
		}
	}
</style>
