"use strict";define(["listload"],function(t){function o(){}return o.prototype.init=function(){$("#header").load("/html/header.html",function(){t.listClick()}),$("#footer").load("/html/footer.html")},new o});