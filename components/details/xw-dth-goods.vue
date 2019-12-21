<template>
	<view class="bht-goods-w">
		<view class="bht-goods-content">
			<view class="goods-title">
				<label class="title">{{title}}</label>
				<router-link class="more" to="{name: 'goodslist'}">更多>>></router-link>
			</view>
			<goodsItems :dataSource = "dataSource" :count= "count"></goodsItems>

			
		</view>
	</view>
</template>

<script>
	import goodsItems from '@/components/details/xw-dth-goods-item.vue'
	export default{
		props:{
			title:"",
			dataSource:{
				type:Array,
				default () {
					return []
				}
			},
			count:0
		},
		components:{
			goodsItems
		},
		data() {
			return {
				height:0
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
<style lang="scss">
.bht-goods-w {
	padding: 0 $padding-content;
	margin-top: 10rpx;
	.bht-goods-content {
		padding: 21rpx 21rpx;
		background-color: #fff;
		box-shadow: 0px 0px 10px 0px rgba(134, 134, 134, 0.2);
		border-radius: 8px;

		.goods-title {
			display: flex;
			align-items: center;
			justify-content: space-between;

			label {
				position: relative;
				height: 34rpx;
				padding-left: 10rpx;
				font-size: 34rpx;
				color: rgba(254, 89, 6, 1);

				&::before {
					content: ' ';
					position: absolute;
					left: 0;
					bottom: -3px;
					width: 4rpx;
					height: 34rpx;
					background-color: rgba(254, 89, 6, 1);
				}
			}

			.more {
				font-size: 24rpx;
				color: rgba(99, 99, 99, 1);
			}
		}
		
	}
}
</style>
