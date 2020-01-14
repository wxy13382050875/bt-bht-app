<template>
	<view>
		<universal-nav-bar :navType="1" rightTitle="筛选" rightImageName="/static/icon/address_loaction_icon.png" @leftToPrev="leftToPrev" @rightToPrev="rightToPrev">
			<template name="nav">
				<label class="navTitle">边民互市二级交易市场</label>
			</template>
		</universal-nav-bar>
		<bht-layout-container bgColor="#F2F2F2" :bottom="0"></bht-layout-container>
	</view>
</template>

<script>
import UniversalNavBar from '@/components/navbar/xw-dth-navbar-universal.vue';
export default {
	components: {
		UniversalNavBar
	}
};
</script>

<style></style>
