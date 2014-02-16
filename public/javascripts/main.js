/**
 * Created by never on 13-10-27.
 */
"use strict";

var ue = UM.getEditor('post_content');

//var editorElement=$("#post_editor");
//if(editorElement.size()>0){
//    var initEditor= function(){
//        window.editor={};
//        editor.toolbar = skriv.create(document.querySelector(".skriv"));
//        skriv.util.execCommand("enableObjectResizing", false, false);
//    };
//    initEditor();
//    editor.toolbar.bind();
//    var editorEle=$(".skriv");
//    var editTop=editorEle.offset().top;
//    var method;
//
//    var submitPost = function(){
//        if(!$('#post_title_outer').val()){
//            alert("Title Can't be Blank");
//            return;
//        }
//        var form=$("#post");
//        var editorContent=$("#post_editor");
//        cancelResize();
//        $('#post_content').val(editorContent.html().trim());
//        $('#post_title').val($("#post_title_outer").val().trim());
//        form.submit();
//    };
//    var dragable=false,dragImg=null;
//    var setupResize=function(e){
//        window.thisImg=null;
//        window.thisImg=window.dragImg=$(e);
//        $(e).addClass("resize");
//        var resize_arrow=$("body").append("<div id='resize_arrow'></div>").find("#resize_arrow");
//        var resize_btn=$("body").append("<button class='button' id='resize_btn'>Edit</button>").find("#resize_btn").click(function(){show_edit_box(dragImg)});
//        var eLeft=$(e).offset().left+$(e).width(),
//            eTop=$(e).offset().top+$(e).height();
//        resize_arrow.css({left:eLeft,top: eTop});
//        resize_btn.css({left:eLeft-dragImg.width()/2,top:eTop-dragImg.height()/2});
//    }
//    var cancelResize=function(){
//        $("img.resize").removeClass("resize");
//        $("#resize_arrow").remove();
//        $("#resize_btn").remove();
//        window.dragImg=null;
//    };
//    var updateResize= function(){
//        if($("#resize_arrow").size()>0){
//            var eLeft=dragImg.offset().left+dragImg.width(),
//                eTop=dragImg.offset().top+dragImg.height(),
//                hLeft=dragImg.offset().left+dragImg.width()/ 2,
//                hTop=dragImg.offset().top+dragImg.height()/2;
//            $("#resize_arrow").css({left:eLeft,top: eTop});
//            $("#resize_btn").css({left:hLeft,top:hTop})
//        }
//    }
//    $(window).scroll(function(e){
//        var method;
//        editContentHeight=$('[contenteditable=true]').height();
//        ((editContentHeight+editTop) > $(window).scrollTop()&&$(window).scrollTop() > editTop) ? method="addClass": method="removeClass";
//        editorEle[method]("fixed");
//        updateResize();
//    });
//    var sel = window.getSelection(),range = document.createRange(),clearSel;
//    editorElement
//        .on('click',"img",function(e){
//            if($(this).hasClass('resize')){
//                return
//            }
//            cancelResize();
//            setupResize(this);
//            range.setStartAfter(dragImg[0]);
//            range.setEndAfter(dragImg[0]);
//            sel.removeAllRanges();
//            sel.addRange(range);
//        })
//    $(document).on('click',function(e){
//            if(!$(e.target).hasClass("resize")&&$(e.target).attr("id")!=="resize_arrow"){
//                cancelResize();
//            }
//        })
//        .on("mousedown","#resize_arrow",function(e){
//            window.dragable=true;
//            window.clearSel=window.setInterval(function(){
//                sel.removeAllRanges();
//            },10);
//        })
//        .on("mousemove","[contenteditable]",function(e){
//            if(!dragable){return}
//            var parentPos=$("body").offset(),
//                etop=parentPos.top+ e.pageY,
//                eleft=parentPos.left+ e.pageX;
//            if(dragImg.outerHeight()<100&&eleft-dragImg.offset().left<100){
//                return
//            }
//            dragImg.css({width: eleft-dragImg.offset().left});
//            $("#resize_arrow").css({left: dragImg.offset().left+dragImg.outerWidth(),top: dragImg.offset().top+dragImg.outerHeight()});
//            $("#resize_btn").css({left: dragImg.offset().left+dragImg.outerWidth()/2,top: dragImg.offset().top+dragImg.outerHeight()/2});
//        })
//        .on("mouseup",function(e){
//            window.dragable=false;
//            clearInterval(clearSel);
//            if(window.dragImg){
//                range.setStartAfter(dragImg[0]);
//                range.setEndAfter(dragImg[0]);
//                sel.addRange(range);
//            }
//        });
//    $('#newTag').on("keypress",function(e) {
//        console.log(e);
//        if(e.which == 13&&$(this).val()){
//            e.preventDefault();
//            console.log(e);
//            $('<span class="tag_span">' +
//                '<span class="tag_name">'+$(this).val()+'</span>' +
//                '<span class="tag_close">&times;</span>' +
//                '</span>\n\r').insertBefore($("#newTag"))
//                .on("click",function(){
//                    $(this).remove();
//                    updateTags();
//                });
//            $(this).val("");
//            updateTags();
//            return false;
//        }
//    });
//}

