<template>
	<view class="goods-info">
		<banner :dataSource="dataSource" :height="height"></banner>
		<view class="item">
			<view >
				<label class="goods-nprice">¥369.9</label>
				<label >¥48.9</label>
				<label style="margin-left: 80rpx;">101人付款</label>
			</view>
			<view >
				<label class="goods-title">泰国正品白兰氏即食燕窝美容养颜滋补42ml*6瓶</label>
			</view>
			<view >
				<label >全国包邮（新疆、西藏、青海、内蒙古除外）</label>
			</view>
			<view  style="height: 40px; align-items: center; display: flex; justify-content: space-between;"> 
				<label >快递：0.0</label>
				<label >销量：2588</label>
				<label >发货地：云南河口县</label>
			</view>
		</view>
		
	</view>
</template>

<script>
	import banner from '@/components/details/xw-dth-banner.vue';
	export default {
		props:{
			dataSource:{
				type:Array,
				default () {
					return []
				}
			},
			count:0
		},
		components:{
			banner
		},
		data() {
			return {
				height:0
			}
			
		},
		methods: {
			
		},
		created() {
			var sysinfo = uni.getSystemInfoSync();
			this.height = sysinfo.windowWidth;
			console.log(this.height);
		}
	}
</script>

<style lang="scss">
	.goods-info{
		background: #FFFFFF;
		.item {
			
			margin: 20rpx;
			.goods-nprice {
				font-size: 32rpx;
				color: #ff3333;
			}
			
			.goods-title {
				font-size: 30rpx;
				color: #333333;
			}
			label {
				font-size: 22rpx;
				color: #999999;
			}
			
		}
		
		
	}
</style>
