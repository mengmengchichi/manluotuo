require(["config"],function(){
	require(["jquery","Public","template","detail","cookie"],function($,Public,template,detail,cookie){
		$(function(){
			Public.init(template);
			var id = location.search.substr(1);
			detail.indexToDetail(template,id);		
		})
		
	})
})