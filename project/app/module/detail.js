define(['cookie'],function(cookieact){
	function Detail(){
		this.index = 0;
	};
	Detail.prototype.writeid = function(){
		this.ali = $('.content_wrap').find('ul li a');
		for (var i = 0;i<this.ali.length;i++) {
			this.ali.eq(i).attr('id',i+1);		
		}
		this.ali.on('click',function(e){
			e.preventDefault();
			$(location).attr('href','/html/detail.html?'+this.id);
			//_this.listload(template,this);
		})
	}
	Detail.prototype.indexToDetail = function(template,id){
		var _this = this;
		$.get('http://localhost/www/php/detail.php',
			{id:id},function(data){
			data = JSON.parse(data);			
			data[0].small_preview_url1 = data[0].small_preview_url1.split('&');
			data[0].jianjie_url1 = data[0].jianjie_url1.split('&');
			console.log(data[0]);
			//$(location).attr('href','html/list.html');
			var detailHtml = template("detail",{data: data[0]});
			$("#content_wrap").html(detailHtml);
			$('.tab').find('p').on('click',function(){
				$('.tab>div').eq($(this).index()).addClass('show').siblings().removeClass('show');
			})
			_this.preview();
			_this.tocart();
		})
	}
	Detail.prototype.preview = function(){
		var _this = this;
		var len = $('.small_preview li').length;
		$('.small_preview li').on('click',function(){
			$('.big_preview img').attr('src',$(this).find('img').attr('src'));
		})
		$('#prev').on('click',function(){
			_this.index--;
			if(_this.index < 0)_this.index = len-1;
			$('.big_preview img').attr('src',$('.small_preview li').eq(_this.index).find('img').attr('src'));
		});
		$('#next').on('click',function(){
			_this.index++;
			if(_this.index >= len)_this.index = 0;
			$('.big_preview img').attr('src',$('.small_preview li').eq(_this.index).find('img').attr('src'));
		})
	}
	
	Detail.prototype.tocart = function(){
		var total = $('#quantity').find('span');
		var len = $('#nowprice').html().length;
		var price = parseFloat($('#nowprice').html().substring(1,len - 1));
		$('#quantity a').on('click',function(){
			var count = $('#count').val();			
			if($(this).index() == 0){
				count--;				
				if(count < 1)count = 1;
				$('#count').val(count);
				total.html('￥'+ count*price +"元");
			}else{
				count++;				
				if(count > 99)count = 99;
				$('#count').val(count);
				total.html('￥'+ count*price +".00元");
			}
		})
		$('#count').on('blur',function(){
			total.html('￥'+ $(this).val()*price +".00元");
		})
		$('#cartaction a').on('click',function(e){
			e.preventDefault();
			if($(this).index() == 0){
				var cookie = cookieact.getCookie('cookie');
				var arr = cookie == "" ? [] : JSON.parse(cookie);
				for (var j = 0;j<arr.length;j++) {
					if (arr[j].id == location.search.substr(1)) {
						arr[j].count = $('#count').val();
						cookieact.setCookie('cookie',JSON.stringify(arr),30);
						var id = location.search.substr(1);
						$(location).attr('href',"/html/cart.html?"+id+"&"+$('#count').val());
						return;
					}
				}
				var obj = {
					id : location.search.substr(1),
					price : price,
					count : $('#count').val(),
				}
				arr.push(obj);
				var str = JSON.stringify(arr);
				cookieact.setCookie('cookie',str,30);
				
				var id = location.search.substr(1);
				$(location).attr('href',"/html/cart.html?id="+id+"&count="+$('#count').val());
				//console.log("/html/cart.html?"+id+"&"+$('#count').val()+"");
			}
		})
	}
	return new Detail();
})