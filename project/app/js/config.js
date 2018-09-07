require.config({
	baseUrl: "/",
	paths: {
		"jquery": "libs/jquery-1.12.4",
//		"tab": "module/tab",
//		"toast": "module/toast",
		"template": "libs/template-web",
//		"url": "module/url",
		"lunbo":"module/lunbo",
		"header":"module/header"
	},
	shim: {
//		toast:{
//			deps:["jquery"]
//		},
		lunbo:{
			deps:["jquery"]
		}
	}
})