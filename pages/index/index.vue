<template>
	<view class="app-content">
		<aca-nav-bar></aca-nav-bar>
		<bht-layout-container>
			<!-- <mescroll-uni :down="downOption" :up="upOption" @down="downCallback" :fixed="false">
				<bht-banner></bht-banner>
				<bht-fn></bht-fn>
				<view style="height: 20rpx" v-if="!isLogin"></view>
				<bht-adv></bht-adv>
				<bht-news></bht-news>
				<view class="space-h"></view>
			</mescroll-uni> -->
		</bht-layout-container>
	</view>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import BhtBanner from '@/components/common/bht-banner';
import BhtFn from '@/components/common/bht-fn';
import BhtAdv from '@/components/common/bht-adv';


import { invoiceList } from '@/api/bill.js';
export default {
	components: {
		BhtBanner,
		BhtFn,
		BhtAdv,
	},
	data() {
		return {
			downOption: {
				autoShowLoading: true,
				textInOffset: '下拉即可刷新...',
				textOutOffset: '松开即可刷新...',
				textLoading: '努力加载中...'
			},
			upOption: {
				use: false
			}
		};
	},
	computed: {
		...mapGetters({
			isLogin: 'user/isLogin',
			userInfo: 'user/userInfo'
		})
	},
	
	methods: {
		...mapActions({
			setInvoice: 'utp/setInvoice'
		}),
		downCallback(mescroll) {
			if (this.userInfo.idCode !== null && this.userInfo.type === '001') {
				invoiceList({
					invoiceStatus: 'none',
					page: 1,
					limit: 100
				}).then(res => {
					this.setInvoice(res.data.content);
					mescroll.endSuccess();
				});
			} else {
				setTimeout(() => {
					mescroll.endSuccess();
				}, 2000);
			}
		}
	}
};
</script>

<style lang="scss"></style>
