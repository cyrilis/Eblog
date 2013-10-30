/**
 * Created by never on 13-10-27.
 */
var editorElement=$("#post_editor");
if(editorElement.size()>0){
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
        if(postAction){
            form.attr("action", postAction);
        }
        var editorContent=$("#post_editor");
        editorContent.find('.resize_arrow').remove().end();
        editorContent.find("span.resize_span img").removeClass("resize").unwrap();
        $('#post_content').val(editorContent.html().trim());
        $('#post_title').val($("#post_title_outer").val().trim());
        if($("#post_title").val()&&$("#post_content").val()){
            form.submit();
            return false;
        }else{
            window.setTimeout(function(){
                form.submit();
                return false;
            },500)
        }
    }
    var dragable=false,dragImg=null;
    editorElement
        .on('click',"img",function(e){
            if($(this).hasClass('resize')){
                return false;
            }
            $(this).addClass("resize").select().wrap("<span class='resize_span'></span>");
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
}
$("a.confirm").click(function(){
    var url=this.getAttribute("href"),
        confirmData=this.getAttribute('data-confirm');
        window.url=this;
    if(url.slice(0,1)=="#"){
        showDialog(url,confirmData,!!1);
        return false
    }else if(confirmData){
        confirm(confirmData)? window.location=url : false
        return false
    }
})
function showDialog(url,confirmData,really){
    if(!really){
        return confirm(confirmData)? window.location="#":false;
    }else{
        var newDiv=document.createElement('div'),
            confirmBody=document.createElement("div"),
            confirmFooter=document.createElement("div"),
            closeBtn=document.createElement("div"),
            aLink=document.createElement("a");
        closeBtn.setAttribute("class","close");
        closeBtn.innerHTML="&times;";
        aLink.setAttribute("href",url);
        aLink.setAttribute("class","button");
        aLink.innerHTML="确定";
        confirmBody.setAttribute("class","confirm_body");
        confirmFooter.setAttribute("class","confirm_footer");
        confirmFooter.innerHTML="<button class='button'>取消</button>";
        confirmFooter.appendChild(aLink);
        confirmBody.innerHTML=confirmData;
        newDiv.setAttribute("class","confirm");
        newDiv.appendChild(closeBtn);
        newDiv.appendChild(confirmBody);
        newDiv.appendChild(confirmFooter);
        document.body.appendChild(newDiv);
        return false
    }
}
$(document).on("click",".confirm .button,.confirm .close",function(){
    $(this).parents(".confirm").removeClass("show");
})
$(document).ready(function(){
    window.setTimeout(function(){
        $(".flash_error,.flash_success").fadeOut();
    },2000)
})