require(["config"],function(){
	require(["jquery","denglu","Public","template"],function($,login,Public,template){		
		$(function(){
			login();
			Public.init(template);
		})		
	})
})