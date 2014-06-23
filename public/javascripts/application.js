/**
 * Created by Cyril on 13-10-27.
 */
"use strict";
window.showBox = function showBox (message, action, showCb, closeCb ){
    var _x, _y;
    var dragable = false;
    var body = $('body').on('mouseleave', function(){
        if (dragable){
            template.removeAttr('style');
        }
        dragable = false;
    });
    var template =$('<div class="confirm"><div class="confirm_header"><a class="close">×</a></div>' +
        '<div class="confirm_body">'+message+'</div>' +
        '<div class="confirm_footer">' +
        '<button class="button close">取消</button>' +
        '<button class="button action">确定</button>' +
        '</div></div>')
        .appendTo(body)
        .find('.close').click(function(){
            template.removeClass('show');
            dropback.removeClass('show');
            window.setTimeout(function(){
                template.remove();
                dropback.remove();
                if (typeof closeCb === "function"){
                    closeCb();
                }
            },300);
        }).end().find('.action').click(function(){
            if (typeof action === 'function'){
                action();
            }
            template.removeClass('show');
            dropback.removeClass('show');
            window.setTimeout(function(){
                template.remove();
                dropback.remove();
                if (typeof closeCb === "function"){
                    closeCb();
                }
            },300);
        }).end()
        .find('.confirm_header').on('mousedown',function(e){
            dragable = true;
            _x=e.pageX-parseInt(template.css("left"));
            _y=e.pageY-parseInt(template.css("top"));
        })
        .on('mousemove', function(e){
            if(dragable){
                var x=e.pageX-_x,y=e.pageY-_y;
                template.css({top:y,left:x});
            }
        })
        .on('mouseup',function(){
            dragable = false;
        }).end();
    var dropback = $('<div class="backdrops show">').appendTo(body).click(function(){
        $(this).removeClass('show');
        template.removeClass('show');
        window.setTimeout(function(){
            template.remove();
            $(this).remove();
            if (typeof closeCb === "function"){
                closeCb();
            }
        },300);
    });
    window.setTimeout(function(){
        template.addClass('show');
        if (typeof showCb === "function"){
            showCb();
        }
    },1); // hack for -webkit-transition
    $( window ).resize(function() {
        template.removeAttr('style');
        dragable = false;
    });
};

function updateTagsDom (elem){
    var _this = elem|| $("#newTag");
    $('<span class="tag-span">' +
        '<span class="tag_name">'+$(_this).val().trim()+'</span>' +
        '<span class="tag_close">&times;</span>' +
        '</span>\n\r').insertBefore($(_this))
        .on("click",function(){
            $(this).remove();
            updateTags();
        });
    $(_this).val(" ");
}

function showDialog(url,data,really){
    if(!really){
        return confirm(data.confirm)? window.location = url :false;
    }else{
        var newDiv=document.createElement("div");
        newDiv.className="confirm";
        newDiv.innerHTML='<a class="close">&times;</a>' +
            '<div class="confirm_body">'+data.confirm+'</div>' +
            '<div class="confirm_footer">' +
            '<button class="button close">取消</button>' +
            '<a href="'+url+'" data-method="'+data.method+'" class="button">确定</a>' +
            '</div>';
        document.body.appendChild(newDiv);
        setTimeout(function(){
            newDiv.className+=" show";
        },1);
        $(".backdrops").addClass('show');
        return false;
    }
}

function initFlash () {
    $(".flash_error,.flash_success").addClass("show");

    window.setTimeout(function(){
        $(".flash_error,.flash_success").removeClass("show");
    },5000);
    updateTags();
    $("#tags-container").click(function(){
        $("#newTag").focus();
    });
}

function updateTags(){
    var tags=[];
    $(".tag_name").each(function(){
        tags.push($(this).text());
    });
    $("#post_tags").val(tags.join("|"));
}


function close_box(){
    $('div.confirm,.show_box,.backdrops').removeClass("show");
    setTimeout(function(){
        $("div.confirm,.show_box").remove();
    },300);
}


$(document).ready(function(){
    var newTag = $('#newTag');
    window.submitPost = function(){
        if(!$('#post_title_outer').val()){
            alert("Title Can't be Blank");
            return false;
        }
        var form=$("#post");
        if(newTag.val().trim()){
            updateTagsDom(newTag);
        }
        updateTags();
        form.submit();
        return false;
    };

    newTag.on( 'keypress', '.input_class', function (e) {
        if (13 === e.charCode) {
            return false;
        }
        return false;
    });
    newTag.on("keyup",function(e) {
    console.log(e);
        var _this = this;
        if(e.which === 32&&$(_this).val().trim()&& $(_this).val().split('').pop()===" "){
            updateTagsDom(_this);
            updateTags();
            return false;
        }else if(e.which === 8&&$('#newTag').val()===""){
            e.preventDefault();
            $(".tag-span").last().remove();
            $(_this).val(" ");
            updateTags();
        }
        e.preventDefault();
        return false;
    });

    $("a.confirm").click(function(){
        console.log(111);
        var url=this.getAttribute("href"),
            data = {
                confirm:this.getAttribute('data-confirm'),
                method: this.getAttribute('data-method')
            };
        console.log(data);
        showDialog(url,data,!!1);
        return false;
    });
    $(".tag-span").click(function(){
        $(this).remove();
        updateTags();
    });

    $('.backdrops').click(close_box);
    $(document).on("click",".confirm .close,.show_box .close",function(){
        close_box();
    });


    initFlash ();

    $(".header_navs .has_sub>a").on('touchstart',function(e){
        e.preventDefault();
        $(this).parent().toggleClass('open');
        return false;
    });
    $("header .toggle_sidebar").on("touchstart click",function(e){
        e.preventDefault();
        $('header').toggleClass("show");
        $('html').toggleClass('toggled');
    });
    $('body').on('click','main,.logo,.footer',function(){
        if($("html").hasClass('toggled')){
            $('header').removeClass('show');
            $('html').removeClass('toggled');
        }
    });
//    Highlight Code
//    Powered By Highlight.js
    window.hljs.configure({useBR: false});
    function highlight(){
        var code = $('.container pre code');
        Array.prototype.map.call(code, function(e){
            window.hljs.highlightBlock(e);
        });
    }
   // window.hljs.configure({useBR: true});
    highlight();

});
