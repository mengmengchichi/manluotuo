"use strict";define(["cookie"],function(l){return function(){$("#check"),$("form").submit(function(e){e.preventDefault();var n=$("#username").val(),t=$("#pwd").val();""==n||""==t?""==n&&""==t?alert("-用户名不能为空。\n-登录密码不能为空。"):(""==n&&alert("-用户名不能为空。"),""==t&&alert("-登录密码不能为空。")):(t=hex_md5(t),$.post("http://localhost/www/php/denglu.php",{username:n,pwd:t},function(e){if(e=JSON.parse(e)){alert("登录成功！");var t=[],r={username:n,cart:!1};t.push(r);var a=JSON.stringify(t);l.setCookie("user",a,7,"/"),$(location).attr("href","/html/user.html")}else alert("登录失败，请重试")}))})}});