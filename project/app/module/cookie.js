/*
 定义cookie对象类型模块
 用于cookie操作
 * 
 * */

define(function(){
	function Cookie(){}
	//定义设置cookie函数   参数：字段值 有效时间  存放目录
	Cookie.prototype.setCookie = function(key,value,day,path){
		if(day && path){
			var d = new Date();
			d.setDate(d.getDate()+day);
			document.cookie = key + "=" + value + ";expires=" + d + '; path=' + path;
		}else{
			document.cookie = key + "=" + value;
		}	
	}	
	
	//定义获取cookie函数  根据主键值获取
	Cookie.prototype.getCookie = function(key){
			if(document.cookie){
				var str = document.cookie;
				var arr = str.split("; ");
				for(var i = 0; i < arr.length; i++){
					var item = arr[i].split("=");
					if(item[0] == key){
						return item[1];
					}
				}
				return "";
			}else{
				return "";
			}	
		}
	
	//定义删除cookie函数  将cookie优效日期改为之前的时间  cookie自动会删除
	Cookie.prototype.removeCookie = function(key){
		this.setCookie(key,"",-1);
	}					

	return new Cookie();
})