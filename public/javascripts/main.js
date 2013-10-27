/**
 * Created by never on 13-10-27.
 */
(function (e) {
    function n(e, t, n, r, i) {
        this._listener = t, this._isOnce = n, this.context = r, this._signal = e, this._priority = i || 0
    }

    var t = {VERSION: "0.6.1"};
    n.prototype = {active: !0, execute: function (e) {
        var t;
        return this.active && (t = this._listener.apply(this.context, e), this._isOnce && this.detach()), t
    }, detach: function () {
        return this._signal.remove(this._listener)
    }, getListener: function () {
        return this._listener
    }, dispose: function () {
        this.detach(), this._destroy()
    }, _destroy: function () {
        delete this._signal, delete this._isOnce, delete this._listener, delete this.context
    }, isOnce: function () {
        return this._isOnce
    }, toString: function () {
        return "[SignalBinding isOnce: " + this._isOnce + ", active: " + this.active + "]"
    }}, t.Signal = function () {
        this._bindings = []
    }, t.Signal.prototype = {_shouldPropagate: !0, active: !0, _registerListener: function (e, t, r, i) {
        if (typeof e != "function")
            throw new Error("listener is a required param of add() and addOnce() and should be a Function.");
        var s = this._indexOfListener(e), o;
        if (s !== -1) {
            o = this._bindings[s];
            if (o.isOnce() !== t)
                throw new Error("You cannot add" + (t ? "" : "Once") + "() then add" + (t ? "Once" : "") + "() the same listener without removing the relationship first.")
        } else
            o = new n(this, e, t, r, i), this._addBinding(o);
        return o
    }, _addBinding: function (e) {
        var t = this._bindings.length;
        do
            --t;
        while (this._bindings[t] && e._priority <= this._bindings[t]._priority);
        this._bindings.splice(t + 1, 0, e)
    }, _indexOfListener: function (e) {
        var t = this._bindings.length;
        while (t--)
            if (this._bindings[t]._listener === e)
                return t;
        return -1
    }, add: function (e, t, n) {
        return this._registerListener(e, !1, t, n)
    }, addOnce: function (e, t, n) {
        return this._registerListener(e, !0, t, n)
    }, remove: function (e) {
        if (typeof e != "function")
            throw new Error("listener is a required param of remove() and should be a Function.");
        var t = this._indexOfListener(e);
        return t !== -1 && (this._bindings[t]._destroy(), this._bindings.splice(t, 1)), e
    }, removeAll: function () {
        var e = this._bindings.length;
        while (e--)
            this._bindings[e]._destroy();
        this._bindings.length = 0
    }, getNumListeners: function () {
        return this._bindings.length
    }, halt: function () {
        this._shouldPropagate = !1
    }, dispatch: function (e) {
        if (!this.active)
            return;
        var t = Array.prototype.slice.call(arguments), n = this._bindings.slice(), r = this._bindings.length;
        this._shouldPropagate = !0;
        do
            r--;
        while (n[r] && this._shouldPropagate && n[r].execute(t) !== !1)
    }, dispose: function () {
        this.removeAll(), delete this._bindings
    }, toString: function () {
        return "[Signal active: " + this.active + " numListeners: " + this.getNumListeners() + "]"
    }}, e.signals = t
})(window || global || this);
HistoryController = {MAX_SIZE: 100, MAX_FREQUENCY: 1500, MODE_RESTING: 1, MODE_UNDOING: 2, MODE_REDOING: 3, init: function () {
    this.past = [], this.future = [], this.mode = HistoryController.MODE_RESTING, this.lastPushTime = -1, this.changed = new signals.Signal, this.undid = new signals.Signal, this.redid = new signals.Signal
}, push: function (e, t) {
    t = t || {};
    var n = Date.now();
    if (n - this.lastPushTime > HistoryController.MAX_FREQUENCY || t.skipTimeLimit) {
        this.lastPushTime = Date.now();
        var r = {data: e, indices: Reveal.getIndices()}, i="edit";
        i && (r.mode = i.id);
        var s = this.past[this.past.length - 1], o = this.future[this.future.length - 1];
        (!s || r.data !== s.data) && (!o || r.data !== o.data) && (this.future.length && this.past.push(this.future.pop()), this.future.length = 0, this.past.push(r), this.mode = HistoryController.MODE_RESTING, this.changed.dispatch());
        while (this.past.length > HistoryController.MAX_SIZE)
            this.past.shift()
    }
}, undo: function (e) {
    e = e || {};
    var t = this.past.pop();
    return t && this.mode !== HistoryController.MODE_UNDOING && (this.future.push(t), t = this.past.pop()), t && (this.mode = HistoryController.MODE_UNDOING, this.future.push(t), this.lastPushTime = Date.now(), e.ignoreMode && (t = JSON.parse(JSON.stringify(t)), t.mode = null), this.undid.dispatch(t), this.changed.dispatch()), t
}, redo: function (e) {
    e = e || {};
    var t = this.future.pop();
    return t && this.mode !== HistoryController.MODE_REDOING && (this.past.push(t), t = this.future.pop()), t && (this.mode = HistoryController.MODE_REDOING, this.past.push(t), this.lastPushTime = Date.now(), e.ignoreMode && (t = JSON.parse(JSON.stringify(t)), t.mode = null), this.redid.dispatch(t), this.changed.dispatch()), t
}, canUndo: function () {
    return this.past.length > 0
}, canRedo: function () {
    return this.future.length > 0
}};
UndoButton = {create: function () {
    skriv.actions.undo = skriv.actions.dropdown.extend({init: function (e, t) {
        this.isOver = !1, this.options = [
            {name: "Redo", value: "redo"}
        ], this._super(e, t), HistoryController.changed.add(this.sync.bind(this)), this.sync()
    }, build: function () {
        this._super(), this.buttonElement.classList.add("undo"), this.buttonElement.classList.add("icon"), this.domElement.style.width = "40px", this.panelElement.style.width = "50px"
    }, addOption: function (e) {
        this.redoButton = document.createElement("li"), this.redoButton.setAttribute("data-value", e.value), this.bindOption(this.redoButton, e);
        var t = document.createElement("div");
        t.className = "redo icon " + e.value, this.redoButton.appendChild(t), this.dropdownElement.appendChild(this.redoButton)
    }, bindOption: function (e, t) {
        e.addEventListener("click", function (e) {
            HistoryController.redo({ignoreMode: !0})
        }.bind(this, t.value), !1)
    }, sync: function () {
        HistoryController.canUndo() ? this.buttonElement.classList.remove("disabled") : this.buttonElement.classList.add("disabled"), HistoryController.canRedo() ? this.isOver && this.open() : this.close()
    }, trigger: function () {
    }, toggle: function () {
    }, onClick: function (e) {
        this._super(e), HistoryController.undo({ignoreMode: !0})
    }, onMouseOver: function (e) {
        this.isOver = !0, HistoryController.canRedo() && this.open()
    }, onMouseOut: function (e) {
        this.isOver = !1, this.close()
    }})
}};
HistoryController.init();
UndoButton.create();
var initEditor= function(){
    window.editor={};


//        SL.views.decks.edit.UndoButton.create();
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
//    $('#post_editor').('click', function(e){
//        console.log(e);
//        alert($(this).find('img').index(this) );
//    });
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
//                var thisWidth= e.pageX - $(this).parent().offset().left,
//                    thisHeight= e.pageY-$(this).parent().offset().top;
//                console.log(thisHeight,thisHeight);
//                $(this).parent().find("img").css({width: thisWidth,height: thisHeight})
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