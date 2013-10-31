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

    submitPost = function(){
        if(!$('#post_title_outer').val()){
            return alert("Title Can't be Blank")
        }
        var form=$("#post");
        var editorContent=$("#post_editor");
        cancelResize();
        
        $('#post_content').val(editorContent.html().trim());
        $('#post_title').val($("#post_title_outer").val().trim());
        form.submit();
    }
    var dragable=false,dragImg=null;
    var init_img_box=function(){
        $("body").append("<div class='img_box'>title<br/><input type='text'/><br/>link <br/><input type='text'/></div>")
    };
    var setupResize=function(e){
        window.dragImg=$(e);
        $(e).addClass("resize");
        var resize_arrow=$("body").append("<div id='resize_arrow'></div>").find("#resize_arrow");
        var eLeft=$(e).offset().left+$(e).width(),
            eTop=$(e).offset().top+$(e).height();
        resize_arrow.css({left:eLeft,top: eTop});
    }
    var cancelResize=function(){
        $("img.resize").removeClass("resize");
        $("#resize_arrow").remove();
        window.dragImg=null;
    };
    var updateResize= function(){
        if($("#resize_arrow").size()>0){
            var eLeft=dragImg.offset().left+dragImg.width(),
                eTop=dragImg.offset().top+dragImg.height();
            $("#resize_arrow").css({left:eLeft,top: eTop});
            console.log(1)
        }
    }
    $(window).scroll(function(e){
        var method;
        editContentHeight=$('[contenteditable=true]').height();
        ((editContentHeight+editTop) > $(window).scrollTop()&&$(window).scrollTop() > editTop) ? method="addClass": method="removeClass";
        editorEle[method]("fixed");
        updateResize();
    });
    var sel = window.getSelection(),clearSel;
    editorElement
        .on('click',"img",function(e){
            if($(this).hasClass('resize')){
                return false
            }
            cancelResize();
            setupResize(this);
        })
    $(document).on('click',function(e){
            if(!$(e.target).hasClass("resize")&&$(e.target).attr("id")!=="resize_arrow"){
                cancelResize();
            }
        })
        .on("mousedown","#resize_arrow",function(e){
            $("#resize_arrow").focus();
            window.dragable=true;
            $("body").addClass("unselectable");
            clearSel=window.setInterval(function(){
                sel.removeAllRanges()
            },5);
        })
        .on("mousemove","[contenteditable]",function(e){
            if(!dragable){return false};
            var parentPos=$("body").offset(),
                etop=parentPos.top+ e.pageY,
                eleft=parentPos.left+ e.pageX;
            if(dragImg.outerHeight()<100&&eleft-dragImg.offset().left<100){
                return false
            }
            dragImg.css({width: eleft-dragImg.offset().left});
            $("#resize_arrow").css({left: dragImg.offset().left+dragImg.outerWidth(),top: dragImg.offset().top+dragImg.outerHeight()});
        })
        .on("mouseup",function(e){
            window.dragable=false;
            $("body").removeClass("unselectable");
            clearInterval(clearSel)
        })
}

$("a.confirm").click(function(){
    var url=this.getAttribute("href"),
        confirmData=this.getAttribute('data-confirm');
    showDialog(url,confirmData,!!1);
    return false
})
function showDialog(url,confirmData,really){
    if(!really){
        return confirm(confirmData)? window.location="#":false;
    }else{
        var newDiv=document.createElement('div'),
            confirmBody=document.createElement("div"),
            confirmFooter=document.createElement("div"),
            closeBtn=document.createElement("a"),
            aLink=document.createElement("a");
        closeBtn.setAttribute("class","close");
        closeBtn.innerHTML="&times;";
        aLink.setAttribute("href",url);
        aLink.setAttribute("class","button");
        aLink.innerHTML="确定";
        confirmBody.setAttribute("class","confirm_body");
        confirmFooter.setAttribute("class","confirm_footer");
        confirmFooter.innerHTML="<button class='button close'>取消</button>";
        confirmFooter.appendChild(aLink);
        confirmBody.innerHTML=confirmData;
        newDiv.setAttribute("class","confirm");
        newDiv.appendChild(closeBtn);
        newDiv.appendChild(confirmBody);
        newDiv.appendChild(confirmFooter);
        document.body.appendChild(newDiv);
        setTimeout(function(){
            newDiv.className+= " show";
        },1)// to show animate style, set a 0.001s delay
        return false
    }
}
$(document).on("click",".confirm .close",function(){
    $(this).parents(".confirm").removeClass("show");
    setTimeout(function(){
        var x=document.getElementsByClassName("confirm");
        for(var i=0;i< x.length;i++){
            if(x[i].tagName.toLowerCase()=="div"){
                x[i].parentNode.removeChild(x[i]);
            }
        }
    },300)
})
$(document).ready(function(){
    window.setTimeout(function(){
        $(".flash_error,.flash_success").fadeOut();
    },2000)
})