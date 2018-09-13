define(function(){
	function ajaxGetData(){
		this.flag = true;
		this.index = 1;	
	}
	ajaxGetData.prototype.listClick = function(template){	
		var _this = this;		
		var alist = $('.kindlist ul').find('a');
		for (var i = 0;i<alist.length;i++) {
			alist.eq(i).attr('id','list'+(i+1));
		}
		alist.on('click',function(e){
			e.preventDefault();
			$(location).attr('href','/html/list.html?'+this.id);
			//_this.listload(template,this);
		})
	}	
	ajaxGetData.prototype.listload = function(template,alist){		
			var _this = this;
			var pageCount = 12;
			var clickNum;								
			$.get('http://localhost/www/php/list.php',
			{id:alist,pageCount:pageCount,index:_this.index},function(data){
			data = JSON.parse(data);
			var allData = data.alldata;
			data = data.data;
//			console.log(data);
			clickNum = Math.ceil(allData / pageCount);
			//$(location).attr('href','html/list.html');
			var listHtml = template("list",{data: data});
			$("#content_con_goods").html(listHtml);
//			var listPage = template("listPage",{num:clickNum});
//			$('#pagechange').html(listPage);	
			_this.listClick();
			_this.listshow(template,clickNum,alist);
		})		
	}
	ajaxGetData.prototype.listshow = function(template,clickNum,alist){
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
			_this.init(clickNum,template,alist);
			_this.flag = false;
		}
	}
	
	ajaxGetData.prototype.init = function(clickNum,template,alist){
		var _this = this;
		$('#pagechange a').on('click',function(){	
			var str = this.innerHTML;
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
			}else if(this.id === "goprev"){
				_this.index--;	//分页页面向前一页		
				if(_this.index < 1) _this.index = 1;
				$('#pagechange a').eq(_this.index).addClass('pageclick').siblings().removeClass('pageclick');
				//判断分页页面是否在上界限上
				if(_this.index == 1){
					$(this).replaceWith('<span id="goprev">上一页</span>');
				}else{
					$("#gonext").replaceWith('<a href="javascript:;" id="gonext">下一页</a>');
					$(this).replaceWith('<a href="javascript:;" id="goprev">上一页</a>');			_this.init(clickNum,template,alist);		
				}
			}else if(this.id === "gonext"){
				_this.index++;//分页页面向后一页						
				if(_this.index > clickNum) _this.index = clickNum;
				$('#pagechange').children().eq(_this.index).addClass('pageclick').siblings().removeClass('pageclick');
				//判断分页页面是否在下界限上
				if(_this.index == clickNum){
					$(this).replaceWith('<span id="gonext">下一页</span>');
				}else{
					$(this).replaceWith('<a href="javascript:;" id="gonext">下一页</a>');
					$("#goprev").replaceWith('<a href="javascript:;" id="goprev">上一页</a>');
					_this.init(clickNum,template,alist);
				}
			}
			_this.listload(template,alist);//判断点击的哪个按钮进行ajax请求
		})
	}

	return new ajaxGetData();
})