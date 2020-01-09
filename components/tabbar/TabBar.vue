<template>
	<view class="tab-bar-wrapper" v-show="tabbar">
		<view class="tab-bar-list">
			<view class="items" :class="{ 'nav-item-active': curTabBarIndex === item.flag }" v-for="(item, index) in roleMenu" :key="index" @click="tabChangeEvent(item.flag)">
				<image class="icon" :src="curTabBarIndex === item.flag ? item.selectedSrc : item.src"></image>
				<label class="title">{{ item.title }}</label>
			</view>
		</view>
	</view>
</template>
<script>
import { mapActions, mapGetters } from 'vuex';
//底部菜单组件
export default {
	props: {
		tabbar: {
			type: Boolean,
			default: true
		}
	},
	computed: {
		...mapGetters({
			curTabBarIndex: 'utp/getTabBarIndex',
			roleMenu: 'utp/roleMenu'
		})
	},
	created() {
		// console.log(this.roleMenu)
		console.log(uni.getStorageSync('menuData'))
	},
	methods: {
		...mapActions({
			setTabBarIndex: 'utp/setTabBarIndex'
		}),
		tabChangeEvent(flag) {
			if (this.curTabBarIndex !== flag) {
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
		height: 120rpx;
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
