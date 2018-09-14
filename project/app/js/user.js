require(["config"],function(){
	require(["jquery","denglu","template","Public"],function($,login,template,Public){		
		$(function(){
			login();
			Public.init(template);
		})		
	})
})