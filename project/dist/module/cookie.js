"use strict";define(function(){function e(){}return e.prototype.setCookie=function(e,t,o){if(o){var i=new Date;i.setDate(date.getDate()+o),document.cookie=e+"="+t+";expires="+i}else document.cookie=e+"="+t},e.prototype.getCookie=function(e){if(document.cookie){for(var t=document.cookie.split("; "),o=0;o<t.length;o++){var i=t[o].split("=");if(i[0]==e)return i[1]}return""}return""},e.prototype.removeCookie=function(){this.setCookie(key,"",-1)},new e});