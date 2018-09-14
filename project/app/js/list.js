require(["config"],function(){
	require(["jquery","listload","template","Public"],function($,list,template,Public){
		$(function(){
			Public.init(template);//渲染头和尾
			var parameter = location.search.substr(1);
			//判断点击的动作
			var act = parameter.split('&')[0].split('=')[1]? parameter.split('&')[0].split('=')[1] : "";
			if(act == ''){//以列表页加载
				list.listload(template,parameter);	
				list.searchheader();
			}else if(act == 'search'){//以搜索页加载
				var keywords = parameter.split('&')[1].split('=')[1];
//				console.log(decodeURI(keywords));
				Public.search(decodeURI(keywords));
				list.searchheader();
			}
			//list.init();
		})		
	})
})