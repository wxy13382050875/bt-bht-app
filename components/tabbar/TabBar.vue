<template>
	<view class="tab-bar-wrapper" v-show="tabbar">
		<view class="tab-bar-list">
			<view class="items" :class="{ 'nav-item-active': select === item.flag }" v-for="(item, index) in list" :key="index" @click="tabChangeEvent(item.flag)">
				<image class="icon" :src="select === item.flag ? item.selectedSrc : item.src"></image>
				<label class="title">{{ item.title }}</label>
			</view>
		</view>
	</view>
</template>
<script>
import { mapActions } from 'vuex';
//底部菜单组件
export default {
	props: {
		tabbar: {
			type: Boolean,
			default: true
		}
	},
	data() {
		return {
			select: 'index',
			list: [
				{
					title: '首页',
					src: require('@/static/tab/home_def_icon.png'),
					selectedSrc: require('@/static/tab/home_sel_icon.png'),
					flag: 'index'
				},
				{
					title: '统计报表',
					src: require('@/static/tab/tjbb_def_icon.png'),
					selectedSrc: require('@/static/tab/tjbb_sel_icon.png'),
					flag: 'stat'
				},
				// {
				// 	title: '分类',
				// 	flag: 'cat'
				// },
				{
					title: '购物车',
					src: require('@/static/tab/cart_def_icon.png'),
					selectedSrc: require('@/static/tab/cart_sel_icon.png'),
					flag: 'cart'
				},
				{
					title: '我的',
					src: require('@/static/tab/my_def_icon.png'),
					selectedSrc: require('@/static/tab/my_sel_icon.png'),
					flag: 'my'
				}
			]
		};
	},
	methods: {
		...mapActions({
			setTabBarIndex: 'utp/setTabBarIndex'
		}),
		tabChangeEvent(flag) {
			if (this.select !== flag) {
				this.select = flag;
				this.setTabBarIndex(flag);
			}
		}
	}
};
</script>

<style lang="scss">
.tab-bar-wrapper {
	position: fixed;
	right: 0;
	bottom: 0;
	left: 0;
	.tab-bar-list {
		position: relative;
		display: flex;
		align-items: center;
		justify-content: space-between;
		height: 50px;
		background-color: #f7f3f0;
		&::before {
			content: '';
			position: absolute;
			top: 0;
			right: 0;
			left: 0;
			border-top: 1px solid #aaaaaa;
		}
		.items {
			flex: 1;
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: center;
			height: 100%;
			.icon {
				width: 24px;
				height: 24px;
			}
			.title {
				margin-top: 2px;
				font-size: 24rpx;
				color: #868686;
			}
		}
		.nav-item-active {
			.title {
				color: #e40011;
			}
		}
		@keyframes active-animation {
			0% {
				opacity: 0;
			}

			50% {
				opacity: 0.8;
			}

			100% {
				opacity: 1;
			}
		}
	}
}
</style>
