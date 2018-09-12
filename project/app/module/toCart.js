define(function(){
	function toCart(){}
	toCart.prototype.init = function(template,id){
		var _this = this;
		$.get('http://localhost/www/php/detail.php',{id:id.split('&')[0],act:"cart"},function(data){
			data = JSON.parse(data);
			data[0].count = id.split('&')[1];
//			data[0].small_preview_url1 = data[0].small_preview_url1.split('&');
			//data[0].jianjie_url1 = data[0].jianjie_url1.split('&');
			var cartHtml = template("cartcontent",{data: data[0]});
			$("#cartbody").html(cartHtml);
			_this.action();
		})
	}
	toCart.prototype.action = function(){
		$('.delthis').on('click',function(){
			if (confirm('确认移除该商品？')) {
				$('#cartbody tr').remove();
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