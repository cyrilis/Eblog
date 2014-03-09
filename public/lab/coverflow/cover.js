var c=$('#music #covers .cover'),c_size=c.size();
c.eq(c_size/2-1).addClass('active');
active=$('.active');
n=active.index()+1;
var first=function(){
	var c=$('#music #covers .cover'),c_size=c.size();
	active=$('.active');
	n=active.index()+1;
	for(i=n-2;i>-1;i--){
        c.eq(i).css('-webkit-transform','translate3d(-'+(50+(n+1-i)*100)+'px, 0px, -170px) rotateY(70deg)').css('-moz-transform','translate3d(-'+(50+(n+1-i)*100)+'px, 0px, -170px) rotateY(70deg)').css('-ms-transform','translate3d(-'+(50+(n+1-i)*100)+'px, 0px, -170px) rotateY(70deg)');
	}
	for(i=n;i<c_size;i++){
        c.eq(i).css('-webkit-transform','translate3d('+(50+(i+1-n)*100)+'px, 0px, -170px) rotateY(-70deg)').css('-moz-transform','translate3d('+(50+(i+1-n)*100)+'px, 0px, -170px) rotateY(-70deg)').css('-ms-transform','translate3d('+(50+(i+1-n)*100)+'px, 0px, -170px) rotateY(-70deg)');
	}
    active.css({'-webkit-transform':'translate3d(-110px, 0px,0px)'}).css({'-moz-transform':'translate3d(-110px, 0px,0px)'}).css({'-ms-transform':'translate3d(-110px, 0px,0px)'});
}
$(document).ready(function() {
	first();
	$('.cover').bind('click',function(){
		$('.active').removeClass('active');
		$(this).addClass("active");
		first();
	});
	jQuery(function($) {
    $('#music')
        .bind('mousewheel', function(event, delta) {
            var dir = delta > 0 ? 'Up' : 'Down',
                vel = delta;
            if(($('.active').index()==(c_size-1)&&vel<0)||($('.active').index()==0&&vel>0)){
            	return false;
            }else{
            	if(vel<0){
            		$(".active").removeClass("active").next().addClass("active");
            		first()
            	}else if(vel>0){
            		$(".active").removeClass("active").prev().addClass("active");
            		first()
            	}
            }
            return false;
        });
});
});
