require(["config"],function(){
	//再引入依赖的模块
	require(["jquery","lunbo","header","listload","template"],function($,lunbo,header,listload,template){
		header.init();
		lunbo.init();
		listload.listClick();
	})
})