<template>
	<view class="goods-params">
		
		<view class="params-item" @click="showParamDialog">
			<view class="leftlabel">商品参数</view>
			<view class="rightlabel">
				<view>查看</view>
				<image src="../../static/icon/icon_right_arrow.png" ></image>
			</view>
		</view>

		
		<!-- <view class="params-item" @click="showSpecifiDialog">
			<view class="leftlabel">选择规格</view>
			<view class="rightlabel">
				<view >选择颜色、尺码</view>
				<image src="../../static/icon/icon_right_arrow.png" ></image>
			</view>
		</view> -->
	</view>
</template>

<script>
	export default {
		props:{
			
		},
		components:{
		
		},
		data() {
			return {
				height:0
			}
			
		},
		methods: {
			showParamDialog(){
				this.$emit('showParamDialog', true)
			},
			showSpecifiDialog(){
				this.$emit('showSpecifiDialog', true)
			}
			
		},
		created() {

		}
	}
</script>

<style lang="scss">
.goods-params{
	
			background: #FFFFFF;
			.params-item{
				display: flex; 
				margin-left: 20rpx;
				margin-right: 20rpx;
				justify-content: space-between;
				border-bottom: 1rpx solid #e5e5e5;
				align-items: center;
				height: 40px;
				.leftlabel{
					font-size: 30rpx;
					color: #333333;
				}
				.rightlabel{
					display: flex; 
					align-items: center;
					font-size: 26rpx;
					color: #999999;
					height: 100%;
				}
				image{
					width:12rpx ; 
					height: 25rpx;
					vertical-align: middle;
					margin-left: 20rpx;
				}
			}
			
		}	
		
</style>
