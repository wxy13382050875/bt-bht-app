<template name="cate-filter">
	<view>
		<!-- grace filter start -->
		<view class="grace-filter" :style="{'position': fixed?'fixed':'relative','top':top}" id="grace-filter-header">
			<view class="items" :class="activeIndex==index?'text-red':'text-grey'" v-for="(item, index) in filters" :key="index" 
				:data-index="index" @tap="changeSort">
				<text class="text-df" v-if="item.filterType!=2">{{ item.title }}</text>
				<text class="text-df" v-else>{{ activeOption && activeOption.name || item.title }}</text>
				<text class="grace-iconfont icon-arrow-down" v-if="item.filterType==2"></text>
				<text class="grace-iconfont" v-else-if="item.filterType==0"></text>
				<image src="/static/icon/sort0.png" mode="widthFix" v-else-if="activeIndex!=index"></image>
				<image src="/static/icon/sort2.png" mode="widthFix" v-else-if="activeIndex==index && activeAscState"></image>
				<image src="/static/icon/sort1.png" mode="widthFix" v-else-if="activeIndex==index"></image>
			</view>
			<view class="text-xxl padding-lr margin-top-sm"  @tap="changeShape" v-if="showShape">
				<text :class="['text-red', curShapeValue == 2 ? 'cuIcon-apps' : 'cuIcon-list']"></text>
			</view>
			<!-- 下拉选项 -->
			<view class='grace-filter-options' v-if="activeIndex == index && showOption" v-for="(item, index) in filters" :key="index+10000">
				<view :class="[activeOption && (opt.value ===  activeOption.value) ? 'option current' : 'option']" 
					:data-index="index" :data-optindex="optIndex" v-for="(opt, optIndex) in item.options||[]" :key="optIndex+100000" @tap="changeSort" >
					{{opt.name}}<text class="cuIcon-right text-gray"></text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	props: {
		// 是否固定至顶部
		fixed:{
			type : Boolean,
			default :function() {
				return false
			}
		},
		// 固定至顶部时离顶部的距离
		top:{
			type : String,
			default :function() {
				return "0upx"
			}
		},
		filters:{
			type : Array,
			default :function() {
				return []
			}
		},
		initIndex:{
			type : Number,
			default :function() {
				return 0
			}
		},
		// 显示的模板类型值，1：为单列，2：为多列
		shapeValue:{
			type : Number,
			default :function() {
				return 2
			}
		},
		// 是否显示模板类型选择
		showShape:{
			type : Boolean,
			default :function() {
				return true
			}
		}
	},
	data() {
		return {
			// 当前激活索引
			activeIndex:0,
			// 默认升序
			activeAscState:true,
			//默认两列布局图标
			curShapeValue:2,
			showOption:false,
			activeOption:null
		}
	},
	created: function(event) {
		this.curShapeValue=this.shapeValue
		this.activeIndex=this.initIndex
		//console.log("this.activeIndex:",this.activeIndex)
	},
	methods: {
		//排序更改事件
		changeSort:function(e){
			const index=parseInt(e.currentTarget.dataset.index);
			const optIndex = e.currentTarget.dataset.optindex;
			const options= this.filters[index].options;
			let option=null;
			if(options && optIndex){
				option=options[parseInt(optIndex)]
			}
			
			const curActiveItem=this.filters[index]
			const filterType=curActiveItem.filterType || 0
			// 点击索引等于自身
			if(this.activeIndex==index){
				//禁用升降序，则直接返回无需处理
				if(curActiveItem.filterType==0) return
			}
			
			// 升降序
			if(curActiveItem.filterType==1){
				if(this.activeIndex==index){
					//排序顺序颠倒
					this.activeAscState=!this.activeAscState
				} else {
					this.activeAscState=curActiveItem.initAscState||false
				}
			}
			// 下拉选项
			else if(curActiveItem.filterType==2){
				console.log('curActiveItem.filterType:',curActiveItem.filterType)
				if(this.activeIndex!=index){
					// 点击的不是本列
					this.showOption=true
					//this.activeOption=null
				} else if(this.activeIndex==index && option ==null){
					// 点击的本列下拉箭头，则切换显示状态并返回
					this.showOption=!this.showOption
					return;
				} else {
					// 点击了选项，则关闭显示以便显示查询结果
					this.showOption=false
					this.activeOption=option
					console.log('this.activeOption:',this.activeOption)
				}
			}
			this.activeIndex=index
			if(curActiveItem.filterType==2 && this.showOption){
				// 下拉显示面板，不进行过滤
				return;
			}
			const sortField = curActiveItem.value !== undefined ? curActiveItem.value:index
			var data={"sort":sortField,"order":this.activeAscState?1:-1,"option": this.activeOption && this.activeOption.value || null}
			//console.log("this.activeOption",data)
			this.$emit("sortChanged",data)
		},
		changeShape:function(){
			this.curShapeValue=this.curShapeValue==1?2:1
			this.$emit("shapeChanged",this.curShapeValue)
		}
	}
};
</script>
<style>
.grace-filter .items uni-text.text-df{
	font-size:30upx
}
.position-relative{
	position: relative;
}
.position-fixed{
	position: fixed;
}
/* #ifdef  H5 */
.grace-filter-top{
    top:44px;
}
/* #endif */
</style>
