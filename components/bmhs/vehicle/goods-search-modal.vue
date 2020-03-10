<template>
	<view>
		<popup-nav-bar :level="2" @backEvent="backEvent" title="添加商品"></popup-nav-bar>
		<bht-layout-container :bottom="0" bgColor="#fff">
			<view class="search-goods-container">
				<view class="goods-search-cell">
					<view class="label">商品名称</view>
					<view class="content"><input type="text" v-model="goodsName" placeholder-class="placeholder-class" class="input"
						 placeholder="请输入商品名称" /></view>
				</view>
				<view class="goods-search-btn">
					<view class="btn clear-btn" @click="clearForm">清除</view>
					<view class="btn search-btn" @click="searchGoods">搜索</view>
					<view class="btn confirm-btn" @click="addGoodsConfrim">确认添加</view>
				</view>
			</view>
			<view class="search-goods-result">
				<view class="items" v-for="(item, index) in goodsData" :key="index">
					<nz-checkbox :circle="true" v-model="item.check"></nz-checkbox>
					<view class="goods-info">
						<view class="header">
							<label class="title">商品名称</label>
							<label class="value">{{item.name}}</label>
						</view>
						<view class="body">
							<view class="cell">
								<label class="title">商品分类</label>
								<label class="value">{{item.categoryName}}</label>
							</view>
							<view class="cell">
								<label class="title">税号</label>
								<label class="value">{{item.code}}</label>
							</view>
							<view class="cell">
								<label class="title">包装净重 </label>
								<label class="value">{{item.packWeightNew}}</label>
							</view>
							<view class="cell">
								<label class="title">单位 </label>
								<label class="value">{{item.priceUnitNew}}</label>
							</view>
							<view class="cell">
								<label class="title">毛重</label>
								<label class="value">{{item.maxWeight}}</label>
							</view>
							<view class="cell">
								<label class="title">单价 </label>
								<label class="value">{{item.unitPrice}}</label>
							</view>
						</view>
					</view>
				</view>
			</view>
		</bht-layout-container>
	</view>
</template>

<script>
	/**
	 * 商品搜索添加
	 */
	import PopupNavBar from '@/third/acaui/nav/popup-nav-bar.vue'
	import NzCheckbox from '@/third/acaui/nz-checkbox/nz-checkbox.vue'
	import {
		mapActions,
		mapGetters
	} from 'vuex'
	import {
		getGoodsList
	} from '@/api/bmhs.js'
	export default {
		components: {
			PopupNavBar,
			NzCheckbox
		},
		data() {
			return {
				top: 0,
				goodsName: '',
				goodsData: []
			}
		},
		computed: {
			...mapGetters({
				getGoodsList: 'bmhs/getGoodsList'
			})
		},
		mounted() {
			// const query = uni.createSelectorQuery().in(this);
			// setTimeout(() => {
			// 	query.select('.search-goods-container').boundingClientRect(data => {
			// 		this.top = data.height;
			// 		console.log(JSON.stringify(data))
			// 	}).exec();
			// }, 1000)
		},
		methods: {
			...mapActions({
				addGoodsData: 'bmhs/addGoodsData'
			}),
			backEvent() {
				
				this.$emit('close', 'close')
			},
			/**
			 * 确认添加商品
			 */
			addGoodsConfrim() {
				let arr = this.goodsData.filter((item) => item.check)
				if (arr.length === 0) {
					uni.showToast({
						title: '请选择商品',
						icon: 'none',
						duration: 3000
					})
					return;
				}
				this.addGoodsData(arr);
				this.goodsData = [];
				this.$emit('close', 'close')
			},
			/**
			 * 清除商品
			 */
			clearForm() {
				this.goodsName = '';
			},
			/**
			 * 搜索商品
			 */
			searchGoods() {
				if (this.goodsName.length <= 0) {
					uni.showToast({
						title: '请输入商品名称',
						icon: 'none',
						duration: 3000
					})
					return;
				}
				getGoodsList({
					goodsName: this.goodsName
				}).then(res => {
					let {
						data
					} = res;
					data.forEach((item, index) => {
						item.check = false;
					})
					if (this.getGoodsList.length > 0) {
						let arr = [...data].filter(x => [...this.getGoodsList].every(y => y.seqNo !== x.seqNo));
						this.goodsData = arr;
					} else {
						this.goodsData = data;
					}

				}).catch(error => {
					console.log(error)
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	@mixin goodsInfo {
		padding: $padding-content 0;
		display: flex;
		align-items: center;
		justify-content: space-between;
		border-bottom: 1px solid #ececec;
		font-size: 26rpx;
		color: #868686;

		.title {
			width: 100px;
		}

		.value {
			flex: 1;
			display: flex;
			justify-content: flex-end;
		}
	}

	.search-goods-container {
		padding: 0 $padding-content;
		height: 196rpx;
		border-bottom: 1px solid #ECECEC;
		.goods-search-btn {
			display: flex;
			justify-content: space-between;
			margin-top: $padding-content;
			margin-bottom: $padding-content;

			.btn {
				width: calc(33.33% - 5px);
				display: flex;
				align-items: center;
				justify-content: center;
				height: 42px;
				border-radius: 50px;
				font-size: 29rpx;
			}

			.clear-btn,
			.search-btn {
				border: 1px solid #ECECEC;
				color: #333;
			}

			.confirm-btn {
				background-color: #ff3333;
				color: #fff;
			}
		}
	}

	.search-goods-result {
		position: absolute;
		bottom: 0;
		top: 196rpx;
		overflow-y: scroll;
		width: 100%;
		background-color: rgb(248, 248, 248);

		.items {
			padding: 0 $padding-content;
			margin-bottom: $padding-content;
			display: flex;
			align-items: center;
			background-color: #fff;

			&:last-child {
				margin-bottom: 0;
			}

			.goods-info {
				flex: 1;

				.header {
					@include goodsInfo;
					border-bottom-width: 2px;
				}

				.body {
					.cell {
						@include goodsInfo
					}
				}
			}
		}
	}

	.goods-search-cell {
		position: relative;
		display: flex;
		justify-content: space-between;
		align-items: center;
		height: 80rpx;
		border-bottom: 1px solid #ececec;

		.label {
			width: 120rpx;
			font-size: 30rpx;
			text-align: right;
			color: #333;
		}

		.content {
			flex: 1;
			display: flex;
			justify-content: flex-end;
			align-items: center;
			text-align: right;

			.input {
				margin-top: 3px;
				padding-left: 5px;
				width: 100%;
				text-align: left;
				font-size: 30rpx;
			}


			.placeholder-class {
				font-size: 30rpx;
			}

			.arrow-right {
				margin-left: 18rpx;
				color: #aaaaaa;
			}
		}
	}
</style>
