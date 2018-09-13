define(['cookie'],function(cookieact){
	function toCart(){}
	toCart.prototype.init = function(template,id){
		var _this = this;
		var id = [];
		var cookie = cookieact.getCookie('cookie');
		var arr = cookie == "" ? [] : JSON.parse(cookie);
		for (var i = 1;i<=arr.length;i++) {
			id[i-1] = arr[i-1].id;
		}
		console.log(cookie)
		var obj = {};
		obj.id = id;
		obj.act = 'cart';
		$.get('http://localhost/www/php/detail.php',obj,function(data){
			data = JSON.parse(data);			
			for (var i = 0;i<data.length;i++) {
				for (var j = 0;j<arr.length;j++) {
					if(data[i].id === arr[j].id){
						data[i].count = arr[j].count;
					}
				}
			}
//			data[0].small_preview_url1 = data[0].small_preview_url1.split('&');
			//data[0].jianjie_url1 = data[0].jianjie_url1.split('&');
			console.log(data);
			var cartHtml = template("cartcontent",{data: data});
			$("#cartbody").html(cartHtml);
			_this.action(data);
		})
	}
	toCart.prototype.action = function(data){
		var cookie = cookieact.getCookie('cookie');
		var arr = JSON.parse(cookie);
		$('.delthis').on('click',function(){
			if (confirm('确认移除该商品？')) {
				$('#cartbody tr').remove();
				var thisurl = $(this).parent().parent().find('.imgurl img').attr('src').split('.')[0].split('/');
				thisurl = thisurl[thisurl.length - 1];
				console.log(thisurl);
				for (var j = 0;j<data.length;j++) {
					if(data[j].url == thisurl){
						var thisdata = data[j];
					}
				}
				console.log(thisdata);
				for (var i = 0;i<arr.length;i++) {
					if (arr[i].id == thisdata.id) {
						cookieact.removeCookie(arr[i]);
					}
				}
				
			}			
		})
		$('.actioncart input').on('click',function(){
			if($(this).index() == 0){
				$("#cartbody .choose:checked").parent().parent().remove();
				
				
			}else if($(this).index() == 1){
				$('#cartbody').find('tr').remove();
				$(location).attr('href','/');
			}
		})
	}
	return new toCart();
})