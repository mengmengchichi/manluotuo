require(["config"],function(){
	//再引入依赖的模块
	require(["jquery","lunbo","header","listload","template","detail","Public"],function($,lunbo,header,listload,template,detail,Public){
		$(function(){
			header.init();
			Public.init(template,true);
			Public.index(template);
			listload.listClick(template);		
			detail.writeid();
		})
//		.done(function(){
//			console.log(2);
//			//
//		})
	})
})