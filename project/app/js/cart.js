require(["config"],function(){
	require(["jquery","denglu","Public","tocart","template","listload","cookie"],function($,login,Public,tocart,template,list,cookieact){		
		$(function(){
			Public.init(template);
			var cookie = cookieact.getCookie('cookie');
			if(cookie != ''){
				var id = location.search.substr(1)
				tocart.init(template,id);
			}else{
				var str = '<tr id="nocookie"><td><p>您的购物车里还没有商品，快去采购吧!<a href="/">继续购物</a></p></td></tr>';
				$('#cartbody')[0].innerHTML += str;
				$('#cartbody').tr
			}			
			list.listClick(template);
		})		
	})
})