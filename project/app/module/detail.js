define(['cookie'],function(cookieact){
	function Detail(){
		this.index = 0;
	};
	
	/*
	 	给首页商品添加id
	 	
	 * 	
	 * */
	Detail.prototype.writeid = function(){
		//找到所有商品的 a 链接
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
	
	/*
	 	从列表页跳到详情页函数
	 	template	加载模板引擎
	 	id			商品id
	 * 
	 * */
	Detail.prototype.indexToDetail = function(template,id){
		var _this = this;
		//ajax获取数据
		$.get('http://localhost/www/php/detail.php',
			{id:id},function(data){
			data = JSON.parse(data);
			//切割小预览图片的路径
			data[0].small_preview_url1 = data[0].small_preview_url1.split('&');
			//切割简介图片路径
			data[0].jianjie_url1 = data[0].jianjie_url1.split('&');
			console.log(data[0]);
			//$(location).attr('href','html/list.html');
			//加载并插入模板引擎
			var detailHtml = template("detail",{data: data[0]});
			$("#content_wrap").html(detailHtml);
			//简介部分选项卡事件
			$('.tab').find('p').on('click',function(){
				$('.tab>div').eq($(this).index()).addClass('show').siblings().removeClass('show');
			})
			_this.preview();//加载完成后 再加载预览交互
			_this.tocart();//加载完成后 再绑定购物车添加事件
		})
	}
	
	/*
	 	详情预览交互
	 	
	 * 
	 * */
	Detail.prototype.preview = function(){
		var _this = this;
		//根据小预览图片个数生成预览按钮
		var len = $('.small_preview li').length;
		//将大预览图片路径改为当前图片路径
		$('.small_preview li').on('click',function(){
			$('.big_preview img').attr('src',$(this).find('img').attr('src'));
		})
		//替换图片路径
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
	/*
	 	将商品加入购物车
	 * 
	 * */
	Detail.prototype.tocart = function(){
		//获取商品总价元素
		var total = $('#quantity').find('span');
		//获取商品价格，转换为数字类型
		var len = $('#nowprice').html().length;
		var price = parseFloat($('#nowprice').html().substring(1,len - 1));
		//给商品数量的加减绑定交互
		$('#quantity a').on('click',function(){
			//获取商品当前数量
			var count = $('#count').val();	
			//判断点击的按钮是 加或减
			if($(this).index() == 0){
				count--;				
				if(count < 1)count = 1;//商品数量最低为 1
				$('#count').val(count);
				total.html('￥'+ count*price +"元");//实时修改商品总价
			}else{
				count++;				
				if(count > 99)count = 99;//商品数量最高为99
				$('#count').val(count);
				total.html('￥'+ count*price +".00元");//实时修改商品总价
			}
		})
		//手动输入商品数量时显示总价
		$('#count').on('blur',function(){
			total.html('￥'+ $(this).val()*price +".00元");
		})
		/*
		 	加入购物车
		 	将商品信息存入cookie
		 	跳转到购物车页面  携带参数   id  count
		 * */
		$('#cartaction a').on('click',function(e){
			e.preventDefault();
			if($(this).index() == 0){
				var cookie = cookieact.getCookie('cookie');
				//将cookie存入arr
				var arr = cookie == "" ? [] : JSON.parse(cookie);
				for (var j = 0;j<arr.length;j++) {
					//如果存入的cookie已存在  只修改cookie信息
					if (arr[j].id == location.search.substr(1)) {
						arr[j].count = $('#count').val();
						cookieact.setCookie('cookie',JSON.stringify(arr),30,'/');
						var id = location.search.substr(1);
						$(location).attr('href',"/html/cart.html?"+id+"&"+$('#count').val());
						return;
					}
				}
				//如果没有存入cookie，将当前信息存入cookie
				var obj = {
					id : location.search.substr(1),
					price : price,
					count : $('#count').val(),
				}
				arr.push(obj);
				var str = JSON.stringify(arr);
				cookieact.setCookie('cookie',str,30,'/');
				
				var id = location.search.substr(1);
				$(location).attr('href',"/html/cart.html?id="+id+"&count="+$('#count').val());
				//console.log("/html/cart.html?"+id+"&"+$('#count').val()+"");
			}
		})
	}
	return new Detail();
})