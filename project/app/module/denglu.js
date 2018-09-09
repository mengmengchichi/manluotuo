define(function(){
	$(function(){
		var sub = $("#sub");
		var remember = $('#check');
		sub.on("click",function(){
			var username = $("#username").val();
			var pwd = $("#pwd").val();
			if(!(username != '' && pwd != '')){
				username ==''? alert('-用户名不能为空。');
				pwd == ''? alert('-登录密码不能为空。');
				(username == '' && pwd == '')? alert('-用户名不能为空。-登录密码不能为空。');
			}
			$.post("denglu.php",{username:username,pwd:pwd},function(data){
				if(data){
					window.location.href = '/html/user.html';
				}			
			})
		})
	})
	
})