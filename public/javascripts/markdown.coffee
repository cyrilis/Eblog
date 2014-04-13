markdownShortCuts = [
  {'key': 'Ctrl+B', 'style': 'bold'},
  {'key': 'Meta+B', 'style': 'bold'},
  {'key': 'Ctrl+I', 'style': 'italic'},
  {'key': 'Meta+I', 'style': 'italic'},
  {'key': 'Ctrl+Alt+U', 'style': 'strike'},
  {'key': 'Ctrl+Shift+K', 'style': 'code'},
  {'key': 'Meta+K', 'style': 'code'},
  {'key': 'Ctrl+Alt+1', 'style': 'h1'},
  {'key': 'Ctrl+Alt+2', 'style': 'h2'},
  {'key': 'Ctrl+Alt+3', 'style': 'h3'},
  {'key': 'Ctrl+Alt+4', 'style': 'h4'},
  {'key': 'Ctrl+Alt+5', 'style': 'h5'},
  {'key': 'Ctrl+Alt+6', 'style': 'h6'},
  {'key': 'Ctrl+Shift+L', 'style': 'link'},
  {'key': 'Ctrl+Shift+I', 'style': 'image'},
  {'key': 'Ctrl+Q', 'style': 'blockquote'},
  {'key': 'Ctrl+Shift+1', 'style': 'currentDate'},
  {'key': 'Ctrl+U', 'style': 'uppercase'},
  {'key': 'Ctrl+Shift+U', 'style': 'lowercase'},
  {'key': 'Ctrl+Alt+Shift+U', 'style': 'titlecase'},
  {'key': 'Ctrl+Alt+W', 'style': 'selectword'},
  {'key': 'Ctrl+L', 'style': 'list'},
  {'key': 'Ctrl+Alt+C', 'style': 'copyHTML'},
  {'key': 'Meta+Alt+C', 'style': 'copyHTML'},
  {'key': 'Meta+Enter', 'style': 'newLine'},
  {'key': 'Ctrl+Enter', 'style': 'newLine'}
]
MarkdowEditor = ->
  codemirror = CodeMirror.fromTextArea(document.getElementById("post_content"),{
    mode: 'gfm'
    tabMode: 'indent',
    tabindex: '2'
    cursorScrollMargin: 10
    lineWrapping: true
    dragDrop: false
    extraKeys: {
      Home: 'goLineLeft',
      End: 'goLineRight'
    }
  })
  for combo in markdownShortCuts
    shortcut.add(combo.key, ->
      codemirror.addMarkdown({styles: combo.style})
    )
  @::=
    codemirror: codemirror,
    scrollViewPort: ->
      $('.CodeMirror-scroll')
    scrollContent: ->
      $('.CodeMirror-sizer')
    enable: ->
      codemirror.setOption('readOnly',false)
      codemirror.on('change',->
        $(document).trigger('markdownEditorChange')
      )
      codemirror.on "scroll", (a)->
        scrollInfo = a.getScrollInfo()
        previewOuter = $('.markdown_preview')
        previewElement = $('.preview_html')
        scrollTop = scrollInfo.top/(scrollInfo.height-previewOuter.outerHeight())*(previewElement.outerHeight()-previewOuter.outerHeight())
        previewOuter.stop().animate({scrollTop: scrollTop}, 100)
    disable: ->
      codemirror.setOption('readOnly',true)
      codemirror.off('change',->
        $(document).trigger('markdownEditorChange')
      )
    isCursorAtEnd: ->
      codemirror.getCursor('end').line> codemirror.lineCount() - 5
    value: ->
      codemirror.getValue()

window.MarkdowEditor = MarkdowEditor

#
# htmlPreview
#

htmlPreview = (md, uploadMgr)->
  converter = new Showdown.converter({extensions: ['imagepreview', 'gfm']})
  preview = document.getElementsByClassName('preview_html')[0]

  update = ->
    console.log md
    window.md = md
    preview.innerHTML = converter.makeHtml(md.value())

    #uploadMgr.enable()

  @::=
    update: update

window.htmlPreview = htmlPreview



#
# scrollHandler
#
# todo: not that important
#scrollHandler = (markdown, preview)->
#  $markdownViewPort = markdown.scrollViewPort()
#  $previewViewPort = markdown.scrollViewPort()
#  $markdownContent = markdown.scrollContent()
#  $previewContent = markdown.scrollContent()
#  syncScroll =

#
# Customize
#

Editor = ->

  markdown = new MarkdowEditor()
  #uploadMgr = new UploadMgr()
  preview = htmlPreview markdown #todo , uploadmrg
  unloadDirtyMessage = ->
    "You have unsaved content."
  handleChange = =>
    @::.setDirty(true);
    preview.update();
  handlDrag = (e)->
    e.preventDefault()

  @::=
    enable : ->
      $(document).on('markdownEditorChange', handleChange)
      markdown.enable();
    disable: ->
      $(document).off('markdownEditorChage', handleChange)
      markdown.disable()
    setDirty: (dirty)->
      window.onbeforeunload = dirty ? unloadDirtyMessage: null

  preview.update()
  @::.enable()
window.Editor  = Editor
a = new Editor()

#
# For Blog js
#

if $('.markdown_text').size() > 0
  $('.logo').addClass('abs')
  $('header nav').removeClass('container')
  $("main").css("padding",0)
  $("header").css('border',0)
  $('footer').hide()
  aviableHeight = window.innerHeight - 120 #todo: remove magic number
  $(".markdown_container").css('height',aviableHeight)
  $('.markdown #post_title_outer').css('width',window.innerWidth - 601)
  window.onresize = ->
    $('.markdown #post_title_outer').css('width',window.innerWidth - 601)
    $(".markdown_container").css('height', window.innerHeight - 120)