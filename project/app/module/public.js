//定义header模块
define(["listload","cookie","template",'lunbo',"listload"],function(list,cookieact,template,lunbo,listload){
	function Public(){
		this.flag = true;
		this.template = template;
		this.indexpage = 1;//搜索页的当前页面
	};
	/*
	 	template	作为参数传给index函数
	 	index		判断是否是首页
	 * 
	 * */
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
			var usercookie = cookieact.getCookie('user');
			//将cookie存入arr
			var arr = usercookie == "" ? [] : JSON.parse(usercookie);
			if(usercookie){
				var loginstr = "欢迎"+arr[0].username+"来到漫骆驼!  <a href='/html/user.html' style='color:#FA8072'>用户中心</a>&nbsp;<a href='javascrpit:;' style='text-decoration:underline;color:blue;'>退出</a>"
				$('#header_login').html(loginstr);
			}
			
			//搜索框交互动作为 搜索
			$('#search').on('click',function(e){
				e.preventDefault();
				var keywords = $('#keywords').val();
				$(location).attr('href','/html/list.html?act=search&keywords='+keywords+"");	
//				_this.search();
			});	
			//搜索提示 交互动作为搜索
			$('.search a').on('click',function(){
				var keywords = $(this).html();
				$(location).attr('href','/html/list.html?act=search&keywords='+keywords+"");	
			});
			
			list.listClick();		
			_this.index(template);
		});
		//加载尾部html
		$('#footer').load("/html/footer.html",function(){
			_this.toTop();
		});
	}
	
	/*
	 	给购物车按钮绑定事件
	 	template	加载模板引擎
	 * 
	 * */
	Public.prototype.index = function(template){
		var sum = 0;//显示购物车商品总数量
		var id = [];//存放cookie里面的id
		var cookie = cookieact.getCookie('cookie');
		var cookiedata = cookie == "" ? [] : JSON.parse(cookie);
		for (var i = 0;i<cookiedata.length;i++) {
			id[i] = cookiedata[i].id;
			sum += parseInt(cookiedata[i].count);
		}
		$('#thingcount').html(sum);
		
		//购物车按钮显示商品部分信息
		$('#cart').hover(function(){			
			if (cookiedata.length != 0) {
								
				var obj = {};//ajax传入参数  
				//包括   事件动作    购物车商品id
				obj.act = 'cart';
				obj.id = id;
				$.get('http://localhost/www/php/detail.php',obj,function(data){
					data = JSON.parse(data);
					//根据返回的数据获取cookie存放的商品数量
					for (var i = 0;i<data.length;i++) {
						for (var j = 0;j<cookiedata.length;j++) {
							if(data[i].id === cookiedata[j].id){
								data[i].count = cookiedata[j].count;
							}
						}
					}
					console.log(data);
					//渲染商品信息
					var showcart = template("showcartcon",{data: data});
					$("#showcart").html(showcart);
				})					
			}else{
				//购物车里没有商品
				var str = '<li>您的购物车暂无商品 赶快选择心爱的产品吧!<li>';
				$('#showcart').html(str);
			}			
		},function(){
			$("#showcart").html('');
		})
	}
	/*
	 	给搜索框的交互函数
	 	keywords	搜索框输入的字符串
	 		
	 * 
	 * */
	Public.prototype.search = function(keywords){	
			var _this = this;
			var obj = {
				keywords:keywords,
				act:"search",//列表页加载时的动作
				pageCount:12,
				index:_this.indexpage
			};			
			//按照关键词搜索数据库
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
				//渲染搜索页按钮
				_this.listsearch(_this.template,clickNum,$('#search'));
//				
				
			})
	}
		
	Public.prototype.listsearch = function(template,clickNum,alist){
		var _this = this;
		var str = '';
		if (_this.flag) {//只渲染一次按钮
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
			
			//判断渲染页面当前页数在哪里
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
	/*
	 	分页按钮交互函数
	 	clickNum	按钮数量
	 	template	作为参数传递给listsearch函数
	 	alist		作为参数传递给listsearch函数
	 	
	 * */
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
	/*
	 	回到顶部函数
	 * */
	Public.prototype.toTop = function(){
		$('.totop a').on('click',function(){
			$(document).scrollTop(0);
		})
	}
	
 	return new Public();
})