<template>
	<view class="app-content">
		<aca-nav-bar :level="2"></aca-nav-bar>
		<bht-layout-container>
			<view class="news-content-w">
				<view class="news-content">
					<view class="title">{{article.title}}</view>
					<view class="sub-title">
						<text>{{article.author}}</text>
						<text>{{createDate}}</text>
						<text>浏览量：{{article.view || 0}}</text>
					</view>
					<u-parse :content="article.content" @preview="preview" @navigate="navigate" />
					<view class="footer">
						<view class="like-btn" :class="{liked: isLiked}" @click="handlerLike">
							<label class="iconfont aca-dianzan"></label>
							<text class="txt">{{article.likes}}</text>
						</view>
						<view class="share-btn">
							<label class="iconfont aca-fenxiang-1"></label>
						</view>
					</view>
					<!-- #ifdef APP-PLUS || MP-WEIXIN -->
					<view class="space-h"></view>
					<!-- #endif -->
				</view>
			</view>
		</bht-layout-container>
	</view>
</template>

<script>
	import {
		newsById,
		checkLike,
		newsLiked
	} from '@/api/news'

	import {
		mapGetters
	} from 'vuex'

	import {
		minusDate,
		formatterDate
	} from '@/utils/date';
	import uParse from '@/third/gaoyia-parse/parse.vue'
	export default {
		components: {
			uParse
		},
		data() {
			return {
				article: {},
				isLiked: false
			}
		},
		onLoad() {
			newsById(this.$Route.query).then(res => {
				this.article = res.data

				checkLike({
					id: this.article.id,
					userId: this.userInfo.id
				}).then(res => {
				   if(res.data.status === 'false'){
					   this.isLiked = false
				   }else{
					   this.isLiked = true
				   }
					
				})
			})

		},
		computed: {
			...mapGetters({
				userInfo: 'user/userInfo',
				isLogin: 'user/isLogin'
			}),
			createDate() {
				//格式化时间
				let {
					createDate
				} = this.article
				return formatterDate(createDate, 'YY-MM-DD')
			}
		},
		methods: {
			preview(src, e) {
				// do something
				console.log(src)
			},
			navigate(href, e) {
				// do something
			},
			//处理点赞事件
			handlerLike() {
				newsLiked({
					id: this.article.id,
					userId: this.userInfo.id
				}).then(res => {
				   if(res.data.status === 'false'){
					   this.isLiked = false
				   }else{
					   this.isLiked = true
				   }
					
				})
			}
		}
	}
</script>

<style lang="scss">
	.news-content-w {
		position: absolute;
		overflow: scroll;
		bottom: 0;
		left: 0;
		top: 0;
		right: 0;
		font-size: 28rpx;
		.news-content {
			padding: 0 $padding-content;
		}

		.title {
			position: relative;
			padding: 20rpx 0;
			display: flex;
			align-items: center;
			min-height: 116rpx;
			font-size: 32rpx;
			font-weight: bold;
			color: rgba(23, 23, 23, 1);

			&::after {
				content: '';
				position: absolute;
				right: 0;
				bottom: 0;
				left: 0;
				height: 1px;
				background-color: rgba(169, 168, 168, 1);
			}
		}

		.sub-title {
			display: flex;
			justify-content: center;
			align-items: center;
			font-size: 22px;
			color: #909090;
			height: 50rpx;
			font-size: 22rpx;
			color: rgba(144, 144, 144, 1);

			text {
				padding: 0 5rpx;
			}
		}

		.content {}

		.footer {
			display: flex;
			justify-content: space-between;
			padding: 27rpx 0;
			height: 80rpx;

			.like-btn,
			.share-btn {
				display: flex;
				align-items: center;
				justify-content: center;
				width: 49%;
				height: 80rpx;
				border-radius: 6px;
				background-color: #E5E5E5;
				color: #868686;

				.iconfont {
					font-size: 42rpx;
				}

				.txt {
					margin-top: 5px;
					margin-left: 5px;
					font-size: 24rpx;
				}
			}

			.liked {
				color: #FF3333;
			}
		}
	}
</style>
