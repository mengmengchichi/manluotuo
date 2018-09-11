require.config({
	baseUrl: "/",
	paths: {
		"jquery": "libs/jquery-1.12.4",
//		"tab": "module/tab",
//		"toast": "module/toast",
		"template": "libs/template-web",
//		"url": "module/url",
		"lunbo":"module/lunbo",
		"Public":"module/public",
		"header":"module/header",
		"denglu":"module/denglu",
		"regist":"module/regist",
		"md5":"libs/md5",
		"listload":"module/listload"
	},
	shim: {
		Public:{
			deps:["jquery"]
		},
		lunbo:{
			deps:["jquery"]
		},
		header:{
			deps:["jquery"]
		},
		denglu:{
			deps:["jquery","md5"]
		},
		regist:{
			deps:["jquery","md5"]
		},
		listload:{
			deps:["jquery","template"]
		}
	}
})