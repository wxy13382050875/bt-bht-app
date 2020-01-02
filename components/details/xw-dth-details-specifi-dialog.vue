<template>
	<uni-popup :show="showPopup" type="bottom" @change="uniPopupChange">
		<view class="layer attr-content">
			<view class="specification-wrapper">
				<scroll-view class="specification-wrapper-content" scroll-y="true">
					<view class="specification-header">
						<view class="specification-left"><image class="product-img"></image></view>
						<view class="specification-right">
							<view class="price-content">
								<text class="sign">¥</text>
								<text class="price">{{ selectshop.price || 0 }}</text>
							</view>
							<view class="inventory">库存:{{ selectshop.stock || 0 }}</view>
							<view class="choose">已选:{{ selectArr.join(' ') }}</view>
						</view>
					</view>
					<view class="specification-content">
						<view class="specification-item" v-for="(item, index1) in specifications" :key="index1">
							<view class="item-title">{{ item.name }}</view>
							<view class="item-wrapper">
								<view
									class="item-content"
									@tap="skuClick(item_value, index1, $event, index2)"
									v-for="(item_value, index2) in item.item"
									:key="index2"
									:class="[item_value.ishow ? '' : 'noactived', subIndex[index1] == index2 ? 'actived' : '']"
								>
									{{ item_value.name }}
								</view>
							</view>
						</view>
						<view class="specification-item">
							<view class="item-title">数量</view>
							<view class="item-wrapper">
								<stepper size="small" :min="1" :max="selectshop.stock" :defaultValue="selectNum" :display="canCount" @change="changeNum"></stepper>
							</view>
						</view>
					</view>
				</scroll-view>
				<view class="close" @tap="closeSf"><image class="close-item" src="../../static/icon/icon_close.png"></image></view>
			</view>
			<view class="btn-wrapper"><button class="sure" @click="confirm">确定</button></view>
		</view>
		
	</uni-popup>
</template>

<script>
import UniPopup from '@/third/uni-popup/uni-popup.vue';
import stepper from '@/third/stepper/stepper.vue';
import {
	skuList,
	specList
	
} from '@/data/sku.js'
export default {
	name: 'specifi-dialog',
	components: {
		UniPopup,
		stepper
	},
	props: {
		value: {},
		skuData: {
			type: Array,
			default: () => {
				return [];
			}
		}
	},
	computed: {
		canCount() {
			return this.subIndex.some(item => item === -1);
		}
	},
	data() {
		return {
			showPopup: this.value,
			// specData: this.skuData,
			// curTag: null,
			selectNum: 1,
			//SKU
			specifications: specList.specifications, //spu规格列表
			difference: skuList.difference, //sku列表
			shopItemInfo: {}, //存放要和选中的值进行匹配的数据
			selectArr: [], //存放被选中的值
			subIndex: [], //是否选中 因为不确定是多规格还是但规格，所以这里定义数组来判断
			selectshop: {}, //存放最后选中的商品
			
		};
	},
	watch: {
		value(n) {
			this.showPopup = n;
		}
	},
	created() {
		console.log(specList);
		console.log(skuList);
		// this.specifications.map(item => {
		// 	this.selectArr.push('');
		// 	this.subIndex.push(-1);
		// });
		this.checkItem(); //计算sku里面规格形成路径
		this.checkInpath(-1); //传-1是为了不跳过循环
		// this.getData(1);
		if (specList.status === 1) {
			this.specifications = specList.specifications;
			this.specifications.map(item => {
				this.selectArr.push('');
				this.subIndex.push(-1);
			});
		}
		if (skuList.status === 1) {
			this.difference = skuList.difference;
			this.checkItem(); //计算sku里面规格形成路径
			this.checkInpath(-1); //传-1是为了不跳过循环
		}
	},
	methods: {
		//确认事件
		confirm() {
			// console.log(this.shopItemInfo),
			
			
			console.log(JSON.stringify(this.selectshop));
			if (JSON.stringify(this.selectshop) != '{}') {
				this.showPopup = false;
				this.$emit('tagChange', this.selectshop, this.selectNum);
			} else {
				console.log('请选择规格');
				uni.showToast({
					icon: 'none',
					title: '请选择规格'
				});
			}
		},
		closeSf() {
			this.showPopup = false;
		},
		uniPopupChange(e) {
			this.$emit('input', e);
		},
		// change(value) {
		// 	console.log(value);
		// 	this.curNumber = value;
		// },
		// bindClick(item, pro) {
		// 	console.log("bindClick");
		// 	item.attrValues.forEach((tmItem, index) => {
		// 		tmItem.type = 'default';
		// 	});
		// 	if (pro.type == 'default') {
		// 		pro.type = 'success';
		// 		this.curTag = pro;
		// 	} else {
		// 		pro.type = 'default';
		// 		this.curTag = {};
		// 	}
		// 	this.$forceUpdate();
		// },
		
		skuClick(value, index1, event, index2) {
			console.log(value.ishow);
			if (value.ishow) {
				if (this.selectArr[index1] != value.name) {
					this.$set(this.selectArr, index1, value.name);
					this.$set(this.subIndex, index1, index2);
				} else {
					this.$set(this.selectArr, index1, '');
					this.$set(this.subIndex, index1, -1);
				}
				this.checkInpath(index1);
				//如果全部选完
				if (this.selectArr.every(item => item != '')) {
					this.selectshop = this.shopItemInfo[this.selectArr];
					this.selectNum = 1;
				}
			}
		},
		checkInpath(clickIndex) {
			// console.time('筛选可选路径需要的时间是');
			//循环所有属性判断哪些属性可选
			//当前选中的兄弟节点和已选中属性不需要循环
		
			for (let i = 0, len = this.specifications.length; i < len; i++) {
				if (i == clickIndex) {
					continue;
				}
				let len2 = this.specifications[i].item.length;
				for (let j = 0; j < len2; j++) {
					if (this.subIndex[i] != -1 && j == this.subIndex[i]) {
						continue;
					}
					let choosed_copy = [...this.selectArr];
					this.$set(choosed_copy, i, this.specifications[i].item[j].name);
					let choosed_copy2 = choosed_copy.filter(item => item !== '' && typeof item !== 'undefined');
					if (this.shopItemInfo.hasOwnProperty(choosed_copy2)) {
						this.$set(this.specifications[i].item[j], 'ishow', true);
					} else {
						this.$set(this.specifications[i].item[j], 'ishow', false);
					}
				}
			}
			// console.log(this.specifications)
			// console.timeEnd('筛选可选路径需要的时间是');
		},
		checkItem() {
			// console.time('计算有多小种可选路径需要的时间是');
			//计算有多小种可选路径
			let result = this.difference.reduce(
				(arrs, items) => {
					return arrs.concat(
						items.difference.reduce(
							(arr, item) => {
								return arr.concat(
									arr.map(item2 => {
										//利用对象属性的唯一性实现二维数组去重
										if (!this.shopItemInfo.hasOwnProperty([...item2, item])) {
											this.shopItemInfo[[...item2, item]] = items;
										}
										return [...item2, item];
									})
								);
							},
							[[]]
						)
					);
				},
				[[]]
			);
			// console.timeEnd('计算有多小种可选路径需要的时间是');
			console.log('result');
			console.log(result);
		},
		changeNum(val) {
			this.selectNum = parseInt(val);
		}
	}
};
</script>

