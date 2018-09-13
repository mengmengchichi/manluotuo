require(["config"],function(){
	require(["jquery","listload","template","Public"],function($,list,template,Public){
		$(function(){
			Public.init(template);
			var parameter = location.search.substr(1);
			var act = parameter.split('&')[0].split('=')[1]? parameter.split('&')[0].split('=')[1] : "";
			if(act == ''){
				list.listload(template,parameter);	
				console.log(act);
			}else if(act == 'search'){
				console.log(act);
				var keywords = parameter.split('&')[1].split('=')[1];
				console.log(decodeURI(keywords));
				Public.search(decodeURI(keywords),list);
			}
			//list.init();
		})		
	})
})