require(["config"],function(){
	//再引入依赖的模块
	require(["jquery","lunbo"],function($,lunbo){
		console.log(lunbo);
		lunbo.init();
	})
})