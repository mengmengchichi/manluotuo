define(function(){
	function header(){}
	header.prototype.init = function(){
		$(function(){
			var li = $('.navlist ul li');
			li.on("click",function(){
				$(this).addClass('clickclass').siblings().removeClass('clickclass');		
			})
		})
	}
	return new header();
})
