<template>
	<view v-show="pageFlag === tabBarFlag" v-cloak>
		<navbar-shopping-cart></navbar-shopping-cart>
		<bht-layout-container bgColor="#F2F2F2">
			<view class="shopping-cart-bg"></view>
			<view class="shopping-cart-container" :style="{ transform: translateY }" @click="handlerClickCon">
				<scroll-view :scroll-y="scrollY" style="height: 100%;">
					<view class="scroll-content">
						<uni-swipe-action v-if="pageFlag === tabBarFlag">
							<view class="cart-list" v-for="(item, index) in fetchData.list">
								<view class="cart-shop">
									<nz-checkbox :circle="true" v-model="item.check" @select="shopchoose(item)"></nz-checkbox>
									<view class="shop-info">
										<view class="iconfont aca-shop"></view>
										<view class="shop-name">{{ item.shop_name }}</view>
										<view class="iconfont aca-youjiantou"></view>
									</view>
								</view>
								<uni-swipe-action-item
									v-for="(pro, gIndex) in item.products"
									:key="pro.pro_id"
									:options="pro.options"
									@click="swipeActionClick"
									@change="swipeActionChange"
								>
									<view class="cart-item">
										<nz-checkbox :circle="true" v-model="pro.checked" @select="choose(item, pro)"></nz-checkbox>
										<view class="goods-image"><image src="/static/small/1.jpg"></image></view>
										<view class="goods-info">
											<view class="goods-name">{{ pro.text }}</view>
											<view class="goods-des">全国包邮（新疆、西藏、青海、内蒙古除外）</view>
											<view class="goods-opt">
												<view class="price">
													<label class="symboy">¥</label>
													<label class="value">{{ pro.price }}</label>
												</view>
												<view class="number">
													<uni-number-box
														:min="1"
														:max="pro.sum"
														:value="pro.num"
														:index="gIndex"
														v-model="pro.num"
														:data-index="gIndex"
													></uni-number-box>
												</view>
											</view>
										</view>
									</view>
								</uni-swipe-action-item>
							</view>
						</uni-swipe-action>
					</view>
				</scroll-view>
			</view>
			<view class="shopping-cart-bill">
				<view class="opt">
					<nz-checkbox :circle="true" v-model="fetchData.status" @select="cartchoose" label="全选"></nz-checkbox>
					<view class="bill">
						<view class="total">
							<label class="title">合计：</label>
							<label class="amount">¥{{ fetchData.allsum }}</label>
						</view>
						<view class="bill-btn" @click="billHandler">结算({{ fetchData.allnum }})</view>
					</view>
				</view>
			</view>
		</bht-layout-container>
	</view>
</template>

<script>
/**
 * 购物车页面
 */
