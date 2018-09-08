define(function(){
	function lunbo(){};
	lunbo.prototype.init = function(){
		$(function(){
            var prev = $('#prev'),next = $('#next'),ul = $('#lunbo ul'),li = ul.find('li'),ol = $('#lunbo ol'),div = $('#lunbo');
            var len = li.length;
            var index = 0;
            var flag = false;
            var timer;           
            var btn = ol.children();
            var str = '';
            for (var i = 0;i<len;i++) {
            	str+='<li></li>';
            }
            ol.html(str);
            btn.on('mouseover',function(){
                if(!flag){
                    flag = true;                     $(this).addClass('ac').siblings().removeClass('ac');;                   li.eq(index).removeClass('z_index').animate({
                    	opacity:0                   
                    },500);
                    index = $(this).index();                    li.eq(index).addClass('z_index').animate({
                        opacity:1
                    },500,function(){
                        flag = false;
                    });
                }               
            })
            prev.on('click',function(){
                if(!flag){
                    flag = true;
                    li.eq(index).removeClass('z_index').animate({
                    	opacity:0;                   
                    },500);
                    index--;                    
                    if(index < 0){
                        index = len -1;
                    }                   btn.eq(index).addClass('ac').siblings().removeClass('ac');                                   li.eq(index).addClass('z_index').animate({
                        opacity:1
                    },500,function(){
                        flag = false;
                    });                                       
                }               
            })
            next.on('click',function(){
                if(!flag){
                    flag = true;                   li.eq(index).removeClass('z_index').animate({
                    	opacity:0;                   
                    },500);
                    index++;
                    if(index >= len){
                    	index = 0;
	                        btn.eq(index).addClass('ac').siblings().removeClass('ac');
	li.eq(index).addClass('z_index').animate({
	                        opacity:1
	                    },500,function(){
	                        flag = false;
	                    }); 
                    }else {
	li.eq(index).addClass('z_index').animate({
	                        opacity:1
	                    },500,function(){
	                        flag = false;
	                    });                                        
                    }
                }
            })
            // function auto(){
            //     timer = setInterval(function(){
            //         next.trigger('click');
            //     },2000);
            // }           
            // auto();
            // div.hover(function(){
            //     clearInterval(timer);
            // },function(){
            //     auto();
            // })
            var timer = setInterval(function(){
                next.trigger('click');
            },2000);
            div.hover(function(){
                clearInterval(timer);
            },function(){
                var timer = setInterval(function(){
                    next.trigger('click');
                },2000);
            })
        })
	}
	return new lunbo();
})
