"use strict";define(function(){return function(){$("#check"),$("form").submit(function(t){t.preventDefault();var e=$("#username").val(),n=$("#pwd").val();""==e||""==n?""==e&&""==n?alert("-用户名不能为空。\n-登录密码不能为空。"):(""==e&&alert("-用户名不能为空。"),""==n&&alert("-登录密码不能为空。")):(n=hex_md5(n),$.post("http://localhost/www/php/denglu.php",{username:e,pwd:n},function(t){(t=JSON.parse(t))&&(alert("登录成功！"),$(location).attr("href","/html/user.html"))}))})}});