import { mapGetters } from 'vuex';
import NzCheckbox from '@/third/acaui/nz-checkbox/nz-checkbox.vue';
import UniNumberBox from '@/components/cart/uni-number-box.vue';
import NavbarShoppingCart from '@/components/navbar/navbar-shopping-cart.vue';
import UniSwipeAction from '@/third/uni-swipe-action/uni-swipe-action/uni-swipe-action.vue';
import UniSwipeActionItem from '@/third/uni-swipe-action/uni-swipe-action-item/uni-swipe-action-item.vue';
export default {
	components: {
		NzCheckbox,
		UniNumberBox,
		NavbarShoppingCart,
		UniSwipeActionItem,
		UniSwipeAction
	},
	computed: {
		...mapGetters({
			tabBarFlag: 'utp/getTabBarIndex'
		})
	},

	data() {
		return {
			pageFlag: 'cart',
			test: false,
			//当前点击对位置
			curY: 0,
			//屏幕高度
			windowHeight: 0,
			//移动位置
			translateY: 'translateY(0)',
			scrollY: true,
			fetchData: {
				list: [
					{
						shop_id: 1,
						shop_name: '搜猎人艺术生活',
						products: [
							{
								pro_id: 101,
								text: '洗面奶洗面奶洗面奶洗面奶洗面奶洗面奶洗面奶洗面奶',
								price: 480.22,
								num: 1,
								img: './images/1.png',
								sum: 480,
								checked: false, //商品选中状态
								options: [
									{
										text: '删除',
										style: {
											backgroundColor: 'rgb(255,58,49)'
										},
										id: 101
									}
								]
							},
							{
								pro_id: 102,
								text: '花露水花露水花露水花露水花露水花露水花露水花露水',
								price: 680.22,
								num: 1,
								img: './images/2.png',
								sum: 680.42,
								checked: false,
								options: [
									{
										text: '删除',
										style: {
											backgroundColor: 'rgb(255,58,49)'
										},
										id: 102
									}
								]
							},
							{
								pro_id: 103,
								text: '燕麦片燕麦片燕麦片燕麦片燕麦片燕麦片燕麦片燕麦片',
								price: 380.1,
								num: 1,
								img: './images/3.png',
								sum: 380,
								checked: false,
								options: [
									{
										text: '删除',
										style: {
											backgroundColor: 'rgb(255,58,49)'
										},
										id: 103
									}
								]
							}
						],
						check: false, //店铺选中状态
						choose: 0 //商品选中个数
					},
					{
						shop_id: 2,
						shop_name: '卷卷旗舰店',
						products: [
							{
								pro_id: 201,
								text: '剃须刀剃须刀剃须刀剃须刀剃须刀剃须刀剃须刀剃须刀',
								price: 580,
								num: 1,
								img: './images/4.png',
								sum: 580,
								checked: false,
								options: [
									{
										text: '删除',
										style: {
											backgroundColor: 'rgb(255,58,49)'
										}
									}
								]
							},
							{
								pro_id: 202,
								text: '卫生纸卫生纸卫生纸卫生纸卫生纸卫生纸卫生纸卫生纸',
								price: 780,
								num: 1,
								img: './images/5.png',
								sum: 780,
								checked: false,
								options: [
									{
										text: '删除',
										style: {
											backgroundColor: 'rgb(255,58,49)'
										}
									}
								]
							}
						],
						check: false,
						choose: 0
					},
					{
						shop_id: 3,
						shop_name: '瓜皮的神秘商店',
						products: [
							{
								pro_id: 301,
								text: '眼镜片眼镜片眼镜片眼镜片眼镜片眼镜片眼镜片眼镜片',
								price: 1.22,
								num: 1,
								img: './images/6.png',
								sum: 3,
								checked: false,
								options: [
									{
										text: '删除',
										style: {
											backgroundColor: 'rgb(255,58,49)'
										},
										id: 301
									}
								]
							},
							{
								pro_id: 302,
								text: '凑数的凑数的凑数的凑数的凑数的凑数的凑数的凑数的',
								price: 1.48,
								num: 1,
								img: './images/7.png',
								sum: 3,
								checked: false,
								options: [
									{
										text: '删除',
										style: {
											backgroundColor: 'rgb(255,58,49)'
										},
										id: 302
									}
								]
							}
						],
						check: false,
						choose: 0
					}
				],
				status: false, //全选选中状态
				allchoose: 0, //店铺选中个数
				allsum: 0, //总计价格
				allnum: 0 //总计数量
			}
		};
	},
	watch: {
		fetchData: {
			deep: true,
			handler(val, oldVal) {
				this.chooseGoodsTotalPrice();
			}
		}
	},
	created() {
		let { windowHeight } = uni.getSystemInfoSync();
		this.windowHeight = windowHeight;
		uni.onKeyboardHeightChange(res => {
			if (this.tabBarFlag === this.pageFlag) {
				let { height } = res;
				if (height > 0) {
					let minusHeight = this.windowHeight - this.curY;
					if (height > minusHeight) {
						this.translateY = `translateY(${minusHeight - (height + 40)}px)`;
					}
				} else {
					this.translateY = `translateY(0)`;
				}
			}
		});
	},
	methods: {
		/**
		 * 结算处理
		 */
		billHandler() {
			console.log('okkk');
		},
		swipeActionClick(e) {
			let { id } = e.content;

			//删除商品
			this.fetchData.list.forEach((item, index) => {
				item.products.find((value, pindex, arr) => {
					if (value.pro_id === id) {
						item.products.splice(pindex, 1);
					}
				});
			});

			//如果products等于0 则删除店铺
			this.fetchData.list.forEach((item, index) => {
				if (item.products.length <= 0) {
					this.fetchData.list.splice(index, 1);
				}
			});
		},
		//处理swipe滑动时候 阻止滚动
		swipeActionChange(e) {
			this.scrollY = !e;
		},
		//选中
		choosetrue(item, pro) {
			pro.checked = true; //将商品选中状态改为true
			//这里执行了两步，选中商品数量先+1，再与该店铺商品数量比较，如果相等就更改店铺选中状态为true
			++item.choose === item.products.length ? (item.check = true) : '';
			++this.fetchData.allnum;
		},
		//计算商品总价
		chooseGoodsTotalPrice() {
			let totalPrice = 0;
			this.fetchData.list.forEach((item, index) => {
				item.products.forEach((pro, pIndex) => {
					if (pro.checked) {
						totalPrice += parseFloat(pro.price) * pro.num;
					}
				});
			});
			this.fetchData.allsum = totalPrice.toFixed(2);
		},
		//取消选中
		choosefalse(item, pro) {
			pro.checked = false; //将商品选中状态改为false
			--item.choose; //选中商品数量-1
			if (item.check) {
				item.check = false;
			}
			--this.fetchData.allnum;
			//无论之前全选的状态，将其改为false就行
			this.fetchData.status = false;
		},
		choose(item, pro) {
			pro.checked ? this.choosetrue(item, pro) : this.choosefalse(item, pro);
			this.chooseAllStatus();
		},
		shoptrue(item) {
			item.products.forEach(pro => {
				//循环店铺中的商品，先筛选出目前没选中的商品，给它执行choosetrue函数
				pro.checked === false && this.choosetrue(item, pro);
			});
		},
		shopfalse(item) {
			item.products.forEach(pro => {
				//循环店铺中的商品，先筛选出目前被选中的商品，给它执行choosefalse函数
				pro.checked === true && this.choosefalse(item, pro);
			});
		},
		shopchoose(item) {
			item.check ? this.shoptrue(item) : this.shopfalse(item);
			this.chooseAllStatus();
		},
		cartchoose() {
			this.fetchData.status ? this.fetchData.list.forEach(item => this.shoptrue(item)) : this.fetchData.list.forEach(item => this.shopfalse(item));
			this.chooseAllStatus();
		},
		chooseAllStatus() {
			let checkCount = 0;
			this.fetchData.list.forEach((item, index) => {
				if (item.check) {
					checkCount += 1;
				}
			});
			checkCount === this.fetchData.list.length ? (this.fetchData.status = true) : '';
		},
		//获取点击的位置
		handlerClickCon({ detail }) {
			this.curY = detail.y;
		}
	}
};
</script>

