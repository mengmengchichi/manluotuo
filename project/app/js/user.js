require(["config"],function(){
	require(["jquery","denglu","Public"],function($,login,Public){		
		$(function(){
			login();
			Public.init();
		})		
	})
})