define(function(){
	function regist(){
			var obj = {};
			var inputs = $("input");
			var arr = ['flase','flase','false','false'];
			var reg = /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/;
			inputs.on("blur",function(){
				if(this.id === "username"){
					if($(this).val().length < 3){
						$("#name_notice").html("- 用户名长度不能少于 3 个字符。");
					}else{
						$("#name_notice").html("* 可以注册");
						obj.username = $(this).val();
						arr[0] = 'true';
					}		
				}else if(this.id === "email"){	
					var mail = $(this).val();
					if(!reg.test(mail)){
						$("#email_notice").html('-请输入正确的邮箱地址。')
					}else{						
						$("#email_notice").html('-可以注册');
						obj.email = $(this).val();
						arr[1] = 'true';
					}
				}else if (this.id === "passwords") {					
					if ($(this).val().length < 6) {
						$("#password_notice").html(' - 登录密码不能少于 6 个字符。');							
					}else{
						$("#password_notice").html('-可以注册');
						obj.pwd = hex_md5($(this).val());						
						arr[2] = 'true';
					}
				}else if(this.id === "password_ok"){
					if (hex_md5($(this).val()) != obj.pwd) {
						$("#password_ok_notice").html(' - 两次输入密码不一致');
					}else{
						$("#password_ok_notice").html('-密码正确');
						arr[3] = true;
					}					
				}
			})
			$('#passwords').on('keyup',function(){
				if($(this).val() != ''){
					var numReg = /^\d+$/;//纯数字
				 	var letterReg = /^[a-z]+$/i; // 纯字母
				 	var charReg = /^\W+$/; //纯特殊字符			 	
				 	var _numReg = /\d+/; //含有数字
				 	var _letterReg = /[a-z]/i; // 含有字母
				 	var _charReg = /\W+/; //含有特殊字符
					if(numReg.test($(this).val()) || letterReg.test($(this).val()) || charReg.test($(this).val())){
						$('.pwdpower p').css('border-bottom','2px solid rgb(218, 218, 218)');
						$('#pwd_l').css('border-color','red');
					}else if(_numReg.test($(this).val()) && _letterReg.test($(this).val()) && _charReg.test($(this).val())){
						$('.pwdpower p').css('border-bottom','2px solid rgb(218, 218, 218)');					
						$('#pwd_h').css('border-color','green');
					}else{
						$('.pwdpower p').css('border-bottom','2px solid rgb(218, 218, 218)');
						$('#pwd_m').css('border-color',"rgb(255, 153, 0)");					
					}													
				}
				else{
					$('.pwdpower p').css('border-bottom','2px solid rgb(218, 218, 218)');
				}				
			});
			$('form').submit(function(e){
				e.preventDefault();
				if(!arr.some(function(value,index){
					return arr[index] == 'false';
				})){
					$.post('http://localhost/www/php/user.php',obj,function(data){
						if(data){
							alert('注册成功！请登录');
							$(location).attr('href','/html/denglu.html');
						}
					})					
				}
			})
	}
	return regist;
})