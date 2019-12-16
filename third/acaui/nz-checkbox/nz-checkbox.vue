<template>
	<view role="checkbox" class="nz-checkbox" :value="value" v-model="model" :class="{ 'is-checked': isChecked,'is-disabled':isDisabled }"
	 @click="handleClick">
		<view class="nz-checkbox--input"><label class="nz-checkbox--inner" :class="{'is-circle':isCircle}"></label></view>
		<view class="nz-checkbox--label">{{ label }}</view>
	</view>
</template>

<script>
	export default {
		name: 'nz-checkbox',
		props: {
			label: {
				type: String,
				default: ''
			},
			value: {},
			checked: {
				type: Boolean,
				default: false
			},
			disabled: {
				type: Boolean,
				default: false
			},
			circle: {
				type: Boolean,
				default: false
			}
		},
		data() {
			return {
				auto: false
			}
		},
		computed: {

			isGroup() {
				let {
					auto
				} = this;
				let parent = this.$parent;
				if (parent === undefined) {
					return false;
				}
				while (parent) {
					if (parent.$options.name !== 'nz-checkbox-group') {
						parent = parent.$parent;
					} else {
						this._checkboxGroup = parent;
						return true;
					}
				}
				return false;
			},
			isChecked() {
				const {
					isGroup,
					model
				} = this;
				if (!isGroup) return model;
				const {
					value,
					_checkboxGroup
				} = this;
				return _checkboxGroup.value.some(item => item === value);
			},
			isDisabled() {
				return this._checkboxGroup ? this._checkboxGroup.disabled || this.disabled : this.disabled
			},
			isCircle() {
				return this.circle;
			},
			model: {
				/**
				 * 获取值
				 */
				get() {
					return this.value;
				},
				/**
				 * 设置新的值
				 */
				set(newValue) {
					const {
						isGroup,
						isChecked
					} = this;
					if (isGroup) {
						isChecked ? this._checkboxGroup.deleteItem(newValue) : this._checkboxGroup.selectItem(newValue);
					} else {
						this.$emit('input', newValue);
					}
				}
			}
		},
		created() {
			this.auto = true;
		},
		methods: {
			handleClick(e) {
				const {
					isDisabled,
					isGroup,
					model,
					value
				} = this;
				if (!isDisabled) {
					this.model = isGroup ? value : !model;
				}
				if (!isGroup) {
					this.$emit("select", !model);
				}
			}
		}
	}
</script>

<style lang="scss" lang="scss">
	.nz-checkbox {
		display: inline-block;
		color: #606266;
		font-size: 14px;
		position: relative;
		white-space: nowrap;
		user-select: none;
		margin-right: 10px;

		.nz-checkbox--input {
			line-height: 1;
			display: inline-block;
			white-space: nowrap;
			outline: none;
			position: relative;
			vertical-align: middle;

			.nz-checkbox--inner::after {
				position: absolute;
				box-sizing: content-box;
				content: '';
				border: 1px solid #fff;
				border-left: 0;
				border-top: 0;
				height: 7px;
				left: 6px;
				top: 3px;
				transform: rotate(45deg) scaleY(0);
				width: 3px;
				transition: transform 0.15s ease-in 0.05s;
				transform-origin: center;
			}
		}

		.nz-checkbox--label {
			display: inline-block;
			margin-left: 5px;
		}
	}

	.is-disabled {
		.nz-checkbox--inner {
			background-color: #edf2fc;
			border-color: #dcdfe6;
			cursor: not-allowed;
		}

		.nz-checkbox--label {
			color: #edf2fc;
		}
	}

	.nz-checkbox--inner {
		display: inline-block;
		position: relative;
		border: 1px solid #dcdfe6;
		border-radius: 4px;
		box-sizing: border-box;
		width: 18px;
		height: 18px;
		background-color: #fff;
		z-index: 1;
		transition: border-color 0.25s cubic-bezier(0.71, -0.46, 0.29, 1.46), background-color 0.25s cubic-bezier(0.71, -0.46, 0.29, 1.46);
	}

	.is-circle {
		border-radius: 14px !important;
	}

	.is-checked {
		.nz-checkbox--inner {
			background-color: #409eff !important;
			border-color: #409eff !important;
		}

		.nz-checkbox--inner::after {
			transform: rotate(45deg) scaleY(1) !important;
		}

		.nz-checkbox--label {
			color: #409eff;
		}
	}
</style>