$("a.confirm").click(function(){
    var url=this.getAttribute("href"),
        confirmData=this.getAttribute('data-confirm');
    showDialog(url,confirmData,!!1);
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
function showDialog(url,confirmData,really){
    if(!really){
        return confirm(confirmData)? window.location="#":false;
    }else{
        var newDiv=document.createElement("div");
        newDiv.className="confirm";
        newDiv.innerHTML='<a class="close">&times;</a>' +
            '<div class="confirm_body">'+confirmData+'</div>' +
            '<div class="confirm_footer">' +
            '<button class="button close">取消</button>' +
            '<a href="'+url+'" class="button">确定</a>' +
            '</div>';
        document.body.appendChild(newDiv);
        setTimeout(function(){
            newDiv.className+=" show";
        },1);
        return false;
    }
}
//function show_edit_box(ele){
//    if(!ele){
//        return;
//    }
//    var newDiv=document.createElement("div");
//    newDiv.className="show_box";
//    newDiv.innerHTML='<a class="close">&times;</a>' +
//        '<div class="box_body"><div class="form-group">' +
//        '<label for="img_float">Float</label><select name="img_float" id="img_float">' +
//        '<option value="none">None</option>' +
//        '<option value="left">Left</option>' +
//        '<option value="right">Right</option>' +
//        '</select> </div><div class="form-group">' +
//        '<label for="img_link">Link:</label><input id="img_link" type="text" name="img_link"/></div>' +
//        '</div><div class="box_footer">' +
//        '<button class="button close">Cancel</button>' +
//        '<button class="button" onclick="update_img()">OK</button>' +
//        '</div>';
//    document.body.appendChild(newDiv);
//    document.getElementById("img_float").selectedIndex= thisImg.css("float")=="left"? 1: thisImg.css("float")=="right"? 2:0;
//    thisImg.parent().attr("href")?document.getElementById("img_link").value=thisImg.parent().attr("href"):true;
//    setTimeout(function(){
//        newDiv.className+=" show";
//    },1);
//    return false
//}
//function update_img(){
//    var url=$("#img_link").val();
//    var float=$("#img_float").val();
//    if(float=="left"){
//        thisImg.css({float:"left",margin:"0 10px 0 0"});
//    }else if(float=="right"){
//        thisImg.css({float:"right",margin: "0 0 0 10px"})
//    }else{
//        thisImg.css({float:"none",margin:0})
//    }
//    if(thisImg.parent()[0].nodeName.toLowerCase()=="a"){
//        thisImg.unwrap();
//    }
//    if(url){
//        thisImg.wrap("<a></a>");
//        thisImg.parent().attr("href",url);
//    }
//    close_box();
//}
function close_box(){
    $('div.confirm,.show_box').removeClass("show");
    setTimeout(function(){
        $("div.confirm,.show_box").remove();
    },300);
}
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