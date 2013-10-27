/**
 * Created by never on 13-10-27.
 */
UndoButton = {create: function () {
    skriv.actions.undo = skriv.actions.dropdown.extend({init: function (e, t) {
        this.isOver = !1, this.options = [
            {name: "Redo", value: "redo"}
        ], this._super(e, t)
    }, build: function () {
        this._super(), this.buttonElement.classList.add("undo"), this.buttonElement.classList.add("icon"), this.domElement.style.width = "40px", this.panelElement.style.width = "50px"
    }, addOption: function (e) {
        this.redoButton = document.createElement("li"), this.redoButton.setAttribute("data-value", e.value), this.bindOption(this.redoButton, e);
        var t = document.createElement("div");
        t.className = "redo icon " + e.value, this.redoButton.appendChild(t), this.dropdownElement.appendChild(this.redoButton)
    }, bindOption: function (e, t) {
        e.addEventListener("click", function (e) {
            this.canundo=document.execCommand("undo", "", null);
        }.bind(this, t.value), !1)
    }, sync: function () {
        this.canundo ? this.buttonElement.classList.remove("disabled") : this.buttonElement.classList.add("disabled")
    }, trigger: function () {
    }, toggle: function () {
    }, onClick: function (e) {
       document.execCommand("undo", "", null);
    }
    })
}};
UndoButton.create();
var initEditor= function(){
    window.editor={};
    editor.toolbar = skriv.create(document.querySelector(".skriv"));
    skriv.util.execCommand("enableObjectResizing", true, true);
    var e = {direction: "b", delay: 500};
    if(navigator.userAgent.indexOf("Mac OS X") !== -1){
        t="&#8984";
    }else{
        t= "CTRL";
    }
    anchorTo($(".skriv .action.bold>button"), "加粗 (" + t + " + B)", e);
    anchorTo($(".skriv .action.italic>button"), "斜体 (" + t + " + I)", e);
    anchorTo($(".skriv .action.underline>button"), "下划线 (" + t + " + U)", e);
    anchorTo($(".skriv .action.removeFormat>button"), "清除格式", e);
    anchorTo($(".skriv .action.foregroundColor>button"), "文字颜色", e);
    anchorTo($(".skriv .action.backgroundColor>button"), "文字背景颜色", e);
    anchorTo($(".skriv .action.image>button"), "插入图片", e);
    anchorTo($(".skriv .action.link>button"), "插入链接 (" + t + " + K)", e);
    anchorTo($(".skriv .action.unlink>button"), "移除链接", e)
}
function anchorTo(e,t,n){
    var r = {};
    typeof t != "undefined" && (r["data-tooltip"] = t), typeof n.delay == "number" && (r["data-tooltip-delay"] = n.delay), typeof n.direction == "string" && (r["data-tooltip-direction"] = n.direction), $(e).attr(r)
}
initEditor();
editor.toolbar.bind();
var editTop=$(".skriv").offset().top;
var editorEle=$(".skriv");
var method;
$(window).scroll(function(e){
    editContentHeight=$('[contenteditable=true]').height();
    ((editContentHeight+editTop) > $(window).scrollTop()&&$(window).scrollTop() > editTop) ? method="addClass": method="removeClass";
    editorEle[method]("fixed");
})
submitPost = function(){
    if(!$('#post_title_outer').val()){
        return alert("Title Can't be Blank")
    }
    var form=$("#post");
    $('#post_content').val($("#post_editor").html().trim());
    $('#post_title').val($("#post_title_outer").val().trim());
    form.submit();
    return false
}
var dragable=false,dragImg=null;
$("#post_editor")
    .on('click',"img",function(e){
        if($(this).hasClass('resize')){
            return false;
        }
        $(this).addClass("resize").wrap("<span class='resize_span'></span>");
        $('<span class="resize_arrow"></span>').appendTo($(this).parent());
        window.dragImg=$(this);
    })
    .on('mousedown','span.resize_arrow',function(e){
        window.dragable=true;
    })
    .on('mousemove',function(e){
        if(!dragable){
            return false
        }
        var thisWidth= e.pageX - dragImg.parent().offset().left,
            thisHeight= e.pageY-dragImg.parent().offset().top;
        console.log(thisHeight,thisHeight);
        dragImg.css({width: thisWidth});
    })
    .on('mouseup',function(e){
        window.dragable=false;
    }).on('click',function(e){
        if($(event.target).parents().index($('span.resize_span')) == -1){
            if(!dragImg){
                return false;
            }
            dragImg.parent().find("span.resize_arrow").remove();
            dragImg.removeClass("resize").unwrap();
            dragImg=null;
        }
    })
$(document).ready(function(){
    window.setTimeout(function(){
        $(".flash_error,.flash_success").fadeOut();
    },2000)
})