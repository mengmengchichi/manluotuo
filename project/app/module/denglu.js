define(['cookie'],function(cookieact){
	function login(){
		var remember = $('#check');
		//表单提交事件
		$('form').submit(function(e){
			e.preventDefault();
			var username = $("#username").val();
			var pwd = $("#pwd").val();
			//判断账号密码是否为空
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
					//用获取的账号名和密码去数据库匹配
					$.post('http://localhost/www/php/denglu.php',{username:username,pwd:pwd},function(data){
						data = JSON.parse(data);
						if(data){
							alert('登录成功！');
							//登录成功后存放用户cookie信息
							var arr = [];
							var obj = {
								username : username,
								cart : false
							};
							arr.push(obj);
							var str = JSON.stringify(arr);
							cookieact.setCookie('user',str,7,'/');
							$(location).attr('href','/html/user.html');							
						}else{
							alert("登录失败，请重试");
						}
					})					
				}
			})
		}
		return login;
	})