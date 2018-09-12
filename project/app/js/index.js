require(["config"],function(){
	//再引入依赖的模块
	require(["jquery","lunbo","header","listload","template","detail"],function($,lunbo,header,listload,template,detail){
		$(function(){
			header.init();
			lunbo.init();
			listload.listClick(template);		
			detail.writeid();
		})
//		.done(function(){
//			console.log(2);
//			//
//		})
	})
})