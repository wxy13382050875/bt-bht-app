<template>
	<view class="sem-goods-footer">
		<nz-checkbox :circle="true" v-model="goodsData.checkStatus" @select="chooseAll()" label="全选"></nz-checkbox>
		<view class="total">
			<label>合计：</label>
			<text class="price">¥{{ goodsData.totalAmount }}</text>
		</view>
		<view class="sub-btn" @click="submitOrderEventHandler">提交订单({{ goodsData.checkTotalCount }})</view>
	</view>
</template>

<script>
/**
 * 收购商品底部组件
 */
import NzCheckbox from '@/third/acaui/nz-checkbox/nz-checkbox.vue';
import { submitOrder } from '@/api/sem.js';
import { mapGetters } from 'vuex';
export default {
	components: {
		NzCheckbox
	},
	computed: {
		...mapGetters({
			goodsData: 'sem/goodsData'
		})
	},
	watch: {
		goodsData: {
			deep: true,
			handler(val, oldVal) {
				let totalPrice = 0;
				val.list.forEach((item, index) => {
					if (item.checked) {
						totalPrice += parseFloat(item.amount);
					}
				});
				val.totalAmount = totalPrice.toFixed(2);
			}
		}
	},
	methods: {
		/**
		 * 提交订单处理
		 */
		submitOrderEventHandler() {
			if (this.goodsData.list.length <= 0) {
				return;
			}
			if (this.goodsData.checkTotalCount === 0) {
				uni.showToast({
					icon: 'none',
					title: '请选择商品下单'
				});
				return;
			}
			var params = [];
			this.goodsData.list.forEach((item, index) => {
				if (item.checked) {
					params.push(item.id);
				}
			});
			submitOrder(params)
				.then(res => {
					uni.showToast({
						icon: 'success',
						title: '下单成功'
					});
					//清空被下单的商品
					this.goodsData.list = this.goodsData.list.filter(function(item) {
						return params.indexOf(item.id) == -1;
					});
					//通知父组件 下单成功
					this.$emit('submitOrderSuccess', true);
				})
				.catch(error => {
					uni.showToast({
						icon: 'none',
						title: '下单失败'
					});
					//通知父组件 下单失败
					this.$emit('submitOrderSuccess', false);
				});
		},
		chooseAll() {
			if (this.goodsData.checkStatus) {
				this.goodsData.list.forEach((item, index) => {
					item.checked = true;
				});
				this.goodsData.checkTotalCount = this.goodsData.list.length;
			} else {
				this.goodsData.list.forEach((item, index) => {
					item.checked = false;
				});
				this.goodsData.checkTotalCount = 0;
			}
		}
	}
};
</script>

<style lang="scss" scoped>
.sem-goods-footer {
	position: absolute;
	bottom: 0;
	padding: 0 $padding-content;
	display: flex;
	align-items: center;
	justify-content: space-between;
	width: 100%;
	height: 114rpx;
	font-size: 30rpx;
	background-color: #fff;
	.total {
		color: #333333;
		.price {
			color: #ff3333;
		}
	}
	.sub-btn {
		width: 238rpx;
		height: 82rpx;
		line-height: 82rpx;
		text-align: center;
		background-color: #ff6f04;
		border-radius: 41px;
		color: #ffffff;
	}
}
</style>
