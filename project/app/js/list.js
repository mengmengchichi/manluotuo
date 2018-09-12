require(["config"],function(){
	require(["jquery","Public","listload","template"],function($,Public,list,template){
		$(function(){
			Public.init();
			var id = location.search.substr(1);
			list.listload(template,id);			
			//list.init();
		})		
	})
})