<style lang="scss">
	.layer {
		display: flex;
		width: 100%;
		// height: 1014rpx;
		flex-direction: column;
		// min-height: 40vh;
		// max-height: 1014rpx;
		position: fixed;
		z-index: 99;
		bottom: 0;
		border-radius: 10upx 10upx 0 0;
		background-color: #fff;
	
		.specification-wrapper {
			width: 100%;
			padding: 30rpx 25rpx;
			box-sizing: border-box;
			.specification-wrapper-content {
				width: 100%;
				max-height: 900rpx;
				min-height: 600rpx;
				&::-webkit-scrollbar {
					/*隐藏滚轮*/
					display: none;
				}
	
				.specification-header {
					width: 100%;
					display: flex;
					flex-direction: row;
					position: relative;
					margin-bottom: 40rpx;
	
					.specification-left {
						width: 180rpx;
						height: 180rpx;
						flex: 0 0 180rpx;
	
						.product-img {
							width: 180rpx;
							height: 180rpx;
							background-color: #999999;
						}
					}
	
					.specification-right {
						flex: 1;
						padding: 0 35rpx 0 28rpx;
						box-sizing: border-box;
						display: flex;
						flex-direction: column;
						justify-content: flex-end;
						font-weight: 500;
	
						.price-content {
							color: #fe3a3a;
							margin-bottom: 20rpx;
	
							.sign {
								font-size: 28rpx;
							}
	
							.price {
								font-size: 48rpx;
							}
						}
	
						.inventory {
							font-size: 24rpx;
							color: #999999;
							margin-bottom: 14rpx;
						}
	
						.choose {
							font-size: 28rpx;
							color: #333333;
						}
					}
				}
	
				.specification-content {
					font-weight: 500;
	
					.specification-item {
						margin-bottom: 40rpx;
	
						&:last-child {
							margin-bottom: 0;
						}
	
						.item-title {
							margin-bottom: 20rpx;
							font-size: 28rpx;
							color: #999999;
						}
	
						.item-wrapper {
							display: flex;
							flex-direction: row;
							flex-flow: wrap;
	
							.item-content {
								display: inline-block;
								padding: 15rpx 35rpx;
								border-radius: 10rpx;
								background-color: #ffffff;
								color: #333333;
								font-size: 28rpx;
								margin-right: 20rpx;
								border: 2rpx solid #f4f4f4;
								box-sizing: border-box;
	
								&.actived {
									border-color: #fe3a3a;
									color: #fe3a3a;
								}
	
								&.noactived {
									background-color: #f4f4f4;
									border-color: #f4f4f4;
								}
							}
						}
					}
				}
			}
			.close {
				position: absolute;
				top: 30rpx;
				right: 25rpx;
				width: 50rpx;
				height: 50rpx;
				text-align: center;
				line-height: 50rpx;
				.close-item {
					width: 50rpx;
					height: 50rpx;
				}
			}
		}
	
		.btn-wrapper {
			display: flex;
			width: 100%;
			height: 120rpx;
			flex: 0 0 120rpx;
			align-items: center;
			justify-content: space-between;
			padding: 0 26rpx;
			box-sizing: border-box;
	
			.layer-btn {
				width: 335rpx;
				height: 76rpx;
				border-radius: 38rpx;
				color: #fff;
				line-height: 76rpx;
				text-align: center;
				font-weight: 500;
				font-size: 28rpx;
	
				&.add-cart {
					background: #ffbe46;
				}
	
				&.buy {
					background: #fe3a3a;
				}
			}
			.sure {
				width: 698rpx;
				height: 76rpx;
				border-radius: 38rpx;
				color: #fff;
				line-height: 76rpx;
				text-align: center;
				font-weight: 500;
				font-size: 28rpx;
				background: #fe3a3a;
			}
		}
	}

</style>
