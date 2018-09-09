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
		"denglu":"module/denglu"
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
			deps:["jquery"]
		}
	}
})