/**
 * Created by Cyril on 13-10-27.
 */
"use strict";
function showBox (option){
    var _x, _y;
    var dragable = false;
    var body = $('body').on('mouseleave', function(){
        if (dragable){
            template.removeAttr('style');
        }
        dragable = false;
    });
    function closeBox(){
        template.removeClass('show');
        dropback.removeClass('show');
        window.setTimeout(function(){
            template.remove();
            dropback.remove();
            template.trigger("close");
        },300);
    }
    var template =$('<div class="show-box"><div class="box-header"><a class="close">×</a></div>' +
        '<div class="box-body">'+option.template+'</div>' +
        '<div class="box-footer">' +
        '<button class="button action">确定</button>' +
        '<button class="button close">取消</button>' +
        '</div></div>')
        .appendTo(body)
        .find('.close').click(closeBox).end().find('.action').click(function(){
            template.trigger('confirm');
            closeBox();
        }).end()
        .find('.box-header').on('mousedown',function(e){
            dragable = true;
            _x=e.pageX-parseInt(template.css("left"));
            _y=e.pageY-parseInt(template.css("top"));
        })
        .on('mousemove', function(e){
            if(dragable){
                var x=e.clientX-_x,y=e.clientY-_y;
                template.css({top:y,left:x});
            }
        })
        .on('mouseup',function(){
            dragable = false;
        }).end();
    var dropback = $('<div class="backdrops show">').appendTo(body).click(function(){
        closeBox();
    });
    window.setTimeout(function(){
        template.addClass('show');
        template.trigger('show');
    },1); // hack for -webkit-transition
    $( window ).resize(function() {
        template.removeAttr('style');
        dragable = false;
    });
    return template;
}

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
    $('.show-box,.backdrops').removeClass("show");
    setTimeout(function(){
        $(".show-box").remove();
    },300);
}

function toggleFullscreen($markdownContainer) {
    var element = $markdownContainer.get(0);
    if ($markdownContainer.hasClass('fullscreen')){
        console.log("Exit Fullscreen!");
        if(document.exitFullscreen) {
            document.exitFullscreen();
        } else if(document.mozCancelFullScreen) {
            document.mozCancelFullScreen();
        } else if(document.webkitExitFullscreen) {
            document.webkitExitFullscreen();
        }
    }else{
        console.log('Goto Fullscreen!');
        if(element.requestFullscreen) {
            element.requestFullscreen();
        } else if(element.mozRequestFullScreen) {
            element.mozRequestFullScreen();
        } else if(element.webkitRequestFullscreen) {
            element.webkitRequestFullscreen();
        } else if(element.msRequestFullscreen) {
            element.msRequestFullscreen();
        }
    }
    $markdownContainer.off("mozfullscreenerror webkitfullscreenchange fullscreenchange");
    $markdownContainer.on("mozfullscreenerror webkitfullscreenchange fullscreenchange",function(event){
        console.debug(event);
        $markdownContainer.toggleClass('fullscreen', !$markdownContainer.hasClass("fullscreen"));
    });
}

function renderPreview(text){
    if(window.marked){
        window.marked.setOptions({
            gfm: true
        });
        window.marked(text, function (err, content) {
            if (err){
                console.debug(err);
            }
            $(".markdown_preview").html(content);
            highlight();
        });
    }
}

//    Highlight Code
//    Powered By Highlight.js
window.hljs.configure({useBR: false});
function highlight(){
    var code = $('.container pre code');
    Array.prototype.map.call(code, function(e){
        window.hljs.highlightBlock(e);
    });
}

function syncScroll(){
    var $text = $(".markdown_text");
    var $html = $(".markdown_html");
    $text.scroll(function() {
        var top = $text.scrollTop();
        var winHeight = $(window).height();
        var textHeight= $(".CodeMirror").height() + 120;
        var htmlHeight = $(".markdown_preview").height() + 120;
        var scrollTop = top * ( htmlHeight - winHeight ) / ( textHeight - winHeight );
        console.debug(top, winHeight, textHeight, htmlHeight, scrollTop);
        $html.scrollTop(scrollTop);
    });
}

$(document).ready(function(){
    var newTag = $('#newTag');
    window.submitPost = function(){
        if(!$('#post-title-input').val()){
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
        showBox(url,data,!!1);
        return false;
    });
    $(".tag-span").click(function(){
        $(this).remove();
        updateTags();
    });

    $('.backdrops').click(close_box);


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

   // window.hljs.configure({useBR: true});
    highlight();

    // Call Full Screen
    $("#fullscreen").click(function(){
        toggleFullscreen($("#markdown-container"));
    });

    renderPreview($("#post_content").val());
    if(window.editor){
        console.debug("Has Editor");
        window.editor.on('change', function(event){
            renderPreview(event.doc.getValue());
        });
    }
    syncScroll();
});
