<template>
	<view class="day-of-statistics-box">
		<view class="content">
			<view class="borderer-count">
				<label class="count">
					<bht-num-count :num="statsData.peopleTotal"></bht-num-count>
				</label>
				<label class="title">交易边民</label>
			</view>
			<view class="vehicle-count">
				<label class="count">
					<bht-num-count :num="statsData.vehicleTotal"></bht-num-count>
				</label>
				<label class="title">出入车辆</label>
			</view>
		</view>
	</view>
</template>

<script>
import BhtNumCount from '@/components/common/bht-num-count.vue';
export default {
	components: {
		BhtNumCount
	},
	props: {
		statsData: {
			type: Object,
			default: () => {
				return {};
			}
		}
	}
};
</script>

<style lang="scss">
.day-of-statistics-box {
	padding: $padding-content;
	.content {
		display: flex;
		align-content: center;
		height: 164rpx;
		background: linear-gradient(0deg, #f16b73, #ef4455);
		border-radius: 10rpx;
		color: #fff;
		.borderer-count,
		.vehicle-count {
			flex: 1;
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: center;

			.count {
				font-size: 46rpx;
				font-weight: bold;
			}
			.title {
				font-size: 26rpx;
			}
		}
		.vehicle-count {
			position: relative;
			&::before {
				position: absolute;
				left: 0;
				content: '';
				width: 2rpx;
				height: 50px;
				background-color: #fff;
			}
		}
	}
}
</style>
