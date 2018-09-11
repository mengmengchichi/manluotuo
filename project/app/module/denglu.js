define(function(){
	function login(){
		var remember = $('#check');
		$('form').submit(function(e){
			e.preventDefault();
			var username = $("#username").val();
			var pwd = $("#pwd").val();
			if(!(username != '' && pwd != '')){				
				if(username == '' && pwd == ''){
					alert('-用户名不能为空。\n-登录密码不能为空。');
				}
				else{
					username ==''? alert('-用户名不能为空。') : "";
					pwd == ''? alert('-登录密码不能为空。'): "";
				}
			}else{
					pwd = hex_md5(pwd);
					$.post('http://localhost/www/php/denglu.php',{username:username,pwd:pwd},function(data){
						data = JSON.parse(data);
						if(data){
							alert('登录成功！');
							$(location).attr('href','/html/user.html');
						}
					})					
				}
			})
		}
		return login;
	})