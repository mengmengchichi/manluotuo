"use strict";define(["tocart","cookie"],function(i,o){function e(){this.flag=!0,this.index=1}return e.prototype.listClick=function(i){for(var e=$(".kindlist ul").find("a"),a=0;a<e.length;a++)e.eq(a).attr("id","list"+(a+1));e.on("click",function(i){i.preventDefault(),$(location).attr("href","/html/list.html?"+this.id)})},e.prototype.listload=function(t,n){var r,s=this;$.get("http://localhost/www/php/list.php",{id:n,pageCount:12,index:s.index},function(i){var e=(i=JSON.parse(i)).alldata;i=i.data,r=Math.ceil(e/12);var a=t("list",{data:i});$("#content_con_goods").html(a),s.listClick(),s.listshow(t,r,n),$(".item_tocart a").on("click",function(){var i=$(this).parent().parent().children("a").attr("href").split("?")[1];console.log(i);var e=o.getCookie("cookie"),a=""==e?[]:JSON.parse(e),t={id:i};a.push(t);var n=JSON.stringify(a);o.setCookie("cookie",n,30,"/"),$(location).attr("href","/html/cart.html?"+i+"&1")})})},e.prototype.listshow=function(i,e,a){var t=this,n="";if(t.flag){n+='<a href="javascript:;" id="goprev">上一页</a>';for(var r=1;r<=e;r++)n+=1==r?'<a href="javascript:;" class = "pageclick">'+r+"</a>":'<a href="javascript:;">'+r+"</a>";n+='<a href="javascript:;" id="gonext">下一页</a>',$("#pagechange").html(n),t.index==e?$("#gonext").replaceWith('<span id="gonext">下一页</span>'):$("#gonext").replaceWith('<a href="javascript:;" id="gonext">下一页</a>'),1==t.index?$("#goprev").replaceWith('<span id = "goprev">上一页</span>'):$("#goprev").replaceWith('<a href="javascript:;" id="goprev">上一页</a>'),t.init(e,i,a),t.flag=!1}},e.prototype.init=function(e,a,t){var n=this;$("#pagechange a").on("click",function(){var i=this.innerHTML;isNaN(Number(i))?"goprev"===this.id?(n.index--,n.index<1&&(n.index=1),$("#pagechange a").eq(n.index).addClass("pageclick").siblings().removeClass("pageclick"),1==n.index?$(this).replaceWith('<span id="goprev">上一页</span>'):($("#gonext").replaceWith('<a href="javascript:;" id="gonext">下一页</a>'),$(this).replaceWith('<a href="javascript:;" id="goprev">上一页</a>'),n.init(e,a,t))):"gonext"===this.id&&(n.index++,n.index>e&&(n.index=e),$("#pagechange").children().eq(n.index).addClass("pageclick").siblings().removeClass("pageclick"),n.index==e?$(this).replaceWith('<span id="gonext">下一页</span>'):($(this).replaceWith('<a href="javascript:;" id="gonext">下一页</a>'),$("#goprev").replaceWith('<a href="javascript:;" id="goprev">上一页</a>'),n.init(e,a,t))):(n.index=Number(i),$(this).addClass("pageclick").siblings().removeClass("pageclick"),n.index==e?$("#gonext").replaceWith('<span id="gonext">下一页</span>'):1==n.index?$("#goprev").replaceWith('<span id = "goprev">上一页</span>'):($("#goprev").replaceWith('<a href="javascript:;" id="goprev">上一页</a>'),$("#gonext").replaceWith('<a href="javascript:;" id="gonext">下一页</a>'),n.init(e,a,t))),n.listload(a,t)})},e.prototype.searchheader=function(){if(-1!=location.search.substr(1).search("&")){var a=location.search.substr(1).split("&")[1].split("=")[1]?location.search.substr(1).split("&")[1].split("=")[1]:"";$(".content_header").find("a").each(function(i,e){$(e).html()==decodeURI(a)&&$(e).addClass("click")})}$(".content_header").find("a").on("click",function(){var i=$(this).html();$(location).attr("href","/html/list.html?act=search&keywords="+i)})},new e});