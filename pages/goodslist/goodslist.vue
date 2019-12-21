<template>
	<view>
		<navbar-shopping-search></navbar-shopping-search>
		<bht-layout-container :bottom="0">
			<view class="index-header">
				<!-- filters：过滤选项设置， sortChanged：排序更改的事件监听方法，showShape：是否显示右侧模板选择按钮，shapeValue：初始化的模板值，2：双列，1：单列，具体可自行控制，shapeChanged:右侧的模板选择按钮事件监听方法-->
				<goodsFilter :filters="goodsFilters" @sortChanged="goodsFilterChanged" @shapeChanged="goodsTemplateChanged" :showShape="false" :shapeValue="2"></goodsFilter>
			</view>
			<view class="bht-layout-content"><goodsList :dataSource="dataSource"></goodsList></view>
		</bht-layout-container>
	</view>
</template>

<script>
import goodsList from '@/components/goods/xw-dth-goods-list.vue';
import goodsFilter from '../../third/yb-filter/index.vue';
import NavbarShoppingSearch from '@/components/navbar/navbar-shopping-search.vue';
export default {
	components: {
		goodsList,
		goodsFilter,
		NavbarShoppingSearch
	},
	data() {
		return {
			// 默认双列显示
			goodsListTemplate: 2,
			// 过滤参数
			curCateFid: '',
			cateList: [{ name: '卤菜', value: '100001' }, { name: '凉菜', value: '100002' }, { name: '酒水', value: '100003' }],
			dataSource: [
				{
					url: '/static/banner/1.png',
					title: '泰国士国牌即食燕窝金丝燕浓缩瓶装6瓶75ML瓶装木糖醇味',
					details: '缅甸老茶坊有限公司生产特卖',
					newPrice: 328,
					oldPrice: 299,
					number: 101,
					page: '/pages/shop/goods-details'
				},
				{
					url: '/static/banner/1.png',
					title: '泰国士国牌即食燕窝金丝燕浓缩瓶装6瓶75ML瓶装木糖醇味',
					newPrice: 328,
					oldPrice: 299,
					number: 101,
					page: '/pages/shop/goods-details'
				},
				{
					url: '/static/banner/1.png',
					title: '泰国士国牌即食燕窝金丝燕浓缩瓶装6瓶75ML瓶装木糖醇味',
					newPrice: 328,
					oldPrice: 299,
					number: 101,
					page: '/pages/shop/goods-details'
				},
				{
					url: '/static/banner/1.png',
					title: '泰国士国牌即食燕窝金丝燕浓缩瓶装6瓶75ML瓶装木糖醇味',
					newPrice: 328,
					oldPrice: 299,
					number: 101,
					page: '/pages/shop/goods-details'
				},
				{
					url: '/static/banner/1.png',
					title: '泰国士国牌即食燕窝金丝燕浓缩瓶装6瓶75ML瓶装木糖醇味',
					details: '缅甸老茶坊有限公司生产特卖',
					newPrice: 328,
					oldPrice: 299,
					number: 101,
					page: '/pages/shop/goods-details'
				},
				{
					url: '/static/banner/1.png',
					title: '泰国士国牌即食燕窝金丝燕浓缩瓶装6瓶75ML瓶装木糖醇味',
					newPrice: 328,
					oldPrice: 299,
					number: 101,
					page: '/pages/shop/goods-details'
				},
				{
					url: '/static/banner/1.png',
					title: '泰国士国牌即食燕窝金丝燕浓缩瓶装6瓶75ML瓶装木糖醇味',
					newPrice: 328,
					oldPrice: 299,
					number: 101,
					page: '/pages/shop/goods-details'
				},
				{
					url: '/static/banner/1.png',
					title: '泰国士国牌即食燕窝金丝燕浓缩瓶装6瓶75ML瓶装木糖醇味',
					newPrice: 328,
					oldPrice: 299,
					number: 101,
					page: '/pages/shop/goods-details'
				},
				{
					url: '/static/banner/1.png',
					title: '泰国士国牌即食燕窝金丝燕浓缩瓶装6瓶75ML瓶装木糖醇味',
					details: '缅甸老茶坊有限公司生产特卖',
					newPrice: 328,
					oldPrice: 299,
					number: 101,
					page: '/pages/shop/goods-details'
				},
				{
					url: '/static/banner/1.png',
					title: '泰国士国牌即食燕窝金丝燕浓缩瓶装6瓶75ML瓶装木糖醇味',
					newPrice: 328,
					oldPrice: 299,
					number: 101,
					page: '/pages/shop/goods-details'
				},
				{
					url: '/static/banner/1.png',
					title: '泰国士国牌即食燕窝金丝燕浓缩瓶装6瓶75ML瓶装木糖醇味',
					newPrice: 328,
					oldPrice: 299,
					number: 101,
					page: '/pages/shop/goods-details'
				},
				{
					url: '/static/banner/1.png',
					title: '泰国士国牌即食燕窝金丝燕浓缩瓶装6瓶75ML瓶装木糖醇味',
					newPrice: 328,
					oldPrice: 299,
					number: 101,
					page: '/pages/shop/goods-details'
				}
			]
		};
	},
	methods: {
		// 排序，筛选更改
		goodsFilterChanged(filter) {
			console.log('filter:', filter);
			// 此处可根据fitler数据，从服务器端加载数据
			// pageIndex = 0;
			// this.isEnd = false;
			// this.loadingType = 0;
			// this.curCateFid=filter.option || ""
			// // 加载数据
			// const resetData=true;
			// this.loadMoreGoods(filter,resetData);
		},
		// 点击了右侧的模板选择按钮：即单列还是双列展示商品
		goodsTemplateChanged(templateValue) {
			this.goodsListTemplate = templateValue;
		}
	},
	onReady: function() {
		//this.loadCouponListList();
	},
	onLoad: function(options) {
		console.log('options', options);
	},
	computed: {
		goodsListTemplateType: function() {
			return this.goodsListTemplate;
		},
		// 商品过滤器参数 <!-- //1：按距离，2：按销量，3：按人气，4：按最新，5：按价格 -->
		goodsFilters: function() {
			// 参考的下拉选项如下，可从服务器端加载：
			//options:[{name:'不限',value:""},{name:'酒水',value:"js",children:[{name:'啤酒',value:"pj"}]}]},
			// const cateOptions=this.cateList.map(function (item){
			// 	return {name:item.Name,value:item.Fid}
			// });
			const cateOptions = [{ name: '推荐', value: '0' }, ...this.cateList];
			// filterType为0，普通方式，无排序，1：排序模式，2：下拉筛选模式，当前支持一级，多级可自行扩展
			return [
				// {title:'推荐',value:0,filterType:0,disableAscDesc:true},
				{ title: '综合', value: 0, filterType: 1 },
				// {title:'人气', value:3, filterType:1},
				{ title: '销售', value: 1, filterType: 1 },
				{ title: '价格', value: 2, filterType: 1, initAscState: true }
			];
		}
	}
};
</script>

<style></style>
