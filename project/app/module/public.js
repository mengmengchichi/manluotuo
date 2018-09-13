//定义header模块
define(["listload","cookie","template",'lunbo',"listload"],function(list,cookieact,template,lunbo,listload){
	function Public(){
		this.flag = true;
		this.template = template;
		this.indexpage = 1;
	};

	Public.prototype.init = function(template,index){
		var _this = this;
		//1、把header的html内容加载到对应的页面上
		//2、header的交互
		$("#header").load("/html/header.html",function(){
			if(index){
				$("#lunboshow").load("/html/lunbo.html",function(){
					lunbo.init();
				});
			}	
			
			$('#search').on('click',function(e){
				e.preventDefault();
				var keywords = $('#keywords').val();
				$(location).attr('href','/html/list.html?act=search&keywords='+keywords+"");	
//				_this.search();
			});			
			list.listClick();			
			_this.index(template);
		});
		
		$('#footer').load("/html/footer.html");
	}
	
	
	Public.prototype.index = function(template){
		$('#cart').hover(function(){
			var cookie = cookieact.getCookie('cookie');
			var cookiedata = cookie == "" ? [] : JSON.parse(cookie);
			if (cookiedata.length != 0) {
				var sum = 0;				
				var obj = {};
				var id = [];
				for (var i = 0;i<cookiedata.length;i++) {
					id[i] = cookiedata[i].id;
					sum += parseInt(cookiedata[i].count);
				}
				console.log(sum);
				$('#thingcount').html(sum);
				obj.act = 'cart';
				obj.id = id;
				$.get('http://localhost/www/php/detail.php',obj,function(data){
					data = JSON.parse(data);
					for (var i = 0;i<data.length;i++) {
						for (var j = 0;j<cookiedata.length;j++) {
							if(data[i].id === cookiedata[j].id){
								data[i].count = cookiedata[j].count;
							}
						}
					}
					console.log(data);
					var showcart = template("showcartcon",{data: data});
					$("#showcart").html(showcart);
				})					
			}else{
				var str = '<li>您的购物车暂无商品 赶快选择心爱的产品吧<li>';
				$('#showcart').html(str);
			}			
		},function(){
			$("#showcart").html('');
		})
	}
	
	Public.prototype.search = function(keywords,list){	
			var _this = this;
			var obj = {
				keywords:keywords,
				act:"search",
				pageCount:12,
				index:_this.indexpage
			};			
			$.get('http://localhost/www/php/detail.php',obj,function(data){
				data = JSON.parse(data);
				var clickNum;								
				var pageCount = 12;
				var allData = data.length;
				clickNum = Math.ceil(allData / pageCount);
				//$(location).attr('href','html/list.html');	
				console.log(data);
				var listHtml = template("list",{data: data});
				$("#content_con_goods").html(listHtml);
				
//				var listPage = template("listPage",{num:clickNum});
//				$('#pagechange').html(listPage);	
				_this.listsearch(_this.template,clickNum,$('#search'));
//				
				
			})
	}
		
	Public.prototype.listsearch = function(template,clickNum,alist){
		var _this = this;
		var str = '';
		if (_this.flag) {
			str += '<a href="javascript:;" id="goprev">上一页</a>';
			for (var i = 1;i<=clickNum;i++) {				
				if (i == 1) {
					str+='<a href="javascript:;" class = "pageclick">'+ i +'</a>';
				}else{
					str+='<a href="javascript:;">'+ i +'</a>';
				}
			}
			str += '<a href="javascript:;" id="gonext">下一页</a>';
			$('#pagechange').html(str);	
			if(_this.indexpage == clickNum){
				$('#gonext').replaceWith('<span id="gonext">下一页</span>');
			}else{
				$('#gonext').replaceWith('<a href="javascript:;" id="gonext">下一页</a>');
			}
			//判断分页页面是否在上界限上
			if(_this.indexpage == 1){
				$("#goprev").replaceWith('<span id = "goprev">上一页</span>');
			}else{
				$("#goprev").replaceWith('<a href="javascript:;" id="goprev">上一页</a>');					
			}
			_this.listchange(clickNum,template,alist);
			_this.flag = false;
		}
	}
	
	Public.prototype.listchange = function(clickNum,template,alist){
		var _this = this;
		$('#pagechange a').on('click',function(){	
			var str = this.innerHTML;
			if(!isNaN(Number(str))){
				//代表点击的是对应页码				
				_this.indexpage = Number(str);
				$(this).addClass('pageclick').siblings().removeClass('pageclick');
				//判断分页页面是否在下界限上
				if(_this.indexpage == clickNum){
					$('#gonext').replaceWith('<span id="gonext">下一页</span>');
				}else{
					//判断分页页面是否在上界限上
					if(_this.indexpage == 1){
						$("#goprev").replaceWith('<span id = "goprev">上一页</span>');
					}else{
						$("#goprev").replaceWith('<a href="javascript:;" id="goprev">上一页</a>');	
						$('#gonext').replaceWith('<a href="javascript:;" id="gonext">下一页</a>');
						_this.listchange(clickNum,template,alist);
					}
				}				
			}else if(this.id === "goprev"){
				_this.indexpage--;	//分页页面向前一页		
				if(_this.indexpage < 1) _this.indexpage = 1;
				$('#pagechange a').eq(_this.indexpage).addClass('pageclick').siblings().removeClass('pageclick');
				//判断分页页面是否在上界限上
				if(_this.indexpage == 1){
					$(this).replaceWith('<span id="goprev">上一页</span>');
				}else{
					$("#gonext").replaceWith('<a href="javascript:;" id="gonext">下一页</a>');
					$(this).replaceWith('<a href="javascript:;" id="goprev">上一页</a>');			_this.listchange(clickNum,template,alist);		
				}
			}else if(this.id === "gonext"){
				_this.indexpage++;//分页页面向后一页						
				if(_this.indexpage > clickNum) _this.indexpage = clickNum;
				$('#pagechange').children().eq(_this.indexpage).addClass('pageclick').siblings().removeClass('pageclick');
				//判断分页页面是否在下界限上
				if(_this.indexpage == clickNum){
					$(this).replaceWith('<span id="gonext">下一页</span>');
				}else{
					$(this).replaceWith('<a href="javascript:;" id="gonext">下一页</a>');
					$("#goprev").replaceWith('<a href="javascript:;" id="goprev">上一页</a>');
					_this.listchange(clickNum,template,alist);
				}
			}
			_this.search(template,alist);//判断点击的哪个按钮进行ajax请求
		})
	}
	
	
 	return new Public();
})