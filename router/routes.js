//定义路由列表
const routesList = [{
		path: "/pages/main",
		name: "app",
		meta: {
			title: '首页',
			auth: {
				requiresAuth: true
			}
		}
	},
	{
		path: "/pages/common/login",
		name: "login",
		meta: {
			title: '登录',
			auth: {
				requiresAuth: false
			}
		}
	},
	{
		path: '/pages/common/register',
		name: "reg",
		meta: {
			title: '注册',
			auth: {
				requiresAuth: false
			}
		}
	}, {
		path: '/pages/common/forget',
		name: 'forget',
		meta: {
			title: '找回密码',
			auth: {
				requiresAuth: false
			}
		}
	}, {
		path: "/pages/index/index",
		name: 'index',
		meta: {
			title: '边互通首页',
			auth: {
				requiresAuth: false
			}
		}
	},
	{
		path: "/pages/staff/index",
		name: 'staff',
		meta: {
			title: '现场工作人员首页',
			auth: {
				requiresAuth: false
			}
		}
	},
	{
		path: "/pages/staff/statistics-charts",
		name: 'statistics-charts',
		meta: {
			title: '统计报表',
			auth: {
				requiresAuth: false
			}
		}
	},
	{
		path: "/pages/staff/borderer-jc-statistics",
		name: 'borderer-jc-statistics',
		meta: {
			title: '边民互市进出口统计',
			auth: {
				requiresAuth: false
			}
		}
	},
	{
		path: "/pages/staff/goods-jc-statistics",
		name: 'goods-jc-statistics',
		meta: {
			title: '进出口商品交易额统计',
			auth: {
				requiresAuth: false
			}
		}
	},
	{
		path: "/pages/staff/statement-bill-charts",
		name: 'goods-jc-statistics',
		meta: {
			title: '交易结算单统计',
			auth: {
				requiresAuth: false
			}
		}
	},
	{
		path: "/pages/goods/query/goods-borderer-query",
		name: 'goods-borderer-query',
		meta: {
			title: '边民商品申报查询',
			auth: {
				requiresAuth: true
			}
		}
	}, {
		path: "/pages/vehicle/query/vehicle-borderer-query",
		name: 'vehicle-borderer-query',
		meta: {
			title: '边民车辆申报查询',
			auth: {
				requiresAuth: true
			}
		}
	}, {
		path: "/pages/goods/query/goods-personnel-query",
		name: 'goods-personnel-query',
		meta: {
			title: '现场工作人员商品申报查询',
			auth: {
				requiresAuth: true
			}
		}
	},
	{
		path: '/pages/vehicle/query/vehicle-personnel-query',
		name: 'vehicle-personnel-query',
		meta: {
			title: '现场工作人员车辆申报查询',
			auth: {
				requiresAuth: true
			}
		}
	},
	{
		path: '/pages/vehicle/query/vehicle-personnel-check',
		name: 'vehicle-personnel-check',
		meta: {
			title: '现场工作人员待检车辆查询',
			auth: {
				requiresAuth: true
			}
		}
	},
	{
		path: "/pages/user/center",
		name: 'user-center',
		meta: {
			title: '个人中心',
			auth: {
				requiresAuth: true
			}
		}
	},
	{
		path: '/pages/user/profile',
		name: 'profile',
		meta: {
			title: '个人信息',
			auth: {
				requiresAuth: true
			}
		}
	},
	{
		path: '/pages/user/edit-profile',
		name: 'edit-profile',
		meta: {
			title: '个人信息',
			auth: {
				requiresAuth: true
			}
		}
	},
	{
		path: '/pages/bill/bill-mangement',
		name: 'bill-management',
		meta: {
			title: '开票管理',
			auth: {
				requiresAuth: true
			}
		}
	},
	{
		path: '/pages/news/news-list',
		name: 'news-list',
		meta: {
			title: '新闻列表',
			auth: {
				requiresAuth: false
			}
		}
	},
	{
		path: '/pages/news/news-details',
		name: 'news-details',
		meta: {
			title: '新闻列表',
			auth: {
				requiresAuth: false
			}
		}
	},
	{
		path: "/pages/shop/goods-details",
		name: "goods-details",
		meta: {
			title: '商品详情',
			auth: {
				requiresAuth: false
			}
		}
	},
	{
		path: "/pages/shop/confirm-order",
		name: "confirm-order",
		meta: {
			title: '确认订单',
			auth: {
				requiresAuth: false
			}
		}
	},
	{
		path: "/pages/shop/order-details",
		name: "confirm-order",
		meta: {
			title: '订单详情',
			auth: {
				requiresAuth: false
			}
		}
	},
	{
		path: "/pages/goodslist/goodslist",
		name: "goodslist",
		meta: {
			title: '个人中心',
			auth: {
				requiresAuth: false
			}
		}
	},
	{
		path: "/pages/personal/my-order-list",
		name: "orderlist",
		meta: {
			title: '我的订单',
			auth: {
				requiresAuth: false
			}
		}
	},
	{
		path: "/pages/personal/my-address-list",
		name: "addresslist",
		meta: {
			title: '我的地址',
			auth: {
				requiresAuth: false
			}
		}
	},
	{
		path: "/pages/shop/pay-success",
		name: "pay-success",
		meta: {
			title: '支付成功',
			auth: {
				requiresAuth: false
			}
		}
	}, {
		path: "/pages/user/my-address-create",
		name: "my-address-create",
		meta: {
			title: '创建收货地址',
			auth: {
				requiresAuth: false
			}
		}
	},
	{
		path: "/pages/personal/xw-dth-message",
		name: "xw-dth-message",
		meta: {
			title: '消息',
			auth: {
				requiresAuth: false
			}
		}
	},
	{
		path: "/pages/sem/sem-scan-buy",
		name: "sem-scan-buy",
		meta: {
			title: '扫一扫收购',
			auth: {
				requiresAuth: true
			}
		}
	},
	{
		path: "/pages/sem/sem-search-buy",
		name: "sem-search-buy",
		meta: {
			title: '搜索收购',
			auth: {
				requiresAuth: true
			}
		}
	},
	{
		path: "/pages/sem/xw-dth-sem-order",
		name: "sem-order",
		meta: {
			title: '订单中心',
			auth: {
				requiresAuth: true
			}
		}
	},
	{
		path: "/pages/bmhs/goods-dec-exit",
		name: "goods-dec-exit",
		meta: {
			title: '出口商品申报',
			auth: {
				requiresAuth: true
			}
		}
	},
	{
		path: '/pages/bmhs/goods-dec-import',
		name: 'goods-dec-import',
		meta: {
			title: '进口商品申报',
			auth: {
				requiresAuth: true
			}
		}
	}, {
		path: '/pages/bmhs/inspection-results',
		name: 'inspection-results',
		meta: {
			title: '查验结果确认',
			auth: {
				requiresAuth: true
			}
		}
	}, {
		path: '/pages/bmhs/vehicle-dec-exit',
		name: 'vehicle-dec-exit',
		meta: {
			title: '出境运输工具申报',
			auth: {
				requiresAuth: true
			}
		}
	},
	{
		path: '/pages/bmhs/vehicle-dec-import',
		name: 'vehicle-dec-import',
		meta: {
			title: '进境运输工具申报',
			auth: {
				requiresAuth: true
			}
		}

	},
	{
		path: '/pages/bmhs/dth-bmhs-rp',
		name: 'dth-bmhs-rp',
		meta: {
			title: '人脸识别',
			auth: {
				requiresAuth: true,
				civilStatus: true
			}
		}
	
	}
]
//导出
export default routesList
