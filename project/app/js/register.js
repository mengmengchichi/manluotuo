require(["config"],function(){
	//再引入依赖的模块
	require(["jquery","regist"],function($,regist){
		$(function(){
			regist();
		})		
	})
})