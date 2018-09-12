define(function(){
	function Cookie(){}
	Cookie.prototype.setCookie = function(key,value,day){
		if(day){
			var d = new Date();
			d.setDate(date.getDate()+day);
			document.cookie = key + "=" + value + ";expires=" + d;
		}else{
			document.cookie = key + "=" + value;
		}	
	}	
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
	Cookie.prototype.removeCookie = function(){
		this.setCookie(key,"",-1);
	}		
			

	
	return new Cookie();
})