/**
 * Created by never on 13-10-27.
 */
submitPost = function(){
    if(!$('#post_title_outer').val()){
        alert("Title Can't be Blank");
        return;
    }
    var form=$("#post");
    var editorContent=$("#post_editor");
    updateTags();
    $('#post_title').val($("#post_title_outer").val().trim());
    form.submit();
};
var ue = UM.getEditor('post_content');

$('#newTag').on("keyup",function(e) {
    console.log(e);
    if(e.which == 32&&$(this).val()){
        e.preventDefault();
        $('<span class="tag_span">' +
            '<span class="tag_name">'+$(this).val()+'</span>' +
            '<span class="tag_close">&times;</span>' +
            '</span>\n\r').insertBefore($("#newTag"))
            .on("click",function(){
                $(this).remove();
                updateTags();
            });
        $(this).val("");
        updateTags();
        return false;
    }else if(e.which == 8){
        e.preventDefault();
        $(".tag_span").last().remove();
        updateTags();
    }
});

$("a.confirm").click(function(){
    var url=this.getAttribute("href"),
        confirmData=this.getAttribute('data-confirm');
    showDialog(url,confirmData,!!1);
    return false
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
        return false
    }
}


function close_box(){
    $('div.confirm,.show_box').removeClass("show");
    setTimeout(function(){
        $("div.confirm,.show_box").remove();
    },300)
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
    })
});