define(function(){
	function regist(){
		$(function(){
			var obj = {};
			var inputs = $("input");
			inputs.on("blur",function(){
				if(this.id === "username"){
					if($(this).val().length < 3){
						$("#name_notice").html("- 用户名长度不能少于 3 个字符。");
					}else{
						$("#name_notice").html("* 可以注册");
						obj.username = $(this).val();
					}		
				}else if(this.id === ""){
					
				}
			})
		})
	}
})