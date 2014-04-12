// Generated by CoffeeScript 1.7.1
(function() {
  var Editor, MarkdowEditor, a, aviableHeight, htmlPreview, markdownShortCuts;

  markdownShortCuts = [
    {
      'key': 'Ctrl+B',
      'style': 'bold'
    }, {
      'key': 'Meta+B',
      'style': 'bold'
    }, {
      'key': 'Ctrl+I',
      'style': 'italic'
    }, {
      'key': 'Meta+I',
      'style': 'italic'
    }, {
      'key': 'Ctrl+Alt+U',
      'style': 'strike'
    }, {
      'key': 'Ctrl+Shift+K',
      'style': 'code'
    }, {
      'key': 'Meta+K',
      'style': 'code'
    }, {
      'key': 'Ctrl+Alt+1',
      'style': 'h1'
    }, {
      'key': 'Ctrl+Alt+2',
      'style': 'h2'
    }, {
      'key': 'Ctrl+Alt+3',
      'style': 'h3'
    }, {
      'key': 'Ctrl+Alt+4',
      'style': 'h4'
    }, {
      'key': 'Ctrl+Alt+5',
      'style': 'h5'
    }, {
      'key': 'Ctrl+Alt+6',
      'style': 'h6'
    }, {
      'key': 'Ctrl+Shift+L',
      'style': 'link'
    }, {
      'key': 'Ctrl+Shift+I',
      'style': 'image'
    }, {
      'key': 'Ctrl+Q',
      'style': 'blockquote'
    }, {
      'key': 'Ctrl+Shift+1',
      'style': 'currentDate'
    }, {
      'key': 'Ctrl+U',
      'style': 'uppercase'
    }, {
      'key': 'Ctrl+Shift+U',
      'style': 'lowercase'
    }, {
      'key': 'Ctrl+Alt+Shift+U',
      'style': 'titlecase'
    }, {
      'key': 'Ctrl+Alt+W',
      'style': 'selectword'
    }, {
      'key': 'Ctrl+L',
      'style': 'list'
    }, {
      'key': 'Ctrl+Alt+C',
      'style': 'copyHTML'
    }, {
      'key': 'Meta+Alt+C',
      'style': 'copyHTML'
    }, {
      'key': 'Meta+Enter',
      'style': 'newLine'
    }, {
      'key': 'Ctrl+Enter',
      'style': 'newLine'
    }
  ];

  MarkdowEditor = function() {
    var codemirror, combo, _i, _len;
    codemirror = CodeMirror.fromTextArea(document.getElementById("post_content"), {
      mode: 'gfm',
      tabMode: 'indent',
      tabindex: '2',
      cursorScrollMargin: 10,
      lineWrapping: true,
      dragDrop: false,
      extraKeys: {
        Home: 'goLineLeft',
        End: 'goLineRight'
      }
    });
    for (_i = 0, _len = markdownShortCuts.length; _i < _len; _i++) {
      combo = markdownShortCuts[_i];
      shortcut.add(combo.key, function() {
        return codemirror.addMarkdown({
          styles: combo.style
        });
      });
    }
    return this.prototype = {
      codemirror: codemirror,
      scrollViewPort: function() {
        return $('.CodeMirror-scroll');
      },
      scrollContent: function() {
        return $('.CodeMirror-sizer');
      },
      enable: function() {
        codemirror.setOption('readOnly', false);
        codemirror.on('change', function() {
          return $(document).trigger('markdownEditorChange');
        });
        return codemirror.on("scroll", function(a) {
          var previewElement, previewOuter, scrollInfo, scrollTop;
          scrollInfo = a.getScrollInfo();
          previewOuter = $('.markdown_preview');
          previewElement = $('.preview_html');
          scrollTop = scrollInfo.top / (scrollInfo.height - previewOuter.outerHeight()) * (previewElement.outerHeight() - previewOuter.outerHeight());
          return previewOuter.stop().animate({
            scrollTop: scrollTop
          }, 100);
        });
      },
      disable: function() {
        codemirror.setOption('readOnly', true);
        return codemirror.off('change', function() {
          return $(document).trigger('markdownEditorChange');
        });
      },
      isCursorAtEnd: function() {
        return codemirror.getCursor('end').line > codemirror.lineCount() - 5;
      },
      value: function() {
        return codemirror.getValue();
      }
    };
  };

  window.MarkdowEditor = MarkdowEditor;

  htmlPreview = function(md, uploadMgr) {
    var converter, preview, update;
    converter = new Showdown.converter({
      extensions: ['imagepreview', 'gfm']
    });
    preview = document.getElementsByClassName('preview_html')[0];
    update = function() {
      console.log(md);
      window.md = md;
      return preview.innerHTML = converter.makeHtml(md.value());
    };
    return this.prototype = {
      update: update
    };
  };

  window.htmlPreview = htmlPreview;

  Editor = function() {
    var handlDrag, handleChange, markdown, preview, unloadDirtyMessage;
    markdown = new MarkdowEditor();
    preview = htmlPreview(markdown);
    unloadDirtyMessage = function() {
      return "You have unsaved content.";
    };
    handleChange = (function(_this) {
      return function() {
        _this.prototype.setDirty(true);
        return preview.update();
      };
    })(this);
    handlDrag = function(e) {
      return e.preventDefault();
    };
    this.prototype = {
      enable: function() {
        $(document).on('markdownEditorChange', handleChange);
        return markdown.enable();
      },
      disable: function() {
        $(document).off('markdownEditorChage', handleChange);
        return markdown.disable();
      },
      setDirty: function(dirty) {
        return window.onbeforeunload = dirty != null ? dirty : {
          unloadDirtyMessage: null
        };
      }
    };
    preview.update();
    return this.prototype.enable();
  };

  window.Editor = Editor;

  a = new Editor();

  if ($('.markdown_text').size() > 0) {
    $('.logo').addClass('abs');
    $('header nav').removeClass('container');
    $("main").css({
      "padding": 0
    });
    $("header").css('border', 0);
    $('footer').hide();
    aviableHeight = window.innerHeight - 120;
    $(".markdown_container").css('height', aviableHeight);
    $('.markdown #post_title_outer').css('width', window.innerWidth - 601);
    window.onresize = function() {
      $('.markdown #post_title_outer').css('width', window.innerWidth - 601);
      return $(".markdown_container").css('height', window.innerHeight - 120);
    };
  }

}).call(this);

//# sourceMappingURL=markdown.map
