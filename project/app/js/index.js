require(["config"],function(){
	//再引入依赖的模块
	require(["jquery","lunbo","header"],function($,lunbo,header){
		lunbo.init();
	})
})