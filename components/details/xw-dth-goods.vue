<template>
	<view class="bht-goods-w">
		<view class="bht-goods-content">
			<view class="goods-title">
				<label class="title">{{dataSource.title}}</label>
				<router-link class="more" to="{name: 'goods-list'}">更多>>></router-link>
			</view>
			<goodsItems :dataSource = "dataSource.list" :count= "count"></goodsItems>
			<!-- <view class="goods-list" >
				<navigator :url="item.page" :class="{'item-three':count == 3,'item-two':count == 2}" v-for="(item,index) in dataSource.list" :key="index">
					<view :style="{height: height +'px'}"><image :src="item.url"></image></view>
					<view class="title" v-if="count == 2">
						{{item.title}}
					</view>
					<view class="good-info">
						<view>
							<label class="goods-nprice">¥{{item.newPrice}}</label>
							<label class="goods-oprice" v-if="count == 2">¥{{item.oldPrice}}</label>
						</view>
						<view>
							<label class="goods-oprice" v-if="count == 3">¥{{item.oldPrice}}</label>
							<label class="goods-number" v-if="count == 2">¥{{item.number}}</label>
						</view>
					</view>
				</navigator>	
			</view> -->
			
		</view>
	</view>
</template>

<script>
	import goodsItems from '@/components/details/xw-dth-goods-item.vue'
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
