<template>
	<view class="search-modal" v-if="showSearchModal">
		<view class="search-container" :style="{ height: statusHeight + navHeight + 'px' }">
			<view class="status" :style="{ height: statusHeight + 'px' }"></view>
			<view class="search-wrapper" :style="{ height: navHeight + 'px' }">
				<uni-search-bar style="width: 100%;" radius="100" @input="searchInput" placeholder="请输入车牌号" clearButton="auto" cancelButton="auto"
				 @confirm="search" @cancel="cancel" />
			</view>
		</view>
		<view :style="{height: containerHegiht+'px'}">
			<slot></slot>
		</view>
	</view>
</template>

<script>
	/**
	 * 搜索modal
	 */
	import UniSearchBar from '@/third/uni-search-bar/uni-search-bar.vue'
	import {
		mapActions,
		mapGetters
	} from 'vuex';
	export default {
		components: {
			UniSearchBar
		},
		props: {
			value: {
				type: Boolean,
				default: false
			}
		},
		data() {
			return {
				containerHegiht: 0,
				showSearchModal: this.value
			}
		},
		computed: {
			...mapGetters({
				statusHeight: 'utp/statusHeight',
				navHeight: 'utp/navHeight'
			}),
		},
		watch: {
			value(n, o) {
				this.showSearchModal = n;
			}
		},
		created() {
			uni.getSystemInfo({
				success: (res) => {
					this.containerHegiht = res.screenHeight - (this.statusHeight + this.navHeight)
				}
			})
		},
		methods: {
			/**
			 * 监听输入
			 */
			searchInput({
				value
			}) {
				this.$emit('searchInput', value)
			},
			/**
			 * 点击键盘上的搜索事件
			 */
			search({
				value
			}) {
				this.$emit('search', value);
			},
			/**
			 * 点击取消
			 */
			cancel({
				value
			}) {
				this.showSearchModal = false;
				this.$emit('input', false)
				this.$emit('cancel', value)
			}
		}
	}
</script>

<style lang="scss" scoped>
	.search-modal {
		position: absolute;
		top: 0;
		bottom: 0;
		width: 100%;
		z-index: 1995;
		background-color: #fff;
		.search-container {
			width: 100%;
			background: $nav-bg-color;
		}

		.search-wrapper {
			width: 100%;
			display: flex;
			align-items: center;
		}
	}
</style>
