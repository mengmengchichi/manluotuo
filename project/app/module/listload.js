/*
 定义列表页加载和分页模块
 * 
 * */

define(['tocart','cookie'],function(tocart,cookieact){
	function ajaxGetData(){
		this.flag = true;//页面第一次加载时 加载分页按钮
		this.index = 1;	//判断当前页面在第 index 页
	}
	
	//给首页侧边导航列添加id 以判断查询哪个数据库
	ajaxGetData.prototype.listClick = function(template){	
		var _this = this;		
		var alist = $('.kindlist ul').find('a');
		for (var i = 0;i<alist.length;i++) {
			alist.eq(i).attr('id','list'+(i+1));
		}
		alist.on('click',function(e){
			e.preventDefault();
			//首页侧边导航点击时
			//阻止默认事件  跳到列表页  并将自身id传过去
			$(location).attr('href','/html/list.html?'+this.id);
			//_this.listload(template,this);
		})
	}	
	
	/*
	 * 	列表页面加载
	 	template  用于加载模板引擎
	 * 	alist   接收传过来的 id值 用于数据库搜索
	 * */
	
	ajaxGetData.prototype.listload = function(template,alist){		
			var _this = this;
			var pageCount = 12;//每个列表页的小模块
			var clickNum;								
			$.get('http://localhost/www/php/list.php',
			{id:alist,pageCount:pageCount,index:_this.index},function(data){
			//ajax传入数据为  id  页面模块个数   页面当前位置
			data = JSON.parse(data);
			var allData = data.alldata;//传回的数据库总数据条数
			data = data.data;//传回的当前页面模块的数据
//			console.log(data);
			clickNum = Math.ceil(allData / pageCount);//页面分页按钮个数；
			//$(location).attr('href','html/list.html');
			var listHtml = template("list",{data: data});//定义模板引擎
			$("#content_con_goods").html(listHtml);//插入模板引擎
//			var listPage = template("listPage",{num:clickNum});
//			$('#pagechange').html(listPage);	
			_this.listClick();//给列表页侧边导航又加上id
			_this.listshow(template,clickNum,alist);//渲染分页按钮
			
			$('.item_tocart a').on('click',function(){
				var id = $(this).parent().parent().children('a').attr('href').split('?')[1];
				console.log(id);
				var cookie = cookieact.getCookie('cookie');
				//将cookie存入arr
				var arr = cookie == "" ? [] : JSON.parse(cookie);
				var obj = {
					id : id
					count:1
				}
				arr.push(obj);
				var str = JSON.stringify(arr);
				cookieact.setCookie('cookie',str,30,'/');
				$(location).attr('href',"/html/cart.html?"+id+"&"+1);
			})

		})		
	}
	
	/*
	 	分页按钮加载
	 	template  当做参数传递给listload函数
	 	clickNum  分页按钮个数
	 	alist     当做参数传递给listload函数
	 * 
	 * */
	ajaxGetData.prototype.listshow = function(template,clickNum,alist){
		var _this = this;
		var str = '';
		if (_this.flag) {
			str += '<a href="javascript:;" id="goprev">上一页</a>';
			//拼接分页按钮
			for (var i = 1;i<=clickNum;i++) {				
				if (i == 1) {
					str+='<a href="javascript:;" class = "pageclick">'+ i +'</a>';
				}else{
					str+='<a href="javascript:;">'+ i +'</a>';
				}
			}
			str += '<a href="javascript:;" id="gonext">下一页</a>';
			$('#pagechange').html(str);//渲染按钮
			
			//判断当前页位置  给上一页和下一页按钮做操作
			
			//判断分页页面是否在下界限上
			if(_this.index == clickNum){
				$('#gonext').replaceWith('<span id="gonext">下一页</span>');
			}else{
				$('#gonext').replaceWith('<a href="javascript:;" id="gonext">下一页</a>');
			}
			//判断分页页面是否在上界限上
			if(_this.index == 1){
				$("#goprev").replaceWith('<span id = "goprev">上一页</span>');
			}else{
				$("#goprev").replaceWith('<a href="javascript:;" id="goprev">上一页</a>');					
			}
			_this.init(clickNum,template,alist);//给按钮绑定事件
			_this.flag = false;
		}
	}
	/*
	 	分页按钮事件绑定
	 	clickNum	判断页面界限
	 	template 	作为参数传递给listload
	 	alist		作为参数传递给listload
	 * 
	 * */
	ajaxGetData.prototype.init = function(clickNum,template,alist){
		var _this = this;
		$('#pagechange a').on('click',function(){	
			var str = this.innerHTML;//根据按钮显示内容判断情况
			//点击的是数字按钮
			if(!isNaN(Number(str))){
				//代表点击的是对应页码				
				_this.index = Number(str);
				$(this).addClass('pageclick').siblings().removeClass('pageclick');
				//判断分页页面是否在下界限上
				if(_this.index == clickNum){
					$('#gonext').replaceWith('<span id="gonext">下一页</span>');
				}else{
					//判断分页页面是否在上界限上
					if(_this.index == 1){
						$("#goprev").replaceWith('<span id = "goprev">上一页</span>');
					}else{
						$("#goprev").replaceWith('<a href="javascript:;" id="goprev">上一页</a>');	
						$('#gonext').replaceWith('<a href="javascript:;" id="gonext">下一页</a>');
						_this.init(clickNum,template,alist);
					}
				}				
			}else if(this.id === "goprev"){//点击的是上一页按钮
				_this.index--;	//分页页面向前一页		
				if(_this.index < 1) _this.index = 1;
				$('#pagechange a').eq(_this.index).addClass('pageclick').siblings().removeClass('pageclick');
				//判断分页页面是否在上界限上
				if(_this.index == 1){
					$(this).replaceWith('<span id="goprev">上一页</span>');
				}else{
					$("#gonext").replaceWith('<a href="javascript:;" id="gonext">下一页</a>');
					$(this).replaceWith('<a href="javascript:;" id="goprev">上一页</a>');			_this.init(clickNum,template,alist);//渲染页面		
				}
			}else if(this.id === "gonext"){//点击的是下一页按钮
				_this.index++;//分页页面向后一页						
				if(_this.index > clickNum) _this.index = clickNum;
				$('#pagechange').children().eq(_this.index).addClass('pageclick').siblings().removeClass('pageclick');
				//判断分页页面是否在下界限上
				if(_this.index == clickNum){
					$(this).replaceWith('<span id="gonext">下一页</span>');
				}else{
					$(this).replaceWith('<a href="javascript:;" id="gonext">下一页</a>');
					$("#goprev").replaceWith('<a href="javascript:;" id="goprev">上一页</a>');
					_this.init(clickNum,template,alist);//渲染页面
				}
			}
			_this.listload(template,alist);//判断点击的哪个按钮进行ajax请求
		})
	}
	
	ajaxGetData.prototype.searchheader = function(){	
		//判断是否是搜索交互
		if(location.search.substr(1).search('&') != -1){
			var words = location.search.substr(1).split('&')[1].split('=')[1]? location.search.substr(1).split('&')[1].split('=')[1] : "";
			var as = $('.content_header').find('a');
			as.each(function(i,n){
				$(n).html() == decodeURI(words)? $(n).addClass('click') : '';
			})
		}
		
		//列表头部热门搜索栏 交互为搜索
		$('.content_header').find('a').on('click',function(){
			var keywords = $(this).html();
			$(location).attr('href','/html/list.html?act=search&keywords='+keywords+"");				
			//.html() == words? 
		})
	}
				
	
	return new ajaxGetData();
})