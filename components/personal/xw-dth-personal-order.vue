<template>
	<view class="personal-tool">
		<view class="bht-goods-content">
			<view class="goods-title">
				<label class="title">{{dataSource.title}}</label>
				<router-link class="more" to="{name: 'goods-list'}">{{dataSource.moretitle}}></router-link>
			</view>
			<grid :dataSource ="dataSource.list"></grid>

			
		</view>
	</view>
</template>

<script>
	import grid from '@/components/details/xw-dth-grid.vue'
	export default{
		props:{
			dataSource:{
				type:Object,
				default () {
					return {}
				}
			},
			count:0
		},
		components:{
			grid
		},
		data() {
			return {
				height:0,
				
			}
		},
		created() {
			var sysinfo = uni.getSystemInfoSync(),
			windowWidth = sysinfo.windowWidth;
			//减去底部导航高度
			this.height = (windowWidth - (this.count + 1)* 5)/this.count;
			
		}
		
		
	}
</script>
<style lang="scss" scoped>
.personal-tool {
	padding: 0 $padding-content;
	.bht-goods-content {
		background-color: #fff;
		box-shadow: 0px 0px 10px 0px rgba(134, 134, 134, 0.2);
		border-radius: 8px;
		margin-top: 20rpx;
		.goods-title {
			display: flex;
			align-items: center;
			justify-content: space-between;
			height: 76rpx;
			line-height: 76rpx;
			border-bottom: 1rpx solid #A7A7A7;
			
			label {
				margin-left: 22rpx;
				position: relative;
				height: 100%;
				padding-left: 10rpx;
				font-size: 28rpx;
				color: #868686;
				font-family:Microsoft YaHei;
				font-weight:bold;
				
			}

			.more {
				margin-right: 22rpx;
				font-size: 24rpx;
				color: #9A9A9A;
			}
		}
		.bht-fun-wrapper{
			border-radius: 0 0 8px 8px;
		}
		
	}
}
</style>
