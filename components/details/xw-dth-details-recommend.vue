<template>
	<view class="goods-recommend">
		<view class="item">
			<label class="gray_line"></label>
			<label class="title">看了又看</label>
			<label class="gray_line"></label>
		</view>
	
		<goodsItems :dataSource = "dataSource.list" :count= "2"></goodsItems>
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
		
		
		
	}
</script>

<style lang="scss">
	.goods-recommend{
		padding: 0 $padding-content;
		.item{
			display: flex;
			justify-content: center;
			align-items: center;
			height: 80rpx;
			width: 100%;
			background: #F2F2F2;
			line-height: 80rpx;;
			.title{
				
				height: 100%;
				font-size: 30rpx;
				color: #999999;
			}
			.gray_line {
			  background: #e5e5e5;
			  width: 80px;
			  height: 2px;
			  float: left;
			  margin: 10px 5px;
			}
		}
	}
</style>
