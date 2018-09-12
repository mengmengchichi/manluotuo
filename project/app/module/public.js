//定义header模块
define(["listload"],function(list){
	function Public(){};

	Public.prototype.init = function(){
		//1、把header的html内容加载到对应的页面上
		//2、header的交互
		$("#header").load("/html/header.html",function(){
			list.listClick();
		});
		$('#footer').load("/html/footer.html");
	}
	return new Public();
})