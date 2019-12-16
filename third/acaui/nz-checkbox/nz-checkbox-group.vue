<template>
	<view class="nz-checkbox-group">
		<slot></slot>
	</view>
</template>

<script>
	export default {
		name: 'nz-checkbox-group',
		props: {
			value: {
				type: Array,
				required: true
			},
			disabled: {
				type: Boolean
			}
		},
		watch: {
			value(newValue) {
				this.$emit("input", newValue);
				this.$emit("select", newValue);
			}
		},
		methods: {
			selectItem(item) {
				const {
					value
				} = this;
				this.$emit("input", [...value, item]);
			},
			deleteItem(item) {
				const {
					value: selectItems
				} = this;
				this.$emit(
					"input",
					selectItems.filter(selectitem => selectitem !== item)
				);
			}
		}
	}
</script>

<style>
</style>