<style lang="scss" scoped>
.shopping-cart-bg {
	height: 146rpx;
	background: $nav-bg-color;
}
.shopping-cart-container {
	position: absolute;
	top: 0;
	right: 0;
	bottom: 114rpx;
	left: 0;
	transition: all 0.4s ease;
	.scroll-content {
		padding: 0 $padding-content;
	}
	.uni-scroll-view {
		&::-webkit-scrollbar {
			display: none;
			width: 0;
		}
	}
	.cart-list {
		margin-bottom: 20rpx;
		padding: 0 $padding-content 26rpx;
		background-color: #fff;
		border-radius: 30rpx;
		.cart-shop {
			display: flex;
			align-items: center;
			height: 104rpx;
			.shop-info {
				flex: 1;
				display: flex;
				align-items: center;
				font-size: 30rpx;
				.shop-name {
					margin-left: 18rpx;
				}
				.iconfont {
					font-size: 32rpx;
					color: #333333;
				}
				.aca-youjiantou {
					margin-left: 84rpx;
					font-size: 14px;
					color: #9a9a9a;
				}
			}
		}
		.uni-swipe {
			margin-bottom: 10px;
		}

		.cart-item {
			display: flex;
			align-items: center;

			&:after {
				content: '';
				height: 10rpx;
			}
			.goods-image {
				width: 180rpx;
				height: 180rpx;
				image {
					width: 100%;
					height: 100%;
					border-radius: 5px;
				}
			}
			.goods-info {
				flex: 1;
				display: flex;
				flex-direction: column;
				margin-left: 20rpx;
				margin-right: 20rpx;
				height: 180rpx;
				.goods-name {
					height: 46px;
					overflow: hidden;
					text-overflow: ellipsis;
					display: -webkit-box;
					-webkit-line-clamp: 2;
					-webkit-box-orient: vertical;
					font-size: 30rpx;
					color: #333;
				}
				.goods-des {
					overflow: hidden;
					text-overflow: ellipsis;
					display: -webkit-box;
					-webkit-line-clamp: 1;
					-webkit-box-orient: vertical;
					font-size: 20rpx;
					color: #999;
				}
				.goods-opt {
					display: flex;
					align-items: flex-end;
					justify-content: space-between;
					flex: 1;
					.price {
						color: #ff3333;
						.symboy {
							font-size: 22rpx;
						}
						.value {
							font-size: 30rpx;
						}
					}
					.number {
						.numberbox {
							display: flex;
							width: 120rpx;
							height: 45rpx;
							border: 1px solid rgba(0, 0, 0, 0.33);
							border-radius: 4px;
						}
					}
				}
			}
		}
	}
}
.shopping-cart-bill {
	position: absolute;
	bottom: 0;
	z-index: 1;
	width: 100%;
	height: 113rpx;
	background-color: #fff;
	border-top: 1rpx solid rgba(0, 0, 0, 0.33);
	.opt {
		padding: 0 $padding-content;
		display: flex;
		align-items: center;
		justify-content: space-between;
		height: 100%;

		.bill {
			display: flex;
			align-items: center;
			.total {
				font-size: 30rpx;
				.title {
					color: #333333;
				}
				.amount {
					color: #ff3333;
				}
			}
		}

		.bill-btn {
			margin-left: 7px;
			padding: 0 32px;
			height: 82rpx;
			line-height: 82rpx;
			background-color: #ff6f04;
			border-radius: 50px;
			text-align: center;
			font-size: 30rpx;
			color: #fff;
		}
	}
}
</style>
