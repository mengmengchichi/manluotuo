define(function(){
	function ajaxGetData(){}
	ajaxGetData.prototype.listClick = function(){		
		var alist = $('.kindlist ul').find('a');
		for (var i = 0;i<alist.length;i++) {
			alist.eq(i).attr('id','list'+(i+1));
		}
	}	
	ajaxGetData.prototype.listload = function(template){
			var _this = this;
			var pageCount = 12;
			var clickNum;
			this.index = 1;
			var str = '';
			$.get('http://localhost/www/php/list.php',
			{id:this.id,pageCount:pageCount,index:_this.index},function(data){
			data = JSON.parse(data);
			var allData = data.alldata;
			data = data.data;
			clickNum = Math.ceil(allData / pageCount);
			//$(location).attr('href','html/list.html');
			var listHtml = template("list",{data: data});
			$("#content_con_goods").html(listHtml);
//			var listPage = template("listPage",{num:clickNum});
//			$('#pagechange').html(listPage);
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
		}).done(function(){
			_this.init(_this,clickNum);
		})		
	}
	ajaxGetData.prototype.init = function(_this,clickNum){
		$('#pagechange a').on('click',function(){	
			var str = this.innerHTML;
			if(!isNaN(Number(str))){
				//代表点击的是对应页码				
				_this.index = Number(str);
				console.log(_this.index);
				$(this).addClass('pageclick').siblings().removeClass('pageclick');
			}else if(this.id === "goprev"){
				_this.index--;
				console.log(_this.index);
				$('#pagechange a').eq(_this.index).addClass('pageclick').siblings().removeClass('pageclick');
				if(_this.index < 1) _this.index = 1;
				if(_this.index == 1){
					$(this).replaceWith('<span>上一页</span>');
				}else{
					$(this).replaceWith('<a href="javascript:;" id="goprev">上一页</a>');					
				}
			}else if(this.id === "gonext"){
				_this.index++;
				console.log(_this.index);
				$('#pagechange a').eq(_this.index).addClass('pageclick').siblings().removeClass('pageclick');
				if(_this.index > clickNum) _this.index = clickNum;
				if(_this.index == clickNum){
					$(this).replaceWith('<span>下一页</span>');
				}else{
					$(this).replaceWith('<a href="javascript:;" id="gonext">下一页</a>');
				}
			}			
		})
	}

	return new ajaxGetData();
})