require(["config"],function(){
	require(["jquery","denglu","Public","tocart","template","listload"],function($,login,Public,tocart,template,list){		
		$(function(){
			Public.init();
			var id = location.search.substr(1)
			tocart.init(template,id);
			list.listClick(template);
		})		
	})
})