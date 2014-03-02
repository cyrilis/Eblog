/**
 * Created by never on 13-10-27.
 */
"use strict";
var newTag = $('#newTag');
var submitPost = function(){
    if(!$('#post_title_outer').val()){
        alert("Title Can't be Blank");
        return false;
    }
    var form=$("#post");
    if(newTag.val().trim()){
        updateTagsDom(newTag);
    }
//    var editorContent=$("#post_editor");
    updateTags();
//    $('#post_title').val($("#post_title_outer").val().trim());
    form.submit();
    return false;
};
function updateTagsDom (elem){
    var _this = elem;
    $('<span class="tag_span">' +
        '<span class="tag_name">'+$(_this).val().trim()+'</span>' +
        '<span class="tag_close">&times;</span>' +
        '</span>\n\r').insertBefore($(_this))
        .on("click",function(){
            $(_this).remove();
            updateTags();
        });
    $(_this).val(" ");
}
newTag.on( 'keypress', '.input_class', function (e) {
    if (e.charCode===13) {
//        $(this).parent('.container').children('.button_class').trigger('click');
        return false;
    }
    return false;
});
newTag.on("keyup",function(e) {
//    console.log(e);
    var _this = this;
    if(e.which === 32&&$(_this).val().trim()&& $(_this).val().split('').pop()===" "){
//        e.preventDefault();
        updateTagsDom(_this);
        updateTags();
        return false;
    }else if(e.which === 8&&$('#newTag').val()===""){
        e.preventDefault();
        $(".tag_span").last().remove();
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
$(".tag_span").click(function(e){
    $(this).remove();
    updateTags();
});
function updateTags(){
    var tags=[];
    $(".tag_name").each(function(index){
        tags.push($(this).text());
    });
    $("#post_tags").val(tags.join("|"));
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

function close_box(){
    $('div.confirm,.show_box,.backdrops').removeClass("show");
    setTimeout(function(){
        $("div.confirm,.show_box").remove();
    },300);
}
$('.backdrops').click(close_box);
$(document).on("click",".confirm .close,.show_box .close",function(){
    close_box();
});
$(".flash_error,.flash_success").addClass("show");
$(document).ready(function(){
    window.setTimeout(function(){
        $(".flash_error,.flash_success").removeClass("show");
    },5000);
    updateTags();
    $("#tags_container").click(function(){
        $("#newTag").focus();
    });
});

$(".header_navs .has_sub>a").on('touchstart',function(e){
    e.preventDefault();
    $(this).parent().toggleClass('open');
    return false;
});
$("header .toggle_sidebar").on("click",function(){
    $('header').toggleClass("show");
    $('.logo, main, footer,html').toggleClass('toggled');
});