/*
 Copyright (c) 2010, Ajax.org B.V.
 All rights reserved.

 Redistribution and use in source and binary forms, with or without
 modification, are permitted provided that the following conditions are met:
 * Redistributions of source code must retain the above copyright
 notice, this list of conditions and the following disclaimer.
 * Redistributions in binary form must reproduce the above copyright
 notice, this list of conditions and the following disclaimer in the
 documentation and/or other materials provided with the distribution.
 * Neither the name of Ajax.org B.V. nor the
 names of its contributors may be used to endorse or promote products
 derived from this software without specific prior written permission.

 THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
 ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
 WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
 DISCLAIMED. IN NO EVENT SHALL AJAX.ORG B.V. BE LIABLE FOR ANY
 DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
 (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
 LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND
 ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
 (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
 SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */
(function () {
    function e(e) {
        var t = function (e, t) {
            return i("", e, t)
        }, s = n;
        e && (n[e] || (n[e] = {}), s = n[e]);
        if (!s.define || !s.define.packaged)r.original = s.define, s.define = r, s.define.packaged = !0;
        if (!s.require || !s.require.packaged)i.original = s.require, s.require = t, s.require.packaged = !0
    }

    var t = "", n = function () {
        return this
    }();
    if (!t && typeof requirejs != "undefined")return;
    var r = function (e, t, n) {
        if (typeof e != "string") {
            r.original ? r.original.apply(window, arguments) : (console.error("dropping module because define wasn't a string."), console.trace());
            return
        }
        arguments.length == 2 && (n = t), r.modules || (r.modules = {}), r.modules[e] = n
    }, i = function (e, t, n) {
        if (Object.prototype.toString.call(t) === "[object Array]") {
            var r = [];
            for (var s = 0, u = t.length; s < u; ++s) {
                var a = o(e, t[s]);
                if (!a && i.original)return i.original.apply(window, arguments);
                r.push(a)
            }
            n && n.apply(null, r)
        } else {
            if (typeof t == "string") {
                var f = o(e, t);
                return!f && i.original ? i.original.apply(window, arguments) : (n && n(), f)
            }
            if (i.original)return i.original.apply(window, arguments)
        }
    }, s = function (e, t) {
        if (t.indexOf("!") !== -1) {
            var n = t.split("!");
            return s(e, n[0]) + "!" + s(e, n[1])
        }
        if (t.charAt(0) == ".") {
            var r = e.split("/").slice(0, -1).join("/");
            t = r + "/" + t;
            while (t.indexOf(".") !== -1 && i != t) {
                var i = t;
                t = t.replace(/\/\.\//, "/").replace(/[^\/]+\/\.\.\//, "")
            }
        }
        return t
    }, o = function (e, t) {
        t = s(e, t);
        var n = r.modules[t];
        if (!n)return null;
        if (typeof n == "function") {
            var o = {}, u = {id: t, uri: "", exports: o, packaged: !0}, a = function (e, n) {
                return i(t, e, n)
            }, f = n(a, o, u);
            return o = f || u.exports, r.modules[t] = o, o
        }
        return n
    };
    e(t)
})(), define("ace/ace", ["require", "exports", "module", "ace/lib/fixoldbrowsers", "ace/lib/dom", "ace/lib/event", "ace/editor", "ace/edit_session", "ace/undomanager", "ace/virtual_renderer", "ace/multi_select", "ace/worker/worker_client", "ace/keyboard/hash_handler", "ace/placeholder", "ace/mode/folding/fold_mode", "ace/theme/textmate", "ace/config"], function (e, t, n) {
    e("./lib/fixoldbrowsers");
    var r = e("./lib/dom"), i = e("./lib/event"), s = e("./editor").Editor, o = e("./edit_session").EditSession, u = e("./undomanager").UndoManager, a = e("./virtual_renderer").VirtualRenderer, f = e("./multi_select").MultiSelect;
    e("./worker/worker_client"), e("./keyboard/hash_handler"), e("./placeholder"), e("./mode/folding/fold_mode"), e("./theme/textmate"), t.config = e("./config"), t.require = e, t.edit = function (e) {
        if (typeof e == "string") {
            var n = e, e = document.getElementById(n);
            if (!e)throw"ace.edit can't find div #" + n
        }
        if (e.env && e.env.editor instanceof s)return e.env.editor;
        var o = t.createEditSession(r.getInnerText(e));
        e.innerHTML = "";
        var u = new s(new a(e));
        new f(u), u.setSession(o);
        var l = {document: o, editor: u, onResize: u.resize.bind(u, null)};
        return i.addListener(window, "resize", l.onResize), u.on("destroy", function () {
            i.removeListener(window, "resize", l.onResize)
        }), e.env = u.env = l, u
    }, t.createEditSession = function (e, t) {
        var n = new o(e, n);
        return n.setUndoManager(new u), n
    }, t.EditSession = o, t.UndoManager = u
}), define("ace/lib/fixoldbrowsers", ["require", "exports", "module", "ace/lib/regexp", "ace/lib/es5-shim"], function (e, t, n) {
    e("./regexp"), e("./es5-shim")
}), define("ace/lib/regexp", ["require", "exports", "module"], function (e, t, n) {
    function r(e) {
        return(e.global ? "g" : "") + (e.ignoreCase ? "i" : "") + (e.multiline ? "m" : "") + (e.extended ? "x" : "") + (e.sticky ? "y" : "")
    }

    function i(e, t, n) {
        if (Array.prototype.indexOf)return e.indexOf(t, n);
        for (var r = n || 0; r < e.length; r++)if (e[r] === t)return r;
        return-1
    }

    var s = {exec: RegExp.prototype.exec, test: RegExp.prototype.test, match: String.prototype.match, replace: String.prototype.replace, split: String.prototype.split}, o = s.exec.call(/()??/, "")[1] === undefined, u = function () {
        var e = /^/g;
        return s.test.call(e, ""), !e.lastIndex
    }();
    if (u && o)return;
    RegExp.prototype.exec = function (e) {
        var t = s.exec.apply(this, arguments), n, a;
        if (typeof e == "string" && t) {
            !o && t.length > 1 && i(t, "") > -1 && (a = RegExp(this.source, s.replace.call(r(this), "g", "")), s.replace.call(e.slice(t.index), a, function () {
                for (var e = 1; e < arguments.length - 2; e++)arguments[e] === undefined && (t[e] = undefined)
            }));
            if (this._xregexp && this._xregexp.captureNames)for (var f = 1; f < t.length; f++)n = this._xregexp.captureNames[f - 1], n && (t[n] = t[f]);
            !u && this.global && !t[0].length && this.lastIndex > t.index && this.lastIndex--
        }
        return t
    }, u || (RegExp.prototype.test = function (e) {
        var t = s.exec.call(this, e);
        return t && this.global && !t[0].length && this.lastIndex > t.index && this.lastIndex--, !!t
    })
}), define("ace/lib/es5-shim", ["require", "exports", "module"], function (e, t, n) {
    function r() {
    }

    function i(e) {
        try {
            return Object.defineProperty(e, "sentinel", {}), "sentinel"in e
        } catch (t) {
        }
    }

    function s(e) {
        return e = +e, e !== e ? e = 0 : e !== 0 && e !== 1 / 0 && e !== -1 / 0 && (e = (e > 0 || -1) * Math.floor(Math.abs(e))), e
    }

    function o(e) {
        var t = typeof e;
        return e === null || t === "undefined" || t === "boolean" || t === "number" || t === "string"
    }

    function u(e) {
        var t, n, r;
        if (o(e))return e;
        n = e.valueOf;
        if (typeof n == "function") {
            t = n.call(e);
            if (o(t))return t
        }
        r = e.toString;
        if (typeof r == "function") {
            t = r.call(e);
            if (o(t))return t
        }
        throw new TypeError
    }

    Function.prototype.bind || (Function.prototype.bind = function (e) {
        var t = this;
        if (typeof t != "function")throw new TypeError("Function.prototype.bind called on incompatible " + t);
        var n = c.call(arguments, 1), i = function () {
            if (this instanceof i) {
                var r = t.apply(this, n.concat(c.call(arguments)));
                return Object(r) === r ? r : this
            }
            return t.apply(e, n.concat(c.call(arguments)))
        };
        return t.prototype && (r.prototype = t.prototype, i.prototype = new r, r.prototype = null), i
    });
    var a = Function.prototype.call, f = Array.prototype, l = Object.prototype, c = f.slice, h = a.bind(l.toString), p = a.bind(l.hasOwnProperty), d, v, m, g, y;
    if (y = p(l, "__defineGetter__"))d = a.bind(l.__defineGetter__), v = a.bind(l.__defineSetter__), m = a.bind(l.__lookupGetter__), g = a.bind(l.__lookupSetter__);
    if ([1, 2].splice(0).length != 2)if (!function () {
        function e(e) {
            var t = new Array(e + 2);
            return t[0] = t[1] = 0, t
        }

        var t = [], n;
        t.splice.apply(t, e(20)), t.splice.apply(t, e(26)), n = t.length, t.splice(5, 0, "XXX"), n + 1 == t.length;
        if (n + 1 == t.length)return!0
    }())Array.prototype.splice = function (e, t) {
        var n = this.length;
        e > 0 ? e > n && (e = n) : e == void 0 ? e = 0 : e < 0 && (e = Math.max(n + e, 0)), e + t < n || (t = n - e);
        var r = this.slice(e, e + t), i = c.call(arguments, 2), s = i.length;
        if (e === n)s && this.push.apply(this, i); else {
            var o = Math.min(t, n - e), u = e + o, a = u + s - o, f = n - u, l = n - o;
            if (a < u)for (var h = 0; h < f; ++h)this[a + h] = this[u + h]; else if (a > u)for (h = f; h--;)this[a + h] = this[u + h];
            if (s && e === l)this.length = l, this.push.apply(this, i); else {
                this.length = l + s;
                for (h = 0; h < s; ++h)this[e + h] = i[h]
            }
        }
        return r
    }; else {
        var b = Array.prototype.splice;
        Array.prototype.splice = function (e, t) {
            return arguments.length ? b.apply(this, [e === void 0 ? 0 : e, t === void 0 ? this.length - e : t].concat(c.call(arguments, 2))) : []
        }
    }
    Array.isArray || (Array.isArray = function (e) {
        return h(e) == "[object Array]"
    });
    var w = Object("a"), E = w[0] != "a" || !(0 in w);
    Array.prototype.forEach || (Array.prototype.forEach = function (e) {
        var t = F(this), n = E && h(this) == "[object String]" ? this.split("") : t, r = arguments[1], i = -1, s = n.length >>> 0;
        if (h(e) != "[object Function]")throw new TypeError;
        while (++i < s)i in n && e.call(r, n[i], i, t)
    }), Array.prototype.map || (Array.prototype.map = function (e) {
        var t = F(this), n = E && h(this) == "[object String]" ? this.split("") : t, r = n.length >>> 0, i = Array(r), s = arguments[1];
        if (h(e) != "[object Function]")throw new TypeError(e + " is not a function");
        for (var o = 0; o < r; o++)o in n && (i[o] = e.call(s, n[o], o, t));
        return i
    }), Array.prototype.filter || (Array.prototype.filter = function (e) {
        var t = F(this), n = E && h(this) == "[object String]" ? this.split("") : t, r = n.length >>> 0, i = [], s, o = arguments[1];
        if (h(e) != "[object Function]")throw new TypeError(e + " is not a function");
        for (var u = 0; u < r; u++)u in n && (s = n[u], e.call(o, s, u, t) && i.push(s));
        return i
    }), Array.prototype.every || (Array.prototype.every = function (e) {
        var t = F(this), n = E && h(this) == "[object String]" ? this.split("") : t, r = n.length >>> 0, i = arguments[1];
        if (h(e) != "[object Function]")throw new TypeError(e + " is not a function");
        for (var s = 0; s < r; s++)if (s in n && !e.call(i, n[s], s, t))return!1;
        return!0
    }), Array.prototype.some || (Array.prototype.some = function (e) {
        var t = F(this), n = E && h(this) == "[object String]" ? this.split("") : t, r = n.length >>> 0, i = arguments[1];
        if (h(e) != "[object Function]")throw new TypeError(e + " is not a function");
        for (var s = 0; s < r; s++)if (s in n && e.call(i, n[s], s, t))return!0;
        return!1
    }), Array.prototype.reduce || (Array.prototype.reduce = function (e) {
        var t = F(this), n = E && h(this) == "[object String]" ? this.split("") : t, r = n.length >>> 0;
        if (h(e) != "[object Function]")throw new TypeError(e + " is not a function");
        if (!r && arguments.length == 1)throw new TypeError("reduce of empty array with no initial value");
        var i = 0, s;
        if (arguments.length >= 2)s = arguments[1]; else do {
            if (i in n) {
                s = n[i++];
                break
            }
            if (++i >= r)throw new TypeError("reduce of empty array with no initial value")
        } while (!0);
        for (; i < r; i++)i in n && (s = e.call(void 0, s, n[i], i, t));
        return s
    }), Array.prototype.reduceRight || (Array.prototype.reduceRight = function (e) {
        var t = F(this), n = E && h(this) == "[object String]" ? this.split("") : t, r = n.length >>> 0;
        if (h(e) != "[object Function]")throw new TypeError(e + " is not a function");
        if (!r && arguments.length == 1)throw new TypeError("reduceRight of empty array with no initial value");
        var i, s = r - 1;
        if (arguments.length >= 2)i = arguments[1]; else do {
            if (s in n) {
                i = n[s--];
                break
            }
            if (--s < 0)throw new TypeError("reduceRight of empty array with no initial value")
        } while (!0);
        do s in this && (i = e.call(void 0, i, n[s], s, t)); while (s--);
        return i
    });
    if (!Array.prototype.indexOf || [0, 1].indexOf(1, 2) != -1)Array.prototype.indexOf = function (e) {
        var t = E && h(this) == "[object String]" ? this.split("") : F(this), n = t.length >>> 0;
        if (!n)return-1;
        var r = 0;
        arguments.length > 1 && (r = s(arguments[1])), r = r >= 0 ? r : Math.max(0, n + r);
        for (; r < n; r++)if (r in t && t[r] === e)return r;
        return-1
    };
    if (!Array.prototype.lastIndexOf || [0, 1].lastIndexOf(0, -3) != -1)Array.prototype.lastIndexOf = function (e) {
        var t = E && h(this) == "[object String]" ? this.split("") : F(this), n = t.length >>> 0;
        if (!n)return-1;
        var r = n - 1;
        arguments.length > 1 && (r = Math.min(r, s(arguments[1]))), r = r >= 0 ? r : n - Math.abs(r);
        for (; r >= 0; r--)if (r in t && e === t[r])return r;
        return-1
    };
    Object.getPrototypeOf || (Object.getPrototypeOf = function (e) {
        return e.__proto__ || (e.constructor ? e.constructor.prototype : l)
    });
    if (!Object.getOwnPropertyDescriptor) {
        var S = "Object.getOwnPropertyDescriptor called on a non-object: ";
        Object.getOwnPropertyDescriptor = function (e, t) {
            if (typeof e != "object" && typeof e != "function" || e === null)throw new TypeError(S + e);
            if (!p(e, t))return;
            var n, r, i;
            n = {enumerable: !0, configurable: !0};
            if (y) {
                var s = e.__proto__;
                e.__proto__ = l;
                var r = m(e, t), i = g(e, t);
                e.__proto__ = s;
                if (r || i)return r && (n.get = r), i && (n.set = i), n
            }
            return n.value = e[t], n
        }
    }
    Object.getOwnPropertyNames || (Object.getOwnPropertyNames = function (e) {
        return Object.keys(e)
    });
    if (!Object.create) {
        var x;
        Object.prototype.__proto__ === null ? x = function () {
            return{__proto__: null}
        } : x = function () {
            var e = {};
            for (var t in e)e[t] = null;
            return e.constructor = e.hasOwnProperty = e.propertyIsEnumerable = e.isPrototypeOf = e.toLocaleString = e.toString = e.valueOf = e.__proto__ = null, e
        }, Object.create = function (e, t) {
            var n;
            if (e === null)n = x(); else {
                if (typeof e != "object")throw new TypeError("typeof prototype[" + typeof e + "] != 'object'");
                var r = function () {
                };
                r.prototype = e, n = new r, n.__proto__ = e
            }
            return t !== void 0 && Object.defineProperties(n, t), n
        }
    }
    if (Object.defineProperty) {
        var T = i({}), N = typeof document == "undefined" || i(document.createElement("div"));
        if (!T || !N)var C = Object.defineProperty
    }
    if (!Object.defineProperty || C) {
        var k = "Property description must be an object: ", L = "Object.defineProperty called on non-object: ", A = "getters & setters can not be defined on this javascript engine";
        Object.defineProperty = function (e, t, n) {
            if (typeof e != "object" && typeof e != "function" || e === null)throw new TypeError(L + e);
            if (typeof n != "object" && typeof n != "function" || n === null)throw new TypeError(k + n);
            if (C)try {
                return C.call(Object, e, t, n)
            } catch (r) {
            }
            if (p(n, "value"))if (y && (m(e, t) || g(e, t))) {
                var i = e.__proto__;
                e.__proto__ = l, delete e[t], e[t] = n.value, e.__proto__ = i
            } else e[t] = n.value; else {
                if (!y)throw new TypeError(A);
                p(n, "get") && d(e, t, n.get), p(n, "set") && v(e, t, n.set)
            }
            return e
        }
    }
    Object.defineProperties || (Object.defineProperties = function (e, t) {
        for (var n in t)p(t, n) && Object.defineProperty(e, n, t[n]);
        return e
    }), Object.seal || (Object.seal = function (e) {
        return e
    }), Object.freeze || (Object.freeze = function (e) {
        return e
    });
    try {
        Object.freeze(function () {
        })
    } catch (O) {
        Object.freeze = function (e) {
            return function (t) {
                return typeof t == "function" ? t : e(t)
            }
        }(Object.freeze)
    }
    Object.preventExtensions || (Object.preventExtensions = function (e) {
        return e
    }), Object.isSealed || (Object.isSealed = function (e) {
        return!1
    }), Object.isFrozen || (Object.isFrozen = function (e) {
        return!1
    }), Object.isExtensible || (Object.isExtensible = function (e) {
        if (Object(e) === e)throw new TypeError;
        var t = "";
        while (p(e, t))t += "?";
        e[t] = !0;
        var n = p(e, t);
        return delete e[t], n
    });
    if (!Object.keys) {
        var M = !0, _ = ["toString", "toLocaleString", "valueOf", "hasOwnProperty", "isPrototypeOf", "propertyIsEnumerable", "constructor"], D = _.length;
        for (var P in{toString: null})M = !1;
        Object.keys = function I(e) {
            if (typeof e != "object" && typeof e != "function" || e === null)throw new TypeError("Object.keys called on a non-object");
            var I = [];
            for (var t in e)p(e, t) && I.push(t);
            if (M)for (var n = 0, r = D; n < r; n++) {
                var i = _[n];
                p(e, i) && I.push(i)
            }
            return I
        }
    }
    Date.now || (Date.now = function () {
        return(new Date).getTime()
    });
    var H = "	\n\f\r ????????????????　\u2028\u2029?";
    if (!String.prototype.trim || H.trim()) {
        H = "[" + H + "]";
        var B = new RegExp("^" + H + H + "*"), j = new RegExp(H + H + "*$");
        String.prototype.trim = function () {
            return String(this).replace(B, "").replace(j, "")
        }
    }
    var F = function (e) {
        if (e == null)throw new TypeError("can't convert " + e + " to object");
        return Object(e)
    }
}), define("ace/lib/dom", ["require", "exports", "module"], function (e, t, n) {
    if (typeof document == "undefined")return;
    var r = "http://www.w3.org/1999/xhtml";
    t.getDocumentHead = function (e) {
        return e || (e = document), e.head || e.getElementsByTagName("head")[0] || e.documentElement
    }, t.createElement = function (e, t) {
        return document.createElementNS ? document.createElementNS(t || r, e) : document.createElement(e)
    }, t.hasCssClass = function (e, t) {
        var n = e.className.split(/\s+/g);
        return n.indexOf(t) !== -1
    }, t.addCssClass = function (e, n) {
        t.hasCssClass(e, n) || (e.className += " " + n)
    }, t.removeCssClass = function (e, t) {
        var n = e.className.split(/\s+/g);
        for (; ;) {
            var r = n.indexOf(t);
            if (r == -1)break;
            n.splice(r, 1)
        }
        e.className = n.join(" ")
    }, t.toggleCssClass = function (e, t) {
        var n = e.className.split(/\s+/g), r = !0;
        for (; ;) {
            var i = n.indexOf(t);
            if (i == -1)break;
            r = !1, n.splice(i, 1)
        }
        return r && n.push(t), e.className = n.join(" "), r
    }, t.setCssClass = function (e, n, r) {
        r ? t.addCssClass(e, n) : t.removeCssClass(e, n)
    }, t.hasCssString = function (e, t) {
        var n = 0, r;
        t = t || document;
        if (t.createStyleSheet && (r = t.styleSheets)) {
            while (n < r.length)if (r[n++].owningElement.id === e)return!0
        } else if (r = t.getElementsByTagName("style"))while (n < r.length)if (r[n++].id === e)return!0;
        return!1
    }, t.importCssString = function (e, n, i) {
        i = i || document;
        if (n && t.hasCssString(n, i))return null;
        var s;
        i.createStyleSheet ? (s = i.createStyleSheet(), s.cssText = e, n && (s.owningElement.id = n)) : (s = i.createElementNS ? i.createElementNS(r, "style") : i.createElement("style"), s.appendChild(i.createTextNode(e)), n && (s.id = n), t.getDocumentHead(i).appendChild(s))
    }, t.importCssStylsheet = function (e, n) {
        if (n.createStyleSheet)n.createStyleSheet(e); else {
            var r = t.createElement("link");
            r.rel = "stylesheet", r.href = e, t.getDocumentHead(n).appendChild(r)
        }
    }, t.getInnerWidth = function (e) {
        return parseInt(t.computedStyle(e, "paddingLeft"), 10) + parseInt(t.computedStyle(e, "paddingRight"), 10) + e.clientWidth
    }, t.getInnerHeight = function (e) {
        return parseInt(t.computedStyle(e, "paddingTop"), 10) + parseInt(t.computedStyle(e, "paddingBottom"), 10) + e.clientHeight
    }, window.pageYOffset !== undefined ? (t.getPageScrollTop = function () {
        return window.pageYOffset
    }, t.getPageScrollLeft = function () {
        return window.pageXOffset
    }) : (t.getPageScrollTop = function () {
        return document.body.scrollTop
    }, t.getPageScrollLeft = function () {
        return document.body.scrollLeft
    }), window.getComputedStyle ? t.computedStyle = function (e, t) {
        return t ? (window.getComputedStyle(e, "") || {})[t] || "" : window.getComputedStyle(e, "") || {}
    } : t.computedStyle = function (e, t) {
        return t ? e.currentStyle[t] : e.currentStyle
    }, t.scrollbarWidth = function (e) {
        var n = t.createElement("ace_inner");
        n.style.width = "100%", n.style.minWidth = "0px", n.style.height = "200px", n.style.display = "block";
        var r = t.createElement("ace_outer"), i = r.style;
        i.position = "absolute", i.left = "-10000px", i.overflow = "hidden", i.width = "200px", i.minWidth = "0px", i.height = "150px", i.display = "block", r.appendChild(n);
        var s = e.documentElement;
        s.appendChild(r);
        var o = n.offsetWidth;
        i.overflow = "scroll";
        var u = n.offsetWidth;
        return o == u && (u = r.clientWidth), s.removeChild(r), o - u
    }, t.setInnerHtml = function (e, t) {
        var n = e.cloneNode(!1);
        return n.innerHTML = t, e.parentNode.replaceChild(n, e), n
    }, "textContent"in document.documentElement ? (t.setInnerText = function (e, t) {
        e.textContent = t
    }, t.getInnerText = function (e) {
        return e.textContent
    }) : (t.setInnerText = function (e, t) {
        e.innerText = t
    }, t.getInnerText = function (e) {
        return e.innerText
    }), t.getParentWindow = function (e) {
        return e.defaultView || e.parentWindow
    }
}), define("ace/lib/event", ["require", "exports", "module", "ace/lib/keys", "ace/lib/useragent", "ace/lib/dom"], function (e, t, n) {
    function r(e, t, n) {
        var r = 0;
        !s.isOpera || "KeyboardEvent"in window || !s.isMac ? r = 0 | (t.ctrlKey ? 1 : 0) | (t.altKey ? 2 : 0) | (t.shiftKey ? 4 : 0) | (t.metaKey ? 8 : 0) : r = 0 | (t.metaKey ? 1 : 0) | (t.altKey ? 2 : 0) | (t.shiftKey ? 4 : 0) | (t.ctrlKey ? 8 : 0);
        if (n in i.MODIFIER_KEYS) {
            switch (i.MODIFIER_KEYS[n]) {
                case"Alt":
                    r = 2;
                    break;
                case"Shift":
                    r = 4;
                    break;
                case"Ctrl":
                    r = 1;
                    break;
                default:
                    r = 8
            }
            n = 0
        }
        return r & 8 && (n == 91 || n == 93) && (n = 0), !!r || n in i.FUNCTION_KEYS || n in i.PRINTABLE_KEYS ? e(t, r, n) : !1
    }

    var i = e("./keys"), s = e("./useragent"), o = e("./dom");
    t.addListener = function (e, t, n) {
        if (e.addEventListener)return e.addEventListener(t, n, !1);
        if (e.attachEvent) {
            var r = function () {
                n(window.event)
            };
            n._wrapper = r, e.attachEvent("on" + t, r)
        }
    }, t.removeListener = function (e, t, n) {
        if (e.removeEventListener)return e.removeEventListener(t, n, !1);
        e.detachEvent && e.detachEvent("on" + t, n._wrapper || n)
    }, t.stopEvent = function (e) {
        return t.stopPropagation(e), t.preventDefault(e), !1
    }, t.stopPropagation = function (e) {
        e.stopPropagation ? e.stopPropagation() : e.cancelBubble = !0
    }, t.preventDefault = function (e) {
        e.preventDefault ? e.preventDefault() : e.returnValue = !1
    }, t.getButton = function (e) {
        return e.type == "dblclick" ? 0 : e.type == "contextmenu" || e.ctrlKey && s.isMac ? 2 : e.preventDefault ? e.button : {1: 0, 2: 2, 4: 1}[e.button]
    }, document.documentElement.setCapture ? t.capture = function (e, n, r) {
        function i(o) {
            n(o), s || (s = !0, r(o)), t.removeListener(e, "mousemove", n), t.removeListener(e, "mouseup", i), t.removeListener(e, "losecapture", i), e.releaseCapture()
        }

        var s = !1;
        t.addListener(e, "mousemove", n), t.addListener(e, "mouseup", i), t.addListener(e, "losecapture", i), e.setCapture()
    } : t.capture = function (e, t, n) {
        function r(e) {
            t && t(e), n && n(e), document.removeEventListener("mousemove", t, !0), document.removeEventListener("mouseup", r, !0), e.stopPropagation()
        }

        document.addEventListener("mousemove", t, !0), document.addEventListener("mouseup", r, !0)
    }, t.addMouseWheelListener = function (e, n) {
        var r = 8, i = function (e) {
            e.wheelDelta !== undefined ? e.wheelDeltaX !== undefined ? (e.wheelX = -e.wheelDeltaX / r, e.wheelY = -e.wheelDeltaY / r) : (e.wheelX = 0, e.wheelY = -e.wheelDelta / r) : e.axis && e.axis == e.HORIZONTAL_AXIS ? (e.wheelX = (e.detail || 0) * 5, e.wheelY = 0) : (e.wheelX = 0, e.wheelY = (e.detail || 0) * 5), n(e)
        };
        t.addListener(e, "DOMMouseScroll", i), t.addListener(e, "mousewheel", i)
    }, t.addMultiMouseDownListener = function (e, n, r, i) {
        var o = 0, u, a, f, l = {2: "dblclick", 3: "tripleclick", 4: "quadclick"};
        t.addListener(e, "mousedown", function (e) {
            if (t.getButton(e) != 0)o = 0; else {
                var s = Math.abs(e.clientX - u) > 5 || Math.abs(e.clientY - a) > 5;
                if (!f || s)o = 0;
                o += 1, f && clearTimeout(f), f = setTimeout(function () {
                    f = null
                }, n[o - 1] || 600)
            }
            o == 1 && (u = e.clientX, a = e.clientY), r[i]("mousedown", e);
            if (o > 4)o = 0; else if (o > 1)return r[i](l[o], e)
        }), s.isOldIE && t.addListener(e, "dblclick", function (e) {
            o = 2, f && clearTimeout(f), f = setTimeout(function () {
                f = null
            }, n[o - 1] || 600), r[i]("mousedown", e), r[i](l[o], e)
        })
    }, t.addCommandKeyListener = function (e, n) {
        var i = t.addListener;
        if (s.isOldGecko || s.isOpera && !("KeyboardEvent"in window)) {
            var o = null;
            i(e, "keydown", function (e) {
                o = e.keyCode
            }), i(e, "keypress", function (e) {
                return r(n, e, o)
            })
        } else {
            var u = null;
            i(e, "keydown", function (e) {
                return u = e.keyIdentifier || e.keyCode, r(n, e, e.keyCode)
            })
        }
    };
    if (window.postMessage && !s.isOldIE) {
        var u = 1;
        t.nextTick = function (e, n) {
            n = n || window;
            var r = "zero-timeout-message-" + u;
            t.addListener(n, "message", function i(s) {
                s.data == r && (t.stopPropagation(s), t.removeListener(n, "message", i), e())
            }), n.postMessage(r, "*")
        }
    }
    t.nextFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame || window.oRequestAnimationFrame, t.nextFrame ? t.nextFrame = t.nextFrame.bind(window) : t.nextFrame = function (e) {
        setTimeout(e, 17)
    }
}), define("ace/lib/keys", ["require", "exports", "module", "ace/lib/oop"], function (e, t, n) {
    var r = e("./oop"), i = function () {
        var e = {MODIFIER_KEYS: {16: "Shift", 17: "Ctrl", 18: "Alt", 224: "Meta"}, KEY_MODS: {ctrl: 1, alt: 2, option: 2, shift: 4, meta: 8, command: 8, cmd: 8}, FUNCTION_KEYS: {8: "Backspace", 9: "Tab", 13: "Return", 19: "Pause", 27: "Esc", 32: "Space", 33: "PageUp", 34: "PageDown", 35: "End", 36: "Home", 37: "Left", 38: "Up", 39: "Right", 40: "Down", 44: "Print", 45: "Insert", 46: "Delete", 96: "Numpad0", 97: "Numpad1", 98: "Numpad2", 99: "Numpad3", 100: "Numpad4", 101: "Numpad5", 102: "Numpad6", 103: "Numpad7", 104: "Numpad8", 105: "Numpad9", 112: "F1", 113: "F2", 114: "F3", 115: "F4", 116: "F5", 117: "F6", 118: "F7", 119: "F8", 120: "F9", 121: "F10", 122: "F11", 123: "F12", 144: "Numlock", 145: "Scrolllock"}, PRINTABLE_KEYS: {32: " ", 48: "0", 49: "1", 50: "2", 51: "3", 52: "4", 53: "5", 54: "6", 55: "7", 56: "8", 57: "9", 59: ";", 61: "=", 65: "a", 66: "b", 67: "c", 68: "d", 69: "e", 70: "f", 71: "g", 72: "h", 73: "i", 74: "j", 75: "k", 76: "l", 77: "m", 78: "n", 79: "o", 80: "p", 81: "q", 82: "r", 83: "s", 84: "t", 85: "u", 86: "v", 87: "w", 88: "x", 89: "y", 90: "z", 107: "+", 109: "-", 110: ".", 188: ",", 190: ".", 191: "/", 192: "`", 219: "[", 220: "\\", 221: "]", 222: "'"}};
        for (var t in e.FUNCTION_KEYS) {
            var n = e.FUNCTION_KEYS[t].toLowerCase();
            e[n] = parseInt(t, 10)
        }
        return r.mixin(e, e.MODIFIER_KEYS), r.mixin(e, e.PRINTABLE_KEYS), r.mixin(e, e.FUNCTION_KEYS), e.enter = e["return"], e.escape = e.esc, e.del = e["delete"], e[173] = "-", e
    }();
    r.mixin(t, i), t.keyCodeToString = function (e) {
        return(i[e] || String.fromCharCode(e)).toLowerCase()
    }
}), define("ace/lib/oop", ["require", "exports", "module"], function (e, t, n) {
    t.inherits = function () {
        var e = function () {
        };
        return function (t, n) {
            e.prototype = n.prototype, t.super_ = n.prototype, t.prototype = new e, t.prototype.constructor = t
        }
    }(), t.mixin = function (e, t) {
        for (var n in t)e[n] = t[n];
        return e
    }, t.implement = function (e, n) {
        t.mixin(e, n)
    }
}), define("ace/lib/useragent", ["require", "exports", "module"], function (e, t, n) {
    t.OS = {LINUX: "LINUX", MAC: "MAC", WINDOWS: "WINDOWS"}, t.getOS = function () {
        return t.isMac ? t.OS.MAC : t.isLinux ? t.OS.LINUX : t.OS.WINDOWS
    };
    if (typeof navigator != "object")return;
    var r = (navigator.platform.match(/mac|win|linux/i) || ["other"])[0].toLowerCase(), i = navigator.userAgent;
    t.isWin = r == "win", t.isMac = r == "mac", t.isLinux = r == "linux", t.isIE = (navigator.appName == "Microsoft Internet Explorer" || navigator.appName.indexOf("MSAppHost") >= 0) && parseFloat(navigator.userAgent.match(/MSIE ([0-9]+[\.0-9]+)/)[1]), t.isOldIE = t.isIE && t.isIE < 9, t.isGecko = t.isMozilla = window.controllers && window.navigator.product === "Gecko", t.isOldGecko = t.isGecko && parseInt((navigator.userAgent.match(/rv\:(\d+)/) || [])[1], 10) < 4, t.isOpera = window.opera && Object.prototype.toString.call(window.opera) == "[object Opera]", t.isWebKit = parseFloat(i.split("WebKit/")[1]) || undefined, t.isChrome = parseFloat(i.split(" Chrome/")[1]) || undefined, t.isAIR = i.indexOf("AdobeAIR") >= 0, t.isIPad = i.indexOf("iPad") >= 0, t.isTouchPad = i.indexOf("TouchPad") >= 0
}), define("ace/editor", ["require", "exports", "module", "ace/lib/fixoldbrowsers", "ace/lib/oop", "ace/lib/dom", "ace/lib/lang", "ace/lib/useragent", "ace/keyboard/textinput", "ace/mouse/mouse_handler", "ace/mouse/fold_handler", "ace/keyboard/keybinding", "ace/edit_session", "ace/search", "ace/range", "ace/lib/event_emitter", "ace/commands/command_manager", "ace/commands/default_commands", "ace/config"], function (e, t, n) {
    e("./lib/fixoldbrowsers");
    var r = e("./lib/oop"), i = e("./lib/dom"), s = e("./lib/lang"), o = e("./lib/useragent"), u = e("./keyboard/textinput").TextInput, a = e("./mouse/mouse_handler").MouseHandler, f = e("./mouse/fold_handler").FoldHandler, l = e("./keyboard/keybinding").KeyBinding, c = e("./edit_session").EditSession, h = e("./search").Search, p = e("./range").Range, d = e("./lib/event_emitter").EventEmitter, v = e("./commands/command_manager").CommandManager, m = e("./commands/default_commands").commands, g = e("./config"), y = function (e, t) {
        var n = e.getContainerElement();
        this.container = n, this.renderer = e, this.commands = new v(o.isMac ? "mac" : "win", m), this.textInput = new u(e.getTextAreaContainer(), this), this.renderer.textarea = this.textInput.getElement(), this.keyBinding = new l(this), this.$mouseHandler = new a(this), new f(this), this.$blockScrolling = 0, this.$search = (new h).set({wrap: !0}), this.setSession(t || new c("")), g.resetOptions(this), g._emit("editor", this)
    };
    (function () {
        r.implement(this, d), this.setKeyboardHandler = function (e) {
            if (!e)this.keyBinding.setKeyboardHandler(null); else if (typeof e == "string") {
                this.$keybindingId = e;
                var t = this;
                g.loadModule(["keybinding", e], function (n) {
                    t.$keybindingId == e && t.keyBinding.setKeyboardHandler(n && n.handler)
                })
            } else delete this.$keybindingId, this.keyBinding.setKeyboardHandler(e)
        }, this.getKeyboardHandler = function () {
            return this.keyBinding.getKeyboardHandler()
        }, this.setSession = function (e) {
            if (this.session == e)return;
            if (this.session) {
                var t = this.session;
                this.session.removeEventListener("change", this.$onDocumentChange), this.session.removeEventListener("changeMode", this.$onChangeMode), this.session.removeEventListener("tokenizerUpdate", this.$onTokenizerUpdate), this.session.removeEventListener("changeTabSize", this.$onChangeTabSize), this.session.removeEventListener("changeWrapLimit", this.$onChangeWrapLimit), this.session.removeEventListener("changeWrapMode", this.$onChangeWrapMode), this.session.removeEventListener("onChangeFold", this.$onChangeFold), this.session.removeEventListener("changeFrontMarker", this.$onChangeFrontMarker), this.session.removeEventListener("changeBackMarker", this.$onChangeBackMarker), this.session.removeEventListener("changeBreakpoint", this.$onChangeBreakpoint), this.session.removeEventListener("changeAnnotation", this.$onChangeAnnotation), this.session.removeEventListener("changeOverwrite", this.$onCursorChange), this.session.removeEventListener("changeScrollTop", this.$onScrollTopChange), this.session.removeEventListener("changeScrollLeft", this.$onScrollLeftChange);
                var n = this.session.getSelection();
                n.removeEventListener("changeCursor", this.$onCursorChange), n.removeEventListener("changeSelection", this.$onSelectionChange)
            }
            this.session = e, this.$onDocumentChange = this.onDocumentChange.bind(this), e.addEventListener("change", this.$onDocumentChange), this.renderer.setSession(e), this.$onChangeMode = this.onChangeMode.bind(this), e.addEventListener("changeMode", this.$onChangeMode), this.$onTokenizerUpdate = this.onTokenizerUpdate.bind(this), e.addEventListener("tokenizerUpdate", this.$onTokenizerUpdate), this.$onChangeTabSize = this.renderer.onChangeTabSize.bind(this.renderer), e.addEventListener("changeTabSize", this.$onChangeTabSize), this.$onChangeWrapLimit = this.onChangeWrapLimit.bind(this), e.addEventListener("changeWrapLimit", this.$onChangeWrapLimit), this.$onChangeWrapMode = this.onChangeWrapMode.bind(this), e.addEventListener("changeWrapMode", this.$onChangeWrapMode), this.$onChangeFold = this.onChangeFold.bind(this), e.addEventListener("changeFold", this.$onChangeFold), this.$onChangeFrontMarker = this.onChangeFrontMarker.bind(this), this.session.addEventListener("changeFrontMarker", this.$onChangeFrontMarker), this.$onChangeBackMarker = this.onChangeBackMarker.bind(this), this.session.addEventListener("changeBackMarker", this.$onChangeBackMarker), this.$onChangeBreakpoint = this.onChangeBreakpoint.bind(this), this.session.addEventListener("changeBreakpoint", this.$onChangeBreakpoint), this.$onChangeAnnotation = this.onChangeAnnotation.bind(this), this.session.addEventListener("changeAnnotation", this.$onChangeAnnotation), this.$onCursorChange = this.onCursorChange.bind(this), this.session.addEventListener("changeOverwrite", this.$onCursorChange), this.$onScrollTopChange = this.onScrollTopChange.bind(this), this.session.addEventListener("changeScrollTop", this.$onScrollTopChange), this.$onScrollLeftChange = this.onScrollLeftChange.bind(this), this.session.addEventListener("changeScrollLeft", this.$onScrollLeftChange), this.selection = e.getSelection(), this.selection.addEventListener("changeCursor", this.$onCursorChange), this.$onSelectionChange = this.onSelectionChange.bind(this), this.selection.addEventListener("changeSelection", this.$onSelectionChange), this.onChangeMode(), this.$blockScrolling += 1, this.onCursorChange(), this.$blockScrolling -= 1, this.onScrollTopChange(), this.onScrollLeftChange(), this.onSelectionChange(), this.onChangeFrontMarker(), this.onChangeBackMarker(), this.onChangeBreakpoint(), this.onChangeAnnotation(), this.session.getUseWrapMode() && this.renderer.adjustWrapLimit(), this.renderer.updateFull(), this._emit("changeSession", {session: e, oldSession: t})
        }, this.getSession = function () {
            return this.session
        }, this.setValue = function (e, t) {
            return this.session.doc.setValue(e), t ? t == 1 ? this.navigateFileEnd() : t == -1 && this.navigateFileStart() : this.selectAll(), e
        }, this.getValue = function () {
            return this.session.getValue()
        }, this.getSelection = function () {
            return this.selection
        }, this.resize = function (e) {
            this.renderer.onResize(e)
        }, this.setTheme = function (e) {
            this.renderer.setTheme(e)
        }, this.getTheme = function () {
            return this.renderer.getTheme()
        }, this.setStyle = function (e) {
            this.renderer.setStyle(e)
        }, this.unsetStyle = function (e) {
            this.renderer.unsetStyle(e)
        }, this.getFontSize = function () {
            return this.getOption("fontSize") || i.computedStyle(this.container, "fontSize")
        }, this.setFontSize = function (e) {
            this.setOption("fontSize", e)
        }, this.$highlightBrackets = function () {
            this.session.$bracketHighlight && (this.session.removeMarker(this.session.$bracketHighlight), this.session.$bracketHighlight = null);
            if (this.$highlightPending)return;
            var e = this;
            this.$highlightPending = !0, setTimeout(function () {
                e.$highlightPending = !1;
                var t = e.session.findMatchingBracket(e.getCursorPosition());
                if (t)var n = new p(t.row, t.column, t.row, t.column + 1); else if (e.session.$mode.getMatching)var n = e.session.$mode.getMatching(e.session);
                n && (e.session.$bracketHighlight = e.session.addMarker(n, "ace_bracket", "text"))
            }, 50)
        }, this.focus = function () {
            var e = this;
            setTimeout(function () {
                e.textInput.focus()
            }), this.textInput.focus()
        }, this.isFocused = function () {
            return this.textInput.isFocused()
        }, this.blur = function () {
            this.textInput.blur()
        }, this.onFocus = function () {
            if (this.$isFocused)return;
            this.$isFocused = !0, this.renderer.showCursor(), this.renderer.visualizeFocus(), this._emit("focus")
        }, this.onBlur = function () {
            if (!this.$isFocused)return;
            this.$isFocused = !1, this.renderer.hideCursor(), this.renderer.visualizeBlur(), this._emit("blur")
        }, this.$cursorChange = function () {
            this.renderer.updateCursor()
        }, this.onDocumentChange = function (e) {
            var t = e.data, n = t.range, r;
            n.start.row == n.end.row && t.action != "insertLines" && t.action != "removeLines" ? r = n.end.row : r = Infinity, this.renderer.updateLines(n.start.row, r), this._emit("change", e), this.$cursorChange()
        }, this.onTokenizerUpdate = function (e) {
            var t = e.data;
            this.renderer.updateLines(t.first, t.last)
        }, this.onScrollTopChange = function () {
            this.renderer.scrollToY(this.session.getScrollTop())
        }, this.onScrollLeftChange = function () {
            this.renderer.scrollToX(this.session.getScrollLeft())
        }, this.onCursorChange = function () {
            this.$cursorChange(), this.$blockScrolling || this.renderer.scrollCursorIntoView(), this.$highlightBrackets(), this.$updateHighlightActiveLine(), this._emit("changeSelection")
        }, this.$updateHighlightActiveLine = function () {
            var e = this.getSession(), t;
            this.$highlightActiveLine && (this.$selectionStyle != "line" || !
                this.selection.isMultiLine()) && (t = this.getCursorPosition());
            if (e.$highlightLineMarker && !t)e.removeMarker(e.$highlightLineMarker.id), e.$highlightLineMarker = null; else if (!e.$highlightLineMarker && t) {
                var n = new p(t.row, t.column, t.row, Infinity);
                n.id = e.addMarker(n, "ace_active-line", "screenLine"), e.$highlightLineMarker = n
            } else t && (e.$highlightLineMarker.start.row = t.row, e.$highlightLineMarker.end.row = t.row, e.$highlightLineMarker.start.column = t.column, e._emit("changeBackMarker"))
        }, this.onSelectionChange = function (e) {
            var t = this.session;
            t.$selectionMarker && t.removeMarker(t.$selectionMarker), t.$selectionMarker = null;
            if (!this.selection.isEmpty()) {
                var n = this.selection.getRange(), r = this.getSelectionStyle();
                t.$selectionMarker = t.addMarker(n, "ace_selection", r)
            } else this.$updateHighlightActiveLine();
            var i = this.$highlightSelectedWord && this.$getSelectionHighLightRegexp();
            this.session.highlight(i), this._emit("changeSelection")
        }, this.$getSelectionHighLightRegexp = function () {
            var e = this.session, t = this.getSelectionRange();
            if (t.isEmpty() || t.isMultiLine())return;
            var n = t.start.column - 1, r = t.end.column + 1, i = e.getLine(t.start.row), s = i.length, o = i.substring(Math.max(n, 0), Math.min(r, s));
            if (n >= 0 && /^[\w\d]/.test(o) || r <= s && /[\w\d]$/.test(o))return;
            o = i.substring(t.start.column, t.end.column);
            if (!/^[\w\d]+$/.test(o))return;
            var u = this.$search.$assembleRegExp({wholeWord: !0, caseSensitive: !0, needle: o});
            return u
        }, this.onChangeFrontMarker = function () {
            this.renderer.updateFrontMarkers()
        }, this.onChangeBackMarker = function () {
            this.renderer.updateBackMarkers()
        }, this.onChangeBreakpoint = function () {
            this.renderer.updateBreakpoints()
        }, this.onChangeAnnotation = function () {
            this.renderer.setAnnotations(this.session.getAnnotations())
        }, this.onChangeMode = function (e) {
            this.renderer.updateText(), this._emit("changeMode", e)
        }, this.onChangeWrapLimit = function () {
            this.renderer.updateFull()
        }, this.onChangeWrapMode = function () {
            this.renderer.onResize(!0)
        }, this.onChangeFold = function () {
            this.$updateHighlightActiveLine(), this.renderer.updateFull()
        }, this.getCopyText = function () {
            var e = "";
            return this.selection.isEmpty() || (e = this.session.getTextRange(this.getSelectionRange())), this._emit("copy", e), e
        }, this.onCopy = function () {
            this.commands.exec("copy", this)
        }, this.onCut = function () {
            this.commands.exec("cut", this)
        }, this.onPaste = function (e) {
            if (this.$readOnly)return;
            this._emit("paste", e), this.insert(e)
        }, this.execCommand = function (e, t) {
            this.commands.exec(e, this, t)
        }, this.insert = function (e) {
            var t = this.session, n = t.getMode(), r = this.getCursorPosition();
            if (this.getBehavioursEnabled()) {
                var i = n.transformAction(t.getState(r.row), "insertion", this, t, e);
                i && (e = i.text)
            }
            e = e.replace("	", this.session.getTabString());
            if (!this.selection.isEmpty())r = this.session.remove(this.getSelectionRange()), this.clearSelection(); else if (this.session.getOverwrite()) {
                var s = new p.fromPoints(r, r);
                s.end.column += e.length, this.session.remove(s)
            }
            this.clearSelection();
            var o = r.column, u = t.getState(r.row), a = t.getLine(r.row), f = n.checkOutdent(u, a, e), l = t.insert(r, e);
            i && i.selection && (i.selection.length == 2 ? this.selection.setSelectionRange(new p(r.row, o + i.selection[0], r.row, o + i.selection[1])) : this.selection.setSelectionRange(new p(r.row + i.selection[0], i.selection[1], r.row + i.selection[2], i.selection[3])));
            if (t.getDocument().isNewLine(e)) {
                var c = n.getNextLineIndent(u, a.slice(0, r.column), t.getTabString());
                this.moveCursorTo(r.row + 1, 0);
                var h = t.getTabSize(), d = Number.MAX_VALUE;
                for (var v = r.row + 1; v <= l.row; ++v) {
                    var m = 0;
                    a = t.getLine(v);
                    for (var g = 0; g < a.length; ++g)if (a.charAt(g) == "	")m += h; else {
                        if (a.charAt(g) != " ")break;
                        m += 1
                    }
                    /[^\s]/.test(a) && (d = Math.min(m, d))
                }
                for (var v = r.row + 1; v <= l.row; ++v) {
                    var y = d;
                    a = t.getLine(v);
                    for (var g = 0; g < a.length && y > 0; ++g)a.charAt(g) == "	" ? y -= h : a.charAt(g) == " " && (y -= 1);
                    t.remove(new p(v, 0, v, g))
                }
                t.indentRows(r.row + 1, l.row, c)
            }
            f && n.autoOutdent(u, t, r.row)
        }, this.onTextInput = function (e) {
            this.keyBinding.onTextInput(e)
        }, this.onCommandKey = function (e, t, n) {
            this.keyBinding.onCommandKey(e, t, n)
        }, this.setOverwrite = function (e) {
            this.session.setOverwrite(e)
        }, this.getOverwrite = function () {
            return this.session.getOverwrite()
        }, this.toggleOverwrite = function () {
            this.session.toggleOverwrite()
        }, this.setScrollSpeed = function (e) {
            this.setOption("scrollSpeed", e)
        }, this.getScrollSpeed = function () {
            return this.getOption("scrollSpeed")
        }, this.setDragDelay = function (e) {
            this.setOption("dragDelay", e)
        }, this.getDragDelay = function () {
            return this.getOption("dragDelay")
        }, this.setSelectionStyle = function (e) {
            this.setOption("selectionStyle", e)
        }, this.getSelectionStyle = function () {
            return this.getOption("selectionStyle")
        }, this.setHighlightActiveLine = function (e) {
            this.setOption("highlightActiveLine", e)
        }, this.getHighlightActiveLine = function () {
            return this.getOption("highlightActiveLine")
        }, this.setHighlightGutterLine = function (e) {
            this.setOption("highlightGutterLine", e)
        }, this.getHighlightGutterLine = function () {
            return this.getOption("highlightGutterLine")
        }, this.setHighlightSelectedWord = function (e) {
            this.setOption("highlightSelectedWord", e)
        }, this.getHighlightSelectedWord = function () {
            return this.$highlightSelectedWord
        }, this.setAnimatedScroll = function (e) {
            this.renderer.setAnimatedScroll(e)
        }, this.getAnimatedScroll = function () {
            return this.renderer.getAnimatedScroll()
        }, this.setShowInvisibles = function (e) {
            this.renderer.setShowInvisibles(e)
        }, this.getShowInvisibles = function () {
            return this.renderer.getShowInvisibles()
        }, this.setDisplayIndentGuides = function (e) {
            this.renderer.setDisplayIndentGuides(e)
        }, this.getDisplayIndentGuides = function () {
            return this.renderer.getDisplayIndentGuides()
        }, this.setShowPrintMargin = function (e) {
            this.renderer.setShowPrintMargin(e)
        }, this.getShowPrintMargin = function () {
            return this.renderer.getShowPrintMargin()
        }, this.setPrintMarginColumn = function (e) {
            this.renderer.setPrintMarginColumn(e)
        }, this.getPrintMarginColumn = function () {
            return this.renderer.getPrintMarginColumn()
        }, this.setReadOnly = function (e) {
            this.setOption("readOnly", e)
        }, this.getReadOnly = function () {
            return this.getOption("readOnly")
        }, this.setBehavioursEnabled = function (e) {
            this.setOption("behavioursEnabled", e)
        }, this.getBehavioursEnabled = function () {
            return this.getOption("behavioursEnabled")
        }, this.setWrapBehavioursEnabled = function (e) {
            this.setOption("wrapBehavioursEnabled", e)
        }, this.getWrapBehavioursEnabled = function () {
            return this.getOption("wrapBehavioursEnabled")
        }, this.setShowFoldWidgets = function (e) {
            this.setOption("showFoldWidgets", e)
        }, this.getShowFoldWidgets = function () {
            return this.getOption("showFoldWidgets")
        }, this.setFadeFoldWidgets = function (e) {
            this.setOption("fadeFoldWidgets", e)
        }, this.getFadeFoldWidgets = function () {
            return this.getOption("fadeFoldWidgets")
        }, this.remove = function (e) {
            this.selection.isEmpty() && (e == "left" ? this.selection.selectLeft() : this.selection.selectRight());
            var t = this.getSelectionRange();
            if (this.getBehavioursEnabled()) {
                var n = this.session, r = n.getState(t.start.row), i = n.getMode().transformAction(r, "deletion", this, n, t);
                i && (t = i)
            }
            this.session.remove(t), this.clearSelection()
        }, this.removeWordRight = function () {
            this.selection.isEmpty() && this.selection.selectWordRight(), this.session.remove(this.getSelectionRange()), this.clearSelection()
        }, this.removeWordLeft = function () {
            this.selection.isEmpty() && this.selection.selectWordLeft(), this.session.remove(this.getSelectionRange()), this.clearSelection()
        }, this.removeToLineStart = function () {
            this.selection.isEmpty() && this.selection.selectLineStart(), this.session.remove(this.getSelectionRange()), this.clearSelection()
        }, this.removeToLineEnd = function () {
            this.selection.isEmpty() && this.selection.selectLineEnd();
            var e = this.getSelectionRange();
            e.start.column == e.end.column && e.start.row == e.end.row && (e.end.column = 0, e.end.row++), this.session.remove(e), this.clearSelection()
        }, this.splitLine = function () {
            this.selection.isEmpty() || (this.session.remove(this.getSelectionRange()), this.clearSelection());
            var e = this.getCursorPosition();
            this.insert("\n"), this.moveCursorToPosition(e)
        }, this.transposeLetters = function () {
            if (!this.selection.isEmpty())return;
            var e = this.getCursorPosition(), t = e.column;
            if (t === 0)return;
            var n = this.session.getLine(e.row), r, i;
            t < n.length ? (r = n.charAt(t) + n.charAt(t - 1), i = new p(e.row, t - 1, e.row, t + 1)) : (r = n.charAt(t - 1) + n.charAt(t - 2), i = new p(e.row, t - 2, e.row, t)), this.session.replace(i, r)
        }, this.toLowerCase = function () {
            var e = this.getSelectionRange();
            this.selection.isEmpty() && this.selection.selectWord();
            var t = this.getSelectionRange(), n = this.session.getTextRange(t);
            this.session.replace(t, n.toLowerCase()), this.selection.setSelectionRange(e)
        }, this.toUpperCase = function () {
            var e = this.getSelectionRange();
            this.selection.isEmpty() && this.selection.selectWord();
            var t = this.getSelectionRange(), n = this.session.getTextRange(t);
            this.session.replace(t, n.toUpperCase()), this.selection.setSelectionRange(e)
        }, this.indent = function () {
            var e = this.session, t = this.getSelectionRange();
            if (!(t.start.row < t.end.row || t.start.column < t.end.column)) {
                var n;
                if (this.session.getUseSoftTabs()) {
                    var r = e.getTabSize(), i = this.getCursorPosition(), o = e.documentToScreenColumn(i.row, i.column), u = r - o % r;
                    n = s.stringRepeat(" ", u)
                } else n = "	";
                return this.insert(n)
            }
            var a = this.$getSelectedRows();
            e.indentRows(a.first, a.last, "	")
        }, this.blockIndent = function () {
            var e = this.$getSelectedRows();
            this.session.indentRows(e.first, e.last, "	")
        }, this.blockOutdent = function () {
            var e = this.session.getSelection();
            this.session.outdentRows(e.getRange())
        }, this.sortLines = function () {
            var e = this.$getSelectedRows(), t = this.session, n = [];
            for (i = e.first; i <= e.last; i++)n.push(t.getLine(i));
            n.sort(function (e, t) {
                return e.toLowerCase() < t.toLowerCase() ? -1 : e.toLowerCase() > t.toLowerCase() ? 1 : 0
            });
            var r = new p(0, 0, 0, 0);
            for (var i = e.first; i <= e.last; i++) {
                var s = t.getLine(i);
                r.start.row = i, r.end.row = i, r.end.column = s.length, t.replace(r, n[i - e.first])
            }
        }, this.toggleCommentLines = function () {
            var e = this.session.getState(this.getCursorPosition().row), t = this.$getSelectedRows();
            this.session.getMode().toggleCommentLines(e, this.session, t.first, t.last)
        }, this.toggleBlockComment = function () {
            var e = this.getCursorPosition(), t = this.session.getState(e.row), n = this.getSelectionRange();
            this.session.getMode().toggleBlockComment(t, this.session, n, e)
        }, this.getNumberAt = function (e, t) {
            var n = /[\-]?[0-9]+(?:\.[0-9]+)?/g;
            n.lastIndex = 0;
            var r = this.session.getLine(e);
            while (n.lastIndex < t) {
                var i = n.exec(r);
                if (i.index <= t && i.index + i[0].length >= t) {
                    var s = {value: i[0], start: i.index, end: i.index + i[0].length};
                    return s
                }
            }
            return null
        }, this.modifyNumber = function (e) {
            var t = this.selection.getCursor().row, n = this.selection.getCursor().column, r = new p(t, n - 1, t, n), i = this.session.getTextRange(r);
            if (!isNaN(parseFloat(i)) && isFinite(i)) {
                var s = this.getNumberAt(t, n);
                if (s) {
                    var o = s.value.indexOf(".") >= 0 ? s.start + s.value.indexOf(".") + 1 : s.end, u = s.start + s.value.length - o, a = parseFloat(s.value);
                    a *= Math.pow(10, u), o !== s.end && n < o ? e *= Math.pow(10, s.end - n - 1) : e *= Math.pow(10, s.end - n), a += e, a /= Math.pow(10, u);
                    var f = a.toFixed(u), l = new p(t, s.start, t, s.end);
                    this.session.replace(l, f), this.moveCursorTo(t, Math.max(s.start + 1, n + f.length - s.value.length))
                }
            }
        }, this.removeLines = function () {
            var e = this.$getSelectedRows(), t;
            e.first === 0 || e.last + 1 < this.session.getLength() ? t = new p(e.first, 0, e.last + 1, 0) : t = new p(e.first - 1, this.session.getLine(e.first - 1).length, e.last, this.session.getLine(e.last).length), this.session.remove(t), this.clearSelection()
        }, this.duplicateSelection = function () {
            var e = this.selection, t = this.session, n = e.getRange(), r = e.isBackwards();
            if (n.isEmpty()) {
                var i = n.start.row;
                t.duplicateLines(i, i)
            } else {
                var s = r ? n.start : n.end, o = t.insert(s, t.getTextRange(n), !1);
                n.start = s, n.end = o, e.setSelectionRange(n, r)
            }
        }, this.moveLinesDown = function () {
            this.$moveLines(function (e, t) {
                return this.session.moveLinesDown(e, t)
            })
        }, this.moveLinesUp = function () {
            this.$moveLines(function (e, t) {
                return this.session.moveLinesUp(e, t)
            })
        }, this.moveText = function (e, t) {
            return this.session.moveText(e, t)
        }, this.copyLinesUp = function () {
            this.$moveLines(function (e, t) {
                return this.session.duplicateLines(e, t), 0
            })
        }, this.copyLinesDown = function () {
            this.$moveLines(function (e, t) {
                return this.session.duplicateLines(e, t)
            })
        }, this.$moveLines = function (e) {
            var t = this.selection;
            if (!t.inMultiSelectMode || this.inVirtualSelectionMode) {
                var n = t.toOrientedRange(), r = this.$getSelectedRows(n), i = e.call(this, r.first, r.last);
                n.moveBy(i, 0), t.fromOrientedRange(n)
            } else {
                var s = t.rangeList.ranges;
                t.rangeList.detach(this.session);
                for (var o = s.length; o--;) {
                    var u = o, r = s[o].collapseRows(), a = r.end.row, f = r.start.row;
                    while (o--) {
                        var r = s[o].collapseRows();
                        if (!(f - r.end.row <= 1))break;
                        f = r.end.row
                    }
                    o++;
                    var i = e.call(this, f, a);
                    while (u >= o)s[u].moveBy(i, 0), u--
                }
                t.fromOrientedRange(t.ranges[0]), t.rangeList.attach(this.session)
            }
        }, this.$getSelectedRows = function () {
            var e = this.getSelectionRange().collapseRows();
            return{first: e.start.row, last: e.end.row}
        }, this.onCompositionStart = function (e) {
            this.renderer.showComposition(this.getCursorPosition())
        }, this.onCompositionUpdate = function (e) {
            this.renderer.setCompositionText(e)
        }, this.onCompositionEnd = function () {
            this.renderer.hideComposition()
        }, this.getFirstVisibleRow = function () {
            return this.renderer.getFirstVisibleRow()
        }, this.getLastVisibleRow = function () {
            return this.renderer.getLastVisibleRow()
        }, this.isRowVisible = function (e) {
            return e >= this.getFirstVisibleRow() && e <= this.getLastVisibleRow()
        }, this.isRowFullyVisible = function (e) {
            return e >= this.renderer.getFirstFullyVisibleRow() && e <= this.renderer.getLastFullyVisibleRow()
        }, this.$getVisibleRowCount = function () {
            return this.renderer.getScrollBottomRow() - this.renderer.getScrollTopRow() + 1
        }, this.$moveByPage = function (e, t) {
            var n = this.renderer, r = this.renderer.layerConfig, i = e * Math.floor(r.height / r.lineHeight);
            this.$blockScrolling++, t == 1 ? this.selection.$moveSelection(function () {
                this.moveCursorBy(i, 0)
            }) : t == 0 && (this.selection.moveCursorBy(i, 0), this.selection.clearSelection()), this.$blockScrolling--;
            var s = n.scrollTop;
            n.scrollBy(0, i * r.lineHeight), t != null && n.scrollCursorIntoView(null, .5), n.animateScrolling(s)
        }, this.selectPageDown = function () {
            this.$moveByPage(1, !0)
        }, this.selectPageUp = function () {
            this.$moveByPage(-1, !0)
        }, this.gotoPageDown = function () {
            this.$moveByPage(1, !1)
        }, this.gotoPageUp = function () {
            this.$moveByPage(-1, !1)
        }, this.scrollPageDown = function () {
            this.$moveByPage(1)
        }, this.scrollPageUp = function () {
            this.$moveByPage(-1)
        }, this.scrollToRow = function (e) {
            this.renderer.scrollToRow(e)
        }, this.scrollToLine = function (e, t, n, r) {
            this.renderer.scrollToLine(e, t, n, r)
        }, this.centerSelection = function () {
            var e = this.getSelectionRange(), t = {row: Math.floor(e.start.row + (e.end.row - e.start.row) / 2), column: Math.floor(e.start.column + (e.end.column - e.start.column) / 2)};
            this.renderer.alignCursor(t, .5)
        }, this.getCursorPosition = function () {
            return this.selection.getCursor()
        }, this.getCursorPositionScreen = function () {
            return this.session.documentToScreenPosition(this.getCursorPosition())
        }, this.getSelectionRange = function () {
            return this.selection.getRange()
        }, this.selectAll = function () {
            this.$blockScrolling += 1, this.selection.selectAll(), this.$blockScrolling -= 1
        }, this.clearSelection = function () {
            this.selection.clearSelection()
        }, this.moveCursorTo = function (e, t) {
            this.selection.moveCursorTo(e, t)
        }, this.moveCursorToPosition = function (e) {
            this.selection.moveCursorToPosition(e)
        }, this.jumpToMatching = function (e) {
            var t = this.getCursorPosition(), n = this.session.getBracketRange(t);
            if (!n) {
                n = this.find({needle: /[{}()\[\]]/g, preventScroll: !0, start: {row: t.row, column: t.column - 1}});
                if (!n)return;
                var r = n.start;
                r.row == t.row && Math.abs(r.column - t.column) < 2 && (n = this.session.getBracketRange(r))
            }
            r = n && n.cursor || r, r && (e ? n && n.isEqual(this.getSelectionRange()) ? this.clearSelection() : this.selection.selectTo(r.row, r.column) : (this.clearSelection(), this.moveCursorTo(r.row, r.column)))
        }, this.gotoLine = function (e, t, n) {
            this.selection.clearSelection(), this.session.unfold({row: e - 1, column: t || 0}), this.$blockScrolling += 1, this.moveCursorTo(e - 1, t || 0), this.$blockScrolling -= 1, this.isRowFullyVisible(e - 1) || this.scrollToLine(e - 1, !0, n)
        }, this.navigateTo = function (e, t) {
            this.clearSelection(), this.moveCursorTo(e, t)
        }, this.navigateUp = function (e) {
            if (this.selection.isMultiLine() && !this.selection.isBackwards()) {
                var t = this.selection.anchor.getPosition();
                return this.moveCursorToPosition(t)
            }
            this.selection.clearSelection(), e = e || 1, this.selection.moveCursorBy(-e, 0)
        }, this.navigateDown = function (e) {
            if (this.selection.isMultiLine() && this.selection.isBackwards()) {
                var t = this.selection.anchor.getPosition();
                return this.moveCursorToPosition(t)
            }
            this.selection.clearSelection(), e = e || 1, this.selection.moveCursorBy(e, 0)
        }, this.navigateLeft = function (e) {
            if (!this.selection.isEmpty()) {
                var t = this.getSelectionRange().start;
                this.moveCursorToPosition(t)
            } else {
                e = e || 1;
                while (e--)this.selection.moveCursorLeft()
            }
            this.clearSelection()
        }, this.navigateRight = function (e) {
            if (!this.selection.isEmpty()) {
                var t = this.getSelectionRange().end;
                this.moveCursorToPosition(t)
            } else {
                e = e || 1;
                while (e--)this.selection.moveCursorRight()
            }
            this.clearSelection()
        }, this.navigateLineStart = function () {
            this.selection.moveCursorLineStart(), this.clearSelection()
        }, this.navigateLineEnd = function () {
            this.selection.moveCursorLineEnd(), this.clearSelection()
        }, this.navigateFileEnd = function () {
            var e = this.renderer.scrollTop;
            this.selection.moveCursorFileEnd(), this.clearSelection(), this.renderer.animateScrolling(e)
        }, this.navigateFileStart = function () {
            var e = this.renderer.scrollTop;
            this.selection.moveCursorFileStart(), this.clearSelection(), this.renderer.animateScrolling(e)
        }, this.navigateWordRight = function () {
            this.selection.moveCursorWordRight(), this.clearSelection()
        }, this.navigateWordLeft = function () {
            this.selection.moveCursorWordLeft(), this.clearSelection()
        }, this.replace = function (e, t) {
            t && this.$search.set(t);
            var n = this.$search.find(this.session), r = 0;
            return n ? (this.$tryReplace(n, e) && (r = 1), n !== null && (this.selection.setSelectionRange(n), this.renderer.scrollSelectionIntoView(n.start, n.end)), r) : r
        }, this.replaceAll = function (e, t) {
            t && this.$search.set(t);
            var n = this.$search.findAll(this.session), r = 0;
            if (!n.length)return r;
            this.$blockScrolling += 1;
            var i = this.getSelectionRange();
            this.clearSelection(), this.selection.moveCursorTo(0, 0);
            for (var s = n.length - 1; s >= 0; --s)this.$tryReplace(n[s], e) && r++;
            return this.selection.setSelectionRange(i), this.$blockScrolling -= 1, r
        }, this.$tryReplace = function (e, t) {
            var n = this.session.getTextRange(e);
            return t = this.$search.replace(n, t), t !== null ? (e.end = this.session.replace(e, t), e) : null
        }, this.getLastSearchOptions = function () {
            return this.$search.getOptions()
        }, this.find = function (e, t, n) {
            t || (t = {}), typeof e == "string" || e instanceof RegExp ? t.needle = e : typeof e == "object" && r.mixin(t, e);
            var i = this.selection.getRange();
            t.needle == null && (e = this.session.getTextRange(i) || this.$search.$options.needle, e || (i = this.session.getWordRange(i.start.row, i.start.column), e = this.session.getTextRange(i)), this.$search.set({needle: e})), this.$search.set(t), t.start || this.$search.set({start: i});
            var s = this.$search.find(this.session);
            if (t.preventScroll)return s;
            if (s)return this.revealRange(s, n), s;
            t.backwards ? i.start = i.end : i.end = i.start, this.selection.setRange(i)
        }, this.findNext = function (e, t) {
            this.find({skipCurrent: !0, backwards: !1}, e, t)
        }, this.findPrevious = function (e, t) {
            this.find(e, {skipCurrent: !0, backwards: !0}, t)
        }, this.revealRange = function (e, t) {
            this.$blockScrolling += 1, this.session.unfold(e), this.selection.setSelectionRange(e), this.$blockScrolling -= 1;
            var n = this.renderer.scrollTop;
            this.renderer.scrollSelectionIntoView(e.start, e.end, .5), t != 0 && this.renderer.animateScrolling(n)
        }, this.undo = function () {
            this.$blockScrolling++, this.session.getUndoManager().undo(), this.$blockScrolling--, this.renderer.scrollCursorIntoView(null, .5)
        }, this.redo = function () {
            this.$blockScrolling++, this.session.getUndoManager().redo(), this.$blockScrolling--, this.renderer.scrollCursorIntoView(null, .5)
        }, this.destroy = function () {
            this.renderer.destroy(), this._emit("destroy", this)
        }, this.setAutoScrollEditorIntoView = function (e) {
            if (e === !1)return;
            var t, n = this, r = !1;
            this.$scrollAnchor || (this.$scrollAnchor = document.createElement("div"));
            var i = this.$scrollAnchor;
            i.style.cssText = "position:absolute", this.container.insertBefore(i, this.container.firstChild);
            var s = this.on("changeSelection", function () {
                r = !0
            }), o = this.renderer.on("beforeRender", function () {
                r && (t = n.renderer.container.getBoundingClientRect())
            }), u = this.renderer.on("afterRender", function () {
                if (r && t && n.isFocused()) {
                    var e = n.renderer, s = e.$cursorLayer.$pixelPos, o = e.layerConfig, u = s.top - o.offset;
                    s.top >= 0 && u + t.top < 0 ? r = !0 : s.top < o.height && s.top + t.top + o.lineHeight > window.innerHeight ? r = !1 : r = null, r != null && (i.style.top = u + "px", i.style.left = s.left + "px", i.style.height = o.lineHeight + "px", i.scrollIntoView(r)), r = t = null
                }
            });
            this.setAutoScrollEditorIntoView = function (e) {
                if (e === !0)return;
                delete this.setAutoScrollEditorIntoView, this.removeEventListener("changeSelection", s), this.renderer.removeEventListener("afterRender", u), this.renderer.removeEventListener("beforeRender", o)
            }
        }, this.$resetCursorStyle = function () {
            var e = this.$cursorStyle || "ace", t = this.renderer.$cursorLayer;
            if (!t)return;
            t.setSmoothBlinking(e == "smooth"), t.isBlinking = !this.$readOnly && e != "wide"
        }
    }).call(y.prototype), g.defineOptions(y.prototype, "editor", {selectionStyle: {set: function (e) {
        this.onSelectionChange(), this._emit("changeSelectionStyle", {data: e})
    }, initialValue: "line"}, highlightActiveLine: {set: function () {
        this.$updateHighlightActiveLine()
    }, initialValue: !0}, highlightSelectedWord: {set: function (e) {
        this.$onSelectionChange()
    }, initialValue: !0}, readOnly: {set: function (e) {
        this.$resetCursorStyle()
    }, initialValue: !1}, cursorStyle: {set: function (e) {
        this.$resetCursorStyle()
    }, values: ["ace", "slim", "smooth", "wide"], initialValue: "ace"}, behavioursEnabled: {initialValue: !0}, wrapBehavioursEnabled: {initialValue: !0}, hScrollBarAlwaysVisible: "renderer", highlightGutterLine: "renderer", animatedScroll: "renderer", showInvisibles: "renderer", showPrintMargin: "renderer", printMarginColumn: "renderer", printMargin: "renderer", fadeFoldWidgets: "renderer", showFoldWidgets: "renderer", showGutter: "renderer", displayIndentGuides: "renderer", fontSize: "renderer", fontFamily: "renderer", scrollSpeed: "$mouseHandler", dragDelay: "$mouseHandler", focusTimout: "$mouseHandler", firstLineNumber: "session", overwrite: "session", newLineMode: "session", useWorker: "session", useSoftTabs: "session", tabSize: "session", wrap: "session", foldStyle: "session"}), t.Editor = y
}), define("ace/lib/lang", ["require", "exports", "module"], function (e, t, n) {
    t.stringReverse = function (e) {
        return e.split("").reverse().join("")
    }, t.stringRepeat = function (e, t) {
        var n = "";
        while (t > 0) {
            t & 1 && (n += e);
            if (t >>= 1)e += e
        }
        return n
    };
    var r = /^\s\s*/, i = /\s\s*$/;
    t.stringTrimLeft = function (e) {
        return e.replace(r, "")
    }, t.stringTrimRight = function (e) {
        return e.replace(i, "")
    }, t.copyObject = function (e) {
        var t = {};
        for (var n in e)t[n] = e[n];
        return t
    }, t.copyArray = function (e) {
        var t = [];
        for (var n = 0, r = e.length; n < r; n++)e[n] && typeof e[n] == "object" ? t[n] = this.copyObject(e[n]) : t[n] = e[n];
        return t
    }, t.deepCopy = function (e) {
        if (typeof e != "object")return e;
        var t = e.constructor();
        for (var n in e)typeof e[n] == "object" ? t[n] = this.deepCopy(e[n]) : t[n] = e[n];
        return t
    }, t.arrayToMap = function (e) {
        var t = {};
        for (var n = 0; n < e.length; n++)t[e[n]] = 1;
        return t
    }, t.createMap = function (e) {
        var t = Object.create(null);
        for (var n in e)t[n] = e[n];
        return t
    }, t.arrayRemove = function (e, t) {
        for (var n = 0; n <= e.length; n++)t === e[n] && e.splice(n, 1)
    }, t.escapeRegExp = function (e) {
        return e.replace(/([.*+?^${}()|[\]\/\\])/g, "\\$1")
    }, t.escapeHTML = function (e) {
        return e.replace(/&/g, "&#38;").replace(/"/g, "&#34;").replace(/'/g, "&#39;").replace(/</g, "&#60;")
    }, t.getMatchOffsets = function (e, t) {
        var n = [];
        return e.replace(t, function (e) {
            n.push({offset: arguments[arguments.length - 2], length: e.length})
        }), n
    }, t.deferredCall = function (e) {
        var t = null, n = function () {
            t = null, e()
        }, r = function (e) {
            return r.cancel(), t = setTimeout(n, e || 0), r
        };
        return r.schedule = r, r.call = function () {
            return this.cancel(), e(), r
        }, r.cancel = function () {
            return clearTimeout(t), t = null, r
        }, r
    }, t.delayedCall = function (e, t) {
        var n = null, r = function () {
            n = null, e()
        }, i = function (e) {
            n && clearTimeout(n), n = setTimeout(r, e || t)
        };
        return i.delay = i, i.schedule = function (e) {
            n == null && (n = setTimeout(r, e || 0))
        }, i.call = function () {
            this.cancel(), e()
        }, i.cancel = function () {
            n && clearTimeout(n), n = null
        }, i.isPending = function () {
            return n
        }, i
    }
}), define("ace/keyboard/textinput", ["require", "exports", "module", "ace/lib/event", "ace/lib/useragent", "ace/lib/dom", "ace/lib/lang"], function (e, t, n) {
    var r = e("../lib/event"), i = e("../lib/useragent"), s = e("../lib/dom"), o = e("../lib/lang"), u = i.isChrome < 18, a = function (e, t) {
        function n(e) {
            if (v)return;
            if (L)t = 0, n = e ? 0 : l.value.length - 1; else var t = e ? 2 : 1, n = 2;
            try {
                l.setSelectionRange(t, n)
            } catch (r) {
            }
        }

        function a() {
            if (v)return;
            l.value = c, i.isWebKit && E.schedule()
        }

        function f() {
            setTimeout(function () {
                m && (l.style.cssText = m, m = ""), t.renderer.$keepTextAreaAtCursor == null && (t.renderer.$keepTextAreaAtCursor = !0, t.renderer.$moveTextAreaToCursor())
            }, 0)
        }

        var l = s.createElement("textarea");
        l.className = "ace_text-input", i.isTouchPad && l.setAttribute("x-palm-disable-auto-cap", !0), l.wrap = "off", l.autocorrect = "off", l.autocapitalize = "off", l.spellcheck = !1, l.style.bottom = "2000em", e.insertBefore(l, e.firstChild);
        var c = "", h = !1, p = !1, d = !1, v = !1, m = "", g = !0;
        try {
            var y = document.activeElement === l
        } catch (b) {
        }
        r.addListener(l, "blur", function () {
            t.onBlur(), y = !1
        }), r.addListener(l, "focus", function () {
            y = !0, t.onFocus(), n()
        }), this.focus = function () {
            l.focus()
        }, this.blur = function () {
            l.blur()
        }, this.isFocused = function () {
            return y
        };
        var w = o.delayedCall(function () {
            y && n(g)
        }), E = o.delayedCall(function () {
            v || (l.value = c, y && n())
        });
        i.isWebKit || t.addEventListener("changeSelection", function () {
            t.selection.isEmpty() != g && (g = !g, w.schedule())
        }), a(), y && t.onFocus();
        var S = function (e) {
            return e.selectionStart === 0 && e.selectionEnd === e.value.length
        };
        !l.setSelectionRange && l.createTextRange && (l.setSelectionRange = function (e, t) {
            var n = this.createTextRange();
            n.collapse(!0), n.moveStart("character", e), n.moveEnd("character", t), n.select()
        }, S = function (e) {
            try {
                var t = e.ownerDocument.selection.createRange()
            } catch (n) {
            }
            return!t || t.parentElement() != e ? !1 : t.text == e.value
        });
        if (i.isOldIE) {
            var x = !1, T = function (e) {
                if (x)return;
                var t = l.value;
                if (v || !t || t == c)return;
                if (e && t == c[0])return N.schedule();
                O(t), x = !0, a(), x = !1
            }, N = o.delayedCall(T);
            r.addListener(l, "propertychange", T);
            var C = {13: 1, 27: 1};
            r.addListener(l, "keyup", function (e) {
                v && (!l.value || C[e.keyCode]) && setTimeout(j, 0);
                if ((l.value.charCodeAt(0) || 0) < 129)return;
                v ? B() : H()
            })
        }
        var k = function (e) {
            h ? h = !1 : p ? p = !1 : S(l) ? (t.selectAll(), n()) : L && n(t.selection.isEmpty())
        }, L = null;
        this.setInputHandler = function (e) {
            L = e
        }, this.getInputHandler = function () {
            return L
        };
        var A = !1, O = function (e) {
            L && (e = L(e), L = null), d ? (n(), e && t.onPaste(e), d = !1) : e == c[0] ? A && t.execCommand("del", {source: "ace"}) : (e.substring(0, 2) == c ? e = e.substr(2) : e[0] == c[0] ? e = e.substr(1) : e[e.length - 1] == c[0] && (e = e.slice(0, -1)), e[e.length - 1] == c[0] && (e = e.slice(0, -1)), e && t.onTextInput(e)), A && (A = !1)
        }, M = function (e) {
            if (v)return;
            var t = l.value;
            O(t), a()
        }, _ = function (e) {
            var i = t.getCopyText();
            if (!i) {
                r.preventDefault(e);
                return
            }
            var s = e.clipboardData || window.clipboardData;
            if (s && !u) {
                var o = s.setData("Text", i);
                o && (t.onCut(), r.preventDefault(e))
            }
            o || (h = !0, l.value = i, l.select(), setTimeout(function () {
                h = !1, a(), n(), t.onCut()
            }))
        }, D = function (e) {
            var i = t.getCopyText();
            if (!i) {
                r.preventDefault(e);
                return
            }
            var s = e.clipboardData || window.clipboardData;
            if (s && !u) {
                var o = s.setData("Text", i);
                o && (t.onCopy(), r.preventDefault(e))
            }
            o || (p = !0, l.value = i, l.select(), setTimeout(function () {
                p = !1, a(), n(), t.onCopy()
            }))
        }, P = function (e) {
            var s = e.clipboardData || window.clipboardData;
            if (s) {
                var o = s.getData("Text");
                o && t.onPaste(o), i.isIE && setTimeout(n), r.preventDefault(e)
            } else l.value = "", d = !0
        };
        r.addCommandKeyListener(l, t.onCommandKey.bind(t)), r.addListener(l, "select", k), r.addListener(l, "input", M), r.addListener(l, "cut", _), r.addListener(l, "copy", D), r.addListener(l, "paste", P), (!("oncut"in l) || !("oncopy"in l) || !("onpaste"in l)) && r.addListener(e, "keydown", function (e) {
            if (i.isMac && !e.metaKey || !e.ctrlKey)return;
            switch (e.keyCode) {
                case 67:
                    D(e);
                    break;
                case 86:
                    P(e);
                    break;
                case 88:
                    _(e)
            }
        });
        var H = function (e) {
            v = {}, t.onCompositionStart(), setTimeout(B, 0), t.on("mousedown", j), t.selection.isEmpty() || (t.insert(""), t.session.markUndoGroup(), t.selection.clearSelection()), t.session.markUndoGroup()
        }, B = function () {
            if (!v)return;
            t.onCompositionUpdate(l.value), v.lastValue && t.undo(), v.lastValue = l.value.replace(/\x01/g, "");
            if (v.lastValue) {
                var e = t.selection.getRange();
                t.insert(v.lastValue), t.session.markUndoGroup(), v.range = t.selection.getRange(), t.selection.setRange(e), t.selection.clearSelection()
            }
        }, j = function (e) {
            var n = v;
            v = !1;
            var r = setTimeout(function () {
                var e = l.value.replace(/\x01/g, "");
                !v && e == n.lastValue && a()
            });
            L = function (e) {
                return clearTimeout(r), e = e.replace(/\x01/g, ""), e == n.lastValue ? "" : (e || n.lastValue && t.undo(), e)
            }, t.onCompositionEnd(), t.removeListener("mousedown", j), e.type == "compositionend" && t.selection.setRange(n.range)
        }, F = o.delayedCall(B, 50);
        r.addListener(l, "compositionstart", H), r.addListener(l, i.isGecko ? "text" : "keyup", function () {
            F.schedule()
        }), r.addListener(l, "compositionend", j), this.getElement = function () {
            return l
        }, this.setReadOnly = function (e) {
            l.readOnly = e
        }, this.onContextMenu = function (e) {
            A = !0, m || (m = l.style.cssText), l.style.cssText = "z-index:100000;" + (i.isIE ? "opacity:0.1;" : ""), n(t.selection.isEmpty()), t._emit("nativecontextmenu", {target: t});
            var o = t.container.getBoundingClientRect(), u = s.computedStyle(t.container), a = o.top + (parseInt(u.borderTopWidth) || 0), c = o.left + (parseInt(o.borderLeftWidth) || 0), h = o.bottom - a - l.clientHeight, p = function (e) {
                l.style.left = e.clientX - c - 2 + "px", l.style.top = Math.min(e.clientY - a - 2, h) + "px"
            };
            p(e);
            if (e.type != "mousedown")return;
            t.renderer.$keepTextAreaAtCursor && (t.renderer.$keepTextAreaAtCursor = null), i.isWin && r.capture(t.container, p, f)
        }, this.onContextMenuClose = f, i.isGecko || r.addListener(l, "contextmenu", function (e) {
            t.textInput.onContextMenu(e), f()
        })
    };
    t.TextInput = a
}), define("ace/mouse/mouse_handler", ["require", "exports", "module", "ace/lib/event", "ace/lib/useragent", "ace/mouse/default_handlers", "ace/mouse/default_gutter_handler", "ace/mouse/mouse_event", "ace/mouse/dragdrop", "ace/config"], function (e, t, n) {
    var r = e("../lib/event"), i = e("../lib/useragent"), s = e("./default_handlers").DefaultHandlers, o = e("./default_gutter_handler").GutterHandler, u = e("./mouse_event").MouseEvent, a = e("./dragdrop").DragdropHandler, f = e("../config"), l = function (e) {
        this.editor = e, new s(this), new o(this), new a(this), r.addListener(e.container, "mousedown", function (t) {
            return e.focus(), r.preventDefault(t)
        });
        var t = e.renderer.getMouseEventTarget();
        r.addListener(t, "click", this.onMouseEvent.bind(this, "click")), r.addListener(t, "mousemove", this.onMouseMove.bind(this, "mousemove")), r.addMultiMouseDownListener(t, [300, 300, 250], this, "onMouseEvent"), r.addMouseWheelListener(e.container, this.onMouseWheel.bind(this, "mousewheel"));
        var n = e.renderer.$gutter;
        r.addListener(n, "mousedown", this.onMouseEvent.bind(this, "guttermousedown")), r.addListener(n, "click", this.onMouseEvent.bind(this, "gutterclick")), r.addListener(n, "dblclick", this.onMouseEvent.bind(this, "gutterdblclick")), r.addListener(n, "mousemove", this.onMouseEvent.bind(this, "guttermousemove"))
    };
    (function () {
        this.onMouseEvent = function (e, t) {
            this.editor._emit(e, new u(t, this.editor))
        }, this.onMouseMove = function (e, t) {
            var n = this.editor._eventRegistry && this.editor._eventRegistry.mousemove;
            if (!n || !n.length)return;
            this.editor._emit(e, new u(t, this.editor))
        }, this.onMouseWheel = function (e, t) {
            var n = new u(t, this.editor);
            n.speed = this.$scrollSpeed * 2, n.wheelX = t.wheelX, n.wheelY = t.wheelY, this.editor._emit(e, n)
        }, this.setState = function (e) {
            this.state = e
        }, this.captureMouse = function (e, t) {
            t && this.setState(t), this.x = e.x, this.y = e.y, this.isMousePressed = !0;
            var n = this.editor.renderer;
            n.$keepTextAreaAtCursor && (n.$keepTextAreaAtCursor = null);
            var s = this, o = function (e) {
                s.x = e.clientX, s.y = e.clientY
            }, u = function (e) {
                clearInterval(f), a(), s[s.state + "End"] && s[s.state + "End"](e), s.$clickSelection = null, n.$keepTextAreaAtCursor == null && (n.$keepTextAreaAtCursor = !0, n.$moveTextAreaToCursor()), s.isMousePressed = !1, s.onMouseEvent("mouseup", e)
            }, a = function () {
                s[s.state] && s[s.state]()
            };
            if (i.isOldIE && e.domEvent.type == "dblclick")return setTimeout(function () {
                u(e.domEvent)
            });
            r.capture(this.editor.container, o, u);
            var f = setInterval(a, 20)
        }
    }).call(l.prototype), f.defineOptions(l.prototype, "mouseHandler", {scrollSpeed: {initialValue: 2}, dragDelay: {initialValue: 150}, focusTimout: {initialValue: 0}}), t.MouseHandler = l
}), define("ace/mouse/default_handlers", ["require", "exports", "module", "ace/lib/dom", "ace/lib/useragent"], function (e, t, n) {
    function r(e) {
        e.$clickSelection = null;
        var t = e.editor;
        t.setDefaultHandler("mousedown", this.onMouseDown.bind(e)), t.setDefaultHandler("dblclick", this.onDoubleClick.bind(e)), t.setDefaultHandler("tripleclick", this.onTripleClick.bind(e)), t.setDefaultHandler("quadclick", this.onQuadClick.bind(e)), t.setDefaultHandler("mousewheel", this.onMouseWheel.bind(e));
        var n = ["select", "startSelect", "drag", "dragEnd", "dragWait", "dragWaitEnd", "startDrag", "focusWait"];
        n.forEach(function (t) {
            e[t] = this[t]
        }, this), e.selectByLines = this.extendSelectionBy.bind(e, "getLineRange"), e.selectByWords = this.extendSelectionBy.bind(e, "getWordRange")
    }

    function i(e, t, n, r) {
        return Math.sqrt(Math.pow(n - e, 2) + Math.pow(r - t, 2))
    }

    function s(e, t) {
        if (e.start.row == e.end.row)var n = 2 * t.column - e.start.column - e.end.column; else if (e.start.row == e.end.row - 1 && !e.start.column && !e.end.column)var n = t.column - 4; else var n = 2 *
            t.row - e.start.row - e.end.row;
        return n < 0 ? {cursor: e.start, anchor: e.end} : {cursor: e.end, anchor: e.start}
    }

    var o = e("../lib/dom"), u = e("../lib/useragent"), a = 0;
    (function () {
        this.onMouseDown = function (e) {
            var t = e.inSelection(), n = e.getDocumentPosition();
            this.mousedownEvent = e;
            var r = this.editor, i = e.getButton();
            if (i !== 0) {
                var s = r.getSelectionRange(), o = s.isEmpty();
                o && (r.moveCursorToPosition(n), r.selection.clearSelection()), r.textInput.onContextMenu(e.domEvent);
                return
            }
            if (t && !r.isFocused()) {
                r.focus();
                if (this.$focusTimout && !this.$clickSelection && !r.inMultiSelectMode)return this.setState("focusWait"), this.captureMouse(e), e.preventDefault()
            }
            return!t || this.$clickSelection || e.getShiftKey() || r.inMultiSelectMode ? this.startSelect(n) : t && (this.mousedownEvent.time = (new Date).getTime(), this.setState("dragWait")), this.captureMouse(e), e.preventDefault()
        }, this.startSelect = function (e) {
            e = e || this.editor.renderer.screenToTextCoordinates(this.x, this.y), this.mousedownEvent.getShiftKey() ? this.editor.selection.selectToPosition(e) : this.$clickSelection || (this.editor.moveCursorToPosition(e), this.editor.selection.clearSelection()), this.setState("select")
        }, this.select = function () {
            var e, t = this.editor, n = t.renderer.screenToTextCoordinates(this.x, this.y);
            if (this.$clickSelection) {
                var r = this.$clickSelection.comparePoint(n);
                if (r == -1)e = this.$clickSelection.end; else if (r == 1)e = this.$clickSelection.start; else {
                    var i = s(this.$clickSelection, n);
                    n = i.cursor, e = i.anchor
                }
                t.selection.setSelectionAnchor(e.row, e.column)
            }
            t.selection.selectToPosition(n), t.renderer.scrollCursorIntoView()
        }, this.extendSelectionBy = function (e) {
            var t, n = this.editor, r = n.renderer.screenToTextCoordinates(this.x, this.y), i = n.selection[e](r.row, r.column);
            if (this.$clickSelection) {
                var o = this.$clickSelection.comparePoint(i.start), u = this.$clickSelection.comparePoint(i.end);
                if (o == -1 && u <= 0) {
                    t = this.$clickSelection.end;
                    if (i.end.row != r.row || i.end.column != r.column)r = i.start
                } else if (u == 1 && o >= 0) {
                    t = this.$clickSelection.start;
                    if (i.start.row != r.row || i.start.column != r.column)r = i.end
                } else if (o == -1 && u == 1)r = i.end, t = i.start; else {
                    var a = s(this.$clickSelection, r);
                    r = a.cursor, t = a.anchor
                }
                n.selection.setSelectionAnchor(t.row, t.column)
            }
            n.selection.selectToPosition(r), n.renderer.scrollCursorIntoView()
        }, this.startDrag = function () {
            var e = this.editor;
            this.setState("drag"), this.dragRange = e.getSelectionRange();
            var t = e.getSelectionStyle();
            this.dragSelectionMarker = e.session.addMarker(this.dragRange, "ace_selection", t), e.clearSelection(), o.addCssClass(e.container, "ace_dragging"), this.$dragKeybinding || (this.$dragKeybinding = {handleKeyboard: function (e, t, n, r) {
                if (n == "esc")return{command: this.command}
            }, command: {exec: function (e) {
                var t = e.$mouseHandler;
                t.dragCursor = null, t.dragEnd(), t.startSelect()
            }}}), e.keyBinding.addKeyboardHandler(this.$dragKeybinding)
        }, this.focusWait = function () {
            var e = i(this.mousedownEvent.x, this.mousedownEvent.y, this.x, this.y), t = (new Date).getTime();
            (e > a || t - this.mousedownEvent.time > this.$focusTimout) && this.startSelect(this.mousedownEvent.getDocumentPosition())
        }, this.dragWait = function (e) {
            var t = i(this.mousedownEvent.x, this.mousedownEvent.y, this.x, this.y), n = (new Date).getTime(), r = this.editor;
            t > a ? this.startSelect(this.mousedownEvent.getDocumentPosition()) : n - this.mousedownEvent.time > r.$mouseHandler.$dragDelay && this.startDrag()
        }, this.dragWaitEnd = function (e) {
            this.mousedownEvent.domEvent = e, this.startSelect()
        }, this.drag = function () {
            var e = this.editor;
            this.dragCursor = e.renderer.screenToTextCoordinates(this.x, this.y), e.moveCursorToPosition(this.dragCursor), e.renderer.scrollCursorIntoView()
        }, this.dragEnd = function (e) {
            var t = this.editor, n = this.dragCursor, r = this.dragRange;
            o.removeCssClass(t.container, "ace_dragging"), t.session.removeMarker(this.dragSelectionMarker), t.keyBinding.removeKeyboardHandler(this.$dragKeybinding);
            if (!n)return;
            t.clearSelection();
            if (e && (e.ctrlKey || e.altKey)) {
                var i = t.session, s = r;
                s.end = i.insert(n, i.getTextRange(r)), s.start = n
            } else {
                if (r.contains(n.row, n.column))return;
                var s = t.moveText(r, n)
            }
            if (!s)return;
            t.selection.setSelectionRange(s)
        }, this.onDoubleClick = function (e) {
            var t = e.getDocumentPosition(), n = this.editor, r = n.session, i = r.getBracketRange(t);
            if (i) {
                i.isEmpty() && (i.start.column--, i.end.column++), this.$clickSelection = i, this.setState("select");
                return
            }
            this.$clickSelection = n.selection.getWordRange(t.row, t.column), this.setState("selectByWords")
        }, this.onTripleClick = function (e) {
            var t = e.getDocumentPosition(), n = this.editor;
            this.setState("selectByLines"), this.$clickSelection = n.selection.getLineRange(t.row)
        }, this.onQuadClick = function (e) {
            var t = this.editor;
            t.selectAll(), this.$clickSelection = t.getSelectionRange(), this.setState("null")
        }, this.onMouseWheel = function (e) {
            if (e.getShiftKey() || e.getAccelKey())return;
            var t = e.domEvent.timeStamp, n = t - (this.$lastScrollTime || 0), r = this.editor, i = r.renderer.isScrollableBy(e.wheelX * e.speed, e.wheelY * e.speed);
            if (i || n < 200)return this.$lastScrollTime = t, r.renderer.scrollBy(e.wheelX * e.speed, e.wheelY * e.speed), e.stop()
        }
    }).call(r.prototype), t.DefaultHandlers = r
}), define("ace/mouse/default_gutter_handler", ["require", "exports", "module", "ace/lib/dom", "ace/lib/event"], function (e, t, n) {
    function r(e) {
        function t() {
            c = i.createElement("div"), c.className = "ace_gutter-tooltip", c.style.display = "none", u.container.appendChild(c)
        }

        function n() {
            c || t();
            var e = l.getDocumentPosition().row, n = a.$annotations[e];
            if (!n)return r();
            var i = u.session.getLength();
            if (e == i) {
                var s = u.renderer.pixelToScreenCoordinates(0, l.y).row, f = l.$pos;
                if (s > u.session.documentToScreenRow(f.row, f.column))return r()
            }
            if (h == n)return;
            h = n.text.join("<br/>"), c.style.display = "block", c.innerHTML = h, u.on("mousewheel", r), o(l)
        }

        function r() {
            f && (f = clearTimeout(f)), h && (c.style.display = "none", h = null, u.removeEventListener("mousewheel", r))
        }

        function o(e) {
            var t = u.renderer.$gutter.getBoundingClientRect();
            c.style.left = e.x + 15 + "px", e.y + 3 * u.renderer.lineHeight + 15 < t.bottom ? (c.style.bottom = "", c.style.top = e.y + 15 + "px") : (c.style.top = "", c.style.bottom = t.bottom - e.y + 5 + "px")
        }

        var u = e.editor, a = u.renderer.$gutterLayer;
        e.editor.setDefaultHandler("guttermousedown", function (t) {
            if (!u.isFocused())return;
            var n = a.getRegion(t);
            if (n == "foldWidgets")return;
            var r = t.getDocumentPosition().row, i = u.session.selection;
            if (t.getShiftKey())i.selectTo(r, 0); else {
                if (t.domEvent.detail == 2)return u.selectAll(), t.preventDefault();
                e.$clickSelection = u.selection.getLineRange(r)
            }
            return e.captureMouse(t, "selectByLines"), t.preventDefault()
        });
        var f, l, c, h;
        e.editor.setDefaultHandler("guttermousemove", function (t) {
            var s = t.domEvent.target || t.domEvent.srcElement;
            if (i.hasCssClass(s, "ace_fold-widget"))return r();
            h && o(t), l = t;
            if (f)return;
            f = setTimeout(function () {
                f = null, l && !e.isMousePressed ? n() : r()
            }, 50)
        }), s.addListener(u.renderer.$gutter, "mouseout", function (e) {
            l = null;
            if (!h || f)return;
            f = setTimeout(function () {
                f = null, r()
            }, 50)
        })
    }

    var i = e("../lib/dom"), s = e("../lib/event");
    t.GutterHandler = r
}), define("ace/mouse/mouse_event", ["require", "exports", "module", "ace/lib/event", "ace/lib/useragent"], function (e, t, n) {
    var r = e("../lib/event"), i = e("../lib/useragent"), s = t.MouseEvent = function (e, t) {
        this.domEvent = e, this.editor = t, this.x = this.clientX = e.clientX, this.y = this.clientY = e.clientY, this.$pos = null, this.$inSelection = null, this.propagationStopped = !1, this.defaultPrevented = !1
    };
    (function () {
        this.stopPropagation = function () {
            r.stopPropagation(this.domEvent), this.propagationStopped = !0
        }, this.preventDefault = function () {
            r.preventDefault(this.domEvent), this.defaultPrevented = !0
        }, this.stop = function () {
            this.stopPropagation(), this.preventDefault()
        }, this.getDocumentPosition = function () {
            return this.$pos ? this.$pos : (this.$pos = this.editor.renderer.screenToTextCoordinates(this.clientX, this.clientY), this.$pos)
        }, this.inSelection = function () {
            if (this.$inSelection !== null)return this.$inSelection;
            var e = this.editor;
            if (e.getReadOnly())this.$inSelection = !1; else {
                var t = e.getSelectionRange();
                if (t.isEmpty())this.$inSelection = !1; else {
                    var n = this.getDocumentPosition();
                    this.$inSelection = t.contains(n.row, n.column)
                }
            }
            return this.$inSelection
        }, this.getButton = function () {
            return r.getButton(this.domEvent)
        }, this.getShiftKey = function () {
            return this.domEvent.shiftKey
        }, this.getAccelKey = i.isMac ? function () {
            return this.domEvent.metaKey
        } : function () {
            return this.domEvent.ctrlKey
        }
    }).call(s.prototype)
}), define("ace/mouse/dragdrop", ["require", "exports", "module", "ace/lib/event"], function (e, t, n) {
    var r = e("../lib/event"), i = function (e) {
        function t() {
            l = s.selection.toOrientedRange(), o = s.session.addMarker(l, "ace_selection", s.getSelectionStyle()), s.clearSelection(), clearInterval(f), f = setInterval(d, 20), h = 0, r.addListener(document, "mousemove", i)
        }

        function n() {
            clearInterval(f), s.session.removeMarker(o), o = null, s.selection.fromOrientedRange(l), h = 0, r.removeListener(document, "mousemove", i)
        }

        function i() {
            v == null && (v = setTimeout(function () {
                v != null && o && n()
            }, 20))
        }

        var s = e.editor, o, u, a, f, l, c, h = 0, p = s.container;
        r.addListener(p, "dragenter", function (e) {
            if (s.getReadOnly())return;
            var n = e.dataTransfer.types;
            if (n && Array.prototype.indexOf.call(n, "text/plain") === -1)return;
            return o || t(), h++, r.preventDefault(e)
        }), r.addListener(p, "dragover", function (e) {
            if (s.getReadOnly())return;
            var t = e.dataTransfer.types;
            if (t && Array.prototype.indexOf.call(t, "text/plain") === -1)return;
            return v !== null && (v = null), u = e.clientX, a = e.clientY, r.preventDefault(e)
        });
        var d = function () {
            c = s.renderer.screenToTextCoordinates(u, a), s.moveCursorToPosition(c), s.renderer.scrollCursorIntoView()
        };
        r.addListener(p, "dragleave", function (e) {
            h--;
            if (h <= 0 && o)return n(), r.preventDefault(e)
        }), r.addListener(p, "drop", function (e) {
            if (!o)return;
            return l.end = s.session.insert(c, e.dataTransfer.getData("Text")), l.start = c, n(), s.focus(), r.preventDefault(e)
        });
        var v = null
    };
    t.DragdropHandler = i
}), define("ace/config", ["require", "exports", "module", "ace/lib/lang", "ace/lib/oop", "ace/lib/net", "ace/lib/event_emitter"], function (e, t, n) {
    "no use strict";
    function r(e) {
        return e.replace(/-(.)/g, function (e, t) {
            return t.toUpperCase()
        })
    }

    var i = e("./lib/lang"), s = e("./lib/oop"), o = e("./lib/net"), u = e("./lib/event_emitter").EventEmitter, a = function () {
        return this
    }(), f = {packaged: !1, workerPath: null, modePath: null, themePath: null, basePath: "", suffix: ".js", $moduleUrls: {}};
    t.get = function (e) {
        if (!f.hasOwnProperty(e))throw new Error("Unknown config key: " + e);
        return f[e]
    }, t.set = function (e, t) {
        if (!f.hasOwnProperty(e))throw new Error("Unknown config key: " + e);
        f[e] = t
    }, t.all = function () {
        return i.copyObject(f)
    }, s.implement(t, u), t.moduleUrl = function (e, t) {
        if (f.$moduleUrls[e])return f.$moduleUrls[e];
        var n = e.split("/");
        t = t || n[n.length - 2] || "";
        var r = n[n.length - 1].replace(t, "").replace(/(^[\-_])|([\-_]$)/, "");
        !r && n.length > 1 && (r = n[n.length - 2]);
        var i = f[t + "Path"];
        return i == null && (i = f.basePath), i && i.slice(-1) != "/" && (i += "/"), i + t + "-" + r + this.get("suffix")
    }, t.setModuleUrl = function (e, t) {
        return f.$moduleUrls[e] = t
    }, t.$loading = {}, t.loadModule = function (n, r) {
        var i, s;
        Array.isArray(n) && (s = n[0], n = n[1]);
        try {
            i = e(n)
        } catch (u) {
        }
        if (i && !t.$loading[n])return r && r(i);
        t.$loading[n] || (t.$loading[n] = []), t.$loading[n].push(r);
        if (t.$loading[n].length > 1)return;
        var a = function () {
            e([n], function (e) {
                t._emit("load.module", {name: n, module: e});
                var r = t.$loading[n];
                t.$loading[n] = null, r.forEach(function (t) {
                    t && t(e)
                })
            })
        };
        if (!t.get("packaged"))return a();
        o.loadScript(t.moduleUrl(n, s), a)
    }, t.init = function () {
        f.packaged = e.packaged || n.packaged || a.define && define.packaged;
        if (!a.document)return"";
        var i = {}, s = "", o = document.getElementsByTagName("script");
        for (var u = 0; u < o.length; u++) {
            var l = o[u], c = l.src || l.getAttribute("src");
            if (!c)continue;
            var h = l.attributes;
            for (var p = 0, d = h.length; p < d; p++) {
                var v = h[p];
                v.name.indexOf("data-ace-") === 0 && (i[r(v.name.replace(/^data-ace-/, ""))] = v.value)
            }
            var m = c.match(/^(.*)\/ace(\-\w+)?\.js(\?|$)/);
            m && (s = m[1])
        }
        s && (i.base = i.base || s, i.packaged = !0), i.basePath = i.base, i.workerPath = i.workerPath || i.base, i.modePath = i.modePath || i.base, i.themePath = i.themePath || i.base, delete i.base;
        for (var g in i)typeof i[g] != "undefined" && t.set(g, i[g])
    };
    var l = {setOptions: function (e) {
        Object.keys(e).forEach(function (t) {
            this.setOption(t, e[t])
        }, this)
    }, getOptions: function (e) {
        var t = {};
        return Object.keys(e).forEach(function (e) {
            t[e] = this.getOption(e)
        }, this), t
    }, setOption: function (e, t) {
        if (this["$" + e] === t)return;
        var n = this.$options[e];
        if (!n)return undefined;
        if (n.forwardTo)return this[n.forwardTo] && this[n.forwardTo].setOption(e, t);
        n.handlesSet || (this["$" + e] = t), n && n.set && n.set.call(this, t)
    }, getOption: function (e) {
        var t = this.$options[e];
        return t ? t.forwardTo ? this[t.forwardTo] && this[t.forwardTo].getOption(e) : t && t.get ? t.get.call(this) : this["$" + e] : undefined
    }}, c = {};
    t.defineOptions = function (e, t, n) {
        return e.$options || (c[t] = e.$options = {}), Object.keys(n).forEach(function (t) {
            var r = n[t];
            typeof r == "string" && (r = {forwardTo: r}), r.name || (r.name = t), e.$options[r.name] = r, "initialValue"in r && (e["$" + r.name] = r.initialValue)
        }), s.implement(e, l), this
    }, t.resetOptions = function (e) {
        Object.keys(e.$options).forEach(function (t) {
            var n = e.$options[t];
            "value"in n && e.setOption(t, n.value)
        })
    }, t.setDefaultValue = function (e, n, r) {
        var i = c[e] || (c[e] = {});
        i[n] && (i.forwardTo ? t.setDefaultValue(i.forwardTo, n, r) : i[n].value = r)
    }, t.setDefaultValues = function (e, n) {
        Object.keys(n).forEach(function (r) {
            t.setDefaultValue(e, r, n[r])
        })
    }
}), define("ace/lib/net", ["require", "exports", "module", "ace/lib/dom"], function (e, t, n) {
    var r = e("./dom");
    t.get = function (e, t) {
        var n = new XMLHttpRequest;
        n.open("GET", e, !0), n.onreadystatechange = function () {
            n.readyState === 4 && t(n.responseText)
        }, n.send(null)
    }, t.loadScript = function (e, t) {
        var n = r.getDocumentHead(), i = document.createElement("script");
        i.src = e, n.appendChild(i), i.onload = i.onreadystatechange = function (e, n) {
            if (n || !i.readyState || i.readyState == "loaded" || i.readyState == "complete")i = i.onload = i.onreadystatechange = null, n || t()
        }
    }
}), define("ace/lib/event_emitter", ["require", "exports", "module"], function (e, t, n) {
    var r = {}, i = function () {
        this.propagationStopped = !0
    }, s = function () {
        this.defaultPrevented = !0
    };
    r._emit = r._dispatchEvent = function (e, t) {
        this._eventRegistry || (this._eventRegistry = {}), this._defaultHandlers || (this._defaultHandlers = {});
        var n = this._eventRegistry[e] || [], r = this._defaultHandlers[e];
        if (!n.length && !r)return;
        if (typeof t != "object" || !t)t = {};
        t.type || (t.type = e), t.stopPropagation || (t.stopPropagation = i), t.preventDefault || (t.preventDefault = s);
        for (var o = 0; o < n.length; o++) {
            n[o](t, this);
            if (t.propagationStopped)break
        }
        if (r && !t.defaultPrevented)return r(t, this)
    }, r._signal = function (e, t) {
        var n = (this._eventRegistry || {})[e];
        if (!n)return;
        for (var r = 0; r < n.length; r++)n[r](t, this)
    }, r.once = function (e, t) {
        var n = this;
        t && this.addEventListener(e, function r() {
            n.removeEventListener(e, r), t.apply(null, arguments)
        })
    }, r.setDefaultHandler = function (e, t) {
        this._defaultHandlers = this._defaultHandlers || {};
        if (this._defaultHandlers[e])throw new Error("The default handler for '" + e + "' is already set");
        this._defaultHandlers[e] = t
    }, r.on = r.addEventListener = function (e, t, n) {
        this._eventRegistry = this._eventRegistry || {};
        var r = this._eventRegistry[e];
        return r || (r = this._eventRegistry[e] = []), r.indexOf(t) == -1 && r[n ? "unshift" : "push"](t), t
    }, r.off = r.removeListener = r.removeEventListener = function (e, t) {
        this._eventRegistry = this._eventRegistry || {};
        var n = this._eventRegistry[e];
        if (!n)return;
        var r = n.indexOf(t);
        r !== -1 && n.splice(r, 1)
    }, r.removeAllListeners = function (e) {
        this._eventRegistry && (this._eventRegistry[e] = [])
    }, t.EventEmitter = r
}), define("ace/mouse/fold_handler", ["require", "exports", "module"], function (e, t, n) {
    function r(e) {
        e.on("click", function (t) {
            var n = t.getDocumentPosition(), r = e.session, i = r.getFoldAt(n.row, n.column, 1);
            i && (t.getAccelKey() ? r.removeFold(i) : r.expandFold(i), t.stop())
        }), e.on("gutterclick", function (t) {
            var n = e.renderer.$gutterLayer.getRegion(t);
            if (n == "foldWidgets") {
                var r = t.getDocumentPosition().row, i = e.session;
                i.foldWidgets && i.foldWidgets[r] && e.session.onFoldWidgetClick(r, t), e.isFocused() || e.focus(), t.stop()
            }
        }), e.on("gutterdblclick", function (t) {
            var n = e.renderer.$gutterLayer.getRegion(t);
            if (n == "foldWidgets") {
                var r = t.getDocumentPosition().row, i = e.session, s = i.getParentFoldRangeData(r, !0), o = s.range || s.firstRange;
                if (o) {
                    var r = o.start.row, u = i.getFoldAt(r, i.getLine(r).length, 1);
                    u ? i.removeFold(u) : (i.addFold("...", o), e.renderer.scrollCursorIntoView({row: o.start.row, column: 0}))
                }
                t.stop()
            }
        })
    }

    t.FoldHandler = r
}), define("ace/keyboard/keybinding", ["require", "exports", "module", "ace/lib/keys", "ace/lib/event"], function (e, t, n) {
    var r = e("../lib/keys"), i = e("../lib/event"), s = function (e) {
        this.$editor = e, this.$data = {}, this.$handlers = [], this.setDefaultHandler(e.commands)
    };
    (function () {
        this.setDefaultHandler = function (e) {
            this.removeKeyboardHandler(this.$defaultHandler), this.$defaultHandler = e, this.addKeyboardHandler(e, 0), this.$data = {editor: this.$editor}
        }, this.setKeyboardHandler = function (e) {
            var t = this.$handlers;
            if (t[t.length - 1] == e)return;
            while (t[t.length - 1] && t[t.length - 1] != this.$defaultHandler)this.removeKeyboardHandler(t[t.length - 1]);
            this.addKeyboardHandler(e, 1)
        }, this.addKeyboardHandler = function (e, t) {
            if (!e)return;
            var n = this.$handlers.indexOf(e);
            n != -1 && this.$handlers.splice(n, 1), t == undefined ? this.$handlers.push(e) : this.$handlers.splice(t, 0, e), n == -1 && e.attach && e.attach(this.$editor)
        }, this.removeKeyboardHandler = function (e) {
            var t = this.$handlers.indexOf(e);
            return t == -1 ? !1 : (this.$handlers.splice(t, 1), e.detach && e.detach(this.$editor), !0)
        }, this.getKeyboardHandler = function () {
            return this.$handlers[this.$handlers.length - 1]
        }, this.$callKeyboardHandlers = function (e, t, n, r) {
            var s, o = !1, u = this.$editor.commands;
            for (var a = this.$handlers.length; a--;) {
                s = this.$handlers[a].handleKeyboard(this.$data, e, t, n, r);
                if (!s || !s.command)continue;
                s.command == "null" ? o = s.passEvent != 1 : o = u.exec(s.command, this.$editor, s.args, r), o && r && e != -1 && i.stopEvent(r);
                if (o)break
            }
            return o
        }, this.onCommandKey = function (e, t, n) {
            var i = r.keyCodeToString(n);
            this.$callKeyboardHandlers(t, i, n, e)
        }, this.onTextInput = function (e) {
            var t = this.$callKeyboardHandlers(-1, e);
            t || this.$editor.commands.exec("insertstring", this.$editor, e)
        }
    }).call(s.prototype), t.KeyBinding = s
}), define("ace/edit_session", ["require", "exports", "module", "ace/lib/oop", "ace/lib/lang", "ace/config", "ace/lib/event_emitter", "ace/selection", "ace/mode/text", "ace/range", "ace/document", "ace/background_tokenizer", "ace/search_highlight", "ace/edit_session/folding", "ace/edit_session/bracket_match"], function (e, t, n) {
    var r = e("./lib/oop"), i = e("./lib/lang"), s = e("./config"), o = e("./lib/event_emitter").EventEmitter, u = e("./selection").Selection, a = e("./mode/text").Mode, f = e("./range").Range, l = e("./document").Document, c = e("./background_tokenizer").BackgroundTokenizer, h = e("./search_highlight").SearchHighlight, p = function (e, t) {
        this.$breakpoints = [], this.$decorations = [], this.$frontMarkers = {}, this.$backMarkers = {}, this.$markerId = 1, this.$undoSelect = !0, this.$foldData = [], this.$foldData.toString = function () {
            return this.join("\n")
        }, this.on("changeFold", this.onChangeFold.bind(this)), this.$onChange = this.onChange.bind(this);
        if (typeof e != "object" || !e.getLine)e = new l(e);
        this.setDocument(e), this.selection = new u(this), s.resetOptions(this), this.setMode(t), s._emit("session", this)
    };
    (function () {
        function t(e) {
            return e < 4352 ? !1 : e >= 4352 && e <= 4447 || e >= 4515 && e <= 4519 || e >= 4602 && e <= 4607 || e >= 9001 && e <= 9002 || e >= 11904 && e <= 11929 || e >= 11931 && e <= 12019 || e >= 12032 && e <= 12245 || e >= 12272 && e <= 12283 || e >= 12288 && e <= 12350 || e >= 12353 && e <= 12438 || e >= 12441 && e <= 12543 || e >= 12549 && e <= 12589 || e >= 12593 && e <= 12686 || e >= 12688 && e <= 12730 || e >= 12736 && e <= 12771 || e >= 12784 && e <= 12830 || e >= 12832 && e <= 12871 || e >= 12880 && e <= 13054 || e >= 13056 && e <= 19903 || e >= 19968 && e <= 42124 || e >= 42128 && e <= 42182 || e >= 43360 && e <= 43388 || e >= 44032 && e <= 55203 || e >= 55216 && e <= 55238 || e >= 55243 && e <= 55291 || e >= 63744 && e <= 64255 || e >= 65040 && e <= 65049 || e >= 65072 && e <= 65106 || e >= 65108 && e <= 65126 || e >= 65128 && e <= 65131 || e >= 65281 && e <= 65376 || e >= 65504 && e <= 65510
        }

        r.implement(this, o), this.setDocument = function (e) {
            this.doc && this.doc.removeListener("change", this.$onChange), this.doc = e, e.on("change", this.$onChange), this.bgTokenizer && this.bgTokenizer.setDocument(this.getDocument()), this.resetCaches()
        }, this.getDocument = function () {
            return this.doc
        }, this.$resetRowCache = function (e) {
            if (!e) {
                this.$docRowCache = [], this.$screenRowCache = [];
                return
            }
            var t = this.$docRowCache.length, n = this.$getRowCacheIndex(this.$docRowCache, e) + 1;
            t > n && (this.$docRowCache.splice(n, t), this.$screenRowCache.splice(n, t))
        }, this.$getRowCacheIndex = function (e, t) {
            var n = 0, r = e.length - 1;
            while (n <= r) {
                var i = n + r >> 1, s = e[i];
                if (t > s)n = i + 1; else {
                    if (!(t < s))return i;
                    r = i - 1
                }
            }
            return n - 1
        }, this.resetCaches = function () {
            this.$modified = !0, this.$wrapData = [], this.$rowLengthCache = [], this.$resetRowCache(0), this.bgTokenizer && this.bgTokenizer.start(0)
        }, this.onChangeFold = function (e) {
            var t = e.data;
            this.$resetRowCache(t.start.row)
        }, this.onChange = function (e) {
            var t = e.data;
            this.$modified = !0, this.$resetRowCache(t.range.start.row);
            var n = this.$updateInternalDataOnChange(e);
            !this.$fromUndo && this.$undoManager && !t.ignore && (this.$deltasDoc.push(t), n && n.length != 0 && this.$deltasFold.push({action: "removeFolds", folds: n}), this.$informUndoManager.schedule()), this.bgTokenizer.$updateOnChange(t), this._emit("change", e)
        }, this.setValue = function (e) {
            this.doc.setValue(e), this.selection.moveCursorTo(0, 0), this.selection.clearSelection(), this.$resetRowCache(0), this.$deltas = [], this.$deltasDoc = [], this.$deltasFold = [], this.getUndoManager().reset()
        }, this.getValue = this.toString = function () {
            return this.doc.getValue()
        }, this.getSelection = function () {
            return this.selection
        }, this.getState = function (e) {
            return this.bgTokenizer.getState(e)
        }, this.getTokens = function (e) {
            return this.bgTokenizer.getTokens(e)
        }, this.getTokenAt = function (e, t) {
            var n = this.bgTokenizer.getTokens(e), r, i = 0;
            if (t == null)s = n.length - 1, i = this.getLine(e).length; else for (var s = 0; s < n.length; s++) {
                i += n[s].value.length;
                if (i >= t)break
            }
            return r = n[s], r ? (r.index = s, r.start = i - r.value.length, r) : null
        }, this.setUndoManager = function (e) {
            this.$undoManager = e, this.$deltas = [], this.$deltasDoc = [], this.$deltasFold = [], this.$informUndoManager && this.$informUndoManager.cancel();
            if (e) {
                var t = this;
                this.$syncInformUndoManager = function () {
                    t.$informUndoManager.cancel(), t.$deltasFold.length && (t.$deltas.push({group: "fold", deltas: t.$deltasFold}), t.$deltasFold = []), t.$deltasDoc.length && (t.$deltas.push({group: "doc", deltas: t.$deltasDoc}), t.$deltasDoc = []), t.$deltas.length > 0 && e.execute({action: "aceupdate", args: [t.$deltas, t]}), t.$deltas = []
                }, this.$informUndoManager = i.delayedCall(this.$syncInformUndoManager)
            }
        }, this.markUndoGroup = function () {
            this.$syncInformUndoManager && this.$syncInformUndoManager()
        }, this.$defaultUndoManager = {undo: function () {
        }, redo: function () {
        }, reset: function () {
        }}, this.getUndoManager = function () {
            return this.$undoManager || this.$defaultUndoManager
        }, this.getTabString = function () {
            return this.getUseSoftTabs() ? i.stringRepeat(" ", this.getTabSize()) : "	"
        }, this.setUseSoftTabs = function (e) {
            this.setOption("useSoftTabs", e)
        }, this.getUseSoftTabs = function () {
            return this.$useSoftTabs
        }, this.setTabSize = function (e) {
            this.setOption("tabSize", e)
        }, this.getTabSize = function () {
            return this.$tabSize
        }, this.isTabStop = function (e) {
            return this.$useSoftTabs && e.column % this.$tabSize == 0
        }, this.$overwrite = !1, this.setOverwrite = function (e) {
            this.setOption("overwrite", e)
        }, this.getOverwrite = function () {
            return this.$overwrite
        }, this.toggleOverwrite = function () {
            this.setOverwrite(!this.$overwrite)
        }, this.addGutterDecoration = function (e, t) {
            this.$decorations[e] || (this.$decorations[e] = ""), this.$decorations[e] += " " + t, this._emit("changeBreakpoint", {})
        }, this.removeGutterDecoration = function (e, t) {
            this.$decorations[e] = (this.$decorations[e] || "").replace(" " + t, ""), this._emit("changeBreakpoint", {})
        }, this.getBreakpoints = function () {
            return this.$breakpoints
        }, this.setBreakpoints = function (e) {
            this.$breakpoints = [];
            for (var t = 0; t < e.length; t++)this.$breakpoints[e[t]] = "ace_breakpoint";
            this._emit("changeBreakpoint", {})
        }, this.clearBreakpoints = function () {
            this.$breakpoints = [], this._emit("changeBreakpoint", {})
        }, this.setBreakpoint = function (e, t) {
            t === undefined && (t = "ace_breakpoint"), t ? this.$breakpoints[e] = t : delete this.$breakpoints[e], this._emit("changeBreakpoint", {})
        }, this.clearBreakpoint = function (e) {
            delete this.$breakpoints[e], this._emit("changeBreakpoint", {})
        }, this.addMarker = function (e, t, n, r) {
            var i = this.$markerId++, s = {range: e, type: n || "line", renderer: typeof n == "function" ? n : null, clazz: t, inFront: !!r, id: i};
            return r ? (this.$frontMarkers[i] = s, this._emit("changeFrontMarker")) : (this.$backMarkers[i] = s, this._emit("changeBackMarker")), i
        }, this.addDynamicMarker = function (e, t) {
            if (!e.update)return;
            var n = this.$markerId++;
            return e.id = n, e.inFront = !!t, t ? (this.$frontMarkers[n] = e, this._emit("changeFrontMarker")) : (this.$backMarkers[n] = e, this._emit("changeBackMarker")), e
        }, this.removeMarker = function (e) {
            var t = this.$frontMarkers[e] || this.$backMarkers[e];
            if (!t)return;
            var n = t.inFront ? this.$frontMarkers : this.$backMarkers;
            t && (delete n[e], this._emit(t.inFront ? "changeFrontMarker" : "changeBackMarker"))
        }, this.getMarkers = function (e) {
            return e ? this.$frontMarkers : this.$backMarkers
        }, this.highlight = function (e) {
            if (!this.$searchHighlight) {
                var t = new h(null, "ace_selected-word", "text");
                this.$searchHighlight = this.addDynamicMarker(t)
            }
            this.$searchHighlight.setRegexp(e)
        }, this.highlightLines = function (e, t, n, r) {
            typeof t != "number" && (n = t, t = e), n || (n = "ace_step");
            var i = new f(e, 0, t, Infinity);
            return i.id = this.addMarker(i, n, "fullLine", r), i
        }, this.setAnnotations = function (e) {
            this.$annotations = e, this._emit("changeAnnotation", {})
        }, this.getAnnotations = function () {
            return this.$annotations || []
        }, this.clearAnnotations = function () {
            this.setAnnotations([])
        }, this.$detectNewLine = function (e) {
            var t = e.match(/^.*?(\r?\n)/m);
            t ? this.$autoNewLine = t[1] : this.$autoNewLine = "\n"
        }, this.getWordRange = function (e, t) {
            var n = this.getLine(e), r = !1;
            t > 0 && (r = !!n.charAt(t - 1).match(this.tokenRe)), r || (r = !!n.charAt(t).match(this.tokenRe));
            if (r)var i = this.tokenRe; else if (/^\s+$/.test(n.slice(t - 1, t + 1)))var i = /\s/; else var i = this.nonTokenRe;
            var s = t;
            if (s > 0) {
                do s--; while (s >= 0 && n.charAt(s).match(i));
                s++
            }
            var o = t;
            while (o < n.length && n.charAt(o).match(i))o++;
            return new f(e, s, e, o)
        }, this.getAWordRange = function (e, t) {
            var n = this.getWordRange(e, t), r = this.getLine(n.end.row);
            while (r.charAt(n.end.column).match(/[ \t]/))n.end.column += 1;
            return n
        }, this.setNewLineMode = function (e) {
            this.doc.setNewLineMode(e)
        }, this.getNewLineMode = function () {
            return this.doc.getNewLineMode()
        }, this.setUseWorker = function (e) {
            this.setOption("useWorker", e)
        }, this.getUseWorker = function () {
            return this.$useWorker
        }, this.onReloadTokenizer = function (e) {
            var t = e.data;
            this.bgTokenizer.start(t.first), this._emit("tokenizerUpdate", e)
        }, this.$modes = {}, this.$mode = null, this.$modeId = null, this.setMode = function (e) {
            if (e && typeof e == "object") {
                if (e.getTokenizer)return this.$onChangeMode(e);
                var t = e, n = t.path
            } else n = e || "ace/mode/text";
            this.$modes["ace/mode/text"] || (this.$modes["ace/mode/text"] = new a);
            if (this.$modes[n] && !t)return this.$onChangeMode(this.$modes[n]);
            this.$modeId = n, s.loadModule(["mode", n], function (e) {
                if (this.$modeId !== n)return;
                if (this.$modes[n] && !t)return this.$onChangeMode(this.$modes[n]);
                e && e.Mode && (e = new e.Mode(t), t || (this.$modes[n] = e, e.$id = n), this.$onChangeMode(e))
            }.bind(this)), this.$mode || this.$onChangeMode(this.$modes["ace/mode/text"], !0)
        }, this.$onChangeMode = function (e, t) {
            if (this.$mode === e)return;
            this.$mode = e, this.$stopWorker(), this.$useWorker && this.$startWorker();
            var n = e.getTokenizer();
            if (n.addEventListener !== undefined) {
                var r = this.onReloadTokenizer.bind(this);
                n.addEventListener("update", r)
            }
            if (!this.bgTokenizer) {
                this.bgTokenizer = new c(n);
                var i = this;
                this.bgTokenizer.addEventListener("update", function (e) {
                    i._emit("tokenizerUpdate", e)
                })
            } else this.bgTokenizer.setTokenizer(n);
            this.bgTokenizer.setDocument(this.getDocument()), this.tokenRe = e.tokenRe, this.nonTokenRe = e.nonTokenRe, t || (this.$modeId = e.$id, this.$setFolding(e.foldingRules), this._emit("changeMode"), this.bgTokenizer.start(0))
        }, this.$stopWorker = function () {
            this.$worker && this.$worker.terminate(), this.$worker = null
        }, this.$startWorker = function () {
            if (typeof Worker != "undefined" && !e.noWorker)try {
                this.$worker = this.$mode.createWorker(this)
            } catch (t) {
                console.log("Could not load worker"), console.log(t), this.$worker = null
            } else this.$worker = null
        }, this.getMode = function () {
            return this.$mode
        }, this.$scrollTop = 0, this.setScrollTop = function (e) {
            e = Math.round(Math.max(0, e));
            if (this.$scrollTop === e || isNaN(e))return;
            this.$scrollTop = e, this._signal("changeScrollTop", e)
        }, this.getScrollTop = function () {
            return this.$scrollTop
        }, this.$scrollLeft = 0, this.setScrollLeft = function (e) {
            e = Math.round(Math.max(0, e));
            if (this.$scrollLeft === e || isNaN(e))return;
            this.$scrollLeft = e, this._signal("changeScrollLeft", e)
        }, this.getScrollLeft = function () {
            return this.$scrollLeft
        }, this.getScreenWidth = function () {
            return this.$computeWidth(), this.screenWidth
        }, this.$computeWidth = function (e) {
            if (this.$modified || e) {
                this.$modified = !1;
                if (this.$useWrapMode)return this.screenWidth = this.$wrapLimit;
                var t = this.doc.getAllLines(), n = this.$rowLengthCache, r = 0, i = 0, s = this.$foldData[i], o = s ? s.start.row : Infinity, u = t.length;
                for (var a = 0; a < u; a++) {
                    if (a > o) {
                        a = s.end.row + 1;
                        if (a >= u)break;
                        s = this.$foldData[i++], o = s ? s.start.row : Infinity
                    }
                    n[a] == null && (n[a] = this.$getStringScreenWidth(t[a])[0]), n[a] > r && (r = n[a])
                }
                this.screenWidth = r
            }
        }, this.getLine = function (e) {
            return this.doc.getLine(e)
        }, this.getLines = function (e, t) {
            return this.doc.getLines(e, t)
        }, this.getLength = function () {
            return this.doc.getLength()
        }, this.getTextRange = function (e) {
            return this.doc.getTextRange(e || this.selection.getRange())
        }, this.insert = function (e, t) {
            return this.doc.insert(e, t)
        }, this.remove = function (e) {
            return this.doc.remove(e)
        }, this.undoChanges = function (e, t) {
            if (!e.length)return;
            this.$fromUndo = !0;
            var n = null;
            for (var r = e.length - 1; r != -1; r--) {
                var i = e[r];
                i.group == "doc" ? (this.doc.revertDeltas(i.deltas), n = this.$getUndoSelection(i.deltas, !0, n)) : i.deltas.forEach(function (e) {
                    this.addFolds(e.folds)
                }, this)
            }
            return this.$fromUndo = !1, n && this.$undoSelect && !t && this.selection.setSelectionRange(n), n
        }, this.redoChanges = function (e, t) {
            if (!e.length)return;
            this.$fromUndo = !0;
            var n = null;
            for (var r = 0; r < e.length; r++) {
                var i = e[r];
                i.group == "doc" && (this.doc.applyDeltas(i.deltas), n = this.$getUndoSelection(i.deltas, !1, n))
            }
            return this.$fromUndo = !1, n && this.$undoSelect && !t && this.selection.setSelectionRange(n), n
        }, this.setUndoSelect = function (e) {
            this.$undoSelect = e
        }, this.$getUndoSelection = function (e, t, n) {
            function r(e) {
                var n = e.action === "insertText" || e.action === "insertLines";
                return t ? !n : n
            }

            var i = e[0], s, o, u = !1;
            r(i) ? (s = i.range.clone(), u = !0) : (s = f.fromPoints(i.range.start, i.range.start), u = !1);
            for (var a = 1; a < e.length; a++)i = e[a], r(i) ? (o = i.range.start, s.compare(o.row, o.column) == -1 && s.setStart(i.range.start), o = i.range.end, s.compare(o.row, o.column) == 1 && s.setEnd(i.range.end), u = !0) : (o = i.range.start, s.compare(o.row, o.column) == -1 && (s = f.fromPoints(i.range.start, i.range.start)), u = !1);
            if (n != null) {
                var l = n.compareRange(s);
                l == 1 ? s.setStart(n.start) : l == -1 && s.setEnd(n.end)
            }
            return s
        }, this.replace = function (e, t) {
            return this.doc.replace(e, t)
        }, this.moveText = function (e, t, n) {
            var r = this.getTextRange(e), i = this.getFoldsInRange(e), s = f.fromPoints(t, t);
            if (!n) {
                this.remove(e);
                var o = e.start.row - e.end.row, u = o ? -e.end.column : e.start.column - e.end.column;
                u && (s.start.row == e.end.row && s.start.column > e.end.column && (s.start.column += u), s.end.row == e.end.row && s.end.column > e.end.column && (s.end.column += u)), o && s.start.row >= e.end.row && (s.start.row += o, s.end.row += o)
            }
            this.insert(s.start, r);
            if (i.length) {
                var a = e.start, l = s.start, o = l.row - a.row, u = l.column - a.column;
                this.addFolds(i.map(function (e) {
                    return e = e.clone(), e.start.row == a.row && (e.start.column += u), e.end.row == a.row && (e.end.column += u), e.start.row += o, e.end.row += o, e
                }))
            }
            return s
        }, this.indentRows = function (e, t, n) {
            n = n.replace(/\t/g, this.getTabString());
            for (var r = e; r <= t; r++)this.insert({row: r, column: 0}, n)
        }, this.outdentRows = function (e) {
            var t = e.collapseRows(), n = new f(0, 0, 0, 0), r = this.getTabSize();
            for (var i = t.start.row; i <= t.end.row; ++i) {
                var s = this.getLine(i);
                n.start.row = i, n.end.row = i;
                for (var o = 0; o < r; ++o)if (s.charAt(o) != " ")break;
                o < r && s.charAt(o) == "	" ? (n.start.column = o, n.end.column = o + 1) : (n.start.column = 0, n.end.column = o), this.remove(n)
            }
        }, this.$moveLines = function (e, t, n) {
            e = this.getRowFoldStart(e), t = this.getRowFoldEnd(t);
            if (n < 0) {
                var r = this.getRowFoldStart(e + n);
                if (r < 0)return 0;
                var i = r - e
            } else if (n > 0) {
                var r = this.getRowFoldEnd(t + n);
                if (r > this.doc.getLength() - 1)return 0;
                var i = r - t
            } else {
                e = this.$clipRowToDocument(e), t = this.$clipRowToDocument(t);
                var i = t - e + 1
            }
            var s = new f(e, 0, t, Number.MAX_VALUE), o = this.getFoldsInRange(s).map(function (e) {
                return e = e.clone(), e.start.row += i, e.end.row += i, e
            }), u = n == 0 ? this.doc.getLines(e, t) : this.doc.removeLines(e, t);
            return this.doc.insertLines(e + i, u), o.length && this.addFolds(o), i
        }, this.moveLinesUp = function (e, t) {
            return this.$moveLines(e, t, -1)
        }, this.moveLinesDown = function (e, t) {
            return this.$moveLines(e, t, 1)
        }, this.duplicateLines = function (e, t) {
            return this.$moveLines(e, t, 0)
        }, this.$clipRowToDocument = function (e) {
            return Math.max(0, Math.min(e, this.doc.getLength() - 1))
        }, this.$clipColumnToRow = function (e, t) {
            return t < 0 ? 0 : Math.min(this.doc.getLine(e).length, t)
        }, this.$clipPositionToDocument = function (e, t) {
            t = Math.max(0, t);
            if (e < 0)e = 0, t = 0; else {
                var n = this.doc.getLength();
                e >= n ? (e = n - 1, t = this.doc.getLine(n - 1).length) : t = Math.min(this.doc.getLine(e).length, t)
            }
            return{row: e, column: t}
        }, this.$clipRangeToDocument = function (e) {
            e.start.row < 0 ? (e.start.row = 0, e.start.column = 0) : e.start.column = this.$clipColumnToRow(e.start.row, e.start.column);
            var t = this.doc.getLength() - 1;
            return e
                .end.row > t ? (e.end.row = t, e.end.column = this.doc.getLine(t).length) : e.end.column = this.$clipColumnToRow(e.end.row, e.end.column), e
        }, this.$wrapLimit = 80, this.$useWrapMode = !1, this.$wrapLimitRange = {min: null, max: null}, this.setUseWrapMode = function (e) {
            if (e != this.$useWrapMode) {
                this.$useWrapMode = e, this.$modified = !0, this.$resetRowCache(0);
                if (e) {
                    var t = this.getLength();
                    this.$wrapData = [];
                    for (var n = 0; n < t; n++)this.$wrapData.push([]);
                    this.$updateWrapData(0, t - 1)
                }
                this._emit("changeWrapMode")
            }
        }, this.getUseWrapMode = function () {
            return this.$useWrapMode
        }, this.setWrapLimitRange = function (e, t) {
            if (this.$wrapLimitRange.min !== e || this.$wrapLimitRange.max !== t)this.$wrapLimitRange.min = e, this.$wrapLimitRange.max = t, this.$modified = !0, this._emit("changeWrapMode")
        }, this.adjustWrapLimit = function (e, t) {
            var n = this.$wrapLimitRange;
            n.max < 0 && (n = {min: t, max: t});
            var r = this.$constrainWrapLimit(e, n.min, n.max);
            return r != this.$wrapLimit && r > 1 ? (this.$wrapLimit = r, this.$modified = !0, this.$useWrapMode && (this.$updateWrapData(0, this.getLength() - 1), this.$resetRowCache(0), this._emit("changeWrapLimit")), !0) : !1
        }, this.$constrainWrapLimit = function (e, t, n) {
            return t && (e = Math.max(t, e)), n && (e = Math.min(n, e)), e
        }, this.getWrapLimit = function () {
            return this.$wrapLimit
        }, this.setWrapLimit = function (e) {
            this.setWrapLimitRange(e, e)
        }, this.getWrapLimitRange = function () {
            return{min: this.$wrapLimitRange.min, max: this.$wrapLimitRange.max}
        }, this.$updateInternalDataOnChange = function (e) {
            var t = this.$useWrapMode, n, r = e.data.action, i = e.data.range.start.row, s = e.data.range.end.row, o = e.data.range.start, u = e.data.range.end, a = null;
            r.indexOf("Lines") != -1 ? (r == "insertLines" ? s = i + e.data.lines.length : s = i, n = e.data.lines ? e.data.lines.length : s - i) : n = s - i, this.$updating = !0;
            if (n != 0)if (r.indexOf("remove") != -1) {
                this[t ? "$wrapData" : "$rowLengthCache"].splice(i, n);
                var f = this.$foldData;
                a = this.getFoldsInRange(e.data.range), this.removeFolds(a);
                var l = this.getFoldLine(u.row), c = 0;
                if (l) {
                    l.addRemoveChars(u.row, u.column, o.column - u.column), l.shiftRow(-n);
                    var h = this.getFoldLine(i);
                    h && h !== l && (h.merge(l), l = h), c = f.indexOf(l) + 1
                }
                for (c; c < f.length; c++) {
                    var l = f[c];
                    l.start.row >= u.row && l.shiftRow(-n)
                }
                s = i
            } else {
                var p;
                if (t) {
                    p = [i, 0];
                    for (var d = 0; d < n; d++)p.push([]);
                    this.$wrapData.splice.apply(this.$wrapData, p)
                } else p = Array(n), p.unshift(i, 0), this.$rowLengthCache.splice.apply(this.$rowLengthCache, p);
                var f = this.$foldData, l = this.getFoldLine(i), c = 0;
                if (l) {
                    var v = l.range.compareInside(o.row, o.column);
                    v == 0 ? (l = l.split(o.row, o.column), l.shiftRow(n), l.addRemoveChars(s, 0, u.column - o.column)) : v == -1 && (l.addRemoveChars(i, 0, u.column - o.column), l.shiftRow(n)), c = f.indexOf(l) + 1
                }
                for (c; c < f.length; c++) {
                    var l = f[c];
                    l.start.row >= i && l.shiftRow(n)
                }
            } else {
                n = Math.abs(e.data.range.start.column - e.data.range.end.column), r.indexOf("remove") != -1 && (a = this.getFoldsInRange(e.data.range), this.removeFolds(a), n = -n);
                var l = this.getFoldLine(i);
                l && l.addRemoveChars(i, o.column, n)
            }
            return t && this.$wrapData.length != this.doc.getLength() && console.error("doc.getLength() and $wrapData.length have to be the same!"), this.$updating = !1, t ? this.$updateWrapData(i, s) : this.$updateRowLengthCache(i, s), a
        }, this.$updateRowLengthCache = function (e, t, n) {
            this.$rowLengthCache[e] = null, this.$rowLengthCache[t] = null
        }, this.$updateWrapData = function (e, t) {
            var n = this.doc.getAllLines(), r = this.getTabSize(), s = this.$wrapData, o = this.$wrapLimit, u, a, f = e;
            t = Math.min(t, n.length - 1);
            while (f <= t) {
                a = this.getFoldLine(f, a);
                if (!a)u = this.$getDisplayTokens(i.stringTrimRight(n[f])), s[f] = this.$computeWrapSplits(u, o, r), f++; else {
                    u = [], a.walk(function (e, t, r, i) {
                        var s;
                        if (e != null) {
                            s = this.$getDisplayTokens(e, u.length), s[0] = l;
                            for (var o = 1; o < s.length; o++)s[o] = p
                        } else s = this.$getDisplayTokens(n[t].substring(i, r), u.length);
                        u = u.concat(s)
                    }.bind(this), a.end.row, n[a.end.row].length + 1);
                    while (u.length != 0 && u[u.length - 1] >= v)u.pop();
                    s[a.start.row] = this.$computeWrapSplits(u, o, r), f = a.end.row + 1
                }
            }
        };
        var n = 1, u = 2, l = 3, p = 4, d = 9, v = 10, m = 11, g = 12;
        this.$computeWrapSplits = function (e, t) {
            function n(t) {
                var n = e.slice(s, t), i = n.length;
                n.join("").replace(/12/g,function () {
                    i -= 1
                }).replace(/2/g, function () {
                    i -= 1
                }), o += i, r.push(o), s = t
            }

            if (e.length == 0)return[];
            var r = [], i = e.length, s = 0, o = 0;
            while (i - s > t) {
                var u = s + t;
                if (e[u] >= v) {
                    while (e[u] >= v)u++;
                    n(u);
                    continue
                }
                if (e[u] == l || e[u] == p) {
                    for (u; u != s - 1; u--)if (e[u] == l)break;
                    if (u > s) {
                        n(u);
                        continue
                    }
                    u = s + t;
                    for (u; u < e.length; u++)if (e[u] != p)break;
                    if (u == e.length)break;
                    n(u);
                    continue
                }
                var a = Math.max(u - 10, s - 1);
                while (u > a && e[u] < l)u--;
                while (u > a && e[u] == d)u--;
                if (u > a) {
                    n(++u);
                    continue
                }
                u = s + t, n(u)
            }
            return r
        }, this.$getDisplayTokens = function (e, r) {
            var i = [], s;
            r = r || 0;
            for (var o = 0; o < e.length; o++) {
                var a = e.charCodeAt(o);
                if (a == 9) {
                    s = this.getScreenTabSize(i.length + r), i.push(m);
                    for (var f = 1; f < s; f++)i.push(g)
                } else a == 32 ? i.push(v) : a > 39 && a < 48 || a > 57 && a < 64 ? i.push(d) : a >= 4352 && t(a) ? i.push(n, u) : i.push(n)
            }
            return i
        }, this.$getStringScreenWidth = function (e, n, r) {
            if (n == 0)return[0, 0];
            n == null && (n = Infinity), r = r || 0;
            var i, s;
            for (s = 0; s < e.length; s++) {
                i = e.charCodeAt(s), i == 9 ? r += this.getScreenTabSize(r) : i >= 4352 && t(i) ? r += 2 : r += 1;
                if (r > n)break
            }
            return[r, s]
        }, this.getRowLength = function (e) {
            return!this.$useWrapMode || !this.$wrapData[e] ? 1 : this.$wrapData[e].length + 1
        }, this.getScreenLastRowColumn = function (e) {
            var t = this.screenToDocumentPosition(e, Number.MAX_VALUE);
            return this.documentToScreenColumn(t.row, t.column)
        }, this.getDocumentLastRowColumn = function (e, t) {
            var n = this.documentToScreenRow(e, t);
            return this.getScreenLastRowColumn(n)
        }, this.getDocumentLastRowColumnPosition = function (e, t) {
            var n = this.documentToScreenRow(e, t);
            return this.screenToDocumentPosition(n, Number.MAX_VALUE / 10)
        }, this.getRowSplitData = function (e) {
            return this.$useWrapMode ? this.$wrapData[e] : undefined
        }, this.getScreenTabSize = function (e) {
            return this.$tabSize - e % this.$tabSize
        }, this.screenToDocumentRow = function (e, t) {
            return this.screenToDocumentPosition(e, t).row
        }, this.screenToDocumentColumn = function (e, t) {
            return this.screenToDocumentPosition(e, t).column
        }, this.screenToDocumentPosition = function (e, t) {
            if (e < 0)return{row: 0, column: 0};
            var n, r = 0, i = 0, s, o = 0, u = 0, a = this.$screenRowCache, f = this.$getRowCacheIndex(a, e), l = a.length;
            if (l && f >= 0)var o = a[f], r = this.$docRowCache[f], c = e > a[l - 1]; else var c = !l;
            var h = this.getLength() - 1, p = this.getNextFoldLine(r), d = p ? p.start.row : Infinity;
            while (o <= e) {
                u = this.getRowLength(r);
                if (o + u - 1 >= e || r >= h)break;
                o += u, r++, r > d && (r = p.end.row + 1, p = this.getNextFoldLine(r, p), d = p ? p.start.row : Infinity), c && (this.$docRowCache.push(r), this.$screenRowCache.push(o))
            }
            if (p && p.start.row <= r)n = this.getFoldDisplayLine(p), r = p.start.row; else {
                if (o + u <= e || r > h)return{row: h, column: this.getLine(h).length};
                n = this.getLine(r), p = null
            }
            if (this.$useWrapMode) {
                var v = this.$wrapData[r];
                v && (s = v[e - o], e > o && v.length && (i = v[e - o - 1] || v[v.length - 1], n = n.substring(i)))
            }
            return i += this.$getStringScreenWidth(n, t)[1], this.$useWrapMode && i >= s && (i = s - 1), p ? p.idxToPosition(i) : {row: r, column: i}
        }, this.documentToScreenPosition = function (e, t) {
            if (typeof t == "undefined")var n = this.$clipPositionToDocument(e.row, e.column); else n = this.$clipPositionToDocument(e, t);
            e = n.row, t = n.column;
            var r = 0, i = null, s = null;
            s = this.getFoldAt(e, t, 1), s && (e = s.start.row, t = s.start.column);
            var o, u = 0, a = this.$docRowCache, f = this.$getRowCacheIndex(a, e), l = a.length;
            if (l && f >= 0)var u = a[f], r = this.$screenRowCache[f], c = e > a[l - 1]; else var c = !l;
            var h = this.getNextFoldLine(u), p = h ? h.start.row : Infinity;
            while (u < e) {
                if (u >= p) {
                    o = h.end.row + 1;
                    if (o > e)break;
                    h = this.getNextFoldLine(o, h), p = h ? h.start.row : Infinity
                } else o = u + 1;
                r += this.getRowLength(u), u = o, c && (this.$docRowCache.push(u), this.$screenRowCache.push(r))
            }
            var d = "";
            h && u >= p ? (d = this.getFoldDisplayLine(h, e, t), i = h.start.row) : (d = this.getLine(e).substring(0, t), i = e);
            if (this.$useWrapMode) {
                var v = this.$wrapData[i], m = 0;
                while (d.length >= v[m])r++, m++;
                d = d.substring(v[m - 1] || 0, d.length)
            }
            return{row: r, column: this.$getStringScreenWidth(d)[0]}
        }, this.documentToScreenColumn = function (e, t) {
            return this.documentToScreenPosition(e, t).column
        }, this.documentToScreenRow = function (e, t) {
            return this.documentToScreenPosition(e, t).row
        }, this.getScreenLength = function () {
            var e = 0, t = null;
            if (!this.$useWrapMode) {
                e = this.getLength();
                var n = this.$foldData;
                for (var r = 0; r < n.length; r++)t = n[r], e -= t.end.row - t.start.row
            } else {
                var i = this.$wrapData.length, s = 0, r = 0, t = this.$foldData[r++], o = t ? t.start.row : Infinity;
                while (s < i)e += this.$wrapData[s].length + 1, s++, s > o && (s = t.end.row + 1, t = this.$foldData[r++], o = t ? t.start.row : Infinity)
            }
            return e
        }
    }).call(p.prototype), e("./edit_session/folding").Folding.call(p.prototype), e("./edit_session/bracket_match").BracketMatch.call(p.prototype), s.defineOptions(p.prototype, "session", {wrap: {set: function (e) {
        !e || e == "off" ? e = !1 : e == "free" ? e = !0 : e == "printMargin" ? e = -1 : typeof e == "string" && (e = parseInt(e, 10) || !1);
        if (this.$wrap == e)return;
        if (!e)this.setUseWrapMode(!1); else {
            var t = typeof e == "number" ? e : null;
            this.setWrapLimitRange(t, t), this.setUseWrapMode(!0)
        }
        this.$wrap = e
    }, get: function () {
        return this.getUseWrapMode() ? this.getWrapLimitRange().min || "free" : "off"
    }, handlesSet: !0}, firstLineNumber: {set: function () {
        this._emit("changeBreakpoint")
    }, initialValue: 1}, useWorker: {set: function (e) {
        this.$useWorker = e, this.$stopWorker(), e && this.$startWorker()
    }, initialValue: !0}, useSoftTabs: {initialValue: !0}, tabSize: {set: function (e) {
        if (isNaN(e) || this.$tabSize === e)return;
        this.$modified = !0, this.$rowLengthCache = [], this.$tabSize = e, this._emit("changeTabSize")
    }, initialValue: 4, handlesSet: !0}, overwrite: {set: function (e) {
        this._emit("changeOverwrite")
    }, initialValue: !1}, newLineMode: {set: function (e) {
        this.doc.setNewLineMode(e)
    }, get: function () {
        return this.doc.getNewLineMode()
    }, handlesSet: !0}}), t.EditSession = p
}), define("ace/selection", ["require", "exports", "module", "ace/lib/oop", "ace/lib/lang", "ace/lib/event_emitter", "ace/range"], function (e, t, n) {
    var r = e("./lib/oop"), i = e("./lib/lang"), s = e("./lib/event_emitter").EventEmitter, o = e("./range").Range, u = function (e) {
        this.session = e, this.doc = e.getDocument(), this.clearSelection(), this.lead = this.selectionLead = this.doc.createAnchor(0, 0), this.anchor = this.selectionAnchor = this.doc.createAnchor(0, 0);
        var t = this;
        this.lead.on("change", function (e) {
            t._emit("changeCursor"), t.$isEmpty || t._emit("changeSelection"), !t.$keepDesiredColumnOnChange && e.old.column != e.value.column && (t.$desiredColumn = null)
        }), this.selectionAnchor.on("change", function () {
            t.$isEmpty || t._emit("changeSelection")
        })
    };
    (function () {
        r.implement(this, s), this.isEmpty = function () {
            return this.$isEmpty || this.anchor.row == this.lead.row && this.anchor.column == this.lead.column
        }, this.isMultiLine = function () {
            return this.isEmpty() ? !1 : this.getRange().isMultiLine()
        }, this.getCursor = function () {
            return this.lead.getPosition()
        }, this.setSelectionAnchor = function (e, t) {
            this.anchor.setPosition(e, t), this.$isEmpty && (this.$isEmpty = !1, this._emit("changeSelection"))
        }, this.getSelectionAnchor = function () {
            return this.$isEmpty ? this.getSelectionLead() : this.anchor.getPosition()
        }, this.getSelectionLead = function () {
            return this.lead.getPosition()
        }, this.shiftSelection = function (e) {
            if (this.$isEmpty) {
                this.moveCursorTo(this.lead.row, this.lead.column + e);
                return
            }
            var t = this.getSelectionAnchor(), n = this.getSelectionLead(), r = this.isBackwards();
            (!r || t.column !== 0) && this.setSelectionAnchor(t.row, t.column + e), (r || n.column !== 0) && this.$moveSelection(function () {
                this.moveCursorTo(n.row, n.column + e)
            })
        }, this.isBackwards = function () {
            var e = this.anchor, t = this.lead;
            return e.row > t.row || e.row == t.row && e.column > t.column
        }, this.getRange = function () {
            var e = this.anchor, t = this.lead;
            return this.isEmpty() ? o.fromPoints(t, t) : this.isBackwards() ? o.fromPoints(t, e) : o.fromPoints(e, t)
        }, this.clearSelection = function () {
            this.$isEmpty || (this.$isEmpty = !0, this._emit("changeSelection"))
        }, this.selectAll = function () {
            var e = this.doc.getLength() - 1;
            this.setSelectionAnchor(0, 0), this.moveCursorTo(e, this.doc.getLine(e).length)
        }, this.setRange = this.setSelectionRange = function (e, t) {
            t ? (this.setSelectionAnchor(e.end.row, e.end.column), this.selectTo(e.start.row, e.start.column)) : (this.setSelectionAnchor(e.start.row, e.start.column), this.selectTo(e.end.row, e.end.column)), this.$desiredColumn = null
        }, this.$moveSelection = function (e) {
            var t = this.lead;
            this.$isEmpty && this.setSelectionAnchor(t.row, t.column), e.call(this)
        }, this.selectTo = function (e, t) {
            this.$moveSelection(function () {
                this.moveCursorTo(e, t)
            })
        }, this.selectToPosition = function (e) {
            this.$moveSelection(function () {
                this.moveCursorToPosition(e)
            })
        }, this.selectUp = function () {
            this.$moveSelection(this.moveCursorUp)
        }, this.selectDown = function () {
            this.$moveSelection(this.moveCursorDown)
        }, this.selectRight = function () {
            this.$moveSelection(this.moveCursorRight)
        }, this.selectLeft = function () {
            this.$moveSelection(this.moveCursorLeft)
        }, this.selectLineStart = function () {
            this.$moveSelection(this.moveCursorLineStart)
        }, this.selectLineEnd = function () {
            this.$moveSelection(this.moveCursorLineEnd)
        }, this.selectFileEnd = function () {
            this.$moveSelection(this.moveCursorFileEnd)
        }, this.selectFileStart = function () {
            this.$moveSelection(this.moveCursorFileStart)
        }, this.selectWordRight = function () {
            this.$moveSelection(this.moveCursorWordRight)
        }, this.selectWordLeft = function () {
            this.$moveSelection(this.moveCursorWordLeft)
        }, this.getWordRange = function (e, t) {
            if (typeof t == "undefined") {
                var n = e || this.lead;
                e = n.row, t = n.column
            }
            return this.session.getWordRange(e, t)
        }, this.selectWord = function () {
            this.setSelectionRange(this.getWordRange())
        }, this.selectAWord = function () {
            var e = this.getCursor(), t = this.session.getAWordRange(e.row, e.column);
            this.setSelectionRange(t)
        }, this.getLineRange = function (e, t) {
            var n = typeof e == "number" ? e : this.lead.row, r, i = this.session.getFoldLine(n);
            return i ? (n = i.start.row, r = i.end.row) : r = n, t ? new o(n, 0, r, this.session.getLine(r).length) : new o(n, 0, r + 1, 0)
        }, this.selectLine = function () {
            this.setSelectionRange(this.getLineRange())
        }, this.moveCursorUp = function () {
            this.moveCursorBy(-1, 0)
        }, this.moveCursorDown = function () {
            this.moveCursorBy(1, 0)
        }, this.moveCursorLeft = function () {
            var e = this.lead.getPosition(), t;
            if (t = this.session.getFoldAt(e.row, e.column, -1))this.moveCursorTo(t.start.row, t.start.column); else if (e.column == 0)e.row > 0 && this.moveCursorTo(e.row - 1, this.doc.getLine(e.row - 1).length); else {
                var n = this.session.getTabSize();
                this.session.isTabStop(e) && this.doc.getLine(e.row).slice(e.column - n, e.column).split(" ").length - 1 == n ? this.moveCursorBy(0, -n) : this.moveCursorBy(0, -1)
            }
        }, this.moveCursorRight = function () {
            var e = this.lead.getPosition(), t;
            if (t = this.session.getFoldAt(e.row, e.column, 1))this.moveCursorTo(t.end.row, t.end.column); else if (this.lead.column == this.doc.getLine(this.lead.row).length)this.lead.row < this.doc.getLength() - 1 && this.moveCursorTo(this.lead.row + 1, 0); else {
                var n = this.session.getTabSize(), e = this.lead;
                this.session.isTabStop(e) && this.doc.getLine(e.row).slice(e.column, e.column + n).split(" ").length - 1 == n ? this.moveCursorBy(0, n) : this.moveCursorBy(0, 1)
            }
        }, this.moveCursorLineStart = function () {
            var e = this.lead.row, t = this.lead.column, n = this.session.documentToScreenRow(e, t), r = this.session.screenToDocumentPosition(n, 0), i = this.session.getDisplayLine(e, null, r.row, r.column), s = i.match(/^\s*/);
            s[0].length != t && !this.session.$useEmacsStyleLineStart && (r.column += s[0].length), this.moveCursorToPosition(r)
        }, this.moveCursorLineEnd = function () {
            var e = this.lead, t = this.session.getDocumentLastRowColumnPosition(e.row, e.column);
            if (this.lead.column == t.column) {
                var n = this.session.getLine(t.row);
                if (t.column == n.length) {
                    var r = n.search(/\s+$/);
                    r > 0 && (t.column = r)
                }
            }
            this.moveCursorTo(t.row, t.column)
        }, this.moveCursorFileEnd = function () {
            var e = this.doc.getLength() - 1, t = this.doc.getLine(e).length;
            this.moveCursorTo(e, t)
        }, this.moveCursorFileStart = function () {
            this.moveCursorTo(0, 0)
        }, this.moveCursorLongWordRight = function () {
            var e = this.lead.row, t = this.lead.column, n = this.doc.getLine(e), r = n.substring(t), i;
            this.session.nonTokenRe.lastIndex = 0, this.session.tokenRe.lastIndex = 0;
            var s = this.session.getFoldAt(e, t, 1);
            if (s) {
                this.moveCursorTo(s.end.row, s.end.column);
                return
            }
            if (i = this.session.nonTokenRe.exec(r))t += this.session.nonTokenRe.lastIndex, this.session.nonTokenRe.lastIndex = 0, r = n.substring(t);
            if (t >= n.length) {
                this.moveCursorTo(e, n.length), this.moveCursorRight(), e < this.doc.getLength() - 1 && this.moveCursorWordRight();
                return
            }
            if (i = this.session.tokenRe.exec(r))t += this.session.tokenRe.lastIndex, this.session.tokenRe.lastIndex = 0;
            this.moveCursorTo(e, t)
        }, this.moveCursorLongWordLeft = function () {
            var e = this.lead.row, t = this.lead.column, n;
            if (n = this.session.getFoldAt(e, t, -1)) {
                this.moveCursorTo(n.start.row, n.start.column);
                return
            }
            var r = this.session.getFoldStringAt(e, t, -1);
            r == null && (r = this.doc.getLine(e).substring(0, t));
            var s = i.stringReverse(r), o;
            this.session.nonTokenRe.lastIndex = 0, this.session.tokenRe.lastIndex = 0;
            if (o = this.session.nonTokenRe.exec(s))t -= this.session.nonTokenRe.lastIndex, s = s.slice(this.session.nonTokenRe.lastIndex), this.session.nonTokenRe.lastIndex = 0;
            if (t <= 0) {
                this.moveCursorTo(e, 0), this.moveCursorLeft(), e > 0 && this.moveCursorWordLeft();
                return
            }
            if (o = this.session.tokenRe.exec(s))t -= this.session.tokenRe.lastIndex, this.session.tokenRe.lastIndex = 0;
            this.moveCursorTo(e, t)
        }, this.$shortWordEndIndex = function (e) {
            var t, n = 0, r, i = /\s/, s = this.session.tokenRe;
            s.lastIndex = 0;
            if (t = this.session.tokenRe.exec(e))n = this.session.tokenRe.lastIndex; else {
                while ((r = e[n]) && i.test(r))n++;
                if (n <= 1) {
                    s.lastIndex = 0;
                    while ((r = e[n]) && !s.test(r)) {
                        s.lastIndex = 0, n++;
                        if (i.test(r)) {
                            if (n > 2) {
                                n--;
                                break
                            }
                            while ((r = e[n]) && i.test(r))n++;
                            if (n > 2)break
                        }
                    }
                }
            }
            return s.lastIndex = 0, n
        }, this.moveCursorShortWordRight = function () {
            var e = this.lead.row, t = this.lead.column, n = this.doc.getLine(e), r = n.substring(t), i = this.session.getFoldAt(e, t, 1);
            if (i)return this.moveCursorTo(i.end.row, i.end.column);
            if (t == n.length) {
                var s = this.doc.getLength();
                do e++, r = this.doc.getLine(e); while (e < s && /^\s*$/.test(r));
                /^\s+/.test(r) || (r = ""), t = 0
            }
            var o = this.$shortWordEndIndex(r);
            this.moveCursorTo(e, t + o)
        }, this.moveCursorShortWordLeft = function () {
            var e = this.lead.row, t = this.lead.column, n;
            if (n = this.session.getFoldAt(e, t, -1))return this.moveCursorTo(n.start.row, n.start.column);
            var r = this.session.getLine(e).substring(0, t);
            if (t == 0) {
                do e--, r = this.doc.getLine(e); while (e > 0 && /^\s*$/.test(r));
                t = r.length, /\s+$/.test(r) || (r = "")
            }
            var s = i.stringReverse(r), o = this.$shortWordEndIndex(s);
            return this.moveCursorTo(e, t - o)
        }, this.moveCursorWordRight = function () {
            this.session.$selectLongWords ? this.moveCursorLongWordRight() : this.moveCursorShortWordRight()
        }, this.moveCursorWordLeft = function () {
            this.session.$selectLongWords ? this.moveCursorLongWordLeft() : this.moveCursorShortWordLeft()
        }, this.moveCursorBy = function (e, t) {
            var n = this.session.documentToScreenPosition(this.lead.row, this.lead.column);
            t === 0 && (this.$desiredColumn ? n.column = this.$desiredColumn : this.$desiredColumn = n.column);
            var r = this.session.screenToDocumentPosition(n.row + e, n.column);
            this.moveCursorTo(r.row, r.column + t, t === 0)
        }, this.moveCursorToPosition = function (e) {
            this.moveCursorTo(e.row, e.column)
        }, this.moveCursorTo = function (e, t, n) {
            var r = this.session.getFoldAt(e, t, 1);
            r && (e = r.start.row, t = r.start.column), this.$keepDesiredColumnOnChange = !0, this.lead.setPosition(e, t), this.$keepDesiredColumnOnChange = !1, n || (this.$desiredColumn = null)
        }, this.moveCursorToScreen = function (e, t, n) {
            var r = this.session.screenToDocumentPosition(e, t);
            this.moveCursorTo(r.row, r.column, n)
        }, this.detach = function () {
            this.lead.detach(), this.anchor.detach(), this.session = this.doc = null
        }, this.fromOrientedRange = function (e) {
            this.setSelectionRange(e, e.cursor == e.start), this.$desiredColumn = e.desiredColumn || this.$desiredColumn
        }, this.toOrientedRange = function (e) {
            var t = this.getRange();
            return e ? (e.start.column = t.start.column, e.start.row = t.start.row, e.end.column = t.end.column, e.end.row = t.end.row) : e = t, e.cursor = this.isBackwards() ? e.start : e.end, e.desiredColumn = this.$desiredColumn, e
        }
    }).call(u.prototype), t.Selection = u
}), define("ace/range", ["require", "exports", "module"], function (e, t, n) {
    var r = function (e, t) {
        return e.row - t.row || e.column - t.column
    }, i = function (e, t, n, r) {
        this.start = {row: e, column: t}, this.end = {row: n, column: r}
    };
    (function () {
        this.isEqual = function (e) {
            return this.start.row === e.start.row && this.end.row === e.end.row && this.start.column === e.start.column && this.end.column === e.end.column
        }, this.toString = function () {
            return"Range: [" + this.start.row + "/" + this.start.column + "] -> [" + this.end.row + "/" + this.end.column + "]"
        }, this.contains = function (e, t) {
            return this.compare(e, t) == 0
        }, this.compareRange = function (e) {
            var t, n = e.end, r = e.start;
            return t = this.compare(n.row, n.column), t == 1 ? (t = this.compare(r.row, r.column), t == 1 ? 2 : t == 0 ? 1 : 0) : t == -1 ? -2 : (t = this.compare(r.row, r.column), t == -1 ? -1 : t == 1 ? 42 : 0)
        }, this.comparePoint = function (e) {
            return this.compare(e.row, e.column)
        }, this.containsRange = function (e) {
            return this.comparePoint(e.start) == 0 && this.comparePoint(e.end) == 0
        }, this.intersects = function (e) {
            var t = this.compareRange(e);
            return t == -1 || t == 0 || t == 1
        }, this.isEnd = function (e, t) {
            return this.end.row == e && this.end.column == t
        }, this.isStart = function (e, t) {
            return this.start.row == e && this.start.column == t
        }, this.setStart = function (e, t) {
            typeof e == "object" ? (this.start.column = e.column, this.start.row = e.row) : (this.start.row = e, this.start.column = t)
        }, this.setEnd = function (e, t) {
            typeof e == "object" ? (this.end.column = e.column, this.end.row = e.row) : (this.end.row = e, this.end.column = t)
        }, this.inside = function (e, t) {
            return this.compare(e, t) == 0 ? this.isEnd(e, t) || this.isStart(e, t) ? !1 : !0 : !1
        }, this.insideStart = function (e, t) {
            return this.compare(e, t) == 0 ? this.isEnd(e, t) ? !1 : !0 : !1
        }, this.insideEnd = function (e, t) {
            return this.compare(e, t) == 0 ? this.isStart(e, t) ? !1 : !0 : !1
        }, this.compare = function (e, t) {
            return!this.isMultiLine() && e === this.start.row ? t < this.start.column ? -1 : t > this.end.column ? 1 : 0 : e < this.start.row ? -1 : e > this.end.row ? 1 : this.start.row === e ? t >= this.start.column ? 0 : -1 : this.end.row === e ? t <= this.end.column ? 0 : 1 : 0
        }, this.compareStart = function (e, t) {
            return this.start.row == e && this.start.column == t ? -1 : this.compare(e, t)
        }, this.compareEnd = function (e, t) {
            return this.end.row == e && this.end.column == t ? 1 : this.compare(e, t)
        }, this.compareInside = function (e, t) {
            return this.end.row == e && this.end.column == t ? 1 : this.start.row == e && this.start.column == t ? -1 : this.compare(e, t)
        }, this.clipRows = function (e, t) {
            if (this.end.row > t)var n = {row: t + 1, column: 0}; else if (this.end.row < e)var n = {row: e, column: 0};
            if (this.start.row > t)var r = {row: t + 1, column: 0}; else if (this.start.row < e)var r = {row: e, column: 0};
            return i.fromPoints(r || this.start, n || this.end)
        }, this.extend = function (e, t) {
            var n = this.compare(e, t);
            if (n == 0)return this;
            if (n == -1)var r = {row: e, column: t}; else var s = {row: e, column: t};
            return i.fromPoints(r || this.start, s || this.end)
        }, this.isEmpty = function () {
            return this.start.row === this.end.row && this.start.column === this.end.column
        }, this.isMultiLine = function () {
            return this.start.row !== this.end.row
        }, this.clone = function () {
            return i.fromPoints(this.start, this.end)
        }, this.collapseRows = function () {
            return this.end.column == 0 ? new i(this.start.row, 0, Math.max(this.start.row, this.end.row - 1), 0) : new i(this.start.row, 0, this.end.row, 0)
        }, this.toScreenRange = function (e) {
            var t = e.documentToScreenPosition(this.start), n = e.documentToScreenPosition(this.end);
            return new i(t.row, t.column, n.row, n.column)
        }, this.moveBy = function (e, t) {
            this.start.row += e, this.start.column += t, this.end.row += e, this.end.column += t
        }
    }).call(i.prototype), i.fromPoints = function (e, t) {
        return new i(e.row, e.column, t.row, t.column)
    }, i.comparePoints = r, i.comparePoints = function (e, t) {
        return e.row - t.row || e.column - t.column
    }, t.Range = i
}), define("ace/mode/text", ["require", "exports", "module", "ace/tokenizer", "ace/mode/text_highlight_rules", "ace/mode/behaviour", "ace/unicode", "ace/lib/lang", "ace/token_iterator", "ace/range"], function (e, t, n) {
    var r = e("../tokenizer").Tokenizer, i = e("./text_highlight_rules").TextHighlightRules, s = e("./behaviour").Behaviour, o = e("../unicode"), u = e("../lib/lang"), a = e("../token_iterator").TokenIterator, f = e("../range").Range, l = function () {
        this.$tokenizer = new r((new i).getRules()), this.$behaviour = new s
    };
    (function () {
        this.tokenRe = new RegExp("^[" + o.packages.L + o.packages.Mn + o.packages.Mc + o.packages.Nd + o.packages.Pc + "\\$_]+", "g"), this.nonTokenRe = new RegExp("^(?:[^" + o.packages.L + o.packages.Mn + o.packages.Mc + o.packages.Nd + o.packages.Pc + "\\$_]|s])+", "g"), this.getTokenizer = function () {
            return this.$tokenizer
        }, this.lineCommentStart = "", this.blockComment = "", this.toggleCommentLines = function (e, t, n, r) {
            function i(e) {
                for (var t = n; t <= r; t++)e(s.getLine(t), t)
            }

            var s = t.doc, o = !0, a = !0, f = Infinity;
            if (!this.lineCommentStart) {
                if (!this.blockComment)return!1;
                var l = this.blockComment.start, c = this.blockComment.end, h = new RegExp("^(\\s*)(?:" + u.escapeRegExp(l) + ")"), p = new RegExp("(?:" + u.escapeRegExp(c) + ")\\s*$"), d = function (e, t) {
                    if (m(e, t))return;
                    if (!o || /\S/.test(e))s.insertInLine({row: t, column: e.length}, c), s.insertInLine({row: t, column: f}, l)
                }, v = function (e, t) {
                    var n;
                    (n = e.match(p)) && s.removeInLine(t, e.length - n[0].length, e.length), (n = e.match(h)) && s.removeInLine(t, n[1].length, n[0].length)
                }, m = function (e, n) {
                    if (h.test(e))return!0;
                    var r = t.getTokens(n);
                    for (var i = 0; i < r.length; i++)if (r[i].type === "comment")return!0
                }
            } else {
                if (Array.isArray(this.lineCommentStart))var h = this.lineCommentStart.map(u.escapeRegExp).join("|"), l = this.lineCommentStart[0] + " "; else var h = u.escapeRegExp(this.lineCommentStart), l = this.lineCommentStart + " ";
                h = new RegExp("^(\\s*)(?:" + h + ") ?");
                var v = function (e, t) {
                    var n = e.match(h);
                    n && s.removeInLine(t, n[1].length, n[0].length)
                }, d = function (e, t) {
                    (!o || /\S/.test(e)) && s.insertInLine({row: t, column: f}, l)
                }, m = function (e, t) {
                    return h.test(e)
                }
            }
            var g = Infinity;
            i(function (e, t) {
                var n = e.search(/\S/);
                n !== -1 ? (n < f && (f = n), a && !m(e, t) && (a = !1)) : g > e.length && (g = e.length)
            }), f == Infinity && (f = g, o = !1, a = !1), i(a ? v : d)
        }, this.toggleBlockComment = function (e, t, n, r) {
            var i = this.blockComment;
            if (!i)return;
            !i.start && i[0] && (i = i[0]);
            var s = new a(t, r.row, r.column), o = s.getCurrentToken(), u = t.selection, l = t.selection.toOrientedRange(), c, h;
            if (o && /comment/.test(o.type)) {
                var p, d;
                while (o && /comment/.test(o.type)) {
                    var v = o.value.indexOf(i.start);
                    if (v != -1) {
                        var m = s.getCurrentTokenRow(), g = s.getCurrentTokenColumn() + v;
                        p = new f(m, g, m, g + i.start.length);
                        break
                    }
                    o = s.stepBackward()
                }
                var s = new a(t, r.row, r.column), o = s.getCurrentToken();
                while (o && /comment/.test(o.type)) {
                    var v = o.value.indexOf(i.end);
                    if (v != -1) {
                        var m = s.getCurrentTokenRow(), g = s.getCurrentTokenColumn() + v;
                        d = new f(m, g, m, g + i.end.length);
                        break
                    }
                    o = s.stepForward()
                }
                d && t.remove(d), p && (t.remove(p), c = p.start.row, h = -i.start.length)
            } else h = i.start.length, c = n.start.row, t.insert(n.end, i.end), t.insert(n.start, i.start);
            l.start.row == c && (l.start.column += h), l.end.row == c && (l.end.column += h), t.selection.fromOrientedRange(l)
        }, this.getNextLineIndent = function (e, t, n) {
            return this.$getIndent(t)
        }, this.checkOutdent = function (e, t, n) {
            return!1
        }, this.autoOutdent = function (e, t, n) {
        }, this.$getIndent = function (e) {
            return e.match(/^\s*/)[0]
        }, this.createWorker = function (e) {
            return null
        }, this.createModeDelegates = function (e) {
            if (!this.$embeds)return;
            this.$modes = {};
            for (var t = 0; t < this.$embeds.length; t++)e[this.$embeds[t]] && (this.$modes[this.$embeds[t]] = new e[this.$embeds[t]]);
            var n = ["toggleCommentLines", "getNextLineIndent", "checkOutdent", "autoOutdent", "transformAction"];
            for (var t = 0; t < n.length; t++)(function (e) {
                var r = n[t], i = e[r];
                e[n[t]] = function () {
                    return this.$delegator(r, arguments, i)
                }
            })(this)
        }, this.$delegator = function (e, t, n) {
            var r = t[0];
            for (var i = 0; i < this.$embeds.length; i++) {
                if (!this.$modes[this.$embeds[i]])continue;
                var s = r.split(this.$embeds[i]);
                if (!s[0] && s[1]) {
                    t[0] = s[1];
                    var o = this.$modes[this.$embeds[i]];
                    return o[e].apply(o, t)
                }
            }
            var u = n.apply(this, t);
            return n ? u : undefined
        }, this.transformAction = function (e, t, n, r, i) {
            if (this.$behaviour) {
                var s = this.$behaviour.getBehaviours();
                for (var o in s)if (s[o][t]) {
                    var u = s[o][t].apply(this, arguments);
                    if (u)return u
                }
            }
        }
    }).call(l.prototype), t.Mode = l
}), define("ace/tokenizer", ["require", "exports", "module"], function (e, t, n) {
    var r = 1e3, i = function (e) {
        this.states = e, this.regExps = {}, this.matchMappings = {};
        for (var t in this.states) {
            var n = this.states[t], r = [], i = 0, s = this.matchMappings[t] = {defaultToken: "text"}, o = "g";
            for (var u = 0; u < n.length; u++) {
                var a = n[u];
                a.defaultToken && (s.defaultToken = a.defaultToken), a.caseInsensitive && (o = "gi");
                if (a.regex == null)continue;
                a.regex instanceof RegExp && (a.regex = a.regex.toString().slice(1, -1));
                var f = a.regex, l = (new RegExp("(?:(" + f + ")|(.))")).exec("a").length - 2;
                if (Array.isArray(a.token))if (a.token.length == 1 || l == 1)a.token = a.token[0]; else {
                    if (l - 1 != a.token.length)throw new Error("number of classes and regexp groups in '" + a.token + "'\n'" + a.regex + "' doesn't match\n" + (l - 1) + "!=" + a.token.length);
                    a.tokenArray = a.token, a.onMatch = this.$arrayTokens
                } else typeof a.token == "function" && !a.onMatch && (l > 1 ? a.onMatch = this.$applyToken : a.onMatch = a.token);
                l > 1 && (/\\\d/.test(a.regex) ? f = a.regex.replace(/\\([0-9]+)/g, function (e, t) {
                    return"\\" + (parseInt(t, 10) + i + 1)
                }) : (l = 1, f = this.removeCapturingGroups(a.regex)), !a.splitRegex && typeof a.token != "string" && (a.splitRegex = this.createSplitterRegexp(a.regex, o))), s[i] = u, i += l, r.push(f), a.onMatch || (a.onMatch = null), a.__proto__ = null
            }
            this.regExps[t] = new RegExp("(" + r.join(")|(") + ")|($)", o)
        }
    };
    (function () {
        this.$applyToken = function (e) {
            var t = this.splitRegex.exec(e).slice(1), n = this.token.apply(this, t);
            if (typeof n == "string")return[
                {type: n, value: e}
            ];
            var r = [];
            for (var i = 0, s = n.length; i < s; i++)t[i] && (r[r.length] = {type: n[i], value: t[i]});
            return r
        }, this.$arrayTokens = function (e) {
            if (!e)return[];
            var t = this.splitRegex.exec(e), n = [], r = this.tokenArray;
            for (var i = 0, s = r.length; i < s; i++)t[i + 1] && (n[n.length] = {type: r[i], value: t[i + 1]});
            return n
        }, this.removeCapturingGroups = function (e) {
            var t = e.replace(/\[(?:\\.|[^\]])*?\]|\\.|\(\?[:=!]|(\()/g, function (e, t) {
                return t ? "(?:" : e
            });
            return t
        }, this.createSplitterRegexp = function (e, t) {
            if (e.indexOf("(?=") != -1) {
                var n = 0, r = !1, i = {};
                e.replace(/(\\.)|(\((?:\?[=!])?)|(\))|([\[\]])/g, function (e, t, s, o, u, a) {
                    return r ? r = u != "]" : u ? r = !0 : o ? (n == i.stack && (i.end = a + 1, i.stack = -1), n--) : s && (n++, s.length != 1 && (i.stack = n, i.start = a)), e
                }), i.end != null && /^\)*$/.test(e.substr(i.end)) && (e = e.substring(0, i.start) + e.substr(i.end))
            }
            return new RegExp(e, (t || "").replace("g", ""))
        }, this.getLineTokens = function (e, t) {
            if (t && typeof t != "string") {
                var n = t.slice(0);
                t = n[0]
            } else var n = [];
            var i = t || "start", s = this.states[i], o = this.matchMappings[i], u = this.regExps[i];
            u.lastIndex = 0;
            var a, f = [], l = 0, c = {type: null, value: ""};
            while (a = u.exec(e)) {
                var h = o.defaultToken, p = null, d = a[0], v = u.lastIndex;
                if (v - d.length > l) {
                    var m = e.substring(l, v - d.length);
                    c.type == h ? c.value += m : (c.type && f.push(c), c = {type: h, value: m})
                }
                for (var g = 0; g < a.length - 2; g++) {
                    if (a[g + 1] === undefined)continue;
                    p = s[o[g]], p.onMatch ? h = p.onMatch(d, i, n) : h = p.token, p.next && (typeof p.next == "string" ? i = p.next : i = p.next(i, n), s = this.states[i], s || (window.console && console.error && console.error(i, "doesn't exist"), i = "start", s = this.states[i]), o = this.matchMappings[i], l = v, u = this.regExps[i], u.lastIndex = v);
                    break
                }
                if (d)if (typeof h == "string")!!p && p.merge === !1 || c.type !== h ? (c.type && f.push(c), c = {type: h, value: d}) : c.value += d; else if (h) {
                    c.type && f.push(c), c = {type: null, value: ""};
                    for (var g = 0; g < h.length; g++)f.push(h[g])
                }
                if (l == e.length)break;
                l = v;
                if (f.length > r) {
                    c.value += e.substr(l), i = "start";
                    break
                }
            }
            return c.type && f.push(c), {tokens: f, state: n.length ? n : i}
        }
    }).call(i.prototype), t.Tokenizer = i
}), define("ace/mode/text_highlight_rules", ["require", "exports", "module", "ace/lib/lang"], function (e, t, n) {
    var r = e("../lib/lang"), i = function () {
        this.$rules = {start: [
            {token: "empty_line", regex: "^$"},
            {defaultToken: "text"}
        ]}
    };
    (function () {
        this.addRules = function (e, t) {
            for (var n in e) {
                var r = e[n];
                for (var i = 0; i < r.length; i++) {
                    var s = r[i];
                    s.next && (s.next = t + s.next)
                }
                this.$rules[t + n] = r
            }
        }, this.getRules = function () {
            return this.$rules
        }, this.embedRules = function (e, t, n, i, s) {
            var o = (new e).getRules();
            if (i)for (var u = 0; u < i.length; u++)i[u] = t + i[u]; else {
                i = [];
                for (var a in o)i.push(t + a)
            }
            this.addRules(o, t);
            if (n) {
                var f = Array.prototype[s ? "push" : "unshift"];
                for (var u = 0; u < i.length; u++)f.apply(this.$rules[i[u]], r.deepCopy(n))
            }
            this.$embeds || (this.$embeds = []), this.$embeds.push(t)
        }, this.getEmbeds = function () {
            return this.$embeds
        };
        var e = function (e, t) {
            return e != "start" && t.unshift(this.nextState, e), this.nextState
        }, t = function (e, t) {
            return t[0] !== e ? "start" : (t.shift(), t.shift())
        };
        this.normalizeRules = function () {
            function n(s) {
                var o = i[s];
                o.processed = !0;
                for (var u = 0; u < o.length; u++) {
                    var a = o[u];
                    !a.regex && a.start && (a.regex = a.start, a.next || (a.next = []), a.next.push({defaultToken: a.token}, {token: a.token + ".end", regex: a.end || a.start, next: "pop"}), a.token = a.token + ".start", a.push = !0);
                    var f = a.next || a.push;
                    if (f && Array.isArray(f)) {
                        var l = a.stateName || a.token + r++;
                        i[l] = f, a.next = l, n(l)
                    } else f == "pop" && (a.next = t);
                    a.push && (a.nextState = a.next || a.push, a.next = e, delete a.push);
                    if (a.rules)for (var c in a.rules)i[c] ? i[c].push && i[c].push.apply(i[c], a.rules[c]) : i[c] = a.rules[c];
                    if (a.include || typeof a == "string")var h = a.include || a, p = i[h]; else Array.isArray(a) && (p = a);
                    if (p) {
                        var d = [u, 1].concat(p);
                        a.noEscape && (d = d.filter(function (e) {
                            return!e.next
                        })), o.splice.apply(o, d), u--, p = null
                    }
                }
            }

            var r = 0, i = this.$rules;
            Object.keys(i).forEach(n)
        }, this.createKeywordMapper = function (e, t, n, r) {
            var i = Object.create(null);
            return Object.keys(e).forEach(function (t) {
                var s = e[t];
                n && (s = s.toLowerCase());
                var o = s.split(r || "|");
                for (var u = o.length; u--;)i[o[u]] = t
            }), e = null, n ? function (e) {
                return i[e.toLowerCase()] || t
            } : function (e) {
                return i[e] || t
            }
        }, this.getKeywords = function () {
            return this.$keywords
        }
    }).call(i.prototype), t.TextHighlightRules = i
}), define("ace/mode/behaviour", ["require", "exports", "module"], function (e, t, n) {
    var r = function () {
        this.$behaviours = {}
    };
    (function () {
        this.add = function (e, t, n) {
            switch (undefined) {
                case this.$behaviours:
                    this.$behaviours = {};
                case this.$behaviours[e]:
                    this.$behaviours[e] =
                    {}
            }
            this.$behaviours[e][t] = n
        }, this.addBehaviours = function (e) {
            for (var t in e)for (var n in e[t])this.add(t, n, e[t][n])
        }, this.remove = function (e) {
            this.$behaviours && this.$behaviours[e] && delete this.$behaviours[e]
        }, this.inherit = function (e, t) {
            if (typeof e == "function")var n = (new e).getBehaviours(t); else var n = e.getBehaviours(t);
            this.addBehaviours(n)
        }, this.getBehaviours = function (e) {
            if (!e)return this.$behaviours;
            var t = {};
            for (var n = 0; n < e.length; n++)this.$behaviours[e[n]] && (t[e[n]] = this.$behaviours[e[n]]);
            return t
        }
    }).call(r.prototype), t.Behaviour = r
}), define("ace/unicode", ["require", "exports", "module"], function (e, t, n) {
    function r(e) {
        var n = /\w{4}/g;
        for (var r in e)t.packages[r] = e[r].replace(n, "\\u$&")
    }

    t.packages = {}, r({L: "0041-005A0061-007A00AA00B500BA00C0-00D600D8-00F600F8-02C102C6-02D102E0-02E402EC02EE0370-037403760377037A-037D03860388-038A038C038E-03A103A3-03F503F7-0481048A-05250531-055605590561-058705D0-05EA05F0-05F20621-064A066E066F0671-06D306D506E506E606EE06EF06FA-06FC06FF07100712-072F074D-07A507B107CA-07EA07F407F507FA0800-0815081A082408280904-0939093D09500958-0961097109720979-097F0985-098C098F09900993-09A809AA-09B009B209B6-09B909BD09CE09DC09DD09DF-09E109F009F10A05-0A0A0A0F0A100A13-0A280A2A-0A300A320A330A350A360A380A390A59-0A5C0A5E0A72-0A740A85-0A8D0A8F-0A910A93-0AA80AAA-0AB00AB20AB30AB5-0AB90ABD0AD00AE00AE10B05-0B0C0B0F0B100B13-0B280B2A-0B300B320B330B35-0B390B3D0B5C0B5D0B5F-0B610B710B830B85-0B8A0B8E-0B900B92-0B950B990B9A0B9C0B9E0B9F0BA30BA40BA8-0BAA0BAE-0BB90BD00C05-0C0C0C0E-0C100C12-0C280C2A-0C330C35-0C390C3D0C580C590C600C610C85-0C8C0C8E-0C900C92-0CA80CAA-0CB30CB5-0CB90CBD0CDE0CE00CE10D05-0D0C0D0E-0D100D12-0D280D2A-0D390D3D0D600D610D7A-0D7F0D85-0D960D9A-0DB10DB3-0DBB0DBD0DC0-0DC60E01-0E300E320E330E40-0E460E810E820E840E870E880E8A0E8D0E94-0E970E99-0E9F0EA1-0EA30EA50EA70EAA0EAB0EAD-0EB00EB20EB30EBD0EC0-0EC40EC60EDC0EDD0F000F40-0F470F49-0F6C0F88-0F8B1000-102A103F1050-1055105A-105D106110651066106E-10701075-1081108E10A0-10C510D0-10FA10FC1100-1248124A-124D1250-12561258125A-125D1260-1288128A-128D1290-12B012B2-12B512B8-12BE12C012C2-12C512C8-12D612D8-13101312-13151318-135A1380-138F13A0-13F41401-166C166F-167F1681-169A16A0-16EA1700-170C170E-17111720-17311740-17511760-176C176E-17701780-17B317D717DC1820-18771880-18A818AA18B0-18F51900-191C1950-196D1970-19741980-19AB19C1-19C71A00-1A161A20-1A541AA71B05-1B331B45-1B4B1B83-1BA01BAE1BAF1C00-1C231C4D-1C4F1C5A-1C7D1CE9-1CEC1CEE-1CF11D00-1DBF1E00-1F151F18-1F1D1F20-1F451F48-1F4D1F50-1F571F591F5B1F5D1F5F-1F7D1F80-1FB41FB6-1FBC1FBE1FC2-1FC41FC6-1FCC1FD0-1FD31FD6-1FDB1FE0-1FEC1FF2-1FF41FF6-1FFC2071207F2090-209421022107210A-211321152119-211D212421262128212A-212D212F-2139213C-213F2145-2149214E218321842C00-2C2E2C30-2C5E2C60-2CE42CEB-2CEE2D00-2D252D30-2D652D6F2D80-2D962DA0-2DA62DA8-2DAE2DB0-2DB62DB8-2DBE2DC0-2DC62DC8-2DCE2DD0-2DD62DD8-2DDE2E2F300530063031-3035303B303C3041-3096309D-309F30A1-30FA30FC-30FF3105-312D3131-318E31A0-31B731F0-31FF3400-4DB54E00-9FCBA000-A48CA4D0-A4FDA500-A60CA610-A61FA62AA62BA640-A65FA662-A66EA67F-A697A6A0-A6E5A717-A71FA722-A788A78BA78CA7FB-A801A803-A805A807-A80AA80C-A822A840-A873A882-A8B3A8F2-A8F7A8FBA90A-A925A930-A946A960-A97CA984-A9B2A9CFAA00-AA28AA40-AA42AA44-AA4BAA60-AA76AA7AAA80-AAAFAAB1AAB5AAB6AAB9-AABDAAC0AAC2AADB-AADDABC0-ABE2AC00-D7A3D7B0-D7C6D7CB-D7FBF900-FA2DFA30-FA6DFA70-FAD9FB00-FB06FB13-FB17FB1DFB1F-FB28FB2A-FB36FB38-FB3CFB3EFB40FB41FB43FB44FB46-FBB1FBD3-FD3DFD50-FD8FFD92-FDC7FDF0-FDFBFE70-FE74FE76-FEFCFF21-FF3AFF41-FF5AFF66-FFBEFFC2-FFC7FFCA-FFCFFFD2-FFD7FFDA-FFDC", Ll: "0061-007A00AA00B500BA00DF-00F600F8-00FF01010103010501070109010B010D010F01110113011501170119011B011D011F01210123012501270129012B012D012F01310133013501370138013A013C013E014001420144014601480149014B014D014F01510153015501570159015B015D015F01610163016501670169016B016D016F0171017301750177017A017C017E-0180018301850188018C018D019201950199-019B019E01A101A301A501A801AA01AB01AD01B001B401B601B901BA01BD-01BF01C601C901CC01CE01D001D201D401D601D801DA01DC01DD01DF01E101E301E501E701E901EB01ED01EF01F001F301F501F901FB01FD01FF02010203020502070209020B020D020F02110213021502170219021B021D021F02210223022502270229022B022D022F02310233-0239023C023F0240024202470249024B024D024F-02930295-02AF037103730377037B-037D039003AC-03CE03D003D103D5-03D703D903DB03DD03DF03E103E303E503E703E903EB03ED03EF-03F303F503F803FB03FC0430-045F04610463046504670469046B046D046F04710473047504770479047B047D047F0481048B048D048F04910493049504970499049B049D049F04A104A304A504A704A904AB04AD04AF04B104B304B504B704B904BB04BD04BF04C204C404C604C804CA04CC04CE04CF04D104D304D504D704D904DB04DD04DF04E104E304E504E704E904EB04ED04EF04F104F304F504F704F904FB04FD04FF05010503050505070509050B050D050F05110513051505170519051B051D051F0521052305250561-05871D00-1D2B1D62-1D771D79-1D9A1E011E031E051E071E091E0B1E0D1E0F1E111E131E151E171E191E1B1E1D1E1F1E211E231E251E271E291E2B1E2D1E2F1E311E331E351E371E391E3B1E3D1E3F1E411E431E451E471E491E4B1E4D1E4F1E511E531E551E571E591E5B1E5D1E5F1E611E631E651E671E691E6B1E6D1E6F1E711E731E751E771E791E7B1E7D1E7F1E811E831E851E871E891E8B1E8D1E8F1E911E931E95-1E9D1E9F1EA11EA31EA51EA71EA91EAB1EAD1EAF1EB11EB31EB51EB71EB91EBB1EBD1EBF1EC11EC31EC51EC71EC91ECB1ECD1ECF1ED11ED31ED51ED71ED91EDB1EDD1EDF1EE11EE31EE51EE71EE91EEB1EED1EEF1EF11EF31EF51EF71EF91EFB1EFD1EFF-1F071F10-1F151F20-1F271F30-1F371F40-1F451F50-1F571F60-1F671F70-1F7D1F80-1F871F90-1F971FA0-1FA71FB0-1FB41FB61FB71FBE1FC2-1FC41FC61FC71FD0-1FD31FD61FD71FE0-1FE71FF2-1FF41FF61FF7210A210E210F2113212F21342139213C213D2146-2149214E21842C30-2C5E2C612C652C662C682C6A2C6C2C712C732C742C76-2C7C2C812C832C852C872C892C8B2C8D2C8F2C912C932C952C972C992C9B2C9D2C9F2CA12CA32CA52CA72CA92CAB2CAD2CAF2CB12CB32CB52CB72CB92CBB2CBD2CBF2CC12CC32CC52CC72CC92CCB2CCD2CCF2CD12CD32CD52CD72CD92CDB2CDD2CDF2CE12CE32CE42CEC2CEE2D00-2D25A641A643A645A647A649A64BA64DA64FA651A653A655A657A659A65BA65DA65FA663A665A667A669A66BA66DA681A683A685A687A689A68BA68DA68FA691A693A695A697A723A725A727A729A72BA72DA72F-A731A733A735A737A739A73BA73DA73FA741A743A745A747A749A74BA74DA74FA751A753A755A757A759A75BA75DA75FA761A763A765A767A769A76BA76DA76FA771-A778A77AA77CA77FA781A783A785A787A78CFB00-FB06FB13-FB17FF41-FF5A", Lu: "0041-005A00C0-00D600D8-00DE01000102010401060108010A010C010E01100112011401160118011A011C011E01200122012401260128012A012C012E01300132013401360139013B013D013F0141014301450147014A014C014E01500152015401560158015A015C015E01600162016401660168016A016C016E017001720174017601780179017B017D018101820184018601870189-018B018E-0191019301940196-0198019C019D019F01A001A201A401A601A701A901AC01AE01AF01B1-01B301B501B701B801BC01C401C701CA01CD01CF01D101D301D501D701D901DB01DE01E001E201E401E601E801EA01EC01EE01F101F401F6-01F801FA01FC01FE02000202020402060208020A020C020E02100212021402160218021A021C021E02200222022402260228022A022C022E02300232023A023B023D023E02410243-02460248024A024C024E03700372037603860388-038A038C038E038F0391-03A103A3-03AB03CF03D2-03D403D803DA03DC03DE03E003E203E403E603E803EA03EC03EE03F403F703F903FA03FD-042F04600462046404660468046A046C046E04700472047404760478047A047C047E0480048A048C048E04900492049404960498049A049C049E04A004A204A404A604A804AA04AC04AE04B004B204B404B604B804BA04BC04BE04C004C104C304C504C704C904CB04CD04D004D204D404D604D804DA04DC04DE04E004E204E404E604E804EA04EC04EE04F004F204F404F604F804FA04FC04FE05000502050405060508050A050C050E05100512051405160518051A051C051E0520052205240531-055610A0-10C51E001E021E041E061E081E0A1E0C1E0E1E101E121E141E161E181E1A1E1C1E1E1E201E221E241E261E281E2A1E2C1E2E1E301E321E341E361E381E3A1E3C1E3E1E401E421E441E461E481E4A1E4C1E4E1E501E521E541E561E581E5A1E5C1E5E1E601E621E641E661E681E6A1E6C1E6E1E701E721E741E761E781E7A1E7C1E7E1E801E821E841E861E881E8A1E8C1E8E1E901E921E941E9E1EA01EA21EA41EA61EA81EAA1EAC1EAE1EB01EB21EB41EB61EB81EBA1EBC1EBE1EC01EC21EC41EC61EC81ECA1ECC1ECE1ED01ED21ED41ED61ED81EDA1EDC1EDE1EE01EE21EE41EE61EE81EEA1EEC1EEE1EF01EF21EF41EF61EF81EFA1EFC1EFE1F08-1F0F1F18-1F1D1F28-1F2F1F38-1F3F1F48-1F4D1F591F5B1F5D1F5F1F68-1F6F1FB8-1FBB1FC8-1FCB1FD8-1FDB1FE8-1FEC1FF8-1FFB21022107210B-210D2110-211221152119-211D212421262128212A-212D2130-2133213E213F214521832C00-2C2E2C602C62-2C642C672C692C6B2C6D-2C702C722C752C7E-2C802C822C842C862C882C8A2C8C2C8E2C902C922C942C962C982C9A2C9C2C9E2CA02CA22CA42CA62CA82CAA2CAC2CAE2CB02CB22CB42CB62CB82CBA2CBC2CBE2CC02CC22CC42CC62CC82CCA2CCC2CCE2CD02CD22CD42CD62CD82CDA2CDC2CDE2CE02CE22CEB2CEDA640A642A644A646A648A64AA64CA64EA650A652A654A656A658A65AA65CA65EA662A664A666A668A66AA66CA680A682A684A686A688A68AA68CA68EA690A692A694A696A722A724A726A728A72AA72CA72EA732A734A736A738A73AA73CA73EA740A742A744A746A748A74AA74CA74EA750A752A754A756A758A75AA75CA75EA760A762A764A766A768A76AA76CA76EA779A77BA77DA77EA780A782A784A786A78BFF21-FF3A", Lt: "01C501C801CB01F21F88-1F8F1F98-1F9F1FA8-1FAF1FBC1FCC1FFC", Lm: "02B0-02C102C6-02D102E0-02E402EC02EE0374037A0559064006E506E607F407F507FA081A0824082809710E460EC610FC17D718431AA71C78-1C7D1D2C-1D611D781D9B-1DBF2071207F2090-20942C7D2D6F2E2F30053031-3035303B309D309E30FC-30FEA015A4F8-A4FDA60CA67FA717-A71FA770A788A9CFAA70AADDFF70FF9EFF9F", Lo: "01BB01C0-01C3029405D0-05EA05F0-05F20621-063F0641-064A066E066F0671-06D306D506EE06EF06FA-06FC06FF07100712-072F074D-07A507B107CA-07EA0800-08150904-0939093D09500958-096109720979-097F0985-098C098F09900993-09A809AA-09B009B209B6-09B909BD09CE09DC09DD09DF-09E109F009F10A05-0A0A0A0F0A100A13-0A280A2A-0A300A320A330A350A360A380A390A59-0A5C0A5E0A72-0A740A85-0A8D0A8F-0A910A93-0AA80AAA-0AB00AB20AB30AB5-0AB90ABD0AD00AE00AE10B05-0B0C0B0F0B100B13-0B280B2A-0B300B320B330B35-0B390B3D0B5C0B5D0B5F-0B610B710B830B85-0B8A0B8E-0B900B92-0B950B990B9A0B9C0B9E0B9F0BA30BA40BA8-0BAA0BAE-0BB90BD00C05-0C0C0C0E-0C100C12-0C280C2A-0C330C35-0C390C3D0C580C590C600C610C85-0C8C0C8E-0C900C92-0CA80CAA-0CB30CB5-0CB90CBD0CDE0CE00CE10D05-0D0C0D0E-0D100D12-0D280D2A-0D390D3D0D600D610D7A-0D7F0D85-0D960D9A-0DB10DB3-0DBB0DBD0DC0-0DC60E01-0E300E320E330E40-0E450E810E820E840E870E880E8A0E8D0E94-0E970E99-0E9F0EA1-0EA30EA50EA70EAA0EAB0EAD-0EB00EB20EB30EBD0EC0-0EC40EDC0EDD0F000F40-0F470F49-0F6C0F88-0F8B1000-102A103F1050-1055105A-105D106110651066106E-10701075-1081108E10D0-10FA1100-1248124A-124D1250-12561258125A-125D1260-1288128A-128D1290-12B012B2-12B512B8-12BE12C012C2-12C512C8-12D612D8-13101312-13151318-135A1380-138F13A0-13F41401-166C166F-167F1681-169A16A0-16EA1700-170C170E-17111720-17311740-17511760-176C176E-17701780-17B317DC1820-18421844-18771880-18A818AA18B0-18F51900-191C1950-196D1970-19741980-19AB19C1-19C71A00-1A161A20-1A541B05-1B331B45-1B4B1B83-1BA01BAE1BAF1C00-1C231C4D-1C4F1C5A-1C771CE9-1CEC1CEE-1CF12135-21382D30-2D652D80-2D962DA0-2DA62DA8-2DAE2DB0-2DB62DB8-2DBE2DC0-2DC62DC8-2DCE2DD0-2DD62DD8-2DDE3006303C3041-3096309F30A1-30FA30FF3105-312D3131-318E31A0-31B731F0-31FF3400-4DB54E00-9FCBA000-A014A016-A48CA4D0-A4F7A500-A60BA610-A61FA62AA62BA66EA6A0-A6E5A7FB-A801A803-A805A807-A80AA80C-A822A840-A873A882-A8B3A8F2-A8F7A8FBA90A-A925A930-A946A960-A97CA984-A9B2AA00-AA28AA40-AA42AA44-AA4BAA60-AA6FAA71-AA76AA7AAA80-AAAFAAB1AAB5AAB6AAB9-AABDAAC0AAC2AADBAADCABC0-ABE2AC00-D7A3D7B0-D7C6D7CB-D7FBF900-FA2DFA30-FA6DFA70-FAD9FB1DFB1F-FB28FB2A-FB36FB38-FB3CFB3EFB40FB41FB43FB44FB46-FBB1FBD3-FD3DFD50-FD8FFD92-FDC7FDF0-FDFBFE70-FE74FE76-FEFCFF66-FF6FFF71-FF9DFFA0-FFBEFFC2-FFC7FFCA-FFCFFFD2-FFD7FFDA-FFDC", M: "0300-036F0483-04890591-05BD05BF05C105C205C405C505C70610-061A064B-065E067006D6-06DC06DE-06E406E706E806EA-06ED07110730-074A07A6-07B007EB-07F30816-0819081B-08230825-08270829-082D0900-0903093C093E-094E0951-0955096209630981-098309BC09BE-09C409C709C809CB-09CD09D709E209E30A01-0A030A3C0A3E-0A420A470A480A4B-0A4D0A510A700A710A750A81-0A830ABC0ABE-0AC50AC7-0AC90ACB-0ACD0AE20AE30B01-0B030B3C0B3E-0B440B470B480B4B-0B4D0B560B570B620B630B820BBE-0BC20BC6-0BC80BCA-0BCD0BD70C01-0C030C3E-0C440C46-0C480C4A-0C4D0C550C560C620C630C820C830CBC0CBE-0CC40CC6-0CC80CCA-0CCD0CD50CD60CE20CE30D020D030D3E-0D440D46-0D480D4A-0D4D0D570D620D630D820D830DCA0DCF-0DD40DD60DD8-0DDF0DF20DF30E310E34-0E3A0E47-0E4E0EB10EB4-0EB90EBB0EBC0EC8-0ECD0F180F190F350F370F390F3E0F3F0F71-0F840F860F870F90-0F970F99-0FBC0FC6102B-103E1056-1059105E-10601062-10641067-106D1071-10741082-108D108F109A-109D135F1712-17141732-1734175217531772177317B6-17D317DD180B-180D18A91920-192B1930-193B19B0-19C019C819C91A17-1A1B1A55-1A5E1A60-1A7C1A7F1B00-1B041B34-1B441B6B-1B731B80-1B821BA1-1BAA1C24-1C371CD0-1CD21CD4-1CE81CED1CF21DC0-1DE61DFD-1DFF20D0-20F02CEF-2CF12DE0-2DFF302A-302F3099309AA66F-A672A67CA67DA6F0A6F1A802A806A80BA823-A827A880A881A8B4-A8C4A8E0-A8F1A926-A92DA947-A953A980-A983A9B3-A9C0AA29-AA36AA43AA4CAA4DAA7BAAB0AAB2-AAB4AAB7AAB8AABEAABFAAC1ABE3-ABEAABECABEDFB1EFE00-FE0FFE20-FE26", Mn: "0300-036F0483-04870591-05BD05BF05C105C205C405C505C70610-061A064B-065E067006D6-06DC06DF-06E406E706E806EA-06ED07110730-074A07A6-07B007EB-07F30816-0819081B-08230825-08270829-082D0900-0902093C0941-0948094D0951-095509620963098109BC09C1-09C409CD09E209E30A010A020A3C0A410A420A470A480A4B-0A4D0A510A700A710A750A810A820ABC0AC1-0AC50AC70AC80ACD0AE20AE30B010B3C0B3F0B41-0B440B4D0B560B620B630B820BC00BCD0C3E-0C400C46-0C480C4A-0C4D0C550C560C620C630CBC0CBF0CC60CCC0CCD0CE20CE30D41-0D440D4D0D620D630DCA0DD2-0DD40DD60E310E34-0E3A0E47-0E4E0EB10EB4-0EB90EBB0EBC0EC8-0ECD0F180F190F350F370F390F71-0F7E0F80-0F840F860F870F90-0F970F99-0FBC0FC6102D-10301032-10371039103A103D103E10581059105E-10601071-1074108210851086108D109D135F1712-17141732-1734175217531772177317B7-17BD17C617C9-17D317DD180B-180D18A91920-19221927192819321939-193B1A171A181A561A58-1A5E1A601A621A65-1A6C1A73-1A7C1A7F1B00-1B031B341B36-1B3A1B3C1B421B6B-1B731B801B811BA2-1BA51BA81BA91C2C-1C331C361C371CD0-1CD21CD4-1CE01CE2-1CE81CED1DC0-1DE61DFD-1DFF20D0-20DC20E120E5-20F02CEF-2CF12DE0-2DFF302A-302F3099309AA66FA67CA67DA6F0A6F1A802A806A80BA825A826A8C4A8E0-A8F1A926-A92DA947-A951A980-A982A9B3A9B6-A9B9A9BCAA29-AA2EAA31AA32AA35AA36AA43AA4CAAB0AAB2-AAB4AAB7AAB8AABEAABFAAC1ABE5ABE8ABEDFB1EFE00-FE0FFE20-FE26", Mc: "0903093E-09400949-094C094E0982098309BE-09C009C709C809CB09CC09D70A030A3E-0A400A830ABE-0AC00AC90ACB0ACC0B020B030B3E0B400B470B480B4B0B4C0B570BBE0BBF0BC10BC20BC6-0BC80BCA-0BCC0BD70C01-0C030C41-0C440C820C830CBE0CC0-0CC40CC70CC80CCA0CCB0CD50CD60D020D030D3E-0D400D46-0D480D4A-0D4C0D570D820D830DCF-0DD10DD8-0DDF0DF20DF30F3E0F3F0F7F102B102C10311038103B103C105610571062-10641067-106D108310841087-108C108F109A-109C17B617BE-17C517C717C81923-19261929-192B193019311933-193819B0-19C019C819C91A19-1A1B1A551A571A611A631A641A6D-1A721B041B351B3B1B3D-1B411B431B441B821BA11BA61BA71BAA1C24-1C2B1C341C351CE11CF2A823A824A827A880A881A8B4-A8C3A952A953A983A9B4A9B5A9BAA9BBA9BD-A9C0AA2FAA30AA33AA34AA4DAA7BABE3ABE4ABE6ABE7ABE9ABEAABEC", Me: "0488048906DE20DD-20E020E2-20E4A670-A672", N: "0030-003900B200B300B900BC-00BE0660-066906F0-06F907C0-07C90966-096F09E6-09EF09F4-09F90A66-0A6F0AE6-0AEF0B66-0B6F0BE6-0BF20C66-0C6F0C78-0C7E0CE6-0CEF0D66-0D750E50-0E590ED0-0ED90F20-0F331040-10491090-10991369-137C16EE-16F017E0-17E917F0-17F91810-18191946-194F19D0-19DA1A80-1A891A90-1A991B50-1B591BB0-1BB91C40-1C491C50-1C5920702074-20792080-20892150-21822185-21892460-249B24EA-24FF2776-27932CFD30073021-30293038-303A3192-31953220-32293251-325F3280-328932B1-32BFA620-A629A6E6-A6EFA830-A835A8D0-A8D9A900-A909A9D0-A9D9AA50-AA59ABF0-ABF9FF10-FF19", Nd: "0030-00390660-066906F0-06F907C0-07C90966-096F09E6-09EF0A66-0A6F0AE6-0AEF0B66-0B6F0BE6-0BEF0C66-0C6F0CE6-0CEF0D66-0D6F0E50-0E590ED0-0ED90F20-0F291040-10491090-109917E0-17E91810-18191946-194F19D0-19DA1A80-1A891A90-1A991B50-1B591BB0-1BB91C40-1C491C50-1C59A620-A629A8D0-A8D9A900-A909A9D0-A9D9AA50-AA59ABF0-ABF9FF10-FF19", Nl: "16EE-16F02160-21822185-218830073021-30293038-303AA6E6-A6EF", No: "00B200B300B900BC-00BE09F4-09F90BF0-0BF20C78-0C7E0D70-0D750F2A-0F331369-137C17F0-17F920702074-20792080-20892150-215F21892460-249B24EA-24FF2776-27932CFD3192-31953220-32293251-325F3280-328932B1-32BFA830-A835", P: "0021-00230025-002A002C-002F003A003B003F0040005B-005D005F007B007D00A100AB00B700BB00BF037E0387055A-055F0589058A05BE05C005C305C605F305F40609060A060C060D061B061E061F066A-066D06D40700-070D07F7-07F90830-083E0964096509700DF40E4F0E5A0E5B0F04-0F120F3A-0F3D0F850FD0-0FD4104A-104F10FB1361-13681400166D166E169B169C16EB-16ED1735173617D4-17D617D8-17DA1800-180A1944194519DE19DF1A1E1A1F1AA0-1AA61AA8-1AAD1B5A-1B601C3B-1C3F1C7E1C7F1CD32010-20272030-20432045-20512053-205E207D207E208D208E2329232A2768-277527C527C627E6-27EF2983-299829D8-29DB29FC29FD2CF9-2CFC2CFE2CFF2E00-2E2E2E302E313001-30033008-30113014-301F3030303D30A030FBA4FEA4FFA60D-A60FA673A67EA6F2-A6F7A874-A877A8CEA8CFA8F8-A8FAA92EA92FA95FA9C1-A9CDA9DEA9DFAA5C-AA5FAADEAADFABEBFD3EFD3FFE10-FE19FE30-FE52FE54-FE61FE63FE68FE6AFE6BFF01-FF03FF05-FF0AFF0C-FF0FFF1AFF1BFF1FFF20FF3B-FF3DFF3FFF5BFF5DFF5F-FF65", Pd: "002D058A05BE140018062010-20152E172E1A301C303030A0FE31FE32FE58FE63FF0D", Ps: "0028005B007B0F3A0F3C169B201A201E2045207D208D23292768276A276C276E27702772277427C527E627E827EA27EC27EE2983298529872989298B298D298F299129932995299729D829DA29FC2E222E242E262E283008300A300C300E3010301430163018301A301DFD3EFE17FE35FE37FE39FE3BFE3DFE3FFE41FE43FE47FE59FE5BFE5DFF08FF3BFF5BFF5FFF62", Pe: "0029005D007D0F3B0F3D169C2046207E208E232A2769276B276D276F27712773277527C627E727E927EB27ED27EF298429862988298A298C298E2990299229942996299829D929DB29FD2E232E252E272E293009300B300D300F3011301530173019301B301E301FFD3FFE18FE36FE38FE3AFE3CFE3EFE40FE42FE44FE48FE5AFE5CFE5EFF09FF3DFF5DFF60FF63", Pi: "00AB2018201B201C201F20392E022E042E092E0C2E1C2E20", Pf: "00BB2019201D203A2E032E052E0A2E0D2E1D2E21", Pc: "005F203F20402054FE33FE34FE4D-FE4FFF3F", Po: "0021-00230025-0027002A002C002E002F003A003B003F0040005C00A100B700BF037E0387055A-055F058905C005C305C605F305F40609060A060C060D061B061E061F066A-066D06D40700-070D07F7-07F90830-083E0964096509700DF40E4F0E5A0E5B0F04-0F120F850FD0-0FD4104A-104F10FB1361-1368166D166E16EB-16ED1735173617D4-17D617D8-17DA1800-18051807-180A1944194519DE19DF1A1E1A1F1AA0-1AA61AA8-1AAD1B5A-1B601C3B-1C3F1C7E1C7F1CD3201620172020-20272030-2038203B-203E2041-20432047-205120532055-205E2CF9-2CFC2CFE2CFF2E002E012E06-2E082E0B2E0E-2E162E182E192E1B2E1E2E1F2E2A-2E2E2E302E313001-3003303D30FBA4FEA4FFA60D-A60FA673A67EA6F2-A6F7A874-A877A8CEA8CFA8F8-A8FAA92EA92FA95FA9C1-A9CDA9DEA9DFAA5C-AA5FAADEAADFABEBFE10-FE16FE19FE30FE45FE46FE49-FE4CFE50-FE52FE54-FE57FE5F-FE61FE68FE6AFE6BFF01-FF03FF05-FF07FF0AFF0CFF0EFF0FFF1AFF1BFF1FFF20FF3CFF61FF64FF65", S: "0024002B003C-003E005E0060007C007E00A2-00A900AC00AE-00B100B400B600B800D700F702C2-02C502D2-02DF02E5-02EB02ED02EF-02FF03750384038503F604820606-0608060B060E060F06E906FD06FE07F609F209F309FA09FB0AF10B700BF3-0BFA0C7F0CF10CF20D790E3F0F01-0F030F13-0F170F1A-0F1F0F340F360F380FBE-0FC50FC7-0FCC0FCE0FCF0FD5-0FD8109E109F13601390-139917DB194019E0-19FF1B61-1B6A1B74-1B7C1FBD1FBF-1FC11FCD-1FCF1FDD-1FDF1FED-1FEF1FFD1FFE20442052207A-207C208A-208C20A0-20B8210021012103-21062108210921142116-2118211E-2123212521272129212E213A213B2140-2144214A-214D214F2190-2328232B-23E82400-24262440-244A249C-24E92500-26CD26CF-26E126E326E8-26FF2701-27042706-2709270C-27272729-274B274D274F-27522756-275E2761-276727942798-27AF27B1-27BE27C0-27C427C7-27CA27CC27D0-27E527F0-29822999-29D729DC-29FB29FE-2B4C2B50-2B592CE5-2CEA2E80-2E992E9B-2EF32F00-2FD52FF0-2FFB300430123013302030363037303E303F309B309C319031913196-319F31C0-31E33200-321E322A-32503260-327F328A-32B032C0-32FE3300-33FF4DC0-4DFFA490-A4C6A700-A716A720A721A789A78AA828-A82BA836-A839AA77-AA79FB29FDFCFDFDFE62FE64-FE66FE69FF04FF0BFF1C-FF1EFF3EFF40FF5CFF5EFFE0-FFE6FFE8-FFEEFFFCFFFD", Sm: "002B003C-003E007C007E00AC00B100D700F703F60606-060820442052207A-207C208A-208C2140-2144214B2190-2194219A219B21A021A321A621AE21CE21CF21D221D421F4-22FF2308-230B23202321237C239B-23B323DC-23E125B725C125F8-25FF266F27C0-27C427C7-27CA27CC27D0-27E527F0-27FF2900-29822999-29D729DC-29FB29FE-2AFF2B30-2B442B47-2B4CFB29FE62FE64-FE66FF0BFF1C-FF1EFF5CFF5EFFE2FFE9-FFEC", Sc: "002400A2-00A5060B09F209F309FB0AF10BF90E3F17DB20A0-20B8A838FDFCFE69FF04FFE0FFE1FFE5FFE6", Sk: "005E006000A800AF00B400B802C2-02C502D2-02DF02E5-02EB02ED02EF-02FF0375038403851FBD1FBF-1FC11FCD-1FCF1FDD-1FDF1FED-1FEF1FFD1FFE309B309CA700-A716A720A721A789A78AFF3EFF40FFE3", So: "00A600A700A900AE00B000B60482060E060F06E906FD06FE07F609FA0B700BF3-0BF80BFA0C7F0CF10CF20D790F01-0F030F13-0F170F1A-0F1F0F340F360F380FBE-0FC50FC7-0FCC0FCE0FCF0FD5-0FD8109E109F13601390-1399194019E0-19FF1B61-1B6A1B74-1B7C210021012103-21062108210921142116-2118211E-2123212521272129212E213A213B214A214C214D214F2195-2199219C-219F21A121A221A421A521A7-21AD21AF-21CD21D021D121D321D5-21F32300-2307230C-231F2322-2328232B-237B237D-239A23B4-23DB23E2-23E82400-24262440-244A249C-24E92500-25B625B8-25C025C2-25F72600-266E2670-26CD26CF-26E126E326E8-26FF2701-27042706-2709270C-27272729-274B274D274F-27522756-275E2761-276727942798-27AF27B1-27BE2800-28FF2B00-2B2F2B452B462B50-2B592CE5-2CEA2E80-2E992E9B-2EF32F00-2FD52FF0-2FFB300430123013302030363037303E303F319031913196-319F31C0-31E33200-321E322A-32503260-327F328A-32B032C0-32FE3300-33FF4DC0-4DFFA490-A4C6A828-A82BA836A837A839AA77-AA79FDFDFFE4FFE8FFEDFFEEFFFCFFFD", Z: "002000A01680180E2000-200A20282029202F205F3000", Zs: "002000A01680180E2000-200A202F205F3000", Zl: "2028", Zp: "2029", C: "0000-001F007F-009F00AD03780379037F-0383038B038D03A20526-05300557055805600588058B-059005C8-05CF05EB-05EF05F5-0605061C061D0620065F06DD070E070F074B074C07B2-07BF07FB-07FF082E082F083F-08FF093A093B094F095609570973-097809800984098D098E0991099209A909B109B3-09B509BA09BB09C509C609C909CA09CF-09D609D8-09DB09DE09E409E509FC-0A000A040A0B-0A0E0A110A120A290A310A340A370A3A0A3B0A3D0A43-0A460A490A4A0A4E-0A500A52-0A580A5D0A5F-0A650A76-0A800A840A8E0A920AA90AB10AB40ABA0ABB0AC60ACA0ACE0ACF0AD1-0ADF0AE40AE50AF00AF2-0B000B040B0D0B0E0B110B120B290B310B340B3A0B3B0B450B460B490B4A0B4E-0B550B58-0B5B0B5E0B640B650B72-0B810B840B8B-0B8D0B910B96-0B980B9B0B9D0BA0-0BA20BA5-0BA70BAB-0BAD0BBA-0BBD0BC3-0BC50BC90BCE0BCF0BD1-0BD60BD8-0BE50BFB-0C000C040C0D0C110C290C340C3A-0C3C0C450C490C4E-0C540C570C5A-0C5F0C640C650C70-0C770C800C810C840C8D0C910CA90CB40CBA0CBB0CC50CC90CCE-0CD40CD7-0CDD0CDF0CE40CE50CF00CF3-0D010D040D0D0D110D290D3A-0D3C0D450D490D4E-0D560D58-0D5F0D640D650D76-0D780D800D810D840D97-0D990DB20DBC0DBE0DBF0DC7-0DC90DCB-0DCE0DD50DD70DE0-0DF10DF5-0E000E3B-0E3E0E5C-0E800E830E850E860E890E8B0E8C0E8E-0E930E980EA00EA40EA60EA80EA90EAC0EBA0EBE0EBF0EC50EC70ECE0ECF0EDA0EDB0EDE-0EFF0F480F6D-0F700F8C-0F8F0F980FBD0FCD0FD9-0FFF10C6-10CF10FD-10FF1249124E124F12571259125E125F1289128E128F12B112B612B712BF12C112C612C712D7131113161317135B-135E137D-137F139A-139F13F5-13FF169D-169F16F1-16FF170D1715-171F1737-173F1754-175F176D17711774-177F17B417B517DE17DF17EA-17EF17FA-17FF180F181A-181F1878-187F18AB-18AF18F6-18FF191D-191F192C-192F193C-193F1941-1943196E196F1975-197F19AC-19AF19CA-19CF19DB-19DD1A1C1A1D1A5F1A7D1A7E1A8A-1A8F1A9A-1A9F1AAE-1AFF1B4C-1B4F1B7D-1B7F1BAB-1BAD1BBA-1BFF1C38-1C3A1C4A-1C4C1C80-1CCF1CF3-1CFF1DE7-1DFC1F161F171F1E1F1F1F461F471F4E1F4F1F581F5A1F5C1F5E1F7E1F7F1FB51FC51FD41FD51FDC1FF01FF11FF51FFF200B-200F202A-202E2060-206F20722073208F2095-209F20B9-20CF20F1-20FF218A-218F23E9-23FF2427-243F244B-245F26CE26E226E4-26E727002705270A270B2728274C274E2753-2755275F27602795-279727B027BF27CB27CD-27CF2B4D-2B4F2B5A-2BFF2C2F2C5F2CF2-2CF82D26-2D2F2D66-2D6E2D70-2D7F2D97-2D9F2DA72DAF2DB72DBF2DC72DCF2DD72DDF2E32-2E7F2E9A2EF4-2EFF2FD6-2FEF2FFC-2FFF3040309730983100-3104312E-3130318F31B8-31BF31E4-31EF321F32FF4DB6-4DBF9FCC-9FFFA48D-A48FA4C7-A4CFA62C-A63FA660A661A674-A67BA698-A69FA6F8-A6FFA78D-A7FAA82C-A82FA83A-A83FA878-A87FA8C5-A8CDA8DA-A8DFA8FC-A8FFA954-A95EA97D-A97FA9CEA9DA-A9DDA9E0-A9FFAA37-AA3FAA4EAA4FAA5AAA5BAA7C-AA7FAAC3-AADAAAE0-ABBFABEEABEFABFA-ABFFD7A4-D7AFD7C7-D7CAD7FC-F8FFFA2EFA2FFA6EFA6FFADA-FAFFFB07-FB12FB18-FB1CFB37FB3DFB3FFB42FB45FBB2-FBD2FD40-FD4FFD90FD91FDC8-FDEFFDFEFDFFFE1A-FE1FFE27-FE2FFE53FE67FE6C-FE6FFE75FEFD-FF00FFBF-FFC1FFC8FFC9FFD0FFD1FFD8FFD9FFDD-FFDFFFE7FFEF-FFFBFFFEFFFF", Cc: "0000-001F007F-009F", Cf: "00AD0600-060306DD070F17B417B5200B-200F202A-202E2060-2064206A-206FFEFFFFF9-FFFB", Co: "E000-F8FF", Cs: "D800-DFFF", Cn: "03780379037F-0383038B038D03A20526-05300557055805600588058B-059005C8-05CF05EB-05EF05F5-05FF06040605061C061D0620065F070E074B074C07B2-07BF07FB-07FF082E082F083F-08FF093A093B094F095609570973-097809800984098D098E0991099209A909B109B3-09B509BA09BB09C509C609C909CA09CF-09D609D8-09DB09DE09E409E509FC-0A000A040A0B-0A0E0A110A120A290A310A340A370A3A0A3B0A3D0A43-0A460A490A4A0A4E-0A500A52-0A580A5D0A5F-0A650A76-0A800A840A8E0A920AA90AB10AB40ABA0ABB0AC60ACA0ACE0ACF0AD1-0ADF0AE40AE50AF00AF2-0B000B040B0D0B0E0B110B120B290B310B340B3A0B3B0B450B460B490B4A0B4E-0B550B58-0B5B0B5E0B640B650B72-0B810B840B8B-0B8D0B910B96-0B980B9B0B9D0BA0-0BA20BA5-0BA70BAB-0BAD0BBA-0BBD0BC3-0BC50BC90BCE0BCF0BD1-0BD60BD8-0BE50BFB-0C000C040C0D0C110C290C340C3A-0C3C0C450C490C4E-0C540C570C5A-0C5F0C640C650C70-0C770C800C810C840C8D0C910CA90CB40CBA0CBB0CC50CC90CCE-0CD40CD7-0CDD0CDF0CE40CE50CF00CF3-0D010D040D0D0D110D290D3A-0D3C0D450D490D4E-0D560D58-0D5F0D640D650D76-0D780D800D810D840D97-0D990DB20DBC0DBE0DBF0DC7-0DC90DCB-0DCE0DD50DD70DE0-0DF10DF5-0E000E3B-0E3E0E5C-0E800E830E850E860E890E8B0E8C0E8E-0E930E980EA00EA40EA60EA80EA90EAC0EBA0EBE0EBF0EC50EC70ECE0ECF0EDA0EDB0EDE-0EFF0F480F6D-0F700F8C-0F8F0F980FBD0FCD0FD9-0FFF10C6-10CF10FD-10FF1249124E124F12571259125E125F1289128E128F12B112B612B712BF12C112C612C712D7131113161317135B-135E137D-137F139A-139F13F5-13FF169D-169F16F1-16FF170D1715-171F1737-173F1754-175F176D17711774-177F17DE17DF17EA-17EF17FA-17FF180F181A-181F1878-187F18AB-18AF18F6-18FF191D-191F192C-192F193C-193F1941-1943196E196F1975-197F19AC-19AF19CA-19CF19DB-19DD1A1C1A1D1A5F1A7D1A7E1A8A-1A8F1A9A-1A9F1AAE-1AFF1B4C-1B4F1B7D-1B7F1BAB-1BAD1BBA-1BFF1C38-1C3A1C4A-1C4C1C80-1CCF1CF3-1CFF1DE7-1DFC1F161F171F1E1F1F1F461F471F4E1F4F1F581F5A1F5C1F5E1F7E1F7F1FB51FC51FD41FD51FDC1FF01FF11FF51FFF2065-206920722073208F2095-209F20B9-20CF20F1-20FF218A-218F23E9-23FF2427-243F244B-245F26CE26E226E4-26E727002705270A270B2728274C274E2753-2755275F27602795-279727B027BF27CB27CD-27CF2B4D-2B4F2B5A-2BFF2C2F2C5F2CF2-2CF82D26-2D2F2D66-2D6E2D70-2D7F2D97-2D9F2DA72DAF2DB72DBF2DC72DCF2DD72DDF2E32-2E7F2E9A2EF4-2EFF2FD6-2FEF2FFC-2FFF3040309730983100-3104312E-3130318F31B8-31BF31E4-31EF321F32FF4DB6-4DBF9FCC-9FFFA48D-A48FA4C7-A4CFA62C-A63FA660A661A674-A67BA698-A69FA6F8-A6FFA78D-A7FAA82C-A82FA83A-A83FA878-A87FA8C5-A8CDA8DA-A8DFA8FC-A8FFA954-A95EA97D-A97FA9CEA9DA-A9DDA9E0-A9FFAA37-AA3FAA4EAA4FAA5AAA5BAA7C-AA7FAAC3-AADAAAE0-ABBFABEEABEFABFA-ABFFD7A4-D7AFD7C7-D7CAD7FC-D7FFFA2EFA2FFA6EFA6FFADA-FAFFFB07-FB12FB18-FB1CFB37FB3DFB3FFB42FB45FBB2-FBD2FD40-FD4FFD90FD91FDC8-FDEFFDFEFDFFFE1A-FE1FFE27-FE2FFE53FE67FE6C-FE6FFE75FEFDFEFEFF00FFBF-FFC1FFC8FFC9FFD0FFD1FFD8FFD9FFDD-FFDFFFE7FFEF-FFF8FFFEFFFF"})
}), define("ace/token_iterator", ["require", "exports", "module"], function (e, t, n) {
    var r = function (e, t, n) {
        this.$session = e, this.$row = t, this.$rowTokens = e.getTokens(t);
        var r = e.getTokenAt(t, n);
        this.$tokenIndex = r ? r.index : -1
    };
    (function () {
        this.stepBackward = function () {
            this.$tokenIndex -= 1;
            while (this.$tokenIndex < 0) {
                this.$row -= 1;
                if (this.$row < 0)return this.$row = 0, null;
                this.$rowTokens = this.$session.getTokens(this.$row), this.$tokenIndex = this.$rowTokens.length - 1
            }
            return this.$rowTokens[this.$tokenIndex]
        }, this.stepForward = function () {
            this.$tokenIndex += 1;
            var e;
            while (this.$tokenIndex >= this.$rowTokens.length) {
                this.$row += 1, e || (e = this.$session.getLength());
                if (this.$row >= e)return this.$row = e - 1, null;
                this.$rowTokens = this.$session.getTokens(this.$row), this.$tokenIndex = 0
            }
            return this.$rowTokens[this.$tokenIndex]
        }, this.getCurrentToken = function () {
            return this.$rowTokens[this.$tokenIndex]
        }, this.getCurrentTokenRow = function () {
            return this.$row
        }, this.getCurrentTokenColumn = function () {
            var e = this.$rowTokens, t = this.$tokenIndex, n = e[t].start;
            if (n !== undefined)return n;
            n = 0;
            while (t > 0)t -= 1, n += e[t].value.length;
            return n
        }
    }).call(r.prototype), t.TokenIterator = r
}), define("ace/document", ["require", "exports", "module", "ace/lib/oop", "ace/lib/event_emitter", "ace/range", "ace/anchor"], function (e, t, n) {
    var r = e("./lib/oop"), i = e("./lib/event_emitter").EventEmitter, s = e("./range").Range, o = e("./anchor").Anchor, u = function (e) {
        this.$lines = [], e.length == 0 ? this.$lines = [""] : Array.isArray(e) ? this.insertLines(0, e) : this.insert({row: 0, column: 0}, e)
    };
    (function () {
        r.implement(this, i), this.setValue = function (e) {
            var t = this.getLength();
            this.remove(new s(0, 0, t, this.getLine(t - 1).length)), this.insert({row: 0, column: 0}, e)
        }, this.getValue = function () {
            return this.getAllLines().join(this.getNewLineCharacter())
        }, this.createAnchor = function (e, t) {
            return new o(this, e, t)
        }, "aaa".split(/a/).length == 0 ? this.$split = function (e) {
            return e.replace(/\r\n|\r/g, "\n").split("\n")
        } : this.$split = function (e) {
            return e.split(/\r\n|\r|\n/)
        }, this.$detectNewLine = function (e) {
            var t = e.match(/^.*?(\r\n|\r|\n)/m);
            t ? this.$autoNewLine = t[1] : this.$autoNewLine = "\n"
        }, this.getNewLineCharacter = function () {
            switch (this.$newLineMode) {
                case"windows":
                    return"\r\n";
                case"unix":
                    return"\n";
                default:
                    return this.$autoNewLine
            }
        }, this.$autoNewLine = "\n", this.$newLineMode = "auto", this.setNewLineMode = function (e) {
            if (this.$newLineMode === e)return;
            this.$newLineMode = e
        }, this.getNewLineMode = function () {
            return this.$newLineMode
        }, this.isNewLine = function (e) {
            return e == "\r\n" || e == "\r" || e == "\n"
        }, this.getLine = function (e) {
            return this.$lines[e] || ""
        }, this.getLines = function (e, t) {
            return this.$lines.slice(e, t + 1)
        }, this.getAllLines = function () {
            return this.getLines(0, this.getLength())
        }, this.getLength = function () {
            return this.$lines.length
        }, this.getTextRange = function (e) {
            if (e.start.row == e.end.row)return this.$lines[e.start.row].substring(e.start.column, e.end.column);
            var t = this.getLines(e.start.row + 1, e.end.row - 1);
            return t.unshift((this.$lines[e.start.row] || "").substring(e.start.column)), t.push((this.$lines[e.end.row] || "").substring(0, e.end.column)), t.join(this.getNewLineCharacter())
        }, this.$clipPosition = function (e) {
            var t = this.getLength();
            return e.row >= t ? (e.row = Math.max(0, t - 1), e.column = this.getLine(t - 1).length) : e.row < 0 && (e.row = 0), e
        }, this.insert = function (e, t) {
            if (!t || t.length === 0)return e;
            e = this.$clipPosition(e), this.getLength() <= 1 && this.$detectNewLine(t);
            var n = this.$split(t), r = n.splice(0, 1)[0], i = n.length == 0 ? null : n.splice(n.length - 1, 1)[0];
            return e = this.insertInLine(e, r), i !== null && (e = this.insertNewLine(e), e = this.insertLines(e.row, n), e = this.insertInLine(e, i || "")), e
        }, this.insertLines = function (e, t) {
            if (t.length == 0)return{row: e, column: 0};
            if (t.length > 65535) {
                var n = this.insertLines(e, t.slice(65535));
                t = t.slice(0, 65535)
            }
            var r = [e, 0];
            r.push.apply(r, t), this.$lines.splice.apply(this.$lines, r);
            var i = new s(e, 0, e + t.length, 0), o = {action: "insertLines", range: i, lines: t};
            return this._emit("change", {data: o}), n || i.end
        }, this.insertNewLine = function (e) {
            e = this.$clipPosition(e);
            var t = this.$lines[e.row] || "";
            this.$lines[e.row] = t.substring(0, e.column), this.$lines.splice(e.row + 1, 0, t.substring(e.column, t.length));
            var n = {row: e.row + 1, column: 0}, r = {action: "insertText", range: s.fromPoints(e, n), text: this.getNewLineCharacter()};
            return this._emit("change", {data: r}), n
        }, this.insertInLine = function (e, t) {
            if (t.length == 0)return e;
            var n = this.$lines[e.row] || "";
            this.$lines[e.row] = n.substring(0, e.column) + t + n.substring(e.column);
            var r = {row: e.row, column: e.column + t.length}, i = {action: "insertText", range: s.fromPoints(e, r), text: t};
            return this._emit("change", {data: i}), r
        }, this.remove = function (e) {
            e.start = this.$clipPosition(e.start), e.end = this.$clipPosition(e.end);
            if (e.isEmpty())return e.start;
            var t = e.start.row, n = e.end.row;
            if (e.isMultiLine()) {
                var r = e.start.column == 0 ? t : t + 1, i = n - 1;
                e.end.column > 0 && this.removeInLine(n, 0, e.end.column), i >= r && this.removeLines(r, i), r != t && (this.removeInLine(t, e.start.column, this.getLine(t).length), this.removeNewLine(e.start.row))
            } else this.removeInLine(t, e.start.column, e.end.column);
            return e.start
        }, this.removeInLine = function (e, t, n) {
            if (t == n)return;
            var r = new s(e, t, e, n), i = this.getLine(e), o = i.substring(t, n), u = i.substring(0, t) + i.substring(n, i.length);
            this.$lines.splice(e, 1, u);
            var a = {action: "removeText", range: r, text: o};
            return this._emit("change", {data: a}), r.start
        }, this.removeLines = function (e, t) {
            var n = new s(e, 0, t + 1, 0), r = this.$lines.splice(e, t - e + 1), i = {action: "removeLines", range: n, nl: this.getNewLineCharacter(), lines: r};
            return this._emit("change", {data: i}), r
        }, this.removeNewLine = function (e) {
            var t = this.getLine(e), n = this.getLine(e + 1), r = new s(e, t.length, e + 1, 0), i = t + n;
            this.$lines.splice(e, 2, i);
            var o = {action: "removeText", range: r, text: this.getNewLineCharacter()};
            this._emit("change", {data: o})
        }, this.replace = function (e, t) {
            if (t.length == 0 && e.isEmpty())return e.start;
            if (t == this.getTextRange(e))return e.end;
            this.remove(e);
            if (t)var n = this.insert(e.start, t); else n = e.start;
            return n
        }, this.applyDeltas = function (e) {
            for (var t = 0; t < e.length; t++) {
                var n = e[t], r = s.fromPoints(n.range.start, n.range.end);
                n.action == "insertLines" ? this.insertLines(r.start.row, n.lines) : n.action == "insertText" ? this.insert(r.start, n.text) : n.action == "removeLines" ? this.removeLines(r.start.row, r.end.row - 1) : n.action == "removeText" && this.remove(r)
            }
        }, this.revertDeltas = function (e) {
            for (var t = e.length - 1; t >= 0; t--) {
                var n = e[t], r = s.fromPoints(n.range.start, n.range.end);
                n.action == "insertLines" ? this.removeLines(r.start.row, r.end.row - 1) : n.action == "insertText" ? this.remove(r) : n.action == "removeLines" ? this.insertLines(r.start.row, n.lines) : n.action == "removeText" && this.insert(r.start, n.text)
            }
        }, this.indexToPosition = function (e, t) {
            var n = this.$lines || this.getAllLines(), r = this.getNewLineCharacter().length;
            for (var i = t || 0, s = n
                .length; i < s; i++) {
                e -= n[i].length + r;
                if (e < 0)return{row: i, column: e + n[i].length + r}
            }
            return{row: s - 1, column: n[s - 1].length}
        }, this.positionToIndex = function (e, t) {
            var n = this.$lines || this.getAllLines(), r = this.getNewLineCharacter().length, i = 0, s = Math.min(e.row, n.length);
            for (var o = t || 0; o < s; ++o)i += n[o].length;
            return i + r * o + e.column
        }
    }).call(u.prototype), t.Document = u
}), define("ace/anchor", ["require", "exports", "module", "ace/lib/oop", "ace/lib/event_emitter"], function (e, t, n) {
    var r = e("./lib/oop"), i = e("./lib/event_emitter").EventEmitter, s = t.Anchor = function (e, t, n) {
        this.document = e, typeof n == "undefined" ? this.setPosition(t.row, t.column) : this.setPosition(t, n), this.$onChange = this.onChange.bind(this), e.on("change", this.$onChange)
    };
    (function () {
        r.implement(this, i), this.getPosition = function () {
            return this.$clipPositionToDocument(this.row, this.column)
        }, this.getDocument = function () {
            return this.document
        }, this.onChange = function (e) {
            var t = e.data, n = t.range;
            if (n.start.row == n.end.row && n.start.row != this.row)return;
            if (n.start.row > this.row)return;
            if (n.start.row == this.row && n.start.column > this.column)return;
            var r = this.row, i = this.column, s = n.start, o = n.end;
            t.action === "insertText" ? s.row === r && s.column <= i ? s.row === o.row ? i += o.column - s.column : (i -= s.column, r += o.row - s.row) : s.row !== o.row && s.row < r && (r += o.row - s.row) : t.action === "insertLines" ? s.row <= r && (r += o.row - s.row) : t.action === "removeText" ? s.row === r && s.column < i ? o.column >= i ? i = s.column : i = Math.max(0, i - (o.column - s.column)) : s.row !== o.row && s.row < r ? (o.row === r && (i = Math.max(0, i - o.column) + s.column), r -= o.row - s.row) : o.row === r && (r -= o.row - s.row, i = Math.max(0, i - o.column) + s.column) : t.action == "removeLines" && s.row <= r && (o.row <= r ? r -= o.row - s.row : (r = s.row, i = 0)), this.setPosition(r, i, !0)
        }, this.setPosition = function (e, t, n) {
            var r;
            n ? r = {row: e, column: t} : r = this.$clipPositionToDocument(e, t);
            if (this.row == r.row && this.column == r.column)return;
            var i = {row: this.row, column: this.column};
            this.row = r.row, this.column = r.column, this._emit("change", {old: i, value: r})
        }, this.detach = function () {
            this.document.removeEventListener("change", this.$onChange)
        }, this.$clipPositionToDocument = function (e, t) {
            var n = {};
            return e >= this.document.getLength() ? (n.row = Math.max(0, this.document.getLength() - 1), n.column = this.document.getLine(n.row).length) : e < 0 ? (n.row = 0, n.column = 0) : (n.row = e, n.column = Math.min(this.document.getLine(n.row).length, Math.max(0, t))), t < 0 && (n.column = 0), n
        }
    }).call(s.prototype)
}), define("ace/background_tokenizer", ["require", "exports", "module", "ace/lib/oop", "ace/lib/event_emitter"], function (e, t, n) {
    var r = e("./lib/oop"), i = e("./lib/event_emitter").EventEmitter, s = function (e, t) {
        this.running = !1, this.lines = [], this.states = [], this.currentLine = 0, this.tokenizer = e;
        var n = this;
        this.$worker = function () {
            if (!n.running)return;
            var e = new Date, t = n.currentLine, r = n.doc, i = 0, s = r.getLength();
            while (n.currentLine < s) {
                n.$tokenizeRow(n.currentLine);
                while (n.lines[n.currentLine])n.currentLine++;
                i++;
                if (i % 5 == 0 && new Date - e > 20) {
                    n.fireUpdateEvent(t, n.currentLine - 1), n.running = setTimeout(n.$worker, 20);
                    return
                }
            }
            n.running = !1, n.fireUpdateEvent(t, s - 1)
        }
    };
    (function () {
        r.implement(this, i), this.setTokenizer = function (e) {
            this.tokenizer = e, this.lines = [], this.states = [], this.start(0)
        }, this.setDocument = function (e) {
            this.doc = e, this.lines = [], this.states = [], this.stop()
        }, this.fireUpdateEvent = function (e, t) {
            var n = {first: e, last: t};
            this._emit("update", {data: n})
        }, this.start = function (e) {
            this.currentLine = Math.min(e || 0, this.currentLine, this.doc.getLength()), this.lines.splice(this.currentLine, this.lines.length), this.states.splice(this.currentLine, this.states.length), this.stop(), this.running = setTimeout(this.$worker, 700)
        }, this.$updateOnChange = function (e) {
            var t = e.range, n = t.start.row, r = t.end.row - n;
            if (r === 0)this.lines[n] = null; else if (e.action == "removeText" || e.action == "removeLines")this.lines.splice(n, r + 1, null), this.states.splice(n, r + 1, null); else {
                var i = Array(r + 1);
                i.unshift(n, 1), this.lines.splice.apply(this.lines, i), this.states.splice.apply(this.states, i)
            }
            this.currentLine = Math.min(n, this.currentLine, this.doc.getLength()), this.stop(), this.running = setTimeout(this.$worker, 700)
        }, this.stop = function () {
            this.running && clearTimeout(this.running), this.running = !1
        }, this.getTokens = function (e) {
            return this.lines[e] || this.$tokenizeRow(e)
        }, this.getState = function (e) {
            return this.currentLine == e && this.$tokenizeRow(e), this.states[e] || "start"
        }, this.$tokenizeRow = function (e) {
            var t = this.doc.getLine(e), n = this.states[e - 1], r = this.tokenizer.getLineTokens(t, n, e);
            return this.states[e] + "" != r.state + "" ? (this.states[e] = r.state, this.lines[e + 1] = null, this.currentLine > e + 1 && (this.currentLine = e + 1)) : this.currentLine == e && (this.currentLine = e + 1), this.lines[e] = r.tokens
        }
    }).call(s.prototype), t.BackgroundTokenizer = s
}), define("ace/search_highlight", ["require", "exports", "module", "ace/lib/lang", "ace/lib/oop", "ace/range"], function (e, t, n) {
    var r = e("./lib/lang"), i = e("./lib/oop"), s = e("./range").Range, o = function (e, t, n) {
        this.setRegexp(e), this.clazz = t, this.type = n || "text"
    };
    (function () {
        this.MAX_RANGES = 500, this.setRegexp = function (e) {
            if (this.regExp + "" == e + "")return;
            this.regExp = e, this.cache = []
        }, this.update = function (e, t, n, i) {
            if (!this.regExp)return;
            var o = i.firstRow, u = i.lastRow;
            for (var a = o; a <= u; a++) {
                var f = this.cache[a];
                f == null && (f = r.getMatchOffsets(n.getLine(a), this.regExp), f.length > this.MAX_RANGES && (f = f.slice(0, this.MAX_RANGES)), f = f.map(function (e) {
                    return new s(a, e.offset, a, e.offset + e.length)
                }), this.cache[a] = f.length ? f : "");
                for (var l = f.length; l--;)t.drawSingleLineMarker(e, f[l].toScreenRange(n), this.clazz, i, null, this.type)
            }
        }
    }).call(o.prototype), t.SearchHighlight = o
}), define("ace/edit_session/folding", ["require", "exports", "module", "ace/range", "ace/edit_session/fold_line", "ace/edit_session/fold", "ace/token_iterator"], function (e, t, n) {
    function r() {
        this.getFoldAt = function (e, t, n) {
            var r = this.getFoldLine(e);
            if (!r)return null;
            var i = r.folds;
            for (var s = 0; s < i.length; s++) {
                var o = i[s];
                if (o.range.contains(e, t)) {
                    if (n == 1 && o.range.isEnd(e, t))continue;
                    if (n == -1 && o.range.isStart(e, t))continue;
                    return o
                }
            }
        }, this.getFoldsInRange = function (e) {
            var t = e.start, n = e.end, r = this.$foldData, i = [];
            t.column += 1, n.column -= 1;
            for (var s = 0; s < r.length; s++) {
                var o = r[s].range.compareRange(e);
                if (o == 2)continue;
                if (o == -2)break;
                var u = r[s].folds;
                for (var a = 0; a < u.length; a++) {
                    var f = u[a];
                    o = f.range.compareRange(e);
                    if (o == -2)break;
                    if (o == 2)continue;
                    if (o == 42)break;
                    i.push(f)
                }
            }
            return t.column -= 1, n.column += 1, i
        }, this.getAllFolds = function () {
            function e(e) {
                t.push(e)
            }

            var t = [], n = this.$foldData;
            for (var r = 0; r < n.length; r++)for (var i = 0; i < n[r].folds.length; i++)e(n[r].folds[i]);
            return t
        }, this.getFoldStringAt = function (e, t, n, r) {
            r = r || this.getFoldLine(e);
            if (!r)return null;
            var i = {end: {column: 0}}, s, o;
            for (var u = 0; u < r.folds.length; u++) {
                o = r.folds[u];
                var a = o.range.compareEnd(e, t);
                if (a == -1) {
                    s = this.getLine(o.start.row).substring(i.end.column, o.start.column);
                    break
                }
                if (a === 0)return null;
                i = o
            }
            return s || (s = this.getLine(o.start.row).substring(i.end.column)), n == -1 ? s.substring(0, t - i.end.column) : n == 1 ? s.substring(t - i.end.column) : s
        }, this.getFoldLine = function (e, t) {
            var n = this.$foldData, r = 0;
            t && (r = n.indexOf(t)), r == -1 && (r = 0);
            for (r; r < n.length; r++) {
                var i = n[r];
                if (i.start.row <= e && i.end.row >= e)return i;
                if (i.end.row > e)return null
            }
            return null
        }, this.getNextFoldLine = function (e, t) {
            var n = this.$foldData, r = 0;
            t && (r = n.indexOf(t)), r == -1 && (r = 0);
            for (r; r < n.length; r++) {
                var i = n[r];
                if (i.end.row >= e)return i
            }
            return null
        }, this.getFoldedRowCount = function (e, t) {
            var n = this.$foldData, r = t - e + 1;
            for (var i = 0; i < n.length; i++) {
                var s = n[i], o = s.end.row, u = s.start.row;
                if (o >= t) {
                    u < t && (u >= e ? r -= t - u : r = 0);
                    break
                }
                o >= e && (u >= e ? r -= o - u : r -= o - e + 1)
            }
            return r
        }, this.$addFoldLine = function (e) {
            return this.$foldData.push(e), this.$foldData.sort(function (e, t) {
                return e.start.row - t.start.row
            }), e
        }, this.addFold = function (e, t) {
            var n = this.$foldData, r = !1, i;
            e instanceof o ? i = e : (i = new o(t, e), i.collapseChildren = t.collapseChildren), this.$clipRangeToDocument(i.range);
            var u = i.start.row, a = i.start.column, f = i.end.row, l = i.end.column;
            if (u == f && l - a < 2)throw"The range has to be at least 2 characters width";
            var c = this.getFoldAt(u, a, 1), h = this.getFoldAt(f, l, -1);
            if (c && h == c)return c.addSubFold(i);
            if (c && !c.range.isStart(u, a) || h && !h.range.isEnd(f, l))throw"A fold can't intersect already existing fold" + i.range + c.range;
            var p = this.getFoldsInRange(i.range);
            p.length > 0 && (this.removeFolds(p), p.forEach(function (e) {
                i.addSubFold(e)
            }));
            for (var d = 0; d < n.length; d++) {
                var v = n[d];
                if (f == v.start.row) {
                    v.addFold(i), r = !0;
                    break
                }
                if (u == v.end.row) {
                    v.addFold(i), r = !0;
                    if (!i.sameRow) {
                        var m = n[d + 1];
                        if (m && m.start.row == f) {
                            v.merge(m);
                            break
                        }
                    }
                    break
                }
                if (f <= v.start.row)break
            }
            return r || (v = this.$addFoldLine(new s(this.$foldData, i))), this.$useWrapMode ? this.$updateWrapData(v.start.row, v.start.row) : this.$updateRowLengthCache(v.start.row, v.start.row), this.$modified = !0, this._emit("changeFold", {data: i}), i
        }, this.addFolds = function (e) {
            e.forEach(function (e) {
                this.addFold(e)
            }, this)
        }, this.removeFold = function (e) {
            var t = e.foldLine, n = t.start.row, r = t.end.row, i = this.$foldData, s = t.folds;
            if (s.length == 1)i.splice(i.indexOf(t), 1); else if (t.range.isEnd(e.end.row, e.end.column))s.pop(), t.end.row = s[s.length - 1].end.row, t.end.column = s[s.length - 1].end.column; else if (t.range.isStart(e.start.row, e.start.column))s.shift(), t.start.row = s[0].start.row, t.start.column = s[0].start.column; else if (e.sameRow)s.splice(s.indexOf(e), 1); else {
                var o = t.split(e.start.row, e.start.column);
                s = o.folds, s.shift(), o.start.row = s[0].start.row, o.start.column = s[0].start.column
            }
            this.$updating || (this.$useWrapMode ? this.$updateWrapData(n, r) : this.$updateRowLengthCache(n, r)), this.$modified = !0, this._emit("changeFold", {data: e})
        }, this.removeFolds = function (e) {
            var t = [];
            for (var n = 0; n < e.length; n++)t.push(e[n]);
            t.forEach(function (e) {
                this.removeFold(e)
            }, this), this.$modified = !0
        }, this.expandFold = function (e) {
            this.removeFold(e), e.subFolds.forEach(function (t) {
                e.restoreRange(t), this.addFold(t)
            }, this), e.collapseChildren > 0 && this.foldAll(e.start.row + 1, e.end.row, e.collapseChildren - 1), e.subFolds = []
        }, this.expandFolds = function (e) {
            e.forEach(function (e) {
                this.expandFold(e)
            }, this)
        }, this.unfold = function (e, t) {
            var n, r;
            e == null ? (n = new i(0, 0, this.getLength(), 0), t = !0) : typeof e == "number" ? n = new i(e, 0, e, this.getLine(e).length) : "row"in e ? n = i.fromPoints(e, e) : n = e, r = this.getFoldsInRange(n);
            if (t)this.removeFolds(r); else while (r.length)this.expandFolds(r), r = this.getFoldsInRange(n)
        }, this.isRowFolded = function (e, t) {
            return!!this.getFoldLine(e, t)
        }, this.getRowFoldEnd = function (e, t) {
            var n = this.getFoldLine(e, t);
            return n ? n.end.row : e
        }, this.getRowFoldStart = function (e, t) {
            var n = this.getFoldLine(e, t);
            return n ? n.start.row : e
        }, this.getFoldDisplayLine = function (e, t, n, r, i) {
            r == null && (r = e.start.row, i = 0), t == null && (t = e.end.row, n = this.getLine(t).length);
            var s = this.doc, o = "";
            return e.walk(function (e, t, n, u) {
                if (t < r)return;
                if (t == r) {
                    if (n < i)return;
                    u = Math.max(i, u)
                }
                e != null ? o += e : o += s.getLine(t).substring(u, n)
            }, t, n), o
        }, this.getDisplayLine = function (e, t, n, r) {
            var i = this.getFoldLine(e);
            if (!i) {
                var s;
                return s = this.doc.getLine(e), s.substring(r || 0, t || s.length)
            }
            return this.getFoldDisplayLine(i, e, t, n, r)
        }, this.$cloneFoldData = function () {
            var e = [];
            return e = this.$foldData.map(function (t) {
                var n = t.folds.map(function (e) {
                    return e.clone()
                });
                return new s(e, n)
            }), e
        }, this.toggleFold = function (e) {
            var t = this.selection, n = t.getRange(), r, i;
            if (n.isEmpty()) {
                var s = n.start;
                r = this.getFoldAt(s.row, s.column);
                if (r) {
                    this.expandFold(r);
                    return
                }
                (i = this.findMatchingBracket(s)) ? n.comparePoint(i) == 1 ? n.end = i : (n.start = i, n.start.column++, n.end.column--) : (i = this.findMatchingBracket({row: s.row, column: s.column + 1})) ? (n.comparePoint(i) == 1 ? n.end = i : n.start = i, n.start.column++) : n = this.getCommentFoldRange(s.row, s.column) || n
            } else {
                var o = this.getFoldsInRange(n);
                if (e && o.length) {
                    this.expandFolds(o);
                    return
                }
                o.length == 1 && (r = o[0])
            }
            r || (r = this.getFoldAt(n.start.row, n.start.column));
            if (r && r.range.toString() == n.toString()) {
                this.expandFold(r);
                return
            }
            var u = "...";
            if (!n.isMultiLine()) {
                u = this.getTextRange(n);
                if (u.length < 4)return;
                u = u.trim().substring(0, 2) + ".."
            }
            this.addFold(u, n)
        }, this.getCommentFoldRange = function (e, t, n) {
            var r = new u(this, e, t), s = r.getCurrentToken();
            if (s && /^comment|string/.test(s.type)) {
                var o = new i, a = new RegExp(s.type.replace(/\..*/, "\\."));
                if (n != 1) {
                    do s = r.stepBackward(); while (s && a.test(s.type));
                    r.stepForward()
                }
                o.start.row = r.getCurrentTokenRow(), o.start.column = r.getCurrentTokenColumn() + 2, r = new u(this, e, t);
                if (n != -1) {
                    do s = r.stepForward(); while (s && a.test(s.type));
                    s = r.stepBackward()
                } else s = r.getCurrentToken();
                return o.end.row = r.getCurrentTokenRow(), o.end.column = r.getCurrentTokenColumn() + s.value.length - 2, o
            }
        }, this.foldAll = function (e, t, n) {
            n == undefined && (n = 1e5);
            var r = this.foldWidgets;
            t = t || this.getLength();
            for (var i = e || 0; i < t; i++) {
                r[i] == null && (r[i] = this.getFoldWidget(i));
                if (r[i] != "start")continue;
                var s = this.getFoldWidgetRange(i);
                if (s && s.end.row <= t)try {
                    var o = this.addFold("...", s);
                    o.collapseChildren = n
                } catch (u) {
                }
                i = s.end.row
            }
        }, this.$foldStyles = {manual: 1, markbegin: 1, markbeginend: 1}, this.$foldStyle = "markbegin", this.setFoldStyle = function (e) {
            if (!this.$foldStyles[e])throw new Error("invalid fold style: " + e + "[" + Object.keys(this.$foldStyles).join(", ") + "]");
            if (this.$foldStyle == e)return;
            this.$foldStyle = e, e == "manual" && this.unfold();
            var t = this.$foldMode;
            this.$setFolding(null), this.$setFolding(t)
        }, this.$setFolding = function (e) {
            if (this.$foldMode == e)return;
            this.$foldMode = e, this.removeListener("change", this.$updateFoldWidgets), this._emit("changeAnnotation");
            if (!e || this.$foldStyle == "manual") {
                this.foldWidgets = null;
                return
            }
            this.foldWidgets = [], this.getFoldWidget = e.getFoldWidget.bind(e, this, this.$foldStyle), this.getFoldWidgetRange = e.getFoldWidgetRange.bind(e, this, this.$foldStyle), this.$updateFoldWidgets = this.updateFoldWidgets.bind(this), this.on("change", this.$updateFoldWidgets)
        }, this.getParentFoldRangeData = function (e, t) {
            var n = this.foldWidgets;
            if (!n || t && n[e])return{};
            var r = e - 1, i;
            while (r >= 0) {
                var s = n[r];
                s == null && (s = n[r] = this.getFoldWidget(r));
                if (s == "start") {
                    var o = this.getFoldWidgetRange(r);
                    i || (i = o);
                    if (o && o.end.row >= e)break
                }
                r--
            }
            return{range: r !== -1 && o, firstRange: i}
        }, this.onFoldWidgetClick = function (e, t) {
            var n = this.getFoldWidget(e), r = this.getLine(e);
            t = t.domEvent;
            var i = t.shiftKey, s = t.ctrlKey || t.metaKey, o = t.altKey, u = n === "end" ? -1 : 1, a = this.getFoldAt(e, u === -1 ? 0 : r.length, u);
            if (a) {
                i || s ? this.removeFold(a) : this.expandFold(a);
                return
            }
            var f = this.getFoldWidgetRange(e);
            if (f && !f.isMultiLine()) {
                a = this.getFoldAt(f.start.row, f.start.column, 1);
                if (a && f.isEqual(a.range)) {
                    this.removeFold(a);
                    return
                }
            }
            if (o) {
                var l = this.getParentFoldRangeData(e);
                if (l.range)var c = l.range.start.row + 1, h = l.range.end.row;
                this.foldAll(c, h, s ? 1e4 : 0)
            } else if (i) {
                var h = f ? f.end.row : this.getLength();
                this.foldAll(e + 1, f.end.row, s ? 1e4 : 0)
            } else f && (s && (f.collapseChildren = 1e4), this.addFold("...", f));
            f || ((t.target || t.srcElement).className += " ace_invalid")
        }, this.updateFoldWidgets = function (e) {
            var t = e.data, n = t.range, r = n.start.row, i = n.end.row - r;
            if (i === 0)this.foldWidgets[r] = null; else if (t.action == "removeText" || t.action == "removeLines")this.foldWidgets.splice(r, i + 1, null); else {
                var s = Array(i + 1);
                s.unshift(r, 1), this.foldWidgets.splice.apply(this.foldWidgets, s)
            }
        }
    }

    var i = e("../range").Range, s = e("./fold_line").FoldLine, o = e("./fold").Fold, u = e("../token_iterator").TokenIterator;
    t.Folding = r
}), define("ace/edit_session/fold_line", ["require", "exports", "module", "ace/range"], function (e, t, n) {
    function r(e, t) {
        this.foldData = e, Array.isArray(t) ? this.folds = t : t = this.folds = [t];
        var n = t[t.length - 1];
        this.range = new i(t[0].start.row, t[0].start.column, n.end.row, n.end.column), this.start = this.range.start, this.end = this.range.end, this.folds.forEach(function (e) {
            e.setFoldLine(this)
        }, this)
    }

    var i = e("../range").Range;
    (function () {
        this.shiftRow = function (e) {
            this.start.row += e, this.end.row += e, this.folds.forEach(function (t) {
                t.start.row += e, t.end.row += e
            })
        }, this.addFold = function (e) {
            if (e.sameRow) {
                if (e.start.row < this.startRow || e.endRow > this.endRow)throw"Can't add a fold to this FoldLine as it has no connection";
                this.folds.push(e), this.folds.sort(function (e, t) {
                    return-e.range.compareEnd(t.start.row, t.start.column)
                }), this.range.compareEnd(e.start.row, e.start.column) > 0 ? (this.end.row = e.end.row, this.end.column = e.end.column) : this.range.compareStart(e.end.row, e.end.column) < 0 && (this.start.row = e.start.row, this.start.column = e.start.column)
            } else if (e.start.row == this.end.row)this.folds.push(e), this.end.row = e.end.row, this.end.column = e.end.column; else {
                if (e.end.row != this.start.row)throw"Trying to add fold to FoldRow that doesn't have a matching row";
                this.folds.unshift(e), this.start.row = e.start.row, this.start.column = e.start.column
            }
            e.foldLine = this
        }, this.containsRow = function (e) {
            return e >= this.start.row && e <= this.end.row
        }, this.walk = function (e, t, n) {
            var r = 0, i = this.folds, s, o, u, a = !0;
            t == null && (t = this.end.row, n = this.end.column);
            for (var f = 0; f < i.length; f++) {
                s = i[f], o = s.range.compareStart(t, n);
                if (o == -1) {
                    e(null, t, n, r, a);
                    return
                }
                u = e(null, s.start.row, s.start.column, r, a), u = !u && e(s.placeholder, s.start.row, s.start.column, r);
                if (u || o == 0)return;
                a = !s.sameRow, r = s.end.column
            }
            e(null, t, n, r, a)
        }, this.getNextFoldTo = function (e, t) {
            var n, r;
            for (var i = 0; i < this.folds.length; i++) {
                n = this.folds[i], r = n.range.compareEnd(e, t);
                if (r == -1)return{fold: n, kind: "after"};
                if (r == 0)return{fold: n, kind: "inside"}
            }
            return null
        }, this.addRemoveChars = function (e, t, n) {
            var r = this.getNextFoldTo(e, t), i, s;
            if (r) {
                i = r.fold;
                if (r.kind == "inside" && i.start.column != t && i.start.row != e)window.console && window.console.log(e, t, i); else if (i.start.row == e) {
                    s = this.folds;
                    var o = s.indexOf(i);
                    o == 0 && (this.start.column += n);
                    for (o; o < s.length; o++) {
                        i = s[o], i.start.column += n;
                        if (!i.sameRow)return;
                        i.end.column += n
                    }
                    this.end.column += n
                }
            }
        }, this.split = function (e, t) {
            var n = this.getNextFoldTo(e, t).fold, i = this.folds, s = this.foldData;
            if (!n)return null;
            var o = i.indexOf(n), u = i[o - 1];
            this.end.row = u.end.row, this.end.column = u.end.column, i = i.splice(o, i.length - o);
            var a = new r(s, i);
            return s.splice(s.indexOf(this) + 1, 0, a), a
        }, this.merge = function (e) {
            var t = e.folds;
            for (var n = 0; n < t.length; n++)this.addFold(t[n]);
            var r = this.foldData;
            r.splice(r.indexOf(e), 1)
        }, this.toString = function () {
            var e = [this.range.toString() + ": ["];
            return this.folds.forEach(function (t) {
                e.push("  " + t.toString())
            }), e.push("]"), e.join("\n")
        }, this.idxToPosition = function (e) {
            var t = 0, n;
            for (var r = 0; r < this.folds.length; r++) {
                var n = this.folds[r];
                e -= n.start.column - t;
                if (e < 0)return{row: n.start.row, column: n.start.column + e};
                e -= n.placeholder.length;
                if (e < 0)return n.start;
                t = n.end.column
            }
            return{row: this.end.row, column: this.end.column + e}
        }
    }).call(r.prototype), t.FoldLine = r
}), define("ace/edit_session/fold", ["require", "exports", "module", "ace/range", "ace/range_list", "ace/lib/oop"], function (e, t, n) {
    function r(e, t) {
        e.row -= t.row, e.row == 0 && (e.column -= t.column)
    }

    function i(e, t) {
        r(e.start, t), r(e.end, t)
    }

    function s(e, t) {
        e.row == 0 && (e.column += t.column), e.row += t.row
    }

    function o(e, t) {
        s(e.start, t), s(e.end, t)
    }

    var u = e("../range").Range, a = e("../range_list").RangeList, f = e("../lib/oop"), l = t.Fold = function (e, t) {
        this.foldLine = null, this.placeholder = t, this.range = e, this.start = e.start, this.end = e.end, this.sameRow = e.start.row == e.end.row, this.subFolds = this.ranges = []
    };
    f.inherits(l, a), function () {
        this.toString = function () {
            return'"' + this.placeholder + '" ' + this.range.toString()
        }, this.setFoldLine = function (e) {
            this.foldLine = e, this.subFolds.forEach(function (t) {
                t.setFoldLine(e)
            })
        }, this.clone = function () {
            var e = this.range.clone(), t = new l(e, this.placeholder);
            return this.subFolds.forEach(function (e) {
                t.subFolds.push(e.clone())
            }), t.collapseChildren = this.collapseChildren, t
        }, this.addSubFold = function (e) {
            if (this.range.isEqual(e))return;
            if (!this.range.containsRange(e))throw"A fold can't intersect already existing fold" + e.range + this.range;
            i(e, this.start);
            var t = e.start.row, n = e.start.column;
            for (var r = 0, s = -1; r < this.subFolds.length; r++) {
                s = this.subFolds[r].range.compare(t, n);
                if (s != 1)break
            }
            var o = this.subFolds[r];
            if (s == 0)return o.addSubFold(e);
            var t = e.range.end.row, n = e.range.end.column;
            for (var u = r, s = -1; u < this.subFolds.length; u++) {
                s = this.subFolds[u].range.compare(t, n);
                if (s != 1)break
            }
            var a = this.subFolds[u];
            if (s == 0)throw"A fold can't intersect already existing fold" + e.range + this.range;
            var f = this.subFolds.splice(r, u - r, e);
            return e.setFoldLine(this.foldLine), e
        }, this.restoreRange = function (e) {
            return o(e, this.start)
        }
    }.call(l.prototype)
}), define("ace/range_list", ["require", "exports", "module", "ace/range"], function (e, t, n) {
    var r = e("./range").Range, i = r.comparePoints, s = function () {
        this.ranges = []
    };
    (function () {
        this.comparePoints = i, this.pointIndex = function (e, t, n) {
            var r = this.ranges;
            for (var s = n || 0; s < r.length; s++) {
                var o = r[s], u = i(e, o.end);
                if (u > 0)continue;
                var a = i(e, o.start);
                return u === 0 ? t && a !== 0 ? -s - 2 : s : a > 0 || a === 0 && !t ? s : -s - 1
            }
            return-s - 1
        }, this.add = function (e) {
            var t = !e.isEmpty(), n = this.pointIndex(e.start, t);
            n < 0 && (n = -n - 1);
            var r = this.pointIndex(e.end, t, n);
            return r < 0 ? r = -r - 1 : r++, this.ranges.splice(n, r - n, e)
        }, this.addList = function (e) {
            var t = [];
            for (var n = e.length; n--;)t.push.call(t, this.add(e[n]));
            return t
        }, this.substractPoint = function (e) {
            var t = this.pointIndex(e);
            if (t >= 0)return this.ranges.splice(t, 1)
        }, this.merge = function () {
            var e = [], t = this.ranges;
            t = t.sort(function (e, t) {
                return i(e.start, t.start)
            });
            var n = t[0], r;
            for (var s = 1; s < t.length; s++) {
                r = n, n = t[s];
                var o = i(r.end, n.start);
                if (o < 0)continue;
                if (o == 0 && !r.isEmpty() && !n.isEmpty())continue;
                i(r.end, n.end) < 0 && (r.end.row = n.end.row, r.end.column = n.end.column), t.splice(s, 1), e.push(n), n = r, s--
            }
            return this.ranges = t, e
        }, this.contains = function (e, t) {
            return this.pointIndex({row: e, column: t}) >= 0
        }, this.containsPoint = function (e) {
            return this.pointIndex(e) >= 0
        }, this.rangeAtPoint = function (e) {
            var t = this.pointIndex(e);
            if (t >= 0)return this.ranges[t]
        }, this.clipRows = function (e, t) {
            var n = this.ranges;
            if (n[0].start.row > t || n[n.length - 1].start.row < e)return[];
            var r = this.pointIndex({row: e, column: 0});
            r < 0 && (r = -r - 1);
            var i = this.pointIndex({row: t, column: 0}, r);
            i < 0 && (i = -i - 1);
            var s = [];
            for (var o = r; o < i; o++)s.push(n[o]);
            return s
        }, this.removeAll = function () {
            return this.ranges.splice(0, this.ranges.length)
        }, this.attach = function (e) {
            this.session && this.detach(), this.session = e, this.onChange = this.$onChange.bind(this), this.session.on("change", this.onChange)
        }, this.detach = function () {
            if (!this.session)return;
            this.session.removeListener("change", this.onChange), this.session = null
        }, this.$onChange = function (e) {
            var t = e.data.range;
            if (e.data.action[0] == "i")var n = t.start, r = t.end; else var r = t.start, n = t.end;
            var i = n.row, s = r.row, o = s - i, u = -n.column + r.column, a = this.ranges;
            for (var f = 0, l = a.length; f < l; f++) {
                var c = a[f];
                if (c.end.row < i)continue;
                if (c.start.row > i)break;
                c.start.row == i && c.start.column >= n.column && (c.start.column += u, c.start.row += o), c.end.row == i && c.end.column >= n.column && (c.end.column == n.column && u > 0 && f < l - 1 && c.end.column > c.start.column && c.end.column == a[f + 1].start.column && (c.end.column -= u), c.end.column += u, c.end.row += o)
            }
            if (o != 0 && f < l)for (; f < l; f++) {
                var c = a[f];
                c.start.row += o, c.end.row += o
            }
        }
    }).call(s.prototype), t.RangeList = s
}), define("ace/edit_session/bracket_match", ["require", "exports", "module", "ace/token_iterator", "ace/range"], function (e, t, n) {
    function r() {
        this.findMatchingBracket = function (e, t) {
            if (e.column == 0)return null;
            var n = t || this.getLine(e.row).charAt(e.column - 1);
            if (n == "")return null;
            var r = n.match(/([\(\[\{])|([\)\]\}])/);
            return r ? r[1] ? this.$findClosingBracket(r[1], e) : this.$findOpeningBracket(r[2], e) : null
        }, this.getBracketRange = function (e) {
            var t = this.getLine(e.row), n = !0, r, i = t.charAt(e.column - 1), o = i && i.match(/([\(\[\{])|([\)\]\}])/);
            o || (i = t.charAt(e.column), e = {row: e.row, column: e.column + 1}, o = i && i.match(/([\(\[\{])|([\)\]\}])/), n = !1);
            if (!o)return null;
            if (o[1]) {
                var u = this.$findClosingBracket(o[1], e);
                if (!u)return null;
                r = s.fromPoints(e, u), n || (r.end.column++, r.start.column--), r.cursor = r.end
            } else {
                var u = this.$findOpeningBracket(o[2], e);
                if (!u)return null;
                r = s.fromPoints(u, e), n || (r.start.column++, r.end.column--), r.cursor = r.start
            }
            return r
        }, this.$brackets = {")": "(", "(": ")", "]": "[", "[": "]", "{": "}", "}": "{"}, this.$findOpeningBracket = function (e, t, n) {
            var r = this.$brackets[e], s = 1, o = new i(this, t.row, t.column), u = o.getCurrentToken();
            u || (u = o.stepForward());
            if (!u)return;
            n || (n = new RegExp("(\\.?" + u.type.replace(".", "\\.").replace("rparen", ".paren") + ")+"));
            var a = t.column - o.getCurrentTokenColumn() - 2, f = u.value;
            for (; ;) {
                while (a >= 0) {
                    var l = f.charAt(a);
                    if (l == r) {
                        s -= 1;
                        if (s == 0)return{row: o.getCurrentTokenRow(), column: a + o.getCurrentTokenColumn()}
                    } else l == e && (s += 1);
                    a -= 1
                }
                do u = o.stepBackward(); while (u && !n.test(u.type));
                if (u == null)break;
                f = u.value, a = f.length - 1
            }
            return null
        }, this.$findClosingBracket = function (e, t, n) {
            var r = this.$brackets[e], s = 1, o = new i(this, t.row, t.column), u = o.getCurrentToken();
            u || (u = o.stepForward());
            if (!u)return;
            n || (n = new RegExp("(\\.?" + u.type.replace(".", "\\.").replace("lparen", ".paren") + ")+"));
            var a = t.column - o.getCurrentTokenColumn();
            for (; ;) {
                var f = u.value, l = f.length;
                while (a < l) {
                    var c = f.charAt(a);
                    if (c == r) {
                        s -= 1;
                        if (s == 0)return{row: o.getCurrentTokenRow(), column: a + o.getCurrentTokenColumn()}
                    } else c == e && (s += 1);
                    a += 1
                }
                do u = o.stepForward(); while (u && !n.test(u.type));
                if (u == null)break;
                a = 0
            }
            return null
        }
    }

    var i = e("../token_iterator").TokenIterator, s = e("../range").Range;
    t.BracketMatch = r
}), define("ace/search", ["require", "exports", "module", "ace/lib/lang", "ace/lib/oop", "ace/range"], function (e, t, n) {
    var r = e("./lib/lang"), i = e("./lib/oop"), s = e("./range").Range, o = function () {
        this.$options = {}
    };
    (function () {
        this.set = function (e) {
            return i.mixin(this.$options, e), this
        }, this.getOptions = function () {
            return r.copyObject(this.$options)
        }, this.setOptions = function (e) {
            this.$options = e
        }, this.find = function (e) {
            var t = this.$matchIterator(e, this.$options);
            if (!t)return!1;
            var n = null;
            return t.forEach(function (e, t, r) {
                if (!e.start) {
                    var i = e.offset + (r || 0);
                    n = new s(t, i, t, i + e.length)
                } else n = e;
                return!0
            }), n
        }, this.findAll = function (e) {
            var t = this.$options;
            if (!t.needle)return[];
            this.$assembleRegExp(t);
            var n = t.range, i = n ? e.getLines(n.start.row, n.end.row) : e.doc.getAllLines(), o = [], u = t.re;
            if (t.$isMultiLine) {
                var a = u.length, f = i.length - a;
                for (var l = u.offset || 0; l <= f; l++) {
                    for (var c = 0; c < a; c++)if (i[l + c].search(u[c]) == -1)break;
                    var h = i[l], p = i[l + a - 1], d = h.match(u[0])[0].length, v = p.match(u[a - 1])[0].length;
                    o.push(new s(l, h.length - d, l + a - 1, v))
                }
            } else for (var m = 0; m < i.length; m++) {
                var g = r.getMatchOffsets(i[m], u);
                for (var c = 0; c < g.length; c++) {
                    var y = g[c];
                    o.push(new s(m, y.offset, m, y.offset + y.length))
                }
            }
            if (n) {
                var b = n.start.column, w = n.start.column, m = 0, c = o.length - 1;
                while (m < c && o[m].start.column < b && o[m].start.row == n.start.row)m++;
                while (m < c && o[c].end.column > w && o[c].end.row == n.end.row)c--;
                o = o.slice(m, c + 1);
                for (m = 0, c = o.length; m < c; m++)o[m].start.row += n.start.row, o[m].end.row += n.start.row
            }
            return o
        }, this.replace = function (e, t) {
            var n = this.$options, r = this.$assembleRegExp(n);
            if (n.$isMultiLine)return t;
            if (!r)return;
            var i = r.exec(e);
            if (!i || i[0].length != e.length)return null;
            t = e.replace(r, t);
            if (n.preserveCase) {
                t = t.split("");
                for (var s = Math.min(e.length, e.length); s--;) {
                    var o = e[s];
                    o && o.toLowerCase() != o ? t[s] = t[s].toUpperCase() : t[s] = t[s].toLowerCase()
                }
                t = t.join("")
            }
            return t
        }, this.$matchIterator = function (e, t) {
            var n = this.$assembleRegExp(t);
            if (!n)return!1;
            var i = this, o, u = t.backwards;
            if (t.$isMultiLine)var a = n.length, f = function (t, r, i) {
                var u = t.search(n[0]);
                if (u == -1)return;
                for (var f = 1; f < a; f++) {
                    t = e.getLine(r + f);
                    if (t.search(n[f]) == -1)return
                }
                var l = t.match(n[a - 1])[0].length, c = new s(r, u, r + a - 1, l);
                n.offset == 1 ? (c.start.row--, c.start.column = Number.MAX_VALUE) : i && (c.start.column += i);
                if (o(c))return!0
            }; else if (u)var f = function (e, t, i) {
                var s = r.getMatchOffsets(e, n);
                for (var u = s.length - 1; u >= 0; u--)if (o(s[u], t, i))return!0
            }; else var f = function (e, t, i) {
                var s = r.getMatchOffsets(e, n);
                for (var u = 0; u < s.length; u++)if (o(s[u], t, i))return!0
            };
            return{forEach: function (n) {
                o = n, i.$lineIterator(e, t).forEach(f)
            }}
        }, this.$assembleRegExp = function (e) {
            if (e.needle instanceof RegExp)return e.re = e.needle;
            var t = e.needle;
            if (!e.needle)return e.re = !1;
            e.regExp || (t = r.escapeRegExp(t)), e.wholeWord && (t = "\\b" + t + "\\b");
            var n = e.caseSensitive ? "g" : "gi";
            e.$isMultiLine = /[\n\r]/.test(t);
            if (e.$isMultiLine)return e.re = this.$assembleMultilineRegExp(t, n);
            try {
                var i = new RegExp(t, n)
            } catch (s) {
                i = !1
            }
            return e.re = i
        }, this.$assembleMultilineRegExp = function (e, t) {
            var n = e.replace(/\r\n|\r|\n/g, "$\n^").split("\n"), r = [];
            for (var i = 0; i < n.length; i++)try {
                r.push(new RegExp(n[i], t))
            } catch (s) {
                return!1
            }
            return n[0] == "" ? (r.shift(), r.offset = 1) : r.offset = 0, r
        }, this.$lineIterator = function (e, t) {
            var n = t.backwards == 1, r = t.skipCurrent != 0, i = t.range, s = t.start;
            s || (s = i ? i[n ? "end" : "start"] : e.selection.getRange()), s.start && (s = s[r != n ? "end" : "start"]);
            var o = i ? i.start.row : 0, u = i ? i.end.row : e.getLength() - 1, a = n ? function (n) {
                var r = s.row, i = e.getLine(r).substring(0, s.column);
                if (n(i, r))return;
                for (r--; r >= o; r--)if (n(e.getLine(r), r))return;
                if (t.wrap == 0)return;
                for (r = u, o = s.row; r >= o; r--)if (n(e.getLine(r), r))return
            } : function (n) {
                var r = s.row, i = e.getLine(r).substr(s.column);
                if (n(i, r, s.column))return;
                for (r += 1; r <= u; r++)if (n(e.getLine(r), r))return;
                if (t.wrap == 0)return;
                for (r = o, u = s.row; r <= u; r++)if (n(e.getLine(r), r))return
            };
            return{forEach: a}
        }
    }).call(o.prototype), t.Search = o
}), define("ace/commands/command_manager", ["require", "exports", "module", "ace/lib/oop", "ace/keyboard/hash_handler", "ace/lib/event_emitter"], function (e, t, n) {
    var r = e("../lib/oop"), i = e("../keyboard/hash_handler").HashHandler, s = e("../lib/event_emitter").EventEmitter, o = function (e, t) {
        this.platform = e, this.commands = this.byName = {}, this.commmandKeyBinding = {}, this.addCommands(t), this.setDefaultHandler("exec", function (e) {
            return e.command.exec(e.editor, e.args || {})
        })
    };
    r.inherits(o, i), function () {
        r.implement(this, s), this.exec = function (e, t, n) {
            typeof e == "string" && (e = this.commands[e]);
            if (!e)return!1;
            if (t && t.$readOnly && !e.readOnly)return!1;
            var r = {editor: t, command: e, args: n}, i = this._emit("exec", r);
            return this._signal("afterExec", r), i === !1 ? !1 : !0
        }, this.toggleRecording = function (e) {
            if (this.$inReplay)return;
            return e && e._emit("changeStatus"), this.recording ? (this.macro.pop(), this.removeEventListener("exec", this.$addCommandToMacro), this.macro.length || (this.macro = this.oldMacro), this.recording = !1) : (this.$addCommandToMacro || (this.$addCommandToMacro = function (e) {
                this.macro.push([e.command, e.args])
            }.bind(this)), this.oldMacro = this.macro, this.macro = [], this.on("exec", this.$addCommandToMacro), this.recording = !0)
        }, this.replay = function (e) {
            if (this.$inReplay || !this.macro)return;
            if (this.recording)return this.toggleRecording(e);
            try {
                this.$inReplay = !0, this.macro.forEach(function (t) {
                    typeof t == "string" ? this.exec(t, e) : this.exec(t[0], e, t[1])
                }, this)
            } finally {
                this.$inReplay = !1
            }
        }, this.trimMacro = function (e) {
            return e.map(function (e) {
                return typeof e[0] != "string" && (e[0] = e[0].name), e[1] || (e = e[0]), e
            })
        }
    }.call(o.prototype), t.CommandManager = o
}), define("ace/keyboard/hash_handler", ["require", "exports", "module", "ace/lib/keys", "ace/lib/useragent"], function (e, t, n) {
    function r(e, t) {
        this.platform = t || (s.isMac ? "mac" : "win"), this.commands = {}, this.commmandKeyBinding = {}, this.addCommands(e)
    }

    var i = e("../lib/keys"), s = e("../lib/useragent");
    (function () {
        this.addCommand = function (e) {
            this.commands[e.name] && this.removeCommand(e), this.commands[e.name] = e, e.bindKey && this._buildKeyHash(e)
        }, this.removeCommand = function (e) {
            var t = typeof e == "string" ? e : e.name;
            e = this.commands[t], delete this.commands[t];
            var n = this.commmandKeyBinding;
            for (var r in n)for (var i in n[r])n[r][i] == e && delete n[r][i]
        }, this.bindKey = function (e, t) {
            if (!e)return;
            if (typeof t == "function") {
                this.addCommand({exec: t, bindKey: e, name: t.name || e});
                return
            }
            var n = this.commmandKeyBinding;
            e.split("|").forEach(function (e) {
                var r = this.parseKeys(e, t), i = r.hashId;
                (n[i] || (n[i] = {}))[r.key] = t
            }, this)
        }, this.addCommands = function (e) {
            e && Object.keys(e).forEach(function (t) {
                var n = e[t];
                if (typeof n == "string")return this.bindKey(n, t);
                typeof n == "function" && (n = {exec: n}), n.name || (n.name = t), this.addCommand(n)
            }, this)
        }, this.removeCommands = function (e) {
            Object.keys(e).forEach(function (t) {
                this.removeCommand(e[t])
            }, this)
        }, this.bindKeys = function (e) {
            Object.keys(e).forEach(function (t) {
                this.bindKey(t, e[t])
            }, this)
        }, this._buildKeyHash = function (e) {
            var t = e.bindKey;
            if (!t)return;
            var n = typeof t == "string" ? t : t[this.platform];
            this.bindKey(n, e)
        }, this.parseKeys = function (e) {
            e.indexOf(" ") != -1 && (e = e.split(/\s+/).pop());
            var t = e.toLowerCase().split(/[\-\+]([\-\+])?/).filter(function (e) {
                return e
            }), n = t.pop(), r = i[n];
            if (i.FUNCTION_KEYS[r])n = i.FUNCTION_KEYS[r].toLowerCase(); else {
                if (!t.length)return{key: n, hashId: -1};
                if (t.length == 1 && t[0] == "shift")return{key: n.toUpperCase(), hashId: -1}
            }
            var s = 0;
            for (var o = t.length; o--;) {
                var u = i.KEY_MODS[t[o]];
                if (u == null)return typeof console != "undefined" && console.error("invalid modifier " + t[o] + " in " + e), !1;
                s |= u
            }
            return{key: n, hashId: s}
        }, this.findKeyCommand = function (e, t) {
            var n = this.commmandKeyBinding;
            return n[e] && n[e][t]
        }, this.handleKeyboard = function (e, t, n, r) {
            return{command: this.findKeyCommand(t, n)}
        }
    }).call(r.prototype), t.HashHandler = r
}), define("ace/commands/default_commands", ["require", "exports", "module", "ace/lib/lang", "ace/config"], function (e, t, n) {
    function r(e, t) {
        return{win: e, mac: t}
    }

    var i = e("../lib/lang"), s = e("../config");
    t.commands = [
        {name: "showSettingsMenu", bindKey: r("Ctrl-,", "Command-,"), exec: function (e) {
            s.loadModule("ace/ext/settings_menu", function (t) {
                t.init(e), e.showSettingsMenu()
            })
        }, readOnly: !0},
        {name: "selectall", bindKey: r("Ctrl-A", "Command-A"), exec: function (e) {
            e.selectAll()
        }, readOnly: !0},
        {name: "centerselection", bindKey: r(null, "Ctrl-L"), exec: function (e) {
            e.centerSelection()
        }, readOnly: !0},
        {name: "gotoline", bindKey: r("Ctrl-L", "Command-L"), exec: function (e) {
            var t = parseInt(prompt("Enter line number:"), 10);
            isNaN(t) || e.gotoLine
                (t)
        }, readOnly: !0},
        {name: "fold", bindKey: r("Alt-L|Ctrl-F1", "Command-Alt-L|Command-F1"), exec: function (e) {
            e.session.toggleFold(!1)
        }, readOnly: !0},
        {name: "unfold", bindKey: r("Alt-Shift-L|Ctrl-Shift-F1", "Command-Alt-Shift-L|Command-Shift-F1"), exec: function (e) {
            e.session.toggleFold(!0)
        }, readOnly: !0},
        {name: "foldall", bindKey: r("Alt-0", "Command-Option-0"), exec: function (e) {
            e.session.foldAll()
        }, readOnly: !0},
        {name: "unfoldall", bindKey: r("Alt-Shift-0", "Command-Option-Shift-0"), exec: function (e) {
            e.session.unfold()
        }, readOnly: !0},
        {name: "findnext", bindKey: r("Ctrl-K", "Command-G"), exec: function (e) {
            e.findNext()
        }, readOnly: !0},
        {name: "findprevious", bindKey: r("Ctrl-Shift-K", "Command-Shift-G"), exec: function (e) {
            e.findPrevious()
        }, readOnly: !0},
        {name: "find", bindKey: r("Ctrl-F", "Command-F"), exec: function (e) {
            s.loadModule("ace/ext/searchbox", function (t) {
                t.Search(e)
            })
        }, readOnly: !0},
        {name: "overwrite", bindKey: "Insert", exec: function (e) {
            e.toggleOverwrite()
        }, readOnly: !0},
        {name: "selecttostart", bindKey: r("Ctrl-Shift-Home", "Command-Shift-Up"), exec: function (e) {
            e.getSelection().selectFileStart()
        }, multiSelectAction: "forEach", readOnly: !0},
        {name: "gotostart", bindKey: r("Ctrl-Home", "Command-Home|Command-Up"), exec: function (e) {
            e.navigateFileStart()
        }, multiSelectAction: "forEach", readOnly: !0},
        {name: "selectup", bindKey: r("Shift-Up", "Shift-Up"), exec: function (e) {
            e.getSelection().selectUp()
        }, multiSelectAction: "forEach", readOnly: !0},
        {name: "golineup", bindKey: r("Up", "Up|Ctrl-P"), exec: function (e, t) {
            e.navigateUp(t.times)
        }, multiSelectAction: "forEach", readOnly: !0},
        {name: "selecttoend", bindKey: r("Ctrl-Shift-End", "Command-Shift-Down"), exec: function (e) {
            e.getSelection().selectFileEnd()
        }, multiSelectAction: "forEach", readOnly: !0},
        {name: "gotoend", bindKey: r("Ctrl-End", "Command-End|Command-Down"), exec: function (e) {
            e.navigateFileEnd()
        }, multiSelectAction: "forEach", readOnly: !0},
        {name: "selectdown", bindKey: r("Shift-Down", "Shift-Down"), exec: function (e) {
            e.getSelection().selectDown()
        }, multiSelectAction: "forEach", readOnly: !0},
        {name: "golinedown", bindKey: r("Down", "Down|Ctrl-N"), exec: function (e, t) {
            e.navigateDown(t.times)
        }, multiSelectAction: "forEach", readOnly: !0},
        {name: "selectwordleft", bindKey: r("Ctrl-Shift-Left", "Option-Shift-Left"), exec: function (e) {
            e.getSelection().selectWordLeft()
        }, multiSelectAction: "forEach", readOnly: !0},
        {name: "gotowordleft", bindKey: r("Ctrl-Left", "Option-Left"), exec: function (e) {
            e.navigateWordLeft()
        }, multiSelectAction: "forEach", readOnly: !0},
        {name: "selecttolinestart", bindKey: r("Alt-Shift-Left", "Command-Shift-Left"), exec: function (e) {
            e.getSelection().selectLineStart()
        }, multiSelectAction: "forEach", readOnly: !0},
        {name: "gotolinestart", bindKey: r("Alt-Left|Home", "Command-Left|Home|Ctrl-A"), exec: function (e) {
            e.navigateLineStart()
        }, multiSelectAction: "forEach", readOnly: !0},
        {name: "selectleft", bindKey: r("Shift-Left", "Shift-Left"), exec: function (e) {
            e.getSelection().selectLeft()
        }, multiSelectAction: "forEach", readOnly: !0},
        {name: "gotoleft", bindKey: r("Left", "Left|Ctrl-B"), exec: function (e, t) {
            e.navigateLeft(t.times)
        }, multiSelectAction: "forEach", readOnly: !0},
        {name: "selectwordright", bindKey: r("Ctrl-Shift-Right", "Option-Shift-Right"), exec: function (e) {
            e.getSelection().selectWordRight()
        }, multiSelectAction: "forEach", readOnly: !0},
        {name: "gotowordright", bindKey: r("Ctrl-Right", "Option-Right"), exec: function (e) {
            e.navigateWordRight()
        }, multiSelectAction: "forEach", readOnly: !0},
        {name: "selecttolineend", bindKey: r("Alt-Shift-Right", "Command-Shift-Right"), exec: function (e) {
            e.getSelection().selectLineEnd()
        }, multiSelectAction: "forEach", readOnly: !0},
        {name: "gotolineend", bindKey: r("Alt-Right|End", "Command-Right|End|Ctrl-E"), exec: function (e) {
            e.navigateLineEnd()
        }, multiSelectAction: "forEach", readOnly: !0},
        {name: "selectright", bindKey: r("Shift-Right", "Shift-Right"), exec: function (e) {
            e.getSelection().selectRight()
        }, multiSelectAction: "forEach", readOnly: !0},
        {name: "gotoright", bindKey: r("Right", "Right|Ctrl-F"), exec: function (e, t) {
            e.navigateRight(t.times)
        }, multiSelectAction: "forEach", readOnly: !0},
        {name: "selectpagedown", bindKey: "Shift-PageDown", exec: function (e) {
            e.selectPageDown()
        }, readOnly: !0},
        {name: "pagedown", bindKey: r(null, "Option-PageDown"), exec: function (e) {
            e.scrollPageDown()
        }, readOnly: !0},
        {name: "gotopagedown", bindKey: r("PageDown", "PageDown|Ctrl-V"), exec: function (e) {
            e.gotoPageDown()
        }, readOnly: !0},
        {name: "selectpageup", bindKey: "Shift-PageUp", exec: function (e) {
            e.selectPageUp()
        }, readOnly: !0},
        {name: "pageup", bindKey: r(null, "Option-PageUp"), exec: function (e) {
            e.scrollPageUp()
        }, readOnly: !0},
        {name: "gotopageup", bindKey: "PageUp", exec: function (e) {
            e.gotoPageUp()
        }, readOnly: !0},
        {name: "scrollup", bindKey: r("Ctrl-Up", null), exec: function (e) {
            e.renderer.scrollBy(0, -2 * e.renderer.layerConfig.lineHeight)
        }, readOnly: !0},
        {name: "scrolldown", bindKey: r("Ctrl-Down", null), exec: function (e) {
            e.renderer.scrollBy(0, 2 * e.renderer.layerConfig.lineHeight)
        }, readOnly: !0},
        {name: "selectlinestart", bindKey: "Shift-Home", exec: function (e) {
            e.getSelection().selectLineStart()
        }, multiSelectAction: "forEach", readOnly: !0},
        {name: "selectlineend", bindKey: "Shift-End", exec: function (e) {
            e.getSelection().selectLineEnd()
        }, multiSelectAction: "forEach", readOnly: !0},
        {name: "togglerecording", bindKey: r("Ctrl-Alt-E", "Command-Option-E"), exec: function (e) {
            e.commands.toggleRecording(e)
        }, readOnly: !0},
        {name: "replaymacro", bindKey: r("Ctrl-Shift-E", "Command-Shift-E"), exec: function (e) {
            e.commands.replay(e)
        }, readOnly: !0},
        {name: "jumptomatching", bindKey: r("Ctrl-P", "Ctrl-Shift-P"), exec: function (e) {
            e.jumpToMatching()
        }, multiSelectAction: "forEach", readOnly: !0},
        {name: "selecttomatching", bindKey: r("Ctrl-Shift-P", null), exec: function (e) {
            e.jumpToMatching(!0)
        }, multiSelectAction: "forEach", readOnly: !0},
        {name: "cut", exec: function (e) {
            var t = e.getSelectionRange();
            e._emit("cut", t), e.selection.isEmpty() || (e.session.remove(t), e.clearSelection())
        }, multiSelectAction: "forEach"},
        {name: "removeline", bindKey: r("Ctrl-D", "Command-D"), exec: function (e) {
            e.removeLines()
        }, multiSelectAction: "forEachLine"},
        {name: "duplicateSelection", bindKey: r("Ctrl-Shift-D", "Command-Shift-D"), exec: function (e) {
            e.duplicateSelection()
        }, multiSelectAction: "forEach"},
        {name: "sortlines", bindKey: r("Ctrl-Alt-S", "Command-Alt-S"), exec: function (e) {
            e.sortLines()
        }, multiSelectAction: "forEachLine"},
        {name: "togglecomment", bindKey: r("Ctrl-/", "Command-/"), exec: function (e) {
            e.toggleCommentLines()
        }, multiSelectAction: "forEachLine"},
        {name: "toggleBlockComment", bindKey: r("Ctrl-Shift-/", "Command-Shift-/"), exec: function (e) {
            e.toggleBlockComment()
        }, multiSelectAction: "forEach"},
        {name: "modifyNumberUp", bindKey: r("Ctrl-Shift-Up", "Alt-Shift-Up"), exec: function (e) {
            e.modifyNumber(1)
        }, multiSelectAction: "forEach"},
        {name: "modifyNumberDown", bindKey: r("Ctrl-Shift-Down", "Alt-Shift-Down"), exec: function (e) {
            e.modifyNumber(-1)
        }, multiSelectAction: "forEach"},
        {name: "replace", bindKey: r("Ctrl-H", "Command-Option-F"), exec: function (e) {
            s.loadModule("ace/ext/searchbox", function (t) {
                t.Search(e, !0)
            })
        }},
        {name: "undo", bindKey: r("Ctrl-Z", "Command-Z"), exec: function (e) {
            e.undo()
        }},
        {name: "redo", bindKey: r("Ctrl-Shift-Z|Ctrl-Y", "Command-Shift-Z|Command-Y"), exec: function (e) {
            e.redo()
        }},
        {name: "copylinesup", bindKey: r("Alt-Shift-Up", "Command-Option-Up"), exec: function (e) {
            e.copyLinesUp()
        }},
        {name: "movelinesup", bindKey: r("Alt-Up", "Option-Up"), exec: function (e) {
            e.moveLinesUp()
        }},
        {name: "copylinesdown", bindKey: r("Alt-Shift-Down", "Command-Option-Down"), exec: function (e) {
            e.copyLinesDown()
        }},
        {name: "movelinesdown", bindKey: r("Alt-Down", "Option-Down"), exec: function (e) {
            e.moveLinesDown()
        }},
        {name: "del", bindKey: r("Delete", "Delete|Ctrl-D"), exec: function (e) {
            e.remove("right")
        }, multiSelectAction: "forEach"},
        {name: "backspace", bindKey: r("Command-Backspace|Option-Backspace|Shift-Backspace|Backspace", "Ctrl-Backspace|Command-Backspace|Shift-Backspace|Backspace|Ctrl-H"), exec: function (e) {
            e.remove("left")
        }, multiSelectAction: "forEach"},
        {name: "removetolinestart", bindKey: r("Alt-Backspace", "Command-Backspace"), exec: function (e) {
            e.removeToLineStart()
        }, multiSelectAction: "forEach"},
        {name: "removetolineend", bindKey: r("Alt-Delete", "Ctrl-K"), exec: function (e) {
            e.removeToLineEnd()
        }, multiSelectAction: "forEach"},
        {name: "removewordleft", bindKey: r("Ctrl-Backspace", "Alt-Backspace|Ctrl-Alt-Backspace"), exec: function (e) {
            e.removeWordLeft()
        }, multiSelectAction: "forEach"},
        {name: "removewordright", bindKey: r("Ctrl-Delete", "Alt-Delete"), exec: function (e) {
            e.removeWordRight()
        }, multiSelectAction: "forEach"},
        {name: "outdent", bindKey: r("Shift-Tab", "Shift-Tab"), exec: function (e) {
            e.blockOutdent()
        }, multiSelectAction: "forEach"},
        {name: "indent", bindKey: r("Tab", "Tab"), exec: function (e) {
            e.indent()
        }, multiSelectAction: "forEach"},
        {name: "blockoutdent", bindKey: r("Ctrl-[", "Ctrl-["), exec: function (e) {
            e.blockOutdent()
        }, multiSelectAction: "forEachLine"},
        {name: "blockindent", bindKey: r("Ctrl-]", "Ctrl-]"), exec: function (e) {
            e.blockIndent()
        }, multiSelectAction: "forEachLine"},
        {name: "insertstring", exec: function (e, t) {
            e.insert(t)
        }, multiSelectAction: "forEach"},
        {name: "inserttext", exec: function (e, t) {
            e.insert(i.stringRepeat(t.text || "", t.times || 1))
        }, multiSelectAction: "forEach"},
        {name: "splitline", bindKey: r(null, "Ctrl-O"), exec: function (e) {
            e.splitLine()
        }, multiSelectAction: "forEach"},
        {name: "transposeletters", bindKey: r("Ctrl-T", "Ctrl-T"), exec: function (e) {
            e.transposeLetters()
        }, multiSelectAction: function (e) {
            e.transposeSelections(1)
        }},
        {name: "touppercase", bindKey: r("Ctrl-U", "Ctrl-U"), exec: function (e) {
            e.toUpperCase()
        }, multiSelectAction: "forEach"},
        {name: "tolowercase", bindKey: r("Ctrl-Shift-U", "Ctrl-Shift-U"), exec: function (e) {
            e.toLowerCase()
        }, multiSelectAction: "forEach"}
    ]
}), define("ace/undomanager", ["require", "exports", "module"], function (e, t, n) {
    var r = function () {
        this.reset()
    };
    (function () {
        this.execute = function (e) {
            var t = e.args[0];
            this.$doc = e.args[1], this.$undoStack.push(t), this.$redoStack = []
        }, this.undo = function (e) {
            var t = this.$undoStack.pop(), n = null;
            return t && (n = this.$doc.undoChanges(t, e), this.$redoStack.push(t)), n
        }, this.redo = function (e) {
            var t = this.$redoStack.pop(), n = null;
            return t && (n = this.$doc.redoChanges(t, e), this.$undoStack.push(t)), n
        }, this.reset = function () {
            this.$undoStack = [], this.$redoStack = []
        }, this.hasUndo = function () {
            return this.$undoStack.length > 0
        }, this.hasRedo = function () {
            return this.$redoStack.length > 0
        }
    }).call(r.prototype), t.UndoManager = r
}), define("ace/virtual_renderer", ["require", "exports", "module", "ace/lib/oop", "ace/lib/dom", "ace/lib/event", "ace/lib/useragent", "ace/config", "ace/layer/gutter", "ace/layer/marker", "ace/layer/text", "ace/layer/cursor", "ace/scrollbar", "ace/renderloop", "ace/lib/event_emitter"], function (e, t, n) {
    var r = e("./lib/oop"), i = e("./lib/dom"), s = e("./lib/event"), o = e("./lib/useragent"), u = e("./config"), a = e("./layer/gutter").Gutter, f = e("./layer/marker").Marker, l = e("./layer/text").Text, c = e("./layer/cursor").Cursor, h = e("./scrollbar").ScrollBar, p = e("./renderloop").RenderLoop, d = e("./lib/event_emitter").EventEmitter, v = ".ace_editor {position: relative;overflow: hidden;font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', 'Consolas', 'source-code-pro', monospace;font-size: 12px;line-height: normal;}.ace_scroller {position: absolute;overflow: hidden;top: 0;bottom: 0;}.ace_content {position: absolute;-moz-box-sizing: border-box;-webkit-box-sizing: border-box;box-sizing: border-box;cursor: text;}.ace_gutter {position: absolute;overflow : hidden;width: auto;top: 0;bottom: 0;left: 0;cursor: default;z-index: 4;}.ace_gutter-active-line {position: absolute;left: 0;right: 0;}.ace_scroller.ace_scroll-left {box-shadow: 17px 0 16px -16px rgba(0, 0, 0, 0.4) inset;}.ace_gutter-cell {padding-left: 19px;padding-right: 6px;background-repeat: no-repeat;}.ace_gutter-cell.ace_error {background-image: url(\"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMC1jMDYwIDYxLjEzNDc3NywgMjAxMC8wMi8xMi0xNzozMjowMCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNSBNYWNpbnRvc2giIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6QUM2OEZDQTQ4RTU0MTFFMUEzM0VFRTM2RUY1M0RBMjYiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6QUM2OEZDQTU4RTU0MTFFMUEzM0VFRTM2RUY1M0RBMjYiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDpBQzY4RkNBMjhFNTQxMUUxQTMzRUVFMzZFRjUzREEyNiIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDpBQzY4RkNBMzhFNTQxMUUxQTMzRUVFMzZFRjUzREEyNiIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PkgXxbAAAAJbSURBVHjapFNNaBNBFH4zs5vdZLP5sQmNpT82QY209heh1ioWisaDRcSKF0WKJ0GQnrzrxasHsR6EnlrwD0TagxJabaVEpFYxLWlLSS822tr87m66ccfd2GKyVhA6MMybgfe97/vmPUQphd0sZjto9XIn9OOsvlu2nkqRzVU+6vvlzPf8W6bk8dxQ0NPbxAALgCgg2JkaQuhzQau/El0zbmUA7U0Es8v2CiYmKQJHGO1QICCLoqilMhkmurDAyapKgqItezi/USRdJqEYY4D5jCy03ht2yMkkvL91jTTX10qzyyu2hruPRN7jgbH+EOsXcMLgYiThEgAMhABW85oqy1DXdRIdvP1AHJ2acQXvDIrVHcdQNrEKNYSVMSZGMjEzIIAwDXIo+6G/FxcGnzkC3T2oMhLjre49sBB+RRcHLqdafK6sYdE/GGBwU1VpFNj0aN8pJbe+BkZyevUrvLl6Xmm0W9IuTc0DxrDNAJd5oEvI/KRsNC3bQyNjPO9yQ1YHcfj2QvfQc/5TUhJTBc2iM0U7AWDQtc1nJHvD/cfO2s7jaGkiTEfa/Ep8coLu7zmNmh8+dc5lZDuUeFAGUNA/OY6JVaypQ0vjr7XYjUvJM37vt+j1vuTK5DgVfVUoTjVe+y3/LxMxY2GgU+CSLy4cpfsYorRXuXIOi0Vt40h67uZFTdIo6nLaZcwUJWAzwNS0tBnqqKzQDnjdG/iPyZxo46HaKUpbvYkj8qYRTZsBhge+JHhZyh0x9b95JqjVJkT084kZIPwu/mPWqPgfQ5jXh2+92Ay7HedfAgwA6KDWafb4w3cAAAAASUVORK5CYII=\");background-repeat: no-repeat;background-position: 2px center;}.ace_gutter-cell.ace_warning {background-image: url(\"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMC1jMDYwIDYxLjEzNDc3NywgMjAxMC8wMi8xMi0xNzozMjowMCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNSBNYWNpbnRvc2giIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6QUM2OEZDQTg4RTU0MTFFMUEzM0VFRTM2RUY1M0RBMjYiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6QUM2OEZDQTk4RTU0MTFFMUEzM0VFRTM2RUY1M0RBMjYiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDpBQzY4RkNBNjhFNTQxMUUxQTMzRUVFMzZFRjUzREEyNiIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDpBQzY4RkNBNzhFNTQxMUUxQTMzRUVFMzZFRjUzREEyNiIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/Pgd7PfIAAAGmSURBVHjaYvr//z8DJZiJgUIANoCRkREb9gLiSVAaQx4OQM7AAkwd7XU2/v++/rOttdYGEB9dASEvOMydGKfH8Gv/p4XTkvRBfLxeQAP+1cUhXopyvzhP7P/IoSj7g7Mw09cNKO6J1QQ0L4gICPIv/veg/8W+JdFvQNLHVsW9/nmn9zk7B+cCkDwhL7gt6knSZnx9/LuCEOcvkIAMP+cvto9nfqyZmmUAksfnBUtbM60gX/3/kgyv3/xSFOL5DZT+L8vP+Yfh5cvfPvp/xUHyQHXGyAYwgpwBjZYFT3Y1OEl/OfCH4ffv3wzc4iwMvNIsDJ+f/mH4+vIPAxsb631WW0Yln6ZpQLXdMK/DXGDflh+sIv37EivD5x//Gb7+YWT4y86sl7BCCkSD+Z++/1dkvsFRl+HnD1Rvje4F8whjMXmGj58YGf5zsDMwcnAwfPvKcml62DsQDeaDxN+/Y0qwlpEHqrdB94IRNIDUgfgfKJChGK4OikEW3gTiXUB950ASLFAF54AC94A0G9QAfOnmF9DCDzABFqS08IHYDIScdijOjQABBgC+/9awBH96jwAAAABJRU5ErkJggg==\");background-position: 2px center;}.ace_gutter-cell.ace_info {background-image: url(\"data:image/gif;base64,R0lGODlhEAAQAMQAAAAAAEFBQVJSUl5eXmRkZGtra39/f4WFhYmJiZGRkaampry8vMPDw8zMzNXV1dzc3OTk5Orq6vDw8P///wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAkAABQALAAAAAAQABAAAAUuICWOZGmeaBml5XGwFCQSBGyXRSAwtqQIiRuiwIM5BoYVbEFIyGCQoeJGrVptIQA7\");background-position: 2px center;}.ace_dark .ace_gutter-cell.ace_info {background-image: url(\"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyRpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoTWFjaW50b3NoKSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDpGRTk5MTVGREIxNDkxMUUxOTc5Q0FFREQyMTNGMjBFQyIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDpGRTk5MTVGRUIxNDkxMUUxOTc5Q0FFREQyMTNGMjBFQyI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOkZFOTkxNUZCQjE0OTExRTE5NzlDQUVERDIxM0YyMEVDIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOkZFOTkxNUZDQjE0OTExRTE5NzlDQUVERDIxM0YyMEVDIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+SIDkjAAAAJ1JREFUeNpi/P//PwMlgImBQkB7A6qrq/+DMC55FkIGKCoq4pVnpFkgTp069f/+/fv/r1u37r+tre1/kg0A+ptn9uzZYLaRkRHpLvjw4cNXWVlZhufPnzOcO3eOdAO0tbVPAjHDmzdvGA4fPsxIsgGSkpJmv379Ynj37h2DjIyMCMkG3LhxQ/T27dsMampqDHZ2dq/pH41DxwCAAAMAFdc68dUsFZgAAAAASUVORK5CYII=\");}.ace_scrollbar {position: absolute;overflow-x: hidden;overflow-y: scroll;right: 0;top: 0;bottom: 0;}.ace_scrollbar-inner {position: absolute;width: 1px;left: 0;}.ace_print-margin {position: absolute;height: 100%;}.ace_text-input {position: absolute;z-index: 0;width: 0.5em;height: 1em;opacity: 0;background: transparent;-moz-appearance: none;appearance: none;border: none;resize: none;outline: none;overflow: hidden;font: inherit;padding: 0 1px;margin: 0 -1px;}.ace_text-input.ace_composition {background: #f8f8f8;color: #111;z-index: 1000;opacity: 1;}.ace_layer {z-index: 1;position: absolute;overflow: hidden;white-space: nowrap;height: 100%;width: 100%;-moz-box-sizing: border-box;-webkit-box-sizing: border-box;box-sizing: border-box;/* setting pointer-events: auto; on node under the mouse, which changesduring scroll, will break mouse wheel scrolling in Safari */pointer-events: none;}.ace_gutter-layer {position: relative;width: auto;text-align: right;pointer-events: auto;}.ace_text-layer {color: black;font: inherit !important;}.ace_cjk {display: inline-block;text-align: center;}.ace_cursor-layer {z-index: 4;}.ace_cursor {z-index: 4;position: absolute;-moz-box-sizing: border-box;-webkit-box-sizing: border-box;box-sizing: border-box;}.ace_hidden-cursors .ace_cursor {opacity: 0.2;}.ace_smooth-blinking .ace_cursor {-moz-transition: opacity 0.18s;-webkit-transition: opacity 0.18s;-o-transition: opacity 0.18s;-ms-transition: opacity 0.18s;transition: opacity 0.18s;}.ace_cursor[style*=\"opacity: 0\"]{-ms-filter: \"progid:DXImageTransform.Microsoft.Alpha(Opacity=0)\";}.ace_editor.ace_multiselect .ace_cursor {border-left-width: 1px;}.ace_line {white-space: nowrap;}.ace_marker-layer .ace_step {position: absolute;z-index: 3;}.ace_marker-layer .ace_selection {position: absolute;z-index: 5;}.ace_marker-layer .ace_bracket {position: absolute;z-index: 6;}.ace_marker-layer .ace_active-line {position: absolute;z-index: 2;}.ace_marker-layer .ace_selected-word {position: absolute;z-index: 4;-moz-box-sizing: border-box;-webkit-box-sizing: border-box;box-sizing: border-box;}.ace_line .ace_fold {-moz-box-sizing: border-box;-webkit-box-sizing: border-box;box-sizing: border-box;display: inline-block;height: 11px;margin-top: -2px;vertical-align: middle;background-image:url(\"data:image/png,%89PNG%0D%0A%1A%0A%00%00%00%0DIHDR%00%00%00%11%00%00%00%09%08%06%00%00%00%D4%E8%C7%0C%00%00%03%1EiCCPICC%20Profile%00%00x%01%85T%DFk%D3P%14%FE%DAe%9D%B0%E1%8B%3Ag%11%09%3Eh%91ndStC%9C%B6kW%BA%CDZ%EA6%B7!H%9B%A6m%5C%9A%C6%24%ED~%B0%07%D9%8Bo%3A%C5w%F1%07%3E%F9%07%0C%D9%83o%7B%92%0D%C6%14a%F8%AC%88%22L%F6%22%B3%9E%9B4M'S%03%B9%F7%BB%DF%F9%EE9'%E7%E4%5E%A0%F9qZ%D3%14%2F%0F%14USO%C5%C2%FC%C4%E4%14%DF%F2%01%5E%1CC%2B%FChM%8B%86%16J%26G%40%0F%D3%B2y%EF%B3%F3%0E%1E%C6lt%EEo%DF%AB%FEc%D5%9A%95%0C%11%F0%1C%20%BE%945%C4%22%E1Y%A0i%5C%D4t%13%E0%D6%89%EF%9D15%C2%CDLsX%A7%04%09%1Fg8oc%81%E1%8C%8D%23%96f45%40%9A%09%C2%07%C5B%3AK%B8%408%98i%E0%F3%0D%D8%CE%81%14%E4'%26%A9%92.%8B%3C%ABER%2F%E5dE%B2%0C%F6%F0%1Fs%83%F2_%B0%A8%94%E9%9B%AD%E7%10%8Dm%9A%19N%D1%7C%8A%DE%1F9%7Dp%8C%E6%00%D5%C1%3F_%18%BDA%B8%9DpX6%E3%A35~B%CD%24%AE%11%26%BD%E7%EEti%98%EDe%9A%97Y)%12%25%1C%24%BCbT%AE3li%E6%0B%03%89%9A%E6%D3%ED%F4P%92%B0%9F4%BF43Y%F3%E3%EDP%95%04%EB1%C5%F5%F6KF%F4%BA%BD%D7%DB%91%93%07%E35%3E%A7)%D6%7F%40%FE%BD%F7%F5r%8A%E5y%92%F0%EB%B4%1E%8D%D5%F4%5B%92%3AV%DB%DB%E4%CD%A6%23%C3%C4wQ%3F%03HB%82%8E%1Cd(%E0%91B%0Ca%9Ac%C4%AA%F8L%16%19%22J%A4%D2itTy%B28%D6%3B(%93%96%ED%1CGx%C9_%0E%B8%5E%16%F5%5B%B2%B8%F6%E0%FB%9E%DD%25%D7%8E%BC%15%85%C5%B7%A3%D8Q%ED%B5%81%E9%BA%B2%13%9A%1B%7Fua%A5%A3n%E17%B9%E5%9B%1Bm%AB%0B%08Q%FE%8A%E5%B1H%5Ee%CAO%82Q%D7u6%E6%90S%97%FCu%0B%CF2%94%EE%25v%12X%0C%BA%AC%F0%5E%F8*l%0AO%85%17%C2%97%BF%D4%C8%CE%DE%AD%11%CB%80q%2C%3E%AB%9ES%CD%C6%EC%25%D2L%D2%EBd%B8%BF%8A%F5B%C6%18%F9%901CZ%9D%BE%24M%9C%8A9%F2%DAP%0B'%06w%82%EB%E6%E2%5C%2F%D7%07%9E%BB%CC%5D%E1%FA%B9%08%AD.r%23%8E%C2%17%F5E%7C!%F0%BE3%BE%3E_%B7o%88a%A7%DB%BE%D3d%EB%A31Z%EB%BB%D3%91%BA%A2%B1z%94%8F%DB'%F6%3D%8E%AA%13%19%B2%B1%BE%B1~V%08%2B%B4%A2cjJ%B3tO%00%03%25mN%97%F3%05%93%EF%11%84%0B%7C%88%AE-%89%8F%ABbW%90O%2B%0Ao%99%0C%5E%97%0CI%AFH%D9.%B0%3B%8F%ED%03%B6S%D6%5D%E6i_s9%F3*p%E9%1B%FD%C3%EB.7U%06%5E%19%C0%D1s.%17%A03u%E4%09%B0%7C%5E%2C%EB%15%DB%1F%3C%9E%B7%80%91%3B%DBc%AD%3Dma%BA%8B%3EV%AB%DBt.%5B%1E%01%BB%0F%AB%D5%9F%CF%AA%D5%DD%E7%E4%7F%0Bx%A3%FC%06%A9%23%0A%D6%C2%A1_2%00%00%00%09pHYs%00%00%0B%13%00%00%0B%13%01%00%9A%9C%18%00%00%00%B5IDAT(%15%A5%91%3D%0E%02!%10%85ac%E1%05%D6%CE%D6%C6%CE%D2%E8%ED%CD%DE%C0%C6%D6N.%E0V%F8%3D%9Ca%891XH%C2%BE%D9y%3F%90!%E6%9C%C3%BFk%E5%011%C6-%F5%C8N%04%DF%BD%FF%89%DFt%83DN%60%3E%F3%AB%A0%DE%1A%5Dg%BE%10Q%97%1B%40%9C%A8o%10%8F%5E%828%B4%1B%60%87%F6%02%26%85%1Ch%1E%C1%2B%5Bk%FF%86%EE%B7j%09%9A%DA%9B%ACe%A3%F9%EC%DA!9%B4%D5%A6%81%86%86%98%CC%3C%5B%40%FA%81%B3%E9%CB%23%94%C16Azo%05%D4%E1%C1%95a%3B%8A'%A0%E8%CC%17%22%85%1D%BA%00%A2%FA%DC%0A%94%D1%D1%8D%8B%3A%84%17B%C7%60%1A%25Z%FC%8D%00%00%00%00IEND%AEB%60%82\"),url(\"data:image/png,%89PNG%0D%0A%1A%0A%00%00%00%0DIHDR%00%00%00%05%00%00%007%08%06%00%00%00%C4%DD%80C%00%00%03%1EiCCPICC%20Profile%00%00x%01%85T%DFk%D3P%14%FE%DAe%9D%B0%E1%8B%3Ag%11%09%3Eh%91ndStC%9C%B6kW%BA%CDZ%EA6%B7!H%9B%A6m%5C%9A%C6%24%ED~%B0%07%D9%8Bo%3A%C5w%F1%07%3E%F9%07%0C%D9%83o%7B%92%0D%C6%14a%F8%AC%88%22L%F6%22%B3%9E%9B4M'S%03%B9%F7%BB%DF%F9%EE9'%E7%E4%5E%A0%F9qZ%D3%14%2F%0F%14USO%C5%C2%FC%C4%E4%14%DF%F2%01%5E%1CC%2B%FChM%8B%86%16J%26G%40%0F%D3%B2y%EF%B3%F3%0E%1E%C6lt%EEo%DF%AB%FEc%D5%9A%95%0C%11%F0%1C%20%BE%945%C4%22%E1Y%A0i%5C%D4t%13%E0%D6%89%EF%9D15%C2%CDLsX%A7%04%09%1Fg8oc%81%E1%8C%8D%23%96f45%40%9A%09%C2%07%C5B%3AK%B8%408%98i%E0%F3%0D%D8%CE%81%14%E4'%26%A9%92.%8B%3C%ABER%2F%E5dE%B2%0C%F6%F0%1Fs%83%F2_%B0%A8%94%E9%9B%AD%E7%10%8Dm%9A%19N%D1%7C%8A%DE%1F9%7Dp%8C%E6%00%D5%C1%3F_%18%BDA%B8%9DpX6%E3%A35~B%CD%24%AE%11%26%BD%E7%EEti%98%EDe%9A%97Y)%12%25%1C%24%BCbT%AE3li%E6%0B%03%89%9A%E6%D3%ED%F4P%92%B0%9F4%BF43Y%F3%E3%EDP%95%04%EB1%C5%F5%F6KF%F4%BA%BD%D7%DB%91%93%07%E35%3E%A7)%D6%7F%40%FE%BD%F7%F5r%8A%E5y%92%F0%EB%B4%1E%8D%D5%F4%5B%92%3AV%DB%DB%E4%CD%A6%23%C3%C4wQ%3F%03HB%82%8E%1Cd(%E0%91B%0Ca%9Ac%C4%AA%F8L%16%19%22J%A4%D2itTy%B28%D6%3B(%93%96%ED%1CGx%C9_%0E%B8%5E%16%F5%5B%B2%B8%F6%E0%FB%9E%DD%25%D7%8E%BC%15%85%C5%B7%A3%D8Q%ED%B5%81%E9%BA%B2%13%9A%1B%7Fua%A5%A3n%E17%B9%E5%9B%1Bm%AB%0B%08Q%FE%8A%E5%B1H%5Ee%CAO%82Q%D7u6%E6%90S%97%FCu%0B%CF2%94%EE%25v%12X%0C%BA%AC%F0%5E%F8*l%0AO%85%17%C2%97%BF%D4%C8%CE%DE%AD%11%CB%80q%2C%3E%AB%9ES%CD%C6%EC%25%D2L%D2%EBd%B8%BF%8A%F5B%C6%18%F9%901CZ%9D%BE%24M%9C%8A9%F2%DAP%0B'%06w%82%EB%E6%E2%5C%2F%D7%07%9E%BB%CC%5D%E1%FA%B9%08%AD.r%23%8E%C2%17%F5E%7C!%F0%BE3%BE%3E_%B7o%88a%A7%DB%BE%D3d%EB%A31Z%EB%BB%D3%91%BA%A2%B1z%94%8F%DB'%F6%3D%8E%AA%13%19%B2%B1%BE%B1~V%08%2B%B4%A2cjJ%B3tO%00%03%25mN%97%F3%05%93%EF%11%84%0B%7C%88%AE-%89%8F%ABbW%90O%2B%0Ao%99%0C%5E%97%0CI%AFH%D9.%B0%3B%8F%ED%03%B6S%D6%5D%E6i_s9%F3*p%E9%1B%FD%C3%EB.7U%06%5E%19%C0%D1s.%17%A03u%E4%09%B0%7C%5E%2C%EB%15%DB%1F%3C%9E%B7%80%91%3B%DBc%AD%3Dma%BA%8B%3EV%AB%DBt.%5B%1E%01%BB%0F%AB%D5%9F%CF%AA%D5%DD%E7%E4%7F%0Bx%A3%FC%06%A9%23%0A%D6%C2%A1_2%00%00%00%09pHYs%00%00%0B%13%00%00%0B%13%01%00%9A%9C%18%00%00%00%3AIDAT8%11c%FC%FF%FF%7F%18%03%1A%60%01%F2%3F%A0%891%80%04%FF%11-%F8%17%9BJ%E2%05%B1ZD%81v%26t%E7%80%F8%A3%82h%A12%1A%20%A3%01%02%0F%01%BA%25%06%00%19%C0%0D%AEF%D5%3ES%00%00%00%00IEND%AEB%60%82\");background-repeat: no-repeat, repeat-x;background-position: center center, top left;color: transparent;border: 1px solid black;-moz-border-radius: 2px;-webkit-border-radius: 2px;border-radius: 2px;cursor: pointer;pointer-events: auto;}.ace_dark .ace_fold {}.ace_fold:hover{background-image:url(\"data:image/png,%89PNG%0D%0A%1A%0A%00%00%00%0DIHDR%00%00%00%11%00%00%00%09%08%06%00%00%00%D4%E8%C7%0C%00%00%03%1EiCCPICC%20Profile%00%00x%01%85T%DFk%D3P%14%FE%DAe%9D%B0%E1%8B%3Ag%11%09%3Eh%91ndStC%9C%B6kW%BA%CDZ%EA6%B7!H%9B%A6m%5C%9A%C6%24%ED~%B0%07%D9%8Bo%3A%C5w%F1%07%3E%F9%07%0C%D9%83o%7B%92%0D%C6%14a%F8%AC%88%22L%F6%22%B3%9E%9B4M'S%03%B9%F7%BB%DF%F9%EE9'%E7%E4%5E%A0%F9qZ%D3%14%2F%0F%14USO%C5%C2%FC%C4%E4%14%DF%F2%01%5E%1CC%2B%FChM%8B%86%16J%26G%40%0F%D3%B2y%EF%B3%F3%0E%1E%C6lt%EEo%DF%AB%FEc%D5%9A%95%0C%11%F0%1C%20%BE%945%C4%22%E1Y%A0i%5C%D4t%13%E0%D6%89%EF%9D15%C2%CDLsX%A7%04%09%1Fg8oc%81%E1%8C%8D%23%96f45%40%9A%09%C2%07%C5B%3AK%B8%408%98i%E0%F3%0D%D8%CE%81%14%E4'%26%A9%92.%8B%3C%ABER%2F%E5dE%B2%0C%F6%F0%1Fs%83%F2_%B0%A8%94%E9%9B%AD%E7%10%8Dm%9A%19N%D1%7C%8A%DE%1F9%7Dp%8C%E6%00%D5%C1%3F_%18%BDA%B8%9DpX6%E3%A35~B%CD%24%AE%11%26%BD%E7%EEti%98%EDe%9A%97Y)%12%25%1C%24%BCbT%AE3li%E6%0B%03%89%9A%E6%D3%ED%F4P%92%B0%9F4%BF43Y%F3%E3%EDP%95%04%EB1%C5%F5%F6KF%F4%BA%BD%D7%DB%91%93%07%E35%3E%A7)%D6%7F%40%FE%BD%F7%F5r%8A%E5y%92%F0%EB%B4%1E%8D%D5%F4%5B%92%3AV%DB%DB%E4%CD%A6%23%C3%C4wQ%3F%03HB%82%8E%1Cd(%E0%91B%0Ca%9Ac%C4%AA%F8L%16%19%22J%A4%D2itTy%B28%D6%3B(%93%96%ED%1CGx%C9_%0E%B8%5E%16%F5%5B%B2%B8%F6%E0%FB%9E%DD%25%D7%8E%BC%15%85%C5%B7%A3%D8Q%ED%B5%81%E9%BA%B2%13%9A%1B%7Fua%A5%A3n%E17%B9%E5%9B%1Bm%AB%0B%08Q%FE%8A%E5%B1H%5Ee%CAO%82Q%D7u6%E6%90S%97%FCu%0B%CF2%94%EE%25v%12X%0C%BA%AC%F0%5E%F8*l%0AO%85%17%C2%97%BF%D4%C8%CE%DE%AD%11%CB%80q%2C%3E%AB%9ES%CD%C6%EC%25%D2L%D2%EBd%B8%BF%8A%F5B%C6%18%F9%901CZ%9D%BE%24M%9C%8A9%F2%DAP%0B'%06w%82%EB%E6%E2%5C%2F%D7%07%9E%BB%CC%5D%E1%FA%B9%08%AD.r%23%8E%C2%17%F5E%7C!%F0%BE3%BE%3E_%B7o%88a%A7%DB%BE%D3d%EB%A31Z%EB%BB%D3%91%BA%A2%B1z%94%8F%DB'%F6%3D%8E%AA%13%19%B2%B1%BE%B1~V%08%2B%B4%A2cjJ%B3tO%00%03%25mN%97%F3%05%93%EF%11%84%0B%7C%88%AE-%89%8F%ABbW%90O%2B%0Ao%99%0C%5E%97%0CI%AFH%D9.%B0%3B%8F%ED%03%B6S%D6%5D%E6i_s9%F3*p%E9%1B%FD%C3%EB.7U%06%5E%19%C0%D1s.%17%A03u%E4%09%B0%7C%5E%2C%EB%15%DB%1F%3C%9E%B7%80%91%3B%DBc%AD%3Dma%BA%8B%3EV%AB%DBt.%5B%1E%01%BB%0F%AB%D5%9F%CF%AA%D5%DD%E7%E4%7F%0Bx%A3%FC%06%A9%23%0A%D6%C2%A1_2%00%00%00%09pHYs%00%00%0B%13%00%00%0B%13%01%00%9A%9C%18%00%00%00%B5IDAT(%15%A5%91%3D%0E%02!%10%85ac%E1%05%D6%CE%D6%C6%CE%D2%E8%ED%CD%DE%C0%C6%D6N.%E0V%F8%3D%9Ca%891XH%C2%BE%D9y%3F%90!%E6%9C%C3%BFk%E5%011%C6-%F5%C8N%04%DF%BD%FF%89%DFt%83DN%60%3E%F3%AB%A0%DE%1A%5Dg%BE%10Q%97%1B%40%9C%A8o%10%8F%5E%828%B4%1B%60%87%F6%02%26%85%1Ch%1E%C1%2B%5Bk%FF%86%EE%B7j%09%9A%DA%9B%ACe%A3%F9%EC%DA!9%B4%D5%A6%81%86%86%98%CC%3C%5B%40%FA%81%B3%E9%CB%23%94%C16Azo%05%D4%E1%C1%95a%3B%8A'%A0%E8%CC%17%22%85%1D%BA%00%A2%FA%DC%0A%94%D1%D1%8D%8B%3A%84%17B%C7%60%1A%25Z%FC%8D%00%00%00%00IEND%AEB%60%82\"),url(\"data:image/png,%89PNG%0D%0A%1A%0A%00%00%00%0DIHDR%00%00%00%05%00%00%007%08%06%00%00%00%C4%DD%80C%00%00%03%1EiCCPICC%20Profile%00%00x%01%85T%DFk%D3P%14%FE%DAe%9D%B0%E1%8B%3Ag%11%09%3Eh%91ndStC%9C%B6kW%BA%CDZ%EA6%B7!H%9B%A6m%5C%9A%C6%24%ED~%B0%07%D9%8Bo%3A%C5w%F1%07%3E%F9%07%0C%D9%83o%7B%92%0D%C6%14a%F8%AC%88%22L%F6%22%B3%9E%9B4M'S%03%B9%F7%BB%DF%F9%EE9'%E7%E4%5E%A0%F9qZ%D3%14%2F%0F%14USO%C5%C2%FC%C4%E4%14%DF%F2%01%5E%1CC%2B%FChM%8B%86%16J%26G%40%0F%D3%B2y%EF%B3%F3%0E%1E%C6lt%EEo%DF%AB%FEc%D5%9A%95%0C%11%F0%1C%20%BE%945%C4%22%E1Y%A0i%5C%D4t%13%E0%D6%89%EF%9D15%C2%CDLsX%A7%04%09%1Fg8oc%81%E1%8C%8D%23%96f45%40%9A%09%C2%07%C5B%3AK%B8%408%98i%E0%F3%0D%D8%CE%81%14%E4'%26%A9%92.%8B%3C%ABER%2F%E5dE%B2%0C%F6%F0%1Fs%83%F2_%B0%A8%94%E9%9B%AD%E7%10%8Dm%9A%19N%D1%7C%8A%DE%1F9%7Dp%8C%E6%00%D5%C1%3F_%18%BDA%B8%9DpX6%E3%A35~B%CD%24%AE%11%26%BD%E7%EEti%98%EDe%9A%97Y)%12%25%1C%24%BCbT%AE3li%E6%0B%03%89%9A%E6%D3%ED%F4P%92%B0%9F4%BF43Y%F3%E3%EDP%95%04%EB1%C5%F5%F6KF%F4%BA%BD%D7%DB%91%93%07%E35%3E%A7)%D6%7F%40%FE%BD%F7%F5r%8A%E5y%92%F0%EB%B4%1E%8D%D5%F4%5B%92%3AV%DB%DB%E4%CD%A6%23%C3%C4wQ%3F%03HB%82%8E%1Cd(%E0%91B%0Ca%9Ac%C4%AA%F8L%16%19%22J%A4%D2itTy%B28%D6%3B(%93%96%ED%1CGx%C9_%0E%B8%5E%16%F5%5B%B2%B8%F6%E0%FB%9E%DD%25%D7%8E%BC%15%85%C5%B7%A3%D8Q%ED%B5%81%E9%BA%B2%13%9A%1B%7Fua%A5%A3n%E17%B9%E5%9B%1Bm%AB%0B%08Q%FE%8A%E5%B1H%5Ee%CAO%82Q%D7u6%E6%90S%97%FCu%0B%CF2%94%EE%25v%12X%0C%BA%AC%F0%5E%F8*l%0AO%85%17%C2%97%BF%D4%C8%CE%DE%AD%11%CB%80q%2C%3E%AB%9ES%CD%C6%EC%25%D2L%D2%EBd%B8%BF%8A%F5B%C6%18%F9%901CZ%9D%BE%24M%9C%8A9%F2%DAP%0B'%06w%82%EB%E6%E2%5C%2F%D7%07%9E%BB%CC%5D%E1%FA%B9%08%AD.r%23%8E%C2%17%F5E%7C!%F0%BE3%BE%3E_%B7o%88a%A7%DB%BE%D3d%EB%A31Z%EB%BB%D3%91%BA%A2%B1z%94%8F%DB'%F6%3D%8E%AA%13%19%B2%B1%BE%B1~V%08%2B%B4%A2cjJ%B3tO%00%03%25mN%97%F3%05%93%EF%11%84%0B%7C%88%AE-%89%8F%ABbW%90O%2B%0Ao%99%0C%5E%97%0CI%AFH%D9.%B0%3B%8F%ED%03%B6S%D6%5D%E6i_s9%F3*p%E9%1B%FD%C3%EB.7U%06%5E%19%C0%D1s.%17%A03u%E4%09%B0%7C%5E%2C%EB%15%DB%1F%3C%9E%B7%80%91%3B%DBc%AD%3Dma%BA%8B%3EV%AB%DBt.%5B%1E%01%BB%0F%AB%D5%9F%CF%AA%D5%DD%E7%E4%7F%0Bx%A3%FC%06%A9%23%0A%D6%C2%A1_2%00%00%00%09pHYs%00%00%0B%13%00%00%0B%13%01%00%9A%9C%18%00%00%003IDAT8%11c%FC%FF%FF%7F%3E%03%1A%60%01%F2%3F%A3%891%80%04%FFQ%26%F8w%C0%B43%A1%DB%0C%E2%8F%0A%A2%85%CAh%80%8C%06%08%3C%04%E8%96%18%00%A3S%0D%CD%CF%D8%C1%9D%00%00%00%00IEND%AEB%60%82\");background-repeat: no-repeat, repeat-x;background-position: center center, top left;}.ace_editor.ace_dragging .ace_content {cursor: move;}.ace_gutter-tooltip {background-color: #FFF;background-image: -webkit-linear-gradient(top, transparent, rgba(0, 0, 0, 0.1));background-image: linear-gradient(to bottom, transparent, rgba(0, 0, 0, 0.1));border: 1px solid gray;border-radius: 1px;box-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);color: black;display: inline-block;max-width: 500px;padding: 4px;position: fixed;z-index: 300;-moz-box-sizing: border-box;-webkit-box-sizing: border-box;box-sizing: border-box;cursor: default;white-space: pre-line;word-wrap: break-word;line-height: normal;font-style: normal;font-weight: normal;letter-spacing: normal;}.ace_folding-enabled > .ace_gutter-cell {padding-right: 13px;}.ace_fold-widget {-moz-box-sizing: border-box;-webkit-box-sizing: border-box;box-sizing: border-box;margin: 0 -12px 0 1px;display: none;width: 11px;vertical-align: top;background-image: url(\"data:image/png,%89PNG%0D%0A%1A%0A%00%00%00%0DIHDR%00%00%00%05%00%00%00%05%08%06%00%00%00%8Do%26%E5%00%00%004IDATx%DAe%8A%B1%0D%000%0C%C2%F2%2CK%96%BC%D0%8F9%81%88H%E9%D0%0E%96%C0%10%92%3E%02%80%5E%82%E4%A9*-%EEsw%C8%CC%11%EE%96w%D8%DC%E9*Eh%0C%151(%00%00%00%00IEND%AEB%60%82\");background-repeat: no-repeat;background-position: center;border-radius: 3px;border: 1px solid transparent;}.ace_folding-enabled .ace_fold-widget {display: inline-block;   }.ace_fold-widget.ace_end {background-image: url(\"data:image/png,%89PNG%0D%0A%1A%0A%00%00%00%0DIHDR%00%00%00%05%00%00%00%05%08%06%00%00%00%8Do%26%E5%00%00%004IDATx%DAm%C7%C1%09%000%08C%D1%8C%ECE%C8E(%8E%EC%02)%1EZJ%F1%C1'%04%07I%E1%E5%EE%CAL%F5%A2%99%99%22%E2%D6%1FU%B5%FE0%D9x%A7%26Wz5%0E%D5%00%00%00%00IEND%AEB%60%82\");}.ace_fold-widget.ace_closed {background-image: url(\"data:image/png,%89PNG%0D%0A%1A%0A%00%00%00%0DIHDR%00%00%00%03%00%00%00%06%08%06%00%00%00%06%E5%24%0C%00%00%009IDATx%DA5%CA%C1%09%000%08%03%C0%AC*(%3E%04%C1%0D%BA%B1%23%A4Uh%E0%20%81%C0%CC%F8%82%81%AA%A2%AArGfr%88%08%11%11%1C%DD%7D%E0%EE%5B%F6%F6%CB%B8%05Q%2F%E9tai%D9%00%00%00%00IEND%AEB%60%82\");}.ace_fold-widget:hover {border: 1px solid rgba(0, 0, 0, 0.3);background-color: rgba(255, 255, 255, 0.2);-moz-box-shadow: 0 1px 1px rgba(255, 255, 255, 0.7);-webkit-box-shadow: 0 1px 1px rgba(255, 255, 255, 0.7);box-shadow: 0 1px 1px rgba(255, 255, 255, 0.7);}.ace_fold-widget:active {border: 1px solid rgba(0, 0, 0, 0.4);background-color: rgba(0, 0, 0, 0.05);-moz-box-shadow: 0 1px 1px rgba(255, 255, 255, 0.8);-webkit-box-shadow: 0 1px 1px rgba(255, 255, 255, 0.8);box-shadow: 0 1px 1px rgba(255, 255, 255, 0.8);}/*** Dark version for fold widgets*/.ace_dark .ace_fold-widget {background-image: url(\"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAAHklEQVQIW2P4//8/AzoGEQ7oGCaLLAhWiSwB146BAQCSTPYocqT0AAAAAElFTkSuQmCC\");}.ace_dark .ace_fold-widget.ace_end {background-image: url(\"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAAH0lEQVQIW2P4//8/AxQ7wNjIAjDMgC4AxjCVKBirIAAF0kz2rlhxpAAAAABJRU5ErkJggg==\");}.ace_dark .ace_fold-widget.ace_closed {background-image: url(\"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAMAAAAFCAYAAACAcVaiAAAAHElEQVQIW2P4//+/AxAzgDADlOOAznHAKgPWAwARji8UIDTfQQAAAABJRU5ErkJggg==\");}.ace_dark .ace_fold-widget:hover {box-shadow: 0 1px 1px rgba(255, 255, 255, 0.2);background-color: rgba(255, 255, 255, 0.1);}.ace_dark .ace_fold-widget:active {-moz-box-shadow: 0 1px 1px rgba(255, 255, 255, 0.2);-webkit-box-shadow: 0 1px 1px rgba(255, 255, 255, 0.2);box-shadow: 0 1px 1px rgba(255, 255, 255, 0.2);}.ace_fold-widget.ace_invalid {background-color: #FFB4B4;border-color: #DE5555;}.ace_fade-fold-widgets .ace_fold-widget {-moz-transition: opacity 0.4s ease 0.05s;-webkit-transition: opacity 0.4s ease 0.05s;-o-transition: opacity 0.4s ease 0.05s;-ms-transition: opacity 0.4s ease 0.05s;transition: opacity 0.4s ease 0.05s;opacity: 0;}.ace_fade-fold-widgets:hover .ace_fold-widget {-moz-transition: opacity 0.05s ease 0.05s;-webkit-transition: opacity 0.05s ease 0.05s;-o-transition: opacity 0.05s ease 0.05s;-ms-transition: opacity 0.05s ease 0.05s;transition: opacity 0.05s ease 0.05s;opacity:1;}.ace_underline {text-decoration: underline;}.ace_bold {font-weight: bold;}.ace_nobold .ace_bold {font-weight: normal;}.ace_italic {font-style: italic;}"
        ;
    i.importCssString(v, "ace_editor");
    var m = function (e, t) {
        var n = this;
        this.container = e || i.createElement("div"), this.$keepTextAreaAtCursor = !o.isIE, i.addCssClass(this.container, "ace_editor"), this.setTheme(t), this.$gutter = i.createElement("div"), this.$gutter.className = "ace_gutter", this.container.appendChild(this.$gutter), this.scroller = i.createElement("div"), this.scroller.className = "ace_scroller", this.container.appendChild(this.scroller), this.content = i.createElement("div"), this.content.className = "ace_content", this.scroller.appendChild(this.content), this.$gutterLayer = new a(this.$gutter), this.$gutterLayer.on("changeGutterWidth", this.onGutterResize.bind(this)), this.$markerBack = new f(this.content);
        var r = this.$textLayer = new l(this.content);
        this.canvas = r.element, this.$markerFront = new f(this.content), this.$cursorLayer = new c(this.content), this.$horizScroll = !1, this.scrollBar = new h(this.container), this.scrollBar.addEventListener("scroll", function (e) {
            n.$inScrollAnimation || n.session.setScrollTop(e.data)
        }), this.scrollTop = 0, this.scrollLeft = 0, s.addListener(this.scroller, "scroll", function () {
            var e = n.scroller.scrollLeft;
            n.scrollLeft = e, n.session.setScrollLeft(e)
        }), this.cursorPos = {row: 0, column: 0}, this.$textLayer.addEventListener("changeCharacterSize", function () {
            n.updateCharacterSize(), n.onResize(!0)
        }), this.$size = {width: 0, height: 0, scrollerHeight: 0, scrollerWidth: 0}, this.layerConfig = {width: 1, padding: 0, firstRow: 0, firstRowScreen: 0, lastRow: 0, lineHeight: 1, characterWidth: 1, minHeight: 1, maxHeight: 1, offset: 0, height: 1}, this.$loop = new p(this.$renderChanges.bind(this), this.container.ownerDocument.defaultView), this.$loop.schedule(this.CHANGE_FULL), this.updateCharacterSize(), this.setPadding(4), u.resetOptions(this), u._emit("renderer", this)
    };
    (function () {
        this.CHANGE_CURSOR = 1, this.CHANGE_MARKER = 2, this.CHANGE_GUTTER = 4, this.CHANGE_SCROLL = 8, this.CHANGE_LINES = 16, this.CHANGE_TEXT = 32, this.CHANGE_SIZE = 64, this.CHANGE_MARKER_BACK = 128, this.CHANGE_MARKER_FRONT = 256, this.CHANGE_FULL = 512, this.CHANGE_H_SCROLL = 1024, r.implement(this, d), this.updateCharacterSize = function () {
            this.$textLayer.allowBoldFonts != this.$allowBoldFonts && (this.$allowBoldFonts = this.$textLayer.allowBoldFonts, this.setStyle("ace_nobold", !this.$allowBoldFonts)), this.characterWidth = this.$textLayer.getCharacterWidth(), this.lineHeight = this.$textLayer.getLineHeight(), this.$updatePrintMargin()
        }, this.setSession = function (e) {
            this.session = e, this.scroller.className = "ace_scroller", this.$cursorLayer.setSession(e), this.$markerBack.setSession(e), this.$markerFront.setSession(e), this.$gutterLayer.setSession(e), this.$textLayer.setSession(e), this.$loop.schedule(this.CHANGE_FULL)
        }, this.updateLines = function (e, t) {
            t === undefined && (t = Infinity), this.$changedLines ? (this.$changedLines.firstRow > e && (this.$changedLines.firstRow = e), this.$changedLines.lastRow < t && (this.$changedLines.lastRow = t)) : this.$changedLines = {firstRow: e, lastRow: t};
            if (this.$changedLines.firstRow > this.layerConfig.lastRow || this.$changedLines.lastRow < this.layerConfig.firstRow)return;
            this.$loop.schedule(this.CHANGE_LINES)
        }, this.onChangeTabSize = function () {
            this.$loop.schedule(this.CHANGE_TEXT | this.CHANGE_MARKER), this.$textLayer.onChangeTabSize()
        }, this.updateText = function () {
            this.$loop.schedule(this.CHANGE_TEXT)
        }, this.updateFull = function (e) {
            e ? this.$renderChanges(this.CHANGE_FULL, !0) : this.$loop.schedule(this.CHANGE_FULL)
        }, this.updateFontSize = function () {
            this.$textLayer.checkForSizeChanges()
        }, this.onResize = function (e, t, n, r) {
            var s = 0, o = this.$size;
            if (this.resizing > 2)return;
            this.resizing > 1 ? this.resizing++ : this.resizing = e ? 1 : 0, r || (r = i.getInnerHeight(this.container));
            if (r && (e || o.height != r)) {
                o.height = r, s = this.CHANGE_SIZE, o.scrollerHeight = this.scroller.clientHeight;
                if (e || !o.scrollerHeight)o.scrollerHeight = o.height, this.$horizScroll && (o.scrollerHeight -= this.scrollBar.getWidth());
                this.scrollBar.setHeight(o.scrollerHeight), this.session && (this.session.setScrollTop(this.getScrollTop()), s |= this.CHANGE_FULL)
            }
            n || (n = i.getInnerWidth(this.container));
            if (n && (e || this.resizing > 1 || o.width != n)) {
                s = this.CHANGE_SIZE, o.width = n;
                var t = this.$showGutter ? this.$gutter.offsetWidth : 0;
                this.scroller.style.left = t + "px", o.scrollerWidth = Math.max(0, n - t - this.scrollBar.getWidth()), this.scroller.style.right = this.scrollBar.getWidth() + "px";
                if (this.session && this.session.getUseWrapMode() && this.adjustWrapLimit() || e)s |= this.CHANGE_FULL
            }
            if (!this.$size.scrollerHeight)return;
            e ? this.$renderChanges(s, !0) : this.$loop.schedule(s), e && (this.$gutterLayer.$padding = null), e && delete this.resizing
        }, this.onGutterResize = function () {
            var e = this.$size.width, t = this.$showGutter ? this.$gutter.offsetWidth : 0;
            this.scroller.style.left = t + "px", this.$size.scrollerWidth = Math.max(0, e - t - this.scrollBar.getWidth()), this.session.getUseWrapMode() && this.adjustWrapLimit() && this.$loop.schedule(this.CHANGE_FULL)
        }, this.adjustWrapLimit = function () {
            var e = this.$size.scrollerWidth - this.$padding * 2, t = Math.floor(e / this.characterWidth);
            return this.session.adjustWrapLimit(t, this.$showPrintMargin && this.$printMarginColumn)
        }, this.setAnimatedScroll = function (e) {
            this.setOption("animatedScroll", e)
        }, this.getAnimatedScroll = function () {
            return this.$animatedScroll
        }, this.setShowInvisibles = function (e) {
            this.setOption("showInvisibles", e)
        }, this.getShowInvisibles = function () {
            return this.getOption("showInvisibles")
        }, this.getDisplayIndentGuides = function () {
            return this.getOption("displayIndentGuides")
        }, this.setDisplayIndentGuides = function (e) {
            this.setOption("displayIndentGuides", e)
        }, this.setShowPrintMargin = function (e) {
            this.setOption("showPrintMargin", e)
        }, this.getShowPrintMargin = function () {
            return this.getOption("showPrintMargin")
        }, this.setPrintMarginColumn = function (e) {
            this.setOption("printMarginColumn", e)
        }, this.getPrintMarginColumn = function () {
            return this.getOption("printMarginColumn")
        }, this.getShowGutter = function () {
            return this.getOption("showGutter")
        }, this.setShowGutter = function (e) {
            return this.setOption("showGutter", e)
        }, this.getFadeFoldWidgets = function () {
            return this.getOption("fadeFoldWidgets")
        }, this.setFadeFoldWidgets = function (e) {
            this.setOption("fadeFoldWidgets", e)
        }, this.setHighlightGutterLine = function (e) {
            this.setOption("highlightGutterLine", e)
        }, this.getHighlightGutterLine = function () {
            return this.getOption("highlightGutterLine")
        }, this.$updateGutterLineHighlight = function () {
            var e = this.$cursorLayer.$pixelPos, t = this.layerConfig.lineHeight;
            if (this.session.getUseWrapMode()) {
                var n = this.session.selection.getCursor();
                n.column = 0, e = this.$cursorLayer.getPixelPosition(n, !0), t *= this.session.getRowLength(n.row)
            }
            this.$gutterLineHighlight.style.top = e.top - this.layerConfig.offset + "px", this.$gutterLineHighlight.style.height = t + "px"
        }, this.$updatePrintMargin = function () {
            if (!this.$showPrintMargin && !this.$printMarginEl)return;
            if (!this.$printMarginEl) {
                var e = i.createElement("div");
                e.className = "ace_layer ace_print-margin-layer", this.$printMarginEl = i.createElement("div"), this.$printMarginEl.className = "ace_print-margin", e.appendChild(this.$printMarginEl), this.content.insertBefore(e, this.content.firstChild)
            }
            var t = this.$printMarginEl.style;
            t.left = this.characterWidth * this.$printMarginColumn + this.$padding + "px", t.visibility = this.$showPrintMargin ? "visible" : "hidden", this.session && this.session.$wrap == -1 && this.adjustWrapLimit()
        }, this.getContainerElement = function () {
            return this.container
        }, this.getMouseEventTarget = function () {
            return this.content
        }, this.getTextAreaContainer = function () {
            return this.container
        }, this.$moveTextAreaToCursor = function () {
            if (!this.$keepTextAreaAtCursor)return;
            var e = this.layerConfig, t = this.$cursorLayer.$pixelPos.top, n = this.$cursorLayer.$pixelPos.left;
            t -= e.offset;
            var r = this.lineHeight;
            if (t < 0 || t > e.height - r)return;
            var i = this.characterWidth;
            if (this.$composition) {
                var s = this.textarea.value.replace(/^\x01+/, "");
                i *= this.session.$getStringScreenWidth(s)[0], r += 2, t -= 1
            }
            n -= this.scrollLeft, n > this.$size.scrollerWidth - i && (n = this.$size.scrollerWidth - i), n -= this.scrollBar.width, this.textarea.style.height = r + "px", this.textarea.style.width = i + "px", this.textarea.style.right = Math.max(0, this.$size.scrollerWidth - n - i) + "px", this.textarea.style.bottom = Math.max(0, this.$size.height - t - r) + "px"
        }, this.getFirstVisibleRow = function () {
            return this.layerConfig.firstRow
        }, this.getFirstFullyVisibleRow = function () {
            return this.layerConfig.firstRow + (this.layerConfig.offset === 0 ? 0 : 1)
        }, this.getLastFullyVisibleRow = function () {
            var e = Math.floor((this.layerConfig.height + this.layerConfig.offset) / this.layerConfig.lineHeight);
            return this.layerConfig.firstRow - 1 + e
        }, this.getLastVisibleRow = function () {
            return this.layerConfig.lastRow
        }, this.$padding = null, this.setPadding = function (e) {
            this.$padding = e, this.$textLayer.setPadding(e), this.$cursorLayer.setPadding(e), this.$markerFront.setPadding(e), this.$markerBack.setPadding(e), this.$loop.schedule(this.CHANGE_FULL), this.$updatePrintMargin()
        }, this.getHScrollBarAlwaysVisible = function () {
            return this.$hScrollBarAlwaysVisible
        }, this.setHScrollBarAlwaysVisible = function (e) {
            this.setOption("hScrollBarAlwaysVisible", e)
        }, this.$updateScrollBar = function () {
            this.scrollBar.setInnerHeight(this.layerConfig.maxHeight), this.scrollBar.setScrollTop(this.scrollTop)
        }, this.$renderChanges = function (e, t) {
            if (!t && (!e || !this.session || !this.container.offsetWidth))return;
            this._signal("beforeRender"), (e & this.CHANGE_FULL || e & this.CHANGE_SIZE || e & this.CHANGE_TEXT || e & this.CHANGE_LINES || e & this.CHANGE_SCROLL) && this.$computeLayerConfig();
            if (e & this.CHANGE_H_SCROLL) {
                this.scroller.scrollLeft = this.scrollLeft;
                var n = this.scroller.scrollLeft;
                this.scrollLeft = n, this.session.setScrollLeft(n), this.scroller.className = this.scrollLeft == 0 ? "ace_scroller" : "ace_scroller ace_scroll-left"
            }
            if (e & this.CHANGE_FULL) {
                this.$textLayer.checkForSizeChanges(), this.$updateScrollBar(), this.$textLayer.update(this.layerConfig), this.$showGutter && this.$gutterLayer.update(this.layerConfig), this.$markerBack.update(this.layerConfig), this.$markerFront.update(this.layerConfig), this.$cursorLayer.update(this.layerConfig), this.$moveTextAreaToCursor(), this.$highlightGutterLine && this.$updateGutterLineHighlight(), this._signal("afterRender");
                return
            }
            if (e & this.CHANGE_SCROLL) {
                e & this.CHANGE_TEXT || e & this.CHANGE_LINES ? this.$textLayer.update(this.layerConfig) : this.$textLayer.scrollLines(this.layerConfig), this.$showGutter && this.$gutterLayer.update(this.layerConfig), this.$markerBack.update(this.layerConfig), this.$markerFront.update(this.layerConfig), this.$cursorLayer.update(this.layerConfig), this.$highlightGutterLine && this.$updateGutterLineHighlight(), this.$moveTextAreaToCursor(), this.$updateScrollBar(), this._signal("afterRender");
                return
            }
            e & this.CHANGE_TEXT ? (this.$textLayer.update(this.layerConfig), this.$showGutter && this.$gutterLayer.update(this.layerConfig)) : e & this.CHANGE_LINES ? (this.$updateLines() || e & this.CHANGE_GUTTER && this.$showGutter) && this.$gutterLayer.update(this.layerConfig) : (e & this.CHANGE_TEXT || e & this.CHANGE_GUTTER) && this.$showGutter && this.$gutterLayer.update(this.layerConfig), e & this.CHANGE_CURSOR && (this.$cursorLayer.update(this.layerConfig), this.$moveTextAreaToCursor(), this.$highlightGutterLine && this.$updateGutterLineHighlight()), e & (this.CHANGE_MARKER | this.CHANGE_MARKER_FRONT) && this.$markerFront.update(this.layerConfig), e & (this.CHANGE_MARKER | this.CHANGE_MARKER_BACK) && this.$markerBack.update(this.layerConfig), e & this.CHANGE_SIZE && this.$updateScrollBar(), this._signal("afterRender")
        }, this.$computeLayerConfig = function () {
            if (!this.$size.scrollerHeight)return this.onResize(!0);
            var e = this.session, t = this.scrollTop % this.lineHeight, n = this.$size.scrollerHeight + this.lineHeight, r = this.$getLongestLine(), i = this.$hScrollBarAlwaysVisible || this.$size.scrollerWidth - r < 0, s = this.$horizScroll !== i;
            this.$horizScroll = i, s && (this.scroller.style.overflowX = i ? "scroll" : "hidden", i || this.session.setScrollLeft(0));
            var o = this.session.getScreenLength() * this.lineHeight;
            this.session.setScrollTop(Math.max(0, Math.min(this.scrollTop, o - this.$size.scrollerHeight)));
            var u = Math.ceil(n / this.lineHeight) - 1, a = Math.max(0, Math.round((this.scrollTop - t) / this.lineHeight)), f = a + u, l, c, h = this.lineHeight;
            a = e.screenToDocumentRow(a, 0);
            var p = e.getFoldLine(a);
            p && (a = p.start.row), l = e.documentToScreenRow(a, 0), c = e.getRowLength(a) * h, f = Math.min(e.screenToDocumentRow(f, 0), e.getLength() - 1), n = this.$size.scrollerHeight + e.getRowLength(f) * h + c, t = this.scrollTop - l * h, this.layerConfig = {width: r, padding: this.$padding, firstRow: a, firstRowScreen: l, lastRow: f, lineHeight: h, characterWidth: this.characterWidth, minHeight: n, maxHeight: o, offset: t, height: this.$size.scrollerHeight}, this.$gutterLayer.element.style.marginTop = -t + "px", this.content.style.marginTop = -t + "px", this.content.style.width = r + 2 * this.$padding + "px", this.content.style.height = n + "px", s && this.onResize(!0)
        }, this.$updateLines = function () {
            var e = this.$changedLines.firstRow, t = this.$changedLines.lastRow;
            this.$changedLines = null;
            var n = this.layerConfig;
            if (e > n.lastRow + 1)return;
            if (t < n.firstRow)return;
            if (t === Infinity) {
                this.$showGutter && this.$gutterLayer.update(n), this.$textLayer.update(n);
                return
            }
            return this.$textLayer.updateLines(n, e, t), !0
        }, this.$getLongestLine = function () {
            var e = this.session.getScreenWidth();
            return this.$textLayer.showInvisibles && (e += 1), Math.max(this.$size.scrollerWidth - 2 * this.$padding, Math.round(e * this.characterWidth))
        }, this.updateFrontMarkers = function () {
            this.$markerFront.setMarkers(this.session.getMarkers(!0)), this.$loop.schedule(this.CHANGE_MARKER_FRONT)
        }, this.updateBackMarkers = function () {
            this.$markerBack.setMarkers(this.session.getMarkers()), this.$loop.schedule(this.CHANGE_MARKER_BACK)
        }, this.addGutterDecoration = function (e, t) {
            this.$gutterLayer.addGutterDecoration(e, t)
        }, this.removeGutterDecoration = function (e, t) {
            this.$gutterLayer.removeGutterDecoration(e, t)
        }, this.updateBreakpoints = function (e) {
            this.$loop.schedule(this.CHANGE_GUTTER)
        }, this.setAnnotations = function (e) {
            this.$gutterLayer.setAnnotations(e), this.$loop.schedule(this.CHANGE_GUTTER)
        }, this.updateCursor = function () {
            this.$loop.schedule(this.CHANGE_CURSOR)
        }, this.hideCursor = function () {
            this.$cursorLayer.hideCursor()
        }, this.showCursor = function () {
            this.$cursorLayer.showCursor()
        }, this.scrollSelectionIntoView = function (e, t, n) {
            this.scrollCursorIntoView(e, n), this.scrollCursorIntoView(t, n)
        }, this.scrollCursorIntoView = function (e, t) {
            if (this.$size.scrollerHeight === 0)return;
            var n = this.$cursorLayer.getPixelPosition(e), r = n.left, i = n.top;
            this.scrollTop > i ? (t && (i -= t * this.$size.scrollerHeight), this.session.setScrollTop(i)) : this.scrollTop + this.$size.scrollerHeight < i + this.lineHeight && (t && (i += t * this.$size.scrollerHeight), this.session.setScrollTop(i + this.lineHeight - this.$size.scrollerHeight));
            var s = this.scrollLeft;
            s > r ? (r < this.$padding + 2 * this.layerConfig.characterWidth && (r = 0), this.session.setScrollLeft(r)) : s + this.$size.scrollerWidth < r + this.characterWidth && this.session.setScrollLeft(Math.round(r + this.characterWidth - this.$size.scrollerWidth))
        }, this.getScrollTop = function () {
            return this.session.getScrollTop()
        }, this.getScrollLeft = function () {
            return this.session.getScrollLeft()
        }, this.getScrollTopRow = function () {
            return this.scrollTop / this.lineHeight
        }, this.getScrollBottomRow = function () {
            return Math.max(0, Math.floor((this.scrollTop + this.$size.scrollerHeight) / this.lineHeight) - 1)
        }, this.scrollToRow = function (e) {
            this.session.setScrollTop(e * this.lineHeight)
        }, this.alignCursor = function (e, t) {
            typeof e == "number" && (e = {row: e, column: 0});
            var n = this.$cursorLayer.getPixelPosition(e), r = this.$size.scrollerHeight - this.lineHeight, i = n.top - r * (t || 0);
            return this.session.setScrollTop(i), i
        }, this.STEPS = 8, this.$calcSteps = function (e, t) {
            var n = 0, r = this.STEPS, i = [], s = function (e, t, n) {
                return n * (Math.pow(e - 1, 3) + 1) + t
            };
            for (n = 0; n < r; ++n)i.push(s(n / this.STEPS, e, t - e));
            return i
        }, this.scrollToLine = function (e, t, n, r) {
            var i = this.$cursorLayer.getPixelPosition({row: e, column: 0}), s = i.top;
            t && (s -= this.$size.scrollerHeight / 2);
            var o = this.scrollTop;
            this.session.setScrollTop(s), n !== !1 && this.animateScrolling(o, r)
        }, this.animateScrolling = function (e, t) {
            var n = this.scrollTop;
            if (this.$animatedScroll && Math.abs(e - n) < 1e5) {
                var r = this, i = r.$calcSteps(e, n);
                this.$inScrollAnimation = !0, clearInterval(this.$timer), r.session.setScrollTop(i.shift()), this.$timer = setInterval(function () {
                    i.length ? (r.session.setScrollTop(i.shift()), r.session.$scrollTop = n) : n != null ? (r.session.$scrollTop = -1, r.session.setScrollTop(n), n = null) : (r.$timer = clearInterval(r.$timer), r.$inScrollAnimation = !1, t && t())
                }, 10)
            }
        }, this.scrollToY = function (e) {
            this.scrollTop !== e && (this.$loop.schedule(this.CHANGE_SCROLL), this.scrollTop = e)
        }, this.scrollToX = function (e) {
            e < 0 && (e = 0), this.scrollLeft !== e && (this.scrollLeft = e), this.$loop.schedule(this.CHANGE_H_SCROLL)
        }, this.scrollBy = function (e, t) {
            t && this.session.setScrollTop(this.session.getScrollTop() + t), e && this.session.setScrollLeft(this.session.getScrollLeft() + e)
        }, this.isScrollableBy = function (e, t) {
            if (t < 0 && this.session.getScrollTop() >= 1)return!0;
            if (t > 0 && this.session.getScrollTop() + this.$size.scrollerHeight - this.layerConfig.maxHeight < -1)return!0
        }, this.pixelToScreenCoordinates = function (e, t) {
            var n = this.scroller.getBoundingClientRect(), r = (e + this.scrollLeft - n.left - this.$padding) / this.characterWidth, i = Math.floor((t + this.scrollTop - n.top) / this.lineHeight), s = Math.round(r);
            return{row: i, column: s, side: r - s > 0 ? 1 : -1}
        }, this.screenToTextCoordinates = function (e, t) {
            var n = this.scroller.getBoundingClientRect(), r = Math.round((e + this.scrollLeft - n.left - this.$padding) / this.characterWidth), i = Math.floor((t + this.scrollTop - n.top) / this.lineHeight);
            return this.session.screenToDocumentPosition(i, Math.max(r, 0))
        }, this.textToScreenCoordinates = function (e, t) {
            var n = this.scroller.getBoundingClientRect(), r = this.session.documentToScreenPosition(e, t), i = this.$padding + Math.round(r.column * this.characterWidth), s = r.row * this.lineHeight;
            return{pageX: n.left + i - this.scrollLeft, pageY: n.top + s - this.scrollTop}
        }, this.visualizeFocus = function () {
            i.addCssClass(this.container, "ace_focus")
        }, this.visualizeBlur = function () {
            i.removeCssClass(this.container, "ace_focus")
        }, this.showComposition = function (e) {
            this.$composition || (this.$composition = {keepTextAreaAtCursor: this.$keepTextAreaAtCursor, cssText: this.textarea.style.cssText}), this.$keepTextAreaAtCursor = !0, i.addCssClass(this.textarea, "ace_composition"), this.textarea.style.cssText = "", this.$moveTextAreaToCursor()
        }, this.setCompositionText = function (e) {
            this.$moveTextAreaToCursor()
        }, this.hideComposition = function () {
            if (!this.$composition)return;
            i.removeCssClass(this.textarea, "ace_composition"), this.$keepTextAreaAtCursor = this.$composition.keepTextAreaAtCursor, this.textarea.style.cssText = this.$composition.cssText, this.$composition = null
        }, this.setTheme = function (e) {
            function t(e) {
                if (!e.cssClass)return;
                i.importCssString(e.cssText, e.cssClass, n.container.ownerDocument), n.theme && i.removeCssClass(n.container, n.theme.cssClass), n.$theme = e.cssClass, n.theme = e, i.addCssClass(n.container, e.cssClass), i.setCssClass(n.container, "ace_dark", e.isDark);
                var t = e.padding || 4;
                n.$padding && t != n.$padding && n.setPadding(t), n.$size && (n.$size.width = 0, n.onResize()), n._dispatchEvent("themeLoaded", {theme: e})
            }

            var n = this;
            this.$themeValue = e, n._dispatchEvent("themeChange", {theme: e});
            if (!e || typeof e == "string") {
                var r = e || "ace/theme/textmate";
                u.loadModule(["theme", r], t)
            } else t(e)
        }, this.getTheme = function () {
            return this.$themeValue
        }, this.setStyle = function (e, t) {
            i.setCssClass(this.container, e, t != 0)
        }, this.unsetStyle = function (e) {
            i.removeCssClass(this.container, e)
        }, this.destroy = function () {
            this.$textLayer.destroy(), this.$cursorLayer.destroy()
        }
    }).call(m.prototype), u.defineOptions(m.prototype, "renderer", {animatedScroll: {initialValue: !1}, showInvisibles: {set: function (e) {
        this.$textLayer.setShowInvisibles(e) && this.$loop.schedule(this.CHANGE_TEXT)
    }, initialValue: !1}, showPrintMargin: {set: function () {
        this.$updatePrintMargin()
    }, initialValue: !0}, printMarginColumn: {set: function () {
        this.$updatePrintMargin()
    }, initialValue: 80}, printMargin: {set: function (e) {
        typeof e == "number" && (this.$printMarginColumn = e), this.$showPrintMargin = !!e, this.$updatePrintMargin()
    }, get: function () {
        return this.$showPrintMargin && this.$printMarginColumn
    }}, showGutter: {set: function (e) {
        this.$gutter.style.display = e ? "block" : "none", this.onGutterResize()
    }, initialValue: !0}, fadeFoldWidgets: {set: function (e) {
        i.setCssClass(this.$gutter, "ace_fade-fold-widgets", e)
    }, initialValue: !1}, showFoldWidgets: {set: function (e) {
        this.$gutterLayer.setShowFoldWidgets(e)
    }, initialValue: !0}, displayIndentGuides: {set: function (e) {
        this.$textLayer.setDisplayIndentGuides(e) && this.$loop.schedule(this.CHANGE_TEXT)
    }, initialValue: !0}, highlightGutterLine: {set: function (e) {
        if (!this.$gutterLineHighlight) {
            this.$gutterLineHighlight = i.createElement("div"), this.$gutterLineHighlight.className = "ace_gutter-active-line", this.$gutter.appendChild(this.$gutterLineHighlight);
            return
        }
        this.$gutterLineHighlight.style.display = e ? "" : "none", this.$cursorLayer.$pixelPos && this.$updateGutterLineHighlight()
    }, initialValue: !1, value: !0}, hScrollBarAlwaysVisible: {set: function (e) {
        this.$hScrollBarAlwaysVisible = e, (!this.$hScrollBarAlwaysVisible || !this.$horizScroll) && this.$loop.schedule(this.CHANGE_SCROLL)
    }, initialValue: !1}, fontSize: {set: function (e) {
        typeof e == "number" && (e += "px"), this.container.style.fontSize = e, this.updateFontSize()
    }, initialValue: 12}, fontFamily: {set: function (e) {
        this.container.style.fontFamily = e, this.updateFontSize()
    }}}), t.VirtualRenderer = m
}), define("ace/layer/gutter", ["require", "exports", "module", "ace/lib/dom", "ace/lib/oop", "ace/lib/lang", "ace/lib/event_emitter"], function (e, t, n) {
    var r = e("../lib/dom"), i = e("../lib/oop"), s = e("../lib/lang"), o = e("../lib/event_emitter").EventEmitter, u = function (e) {
        this.element = r.createElement("div"), this.element.className = "ace_layer ace_gutter-layer", e.appendChild(this.element), this.setShowFoldWidgets(this.$showFoldWidgets), this.gutterWidth = 0, this.$annotations = [], this.$updateAnnotations = this.$updateAnnotations.bind(this)
    };
    (function () {
        i.implement(this, o), this.setSession = function (e) {
            this.session && this.session.removeEventListener("change", this.$updateAnnotations), this.session = e, e.on("change", this.$updateAnnotations)
        }, this.addGutterDecoration = function (e, t) {
            window.console && console.warn && console.warn("deprecated use session.addGutterDecoration"), this.session.addGutterDecoration(e, t)
        }, this.removeGutterDecoration = function (e, t) {
            window.console && console.warn && console.warn("deprecated use session.removeGutterDecoration"), this.session.removeGutterDecoration(e, t)
        }, this.setAnnotations = function (e) {
            this.$annotations = [];
            var t, n;
            for (var r = 0; r < e.length; r++) {
                var i = e[r], n = i.row, t = this.$annotations[n];
                t || (t = this.$annotations[n] = {text: []});
                var o = i.text;
                o = o ? s.escapeHTML(o) : i.html || "", t.text.indexOf(o) === -1 && t.text.push(o);
                var u = i.type;
                u == "error" ? t.className = " ace_error" : u == "warning" && t.className != " ace_error" ? t.className = " ace_warning" : u == "info" && !t.className && (t.className = " ace_info")
            }
        }, this.$updateAnnotations = function (e) {
            if (!this.$annotations.length)return;
            var t = e.data, n = t.range, r = n.start.row, i = n.end.row - r;
            if (i !== 0)if (t.action == "removeText" || t.action == "removeLines")this.$annotations.splice(r, i + 1, null); else {
                var s = Array(i + 1);
                s.unshift(r, 1), this.$annotations.splice.apply(this.$annotations, s)
            }
        }, this.update = function (e) {
            var t = {className: ""}, n = [], i = e.firstRow, s = e.lastRow, o = this.session.getNextFoldLine(i), u = o ? o.start.row : Infinity, a = this.$showFoldWidgets && this.session.foldWidgets, f = this.session.$breakpoints, l = this.session.$decorations, c = this.session.$firstLineNumber, h = 0;
            for (; ;) {
                i > u && (i = o.end.row + 1, o = this.session.getNextFoldLine(i, o), u = o ? o.start.row : Infinity);
                if (i > s)break;
                var p = this.$annotations[i] || t;
                n.push("<div class='ace_gutter-cell ", f[i] || "", l[i] || "", p.className, "' style='height:", this.session.getRowLength(i) * e.lineHeight, "px;'>", h = i + c);
                if (a) {
                    var d = a[i];
                    d == null && (d = a[i] = this.session.getFoldWidget(i)), d && n.push("<span class='ace_fold-widget ace_", d, d == "start" && i == u && i < o.end.row ? " ace_closed" : " ace_open", "' style='height:", e.lineHeight, "px", "'></span>")
                }
                n.push("</div>"), i++
            }
            this.element = r.setInnerHtml(this.element, n.join("")), this.element.style.height = e.minHeight + "px", this.session.$useWrapMode && (h = this.session.getLength());
            var v = ("" + h).length * e.characterWidth, m = this.$padding || this.$computePadding();
            v += m.left + m.right, v !== this.gutterWidth && (this.gutterWidth = v, this.element.style.width = Math.ceil(this.gutterWidth) + "px", this._emit("changeGutterWidth", v))
        }, this.$showFoldWidgets = !0, this.setShowFoldWidgets = function (e) {
            e ? r.addCssClass(this.element, "ace_folding-enabled") : r.removeCssClass(this.element, "ace_folding-enabled"), this.$showFoldWidgets = e, this.$padding = null
        }, this.getShowFoldWidgets = function () {
            return this.$showFoldWidgets
        }, this.$computePadding = function () {
            if (!this.element.firstChild)return{left: 0, right: 0};
            var e = r.computedStyle(this.element.firstChild);
            return this.$padding = {}, this.$padding.left = parseInt(e.paddingLeft) + 1, this.$padding.right = parseInt(e.paddingRight), this.$padding
        }, this.getRegion = function (e) {
            var t = this.$padding || this.$computePadding(), n = this.element.getBoundingClientRect();
            if (e.x < t.left + n.left)return"markers";
            if (this.$showFoldWidgets && e.x > n.right - t.right)return"foldWidgets"
        }
    }).call(u.prototype), t.Gutter = u
}), define("ace/layer/marker", ["require", "exports", "module", "ace/range", "ace/lib/dom"], function (e, t, n) {
    var r = e("../range").Range, i = e("../lib/dom"), s = function (e) {
        this.element = i.createElement("div"), this.element.className = "ace_layer ace_marker-layer", e.appendChild(this.element)
    };
    (function () {
        this.$padding = 0, this.setPadding = function (e) {
            this.$padding = e
        }, this.setSession = function (e) {
            this.session = e
        }, this.setMarkers = function (e) {
            this.markers = e
        }, this.update = function (e) {
            var e = e || this.config;
            if (!e)return;
            this.config = e;
            var t = [];
            for (var n in this.markers) {
                var r = this.markers[n];
                if (!r.range) {
                    r.update(t, this, this.session, e);
                    continue
                }
                var s = r.range.clipRows(e.firstRow, e.lastRow);
                if (s.isEmpty())continue;
                s = s.toScreenRange(this.session);
                if (r.renderer) {
                    var o = this.$getTop(s.start.row, e), u = this.$padding + s.start.column * e.characterWidth;
                    r.renderer(t, s, u, o, e)
                } else r.type == "fullLine" ? this.drawFullLineMarker(t, s, r.clazz, e) : r.type == "screenLine" ? this.drawScreenLineMarker(t, s, r.clazz, e) : s.isMultiLine() ? r.type == "text" ? this.drawTextMarker(t, s, r.clazz, e) : this.drawMultiLineMarker(t, s, r.clazz, e) : this.drawSingleLineMarker(t, s, r.clazz + " ace_start", e)
            }
            this.element = i.setInnerHtml(this.element, t.join(""))
        }, this.$getTop = function (e, t) {
            return(e - t.firstRowScreen) * t.lineHeight
        }, this.drawTextMarker = function (e, t, n, i) {
            var s = t.start.row, o = new r(s, t.start.column, s, this.session.getScreenLastRowColumn(s));
            this.drawSingleLineMarker(e, o, n + " ace_start", i, 1, "text"), s = t.end.row, o = new r(s, 0, s, t.end.column), this.drawSingleLineMarker(e, o, n, i, 0, "text");
            for (s = t.start.row + 1; s < t.end.row; s++)o.start.row = s, o.end.row = s, o.end.column = this.session.getScreenLastRowColumn(s), this.drawSingleLineMarker(e, o, n, i, 1, "text")
        }, this.drawMultiLineMarker = function (e, t, n, r, i) {
            var s = this.$padding, o = r.lineHeight, u = this.$getTop(t.start.row, r), a = s + t.start.column * r.characterWidth;
            e.push("<div class='", n, " ace_start' style='", "height:", o, "px;", "right:0;", "top:", u, "px;", "left:", a, "px;'></div>"), u = this.$getTop(t.end.row, r);
            var f = t.end.column * r.characterWidth;
            e.push("<div class='", n, "' style='", "height:", o, "px;", "width:", f, "px;", "top:", u, "px;", "left:", s, "px;'></div>"), o = (t.end.row - t.start.row - 1) * r.lineHeight;
            if (o < 0)return;
            u = this.$getTop(t.start.row + 1, r), e.push("<div class='", n, "' style='", "height:", o, "px;", "right:0;", "top:", u, "px;", "left:", s, "px;'></div>")
        }, this.drawSingleLineMarker = function (e, t, n, r, i) {
            var s = r.lineHeight, o = (t.end.column + (i || 0) - t.start.column) * r.characterWidth, u = this.$getTop(t.start.row, r), a = this.$padding + t.start.column * r.characterWidth;
            e.push("<div class='", n, "' style='", "height:", s, "px;", "width:", o, "px;", "top:", u, "px;", "left:", a, "px;'></div>")
        }, this.drawFullLineMarker = function (e, t, n, r) {
            var i = this.$getTop(t.start.row, r), s = r.lineHeight;
            t.start.row != t.end.row && (s += this.$getTop(t.end.row, r) - i), e.push("<div class='", n, "' style='", "height:", s, "px;", "top:", i, "px;", "left:0;right:0;'></div>")
        }, this.drawScreenLineMarker = function (e, t, n, r) {
            var i = this.$getTop(t.start.row, r), s = r.lineHeight;
            e.push("<div class='", n, "' style='", "height:", s, "px;", "top:", i, "px;", "left:0;right:0;'></div>")
        }
    }).call(s.prototype), t.Marker = s
}), define("ace/layer/text", ["require", "exports", "module", "ace/lib/oop", "ace/lib/dom", "ace/lib/lang", "ace/lib/useragent", "ace/lib/event_emitter"], function (e, t, n) {
    var r = e("../lib/oop"), i = e("../lib/dom"), s = e("../lib/lang"), o = e("../lib/useragent"), u = e("../lib/event_emitter").EventEmitter, a = function (e) {
        this.element = i.createElement("div"), this.element.className = "ace_layer ace_text-layer", e.appendChild(this.element), this.$characterSize = {width: 0, height: 0}, this.checkForSizeChanges(), this.$pollSizeChanges()
    };
    (function () {
        r.implement(this, u), this.EOF_CHAR = "?", this.EOL_CHAR = "?", this.TAB_CHAR = "→", this.SPACE_CHAR = "·", this.$padding = 0, this.setPadding = function (e) {
            this.$padding = e, this.element.style.padding = "0 " + e + "px"
        }, this.getLineHeight = function () {
            return this.$characterSize.height || 1
        }, this.getCharacterWidth = function () {
            return this.$characterSize.width || 1
        }, this.checkForSizeChanges = function () {
            var e = this.$measureSizes();
            if (e && (this.$characterSize.width !== e.width || this.$characterSize.height !== e.height)) {
                this.$measureNode.style.fontWeight = "bold";
                var t = this.$measureSizes();
                this.$measureNode.style.fontWeight = "", this.$characterSize = e, this.allowBoldFonts = t && t.width === e.width && t.height === e.height, this._emit("changeCharacterSize", {data: e})
            }
        }, this.$pollSizeChanges = function () {
            var e = this;
            this.$pollSizeChangesTimer = setInterval(function () {
                e.checkForSizeChanges()
            }, 500)
        }, this.$fontStyles = {fontFamily: 1, fontSize: 1, fontWeight: 1, fontStyle: 1, lineHeight: 1}, this.$measureSizes = o.isIE || o.isOldGecko ? function () {
            var e = 1e3;
            if (!this.$measureNode) {
                var t = this.$measureNode = i.createElement("div"), n = t.style;
                n.width = n.height = "auto", n.left = n.top = -e * 40 + "px", n.visibility = "hidden", n.position = "fixed", n.overflow = "visible", n.whiteSpace = "nowrap", t.innerHTML = s.stringRepeat("Xy", e);
                if (this.element.ownerDocument.body)this.element.ownerDocument.body.appendChild(t); else {
                    var r = this.element.parentNode;
                    while (!i.hasCssClass(r, "ace_editor"))r = r.parentNode;
                    r.appendChild(t)
                }
            }
            if (!this.element.offsetWidth)return null;
            var n = this.$measureNode.style, o = i.computedStyle(this.element);
            for (var u in this.$fontStyles)n[u] = o[u];
            var a = {height: this.$measureNode.offsetHeight, width: this.$measureNode.offsetWidth / (e * 2)};
            return a.width == 0 || a.height == 0 ? null : a
        } : function () {
            if (!this.$measureNode) {
                var e = this.$measureNode = i.createElement("div"), t = e.style;
                t.width = t.height = "auto", t.left = t.top = "-100px", t.visibility = "hidden", t.position = "fixed", t.overflow = "visible", t.whiteSpace = "nowrap", e.innerHTML = "X";
                var n = this.element.parentNode;
                while (n && !i.hasCssClass(n, "ace_editor"))n = n.parentNode;
                if (!n)return this.$measureNode = null;
                n.appendChild(e)
            }
            var r = this.$measureNode.getBoundingClientRect(), s = {height: r.height, width: r.width};
            return s.width == 0 || s.height == 0 ? null : s
        }, this.setSession = function (e) {
            this.session = e, this.$computeTabString()
        }, this.showInvisibles = !1, this.setShowInvisibles = function (e) {
            return this.showInvisibles == e ? !1 : (this.showInvisibles = e, this.$computeTabString(), !0)
        }, this.displayIndentGuides = !0, this.setDisplayIndentGuides = function (e) {
            return this.displayIndentGuides == e ? !1 : (this.displayIndentGuides = e, this.$computeTabString(), !0)
        }, this.$tabStrings = [], this.onChangeTabSize = this.$computeTabString = function () {
            var e = this.session.getTabSize();
            this.tabSize = e;
            var t = this.$tabStrings = [0];
            for (var n = 1; n < e + 1; n++)this.showInvisibles ? t.push("<span class='ace_invisible'>" + this.TAB_CHAR + s.stringRepeat("?", n - 1) + "</span>") : t.push(s.stringRepeat("?", n));
            if (this.displayIndentGuides) {
                this.$indentGuideRe = /\s\S| \t|\t |\s$/;
                var r = "ace_indent-guide";
                if (this.showInvisibles) {
                    r += " ace_invisible";
                    var i = s.stringRepeat(this.SPACE_CHAR, this.tabSize), o = this.TAB_CHAR + s.stringRepeat("?", this.tabSize - 1)
                } else var i = s.stringRepeat("?", this.tabSize), o = i;
                this.$tabStrings[" "] = "<span class='" + r + "'>" + i + "</span>", this.$tabStrings["	"] = "<span class='" + r + "'>" + o + "</span>"
            }
        }, this.updateLines = function (e, t, n) {
            (this.config.lastRow != e.lastRow || this.config.firstRow != e.firstRow) && this.scrollLines(e), this.config = e;
            var r = Math.max(t, e.firstRow), s = Math.min(n, e.lastRow), o = this.element.childNodes, u = 0;
            for (var a = e.firstRow; a < r; a++) {
                var f = this.session.getFoldLine(a);
                if (f) {
                    if (f.containsRow(r)) {
                        r = f.start.row;
                        break
                    }
                    a = f.end.row
                }
                u++
            }
            var a = r, f = this.session.getNextFoldLine(a), l = f ? f.start.row : Infinity;
            for (; ;) {
                a > l && (a = f.end.row + 1, f = this.session.getNextFoldLine(a, f), l = f ? f.start.row : Infinity);
                if (a > s)break;
                var c = o[u++];
                if (c) {
                    var h = [];
                    this.$renderLine(h, a, !this.$useLineGroups(), a == l ? f : !1), i.setInnerHtml(c, h.join(""))
                }
                a++
            }
        }, this.scrollLines = function (e) {
            var t = this.config;
            this.config = e;
            if (!t || t.lastRow < e.firstRow)return this.update(e);
            if (e.lastRow < t.firstRow)return this.update(e);
            var n = this.element;
            if (t.firstRow < e.firstRow)for (var r = this.session.getFoldedRowCount(t.firstRow, e.firstRow - 1); r > 0; r--)n.removeChild(n.firstChild);
            if (t.lastRow > e.lastRow)for (var r = this.session.getFoldedRowCount(e.lastRow + 1, t.lastRow); r > 0; r--)n.removeChild(n.lastChild);
            if (e.firstRow < t.firstRow) {
                var i = this.$renderLinesFragment(e, e.firstRow, t.firstRow - 1);
                n.firstChild ? n.insertBefore(i, n.firstChild) : n.appendChild(i)
            }
            if (e.lastRow > t.lastRow) {
                var i = this.$renderLinesFragment(e
                    , t.lastRow + 1, e.lastRow);
                n.appendChild(i)
            }
        }, this.$renderLinesFragment = function (e, t, n) {
            var r = this.element.ownerDocument.createDocumentFragment(), s = t, o = this.session.getNextFoldLine(s), u = o ? o.start.row : Infinity;
            for (; ;) {
                s > u && (s = o.end.row + 1, o = this.session.getNextFoldLine(s, o), u = o ? o.start.row : Infinity);
                if (s > n)break;
                var a = i.createElement("div"), f = [];
                this.$renderLine(f, s, !1, s == u ? o : !1), a.innerHTML = f.join("");
                if (this.$useLineGroups())a.className = "ace_line_group", r.appendChild(a); else {
                    var l = a.childNodes;
                    while (l.length)r.appendChild(l[0])
                }
                s++
            }
            return r
        }, this.update = function (e) {
            this.config = e;
            var t = [], n = e.firstRow, r = e.lastRow, s = n, o = this.session.getNextFoldLine(s), u = o ? o.start.row : Infinity;
            for (; ;) {
                s > u && (s = o.end.row + 1, o = this.session.getNextFoldLine(s, o), u = o ? o.start.row : Infinity);
                if (s > r)break;
                this.$useLineGroups() && t.push("<div class='ace_line_group'>"), this.$renderLine(t, s, !1, s == u ? o : !1), this.$useLineGroups() && t.push("</div>"), s++
            }
            this.element = i.setInnerHtml(this.element, t.join(""))
        }, this.$textToken = {text: !0, rparen: !0, lparen: !0}, this.$renderToken = function (e, t, n, r) {
            var i = this, o = /\t|&|<|( +)|([\x00-\x1f\x80-\xa0\u1680\u180E\u2000-\u200f\u2028\u2029\u202F\u205F\u3000\uFEFF])|[\u1100-\u115F\u11A3-\u11A7\u11FA-\u11FF\u2329-\u232A\u2E80-\u2E99\u2E9B-\u2EF3\u2F00-\u2FD5\u2FF0-\u2FFB\u3000-\u303E\u3041-\u3096\u3099-\u30FF\u3105-\u312D\u3131-\u318E\u3190-\u31BA\u31C0-\u31E3\u31F0-\u321E\u3220-\u3247\u3250-\u32FE\u3300-\u4DBF\u4E00-\uA48C\uA490-\uA4C6\uA960-\uA97C\uAC00-\uD7A3\uD7B0-\uD7C6\uD7CB-\uD7FB\uF900-\uFAFF\uFE10-\uFE19\uFE30-\uFE52\uFE54-\uFE66\uFE68-\uFE6B\uFF01-\uFF60\uFFE0-\uFFE6]/g, u = function (e, n, r, o, u) {
                if (n)return i.showInvisibles ? "<span class='ace_invisible'>" + s.stringRepeat(i.SPACE_CHAR, e.length) + "</span>" : s.stringRepeat("?", e.length);
                if (e == "&")return"&#38;";
                if (e == "<")return"&#60;";
                if (e == "	") {
                    var a = i.session.getScreenTabSize(t + o);
                    return t += a - 1, i.$tabStrings[a]
                }
                if (e == "　") {
                    var f = i.showInvisibles ? "ace_cjk ace_invisible" : "ace_cjk", l = i.showInvisibles ? i.SPACE_CHAR : "";
                    return t += 1, "<span class='" + f + "' style='width:" + i.config.characterWidth * 2 + "px'>" + l + "</span>"
                }
                return r ? "<span class='ace_invisible ace_invalid'>" + i.SPACE_CHAR + "</span>" : (t += 1, "<span class='ace_cjk' style='width:" + i.config.characterWidth * 2 + "px'>" + e + "</span>")
            }, a = r.replace(o, u);
            if (!this.$textToken[n.type]) {
                var f = "ace_" + n.type.replace(/\./g, " ace_"), l = "";
                n.type == "fold" && (l = " style='width:" + n.value.length * this.config.characterWidth + "px;' "), e.push("<span class='", f, "'", l, ">", a, "</span>")
            } else e.push(a);
            return t + r.length
        }, this.renderIndentGuide = function (e, t) {
            var n = t.search(this.$indentGuideRe);
            return n <= 0 ? t : t[0] == " " ? (n -= n % this.tabSize, e.push(s.stringRepeat(this.$tabStrings[" "], n / this.tabSize)), t.substr(n)) : t[0] == "	" ? (e.push(s.stringRepeat(this.$tabStrings["	"], n)), t.substr(n)) : t
        }, this.$renderWrappedLine = function (e, t, n, r) {
            var i = 0, s = 0, o = n[0], u = 0;
            for (var a = 0; a < t.length; a++) {
                var f = t[a], l = f.value;
                if (a == 0 && this.displayIndentGuides) {
                    i = l.length, l = this.renderIndentGuide(e, l);
                    if (!l)continue;
                    i -= l.length
                }
                if (i + l.length < o)u = this.$renderToken(e, u, f, l), i += l.length; else {
                    while (i + l.length >= o)u = this.$renderToken(e, u, f, l.substring(0, o - i)), l = l.substring(o - i), i = o, r || e.push("</div>", "<div class='ace_line' style='height:", this.config.lineHeight, "px'>"), s++, u = 0, o = n[s] || Number.MAX_VALUE;
                    l.length != 0 && (i += l.length, u = this.$renderToken(e, u, f, l))
                }
            }
        }, this.$renderSimpleLine = function (e, t) {
            var n = 0, r = t[0], i = r.value;
            this.displayIndentGuides && (i = this.renderIndentGuide(e, i)), i && (n = this.$renderToken(e, n, r, i));
            for (var s = 1; s < t.length; s++)r = t[s], i = r.value, n = this.$renderToken(e, n, r, i)
        }, this.$renderLine = function (e, t, n, r) {
            !r && r != 0 && (r = this.session.getFoldLine(t));
            if (r)var i = this.$getFoldLineTokens(t, r); else var i = this.session.getTokens(t);
            n || e.push("<div class='ace_line' style='height:", this.config.lineHeight, "px'>");
            if (i.length) {
                var s = this.session.getRowSplitData(t);
                s && s.length ? this.$renderWrappedLine(e, i, s, n) : this.$renderSimpleLine(e, i)
            }
            this.showInvisibles && (r && (t = r.end.row), e.push("<span class='ace_invisible'>", t == this.session.getLength() - 1 ? this.EOF_CHAR : this.EOL_CHAR, "</span>")), n || e.push("</div>")
        }, this.$getFoldLineTokens = function (e, t) {
            function n(e, t, n) {
                var r = 0, s = 0;
                while (s + e[r].value.length < t) {
                    s += e[r].value.length, r++;
                    if (r == e.length)return
                }
                if (s != t) {
                    var o = e[r].value.substring(t - s);
                    o.length > n - t && (o = o.substring(0, n - t)), i.push({type: e[r].type, value: o}), s = t + o.length, r += 1
                }
                while (s < n && r < e.length) {
                    var o = e[r].value;
                    o.length + s > n ? i.push({type: e[r].type, value: o.substring(0, n - s)}) : i.push(e[r]), s += o.length, r += 1
                }
            }

            var r = this.session, i = [], s = r.getTokens(e);
            return t.walk(function (e, t, o, u, a) {
                e != null ? i.push({type: "fold", value: e}) : (a && (s = r.getTokens(t)), s.length && n(s, u, o))
            }, t.end.row, this.session.getLine(t.end.row).length), i
        }, this.$useLineGroups = function () {
            return this.session.getUseWrapMode()
        }, this.destroy = function () {
            clearInterval(this.$pollSizeChangesTimer), this.$measureNode && this.$measureNode.parentNode.removeChild(this.$measureNode), delete this.$measureNode
        }
    }).call(a.prototype), t.Text = a
}), define("ace/layer/cursor", ["require", "exports", "module", "ace/lib/dom"], function (e, t, n) {
    var r = e("../lib/dom"), i = function (e) {
        this.element = r.createElement("div"), this.element.className = "ace_layer ace_cursor-layer", e.appendChild(this.element), this.isVisible = !1, this.isBlinking = !0, this.blinkInterval = 1e3, this.smoothBlinking = !1, this.cursors = [], this.cursor = this.addCursor(), r.addCssClass(this.element, "ace_hidden-cursors")
    };
    (function () {
        this.$padding = 0, this.setPadding = function (e) {
            this.$padding = e
        }, this.setSession = function (e) {
            this.session = e
        }, this.setBlinking = function (e) {
            e != this.isBlinking && (this.isBlinking = e, this.restartTimer())
        }, this.setBlinkInterval = function (e) {
            e != this.blinkInterval && (this.blinkInterval = e, this.restartTimer())
        }, this.setSmoothBlinking = function (e) {
            e != this.smoothBlinking && (this.smoothBlinking = e, e ? r.addCssClass(this.element, "ace_smooth-blinking") : r.removeCssClass(this.element, "ace_smooth-blinking"), this.restartTimer())
        }, this.addCursor = function () {
            var e = r.createElement("div");
            return e.className = "ace_cursor", this.element.appendChild(e), this.cursors.push(e), e
        }, this.removeCursor = function () {
            if (this.cursors.length > 1) {
                var e = this.cursors.pop();
                return e.parentNode.removeChild(e), e
            }
        }, this.hideCursor = function () {
            this.isVisible = !1, r.addCssClass(this.element, "ace_hidden-cursors"), this.restartTimer()
        }, this.showCursor = function () {
            this.isVisible = !0, r.removeCssClass(this.element, "ace_hidden-cursors"), this.restartTimer()
        }, this.restartTimer = function () {
            clearInterval(this.intervalId), clearTimeout(this.timeoutId), this.smoothBlinking && r.removeCssClass(this.element, "ace_smooth-blinking");
            for (var e = this.cursors.length; e--;)this.cursors[e].style.opacity = "";
            if (!this.isBlinking || !this.blinkInterval || !this.isVisible)return;
            this.smoothBlinking && setTimeout(function () {
                r.addCssClass(this.element, "ace_smooth-blinking")
            }.bind(this));
            var t = function () {
                this.timeoutId = setTimeout(function () {
                    for (var e = this.cursors.length; e--;)this.cursors[e].style.opacity = 0
                }.bind(this), .6 * this.blinkInterval)
            }.bind(this);
            this.intervalId = setInterval(function () {
                for (var e = this.cursors.length; e--;)this.cursors[e].style.opacity = "";
                t()
            }.bind(this), this.blinkInterval), t()
        }, this.getPixelPosition = function (e, t) {
            if (!this.config || !this.session)return{left: 0, top: 0};
            e || (e = this.session.selection.getCursor());
            var n = this.session.documentToScreenPosition(e), r = this.$padding + n.column * this.config.characterWidth, i = (n.row - (t ? this.config.firstRowScreen : 0)) * this.config.lineHeight;
            return{left: r, top: i}
        }, this.update = function (e) {
            this.config = e;
            var t = this.session.$selectionMarkers, n = 0, r = 0;
            if (t === undefined || t.length === 0)t = [
                {cursor: null}
            ];
            for (var n = 0, i = t.length; n < i; n++) {
                var s = this.getPixelPosition(t[n].cursor, !0);
                if ((s.top > e.height + e.offset || s.top < -e.offset) && n > 1)continue;
                var o = (this.cursors[r++] || this.addCursor()).style;
                o.left = s.left + "px", o.top = s.top + "px", o.width = e.characterWidth + "px", o.height = e.lineHeight + "px"
            }
            while (this.cursors.length > r)this.removeCursor();
            var u = this.session.getOverwrite();
            this.$setOverwrite(u), this.$pixelPos = s, this.restartTimer()
        }, this.$setOverwrite = function (e) {
            e != this.overwrite && (this.overwrite = e, e ? r.addCssClass(this.element, "ace_overwrite-cursors") : r.removeCssClass(this.element, "ace_overwrite-cursors"))
        }, this.destroy = function () {
            clearInterval(this.intervalId), clearTimeout(this.timeoutId)
        }
    }).call(i.prototype), t.Cursor = i
}), define("ace/scrollbar", ["require", "exports", "module", "ace/lib/oop", "ace/lib/dom", "ace/lib/event", "ace/lib/event_emitter"], function (e, t, n) {
    var r = e("./lib/oop"), i = e("./lib/dom"), s = e("./lib/event"), o = e("./lib/event_emitter").EventEmitter, u = function (e) {
        this.element = i.createElement("div"), this.element.className = "ace_scrollbar", this.inner = i.createElement("div"), this.inner.className = "ace_scrollbar-inner", this.element.appendChild(this.inner), e.appendChild(this.element), this.width = i.scrollbarWidth(e.ownerDocument), this.element.style.width = (this.width || 15) + 5 + "px", s.addListener(this.element, "scroll", this.onScroll.bind(this))
    };
    (function () {
        r.implement(this, o), this.onScroll = function () {
            this.skipEvent || (this.scrollTop = this.element.scrollTop, this._emit("scroll", {data: this.scrollTop})), this.skipEvent = !1
        }, this.getWidth = function () {
            return this.width
        }, this.setHeight = function (e) {
            this.element.style.height = e + "px"
        }, this.setInnerHeight = function (e) {
            this.inner.style.height = e + "px"
        }, this.setScrollTop = function (e) {
            this.scrollTop != e && (this.skipEvent = !0, this.scrollTop = this.element.scrollTop = e)
        }
    }).call(u.prototype), t.ScrollBar = u
}), define("ace/renderloop", ["require", "exports", "module", "ace/lib/event"], function (e, t, n) {
    var r = e("./lib/event"), i = function (e, t) {
        this.onRender = e, this.pending = !1, this.changes = 0, this.window = t || window
    };
    (function () {
        this.schedule = function (e) {
            this.changes = this.changes | e;
            if (!this.pending) {
                this.pending = !0;
                var t = this;
                r.nextFrame(function () {
                    t.pending = !1;
                    var e;
                    while (e = t.changes)t.changes = 0, t.onRender(e)
                }, this.window)
            }
        }
    }).call(i.prototype), t.RenderLoop = i
}), define("ace/multi_select", ["require", "exports", "module", "ace/range_list", "ace/range", "ace/selection", "ace/mouse/multi_select_handler", "ace/lib/event", "ace/lib/lang", "ace/commands/multi_select_commands", "ace/search", "ace/edit_session", "ace/editor"], function (e, t, n) {
    function r(e, t, n) {
        return v.$options.wrap = !0, v.$options.needle = t, v.$options.backwards = n == -1, v.find(e)
    }

    function i(e, t) {
        return e.row == t.row && e.column == t.column
    }

    function s(e) {
        e.$onAddRange = e.$onAddRange.bind(e), e.$onRemoveRange = e.$onRemoveRange.bind(e), e.$onMultiSelect = e.$onMultiSelect.bind(e), e.$onSingleSelect = e.$onSingleSelect.bind(e), t.onSessionChange.call(e, e), e.on("changeSession", t.onSessionChange.bind(e)), e.on("mousedown", l), e.commands.addCommands(p.defaultCommands), o(e)
    }

    function o(e) {
        function t() {
            r && (i.style.cursor = "", r = !1)
        }

        var n = e.textInput.getElement(), r = !1, i = e.renderer.content;
        c.addListener(n, "keydown", function (e) {
            e.keyCode == 18 && !(e.ctrlKey || e.shiftKey || e.metaKey) ? r || (i.style.cursor = "crosshair", r = !0) : r && (i.style.cursor = "")
        }), c.addListener(n, "keyup", t), c.addListener(n, "blur", t)
    }

    var u = e("./range_list").RangeList, a = e("./range").Range, f = e("./selection").Selection, l = e("./mouse/multi_select_handler").onMouseDown, c = e("./lib/event"), h = e("./lib/lang"), p = e("./commands/multi_select_commands");
    t.commands = p.defaultCommands.concat(p.multiSelectCommands);
    var d = e("./search").Search, v = new d, m = e("./edit_session").EditSession;
    (function () {
        this.getSelectionMarkers = function () {
            return this.$selectionMarkers
        }
    }).call(m.prototype), function () {
        this.ranges = null, this.rangeList = null, this.addRange = function (e, t) {
            if (!e)return;
            if (!this.inMultiSelectMode && this.rangeCount == 0) {
                var n = this.toOrientedRange();
                this.rangeList.add(n), this.rangeList.add(e);
                if (this.rangeList.ranges.length != 2)return this.rangeList.removeAll(), t || this.fromOrientedRange(e);
                this.rangeList.removeAll(), this.rangeList.add(n), this.$onAddRange(n)
            }
            e.cursor || (e.cursor = e.end);
            var r = this.rangeList.add(e);
            return this.$onAddRange(e), r.length && this.$onRemoveRange(r), this.rangeCount > 1 && !this.inMultiSelectMode && (this._emit("multiSelect"), this.inMultiSelectMode = !0, this.session.$undoSelect = !1, this.rangeList.attach(this.session)), t || this.fromOrientedRange(e)
        }, this.toSingleRange = function (e) {
            e = e || this.ranges[0];
            var t = this.rangeList.removeAll();
            t.length && this.$onRemoveRange(t), e && this.fromOrientedRange(e)
        }, this.substractPoint = function (e) {
            var t = this.rangeList.substractPoint(e);
            if (t)return this.$onRemoveRange(t), t[0]
        }, this.mergeOverlappingRanges = function () {
            var e = this.rangeList.merge();
            e.length ? this.$onRemoveRange(e) : this.ranges[0] && this.fromOrientedRange(this.ranges[0])
        }, this.$onAddRange = function (e) {
            this.rangeCount = this.rangeList.ranges.length, this.ranges.unshift(e), this._emit("addRange", {range: e})
        }, this.$onRemoveRange = function (e) {
            this.rangeCount = this.rangeList.ranges.length;
            if (this.rangeCount == 1 && this.inMultiSelectMode) {
                var t = this.rangeList.ranges.pop();
                e.push(t), this.rangeCount = 0
            }
            for (var n = e.length; n--;) {
                var r = this.ranges.indexOf(e[n]);
                this.ranges.splice(r, 1)
            }
            this._emit("removeRange", {ranges: e}), this.rangeCount == 0 && this.inMultiSelectMode && (this.inMultiSelectMode = !1, this._emit("singleSelect"), this.session.$undoSelect = !0, this.rangeList.detach(this.session)), t = t || this.ranges[0], t && !t.isEqual(this.getRange()) && this.fromOrientedRange(t)
        }, this.$initRangeList = function () {
            if (this.rangeList)return;
            this.rangeList = new u, this.ranges = [], this.rangeCount = 0
        }, this.getAllRanges = function () {
            return this.rangeList.ranges.concat()
        }, this.splitIntoLines = function () {
            if (this.rangeCount > 1) {
                var e = this.rangeList.ranges, t = e[e.length - 1], n = a.fromPoints(e[0].start, t.end);
                this.toSingleRange(), this.setSelectionRange(n, t.cursor == t.start)
            } else {
                var n = this.getRange(), r = this.isBackwards(), i = n.start.row, s = n.end.row;
                if (i == s) {
                    if (r)var o = n.end, u = n.start; else var o = n.start, u = n.end;
                    this.addRange(a.fromPoints(u, u)), this.addRange(a.fromPoints(o, o));
                    return
                }
                var f = [], l = this.getLineRange(i, !0);
                l.start.column = n.start.column, f.push(l);
                for (var c = i + 1; c < s; c++)f.push(this.getLineRange(c, !0));
                l = this.getLineRange(s, !0), l.end.column = n.end.column, f.push(l), f.forEach(this.addRange, this)
            }
        }, this.toggleBlockSelection = function () {
            if (this.rangeCount > 1) {
                var e = this.rangeList.ranges, t = e[e.length - 1], n = a.fromPoints(e[0].start, t.end);
                this.toSingleRange(), this.setSelectionRange(n, t.cursor == t.start)
            } else {
                var r = this.session.documentToScreenPosition(this.selectionLead), i = this.session.documentToScreenPosition(this.selectionAnchor), s = this.rectangularRangeBlock(r, i);
                s.forEach(this.addRange, this)
            }
        }, this.rectangularRangeBlock = function (e, t, n) {
            var r = [], s = e.column < t.column;
            if (s)var o = e.column, u = t.column; else var o = t.column, u = e.column;
            var f = e.row < t.row;
            if (f)var l = e.row, c = t.row; else var l = t.row, c = e.row;
            o < 0 && (o = 0), l < 0 && (l = 0), l == c && (n = !0);
            for (var h = l; h <= c; h++) {
                var p = a.fromPoints(this.session.screenToDocumentPosition(h, o), this.session.screenToDocumentPosition(h, u));
                if (p.isEmpty()) {
                    if (d && i(p.end, d))break;
                    var d = p.end
                }
                p.cursor = s ? p.start : p.end, r.push(p)
            }
            f && r.reverse();
            if (!n) {
                var v = r.length - 1;
                while (r[v].isEmpty() && v > 0)v--;
                if (v > 0) {
                    var m = 0;
                    while (r[m].isEmpty())m++
                }
                for (var g = v; g >= m; g--)r[g].isEmpty() && r.splice(g, 1)
            }
            return r
        }
    }.call(f.prototype);
    var g = e("./editor").Editor;
    (function () {
        this.updateSelectionMarkers = function () {
            this.renderer.updateCursor(), this.renderer.updateBackMarkers()
        }, this.addSelectionMarker = function (e) {
            e.cursor || (e.cursor = e.end);
            var t = this.getSelectionStyle();
            return e.marker = this.session.addMarker(e, "ace_selection", t), this.session.$selectionMarkers.push(e), this.session.selectionMarkerCount = this.session.$selectionMarkers.length, e
        }, this.removeSelectionMarker = function (e) {
            if (!e.marker)return;
            this.session.removeMarker(e.marker);
            var t = this.session.$selectionMarkers.indexOf(e);
            t != -1 && this.session.$selectionMarkers.splice(t, 1), this.session.selectionMarkerCount = this.session.$selectionMarkers.length
        }, this.removeSelectionMarkers = function (e) {
            var t = this.session.$selectionMarkers;
            for (var n = e.length; n--;) {
                var r = e[n];
                if (!r.marker)continue;
                this.session.removeMarker(r.marker);
                var i = t.indexOf(r);
                i != -1 && t.splice(i, 1)
            }
            this.session.selectionMarkerCount = t.length
        }, this.$onAddRange = function (e) {
            this.addSelectionMarker(e.range), this.renderer.updateCursor(), this.renderer.updateBackMarkers()
        }, this.$onRemoveRange = function (e) {
            this.removeSelectionMarkers(e.ranges), this.renderer.updateCursor(), this.renderer.updateBackMarkers()
        }, this.$onMultiSelect = function (e) {
            if (this.inMultiSelectMode)return;
            this.inMultiSelectMode = !0, this.setStyle("ace_multiselect"), this.keyBinding.addKeyboardHandler(p.keyboardHandler), this.commands.on("exec", this.$onMultiSelectExec), this.renderer.updateCursor(), this.renderer.updateBackMarkers()
        }, this.$onSingleSelect = function (e) {
            if (this.session.multiSelect.inVirtualMode)return;
            this.inMultiSelectMode = !1, this.unsetStyle("ace_multiselect"), this.keyBinding.removeKeyboardHandler(p.keyboardHandler), this.commands.removeEventListener("exec", this.$onMultiSelectExec), this.renderer.updateCursor(), this.renderer.updateBackMarkers()
        }, this.$onMultiSelectExec = function (e) {
            var t = e.command, n = e.editor;
            if (!n.multiSelect)return;
            t.multiSelectAction ? t.multiSelectAction == "forEach" ? n.forEachSelection(t, e.args) : t.multiSelectAction == "forEachLine" ? n.forEachSelection(t, e.args, !0) : t.multiSelectAction == "single" ? (n.exitMultiSelectMode(), t.exec(n, e.args || {})) : t.multiSelectAction(n, e.args || {}) : (t.exec(n, e.args || {}), n.multiSelect.addRange(n.multiSelect.toOrientedRange()), n.multiSelect.mergeOverlappingRanges()), e.preventDefault()
        }, this.forEachSelection = function (e, t, n) {
            if (this.inVirtualSelectionMode)return;
            var r = this.session, i = this.selection, s = i.rangeList, o = i._eventRegistry;
            i._eventRegistry = {};
            var u = new f(r);
            this.inVirtualSelectionMode = !0;
            for (var a = s.ranges.length; a--;) {
                if (n)while (a > 0 && s.ranges[a].start.row == s.ranges[a - 1].end.row)a--;
                u.fromOrientedRange(s.ranges[a]), this.selection = r.selection = u, e.exec(this, t || {}), u.toOrientedRange(s.ranges[a])
            }
            u.detach(), this.selection = r.selection = i, this.inVirtualSelectionMode = !1, i._eventRegistry = o, i.mergeOverlappingRanges(), this.onCursorChange(), this.onSelectionChange()
        }, this.exitMultiSelectMode = function () {
            if (this.inVirtualSelectionMode)return;
            this.multiSelect.toSingleRange()
        }, this.getCopyText = function () {
            var e = "";
            if (this.inMultiSelectMode) {
                var t = this.multiSelect.rangeList.ranges, n = [];
                for (var r = 0; r < t.length; r++)n.push(this.session.getTextRange(t[r]));
                var i = this.session.getDocument().getNewLineCharacter();
                e = n.join(i), e.length == (n.length - 1) * i.length && (e = "")
            } else this.selection.isEmpty() || (e = this.session.getTextRange(this.getSelectionRange()));
            return e
        }, this.onPaste = function (e) {
            if (this.$readOnly)return;
            this._signal("paste", e);
            if (!this.inMultiSelectMode || this.inVirtualSelectionMode)return this.insert(e);
            var t = e.split(/\r\n|\r|\n/), n = this.selection.rangeList.ranges;
            if (t.length > n.length || t.length <= 2 && !t[1])return this.commands.exec("insertstring", this, e);
            for (var r = n.length; r--;) {
                var i = n[r];
                i.isEmpty() || this.session.remove(i), this.session.insert(i.start, t[r])
            }
        }, this.findAll = function (e, t, n) {
            t = t || {}, t.needle = e || t.needle, this.$search.set(t);
            var r = this.$search.findAll(this.session);
            if (!r.length)return 0;
            this.$blockScrolling += 1;
            var i = this.multiSelect;
            n || i.toSingleRange(r[0]);
            for (var s = r.length; s--;)i.addRange(r[s], !0);
            return this.$blockScrolling -= 1, r.length
        }, this.selectMoreLines = function (e, t) {
            var n = this.selection.toOrientedRange(), r = n.cursor == n.end, i = this.session.documentToScreenPosition(n.cursor);
            this.selection.$desiredColumn && (i.column = this.selection.$desiredColumn);
            var s = this.session.screenToDocumentPosition(i.row + e, i.column);
            if (!n.isEmpty())var o = this.session.documentToScreenPosition(r ? n.end : n.start), u = this.session.screenToDocumentPosition(o.row + e, o.column); else var u = s;
            if (r) {
                var f = a.fromPoints(s, u);
                f.cursor = f.start
            } else {
                var f = a.fromPoints(u, s);
                f.cursor = f.end
            }
            f.desiredColumn = i.column;
            if (!this.selection.inMultiSelectMode)this.selection.addRange(n); else if (t)var l = n.cursor;
            this.selection.addRange(f), l && this.selection.substractPoint(l)
        }, this.transposeSelections = function (e) {
            var t = this.session, n = t.multiSelect, r = n.ranges;
            for (var i = r.length; i--;) {
                var s = r[i];
                if (s.isEmpty()) {
                    var o = t.getWordRange(s.start.row, s.start.column);
                    s.start.row = o.start.row, s.start.column = o.start.column, s.end.row = o.end.row, s.end.column = o.end.column
                }
            }
            n.mergeOverlappingRanges();
            var u = [];
            for (var i = r.length; i--;) {
                var s = r[i];
                u.unshift(t.getTextRange(s))
            }
            e < 0 ? u.unshift(u.pop()) : u.push(u.shift());
            for (var i = r.length; i--;) {
                var s = r[i], o = s.clone();
                t.replace(s, u[i]), s.start.row = o.start.row, s.start.column = o.start.column
            }
        }, this.selectMore = function (e, t) {
            var n = this.session, i = n.multiSelect, s = i.toOrientedRange();
            if (s.isEmpty()) {
                var s = n.getWordRange(s.start.row, s.start.column);
                s.cursor = s.end, this.multiSelect.addRange(s)
            }
            var o = n.getTextRange(s), u = r(n, o, e);
            u && (u.cursor = e == -1 ? u.start : u.end, this.multiSelect.addRange(u)), t && this.multiSelect.substractPoint(s.cursor)
        }, this.alignCursors = function () {
            var e = this.session, t = e.multiSelect, n = t.ranges;
            if (!n.length) {
                var r = this.selection.getRange(), i = r.start.row, s = r.end.row, o = this.session.doc.removeLines(i, s);
                o = this.$reAlignText(o), this.session.doc.insertLines(i, o), r.start.column = 0, r.end.column = o[o.length - 1].length, this.selection.setRange(r)
            } else {
                var u = -1, f = n.filter(function (e) {
                    if (e.cursor.row == u)return!0;
                    u = e.cursor.row
                });
                t.$onRemoveRange(f);
                var l = 0, c = Infinity, p = n.map(function (t) {
                    var n = t.cursor, r = e.getLine(n.row), i = r.substr(n.column).search(/\S/g);
                    return i == -1 && (i = 0), n.column > l && (l = n.column), i < c && (c = i), i
                });
                n.forEach(function (t, n) {
                    var r = t.cursor, i = l - r.column, s = p[n] - c;
                    i > s ? e.insert(r, h.stringRepeat(" ", i - s)) : e.remove(new a(r.row, r.column, r.row, r.column - i + s)), t.start.column = t.end.column = l, t.start.row = t.end.row = r.row, t.cursor = t.end
                }), t.fromOrientedRange(n[0]), this.renderer.updateCursor(), this.renderer.updateBackMarkers()
            }
        }, this.$reAlignText = function (e) {
            function t(e) {
                return h.stringRepeat(" ", e)
            }

            function n(e) {
                return e[2] ? t(u) + e[2] + t(a - e[2].length + f) + e[4].replace(/^([=:])\s+/, "$1 ") : e[0]
            }

            function r(e) {
                return e[2] ? t(u + a - e[2].length) + e[2] + t(f, " ") + e[4].replace(/^([=:])\s+/, "$1 ") : e[0]
            }

            function i(e) {
                return e[2] ? t(u) + e[2] + t(f) + e[4].replace(/^([=:])\s+/, "$1 ") : e[0]
            }

            var s = !0, o = !0, u, a, f;
            return e.map(function (e) {
                var t = e.match(/(\s*)(.*?)(\s*)([=:].*)/);
                return t ? u == null ? (u = t[1].length, a = t[2].length, f = t[3].length, t) : (u + a + f != t[1].length + t[2].length + t[3].length && (o = !1), u != t[1].length && (s = !1), u > t[1].length && (u = t[1].length), a < t[2].length && (a = t[2].length), f > t[3].length && (f = t[3].length), t) : [e]
            }).map(s ? o ? r : n : i)
        }
    }).call(g.prototype), t.onSessionChange = function (e) {
        var t = e.session;
        t.multiSelect || (t.$selectionMarkers = [], t.selection.$initRangeList(), t.multiSelect = t.selection), this.multiSelect = t.multiSelect;
        var n = e.oldSession;
        n && (n.multiSelect.removeEventListener("addRange", this.$onAddRange), n.multiSelect.removeEventListener("removeRange", this.$onRemoveRange), n.multiSelect.removeEventListener("multiSelect", this.$onMultiSelect), n.multiSelect.removeEventListener("singleSelect", this.$onSingleSelect)), t.multiSelect.on("addRange", this.$onAddRange), t.multiSelect.on("removeRange", this.$onRemoveRange), t.multiSelect.on("multiSelect", this.$onMultiSelect), t.multiSelect.on("singleSelect", this.$onSingleSelect), this.inMultiSelectMode != t.selection.inMultiSelectMode && (t.selection.inMultiSelectMode ? this.$onMultiSelect() : this.$onSingleSelect())
    }, t.MultiSelect = s
}), define("ace/mouse/multi_select_handler", ["require", "exports", "module", "ace/lib/event"], function (e, t, n) {
    function r(e, t) {
        return e.row == t.row && e.column == t.column
    }

    function i(e) {
        var t = e.domEvent, n = t.altKey, i = t.shiftKey, o = e.getAccelKey(), u = e.getButton();
        if (e.editor.inMultiSelectMode && u == 2) {
            e.editor.textInput.onContextMenu(e.domEvent);
            return
        }
        if (!o && !n) {
            u == 0 && e.editor.inMultiSelectMode && e.editor.exitMultiSelectMode();
            return
        }
        var a = e.editor, f = a.selection, l = a.inMultiSelectMode, c = e.getDocumentPosition(), h = f.getCursor(), p = e.inSelection() || f.isEmpty() && r(c, h), d = e.x, v = e.y, m = function (e) {
            d = e.clientX, v = e.clientY
        }, g = function () {
            var e = a.renderer.pixelToScreenCoordinates(d, v), t = y.screenToDocumentPosition(e.row, e.column);
            if (r(w, e) && r(t, f.selectionLead))return;
            w = e, a.selection.moveCursorToPosition(t), a.selection.clearSelection(), a.renderer.scrollCursorIntoView(), a.removeSelectionMarkers(x), x = f.rectangularRangeBlock(w, b), x.forEach(a.addSelectionMarker, a), a.updateSelectionMarkers()
        }, y = a.session, b = a.renderer.pixelToScreenCoordinates(d, v), w = b;
        if (o && !i && !n && u == 0) {
            if (!l && p)return;
            if (!l) {
                var E = f.toOrientedRange();
                a.addSelectionMarker(E)
            }
            var S = f.rangeList.rangeAtPoint(c);
            a.once("mouseup", function () {
                var e = f.toOrientedRange();
                S && e.isEmpty() && r(S.cursor, e.cursor) ? f.substractPoint(e.cursor) : (E && (a.removeSelectionMarker(E), f.addRange(E)), f.addRange(e))
            })
        } else if (n && u == 0) {
            e.stop(), l && !o ? f.toSingleRange() : !l && o && f.addRange();
            var x = [];
            i ? (b = y.documentToScreenPosition(f.lead), g()) : (f.moveCursorToPosition(c), f.clearSelection());
            var T = function (e) {
                clearInterval(C), a.removeSelectionMarkers(x);
                for (var t = 0; t < x.length; t++)f.addRange(x[t])
            }, N = g;
            s.capture(a.container, m, T);
            var C = setInterval(function () {
                N()
            }, 20);
            return e.preventDefault()
        }
    }

    var s = e("../lib/event");
    t.onMouseDown = i
}), define("ace/commands/multi_select_commands", ["require", "exports", "module", "ace/keyboard/hash_handler"], function (e, t, n) {
    t.defaultCommands = [
        {name: "addCursorAbove", exec: function (e) {
            e.selectMoreLines(-1)
        }, bindKey: {win: "Ctrl-Alt-Up", mac: "Ctrl-Alt-Up"}, readonly: !0},
        {name: "addCursorBelow", exec: function (e) {
            e.selectMoreLines(1)
        }, bindKey: {win: "Ctrl-Alt-Down", mac: "Ctrl-Alt-Down"}, readonly: !0},
        {name: "addCursorAboveSkipCurrent", exec: function (e) {
            e.selectMoreLines(-1, !0)
        }, bindKey: {win: "Ctrl-Alt-Shift-Up", mac: "Ctrl-Alt-Shift-Up"}, readonly: !0},
        {name: "addCursorBelowSkipCurrent", exec: function (e) {
            e.selectMoreLines(1, !0)
        }, bindKey: {win: "Ctrl-Alt-Shift-Down", mac: "Ctrl-Alt-Shift-Down"}, readonly: !0},
        {name: "selectMoreBefore", exec: function (e) {
            e.selectMore(-1)
        }, bindKey: {win: "Ctrl-Alt-Left", mac: "Ctrl-Alt-Left"}, readonly: !0},
        {name: "selectMoreAfter", exec: function (e) {
            e.selectMore(1)
        }, bindKey: {win: "Ctrl-Alt-Right", mac: "Ctrl-Alt-Right"}, readonly: !0},
        {name: "selectNextBefore", exec: function (e) {
            e.selectMore(-1, !0)
        }, bindKey: {win: "Ctrl-Alt-Shift-Left", mac: "Ctrl-Alt-Shift-Left"}, readonly: !0},
        {name: "selectNextAfter", exec: function (e) {
            e.selectMore(1, !0)
        }, bindKey: {win: "Ctrl-Alt-Shift-Right", mac: "Ctrl-Alt-Shift-Right"}, readonly: !0},
        {name: "splitIntoLines", exec: function (e) {
            e.multiSelect.splitIntoLines()
        }, bindKey: {win: "Ctrl-Alt-L", mac: "Ctrl-Alt-L"}, readonly: !0},
        {name: "alignCursors", exec: function (e) {
            e.alignCursors()
        }, bindKey: {win: "Ctrl-Alt-A", mac: "Ctrl-Alt-A"}}
    ], t.multiSelectCommands = [
        {name: "singleSelection", bindKey: "esc", exec: function (e) {
            e.exitMultiSelectMode()
        }, readonly: !0, isAvailable: function (e) {
            return e && e.inMultiSelectMode
        }}
    ];
    var r = e("../keyboard/hash_handler").HashHandler;
    t.keyboardHandler = new r(t.multiSelectCommands)
}), define("ace/worker/worker_client", ["require", "exports", "module", "ace/lib/oop", "ace/lib/event_emitter", "ace/config"], function (e, t, n) {
    var r = e("../lib/oop"), i = e("../lib/event_emitter").EventEmitter, s = e("../config"), o = function (t, n, r) {
        this.$sendDeltaQueue = this.$sendDeltaQueue.bind(this), this.changeListener = this.changeListener.bind(this), this.onMessage = this.onMessage.bind(this), this.onError = this.onError.bind(this);
        var i;
        if (s.get("packaged"))i = s.moduleUrl(n, "worker"); else {
            var o = this.$normalizePath;
            e.nameToUrl && !e.toUrl && (e.toUrl = e.nameToUrl), i = o(e.toUrl("ace/worker/worker.js", null, "_"));
            var u = {};
            t.forEach(function (t) {
                u[t] = o(e.toUrl(t, null, "_").replace(/(\.js)?(\?.*)?$/, ""))
            })
        }
        this.$worker = new Worker(i), this.$worker.postMessage({init: !0, tlns: u, module: n, classname: r}), this.callbackId = 1, this.callbacks = {}, this.$worker.onerror = this.onError, this.$worker.onmessage = this.onMessage
    };
    (function () {
        r.implement(this, i), this.onError = function (e) {
            throw window.console && console.log && console.log(e), e
        }, this.onMessage = function (e) {
            var t = e.data;
            switch (t.type) {
                case"log":
                    window.console && console.log && console.log.apply(console, t.data);
                    break;
                case"event":
                    this._emit(t.name, {data: t.data});
                    break;
                case"call":
                    var n = this.callbacks[t.id];
                    n && (n(t.data), delete this.callbacks[t.id])
            }
        }, this.$normalizePath = function (e) {
            return location.host ? (e = e.replace(/^[a-z]+:\/\/[^\/]+/, ""), e = location.protocol + "//" + location.host + (e.charAt(0) == "/" ? "" : location.pathname.replace(/\/[^\/]*$/, "")) + "/" + e.replace(/^[\/]+/, ""), e) : e
        }, this.terminate = function () {
            this._emit("terminate", {}), this.$worker.terminate(), this.$worker = null, this.$doc.removeEventListener("change", this.changeListener), this.$doc = null
        }, this.send = function (e, t) {
            this.$worker.postMessage({command: e, args: t})
        }, this.call = function (e, t, n) {
            if (n) {
                var r = this.callbackId++;
                this.callbacks[r] = n, t.push(r)
            }
            this.send(e, t)
        }, this.emit = function (e, t) {
            try {
                this.$worker.postMessage({event: e, data: {data: t.data}})
            } catch (n) {
            }
        }, this.attachToDocument = function (e) {
            this.$doc && this.terminate(), this.$doc = e, this.call("setValue", [e.getValue()]), e.on("change", this.changeListener)
        }, this.changeListener = function (e) {
            this.deltaQueue ? this.deltaQueue.push(e.data) : (this.deltaQueue = [e.data], setTimeout(this.$sendDeltaQueue, 1))
        }, this.$sendDeltaQueue = function () {
            var e = this.deltaQueue;
            if (!e)return;
            this.deltaQueue = null, e.length > 20 && e.length > this.$doc.getLength() >> 1 ? this.call("setValue", [this.$doc.getValue()]) : this.emit("change", {data: e})
        }
    }).call(o.prototype);
    var u = function (e, t, n) {
        this.$sendDeltaQueue = this.$sendDeltaQueue.bind(this), this.changeListener = this.changeListener.bind(this), this.callbackId = 1, this.callbacks = {}, this.messageBuffer = [];
        var r = null, o = Object.create(i), u = this;
        this.$worker = {}, this.$worker.terminate = function () {
        }, this.$worker.postMessage = function (e) {
            u.messageBuffer.push(e), r && setTimeout(a)
        };
        var a = function () {
            var e = u.messageBuffer.shift();
            e.command ? r[e.command].apply(r, e.args) : e.event && o._emit(e.event, e.data)
        };
        o.postMessage = function (e) {
            u.onMessage({data: e})
        }, o.callback = function (e, t) {
            this.postMessage({type: "call", id: t, data: e})
        }, o.emit = function (e, t) {
            this.postMessage({type: "event", name: e, data: t})
        }, s.loadModule(["worker", t], function (e) {
            r = new e[n](o);
            while (u.messageBuffer.length)a()
        })
    };
    u.prototype = o.prototype, t.UIWorkerClient = u, t.WorkerClient = o
}), define("ace/placeholder", ["require", "exports", "module", "ace/range", "ace/lib/event_emitter", "ace/lib/oop"], function (e, t, n) {
    var r = e("./range").Range, i = e("./lib/event_emitter").EventEmitter, s = e("./lib/oop"), o = function (e, t, n, r, i, s) {
        var o = this;
        this.length = t, this.session = e, this.doc = e.getDocument(), this.mainClass = i, this.othersClass = s, this.$onUpdate = this.onUpdate.bind(this), this.doc.on("change", this.$onUpdate), this.$others = r, this.$onCursorChange = function () {
            setTimeout(function () {
                o.onCursorChange()
            })
        }, this.$pos = n;
        var u = e.getUndoManager().$undoStack || e.getUndoManager().$undostack || {length: -1};
        this.$undoStackDepth = u.length, this.setup(), e.selection.on("changeCursor", this.$onCursorChange)
    };
    (function () {
        s.implement(this, i), this.setup = function () {
            var e = this, t = this.doc, n = this.session, i = this.$pos;
            this.pos = t.createAnchor(i.row, i.column), this.markerId = n.addMarker(new r(i.row, i.column, i.row, i.column + this.length), this.mainClass, null, !1), this.pos.on("change", function (t) {
                n.removeMarker(e.markerId), e.markerId = n.addMarker(new r(t.value.row, t.value.column, t.value.row, t.value.column + e.length), e.mainClass, null, !1)
            }), this.others = [], this.$others.forEach(function (n) {
                var r = t.createAnchor(n.row, n.column);
                e.others.push(r)
            }), n.setUndoSelect(!1)
        }, this.showOtherMarkers = function () {
            if (this.othersActive)return;
            var e = this.session, t = this;
            this.othersActive = !0, this.others.forEach(function (n) {
                n.markerId = e.addMarker(new r(n.row, n.column, n.row, n.column + t.length), t.othersClass, null, !1), n.on("change", function (i) {
                    e.removeMarker(n.markerId), n.markerId = e.addMarker(new r(i.value.row, i.value.column, i.value.row, i.value.column + t.length), t.othersClass, null, !1)
                })
            })
        }, this.hideOtherMarkers = function () {
            if (!this.othersActive)return;
            this.othersActive = !1;
            for (var e = 0; e < this.others.length; e++)this.session.removeMarker(this.others[e].markerId)
        }, this.onUpdate = function (e) {
            var t = e.data, n = t.range;
            if (n.start.row !== n.end.row)return;
            if (n.start.row !== this.pos.row)return;
            if (this.$updating)return;
            this.$updating = !0;
            var i = t.action === "insertText" ? n.end.column - n.start.column : n.start.column - n.end.column;
            if (n.start.column >= this.pos.column && n.start.column <= this.pos.column + this.length + 1) {
                var s = n.start.column - this.pos.column;
                this.length += i;
                if (!this.session.$fromUndo) {
                    if (t.action === "insertText")for (var o = this.others.length - 1; o >= 0; o--) {
                        var u = this.others[o], a = {row: u.row, column: u.column + s};
                        u.row === n.start.row && n.start.column < u.column && (a.column += i), this.doc.insert(a, t.text)
                    } else if (t.action === "removeText")for (var o = this.others.length - 1; o >= 0; o--) {
                        var u = this.others[o], a = {row: u.row, column: u.column + s};
                        u.row === n.start.row && n.start.column < u.column && (a.column += i), this.doc.remove(new r(a.row, a.column, a.row, a.column - i))
                    }
                    n.start.column === this.pos.column && t.action === "insertText" ? setTimeout(function () {
                        this.pos.setPosition(this.pos.row, this.pos.column - i);
                        for (var e = 0; e < this.others.length; e++) {
                            var t = this.others[e], r = {row: t.row, column: t.column - i};
                            t.row === n.start.row && n.start.column < t.column && (r.column += i), t.setPosition(r.row, r.column)
                        }
                    }.bind(this), 0) : n.start.column === this.pos
                        .column && t.action === "removeText" && setTimeout(function () {
                        for (var e = 0; e < this.others.length; e++) {
                            var t = this.others[e];
                            t.row === n.start.row && n.start.column < t.column && t.setPosition(t.row, t.column - i)
                        }
                    }.bind(this), 0)
                }
                this.pos._emit("change", {value: this.pos});
                for (var o = 0; o < this.others.length; o++)this.others[o]._emit("change", {value: this.others[o]})
            }
            this.$updating = !1
        }, this.onCursorChange = function (e) {
            if (this.$updating)return;
            var t = this.session.selection.getCursor();
            t.row === this.pos.row && t.column >= this.pos.column && t.column <= this.pos.column + this.length ? (this.showOtherMarkers(), this._emit("cursorEnter", e)) : (this.hideOtherMarkers(), this._emit("cursorLeave", e))
        }, this.detach = function () {
            this.session.removeMarker(this.markerId), this.hideOtherMarkers(), this.doc.removeEventListener("change", this.$onUpdate), this.session.selection.removeEventListener("changeCursor", this.$onCursorChange), this.pos.detach();
            for (var e = 0; e < this.others.length; e++)this.others[e].detach();
            this.session.setUndoSelect(!0)
        }, this.cancel = function () {
            if (this.$undoStackDepth === -1)throw Error("Canceling placeholders only supported with undo manager attached to session.");
            var e = this.session.getUndoManager(), t = (e.$undoStack || e.$undostack).length - this.$undoStackDepth;
            for (var n = 0; n < t; n++)e.undo(!0)
        }
    }).call(o.prototype), t.PlaceHolder = o
}), define("ace/mode/folding/fold_mode", ["require", "exports", "module", "ace/range"], function (e, t, n) {
    var r = e("../../range").Range, i = t.FoldMode = function () {
    };
    (function () {
        this.foldingStartMarker = null, this.foldingStopMarker = null, this.getFoldWidget = function (e, t, n) {
            var r = e.getLine(n);
            return this.foldingStartMarker.test(r) ? "start" : t == "markbeginend" && this.foldingStopMarker && this.foldingStopMarker.test(r) ? "end" : ""
        }, this.getFoldWidgetRange = function (e, t, n) {
            return null
        }, this.indentationBlock = function (e, t, n) {
            var i = /\S/, s = e.getLine(t), o = s.search(i);
            if (o == -1)return;
            var u = n || s.length, a = e.getLength(), f = t, l = t;
            while (++t < a) {
                var c = e.getLine(t).search(i);
                if (c == -1)continue;
                if (c <= o)break;
                l = t
            }
            if (l > f) {
                var h = e.getLine(l).length;
                return new r(f, u, l, h)
            }
        }, this.openingBracketBlock = function (e, t, n, i, s) {
            var o = {row: n, column: i + 1}, u = e.$findClosingBracket(t, o, s);
            if (!u)return;
            var a = e.foldWidgets[u.row];
            return a == null && (a = this.getFoldWidget(e, u.row)), a == "start" && u.row > o.row && (u.row--, u.column = e.getLine(u.row).length), r.fromPoints(o, u)
        }, this.closingBracketBlock = function (e, t, n, i, s) {
            var o = {row: n, column: i}, u = e.$findOpeningBracket(t, o);
            if (!u)return;
            return u.column++, o.column--, r.fromPoints(u, o)
        }
    }).call(i.prototype)
}), define("ace/theme/textmate", ["require", "exports", "module", "ace/lib/dom"], function (e, t, n) {
    t.isDark = !1, t.cssClass = "ace-tm", t.cssText = '.ace-tm .ace_gutter {background: #f0f0f0;color: #333;}.ace-tm .ace_print-margin {width: 1px;background: #e8e8e8;}.ace-tm .ace_fold {background-color: #6B72E6;}.ace-tm .ace_scroller {background-color: #FFFFFF;}.ace-tm .ace_cursor {border-left: 2px solid black;}.ace-tm .ace_overwrite-cursors .ace_cursor {border-left: 0px;border-bottom: 1px solid black;}.ace-tm .ace_invisible {color: rgb(191, 191, 191);}.ace-tm .ace_storage,.ace-tm .ace_keyword {color: blue;}.ace-tm .ace_constant {color: rgb(197, 6, 11);}.ace-tm .ace_constant.ace_buildin {color: rgb(88, 72, 246);}.ace-tm .ace_constant.ace_language {color: rgb(88, 92, 246);}.ace-tm .ace_constant.ace_library {color: rgb(6, 150, 14);}.ace-tm .ace_invalid {background-color: rgba(255, 0, 0, 0.1);color: red;}.ace-tm .ace_support.ace_function {color: rgb(60, 76, 114);}.ace-tm .ace_support.ace_constant {color: rgb(6, 150, 14);}.ace-tm .ace_support.ace_type,.ace-tm .ace_support.ace_class {color: rgb(109, 121, 222);}.ace-tm .ace_keyword.ace_operator {color: rgb(104, 118, 135);}.ace-tm .ace_string {color: rgb(3, 106, 7);}.ace-tm .ace_comment {color: rgb(76, 136, 107);}.ace-tm .ace_comment.ace_doc {color: rgb(0, 102, 255);}.ace-tm .ace_comment.ace_doc.ace_tag {color: rgb(128, 159, 191);}.ace-tm .ace_constant.ace_numeric {color: rgb(0, 0, 205);}.ace-tm .ace_variable {color: rgb(49, 132, 149);}.ace-tm .ace_xml-pe {color: rgb(104, 104, 91);}.ace-tm .ace_entity.ace_name.ace_function {color: #0000A2;}.ace-tm .ace_markup.ace_heading {color: rgb(12, 7, 255);}.ace-tm .ace_markup.ace_list {color:rgb(185, 6, 144);}.ace-tm .ace_meta.ace_tag {color:rgb(0, 22, 142);}.ace-tm .ace_string.ace_regex {color: rgb(255, 0, 0)}.ace-tm .ace_marker-layer .ace_selection {background: rgb(181, 213, 255);}.ace-tm.ace_multiselect .ace_selection.ace_start {box-shadow: 0 0 3px 0px white;border-radius: 2px;}.ace-tm .ace_marker-layer .ace_step {background: rgb(252, 255, 0);}.ace-tm .ace_marker-layer .ace_stack {background: rgb(164, 229, 101);}.ace-tm .ace_marker-layer .ace_bracket {margin: -1px 0 0 -1px;border: 1px solid rgb(192, 192, 192);}.ace-tm .ace_marker-layer .ace_active-line {background: rgba(0, 0, 0, 0.07);}.ace-tm .ace_gutter-active-line {background-color : #dcdcdc;}.ace-tm .ace_marker-layer .ace_selected-word {background: rgb(250, 250, 255);border: 1px solid rgb(200, 200, 250);}.ace-tm .ace_indent-guide {background: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAACCAYAAACZgbYnAAAAE0lEQVQImWP4////f4bLly//BwAmVgd1/w11/gAAAABJRU5ErkJggg==") right repeat-y;}';
    var r = e("../lib/dom");
    r.importCssString(t.cssText, t.cssClass)
}), function () {
    window.require(["ace/ace"], function (e) {
        e && e.config.init(), window.ace || (window.ace = {});
        for (var t in e)e.hasOwnProperty(t) && (ace[t] = e[t])
    })
}(), define("ace/mode/html", ["require", "exports", "module", "ace/lib/oop", "ace/mode/text", "ace/mode/javascript", "ace/mode/css", "ace/tokenizer", "ace/mode/html_highlight_rules", "ace/mode/behaviour/html", "ace/mode/folding/html"], function (e, t, n) {
    var r = e("../lib/oop"), i = e("./text").Mode, s = e("./javascript").Mode, o = e("./css").Mode, u = e("../tokenizer").Tokenizer, a = e("./html_highlight_rules").HtmlHighlightRules, f = e("./behaviour/html").HtmlBehaviour, l = e("./folding/html").FoldMode, c = function () {
        var e = new a;
        this.$tokenizer = new u(e.getRules()), this.$behaviour = new f, this.$embeds = e.getEmbeds(), this.createModeDelegates({"js-": s, "css-": o}), this.foldingRules = new l
    };
    r.inherits(c, i), function () {
        this.blockComment = {start: "<!--", end: "-->"}, this.getNextLineIndent = function (e, t, n) {
            return this.$getIndent(t)
        }, this.checkOutdent = function (e, t, n) {
            return!1
        }
    }.call(c.prototype), t.Mode = c
}), define("ace/mode/javascript", ["require", "exports", "module", "ace/lib/oop", "ace/mode/text", "ace/tokenizer", "ace/mode/javascript_highlight_rules", "ace/mode/matching_brace_outdent", "ace/range", "ace/worker/worker_client", "ace/mode/behaviour/cstyle", "ace/mode/folding/cstyle"], function (e, t, n) {
    var r = e("../lib/oop"), i = e("./text").Mode, s = e("../tokenizer").Tokenizer, o = e("./javascript_highlight_rules").JavaScriptHighlightRules, u = e("./matching_brace_outdent").MatchingBraceOutdent, a = e("../range").Range, f = e("../worker/worker_client").WorkerClient, l = e("./behaviour/cstyle").CstyleBehaviour, c = e("./folding/cstyle").FoldMode, h = function () {
        this.$tokenizer = new s((new o).getRules()), this.$outdent = new u, this.$behaviour = new l, this.foldingRules = new c
    };
    r.inherits(h, i), function () {
        this.lineCommentStart = "//", this.blockComment = {start: "/*", end: "*/"}, this.getNextLineIndent = function (e, t, n) {
            var r = this.$getIndent(t), i = this.$tokenizer.getLineTokens(t, e), s = i.tokens, o = i.state;
            if (s.length && s[s.length - 1].type == "comment")return r;
            if (e == "start" || e == "no_regex") {
                var u = t.match(/^.*(?:\bcase\b.*\:|[\{\(\[])\s*$/);
                u && (r += n)
            } else if (e == "doc-start") {
                if (o == "start" || o == "no_regex")return"";
                var u = t.match(/^\s*(\/?)\*/);
                u && (u[1] && (r += " "), r += "* ")
            }
            return r
        }, this.checkOutdent = function (e, t, n) {
            return this.$outdent.checkOutdent(t, n)
        }, this.autoOutdent = function (e, t, n) {
            this.$outdent.autoOutdent(t, n)
        }, this.createWorker = function (e) {
            var t = new f(["ace"], "ace/mode/javascript_worker", "JavaScriptWorker");
            return t.attachToDocument(e.getDocument()), t.on("jslint", function (t) {
                e.setAnnotations(t.data)
            }), t.on("terminate", function () {
                e.clearAnnotations()
            }), t
        }
    }.call(h.prototype), t.Mode = h
}), define("ace/mode/javascript_highlight_rules", ["require", "exports", "module", "ace/lib/oop", "ace/mode/doc_comment_highlight_rules", "ace/mode/text_highlight_rules"], function (e, t, n) {
    var r = e("../lib/oop"), i = e("./doc_comment_highlight_rules").DocCommentHighlightRules, s = e("./text_highlight_rules").TextHighlightRules, o = function () {
        var e = this.createKeywordMapper({"variable.language": "Array|Boolean|Date|Function|Iterator|Number|Object|RegExp|String|Proxy|Namespace|QName|XML|XMLList|ArrayBuffer|Float32Array|Float64Array|Int16Array|Int32Array|Int8Array|Uint16Array|Uint32Array|Uint8Array|Uint8ClampedArray|Error|EvalError|InternalError|RangeError|ReferenceError|StopIteration|SyntaxError|TypeError|URIError|decodeURI|decodeURIComponent|encodeURI|encodeURIComponent|eval|isFinite|isNaN|parseFloat|parseInt|JSON|Math|this|arguments|prototype|window|document", keyword: "const|yield|import|get|set|break|case|catch|continue|default|delete|do|else|finally|for|function|if|in|instanceof|new|return|switch|throw|try|typeof|let|var|while|with|debugger|__parent__|__count__|escape|unescape|with|__proto__|class|enum|extends|super|export|implements|private|public|interface|package|protected|static", "storage.type": "const|let|var|function", "constant.language": "null|Infinity|NaN|undefined", "support.function": "alert", "constant.language.boolean": "true|false"}, "identifier"), t = "case|do|else|finally|in|instanceof|return|throw|try|typeof|yield|void", n = "[a-zA-Z\\$_?-?][a-zA-Z\\d\\$_?-?]*\\b", r = "\\\\(?:x[0-9a-fA-F]{2}|u[0-9a-fA-F]{4}|[0-2][0-7]{0,2}|3[0-6][0-7]?|37[0-7]?|[4-7][0-7]?|.)";
        this.$rules = {no_regex: [
            {token: "comment", regex: /\/\/.*$/},
            i.getStartRule("doc-start"),
            {token: "comment", regex: /\/\*/, next: "comment"},
            {token: "string", regex: "'(?=.)", next: "qstring"},
            {token: "string", regex: '"(?=.)', next: "qqstring"},
            {token: "constant.numeric", regex: /0[xX][0-9a-fA-F]+\b/},
            {token: "constant.numeric", regex: /[+-]?\d+(?:(?:\.\d*)?(?:[eE][+-]?\d+)?)?\b/},
            {token: ["storage.type", "punctuation.operator", "support.function", "punctuation.operator", "entity.name.function", "text", "keyword.operator"], regex: "(" + n + ")(\\.)(prototype)(\\.)(" + n + ")(\\s*)(=)", next: "function_arguments"},
            {token: ["storage.type", "punctuation.operator", "entity.name.function", "text", "keyword.operator", "text", "storage.type", "text", "paren.lparen"], regex: "(" + n + ")(\\.)(" + n + ")(\\s*)(=)(\\s*)(function)(\\s*)(\\()", next: "function_arguments"},
            {token: ["entity.name.function", "text", "keyword.operator", "text", "storage.type", "text", "paren.lparen"], regex: "(" + n + ")(\\s*)(=)(\\s*)(function)(\\s*)(\\()", next: "function_arguments"},
            {token: ["storage.type", "punctuation.operator", "entity.name.function", "text", "keyword.operator", "text", "storage.type", "text", "entity.name.function", "text", "paren.lparen"], regex: "(" + n + ")(\\.)(" + n + ")(\\s*)(=)(\\s*)(function)(\\s+)(\\w+)(\\s*)(\\()", next: "function_arguments"},
            {token: ["storage.type", "text", "entity.name.function", "text", "paren.lparen"], regex: "(function)(\\s+)(" + n + ")(\\s*)(\\()", next: "function_arguments"},
            {token: ["entity.name.function", "text", "punctuation.operator", "text", "storage.type", "text", "paren.lparen"], regex: "(" + n + ")(\\s*)(:)(\\s*)(function)(\\s*)(\\()", next: "function_arguments"},
            {token: ["text", "text", "storage.type", "text", "paren.lparen"], regex: "(:)(\\s*)(function)(\\s*)(\\()", next: "function_arguments"},
            {token: "keyword", regex: "(?:" + t + ")\\b", next: "start"},
            {token: ["punctuation.operator", "support.function"], regex: /(\.)(s(?:h(?:ift|ow(?:Mod(?:elessDialog|alDialog)|Help))|croll(?:X|By(?:Pages|Lines)?|Y|To)?|t(?:opzzzz|rike)|i(?:n|zeToContent|debar|gnText)|ort|u(?:p|b(?:str(?:ing)?)?)|pli(?:ce|t)|e(?:nd|t(?:Re(?:sizable|questHeader)|M(?:i(?:nutes|lliseconds)|onth)|Seconds|Ho(?:tKeys|urs)|Year|Cursor|Time(?:out)?|Interval|ZOptions|Date|UTC(?:M(?:i(?:nutes|lliseconds)|onth)|Seconds|Hours|Date|FullYear)|FullYear|Active)|arch)|qrt|lice|avePreferences|mall)|h(?:ome|andleEvent)|navigate|c(?:har(?:CodeAt|At)|o(?:s|n(?:cat|textual|firm)|mpile)|eil|lear(?:Timeout|Interval)?|a(?:ptureEvents|ll)|reate(?:StyleSheet|Popup|EventObject))|t(?:o(?:GMTString|S(?:tring|ource)|U(?:TCString|pperCase)|Lo(?:caleString|werCase))|est|a(?:n|int(?:Enabled)?))|i(?:s(?:NaN|Finite)|ndexOf|talics)|d(?:isableExternalCapture|ump|etachEvent)|u(?:n(?:shift|taint|escape|watch)|pdateCommands)|j(?:oin|avaEnabled)|p(?:o(?:p|w)|ush|lugins.refresh|a(?:ddings|rse(?:Int|Float)?)|r(?:int|ompt|eference))|e(?:scape|nableExternalCapture|val|lementFromPoint|x(?:p|ec(?:Script|Command)?))|valueOf|UTC|queryCommand(?:State|Indeterm|Enabled|Value)|f(?:i(?:nd|le(?:ModifiedDate|Size|CreatedDate|UpdatedDate)|xed)|o(?:nt(?:size|color)|rward)|loor|romCharCode)|watch|l(?:ink|o(?:ad|g)|astIndexOf)|a(?:sin|nchor|cos|t(?:tachEvent|ob|an(?:2)?)|pply|lert|b(?:s|ort))|r(?:ou(?:nd|teEvents)|e(?:size(?:By|To)|calc|turnValue|place|verse|l(?:oad|ease(?:Capture|Events)))|andom)|g(?:o|et(?:ResponseHeader|M(?:i(?:nutes|lliseconds)|onth)|Se(?:conds|lection)|Hours|Year|Time(?:zoneOffset)?|Da(?:y|te)|UTC(?:M(?:i(?:nutes|lliseconds)|onth)|Seconds|Hours|Da(?:y|te)|FullYear)|FullYear|A(?:ttention|llResponseHeaders)))|m(?:in|ove(?:B(?:y|elow)|To(?:Absolute)?|Above)|ergeAttributes|a(?:tch|rgins|x))|b(?:toa|ig|o(?:ld|rderWidths)|link|ack))\b(?=\()/},
            {token: ["punctuation.operator", "support.function.dom"], regex: /(\.)(s(?:ub(?:stringData|mit)|plitText|e(?:t(?:NamedItem|Attribute(?:Node)?)|lect))|has(?:ChildNodes|Feature)|namedItem|c(?:l(?:ick|o(?:se|neNode))|reate(?:C(?:omment|DATASection|aption)|T(?:Head|extNode|Foot)|DocumentFragment|ProcessingInstruction|E(?:ntityReference|lement)|Attribute))|tabIndex|i(?:nsert(?:Row|Before|Cell|Data)|tem)|open|delete(?:Row|C(?:ell|aption)|T(?:Head|Foot)|Data)|focus|write(?:ln)?|a(?:dd|ppend(?:Child|Data))|re(?:set|place(?:Child|Data)|move(?:NamedItem|Child|Attribute(?:Node)?)?)|get(?:NamedItem|Element(?:sBy(?:Name|TagName)|ById)|Attribute(?:Node)?)|blur)\b(?=\()/},
            {token: ["punctuation.operator", "support.constant"], regex: /(\.)(s(?:ystemLanguage|cr(?:ipts|ollbars|een(?:X|Y|Top|Left))|t(?:yle(?:Sheets)?|atus(?:Text|bar)?)|ibling(?:Below|Above)|ource|uffixes|e(?:curity(?:Policy)?|l(?:ection|f)))|h(?:istory|ost(?:name)?|as(?:h|Focus))|y|X(?:MLDocument|SLDocument)|n(?:ext|ame(?:space(?:s|URI)|Prop))|M(?:IN_VALUE|AX_VALUE)|c(?:haracterSet|o(?:n(?:structor|trollers)|okieEnabled|lorDepth|mp(?:onents|lete))|urrent|puClass|l(?:i(?:p(?:boardData)?|entInformation)|osed|asses)|alle(?:e|r)|rypto)|t(?:o(?:olbar|p)|ext(?:Transform|Indent|Decoration|Align)|ags)|SQRT(?:1_2|2)|i(?:n(?:ner(?:Height|Width)|put)|ds|gnoreCase)|zIndex|o(?:scpu|n(?:readystatechange|Line)|uter(?:Height|Width)|p(?:sProfile|ener)|ffscreenBuffering)|NEGATIVE_INFINITY|d(?:i(?:splay|alog(?:Height|Top|Width|Left|Arguments)|rectories)|e(?:scription|fault(?:Status|Ch(?:ecked|arset)|View)))|u(?:ser(?:Profile|Language|Agent)|n(?:iqueID|defined)|pdateInterval)|_content|p(?:ixelDepth|ort|ersonalbar|kcs11|l(?:ugins|atform)|a(?:thname|dding(?:Right|Bottom|Top|Left)|rent(?:Window|Layer)?|ge(?:X(?:Offset)?|Y(?:Offset)?))|r(?:o(?:to(?:col|type)|duct(?:Sub)?|mpter)|e(?:vious|fix)))|e(?:n(?:coding|abledPlugin)|x(?:ternal|pando)|mbeds)|v(?:isibility|endor(?:Sub)?|Linkcolor)|URLUnencoded|P(?:I|OSITIVE_INFINITY)|f(?:ilename|o(?:nt(?:Size|Family|Weight)|rmName)|rame(?:s|Element)|gColor)|E|whiteSpace|l(?:i(?:stStyleType|n(?:eHeight|kColor))|o(?:ca(?:tion(?:bar)?|lName)|wsrc)|e(?:ngth|ft(?:Context)?)|a(?:st(?:M(?:odified|atch)|Index|Paren)|yer(?:s|X)|nguage))|a(?:pp(?:MinorVersion|Name|Co(?:deName|re)|Version)|vail(?:Height|Top|Width|Left)|ll|r(?:ity|guments)|Linkcolor|bove)|r(?:ight(?:Context)?|e(?:sponse(?:XML|Text)|adyState))|global|x|m(?:imeTypes|ultiline|enubar|argin(?:Right|Bottom|Top|Left))|L(?:N(?:10|2)|OG(?:10E|2E))|b(?:o(?:ttom|rder(?:Width|RightWidth|BottomWidth|Style|Color|TopWidth|LeftWidth))|ufferDepth|elow|ackground(?:Color|Image)))\b/},
            {token: ["storage.type", "punctuation.operator", "support.function.firebug"], regex: /(console)(\.)(warn|info|log|error|time|timeEnd|assert)\b/},
            {token: e, regex: n},
            {token: "keyword.operator", regex: /--|\+\+|[!$%&*+\-~]|===|==|=|!=|!==|<=|>=|<<=|>>=|>>>=|<>|<|>|!|&&|\|\||\?\:|\*=|%=|\+=|\-=|&=|\^=/, next: "start"},
            {token: "punctuation.operator", regex: /\?|\:|\,|\;|\./, next: "start"},
            {token: "paren.lparen", regex: /[\[({]/, next: "start"},
            {token: "paren.rparen", regex: /[\])}]/},
            {token: "keyword.operator", regex: /\/=?/, next: "start"},
            {token: "comment", regex: /^#!.*$/}
        ], start: [i.getStartRule("doc-start"), {token: "comment", regex: "\\/\\*", next: "comment_regex_allowed"}, {token: "comment", regex: "\\/\\/.*$", next: "start"}, {token: "string.regexp", regex: "\\/", next: "regex"}, {token: "text", regex: "\\s+|^$", next: "start"}, {token: "empty", regex: "", next: "no_regex"}], regex: [
            {token: "regexp.keyword.operator", regex: "\\\\(?:u[\\da-fA-F]{4}|x[\\da-fA-F]{2}|.)"},
            {token: "string.regexp", regex: "/\\w*", next: "no_regex"},
            {token: "invalid", regex: /\{\d+\b,?\d*\}[+*]|[+*$^?][+*]|[$^][?]|\?{3,}/},
            {token: "constant.language.escape", regex: /\(\?[:=!]|\)|\{\d+\b,?\d*\}|[+*]\?|[()$^+*?]/},
            {token: "constant.language.delimiter", regex: /\|/},
            {token: "constant.language.escape", regex: /\[\^?/, next: "regex_character_class"},
            {token: "empty", regex: "$", next: "no_regex"},
            {defaultToken: "string.regexp"}
        ], regex_character_class: [
            {token: "regexp.keyword.operator", regex: "\\\\(?:u[\\da-fA-F]{4}|x[\\da-fA-F]{2}|.)"},
            {token: "constant.language.escape", regex: "]", next: "regex"},
            {token: "constant.language.escape", regex: "-"},
            {token: "empty", regex: "$", next: "no_regex"},
            {defaultToken: "string.regexp.charachterclass"}
        ], function_arguments: [
            {token: "variable.parameter", regex: n},
            {token: "punctuation.operator", regex: "[, ]+"},
            {token: "punctuation.operator", regex: "$"},
            {token: "empty", regex: "", next: "no_regex"}
        ], comment_regex_allowed: [
            {token: "comment", regex: "\\*\\/", next: "start"},
            {defaultToken: "comment"}
        ], comment: [
            {token: "comment", regex: "\\*\\/", next: "no_regex"},
            {defaultToken: "comment"}
        ], qqstring: [
            {token: "constant.language.escape", regex: r},
            {token: "string", regex: "\\\\$", next: "qqstring"},
            {token: "string", regex: '"|$', next: "no_regex"},
            {defaultToken: "string"}
        ], qstring: [
            {token: "constant.language.escape", regex: r},
            {token: "string", regex: "\\\\$", next: "qstring"},
            {token: "string", regex: "'|$", next: "no_regex"},
            {defaultToken: "string"}
        ]}, this.embedRules(i, "doc-", [i.getEndRule("no_regex")])
    };
    r.inherits(o, s), t.JavaScriptHighlightRules = o
}), define("ace/mode/doc_comment_highlight_rules", ["require", "exports", "module", "ace/lib/oop", "ace/mode/text_highlight_rules"], function (e, t, n) {
    var r = e("../lib/oop"), i = e("./text_highlight_rules").TextHighlightRules, s = function () {
        this.$rules = {start: [
            {token: "comment.doc.tag", regex: "@[\\w\\d_]+"},
            {token: "comment.doc.tag", regex: "\\bTODO\\b"},
            {defaultToken: "comment.doc"}
        ]}
    };
    r.inherits(s, i), s.getStartRule = function (e) {
        return{token: "comment.doc", regex: "\\/\\*(?=\\*)", next: e}
    }, s.getEndRule = function (e) {
        return{token: "comment.doc", regex: "\\*\\/", next: e}
    }, t.DocCommentHighlightRules = s
}), define("ace/mode/matching_brace_outdent", ["require", "exports", "module", "ace/range"], function (e, t, n) {
    var r = e("../range").Range, i = function () {
    };
    (function () {
        this.checkOutdent = function (e, t) {
            return/^\s+$/.test(e) ? /^\s*\}/.test(t) : !1
        }, this.autoOutdent = function (e, t) {
            var n = e.getLine(t), i = n.match(/^(\s*\})/);
            if (!i)return 0;
            var s = i[1].length, o = e.findMatchingBracket({row: t, column: s});
            if (!o || o.row == t)return 0;
            var u = this.$getIndent(e.getLine(o.row));
            e.replace(new r(t, 0, t, s - 1), u)
        }, this.$getIndent = function (e) {
            return e.match(/^\s*/)[0]
        }
    }).call(i.prototype), t.MatchingBraceOutdent = i
}), define("ace/mode/behaviour/cstyle", ["require", "exports", "module", "ace/lib/oop", "ace/mode/behaviour", "ace/token_iterator", "ace/lib/lang"], function (e, t, n) {
    var r = e("../../lib/oop"), i = e("../behaviour").Behaviour, s = e("../../token_iterator").TokenIterator, o = e("../../lib/lang"), u = ["text", "paren.rparen", "punctuation.operator"], a = ["text", "paren.rparen", "punctuation.operator", "comment"], f = 0, l = -1, c = "", h = 0, p = -1, d = "", v = "", m = function () {
        m.isSaneInsertion = function (e, t) {
            var n = e.getCursorPosition(), r = new s(t, n.row, n.column);
            if (!this.$matchTokenType(r.getCurrentToken() || "text", u)) {
                var i = new s(t, n.row, n.column + 1);
                if (!this.$matchTokenType(i.getCurrentToken() || "text", u))return!1
            }
            return r.stepForward(), r.getCurrentTokenRow() !== n.row || this.$matchTokenType(r.getCurrentToken() || "text", a)
        }, m.$matchTokenType = function (e, t) {
            return t.indexOf(e.type || e) > -1
        }, m.recordAutoInsert = function (e, t, n) {
            var r = e.getCursorPosition(), i = t.doc.getLine(r.row);
            this.isAutoInsertedClosing(r, i, c[0]) || (f = 0), l = r.row, c = n + i.substr(r.column), f++
        }, m.recordMaybeInsert = function (e, t, n) {
            var r = e.getCursorPosition(), i = t.doc.getLine(r.row);
            this.isMaybeInsertedClosing(r, i) || (h = 0), p = r.row, d = i.substr(0, r.column) + n, v = i.substr(r.column), h++
        }, m.isAutoInsertedClosing = function (e, t, n) {
            return f > 0 && e.row === l && n === c[0] && t.substr(e.column) === c
        }, m.isMaybeInsertedClosing = function (e, t) {
            return h > 0 && e.row === p && t.substr(e.column) === v && t.substr(0, e.column) == d
        }, m.popAutoInsertedClosing = function () {
            c = c.substr(1), f--
        }, m.clearMaybeInsertedClosing = function () {
            h = 0, p = -1
        }, this.add("braces", "insertion", function (e, t, n, r, i) {
            var s = n.getCursorPosition(), u = r.doc.getLine(s.row);
            if (i == "{") {
                var a = n.getSelectionRange(), f = r.doc.getTextRange(a);
                if (f !== "" && f !== "{" && n.getWrapBehavioursEnabled())return{text: "{" + f + "}", selection: !1};
                if (m.isSaneInsertion(n, r))return/[\]\}\)]/.test(u[s.column]) ? (m.recordAutoInsert(n, r, "}"), {text: "{}", selection: [1, 1]}) : (m.recordMaybeInsert(n, r, "{"), {text: "{", selection: [1, 1]})
            } else if (i == "}") {
                var l = u.substring(s.column, s.column + 1);
                if (l == "}") {
                    var c = r.$findOpeningBracket("}", {column: s.column + 1, row: s.row});
                    if (c !== null && m.isAutoInsertedClosing(s, u, i))return m.popAutoInsertedClosing(), {text: "", selection: [1, 1]}
                }
            } else if (i == "\n" || i == "\r\n") {
                var p = "";
                m.isMaybeInsertedClosing(s, u) && (p = o.stringRepeat("}", h), m.clearMaybeInsertedClosing());
                var l = u.substring(s.column, s.column + 1);
                if (l == "}" || p !== "") {
                    var d = r.findMatchingBracket({row: s.row, column: s.column}, "}");
                    if (!d)return null;
                    var v = this.getNextLineIndent(e, u.substring(0, s.column), r.getTabString()), g = this.$getIndent(u);
                    return{text: "\n" + v + "\n" + g + p, selection: [1, v.length, 1, v.length]}
                }
            }
        }), this.add("braces", "deletion", function (e, t, n, r, i) {
            var s = r.doc.getTextRange(i);
            if (!i.isMultiLine() && s == "{") {
                var o = r.doc.getLine(i.start.row), u = o.substring(i.end.column, i.end.column + 1);
                if (u == "}")return i.end.column++, i;
                h--
            }
        }), this.add("parens", "insertion", function (e, t, n, r, i) {
            if (i == "(") {
                var s = n.getSelectionRange(), o = r.doc.getTextRange(s);
                if (o !== "" && n.getWrapBehavioursEnabled())return{text: "(" + o + ")", selection: !1};
                if (m.isSaneInsertion(n, r))return m.recordAutoInsert(n, r, ")"), {text: "()", selection: [1, 1]}
            } else if (i == ")") {
                var u = n.getCursorPosition(), a = r.doc.getLine(u.row), f = a.substring(u.column, u.column + 1);
                if (f == ")") {
                    var l = r.$findOpeningBracket(")", {column: u.column + 1, row: u.row});
                    if (l !== null && m.isAutoInsertedClosing(u, a, i))return m.popAutoInsertedClosing(), {text: "", selection: [1, 1]}
                }
            }
        }), this.add("parens", "deletion", function (e, t, n, r, i) {
            var s = r.doc.getTextRange(i);
            if (!i.isMultiLine() && s == "(") {
                var o = r.doc.getLine(i.start.row), u = o.substring(i.start.column + 1, i.start.column + 2);
                if (u == ")")return i.end.column++, i
            }
        }), this.add("brackets", "insertion", function (e, t, n, r, i) {
            if (i == "[") {
                var s = n.getSelectionRange(), o = r.doc.getTextRange(s);
                if (o !== "" && n.getWrapBehavioursEnabled())return{text: "[" + o + "]", selection: !1};
                if (m.isSaneInsertion(n, r))return m.recordAutoInsert(n, r, "]"), {text: "[]", selection: [1, 1]}
            } else if (i == "]") {
                var u = n.getCursorPosition(), a = r.doc.getLine(u.row), f = a.substring(u.column, u.column + 1);
                if (f == "]") {
                    var l = r.$findOpeningBracket("]", {column: u.column + 1, row: u.row});
                    if (l !== null && m.isAutoInsertedClosing(u, a, i))return m.popAutoInsertedClosing(), {text: "", selection: [1, 1]}
                }
            }
        }), this.add("brackets", "deletion", function (e, t, n, r, i) {
            var s = r.doc.getTextRange(i);
            if (!i.isMultiLine() && s == "[") {
                var o = r.doc.getLine(i.start.row), u = o.substring(i.start.column + 1, i.start.column + 2);
                if (u == "]")return i.end.column++, i
            }
        }), this.add("string_dquotes", "insertion", function (e, t, n, r, i) {
            if (i == '"' || i == "'") {
                var s = i, o = n.getSelectionRange(), u = r.doc.getTextRange(o);
                if (u !== "" && u !== "'" && u != '"' && n.getWrapBehavioursEnabled())return{text: s + u + s, selection: !1};
                var a = n.getCursorPosition(), f = r.doc.getLine(a.row), l = f.substring(a.column - 1, a.column);
                if (l == "\\")return null;
                var c = r.getTokens(o.start.row), h = 0, p, d = -1;
                for (var v = 0; v < c.length; v++) {
                    p = c[v], p.type == "string" ? d = -1 : d < 0 && (d = p.value.indexOf(s));
                    if (p.value.length + h > o.start.column)break;
                    h += c[v].value.length
                }
                if (!p || d < 0 && p.type !== "comment" && (p.type !== "string" || o.start.column !== p.value.length + h - 1 && p.value.lastIndexOf(s) === p.value.length - 1)) {
                    if (!m.isSaneInsertion(n, r))return;
                    return{text: s + s, selection: [1, 1]}
                }
                if (p && p.type === "string") {
                    var g = f.substring(a.column, a.column + 1);
                    if (g == s)return{text: "", selection: [1, 1]}
                }
            }
        }), this.add("string_dquotes", "deletion", function (e, t, n, r, i) {
            var s = r.doc.getTextRange(i);
            if (!i.isMultiLine() && (s == '"' || s == "'")) {
                var o = r.doc.getLine(i.start.row), u = o.substring(i.start.column + 1, i.start.column + 2);
                if (u == s)return i.end.column++, i
            }
        })
    };
    r.inherits(m, i), t.CstyleBehaviour = m
}), define("ace/mode/folding/cstyle", ["require", "exports", "module", "ace/lib/oop", "ace/range", "ace/mode/folding/fold_mode"], function (e, t, n) {
    var r = e("../../lib/oop"), i = e("../../range").Range, s = e("./fold_mode").FoldMode, o = t.FoldMode = function (e) {
        e && (this.foldingStartMarker = new RegExp(this.foldingStartMarker.source.replace(/\|[^|]*?$/, "|" + e.start)), this.foldingStopMarker = new RegExp(this.foldingStopMarker.source.replace(/\|[^|]*?$/, "|" + e.end)))
    };
    r.inherits(o, s), function () {
        this.foldingStartMarker = /(\{|\[)[^\}\]]*$|^\s*(\/\*)/, this.foldingStopMarker = /^[^\[\{]*(\}|\])|^[\s\*]*(\*\/)/, this.getFoldWidgetRange = function (e, t, n) {
            var r = e.getLine(n), i = r.match(this.foldingStartMarker);
            if (i) {
                var s = i.index;
                return i[1] ? this.openingBracketBlock(e, i[1], n, s) : e.getCommentFoldRange(n, s + i[0].length, 1)
            }
            if (t !== "markbeginend")return;
            var i = r.match(this.foldingStopMarker);
            if (i) {
                var s = i.index + i[0].length;
                return i[1] ? this.closingBracketBlock(e, i[1], n, s) : e.getCommentFoldRange(n, s, -1)
            }
        }
    }.call(o.prototype)
}), define("ace/mode/css", ["require", "exports", "module", "ace/lib/oop", "ace/mode/text", "ace/tokenizer", "ace/mode/css_highlight_rules", "ace/mode/matching_brace_outdent", "ace/worker/worker_client", "ace/mode/behaviour/css", "ace/mode/folding/cstyle"], function (e, t, n) {
    var r = e("../lib/oop"), i = e("./text").Mode, s = e("../tokenizer").Tokenizer, o = e("./css_highlight_rules").CssHighlightRules, u = e("./matching_brace_outdent").MatchingBraceOutdent, a = e("../worker/worker_client").WorkerClient, f = e("./behaviour/css").CssBehaviour, l = e("./folding/cstyle").FoldMode, c = function () {
        this.$tokenizer = new s((new o).getRules()), this.$outdent = new u, this.$behaviour = new f, this.foldingRules = new l
    };
    r.inherits(c, i), function () {
        this.foldingRules = "cStyle", this.blockComment = {start: "/*", end: "*/"}, this.getNextLineIndent = function (e, t, n) {
            var r = this.$getIndent(t), i = this.$tokenizer.getLineTokens(t, e).tokens;
            if (i.length && i[i.length - 1].type == "comment")return r;
            var s = t.match(/^.*\{\s*$/);
            return s && (r += n), r
        }, this.checkOutdent = function (e, t, n) {
            return this.$outdent.checkOutdent(t, n)
        }, this.autoOutdent = function (e, t, n) {
            this.$outdent.autoOutdent(t, n)
        }, this.createWorker = function (e) {
            var t = new a(["ace"], "ace/mode/css_worker", "Worker");
            return t.attachToDocument(e.getDocument()), t.on("csslint", function (t) {
                e.setAnnotations(t.data)
            }), t.on("terminate", function () {
                e.clearAnnotations()
            }), t
        }
    }.call(c.prototype), t.Mode = c
}), define("ace/mode/css_highlight_rules", ["require", "exports", "module", "ace/lib/oop", "ace/lib/lang", "ace/mode/text_highlight_rules"], function (e, t, n) {
    var r = e("../lib/oop"), i = e("../lib/lang"), s = e("./text_highlight_rules").TextHighlightRules, o = t.supportType = "animation-fill-mode|alignment-adjust|alignment-baseline|animation-delay|animation-direction|animation-duration|animation-iteration-count|animation-name|animation-play-state|animation-timing-function|animation|appearance|azimuth|backface-visibility|background-attachment|background-break|background-clip|background-color|background-image|background-origin|background-position|background-repeat|background-size|background|baseline-shift|binding|bleed|bookmark-label|bookmark-level|bookmark-state|bookmark-target|border-bottom|border-bottom-color|border-bottom-left-radius|border-bottom-right-radius|border-bottom-style|border-bottom-width|border-collapse|border-color|border-image|border-image-outset|border-image-repeat|border-image-slice|border-image-source|border-image-width|border-left|border-left-color|border-left-style|border-left-width|border-radius|border-right|border-right-color|border-right-style|border-right-width|border-spacing|border-style|border-top|border-top-color|border-top-left-radius|border-top-right-radius|border-top-style|border-top-width|border-width|border|bottom|box-align|box-decoration-break|box-direction|box-flex-group|box-flex|box-lines|box-ordinal-group|box-orient|box-pack|box-shadow|box-sizing|break-after|break-before|break-inside|caption-side|clear|clip|color-profile|color|column-count|column-fill|column-gap|column-rule|column-rule-color|column-rule-style|column-rule-width|column-span|column-width|columns|content|counter-increment|counter-reset|crop|cue-after|cue-before|cue|cursor|direction|display|dominant-baseline|drop-initial-after-adjust|drop-initial-after-align|drop-initial-before-adjust|drop-initial-before-align|drop-initial-size|drop-initial-value|elevation|empty-cells|fit|fit-position|float-offset|float|font-family|font-size|font-size-adjust|font-stretch|font-style|font-variant|font-weight|font|grid-columns|grid-rows|hanging-punctuation|height|hyphenate-after|hyphenate-before|hyphenate-character|hyphenate-lines|hyphenate-resource|hyphens|icon|image-orientation|image-rendering|image-resolution|inline-box-align|left|letter-spacing|line-height|line-stacking-ruby|line-stacking-shift|line-stacking-strategy|line-stacking|list-style-image|list-style-position|list-style-type|list-style|margin-bottom|margin-left|margin-right|margin-top|margin|mark-after|mark-before|mark|marks|marquee-direction|marquee-play-count|marquee-speed|marquee-style|max-height|max-width|min-height|min-width|move-to|nav-down|nav-index|nav-left|nav-right|nav-up|opacity|orphans|outline-color|outline-offset|outline-style|outline-width|outline|overflow-style|overflow-x|overflow-y|overflow|padding-bottom|padding-left|padding-right|padding-top|padding|page-break-after|page-break-before|page-break-inside|page-policy|page|pause-after|pause-before|pause|perspective-origin|perspective|phonemes|pitch-range|pitch|play-during|position|presentation-level|punctuation-trim|quotes|rendering-intent|resize|rest-after|rest-before|rest|richness|right|rotation-point|rotation|ruby-align|ruby-overhang|ruby-position|ruby-span|size|speak-header|speak-numeral|speak-punctuation|speak|speech-rate|stress|string-set|table-layout|target-name|target-new|target-position|target|text-align-last|text-align|text-decoration|text-emphasis|text-height|text-indent|text-justify|text-outline|text-shadow|text-transform|text-wrap|top|transform-origin|transform-style|transform|transition-delay|transition-duration|transition-property|transition-timing-function|transition|unicode-bidi|vertical-align|visibility|voice-balance|voice-duration|voice-family|voice-pitch-range|voice-pitch|voice-rate|voice-stress|voice-volume|volume|white-space-collapse|white-space|widows|width|word-break|word-spacing|word-wrap|z-index", u = t.supportFunction = "rgb|rgba|url|attr|counter|counters", a = t.supportConstant = "absolute|after-edge|after|all-scroll|all|alphabetic|always|antialiased|armenian|auto|avoid-column|avoid-page|avoid|balance|baseline|before-edge|before|below|bidi-override|block-line-height|block|bold|bolder|border-box|both|bottom|box|break-all|break-word|capitalize|caps-height|caption|center|central|char|circle|cjk-ideographic|clone|close-quote|col-resize|collapse|column|consider-shifts|contain|content-box|cover|crosshair|cubic-bezier|dashed|decimal-leading-zero|decimal|default|disabled|disc|disregard-shifts|distribute-all-lines|distribute-letter|distribute-space|distribute|dotted|double|e-resize|ease-in|ease-in-out|ease-out|ease|ellipsis|end|exclude-ruby|fill|fixed|georgian|glyphs|grid-height|groove|hand|hanging|hebrew|help|hidden|hiragana-iroha|hiragana|horizontal|icon|ideograph-alpha|ideograph-numeric|ideograph-parenthesis|ideograph-space|ideographic|inactive|include-ruby|inherit|initial|inline-block|inline-box|inline-line-height|inline-table|inline|inset|inside|inter-ideograph|inter-word|invert|italic|justify|katakana-iroha|katakana|keep-all|last|left|lighter|line-edge|line-through|line|linear|list-item|local|loose|lower-alpha|lower-greek|lower-latin|lower-roman|lowercase|lr-tb|ltr|mathematical|max-height|max-size|medium|menu|message-box|middle|move|n-resize|ne-resize|newspaper|no-change|no-close-quote|no-drop|no-open-quote|no-repeat|none|normal|not-allowed|nowrap|nw-resize|oblique|open-quote|outset|outside|overline|padding-box|page|pointer|pre-line|pre-wrap|pre|preserve-3d|progress|relative|repeat-x|repeat-y|repeat|replaced|reset-size|ridge|right|round|row-resize|rtl|s-resize|scroll|se-resize|separate|slice|small-caps|small-caption|solid|space|square|start|static|status-bar|step-end|step-start|steps|stretch|strict|sub|super|sw-resize|table-caption|table-cell|table-column-group|table-column|table-footer-group|table-header-group|table-row-group|table-row|table|tb-rl|text-after-edge|text-before-edge|text-bottom|text-size|text-top|text|thick|thin|transparent|underline|upper-alpha|upper-latin|upper-roman|uppercase|use-script|vertical-ideographic|vertical-text|visible|w-resize|wait|whitespace|z-index|zero"
        , f = t.supportConstantColor = "aqua|black|blue|fuchsia|gray|green|lime|maroon|navy|olive|orange|purple|red|silver|teal|white|yellow", l = t.supportConstantFonts = "arial|century|comic|courier|garamond|georgia|helvetica|impact|lucida|symbol|system|tahoma|times|trebuchet|utopia|verdana|webdings|sans-serif|serif|monospace", c = t.numRe = "\\-?(?:(?:[0-9]+)|(?:[0-9]*\\.[0-9]+))", h = t.pseudoElements = "(\\:+)\\b(after|before|first-letter|first-line|moz-selection|selection)\\b", p = t.pseudoClasses = "(:)\\b(active|checked|disabled|empty|enabled|first-child|first-of-type|focus|hover|indeterminate|invalid|last-child|last-of-type|link|not|nth-child|nth-last-child|nth-last-of-type|nth-of-type|only-child|only-of-type|required|root|target|valid|visited)\\b", d = function () {
            var e = this.createKeywordMapper({"support.function": u, "support.constant": a, "support.type": o, "support.constant.color": f, "support.constant.fonts": l}, "text", !0), t = [
                {token: "comment", regex: "\\/\\*", next: "ruleset_comment"},
                {token: "string", regex: '["](?:(?:\\\\.)|(?:[^"\\\\]))*?["]'},
                {token: "string", regex: "['](?:(?:\\\\.)|(?:[^'\\\\]))*?[']"},
                {token: ["constant.numeric", "keyword"], regex: "(" + c + ")(ch|cm|deg|em|ex|fr|gd|grad|Hz|in|kHz|mm|ms|pc|pt|px|rad|rem|s|turn|vh|vm|vw|%)"},
                {token: "constant.numeric", regex: c},
                {token: "constant.numeric", regex: "#[a-f0-9]{6}"},
                {token: "constant.numeric", regex: "#[a-f0-9]{3}"},
                {token: ["punctuation", "entity.other.attribute-name.pseudo-element.css"], regex: h},
                {token: ["punctuation", "entity.other.attribute-name.pseudo-class.css"], regex: p},
                {token: ["support.function", "string", "support.function"], regex: "(url\\()(.*)(\\))"},
                {token: e, regex: "\\-?[a-zA-Z_][a-zA-Z0-9_\\-]*"},
                {caseInsensitive: !0}
            ], n = i.copyArray(t);
            n.unshift({token: "paren.rparen", regex: "\\}", next: "start"});
            var r = i.copyArray(t);
            r.unshift({token: "paren.rparen", regex: "\\}", next: "media"});
            var s = [
                {token: "comment", regex: ".+"}
            ], d = i.copyArray(s);
            d.unshift({token: "comment", regex: ".*?\\*\\/", next: "start"});
            var v = i.copyArray(s);
            v.unshift({token: "comment", regex: ".*?\\*\\/", next: "media"});
            var m = i.copyArray(s);
            m.unshift({token: "comment", regex: ".*?\\*\\/", next: "ruleset"}), this.$rules = {start: [
                {token: "comment", regex: "\\/\\*", next: "comment"},
                {token: "paren.lparen", regex: "\\{", next: "ruleset"},
                {token: "string", regex: "@.*?{", next: "media"},
                {token: "keyword", regex: "#[a-z0-9-_]+"},
                {token: "variable", regex: "\\.[a-z0-9-_]+"},
                {token: "string", regex: ":[a-z0-9-_]+"},
                {token: "constant", regex: "[a-z0-9-_]+"},
                {caseInsensitive: !0}
            ], media: [
                {token: "comment", regex: "\\/\\*", next: "media_comment"},
                {token: "paren.lparen", regex: "\\{", next: "media_ruleset"},
                {token: "string", regex: "\\}", next: "start"},
                {token: "keyword", regex: "#[a-z0-9-_]+"},
                {token: "variable", regex: "\\.[a-z0-9-_]+"},
                {token: "string", regex: ":[a-z0-9-_]+"},
                {token: "constant", regex: "[a-z0-9-_]+"},
                {caseInsensitive: !0}
            ], comment: d, ruleset: n, ruleset_comment: m, media_ruleset: r, media_comment: v}
        };
    r.inherits(d, s), t.CssHighlightRules = d
}), define("ace/mode/behaviour/css", ["require", "exports", "module", "ace/lib/oop", "ace/mode/behaviour", "ace/mode/behaviour/cstyle", "ace/token_iterator"], function (e, t, n) {
    var r = e("../../lib/oop"), i = e("../behaviour").Behaviour, s = e("./cstyle").CstyleBehaviour, o = e("../../token_iterator").TokenIterator, u = function () {
        this.inherit(s), this.add("colon", "insertion", function (e, t, n, r, i) {
            if (i === ":") {
                var s = n.getCursorPosition(), u = new o(r, s.row, s.column), a = u.getCurrentToken();
                a && a.value.match(/\s+/) && (a = u.stepBackward());
                if (a && a.type === "support.type") {
                    var f = r.doc.getLine(s.row), l = f.substring(s.column, s.column + 1);
                    if (l === ":")return{text: "", selection: [1, 1]};
                    if (!f.substring(s.column).match(/^\s*;/))return{text: ":;", selection: [1, 1]}
                }
            }
        }), this.add("colon", "deletion", function (e, t, n, r, i) {
            var s = r.doc.getTextRange(i);
            if (!i.isMultiLine() && s === ":") {
                var u = n.getCursorPosition(), a = new o(r, u.row, u.column), f = a.getCurrentToken();
                f && f.value.match(/\s+/) && (f = a.stepBackward());
                if (f && f.type === "support.type") {
                    var l = r.doc.getLine(i.start.row), c = l.substring(i.end.column, i.end.column + 1);
                    if (c === ";")return i.end.column++, i
                }
            }
        }), this.add("semicolon", "insertion", function (e, t, n, r, i) {
            if (i === ";") {
                var s = n.getCursorPosition(), o = r.doc.getLine(s.row), u = o.substring(s.column, s.column + 1);
                if (u === ";")return{text: "", selection: [1, 1]}
            }
        })
    };
    r.inherits(u, s), t.CssBehaviour = u
}), define("ace/mode/html_highlight_rules", ["require", "exports", "module", "ace/lib/oop", "ace/lib/lang", "ace/mode/css_highlight_rules", "ace/mode/javascript_highlight_rules", "ace/mode/xml_util", "ace/mode/text_highlight_rules"], function (e, t, n) {
    var r = e("../lib/oop"), i = e("../lib/lang"), s = e("./css_highlight_rules").CssHighlightRules, o = e("./javascript_highlight_rules").JavaScriptHighlightRules, u = e("./xml_util"), a = e("./text_highlight_rules").TextHighlightRules, f = i.createMap({a: "anchor", button: "form", form: "form", img: "image", input: "form", label: "form", script: "script", select: "form", textarea: "form", style: "style", table: "table", tbody: "table", td: "table", tfoot: "table", th: "table", tr: "table"}), l = function () {
        this.$rules = {start: [
            {token: "text", regex: "<\\!\\[CDATA\\[", next: "cdata"},
            {token: "xml-pe", regex: "<\\?.*?\\?>"},
            {token: "comment", regex: "<\\!--", next: "comment"},
            {token: "xml-pe", regex: "<\\!.*?>"},
            {token: "meta.tag", regex: "<(?=script\\b)", next: "script"},
            {token: "meta.tag", regex: "<(?=style\\b)", next: "style"},
            {token: "meta.tag", regex: "<\\/?", next: "tag"},
            {token: "text", regex: "\\s+"},
            {token: "constant.character.entity", regex: "(?:&#[0-9]+;)|(?:&#x[0-9a-fA-F]+;)|(?:&[a-zA-Z0-9_:\\.-]+;)"}
        ], cdata: [
            {token: "text", regex: "\\]\\]>", next: "start"}
        ], comment: [
            {token: "comment", regex: ".*?-->", next: "start"},
            {defaultToken: "comment"}
        ]}, u.tag(this.$rules, "tag", "start", f), u.tag(this.$rules, "style", "css-start", f), u.tag(this.$rules, "script", "js-start", f), this.embedRules(o, "js-", [
            {token: "comment", regex: "\\/\\/.*(?=<\\/script>)", next: "tag"},
            {token: "meta.tag", regex: "<\\/(?=script)", next: "tag"}
        ]), this.embedRules(s, "css-", [
            {token: "meta.tag", regex: "<\\/(?=style)", next: "tag"}
        ])
    };
    r.inherits(l, a), t.HtmlHighlightRules = l
}), define("ace/mode/xml_util", ["require", "exports", "module"], function (e, t, n) {
    function r(e) {
        return[
            {token: "string", regex: '"', next: e + "_qqstring"},
            {token: "string", regex: "'", next: e + "_qstring"}
        ]
    }

    function i(e, t) {
        return[
            {token: "string", regex: e, next: t},
            {token: "constant.language.escape", regex: "(?:&#[0-9]+;)|(?:&#x[0-9a-fA-F]+;)|(?:&[a-zA-Z0-9_:\\.-]+;)"},
            {defaultToken: "string"}
        ]
    }

    t.tag = function (e, t, n, s) {
        e[t] = [
            {token: "text", regex: "\\s+"},
            {token: s ? function (e) {
                return s[e] ? "meta.tag.tag-name." + s[e] : "meta.tag.tag-name"
            } : "meta.tag.tag-name", regex: "[-_a-zA-Z0-9:]+", next: t + "_embed_attribute_list"},
            {token: "empty", regex: "", next: t + "_embed_attribute_list"}
        ], e[t + "_qstring"] = i("'", t + "_embed_attribute_list"), e[t + "_qqstring"] = i('"', t + "_embed_attribute_list"), e[t + "_embed_attribute_list"] = [
            {token: "meta.tag.r", regex: "/?>", next: n},
            {token: "keyword.operator", regex: "="},
            {token: "entity.other.attribute-name", regex: "[-_a-zA-Z0-9:]+"},
            {token: "constant.numeric", regex: "[+-]?\\d+(?:(?:\\.\\d*)?(?:[eE][+-]?\\d+)?)?\\b"},
            {token: "text", regex: "\\s+"}
        ].concat(r(t))
    }
}), define("ace/mode/behaviour/html", ["require", "exports", "module", "ace/lib/oop", "ace/mode/behaviour/xml", "ace/mode/behaviour/cstyle", "ace/token_iterator"], function (e, t, n) {
    function r(e, t) {
        var n = !0, r = e.type.split("."), i = t.split(".");
        return i.forEach(function (e) {
            if (r.indexOf(e) == -1)return n = !1, !1
        }), n
    }

    var i = e("../../lib/oop"), s = e("../behaviour/xml").XmlBehaviour, o = e("./cstyle").CstyleBehaviour, u = e("../../token_iterator").TokenIterator, a = ["area", "base", "br", "col", "command", "embed", "hr", "img", "input", "keygen", "link", "meta", "param", "source", "track", "wbr"], f = function () {
        this.inherit(s), this.add("autoclosing", "insertion", function (e, t, n, i, s) {
            if (s == ">") {
                var o = n.getCursorPosition(), f = new u(i, o.row, o.column), l = f.getCurrentToken(), c = !1;
                if (!l || !r(l, "meta.tag") && (!r(l, "text") || !l.value.match("/"))) {
                    do l = f.stepBackward(); while (l && (r(l, "string") || r(l, "keyword.operator") || r(l, "entity.attribute-name") || r(l, "text")))
                } else c = !0;
                if (!l || !r(l, "meta.tag-name") || f.stepBackward().value.match("/"))return;
                var h = l.value;
                if (c)var h = h.substring(0, o.column - l.start);
                if (a.indexOf(h) !== -1)return;
                return{text: "></" + h + ">", selection: [1, 1]}
            }
        })
    };
    i.inherits(f, s), t.HtmlBehaviour = f
}), define("ace/mode/behaviour/xml", ["require", "exports", "module", "ace/lib/oop", "ace/mode/behaviour", "ace/mode/behaviour/cstyle", "ace/token_iterator"], function (e, t, n) {
    function r(e, t) {
        var n = !0, r = e.type.split("."), i = t.split(".");
        return i.forEach(function (e) {
            if (r.indexOf(e) == -1)return n = !1, !1
        }), n
    }

    var i = e("../../lib/oop"), s = e("../behaviour").Behaviour, o = e("./cstyle").CstyleBehaviour, u = e("../../token_iterator").TokenIterator, a = function () {
        this.inherit(o, ["string_dquotes"]), this.add("autoclosing", "insertion", function (e, t, n, i, s) {
            if (s == ">") {
                var o = n.getCursorPosition(), a = new u(i, o.row, o.column), f = a.getCurrentToken(), l = !1;
                if (!f || !r(f, "meta.tag") && (!r(f, "text") || !f.value.match("/"))) {
                    do f = a.stepBackward(); while (f && (r(f, "string") || r(f, "keyword.operator") || r(f, "entity.attribute-name") || r(f, "text")))
                } else l = !0;
                if (!f || !r(f, "meta.tag-name") || a.stepBackward().value.match("/"))return;
                var c = f.value;
                if (l)var c = c.substring(0, o.column - f.start);
                return{text: "></" + c + ">", selection: [1, 1]}
            }
        }), this.add("autoindent", "insertion", function (e, t, n, r, i) {
            if (i == "\n") {
                var s = n.getCursorPosition(), o = r.doc.getLine(s.row), u = o.substring(s.column, s.column + 2);
                if (u == "</") {
                    var a = this.$getIndent(r.doc.getLine(s.row)) + r.getTabString(), f = this.$getIndent(r.doc.getLine(s.row));
                    return{text: "\n" + a + "\n" + f, selection: [1, a.length, 1, a.length]}
                }
            }
        })
    };
    i.inherits(a, s), t.XmlBehaviour = a
}), define("ace/mode/folding/html", ["require", "exports", "module", "ace/lib/oop", "ace/mode/folding/mixed", "ace/mode/folding/xml", "ace/mode/folding/cstyle"], function (e, t, n) {
    var r = e("../../lib/oop"), i = e("./mixed").FoldMode, s = e("./xml").FoldMode, o = e("./cstyle").FoldMode, u = t.FoldMode = function () {
        i.call(this, new s({area: 1, base: 1, br: 1, col: 1, command: 1, embed: 1, hr: 1, img: 1, input: 1, keygen: 1, link: 1, meta: 1, param: 1, source: 1, track: 1, wbr: 1, li: 1, dt: 1, dd: 1, p: 1, rt: 1, rp: 1, optgroup: 1, option: 1, colgroup: 1, td: 1, th: 1}), {"js-": new o, "css-": new o})
    };
    r.inherits(u, i)
}), define("ace/mode/folding/mixed", ["require", "exports", "module", "ace/lib/oop", "ace/mode/folding/fold_mode"], function (e, t, n) {
    var r = e("../../lib/oop"), i = e("./fold_mode").FoldMode, s = t.FoldMode = function (e, t) {
        this.defaultMode = e, this.subModes = t
    };
    r.inherits(s, i), function () {
        this.$getMode = function (e) {
            for (var t in this.subModes)if (e.indexOf(t) === 0)return this.subModes[t];
            return null
        }, this.$tryMode = function (e, t, n, r) {
            var i = this.$getMode(e);
            return i ? i.getFoldWidget(t, n, r) : ""
        }, this.getFoldWidget = function (e, t, n) {
            return this.$tryMode(e.getState(n - 1), e, t, n) || this.$tryMode(e.getState(n), e, t, n) || this.defaultMode.getFoldWidget(e, t, n)
        }, this.getFoldWidgetRange = function (e, t, n) {
            var r = this.$getMode(e.getState(n - 1));
            if (!r || !r.getFoldWidget(e, t, n))r = this.$getMode(e.getState(n));
            if (!r || !r.getFoldWidget(e, t, n))r = this.defaultMode;
            return r.getFoldWidgetRange(e, t, n)
        }
    }.call(s.prototype)
}), define("ace/mode/folding/xml", ["require", "exports", "module", "ace/lib/oop", "ace/lib/lang", "ace/range", "ace/mode/folding/fold_mode", "ace/token_iterator"], function (e, t, n) {
    var r = e("../../lib/oop"), i = e("../../lib/lang"), s = e("../../range").Range, o = e("./fold_mode").FoldMode, u = e("../../token_iterator").TokenIterator, a = t.FoldMode = function (e) {
        o.call(this), this.voidElements = e || {}
    };
    r.inherits(a, o), function () {
        this.getFoldWidget = function (e, t, n) {
            var r = this._getFirstTagInLine(e, n);
            return r.closing ? t == "markbeginend" ? "end" : "" : !r.tagName || this.voidElements[r.tagName.toLowerCase()] ? "" : r.selfClosing ? "" : r.value.indexOf("/" + r.tagName) !== -1 ? "" : "start"
        }, this._getFirstTagInLine = function (e, t) {
            var n = e.getTokens(t), r = "";
            for (var s = 0; s < n.length; s++) {
                var o = n[s];
                o.type.indexOf("meta.tag") === 0 ? r += o.value : r += i.stringRepeat(" ", o.value.length)
            }
            return this._parseTag(r)
        }, this.tagRe = /^(\s*)(<?(\/?)([-_a-zA-Z0-9:!]*)\s*(\/?)>?)/, this._parseTag = function (e) {
            var t = e.match(this.tagRe), n = 0;
            return{value: e, match: t ? t[2] : "", closing: t ? !!t[3] : !1, selfClosing: t ? !!t[5] || t[2] == "/>" : !1, tagName: t ? t[4] : "", column: t[1] ? n + t[1].length : n}
        }, this._readTagForward = function (e) {
            var t = e.getCurrentToken();
            if (!t)return null;
            var n = "", r;
            do if (t.type.indexOf("meta.tag") === 0) {
                if (!r)var r = {row: e.getCurrentTokenRow(), column: e.getCurrentTokenColumn()};
                n += t.value;
                if (n.indexOf(">") !== -1) {
                    var i = this._parseTag(n);
                    return i.start = r, i.end = {row: e.getCurrentTokenRow(), column: e.getCurrentTokenColumn() + t.value.length}, e.stepForward(), i
                }
            } while (t = e.stepForward());
            return null
        }, this._readTagBackward = function (e) {
            var t = e.getCurrentToken();
            if (!t)return null;
            var n = "", r;
            do if (t.type.indexOf("meta.tag") === 0) {
                r || (r = {row: e.getCurrentTokenRow(), column: e.getCurrentTokenColumn() + t.value.length}), n = t.value + n;
                if (n.indexOf("<") !== -1) {
                    var i = this._parseTag(n);
                    return i.end = r, i.start = {row: e.getCurrentTokenRow(), column: e.getCurrentTokenColumn()}, e.stepBackward(), i
                }
            } while (t = e.stepBackward());
            return null
        }, this._pop = function (e, t) {
            while (e.length) {
                var n = e[e.length - 1];
                if (!t || n.tagName == t.tagName)return e.pop();
                if (this.voidElements[t.tagName])return;
                if (this.voidElements[n.tagName]) {
                    e.pop();
                    continue
                }
                return null
            }
        }, this.getFoldWidgetRange = function (e, t, n) {
            var r = this._getFirstTagInLine(e, n);
            if (!r.match)return null;
            var i = r.closing || r.selfClosing, o = [], a;
            if (!i) {
                var f = new u(e, n, r.column), l = {row: n, column: r.column + r.tagName.length + 2};
                while (a = this._readTagForward(f)) {
                    if (a.selfClosing) {
                        if (!o.length)return a.start.column += a.tagName.length + 2, a.end.column -= 2, s.fromPoints(a.start, a.end);
                        continue
                    }
                    if (a.closing) {
                        this._pop(o, a);
                        if (o.length == 0)return s.fromPoints(l, a.start)
                    } else o.push(a)
                }
            } else {
                var f = new u(e, n, r.column + r.match.length), c = {row: n, column: r.column};
                while (a = this._readTagBackward(f)) {
                    if (a.selfClosing) {
                        if (!o.length)return a.start.column += a.tagName.length + 2, a.end.column -= 2, s.fromPoints(a.start, a.end);
                        continue
                    }
                    if (!a.closing) {
                        this._pop(o, a);
                        if (o.length == 0)return a.start.column += a.tagName.length + 2, s.fromPoints(a.start, c)
                    } else o.push(a)
                }
            }
        }
    }.call(a.prototype)
}), define("ace/mode/less", ["require", "exports", "module", "ace/lib/oop", "ace/mode/text", "ace/tokenizer", "ace/mode/less_highlight_rules", "ace/mode/matching_brace_outdent", "ace/mode/behaviour/css", "ace/mode/folding/cstyle"], function (e, t, n) {
    var r = e("../lib/oop"), i = e("./text").Mode, s = e("../tokenizer").Tokenizer, o = e("./less_highlight_rules").LessHighlightRules, u = e("./matching_brace_outdent").MatchingBraceOutdent, a = e("./behaviour/css").CssBehaviour, f = e("./folding/cstyle").FoldMode, l = function () {
        this.$tokenizer = new s((new o).getRules()), this.$outdent = new u, this.$behaviour = new a, this.foldingRules = new f
    };
    r.inherits(l, i), function () {
        this.lineCommentStart = "//", this.blockComment = {start: "/*", end: "*/"}, this.getNextLineIndent = function (e, t, n) {
            var r = this.$getIndent(t), i = this.$tokenizer.getLineTokens(t, e).tokens;
            if (i.length && i[i.length - 1].type == "comment")return r;
            var s = t.match(/^.*\{\s*$/);
            return s && (r += n), r
        }, this.checkOutdent = function (e, t, n) {
            return this.$outdent.checkOutdent(t, n)
        }, this.autoOutdent = function (e, t, n) {
            this.$outdent.autoOutdent(t, n)
        }
    }.call(l.prototype), t.Mode = l
}), define("ace/mode/less_highlight_rules", ["require", "exports", "module", "ace/lib/oop", "ace/lib/lang", "ace/mode/text_highlight_rules"], function (e, t, n) {
    var r = e("../lib/oop"), i = e("../lib/lang"), s = e("./text_highlight_rules").TextHighlightRules, o = function () {
        var e = i.arrayToMap(function () {
            var e = "-webkit-|-moz-|-o-|-ms-|-svg-|-pie-|-khtml-".split("|"), t = "appearance|background-clip|background-inline-policy|background-origin|background-size|binding|border-bottom-colors|border-left-colors|border-right-colors|border-top-colors|border-end|border-end-color|border-end-style|border-end-width|border-image|border-start|border-start-color|border-start-style|border-start-width|box-align|box-direction|box-flex|box-flexgroup|box-ordinal-group|box-orient|box-pack|box-sizing|column-count|column-gap|column-width|column-rule|column-rule-width|column-rule-style|column-rule-color|float-edge|font-feature-settings|font-language-override|force-broken-image-icon|image-region|margin-end|margin-start|opacity|outline|outline-color|outline-offset|outline-radius|outline-radius-bottomleft|outline-radius-bottomright|outline-radius-topleft|outline-radius-topright|outline-style|outline-width|padding-end|padding-start|stack-sizing|tab-size|text-blink|text-decoration-color|text-decoration-line|text-decoration-style|transform|transform-origin|transition|transition-delay|transition-duration|transition-property|transition-timing-function|user-focus|user-input|user-modify|user-select|window-shadow|border-radius".split("|"), n = "azimuth|background-attachment|background-color|background-image|background-position|background-repeat|background|border-bottom-color|border-bottom-style|border-bottom-width|border-bottom|border-collapse|border-color|border-left-color|border-left-style|border-left-width|border-left|border-right-color|border-right-style|border-right-width|border-right|border-spacing|border-style|border-top-color|border-top-style|border-top-width|border-top|border-width|border|bottom|box-sizing|caption-side|clear|clip|color|content|counter-increment|counter-reset|cue-after|cue-before|cue|cursor|direction|display|elevation|empty-cells|float|font-family|font-size-adjust|font-size|font-stretch|font-style|font-variant|font-weight|font|height|left|letter-spacing|line-height|list-style-image|list-style-position|list-style-type|list-style|margin-bottom|margin-left|margin-right|margin-top|marker-offset|margin|marks|max-height|max-width|min-height|min-width|opacity|orphans|outline-color|outline-style|outline-width|outline|overflow|overflow-x|overflow-y|padding-bottom|padding-left|padding-right|padding-top|padding|page-break-after|page-break-before|page-break-inside|page|pause-after|pause-before|pause|pitch-range|pitch|play-during|position|quotes|richness|right|size|speak-header|speak-numeral|speak-punctuation|speech-rate|speak|stress|table-layout|text-align|text-decoration|text-indent|text-shadow|text-transform|top|unicode-bidi|vertical-align|visibility|voice-family|volume|white-space|widows|width|word-spacing|z-index".split("|"), r = [];
            for (var i = 0, s = e.length; i < s; i++)Array.prototype.push.apply(r, (e[i] + t.join("|" + e[i])).split("|"));
            return Array.prototype.push.apply(r, t), Array.prototype.push.apply(r, n), r
        }()), t = i.arrayToMap("hsl|hsla|rgb|rgba|url|attr|counter|counters|lighten|darken|saturate|desaturate|fadein|fadeout|fade|spin|mix|hue|saturation|lightness|alpha|round|ceil|floor|percentage|color|iscolor|isnumber|isstring|iskeyword|isurl|ispixel|ispercentage|isem".split("|")), n = i.arrayToMap("absolute|all-scroll|always|armenian|auto|baseline|below|bidi-override|block|bold|bolder|border-box|both|bottom|break-all|break-word|capitalize|center|char|circle|cjk-ideographic|col-resize|collapse|content-box|crosshair|dashed|decimal-leading-zero|decimal|default|disabled|disc|distribute-all-lines|distribute-letter|distribute-space|distribute|dotted|double|e-resize|ellipsis|fixed|georgian|groove|hand|hebrew|help|hidden|hiragana-iroha|hiragana|horizontal|ideograph-alpha|ideograph-numeric|ideograph-parenthesis|ideograph-space|inactive|inherit|inline-block|inline|inset|inside|inter-ideograph|inter-word|italic|justify|katakana-iroha|katakana|keep-all|left|lighter|line-edge|line-through|line|list-item|loose|lower-alpha|lower-greek|lower-latin|lower-roman|lowercase|lr-tb|ltr|medium|middle|move|n-resize|ne-resize|newspaper|no-drop|no-repeat|nw-resize|none|normal|not-allowed|nowrap|oblique|outset|outside|overline|pointer|progress|relative|repeat-x|repeat-y|repeat|right|ridge|row-resize|rtl|s-resize|scroll|se-resize|separate|small-caps|solid|square|static|strict|super|sw-resize|table-footer-group|table-header-group|tb-rl|text-bottom|text-top|text|thick|thin|top|transparent|underline|upper-alpha|upper-latin|upper-roman|uppercase|vertical-ideographic|vertical-text|visible|w-resize|wait|whitespace|zero".split("|")), r = i.arrayToMap("aqua|black|blue|fuchsia|gray|green|lime|maroon|navy|olive|orange|purple|red|silver|teal|white|yellow".split("|")), s = i.arrayToMap("@mixin|@extend|@include|@import|@media|@debug|@warn|@if|@for|@each|@while|@else|@font-face|@-webkit-keyframes|if|and|!default|module|def|end|declare|when|not|and".split("|")), o = i.arrayToMap("a|abbr|acronym|address|applet|area|article|aside|audio|b|base|basefont|bdo|big|blockquote|body|br|button|canvas|caption|center|cite|code|col|colgroup|command|datalist|dd|del|details|dfn|dir|div|dl|dt|em|embed|fieldset|figcaption|figure|font|footer|form|frame|frameset|h1|h2|h3|h4|h5|h6|head|header|hgroup|hr|html|i|iframe|img|input|ins|keygen|kbd|label|legend|li|link|map|mark|menu|meta|meter|nav|noframes|noscript|object|ol|optgroup|option|output|p|param|pre|progress|q|rp|rt|ruby|s|samp|script|section|select|small|source|span|strike|strong|style|sub|summary|sup|table|tbody|td|textarea|tfoot|th|thead|time|title|tr|tt|u|ul|var|video|wbr|xmp".split("|")), u = "\\-?(?:(?:[0-9]+)|(?:[0-9]*\\.[0-9]+))";
        this.$rules = {start: [
            {token: "comment", regex: "\\/\\/.*$"},
            {token: "comment", regex: "\\/\\*", next: "comment"},
            {token: "string", regex: '["](?:(?:\\\\.)|(?:[^"\\\\]))*?["]'},
            {token: "string", regex: "['](?:(?:\\\\.)|(?:[^'\\\\]))*?[']"},
            {token: "constant.numeric", regex: u + "(?:em|ex|px|cm|mm|in|pt|pc|deg|rad|grad|ms|s|hz|khz|%)"},
            {token: "constant.numeric", regex: "#[a-f0-9]{6}"},
            {token: "constant.numeric", regex: "#[a-f0-9]{3}"},
            {token: "constant.numeric", regex: u},
            {token: function (e) {
                return s.hasOwnProperty(e) ? "keyword" : "variable"
            }, regex: "@[a-z0-9_\\-@]*\\b"},
            {token: function (i) {
                return e.hasOwnProperty(i.toLowerCase()) ? "support.type" : s.hasOwnProperty(i) ? "keyword" : n.hasOwnProperty(i) ? "constant.language" : t.hasOwnProperty(i) ? "support.function" : r.hasOwnProperty(i.toLowerCase()) ? "support.constant.color" : o.hasOwnProperty(i.toLowerCase()) ? "variable.language" : "text"
            }, regex: "\\-?[@a-z_][@a-z0-9_\\-]*"},
            {token: "variable.language", regex: "#[a-z0-9-_]+"},
            {token: "variable.language", regex: "\\.[a-z0-9-_]+"},
            {token: "variable.language", regex: ":[a-z0-9-_]+"},
            {token: "constant", regex: "[a-z0-9-_]+"},
            {token: "keyword.operator", regex: "<|>|<=|>=|==|!=|-|%|#|\\+|\\$|\\+|\\*"},
            {token: "paren.lparen", regex: "[[({]"},
            {token: "paren.rparen", regex: "[\\])}]"},
            {token: "text", regex: "\\s+"},
            {caseInsensitive: !0}
        ], comment: [
            {token: "comment", regex: ".*?\\*\\/", next: "start"},
            {token: "comment", regex: ".+"}
        ]}
    };
    r.inherits(o, s), t.LessHighlightRules = o
}), define("ace/mode/matching_brace_outdent", ["require", "exports", "module", "ace/range"], function (e, t, n) {
    var r = e("../range").Range, i = function () {
    };
    (function () {
        this.checkOutdent = function (e, t) {
            return/^\s+$/.test(e) ? /^\s*\}/.test(t) : !1
        }, this.autoOutdent = function (e, t) {
            var n = e.getLine(t), i = n.match(/^(\s*\})/);
            if (!i)return 0;
            var s = i[1].length, o = e.findMatchingBracket({row: t, column: s});
            if (!o || o.row == t)return 0;
            var u = this.$getIndent(e.getLine(o.row));
            e.replace(new r(t, 0, t, s - 1), u)
        }, this.$getIndent = function (e) {
            return e.match(/^\s*/)[0]
        }
    }).call(i.prototype), t.MatchingBraceOutdent = i
}), define("ace/mode/behaviour/css", ["require", "exports", "module", "ace/lib/oop", "ace/mode/behaviour", "ace/mode/behaviour/cstyle", "ace/token_iterator"], function (e, t, n) {
    var r = e("../../lib/oop"), i = e("../behaviour").Behaviour, s = e("./cstyle").CstyleBehaviour, o = e("../../token_iterator").TokenIterator, u = function () {
        this.inherit(s), this.add("colon", "insertion", function (e, t, n, r, i) {
            if (i === ":") {
                var s = n.getCursorPosition(), u = new o(r, s.row, s.column), a = u.getCurrentToken();
                a && a.value.match(/\s+/) && (a = u.stepBackward());
                if (a && a.type === "support.type") {
                    var f = r.doc.getLine(s.row), l = f.substring(s.column, s.column + 1);
                    if (l === ":")return{text: "", selection: [1, 1]};
                    if (!f.substring(s.column).match(/^\s*;/))return{text: ":;", selection: [1, 1]}
                }
            }
        }), this.add("colon", "deletion", function (e, t, n, r, i) {
            var s = r.doc.getTextRange(i);
            if (!i.isMultiLine() && s === ":") {
                var u = n.getCursorPosition(), a = new o(r, u.row, u.column), f = a.getCurrentToken();
                f && f.value.match(/\s+/) && (f = a.stepBackward());
                if (f && f.type === "support.type") {
                    var l = r.doc.getLine(i.start.row), c = l.substring(i.end.column, i.end.column + 1);
                    if (c === ";")return i.end.column++, i
                }
            }
        }), this.add("semicolon", "insertion", function (e, t, n, r, i) {
            if (i === ";") {
                var s = n.getCursorPosition(), o = r.doc.getLine(s.row), u = o.substring(s.column, s.column + 1);
                if (u === ";")return{text: "", selection: [1, 1]}
            }
        })
    };
    r.inherits(u, s), t.CssBehaviour = u
}), define("ace/mode/behaviour/cstyle", ["require", "exports", "module", "ace/lib/oop", "ace/mode/behaviour", "ace/token_iterator", "ace/lib/lang"], function (e, t, n) {
    var r = e("../../lib/oop"), i = e("../behaviour").Behaviour, s = e("../../token_iterator").TokenIterator, o = e("../../lib/lang"), u = ["text", "paren.rparen", "punctuation.operator"], a = ["text", "paren.rparen", "punctuation.operator", "comment"], f = 0, l = -1, c = "", h = 0, p = -1, d = "", v = "", m = function () {
        m.isSaneInsertion = function (e, t) {
            var n = e.getCursorPosition(), r = new s(t, n.row, n.column);
            if (!this.$matchTokenType(r.getCurrentToken() || "text", u)) {
                var i = new s(t, n.row, n.column + 1);
                if (!this.$matchTokenType(i.getCurrentToken() || "text", u))return!1
            }
            return r.stepForward(), r.getCurrentTokenRow() !== n.row || this.$matchTokenType(r.getCurrentToken() || "text", a)
        }, m.$matchTokenType = function (e, t) {
            return t.indexOf(e.type || e) > -1
        }, m.recordAutoInsert = function (e, t, n) {
            var r = e.getCursorPosition(), i = t.doc.getLine(r.row);
            this.isAutoInsertedClosing(r, i, c[0]) || (f = 0), l = r.row, c = n + i.substr(r.column), f++
        }, m.recordMaybeInsert = function (e, t, n) {
            var r = e.getCursorPosition(), i = t.doc.getLine(r.row);
            this.isMaybeInsertedClosing(r, i) || (h = 0), p = r.row, d = i.substr(0, r.column) + n, v = i.substr(r.column), h++
        }, m.isAutoInsertedClosing = function (e, t, n) {
            return f > 0 && e.row === l && n === c[0] && t.substr(e.column) === c
        }, m.isMaybeInsertedClosing = function (e, t) {
            return h > 0 && e.row === p && t.substr(e.column) === v && t.substr(0, e.column) == d
        }, m.popAutoInsertedClosing = function () {
            c = c.substr(1), f--
        }, m.clearMaybeInsertedClosing = function () {
            h = 0, p = -1
        }, this.add("braces", "insertion", function (e, t, n, r, i) {
            var s = n.getCursorPosition(), u = r.doc.getLine(s.row);
            if (i == "{") {
                var a = n.getSelectionRange(), f = r.doc.getTextRange(a);
                if (f !== "" && f !== "{" && n.getWrapBehavioursEnabled())return{text: "{" + f + "}", selection: !1};
                if (m.isSaneInsertion(n, r))return/[\]\}\)]/.test(u[s.column]) ? (m.recordAutoInsert(n, r, "}"), {text: "{}", selection: [1, 1]}) : (m.recordMaybeInsert(n, r, "{"), {text: "{", selection: [1, 1]})
            } else if (i == "}") {
                var l = u.substring(s.column, s.column + 1);
                if (l == "}") {
                    var c = r.$findOpeningBracket("}", {column: s.column + 1, row: s.row});
                    if (c !== null && m.isAutoInsertedClosing(s, u, i))return m.popAutoInsertedClosing(), {text: "", selection: [1, 1]}
                }
            } else if (i == "\n" || i == "\r\n") {
                var p = "";
                m.isMaybeInsertedClosing(s, u) && (p = o.stringRepeat("}", h), m.clearMaybeInsertedClosing());
                var l = u.substring(s.column, s.column + 1);
                if (l == "}" || p !== "") {
                    var d = r.findMatchingBracket({row: s.row, column: s.column}, "}");
                    if (!d)return null;
                    var v = this.getNextLineIndent(e, u.substring(0, s.column), r.getTabString()), g = this.$getIndent(u);
                    return{text: "\n" + v + "\n" + g + p, selection: [1, v.length, 1, v.length]}
                }
            }
        }), this.add("braces", "deletion", function (e, t, n, r, i) {
            var s = r.doc.getTextRange(i);
            if (!i.isMultiLine() && s == "{") {
                var o = r.doc.getLine(i.start.row), u = o.substring(i.end.column, i.end.column + 1);
                if (u == "}")return i.end.column++, i;
                h--
            }
        }), this.add("parens", "insertion", function (e, t, n, r, i) {
            if (i == "(") {
                var s = n.getSelectionRange(), o = r.doc.getTextRange(s);
                if (o !== "" && n.getWrapBehavioursEnabled())return{text: "(" + o + ")", selection: !1};
                if (m.isSaneInsertion(n, r))return m.recordAutoInsert(n, r, ")"), {text: "()", selection: [1, 1]}
            } else if (i == ")") {
                var u = n.getCursorPosition(), a = r.doc.getLine(u.row), f = a.substring(u.column, u.column + 1);
                if (f == ")") {
                    var l = r.$findOpeningBracket(")", {column: u.column + 1, row: u.row});
                    if (l !== null && m.isAutoInsertedClosing(u, a, i))return m.popAutoInsertedClosing(), {text: "", selection: [1, 1]}
                }
            }
        }), this.add("parens", "deletion", function (e, t, n, r, i) {
            var s = r.doc.getTextRange(i);
            if (!i.isMultiLine() && s == "(") {
                var o = r.doc.getLine(i.start.row), u = o.substring(i.start.column + 1, i.start.column + 2);
                if (u == ")")return i.end.column++, i
            }
        }), this.add("brackets", "insertion", function (e, t, n, r, i) {
            if (i == "[") {
                var s = n.getSelectionRange(), o = r.doc.getTextRange(s);
                if (o !== "" && n.getWrapBehavioursEnabled())return{text: "[" + o + "]", selection: !1};
                if (m.isSaneInsertion(n, r))return m.recordAutoInsert(n, r, "]"), {text: "[]", selection: [1, 1]}
            } else if (i == "]") {
                var u = n.getCursorPosition(), a = r.doc.getLine(u.row), f = a.substring(u.column, u.column + 1);
                if (f == "]") {
                    var l = r.$findOpeningBracket("]", {column: u.column + 1, row: u.row});
                    if (l !== null && m.isAutoInsertedClosing(u, a, i))return m.popAutoInsertedClosing(), {text: "", selection: [1, 1]}
                }
            }
        }), this.add("brackets", "deletion", function (e, t, n, r, i) {
            var s = r.doc.getTextRange(i);
            if (!i.isMultiLine() && s == "[") {
                var o = r.doc.getLine(i.start.row), u = o.substring(i.start.column + 1, i.start.column + 2);
                if (u == "]")return i.end.column++, i
            }
        }), this.add("string_dquotes", "insertion", function (e, t, n, r, i) {
            if (i == '"' || i == "'") {
                var s = i, o = n.getSelectionRange(), u = r.doc.getTextRange(o);
                if (u !== "" && u !== "'" && u != '"' && n.getWrapBehavioursEnabled())return{text: s + u + s, selection: !1};
                var a = n.getCursorPosition(), f = r.doc.getLine(a.row), l = f.substring(a.column - 1, a.column);
                if (l == "\\")return null;
                var c = r.getTokens(o.start.row), h = 0, p, d = -1;
                for (var v = 0; v < c.length; v++) {
                    p = c[v], p.type == "string" ? d = -1 : d < 0 && (d = p.value.indexOf(s));
                    if (p.value.length + h > o.start.column)break;
                    h += c[v].value.length
                }
                if (!p || d < 0 && p.type !== "comment" && (p.type !== "string" || o.start.column !== p.value.length + h - 1 && p.value.lastIndexOf(s) === p.value.length - 1)) {
                    if (!m.isSaneInsertion(n, r))return;
                    return{text: s + s, selection: [1, 1]}
                }
                if (p && p.type === "string") {
                    var g = f.substring(a.column, a.column + 1);
                    if (g == s)return{text: "", selection: [1, 1]}
                }
            }
        }), this.add("string_dquotes", "deletion", function (e, t, n, r, i) {
            var s = r.doc.getTextRange(i);
            if (!i.isMultiLine() && (s == '"' || s == "'")) {
                var o = r.doc.getLine(i.start.row), u = o.substring(i.start.column + 1, i.start.column + 2);
                if (u == s)return i.end.column++, i
            }
        })
    };
    r.inherits(m, i), t.CstyleBehaviour = m
}), define("ace/mode/folding/cstyle", ["require", "exports", "module", "ace/lib/oop", "ace/range", "ace/mode/folding/fold_mode"], function (e, t, n) {
    var r = e("../../lib/oop"), i = e("../../range").Range, s = e("./fold_mode").FoldMode, o = t.FoldMode = function (e) {
        e && (this.foldingStartMarker = new RegExp(this.foldingStartMarker.source.replace(/\|[^|]*?$/, "|" + e.start)), this.foldingStopMarker = new RegExp(this.foldingStopMarker.source.replace(/\|[^|]*?$/, "|" + e.end)))
    };
    r.inherits(o, s), function () {
        this.foldingStartMarker = /(\{|\[)[^\}\]]*$|^\s*(\/\*)/, this.foldingStopMarker = /^[^\[\{]*(\}|\])|^[\s\*]*(\*\/)/, this.getFoldWidgetRange = function (e, t, n) {
            var r = e.getLine(n), i = r.match(this.foldingStartMarker);
            if (i) {
                var s = i.index;
                return i[1] ? this.openingBracketBlock(e, i[1], n, s) : e.getCommentFoldRange(n, s + i[0].length, 1)
            }
            if (t !== "markbeginend")return;
            var i = r.match(this.foldingStopMarker);
            if (i) {
                var s = i.index + i[0].length;
                return i[1] ? this.closingBracketBlock(e, i[1], n, s) : e.getCommentFoldRange(n, s, -1)
            }
        }
    }.call(o.prototype)
}), define("ace/theme/monokai", ["require", "exports", "module", "ace/lib/dom"], function (e, t, n) {
    t.isDark = !0, t.cssClass = "ace-monokai", t.cssText = ".ace-monokai .ace_gutter {background: #222222;color: #8F908A}.ace-monokai .ace_print-margin {width: 1px;background: #555651}.ace-monokai .ace_scroller {background-color: #191919}.ace-monokai .ace_text-layer {color: #F8F8F2}.ace-monokai .ace_cursor {border-left: 2px solid #F8F8F0}.ace-monokai .ace_overwrite-cursors .ace_cursor {border-left: 0px;border-bottom: 1px solid #F8F8F0}.ace-monokai .ace_marker-layer .ace_selection {background: #49483E}.ace-monokai.ace_multiselect .ace_selection.ace_start {box-shadow: 0 0 3px 0px #272822;border-radius: 2px}.ace-monokai .ace_marker-layer .ace_step {background: rgb(102, 82, 0)}.ace-monokai .ace_marker-layer .ace_bracket {margin: -1px 0 0 -1px;border: 1px solid #49483E}.ace-monokai .ace_marker-layer .ace_active-line {background: #202020}.ace-monokai .ace_gutter-active-line {background-color: #272727}.ace-monokai .ace_marker-layer .ace_selected-word {border: 1px solid #49483E}.ace-monokai .ace_invisible {color: #52524d}.ace-monokai .ace_entity.ace_name.ace_tag,.ace-monokai .ace_keyword,.ace-monokai .ace_meta,.ace-monokai .ace_storage {color: #F92672}.ace-monokai .ace_constant.ace_character,.ace-monokai .ace_constant.ace_language,.ace-monokai .ace_constant.ace_numeric,.ace-monokai .ace_constant.ace_other {color: #AE81FF}.ace-monokai .ace_invalid {color: #F8F8F0;background-color: #F92672}.ace-monokai .ace_invalid.ace_deprecated {color: #F8F8F0;background-color: #AE81FF}.ace-monokai .ace_support.ace_constant,.ace-monokai .ace_support.ace_function {color: #66D9EF}.ace-monokai .ace_fold {background-color: #A6E22E;border-color: #F8F8F2}.ace-monokai .ace_storage.ace_type,.ace-monokai .ace_support.ace_class,.ace-monokai .ace_support.ace_type {font-style: italic;color: #66D9EF}.ace-monokai .ace_entity.ace_name.ace_function,.ace-monokai .ace_entity.ace_other,.ace-monokai .ace_variable {color: #A6E22E}.ace-monokai .ace_variable.ace_parameter {font-style: italic;color: #FD971F}.ace-monokai .ace_string {color: #E6DB74}.ace-monokai .ace_comment {color: #75715E}.ace-monokai .ace_markup.ace_underline {text-decoration: underline}.ace-monokai .ace_indent-guide {background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAACCAYAAACZgbYnAAAAEklEQVQImWNQ11D6z7Bq1ar/ABCKBG6g04U2AAAAAElFTkSuQmCC) right repeat-y}"
    ;
    var r = e("../lib/dom");
    r.importCssString(t.cssText, t.cssClass)
}), function (e, t, n) {
    function f(e, t, n) {
        var r = [];
        for (var i = 0; i < e.length; i++) {
            var s = tinycolor(e[i]), u = s.toHsl().l < .5 ? "sp-thumb-el sp-thumb-dark" : "sp-thumb-el sp-thumb-light";
            u += tinycolor.equals(t, e[i]) ? " sp-thumb-active" : "";
            var a = o ? "background-color:" + s.toRgbString() : "filter:" + s.toFilter();
            r.push('<span title="' + s.toRgbString() + '" data-color="' + s.toRgbString() + '" class="' + u + '"><span class="sp-thumb-inner" style="' + a + ';" /></span>')
        }
        return"<div class='sp-cf " + n + "'>" + r.join("") + "</div>"
    }

    function l() {
        for (var e = 0; e < i.length; e++)i[e] && i[e].hide()
    }

    function c(e, n) {
        var i = t.extend({}, r, e);
        return i.callbacks = {move: m(i.move, n), change: m(i.change, n), show: m(i.show, n), hide: m(i.hide, n), beforeShow: m(i.beforeShow, n)}, i
    }

    function h(r, h) {
        function gt() {
            J.toggleClass("sp-flat", m), J.toggleClass("sp-input-disabled", !d.showInput), J.toggleClass("sp-alpha-enabled", d.showAlpha), J.toggleClass("sp-buttons-disabled", !d.showButtons), J.toggleClass("sp-palette-disabled", !d.showPalette), J.toggleClass("sp-palette-only", d.showPaletteOnly), J.toggleClass("sp-initial-disabled", !d.showInitial), J.addClass(d.className), jt()
        }

        function yt() {
            function o(e) {
                return e.data && e.data.ignore ? (Ot(t(this).data("color")), Dt()) : (Ot(t(this).data("color")), Bt(!0), Dt(), Lt()), e.preventDefault(), !1
            }

            s && J.find("*:not(input)").attr("unselectable", "on"), gt(), at && X.after(ft).hide();
            if (m)X.after(J).hide(); else {
                var n = d.appendTo === "parent" ? X.parent() : t(d.appendTo);
                n.length !== 1 && (n = t("body")), n.append(J)
            }
            if (w && e.localStorage) {
                try {
                    var r = e.localStorage[w].split(",#");
                    r.length > 1 && (delete e.localStorage[w], t.each(r, function (e, t) {
                        bt(t)
                    }))
                } catch (i) {
                }
                try {
                    I = e.localStorage[w].split(";")
                } catch (i) {
                }
            }
            lt.bind("click.spectrum touchstart.spectrum", function (e) {
                V || Ct(), e.stopPropagation(), t(e.target).is("input") || e.preventDefault()
            }), (X.is(":disabled") || d.disabled === !0) && Rt(), J.click(v), nt.change(Nt), nt.bind("paste", function () {
                setTimeout(Nt, 1)
            }), nt.keydown(function (e) {
                e.keyCode == 13 && Nt()
            }), st.text(d.cancelText), st.bind("click.spectrum", function (e) {
                e.stopPropagation(), e.preventDefault(), Lt("cancel")
            }), ot.text(d.chooseText), ot.bind("click.spectrum", function (e) {
                e.stopPropagation(), e.preventDefault(), _t() && (Bt(!0), Lt())
            }), g(et, function (e, t, n) {
                B = e / O, n.shiftKey && (B = Math.round(B * 10) / 10), Dt()
            }), g(G, function (e, t) {
                D = parseFloat(t / L), Dt()
            }, xt, Tt), g(K, function (e, t, n) {
                if (!n.shiftKey)U = null; else if (!U) {
                    var r = P * N, i = C - H * C, s = Math.abs(e - r) > Math.abs(t - i);
                    U = s ? "x" : "y"
                }
                var o = !U || U === "x", u = !U || U === "y";
                o && (P = parseFloat(e / N)), u && (H = parseFloat((C - t) / C)), Dt()
            }, xt, Tt), ht ? (Ot(ht), Pt(), vt = dt || tinycolor(ht).format, bt(ht)) : Pt(), m && kt();
            var u = s ? "mousedown.spectrum" : "mousedown.spectrum touchstart.spectrum";
            rt.delegate(".sp-thumb-el", u, o), it.delegate(".sp-thumb-el:nth-child(1)", u, {ignore: !0}, o)
        }

        function bt(n) {
            if (b) {
                var r = tinycolor(n).toRgbString();
                if (t.inArray(r, I) === -1) {
                    I.push(r);
                    while (I.length > q)I.shift()
                }
                if (w && e.localStorage)try {
                    e.localStorage[w] = I.join(";")
                } catch (i) {
                }
            }
        }

        function wt() {
            var e = [], t = I, n = {}, r;
            if (d.showPalette) {
                for (var i = 0; i < F.length; i++)for (var s = 0; s < F[i].length; s++)r = tinycolor(F[i][s]).toRgbString(), n[r] = !0;
                for (i = 0; i < t.length; i++)r = tinycolor(t[i]).toRgbString(), n.hasOwnProperty(r) || (e.push(t[i]), n[r] = !0)
            }
            return e.reverse().slice(0, d.maxSelectionSize)
        }

        function Et() {
            var e = Mt(), n = t.map(F, function (t, n) {
                return f(t, e, "sp-palette-row sp-palette-row-" + n)
            });
            I && n.push(f(wt(), e, "sp-palette-row sp-palette-row-selection")), rt.html(n.join(""))
        }

        function St() {
            if (d.showInitial) {
                var e = pt, t = Mt();
                it.html(f([e, t], t, "sp-palette-row-initial"))
            }
        }

        function xt() {
            (C <= 0 || N <= 0 || L <= 0) && jt(), J.addClass(R), U = null
        }

        function Tt() {
            J.removeClass(R)
        }

        function Nt() {
            var e = tinycolor(nt.val());
            e.ok ? Ot(e) : nt.addClass("sp-validation-error")
        }

        function Ct() {
            T ? Lt() : kt()
        }

        function kt() {
            var n = t.Event("beforeShow.spectrum");
            if (T) {
                jt();
                return
            }
            X.trigger(n, [Mt()]);
            if (S.beforeShow(Mt()) === !1 || n.isDefaultPrevented())return;
            l(), T = !0, t(z).bind("click.spectrum", Lt), t(e).bind("resize.spectrum", x), ft.addClass("sp-active"), J.removeClass("sp-hidden"), d.showPalette && Et(), jt(), Pt(), pt = Mt(), St(), S.show(pt), X.trigger("show.spectrum", [pt])
        }

        function Lt(n) {
            if (n && n.type == "click" && n.button == 2)return;
            if (!T || m)return;
            T = !1, t(z).unbind("click.spectrum", Lt), t(e).unbind("resize.spectrum", x), ft.removeClass("sp-active"), J.addClass("sp-hidden");
            var r = !tinycolor.equals(Mt(), pt);
            r && (mt && n !== "cancel" ? Bt(!0) : At()), S.hide(Mt()), X.trigger("hide.spectrum", [Mt()])
        }

        function At() {
            Ot(pt, !0)
        }

        function Ot(e, t) {
            if (tinycolor.equals(e, Mt()))return;
            var n = tinycolor(e), r = n.toHsv();
            D = r.h % 360 / 360, P = r.s, H = r.v, B = r.a, Pt(), n.ok && !t && (vt = dt || n.format)
        }

        function Mt(e) {
            return e = e || {}, tinycolor.fromRatio({h: D, s: P, v: H, a: Math.round(B * 100) / 100}, {format: e.format || vt})
        }

        function _t() {
            return!nt.hasClass("sp-validation-error")
        }

        function Dt() {
            Pt(), S.move(Mt()), X.trigger("move.spectrum", [Mt()])
        }

        function Pt() {
            nt.removeClass("sp-validation-error"), Ht();
            var e = tinycolor.fromRatio({h: D, s: 1, v: 1});
            K.css("background-color", e.toHexString());
            var t = vt;
            B < 1 && (t === "hex" || t === "hex3" || t === "hex6" || t === "name") && (t = "rgb");
            var n = Mt({format: t}), r = n.toHexString(), i = n.toRgbString();
            o || n.alpha === 1 ? ct.css("background-color", i) : (ct.css("background-color", "transparent"), ct.css("filter", n.toFilter()));
            if (d.showAlpha) {
                var u = n.toRgb();
                u.a = 0;
                var a = tinycolor(u).toRgbString(), f = "linear-gradient(left, " + a + ", " + r + ")";
                s ? Z.css("filter", tinycolor(a).toFilter({gradientType: 1}, r)) : (Z.css("background", "-webkit-" + f), Z.css("background", "-moz-" + f), Z.css("background", "-ms-" + f), Z.css("background", f))
            }
            d.showInput && nt.val(n.toString(t)), d.showPalette && Et(), St()
        }

        function Ht() {
            var e = P, t = H, n = e * N, r = C - t * C;
            n = Math.max(-k, Math.min(N - k, n - k)), r = Math.max(-k, Math.min(C - k, r - k)), Q.css({top: r, left: n});
            var i = B * O;
            tt.css({left: i - M / 2});
            var s = D * L;
            Y.css({top: s - _})
        }

        function Bt(e) {
            var t = Mt();
            ut && X.val(t.toString(vt)).change(), pt = t, bt(t), e && (S.change(t), X.trigger("change.spectrum", [t]))
        }

        function jt() {
            N = K.width(), C = K.height(), k = Q.height(), A = G.width(), L = G.height(), _ = Y.height(), O = et.width(), M = tt.width(), m || (J.css("position", "absolute"), J.offset(p(J, lt))), Ht()
        }

        function Ft() {
            X.show(), lt.unbind("click.spectrum touchstart.spectrum"), J.remove(), ft.remove(), i[Ut.id] = null
        }

        function It(e, r) {
            if (e === n)return t.extend({}, d);
            if (r === n)return d[e];
            d[e] = r, gt()
        }

        function qt() {
            V = !1, X.attr("disabled", !1), lt.removeClass("sp-disabled")
        }

        function Rt() {
            Lt(), V = !0, X.attr("disabled", !0), lt.addClass("sp-disabled")
        }

        var d = c(h, r), m = d.flat, b = d.showSelectionPalette, w = d.localStorageKey, E = d.theme, S = d.callbacks, x = y(jt, 10), T = !1, N = 0, C = 0, k = 0, L = 0, A = 0, O = 0, M = 0, _ = 0, D = 0, P = 0, H = 0, B = 1, j = d.palette.slice(0), F = t.isArray(j[0]) ? j : [j], I = d.selectionPalette.slice(0), q = d.maxSelectionSize, R = "sp-dragging", U = null, z = r.ownerDocument, W = z.body, X = t(r), V = !1, J = t(a, z).addClass(E), K = J.find(".sp-color"), Q = J.find(".sp-dragger"), G = J.find(".sp-hue"), Y = J.find(".sp-slider"), Z = J.find(".sp-alpha-inner"), et = J.find(".sp-alpha"), tt = J.find(".sp-alpha-handle"), nt = J.find(".sp-input"), rt = J.find(".sp-palette"), it = J.find(".sp-initial"), st = J.find(".sp-cancel"), ot = J.find(".sp-choose"), ut = X.is("input"), at = ut && !m, ft = at ? t(u).addClass(E).addClass(d.className) : t([]), lt = at ? ft : X, ct = ft.find(".sp-preview-inner"), ht = d.color || ut && X.val(), pt = !1, dt = d.preferredFormat, vt = dt, mt = !d.showButtons || d.clickoutFiresChange;
        yt();
        var Ut = {show: kt, hide: Lt, toggle: Ct, reflow: jt, option: It, enable: qt, disable: Rt, set: function (e) {
            Ot(e), Bt()
        }, get: Mt, destroy: Ft, container: J};
        return Ut.id = i.push(Ut) - 1, Ut
    }

    function p(e, n) {
        var r = 0, i = e.outerWidth(), s = e.outerHeight(), o = n.outerWidth(), u = n.outerHeight(), a = e[0].ownerDocument, f = a.documentElement, l = f.clientWidth + t(a).scrollLeft(), c = f.clientHeight + t(a).scrollTop(), h = n.offset();
        return h.left -= i / 2 - o / 2, h.top += u + 16, h.left -= Math.min(h.left, h.left + i > l && l > i ? Math.abs(h.left + i - l) : 0), h.top -= Math.min(h.top, h.top + s > c && c > s ? Math.abs(s + u - r) : r), h
    }

    function d() {
    }

    function v(e) {
        e.stopPropagation()
    }

    function m(e, t) {
        var n = Array.prototype.slice, r = n.call(arguments, 2);
        return function () {
            return e.apply(t, r.concat(n.call(arguments)))
        }
    }

    function g(n, r, i, o) {
        function d(e) {
            e.stopPropagation && e.stopPropagation(), e.preventDefault && e.preventDefault(), e.returnValue = !1
        }

        function v(e) {
            if (a) {
                if (s && document.documentMode < 9 && !e.button)return g();
                var t = e.originalEvent.touches, i = t ? t[0].pageX : e.pageX, o = t ? t[0].pageY : e.pageY, u = Math.max(0, Math.min(i - f.left, c)), p = Math.max(0, Math.min(o - f.top, l));
                h && d(e), r.apply(n, [u, p, e])
            }
        }

        function m(e) {
            var r = e.which ? e.which == 3 : e.button == 2, s = e.originalEvent.touches;
            !r && !a && i.apply(n, arguments) !== !1 && (a = !0, l = t(n).height(), c = t(n).width(), f = t(n).offset(), t(u).bind(p), t(u.body).addClass("sp-dragging"), h || v(e), d(e))
        }

        function g() {
            a && (t(u).unbind(p), t(u.body).removeClass("sp-dragging"), o.apply(n, arguments)), a = !1
        }

        r = r || function () {
        }, i = i || function () {
        }, o = o || function () {
        };
        var u = n.ownerDocument || document, a = !1, f = {}, l = 0, c = 0, h = "ontouchstart"in e, p = {};
        p.selectstart = d, p.dragstart = d, p["touchmove mousemove"] = v, p["touchend mouseup"] = g, t(n).bind("touchstart mousedown", m)
    }

    function y(e, t, n) {
        var r;
        return function () {
            var i = this, s = arguments, o = function () {
                r = null, e.apply(i, s)
            };
            n && clearTimeout(r);
            if (n || !r)r = setTimeout(o, t)
        }
    }

    function b() {
        e.console && (Function.prototype.bind ? b = Function.prototype.bind.call(console.log, console) : b = function () {
            Function.prototype.apply.call(console.log, console, arguments)
        }, b.apply(this, arguments))
    }

    var r = {beforeShow: d, move: d, change: d, show: d, hide: d, color: !1, flat: !1, showInput: !1, showButtons: !0, clickoutFiresChange: !1, showInitial: !1, showPalette: !1, showPaletteOnly: !1, showSelectionPalette: !0, localStorageKey: !1, appendTo: "body", maxSelectionSize: 7, cancelText: "Cancel", chooseText: "Confirm", preferredFormat: !1, className: "", showAlpha: !1, theme: "sp-light", palette: ["fff", "000"], selectionPalette: [], disabled: !1}, i = [], s = !!/msie/i.exec(e.navigator.userAgent), o = function () {
        function e(e, t) {
            return!!~("" + e).indexOf(t)
        }

        var t = document.createElement("div"), n = t.style;
        return n.cssText = "background-color:rgba(0,0,0,.5)", e(n.backgroundColor, "rgba") || e(n.backgroundColor, "hsla")
    }(), u = ["<div class='sp-replacer'>", "<div class='sp-preview'><div class='sp-preview-inner'></div></div>", "<div class='sp-dd'>&#9660;</div>", "</div>"].join(""), a = function () {
        var e = "";
        if (s)for (var t = 1; t <= 6; t++)e += "<div class='sp-" + t + "'></div>";
        return["<div class='sp-container sp-hidden'>", "<div class='sp-palette-container'>", "<div class='sp-palette sp-thumb sp-cf'></div>", "</div>", "<div class='sp-picker-container'>", "<div class='sp-top sp-cf'>", "<div class='sp-fill'></div>", "<div class='sp-top-inner'>", "<div class='sp-color'>", "<div class='sp-sat'>", "<div class='sp-val'>", "<div class='sp-dragger'></div>", "</div>", "</div>", "</div>", "<div class='sp-hue'>", "<div class='sp-slider'></div>", e, "</div>", "</div>", "<div class='sp-alpha'><div class='sp-alpha-inner'><div class='sp-alpha-handle'></div></div></div>", "</div>", "<div class='sp-input-container sp-cf'>", "<input class='sp-input' type='text' spellcheck='false'  />", "</div>", "<div class='sp-initial sp-thumb sp-cf'></div>", "<div class='sp-button-container sp-cf'>", "<button class='sp-cancel skriv-cancel-button'></button>", "<button class='sp-choose skriv-confirm-button'></button>", "</div>", "</div>", "</div>"].join("")
    }(), w = "spectrum.id";
    t.fn.spectrum = function (e, n) {
        if (typeof e == "string") {
            var r = this, s = Array.prototype.slice.call(arguments, 1);
            return this.each(function () {
                var n = i[t(this).data(w)];
                if (n) {
                    var o = n[e];
                    if (!o)throw new Error("Spectrum: no such method: '" + e + "'");
                    e == "get" ? r = n.get() : e == "container" ? r = n.container : e == "option" ? r = n.option.apply(n, s) : e == "destroy" ? (n.destroy(), t(this).removeData(w)) : o.apply(n, s)
                }
            }), r
        }
        return this.spectrum("destroy").each(function () {
            var n = h(this, e);
            t(this).data(w, n.id)
        })
    }, t.fn.spectrum.load = !0, t.fn.spectrum.loadOpts = {}, t.fn.spectrum.draggable = g, t.fn.spectrum.defaults = r, t.spectrum = {}, t.spectrum.localization = {}, t.spectrum.palettes = {}, t.fn.spectrum.processNativeColorInputs = function () {
        var e = t("<input type='color' value='!' />")[0], n = e.type === "color" && e.value != "!";
        n || t("input[type=color]").spectrum({preferredFormat: "hex6"})
    }, function (e) {
        function f(e, t) {
            e = e ? e : "", t = t || {};
            if (typeof e == "object" && e.hasOwnProperty("_tc_id"))return e;
            var n = l(e), i = n.r, o = n.g, u = n.b, a = n.a, c = s(100 * a) / 100, p = t.format || n.format;
            return i < 1 && (i = s(i)), o < 1 && (o = s(o)), u < 1 && (u = s(u)), {ok: n.ok, format: p, _tc_id: r++, alpha: a, toHsv: function () {
                var e = d(i, o, u);
                return{h: e.h * 360, s: e.s, v: e.v, a: a}
            }, toHsvString: function () {
                var e = d(i, o, u), t = s(e.h * 360), n = s(e.s * 100), r = s(e.v * 100);
                return a == 1 ? "hsv(" + t + ", " + n + "%, " + r + "%)" : "hsva(" + t + ", " + n + "%, " + r + "%, " + c + ")"
            }, toHsl: function () {
                var e = h(i, o, u);
                return{h: e.h * 360, s: e.s, l: e.l, a: a}
            }, toHslString: function () {
                var e = h(i, o, u), t = s(e.h * 360), n = s(e.s * 100), r = s(e.l * 100);
                return a == 1 ? "hsl(" + t + ", " + n + "%, " + r + "%)" : "hsla(" + t + ", " + n + "%, " + r + "%, " + c + ")"
            }, toHex: function (e) {
                return m(i, o, u, e)
            }, toHexString: function (e) {
                return"#" + m(i, o, u, e)
            }, toRgb: function () {
                return{r: s(i), g: s(o), b: s(u), a: a}
            }, toRgbString: function () {
                return a == 1 ? "rgb(" + s(i) + ", " + s(o) + ", " + s(u) + ")" : "rgba(" + s(i) + ", " + s(o) + ", " + s(u) + ", " + c + ")"
            }, toPercentageRgb: function () {
                return{r: s(w(i, 255) * 100) + "%", g: s(w(o, 255) * 100) + "%", b: s(w(u, 255) * 100) + "%", a: a}
            }, toPercentageRgbString: function () {
                return a == 1 ? "rgb(" + s(w(i, 255) * 100) + "%, " + s(w(o, 255) * 100) + "%, " + s(w(u, 255) * 100) + "%)" : "rgba(" + s(w(i, 255) * 100) + "%, " + s(w(o, 255) * 100) + "%, " + s(w(u, 255) * 100) + "%, " + c + ")"
            }, toName: function () {
                return y[m(i, o, u, !0)] || !1
            }, toFilter: function (e) {
                var n = m(i, o, u), r = n, s = Math.round(parseFloat(a) * 255).toString(16), l = s, c = t && t.gradientType ? "GradientType = 1, " : "";
                if (e) {
                    var h = f(e);
                    r = h.toHex(), l = Math.round(parseFloat(h.alpha) * 255).toString(16)
                }
                return"progid:DXImageTransform.Microsoft.gradient(" + c + "startColorstr=#" + N(s) + n + ",endColorstr=#" + N(l) + r + ")"
            }, toString: function (e) {
                e = e || this.format;
                var t = !1;
                e === "rgb" && (t = this.toRgbString()), e === "prgb" && (t = this.toPercentageRgbString());
                if (e === "hex" || e === "hex6")t = this.toHexString();
                return e === "hex3" && (t = this.toHexString(!0)), e === "name" && (t = this.toName()), e === "hsl" && (t = this.toHslString()), e === "hsv" && (t = this.toHsvString()), t || this.toHexString()
            }}
        }

        function l(e) {
            var t = {r: 0, g: 0, b: 0}, n = 1, r = !1, i = !1;
            typeof e == "string" && (e = L(e)), typeof e == "object" && (e.hasOwnProperty("r") && e.hasOwnProperty("g") && e.hasOwnProperty("b") ? (t = c(e.r, e.g, e.b), r = !0, i = String(e.r).substr(-1) === "%" ? "prgb" : "rgb") : e.hasOwnProperty("h") && e.hasOwnProperty("s") && e.hasOwnProperty("v") ? (e.s = C(e.s), e.v = C(e.v), t = v(e.h, e.s, e.v), r = !0, i = "hsv") : e.hasOwnProperty("h") && e.hasOwnProperty("s") && e.hasOwnProperty("l") && (e.s = C(e.s), e.l = C(e.l), t = p(e.h, e.s, e.l), r = !0, i = "hsl"), e.hasOwnProperty("a") && (n = e.a)), n = parseFloat(n);
            if (isNaN(n) || n < 0 || n > 1)n = 1;
            return{ok: r, format: e.format || i, r: o(255, u(t.r, 0)), g: o(255, u(t.g, 0)), b: o(255, u(t.b, 0)), a: n}
        }

        function c(e, t, n) {
            return{r: w(e, 255) * 255, g: w(t, 255) * 255, b: w(n, 255) * 255}
        }

        function h(e, t, n) {
            e = w(e, 255), t = w(t, 255), n = w(n, 255);
            var r = u(e, t, n), i = o(e, t, n), s, a, f = (r + i) / 2;
            if (r == i)s = a = 0; else {
                var l = r - i;
                a = f > .5 ? l / (2 - r - i) : l / (r + i);
                switch (r) {
                    case e:
                        s = (t - n) / l + (t < n ? 6 : 0);
                        break;
                    case t:
                        s = (n - e) / l + 2;
                        break;
                    case n:
                        s = (e - t) / l + 4
                }
                s /= 6
            }
            return{h: s, s: a, l: f}
        }

        function p(e, t, n) {
            function o(e, t, n) {
                return n < 0 && (n += 1), n > 1 && (n -= 1), n < 1 / 6 ? e + (t - e) * 6 * n : n < .5 ? t : n < 2 / 3 ? e + (t - e) * (2 / 3 - n) * 6 : e
            }

            var r, i, s;
            e = w(e, 360), t = w(t, 100), n = w(n, 100);
            if (t === 0)r = i = s = n; else {
                var u = n < .5 ? n * (1 + t) : n + t - n * t, a = 2 * n - u;
                r = o(a, u, e + 1 / 3), i = o(a, u, e), s = o(a, u, e - 1 / 3)
            }
            return{r: r * 255, g: i * 255, b: s * 255}
        }

        function d(e, t, n) {
            e = w(e, 255), t = w(t, 255), n = w(n, 255);
            var r = u(e, t, n), i = o(e, t, n), s, a, f = r, l = r - i;
            a = r === 0 ? 0 : l / r;
            if (r == i)s = 0; else {
                switch (r) {
                    case e:
                        s = (t - n) / l + (t < n ? 6 : 0);
                        break;
                    case t:
                        s = (n - e) / l + 2;
                        break;
                    case n:
                        s = (e - t) / l + 4
                }
                s /= 6
            }
            return{h: s, s: a, v: f}
        }

        function v(e, t, n) {
            e = w(e, 360) * 6, t = w(t, 100), n = w(n, 100);
            var r = i.floor(e), s = e - r, o = n * (1 - t), u = n * (1 - s * t), a = n * (1 - (1 - s) * t), f = r % 6, l = [n, u, o, o, a, n][f], c = [a, n, n, u, o, o][f], h = [o, o, a, n, n, u][f];
            return{r: l * 255, g: c * 255, b: h * 255}
        }

        function m(e, t, n, r) {
            var i = [N(s(e).toString(16)), N(s(t).toString(16)), N(s(n).toString(16))];
            return r && i[0].charAt(0) == i[0].charAt(1) && i[1].charAt(0) == i[1].charAt(1) && i[2].charAt(0) == i[2].charAt(1) ? i[0].charAt(0) + i[1].charAt(0) + i[2].charAt(0) : i.join("")
        }

        function b(e) {
            var t = {};
            for (var n in e)e.hasOwnProperty(n) && (t[e[n]] = n);
            return t
        }

        function w(e, t) {
            x(e) && (e = "100%");
            var n = T(e);
            return e = o(t, u(0, parseFloat(e))), n && (e = parseInt(e * t, 10) / 100), i.abs(e - t) < 1e-6 ? 1 : e % t / parseFloat(t)
        }

        function E(e) {
            return o(1, u(0, e))
        }

        function S(e) {
            return parseInt(e, 16)
        }

        function x(e) {
            return typeof e == "string" && e.indexOf(".") != -1 && parseFloat(e) === 1
        }

        function T(e) {
            return typeof e == "string" && e.indexOf("%") != -1
        }

        function N(e) {
            return e.length == 1 ? "0" + e : "" + e
        }

        function C(e) {
            return e <= 1 && (e = e * 100 + "%"), e
        }

        function L(e) {
            e = e.replace(t, "").replace(n, "").toLowerCase();
            var r = !1;
            if (g[e])e = g[e], r = !0; else if (e == "transparent")return{r: 0, g: 0, b: 0, a: 0};
            var i;
            return(i = k.rgb.exec(e)) ? {r: i[1], g: i[2], b: i[3]} : (i = k.rgba.exec(e)) ? {r: i[1], g: i[2], b: i[3], a: i[4]} : (i = k.hsl.exec(e)) ? {h: i[1], s: i[2], l: i[3]} : (i = k.hsla.exec(e)) ? {h: i[1], s: i[2], l: i[3], a: i[4]} : (i = k.hsv.exec(e)) ? {h: i[1], s: i[2], v: i[3]} : (i = k.hex6.exec(e)) ? {r: S(i[1]), g: S(i[2]), b: S(i[3]), format: r ? "name" : "hex"} : (i = k.hex3.exec(e)) ? {r: S(i[1] + "" + i[1]), g: S(i[2] + "" + i[2]), b: S(i[3] + "" + i[3]), format: r ? "name" : "hex"} : !1
        }

        var t = /^[\s,#]+/, n = /\s+$/, r = 0, i = Math, s = i.round, o = i.min, u = i.max, a = i.random;
        f.fromRatio = function (e, t) {
            if (typeof e == "object") {
                var n = {};
                for (var r in e)e.hasOwnProperty(r) && (r === "a" ? n[r] = e[r] : n[r] = C(e[r]));
                e = n
            }
            return f(e, t)
        }, f.equals = function (e, t) {
            return!e || !t ? !1 : f(e).toRgbString() == f(t).toRgbString()
        }, f.random = function () {
            return f.fromRatio({r: a(), g: a(), b: a()})
        }, f.desaturate = function (e, t) {
            var n = f(e).toHsl();
            return n.s -= (t || 10) / 100, n.s = E(n.s), f(n)
        }, f.saturate = function (e, t) {
            var n = f(e).toHsl();
            return n.s += (t || 10) / 100, n.s = E(n.s), f(n)
        }, f.greyscale = function (e) {
            return f.desaturate(e, 100)
        }, f.lighten = function (e, t) {
            var n = f(e).toHsl();
            return n.l += (t || 10) / 100, n.l = E(n.l), f(n)
        }, f.darken = function (e, t) {
            var n = f(e).toHsl();
            return n.l -= (t || 10) / 100, n.l = E(n.l), f(n)
        }, f.complement = function (e) {
            var t = f(e).toHsl();
            return t.h = (t.h + 180) % 360, f(t)
        }, f.triad = function (e) {
            var t = f(e).toHsl(), n = t.h;
            return[f(e), f({h: (n + 120) % 360, s: t.s, l: t.l}), f({h: (n + 240) % 360, s: t.s, l: t.l})]
        }, f.tetrad = function (e) {
            var t = f(e).toHsl(), n = t.h;
            return[f(e), f({h: (n + 90) % 360, s: t.s, l: t.l}), f({h: (n + 180) % 360, s: t.s, l: t.l}), f({h: (n + 270) % 360, s: t.s, l: t.l})]
        }, f.splitcomplement = function (e) {
            var t = f(e).toHsl(), n = t.h;
            return[f(e), f({h: (n + 72) % 360, s: t.s, l: t.l}), f({h: (n + 216) % 360, s: t.s, l: t.l})]
        }, f.analogous = function (e, t, n) {
            t = t || 6, n = n || 30;
            var r = f(e).toHsl(), i = 360 / n, s = [f(e)];
            for (r.h = (r.h - (i * t >> 1) + 720) % 360; --t;)r.h = (r.h + i) % 360, s.push(f(r));
            return s
        }, f.monochromatic = function (e, t) {
            t = t || 6;
            var n = f(e).toHsv(), r = n.h, i = n.s, s = n.v, o = [], u = 1 / t;
            while (t--)o.push(f({h: r, s: i, v: s})), s = (s + u) % 1;
            return o
        }, f.readability = function (e, t) {
            var n = f(e).toRgb(), r = f(t).toRgb(), i = (n.r * 299 + n.g * 587 + n.b * 114) / 1e3, s = (r.r * 299 + r.g * 587 + r.b * 114) / 1e3, o = Math.max(n.r, r.r) - Math.min(n.r, r.r) + Math.max(n.g, r.g) - Math.min(n.g, r.g) + Math.max(n.b, r.b) - Math.min(n.b, r.b);
            return{brightness: Math.abs(i - s), color: o}
        }, f.readable = function (e, t) {
            var n = f.readability(e, t);
            return n.brightness > 125 && n.color > 500
        }, f.mostReadable = function (e, t) {
            var n = null, r = 0, i = !1;
            for (var s = 0; s < t.length; s++) {
                var o = f.readability(e, t[s]), u = o.brightness > 125 && o.color > 500, a = 3 * (o.brightness / 125) + o.color / 500;
                if (u && !i || u && i && a > r || !u && !i && a > r)i = u, r = a, n = f(t[s])
            }
            return n
        };
        var g = f.names = {aliceblue: "f0f8ff", antiquewhite: "faebd7", aqua: "0ff", aquamarine: "7fffd4", azure: "f0ffff", beige: "f5f5dc", bisque: "ffe4c4", black: "000", blanchedalmond: "ffebcd", blue: "00f", blueviolet: "8a2be2", brown: "a52a2a", burlywood: "deb887", burntsienna: "ea7e5d", cadetblue: "5f9ea0", chartreuse: "7fff00", chocolate: "d2691e", coral: "ff7f50", cornflowerblue: "6495ed", cornsilk: "fff8dc", crimson: "dc143c", cyan: "0ff", darkblue: "00008b", darkcyan: "008b8b", darkgoldenrod: "b8860b", darkgray: "a9a9a9", darkgreen: "006400", darkgrey: "a9a9a9", darkkhaki: "bdb76b", darkmagenta: "8b008b", darkolivegreen: "556b2f", darkorange: "ff8c00", darkorchid: "9932cc", darkred: "8b0000", darksalmon: "e9967a", darkseagreen: "8fbc8f", darkslateblue: "483d8b", darkslategray: "2f4f4f", darkslategrey: "2f4f4f", darkturquoise: "00ced1", darkviolet: "9400d3", deeppink: "ff1493", deepskyblue: "00bfff", dimgray: "696969", dimgrey: "696969", dodgerblue: "1e90ff", firebrick: "b22222", floralwhite: "fffaf0", forestgreen: "228b22", fuchsia: "f0f", gainsboro: "dcdcdc", ghostwhite: "f8f8ff", gold: "ffd700", goldenrod: "daa520", gray: "808080", green: "008000", greenyellow: "adff2f", grey: "808080", honeydew: "f0fff0", hotpink: "ff69b4", indianred: "cd5c5c", indigo: "4b0082", ivory: "fffff0", khaki: "f0e68c", lavender: "e6e6fa", lavenderblush: "fff0f5", lawngreen: "7cfc00", lemonchiffon: "fffacd", lightblue: "add8e6", lightcoral: "f08080", lightcyan: "e0ffff", lightgoldenrodyellow: "fafad2", lightgray: "d3d3d3", lightgreen: "90ee90", lightgrey: "d3d3d3", lightpink: "ffb6c1", lightsalmon: "ffa07a", lightseagreen: "20b2aa", lightskyblue: "87cefa", lightslategray: "789", lightslategrey: "789", lightsteelblue: "b0c4de", lightyellow: "ffffe0", lime: "0f0", limegreen: "32cd32", linen: "faf0e6", magenta: "f0f", maroon: "800000", mediumaquamarine: "66cdaa", mediumblue: "0000cd", mediumorchid: "ba55d3", mediumpurple: "9370db", mediumseagreen: "3cb371", mediumslateblue: "7b68ee", mediumspringgreen: "00fa9a", mediumturquoise: "48d1cc", mediumvioletred: "c71585", midnightblue: "191970", mintcream: "f5fffa", mistyrose: "ffe4e1", moccasin: "ffe4b5", navajowhite: "ffdead", navy: "000080", oldlace: "fdf5e6", olive: "808000", olivedrab: "6b8e23", orange: "ffa500", orangered: "ff4500", orchid: "da70d6", palegoldenrod: "eee8aa", palegreen: "98fb98", paleturquoise: "afeeee", palevioletred: "db7093", papayawhip: "ffefd5", peachpuff: "ffdab9", peru: "cd853f", pink: "ffc0cb", plum: "dda0dd", powderblue: "b0e0e6", purple: "800080", red: "f00", rosybrown: "bc8f8f", royalblue: "4169e1", saddlebrown: "8b4513", salmon: "fa8072", sandybrown: "f4a460", seagreen: "2e8b57", seashell: "fff5ee", sienna: "a0522d", silver: "c0c0c0", skyblue: "87ceeb", slateblue: "6a5acd", slategray: "708090", slategrey: "708090", snow: "fffafa", springgreen: "00ff7f", steelblue: "4682b4", tan: "d2b48c", teal: "008080", thistle: "d8bfd8", tomato: "ff6347", turquoise: "40e0d0", violet: "ee82ee", wheat: "f5deb3", white: "fff", whitesmoke: "f5f5f5", yellow: "ff0", yellowgreen: "9acd32"}, y = f.hexNames = b(g), k = function () {
            var e = "[-\\+]?\\d+%?", t = "[-\\+]?\\d*\\.\\d+%?", n = "(?:" + t + ")|(?:" + e + ")", r = "[\\s|\\(]+(" + n + ")[,|\\s]+(" + n + ")[,|\\s]+(" + n + ")\\s*\\)?", i = "[\\s|\\(]+(" + n + ")[,|\\s]+(" + n + ")[,|\\s]+(" + n + ")[,|\\s]+(" + n + ")\\s*\\)?";
            return{rgb: new RegExp("rgb" + r), rgba: new RegExp("rgba" + i), hsl: new RegExp("hsl" + r), hsla: new RegExp("hsla" + i), hsv: new RegExp("hsv" + r), hex3: /^([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})$/, hex6: /^([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})$/}
        }();
        e.tinycolor = f
    }(this), t(function () {
        t.fn.spectrum.load && t.fn.spectrum.processNativeColorInputs()
    })
}(window, jQuery), function () {
    var e = !1, t = /xyz/.test(function () {
        xyz
    }) ? /\b_super\b/ : /.*/;
    this.Class = function () {
    }, Class.extend = function (n) {
        function o() {
            !e && this.init && this.init.apply(this, arguments)
        }

        var r = this.prototype;
        e = !0;
        var i = new this;
        e = !1;
        for (var s in n)i[s] = typeof n[s] == "function" && typeof r[s] == "function" && t.test(n[s]) ? function (e, t) {
            return function () {
                var n = this._super;
                this._super = r[e];
                var i = t.apply(this, arguments);
                return this._super = n, i
            }
        }(s, n[s]) : n[s];
        return o.prototype = i, o.constructor = o, o.extend = arguments.callee, o
    }
}(), typeof document != "undefined" && !("classList"in document.createElement("a")) && function (e) {
    var t = "classList", n = "prototype", r = (e.HTMLElement || e.Element)[n], i = Object, s = String[n].trim || function () {
        return this.replace(/^\s+|\s+$/g, "")
    }, o = Array[n].indexOf || function (e) {
        var t = 0, n = this.length;
        for (; t < n; t++)if (t in this && this[t] === e)return t;
        return-1
    }, u = function (e, t) {
        this.name = e, this.code = DOMException[e], this.message = t
    }, a = function (e, t) {
        if (t === "")throw new u("SYNTAX_ERR", "An invalid or illegal string was specified");
        if (/\s/.test(t))throw new u("INVALID_CHARACTER_ERR", "String contains an invalid character");
        return o.call(e, t)
    }, f = function (e) {
        var t = s.call(e.className), n = t ? t.split(/\s+/) : [], r = 0, i = n.length;
        for (; r < i; r++)this.push(n[r]);
        this._updateClassName = function () {
            e.className = this.toString()
        }
    }, l = f[n] = [], c = function () {
        return new f(this)
    };
    u[n] = Error[n], l.item = function (e) {
        return this[e] || null
    }, l.contains = function (e) {
        return e += "", a(this, e) !== -1
    }, l.add = function (e) {
        e += "", a(this, e) === -1 && (this.push(e), this._updateClassName())
    }, l.remove = function (e) {
        e += "";
        var t = a(this, e);
        t !== -1 && (this.splice(t, 1), this._updateClassName())
    }, l.toggle = function (e) {
        e += "", a(this, e) === -1 ? this.add(e) : this.remove(e)
    }, l.toString = function () {
        return this.join(" ")
    };
    if (i.defineProperty) {
        var h = {get: c, enumerable: !0, configurable: !0};
        try {
            i.defineProperty(r, t, h)
        } catch (p) {
            p.number === -2146823252 && (h.enumerable = !1, i.defineProperty(r, t, h))
        }
    } else i[n].__defineGetter__ && r.__defineGetter__(t, c)
}(self);
var skriv = function () {
    var e = 1e3;
    return{actions: {}, create: function (e, t) {
        function f() {
            A = A.bind(this), N = N.bind(this), C = C.bind(this), k = k.bind(this), L = L.bind(this), O = O.bind(this), l(), c(), p(), r.classList.add("loaded"), r.classList.add("disabled"), r.addEventListener("click", A, !1)
        }

        function l() {
            var e = document.createElement("div");
            e.setAttribute("contenteditable", !0), e.style.className = "skriv-enabler", e.style.position = "absolute", e.style.display = "none", e.style.width = "0px", e.style.height = "0px", document.body.appendChild(e)
        }

        function c(e) {
            n = skriv.util.extend(n, e), h(), n.autoBind ? u = setInterval(p, 500) : clearInterval(u)
        }

        function h() {
            var e = [].slice.call(r.querySelectorAll("li"));
            e.forEach(function (e) {
                if (e.childNodes.length === 0) {
                    e.parentNode.removeChild(e);
                    var t = {}, n = Array.prototype.slice.call(e.attributes);
                    n.forEach(function (e) {
                        /^data\-/gi.test(e.name) && (t[e.name.replace(/^data\-/gi, "")] = e.value)
                    }), t.tags = typeof t.tags == "string" ? t.tags.split(",") : [], t.keys = typeof t.keys == "string" ? t.keys.split(",") : [];
                    if (typeof t.model == "string" && /\./g.test(t.model)) {
                        var i = window, s = t.model.split(".");
                        while (s.length)i = i[s.shift()];
                        t.model = i
                    }
                    var u;
                    if (t.command)u = new skriv.actions.command(M, t), u.appendTo(r), o.push(u); else if (t.model)u = new t.model(M, t), u.appendTo(r), o.push(u); else if (t.id === "divider") {
                        var a = document.createElement("div");
                        a.className = "divider", r.appendChild(a)
                    } else console && typeof console.warn == "function" && console.warn('Action of type "' + t.id + '" could not be created.')
                }
            }.bind(this))
        }

        function p(e) {
            var t = [];
            e ? t = [e] : t = Array.prototype.slice.call(document.querySelectorAll("[contenteditable]")), t.forEach(function (e, t) {
                e.addEventListener("focus", N, !1), e.addEventListener("blur", C, !1), e.addEventListener("mouseup", k, !1), e.addEventListener("keyup", L, !1)
            })
        }

        function d(e) {
            var t = [];
            e ? t = [e] : t = Array.prototype.slice.call(document.querySelectorAll("[contenteditable]")), t.forEach(function (e, t) {
                e.removeEventListener("focus", N, !1), e.removeEventListener("blur", C, !1), e.removeEventListener("mouseup", k, !1), e.removeEventListener("keyup", L, !1)
            })
        }

        function v(e) {
            e.appendChild(r)
        }

        function m() {
            r.classList.add("disabled")
        }

        function g() {
            r.classList.remove("disabled")
        }

        function y(e) {
            typeof e == "undefined" && (e = skriv.util.getSelectedElement());
            if (e) {
                var t = [], n = e;
                while (n)t.push(n.nodeName.toLowerCase()), n = n.parentNode;
                o.forEach(function (n) {
                    n.updateSelection(e, t)
                })
            } else o.forEach(function (e) {
                e.deselect()
            })
        }

        function b(e, t) {
            a.dispatch(e, t)
        }

        function w() {
            o.forEach(function (e) {
                typeof e.isOpen == "function" && e.isOpen() && e.close()
            })
        }

        function E(e) {
            i = e, s = e
        }

        function S() {
            return i
        }

        function x(e) {
            var t = null;
            return o.forEach(function (n) {
                n.id === e && (t = n)
            }), t
        }

        function T() {
            var e;
            return o.forEach(function (t) {
                typeof t.isOpen == "function" && t.isOpen() && (e = t)
            }), e
        }

        function N(e) {
            i = e.target, g(), document.addEventListener("keydown", O, !1)
        }

        function C(e) {
            y(null), document.removeEventListener("keydown", O, !1)
        }

        function k(e) {
            y()
        }

        function L(e) {
            y()
        }

        function A(e) {
            y()
        }

        function O(e) {
            o.forEach(function (t) {
                (e.metaKey || e.ctrlKey) && t.updateKeyDown(e.keyCode) && e.preventDefault()
            })
        }

        if (typeof e != "object")throw"A container element must be specified.";
        var n = skriv.util.extend({autoBind: !1}, t), r = e, i, s, o = [], u, a = new skriv.Signal, M = {configure: c, appendTo: v, notify: b, bind: p, unbind: d, closeActions: w, setEditor: E, getEditor: S, getAction: x, getOpenAction: T, notified: a};
        return f(), M
    }}
}();
skriv.util = {expressions: {IS_YOUTUBE_URL: /(?:www\.)?youtu(?:be\.com\/watch\?(?:.*?&(?:amp;)?)?v=|\.be\/)([\w\-]+)(?:&(?:amp;)?[\w\?=]*)?/gi, IS_VIMEO_URL: /(www\.)?vimeo\.com\/(\w*\/)*(([a-z]{0,2}-)?\d+)/gi, YOUTUBE_VIDEO_ID: /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/, VIMEO_VIDEO_ID: /^.*(vimeo\.com\/)((channels\/[A-z]+\/)|(groups\/[A-z]+\/videos\/))?([0-9]+)/}, getYouTubeID: function (e) {
    if (skriv.util.expressions.IS_YOUTUBE_URL.test(e)) {
        var t = e.match(skriv.util.expressions.YOUTUBE_VIDEO_ID);
        if (t && t.length > 2)return t[2]
    }
}, getVimeoID: function (e) {
    if (skriv.util.expressions.IS_VIMEO_URL.test(e)) {
        var t = e.match(skriv.util.expressions.VIMEO_VIDEO_ID);
        if (t && t.length > 4)return t[5]
    }
}, extend: function (e, t) {
    for (var n in t)e[n] = t[n];
    return e
}, wrap: function (e, t) {
    t && e && (e.parentNode.appendChild(t), t.appendChild(e))
}, wrapInner: function (e, t) {
    t && e && (t.innerHTML = e.innerText || e.textContent, e.innerHTML = "", e.appendChild(t))
}, unwrap: function (e) {
    if (e && e.childNodes.length && e.parentNode) {
        while (e.childNodes.length)e.parentNode.insertBefore(e.childNodes[0], e);
        e.parentNode.removeChild(e)
    }
}, execCommand: function (e, t, n) {
    try {
        document.execCommand(e, !1, n)
    } catch (r) {
    }
}, placeCaretAtEnd: function (e) {
    e.focus();
    if (typeof window.getSelection != "undefined" && typeof document.createRange != "undefined") {
        var t = document.createRange();
        t.selectNodeContents(e), t.collapse(!1);
        var n = window.getSelection();
        n.removeAllRanges(), n.addRange(t)
    } else if (typeof document.body.createTextRange != "undefined") {
        var r = document.body.createTextRange();
        r.moveToElementText(e), r.collapse(!1), r.select()
    }
}, selectText: function (e) {
    var t, n;
    document.body.createTextRange ? (t = document.body.createTextRange(), t.moveToElementText(e), t.select()) : window.getSelection && (n = window.getSelection(), t = document.createRange(), t.selectNodeContents(e), n.removeAllRanges(), n.addRange(t))
}, getSelectedElement: function () {
    var e = window.getSelection();
    return e && e.anchorNode ? e.anchorNode.parentNode : null
}, getSelectedHTML: function () {
    var e;
    if (document.selection && document.selection.createRange)return e = document.selection.createRange(), e.htmlText;
    if (window.getSelection) {
        var t = window.getSelection();
        if (t.rangeCount > 0) {
            e = t.getRangeAt(0);
            var n = e.cloneContents(), r = document.createElement("div");
            return r.appendChild(n), r.innerHTML
        }
        return""
    }
    return""
}, getParentOfType: function (e, t) {
    var n = null;
    while (e && e.parentNode)e.nodeName.toLowerCase() === t.toLowerCase() && (n = e), e = e.parentNode;
    return n
}}, skriv.Signal = function () {
    this.listeners = []
}, skriv.Signal.prototype.add = function (e) {
    this.listeners.push(e)
}, skriv.Signal.prototype.remove = function (e) {
    var t = this.listeners.indexOf(e);
    t >= 0 && this.listeners.splice(t, 1)
}, skriv.Signal.prototype.dispatch = function () {
    var e = Array.prototype.slice.call(arguments);
    this.listeners.forEach(function (t, n) {
        t.apply(null, e)
    })
}, skriv.actions.abstract = Class.extend({init: function (e, t) {
    this.core = e, this.config = t || {}, this.id = this.config.id, this.tags = this.config.tags || [], this.keys = this.config.keys || [], this.clicked = new skriv.Signal, this.build(), this.bind()
}, build: function () {
    this.domElement = document.createElement("div"), this.domElement.classList.add("action"), this.domElement.classList.add(this.id), this.buttonElement = document.createElement("button"), this.domElement.appendChild(this.buttonElement), this.iconElement = document.createElement("span"), this.iconElement.className = "icon " + this.id, this.buttonElement.appendChild(this.iconElement)
}, bind: function () {
    this.buttonElement.addEventListener("mousedown", this.onMouseDown.bind(this)), this.buttonElement.addEventListener("click", this.onClick.bind(this))
}, trigger: function () {
}, appendTo: function (e) {
    e.appendChild(this.domElement)
}, hasTag: function (e) {
    var t = !1, n = this.tags;
    return typeof e == "string" && (e = [e]), e.forEach(function (e) {
        n.forEach(function (n) {
            e === n && (t = !0)
        })
    }), t
}, select: function () {
    this.domElement.classList.add("selected")
}, deselect: function () {
    this.domElement.classList.remove("selected")
}, updateSelection: function (e, t) {
    this.hasTag(t) ? this.select() : this.deselect()
}, updateKeyDown: function (e) {
    for (var t = 0, n = this.keys.length; t < n; t++)if (parseInt(this.keys[t], 10) === e)return typeof this.open == "function" ? this.open() : this.trigger(), !0;
    return!1
}, onMouseDown: function (e) {
    e.preventDefault()
}, onClick: function (e) {
    this.clicked.dispatch()
}}), skriv.actions.command = skriv.actions.abstract.extend({init: function (e, t) {
    this._super(e, t), this.command = t.command
}, trigger: function () {
    skriv.util.execCommand(this.command, !1)
}, onClick: function (e) {
    this._super(e), this.trigger()
}}), skriv.actions.popout = skriv.actions.abstract.extend({init: function (e, t) {
    this._super(e, t), this.onDocumentMouseDown = this.onDocumentMouseDown.bind(this)
}, build: function () {
    this._super(), this.panelElement = document.createElement("div"), this.panelElement.classList.add("panel"), this.domElement.appendChild(this.panelElement)
}, bind: function () {
    this._super(), this.domElement.addEventListener("mousedown", this.onMouseDown.bind(this), !1), this.domElement.addEventListener("mouseover", this.onMouseOver.bind(this), !1), this.domElement.addEventListener("mouseout", this.onMouseOut.bind(this), !1)
}, open: function () {
    this.isOpen() || (this.domElement.classList.add("open"), document.addEventListener("mousedown"
        , this.onDocumentMouseDown, !1), this.layout())
}, close: function () {
    this.isOpen() && (this.domElement.classList.remove("open"), document.removeEventListener("mousedown", this.onDocumentMouseDown, !1))
}, toggle: function () {
    this.isOpen() ? this.close() : this.open()
}, isOpen: function () {
    return this.domElement.classList.contains("open")
}, layout: function () {
    var e = this.panelElement.offsetWidth, t = this.buttonElement.offsetWidth, n = this.buttonElement.offsetHeight;
    this.panelElement.style.left = (t - e) / 2 + "px", this.panelElement.style.top = n + "px"
}, onClick: function (e) {
    this._super(e), this.toggle()
}, onDocumentMouseDown: function (e) {
    var t = e.target, n = !1;
    while (t)t === this.domElement && (n = !0), t = t.parentNode;
    n || this.close()
}, onMouseDown: function (e) {
    e.preventDefault()
}, onMouseOver: function (e) {
    this.config.openOnHover && this.open()
}, onMouseOut: function (e) {
    this.config.openOnHover && this.close()
}}), skriv.actions.dropdown = skriv.actions.popout.extend({init: function (e, t) {
    this.options = this.options || [], this._super(e, t), this.options && this.options.length > 0 && this.setValue(this.options[0].value)
}, build: function () {
    this._super(), this.domElement.style.width = "100px", this.panelElement.style.width = "140px", this.dropdownElement = document.createElement("ul"), this.panelElement.appendChild(this.dropdownElement), this.panelElement.classList.add("dropdown"), this.options.forEach(this.addOption.bind(this))
}, addOption: function (e) {
    var t = document.createElement("li");
    t.setAttribute("data-value", e.value), t.textContent = e.name, this.bindOption(t, e), this.dropdownElement.appendChild(t)
}, bindOption: function (e, t) {
    e.addEventListener("click", function (e) {
        this.setValue(e), this.close()
    }.bind(this, t.value), !1)
}, cancel: function () {
}, setValue: function (e, t) {
    this.hasValue(e) && (this.selectedElement = this.dropdownElement.querySelector('[data-value="' + e + '"]'), this.config.leaveHeader || (this.buttonElement.textContent = this.selectedElement.textContent), t || this.trigger())
}, getValue: function () {
    return this.selectedElement ? this.selectedElement.getAttribute("data-value") : null
}, hasValue: function (e) {
    return!!this.dropdownElement.querySelector('[data-value="' + e + '"]')
}}), skriv.actions.align = skriv.actions.dropdown.extend({init: function (e, t) {
    t.openOnHover = !0, this.options = [
        {name: "Left", value: "justifyleft"},
        {name: "Center", value: "justifycenter"},
        {name: "Right", value: "justifyright"},
        {name: "Justify", value: "justifyfull"}
    ], this._super(e, t)
}, build: function () {
    this._super(), this.domElement.style.width = "50px", this.panelElement.style.width = "152px", this.panelElement.classList.add("single-row")
}, addOption: function (e) {
    var t = document.createElement("li");
    t.setAttribute("data-value", e.value), this.bindOption(t, e);
    var n = document.createElement("div");
    n.className = "icon " + e.value, t.appendChild(n), this.dropdownElement.appendChild(t)
}, trigger: function () {
    var e = this.getValue();
    skriv.util.execCommand(e, !1)
}, setValue: function (e, t) {
    this.hasValue(e) && (this.selectedElement = this.dropdownElement.querySelector('[data-value="' + e + '"]'), t || this.trigger())
}}), skriv.actions.link = skriv.actions.popout.extend({init: function (e, t) {
    this._super(e, t)
}, build: function () {
    this._super(), this.domElement.classList.add(this.id), this.linkInput = document.createElement("input"), this.linkInput.setAttribute("type", "text"), this.linkInput.setAttribute("placeholder", "http://"), this.panelElement.appendChild(this.linkInput), this.confirmButton = document.createElement("button"), this.confirmButton.classList.add("confirm-button"), this.confirmButton.innerHTML = "OK", this.panelElement.appendChild(this.confirmButton), this.cancelButton = document.createElement("button"), this.cancelButton.classList.add("cancel-button"), this.cancelButton.innerHTML = "Cancel", this.panelElement.appendChild(this.cancelButton), this.panelElement.style.width = "340px"
}, bind: function () {
    this._super(), this.confirmButton.addEventListener("click", this.onConfirmClicked.bind(this), !1), this.cancelButton.addEventListener("click", this.onCancelClicked.bind(this), !1), this.linkInput.addEventListener("keydown", this.onKeyDown.bind(this), !1)
}, trigger: function () {
    this.linkElement && (this.linkElement.setAttribute("href", this.linkInput.value), this.linkElement = null)
}, open: function () {
    var e = skriv.util.getParentOfType(skriv.util.getSelectedElement(), "a");
    e || skriv.util.getSelectedHTML().length ? (this._super(), this.linkInput.value = "", e ? (this.linkElement = e, this.linkInput.value = this.linkElement.getAttribute("href")) : (skriv.util.execCommand("createLink", !1, skriv.actions.link.PLACEHOLDER), this.linkElement = document.querySelector('a[href="' + skriv.actions.link.PLACEHOLDER + '"]')), this.linkInput.focus(), this.linkInput.select()) : this.core.notify("Please select some text first")
}, close: function () {
    this._super(), this.linkElement && this.linkElement.getAttribute("href") === skriv.actions.link.PLACEHOLDER && skriv.util.unwrap(this.linkElement)
}, onClick: function (e) {
    this._super(e)
}, onConfirmClicked: function (e) {
    this.linkInput.value === "" ? this.close() : (this.trigger(), this.close())
}, onCancelClicked: function (e) {
    this.close()
}, onKeyDown: function (e) {
    e.keyCode === 13 && this.onConfirmClicked(e)
}}), skriv.actions.link.PLACEHOLDER = "javascript:link", skriv.actions.unlink = skriv.actions.abstract.extend({init: function (e, t) {
    this._super(e, t)
}, trigger: function () {
    var e = skriv.util.getParentOfType(skriv.util.getSelectedElement(), "a");
    e && skriv.util.getSelectedHTML().length === 0 ? skriv.util.unwrap(e) : skriv.util.execCommand("unlink", !1)
}, onClick: function (e) {
    this._super(e), this.trigger()
}}), skriv.actions.image = skriv.actions.popout.extend({init: function (e, t) {
    this._super(e, t), this.changeTab("upload")
}, build: function () {
    this._super(), this.domElement.classList.add(this.id), this.panelElement.classList.add("tabbed"), this.tabBar = document.createElement("div"), this.tabBar.className = "tab-bar", this.panelElement.appendChild(this.tabBar), this.uploadTab = document.createElement("button"), this.uploadTab.setAttribute("data-value", "upload"), this.uploadTab.textContent = "Upload", this.tabBar.appendChild(this.uploadTab), this.linkTab = document.createElement("button"), this.linkTab.setAttribute("data-value", "link"), this.linkTab.textContent = "URL", this.tabBar.appendChild(this.linkTab), this.linkSection = document.createElement("div"), this.linkSection.className = "tab-contents link-section", this.panelElement.appendChild(this.linkSection), this.linkInput = document.createElement("input"), this.linkInput.setAttribute("type", "text"), this.linkInput.setAttribute("placeholder", "Image, YouTube or Vimeo URL..."), this.linkSection.appendChild(this.linkInput), this.confirmButton = document.createElement("button"), this.confirmButton.className = "confirm-button", this.confirmButton.innerHTML = "OK", this.linkSection.appendChild(this.confirmButton), this.cancelButton = document.createElement("button"), this.cancelButton.className = "cancel-button", this.cancelButton.innerHTML = "Cancel", this.linkSection.appendChild(this.cancelButton), this.clearElement = document.createElement("div"), this.clearElement.classList.add("clear"), this.linkSection.appendChild(this.clearElement), this.uploadSection = document.createElement("div"), this.uploadSection.className = "tab-contents upload-section", this.panelElement.appendChild(this.uploadSection), this.formElement = document.createElement("div"), this.formElement.className = "file-form", this.uploadSection.appendChild(this.formElement), this.fileInput = document.createElement("input"), this.fileInput.setAttribute("type", "file"), this.formElement.appendChild(this.fileInput), this.browseWrapper = document.createElement("div"), this.browseWrapper.className = "browse", this.formElement.appendChild(this.browseWrapper), this.browseOutput = document.createElement("input"), this.browseOutput.setAttribute("type", "text"), this.browseOutput.setAttribute("readonly", "readonly"), this.browseOutput.setAttribute("disabled", "disabled"), this.browseOutput.setAttribute("placeholder", "Select image file..."), this.browseOutput.className = "browse-output", this.browseWrapper.appendChild(this.browseOutput), this.browseButton = document.createElement("button"), this.browseButton.className = "browse-button confirm-button", this.browseButton.textContent = "Browse", this.browseWrapper.appendChild(this.browseButton), this.browseClear = document.createElement("div"), this.browseClear.className = "clear", this.formElement.appendChild(this.browseClear), this.progressBar = document.createElement("div"), this.progressBar.className = "progress", this.formElement.appendChild(this.progressBar), this.progressBarInner = document.createElement("div"), this.progressBarInner.className = "inner", this.progressBar.appendChild(this.progressBarInner), this.panelElement.style.width = "340px"
}, bind: function () {
    this._super(), this.browseButton.addEventListener("click", this.onBrowseClicked.bind(this), !1), this.confirmButton.addEventListener("click", this.onConfirmClicked.bind(this), !1), this.cancelButton.addEventListener("click", this.onCancelClicked.bind(this), !1), this.linkInput.addEventListener("keydown", this.onKeyDown.bind(this), !1), this.linkTab.addEventListener("click", this.onTabClicked.bind(this), !1), this.uploadTab.addEventListener("click", this.onTabClicked.bind(this), !1), this.fileInput.addEventListener("change", this.onFileInputChange.bind(this), !1)
}, trigger: function (e) {
    if (this.imageElement) {
        if (this.currentTab === "link") {
            var e = this.linkInput.value, t = skriv.util.getYouTubeID(e), n = skriv.util.getVimeoID(e), r = ['<iframe width="720" height="405" src="', '" frameborder="0" webkitAllowFullScreen mozallowfullscreen allowFullScreen></iframe>'];
            t ? this.imageElement.outerHTML = r.join("https://youtube.com/embed/" + t) : n ? this.imageElement.outerHTML = r.join("http://player.vimeo.com/video/" + n) : (this.imageElement.setAttribute("src", this.linkInput.value), this.imageElement.style.display = "", this.imageElement.removeAttribute("width"), this.imageElement.removeAttribute("height"))
        } else e && (this.imageElement.setAttribute("src", e), this.imageElement.style.display = "", this.imageElement.removeAttribute("width"), this.imageElement.removeAttribute("height"));
        this.imageElement = null
    }
}, changeTab: function (e) {
    this.currentTab = e, e === "link" ? (this.uploadTab.classList.remove("selected"), this.uploadSection.classList.remove("visible"), this.linkTab.classList.add("selected"), this.linkSection.classList.add("visible"), this.linkInput.focus()) : (this.linkTab.classList.remove("selected"), this.linkSection.classList.remove("visible"), this.uploadTab.classList.add("selected"), this.uploadSection.classList.add("visible"))
}, open: function () {
    this._super(), this.linkInput.value = "", this.fileInput.value = "", this.browseOutput.value = "", this.panelElement.classList.remove("busy"), skriv.util.execCommand("insertImage", !1, skriv.actions.image.PLACEHOLDER), this.imageElement = document.querySelector('img[src="' + skriv.actions.image.PLACEHOLDER + '"]'), !this.imageElement && this.core.getEditor() && (this.imageElement = document.createElement("img"), this.imageElement.setAttribute("src", skriv.actions.image.PLACEHOLDER), this.core.getEditor().appendChild(this.imageElement)), this.imageElement ? this.imageElement.style.display = "none" : (this.core.notify("Please focus the editor first"), this.close())
}, close: function () {
    this._super(), this.imageElement && this.imageElement.parentNode && this.imageElement.getAttribute("src") === skriv.actions.image.PLACEHOLDER && (this.imageElement.parentNode.removeChild(this.imageElement), this.imageElement = null)
}, uploadFile: function () {
    var e = this.fileInput.files[0];
    if (!e || !e.type.match(/image.*/)) {
        this.core.notify("Only image files, please");
        return
    }
    if (typeof e.size == "number" && e.size / 1024 > this.config.maxsize) {
        this.core.notify("No more than 5mb please", "negative");
        return
    }
    this.panelElement.classList.add("busy"), this.setProgress(0), this.browseOutput.value = e.name;
    var t = new FormData;
    t.append("file", e);
    var n = document.querySelector('meta[name="csrf-token"]');
    n && t.append("authenticity_token", n.getAttribute("content"));
    var r = new XMLHttpRequest;
    r.open("POST", this.config.endpoint), r.onload = function () {
        try {
            var e = JSON.parse(r.responseText)
        } catch (t) {
            return this.onFileUploadError()
        }
        this.onFileUploadSuccess(e)
    }.bind(this), r.onerror = this.onFileUploadError.bind(this), r.upload.onprogress = function (e) {
        this.setProgress(e.loaded / e.total * 100)
    }.bind(this), r.send(t)
}, setProgress: function (e) {
    this.progressBarInner.style.width = e + "%"
}, onFileUploadError: function (e) {
    this.close(), this.core.notify(e || "Failed to upload image", "negative")
}, onFileUploadSuccess: function (e) {
    this.trigger(e.url), this.close()
}, onFileInputChange: function (e) {
    this.uploadFile()
}, onBrowseClicked: function (e) {
    this.fileInput.click()
}, onTabClicked: function (e) {
    var t = e.target.getAttribute("data-value");
    t && this.changeTab(t)
}, onConfirmClicked: function (e) {
    this.linkInput.value === "" ? this.close() : (this.trigger(), this.close())
}, onCancelClicked: function (e) {
    this.close()
}, onClick: function (e) {
    this._super(e)
}, onKeyDown: function (e) {
    e.keyCode === 13 && this.onConfirmClicked(e)
}, onMouseDown: function (e) {
}}), skriv.actions.image.PLACEHOLDER = "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7", skriv.actions.foregroundColor = skriv.actions.abstract.extend({init: function (e, t) {
    this._super(e, t), this.colorpickerOpen = !1
}, build: function () {
    this._super(), this.domElement.classList.add(this.id), $(this.buttonElement).spectrum({color: "#ECC", showInput: !0, className: "skriv-colorpicker", showAlpha: !0, showInitial: !0, showPalette: !0, showSelectionPalette: !0, maxPaletteSize: 10, preferredFormat: "hex", localStorageKey: "skriv-colors", show: function () {
        this.colorpickerOpen = !0
    }.bind(this), hide: function () {
        this.colorpickerOpen = !1
    }.bind(this), move: function (e) {
        this.currentColor = e.toRgbString()
    }.bind(this), change: function (e) {
        this.currentColor = e.toRgbString(), this.trigger()
    }.bind(this), palette: [
        ["rgb(0, 0, 0)", "rgb(67, 67, 67)", "rgb(102, 102, 102)", "rgb(204, 204, 204)", "rgb(217, 217, 217)", "rgb(255, 255, 255)", "transparent"],
        ["rgb(152, 0, 0)", "rgb(255, 0, 0)", "rgb(255, 153, 0)", "rgb(255, 255, 0)", "rgb(0, 255, 0)", "rgb(0, 255, 255)", "rgb(74, 134, 232)", "rgb(0, 0, 255)", "rgb(153, 0, 255)"],
        ["rgb(230, 184, 175)", "rgb(244, 204, 204)", "rgb(252, 229, 205)", "rgb(255, 242, 204)", "rgb(217, 234, 211)", "rgb(208, 224, 227)", "rgb(201, 218, 248)", "rgb(207, 226, 243)", "rgb(217, 210, 233)", "rgb(234, 209, 220)", "rgb(221, 126, 107)", "rgb(234, 153, 153)", "rgb(249, 203, 156)", "rgb(255, 229, 153)", "rgb(182, 215, 168)", "rgb(162, 196, 201)", "rgb(164, 194, 244)", "rgb(159, 197, 232)", "rgb(180, 167, 214)", "rgb(213, 166, 189)", "rgb(204, 65, 37)", "rgb(224, 102, 102)", "rgb(246, 178, 107)", "rgb(255, 217, 102)", "rgb(147, 196, 125)", "rgb(118, 165, 175)", "rgb(109, 158, 235)", "rgb(111, 168, 220)", "rgb(142, 124, 195)", "rgb(194, 123, 160)", "rgb(166, 28, 0)", "rgb(204, 0, 0)", "rgb(230, 145, 56)", "rgb(241, 194, 50)", "rgb(106, 168, 79)", "rgb(69, 129, 142)", "rgb(60, 120, 216)", "rgb(61, 133, 198)", "rgb(103, 78, 167)", "rgb(166, 77, 121)", "rgb(91, 15, 0)", "rgb(102, 0, 0)", "rgb(120, 63, 4)", "rgb(127, 96, 0)", "rgb(39, 78, 19)", "rgb(12, 52, 61)", "rgb(28, 69, 135)", "rgb(7, 55, 99)", "rgb(32, 18, 77)", "rgb(76, 17, 48)"]
    ]})
}, bind: function () {
    this._super()
}, trigger: function () {
    skriv.util.execCommand("forecolor", !1, this.currentColor)
}, open: function () {
    this.colorpickerOpen = !0, $(this.buttonElement).spectrum("show")
}, close: function () {
    this.colorpickerOpen = !1, $(this.buttonElement).spectrum("hide")
}, isOpen: function () {
    return this.colorpickerOpen
}, onClick: function (e) {
    this._super(e)
}}), skriv.actions.backgroundColor = skriv.actions.foregroundColor.extend({init: function (e, t) {
    this._super(e, t)
}, trigger: function () {
    skriv.util.execCommand("backcolor", !1, this.currentColor)
}, open: function () {
    this._super()
}}), skriv.actions.fontFamily = skriv.actions.dropdown.extend({init: function (e, t) {
    t.openOnHover = !0, this.options = [
        {name: "Arial", value: "arial"},
        {name: "Courier New", value: "courier new"},
        {name: "Georgia", value: "georgia"},
        {name: "Helvetica", value: "helvetica"},
        {name: "Impact", value: "impact"},
        {name: "Lato", value: "Lato"},
        {name: "League Gothic", value: "League Gothic"},
        {name: "Times", value: "times new roman"},
        {name: "Monospace", value: "monospace"},
        {name: "Trebuchet", value: "trebuchet ms"},
        {name: "Verdana", value: "verdana"}
    ], this._super(e, t), [].slice.call(this.dropdownElement.querySelectorAll("li")).forEach(function (e) {
        e.style.fontFamily = e.getAttribute("data-value")
    })
}, trigger: function () {
    skriv.util.execCommand("fontName", !1, this.getValue())
}, updateSelection: function (e, t) {
    e && typeof window.getComputedStyle == "function" && this.setValue(window.getComputedStyle(e).getPropertyValue("font-family").replace(/(,.*)|\'|\"/g, ""), !0)
}, setValue: function (e, t) {
    this._super(e, t), this.selectedElement && (this.buttonElement.style.fontFamily = this.getValue())
}}), skriv.actions.fontFormat = skriv.actions.dropdown.extend({init: function (e, t) {
    t.openOnHover = !0, this.options = [
        {name: "Paragraph", value: "p"},
        {name: "Pre", value: "pre"},
        {name: "Code", value: "code"},
        {name: "Quote", value: "blockquote"},
        {name: "Heading 1", value: "h1"},
        {name: "Heading 2", value: "h2"},
        {name: "Heading 3", value: "h3"}
    ], this._super(e, t)
}, trigger: function () {
    var e = this.getValue();
    if (e === "code") {
        var t = skriv.util.getParentOfType(skriv.util.getSelectedElement(), "pre"), n = skriv.util.getParentOfType(skriv.util.getSelectedElement(), "code");
        if (n && t)skriv.util.unwrap(n), skriv.util.unwrap(t); else {
            var r = document.getSelection();
            document.execCommand("insertHTML", !1, "<pre><code>" + r + " </code></pre>");
            if (r.anchorNode && typeof r.anchorNode.querySelector == "function") {
                var i = r.anchorNode.querySelector("pre code");
                i && i.focus()
            }
        }
    } else skriv.util.execCommand("formatBlock", !1, this.getValue())
}, updateSelection: function (e, t) {
    if (e) {
        var n = e;
        while (n)this.hasValue(n.nodeName.toLowerCase()) ? (this.setValue(n.nodeName.toLowerCase(), !0), n = null) : n = n.parentNode
    }
}}), skriv.actions.fontSize = skriv.actions.dropdown.extend({init: function (e, t) {
    t.openOnHover = !0, t.leaveHeader = !0, this.options = [
        {name: "12px", value: "1"},
        {name: "14px", value: "2"},
        {name: "16px", value: "3"},
        {name: "18px", value: "4"},
        {name: "24px", value: "5"},
        {name: "32px", value: "6"},
        {name: "64px", value: "7"}
    ], this._super(e, t)
}, build: function () {
    this._super(), this.domElement.style.width = "60px", this.panelElement.style.width = "80px", this.buttonElement.textContent = "Size"
}, trigger: function () {
    var e = this.getValue();
    skriv.util.execCommand("fontSize", !1, this.getValue()), setTimeout(function () {
        var e = this.core.getEditor();
        e && this.options.forEach(function (t) {
            var n = e.querySelectorAll('font[size="' + t.value + '"]');
            for (var r = 0, i = n.length; r < i; r++)n[r].removeAttribute("size"), n[r].style.fontSize = t.name
        })
    }.bind(this), 1)
}}), function (e, t) {
    function n(t) {
        return e.less[t.split("/")[1]]
    }

    function r() {
        m.env === "development" ? (m.optimization = 0, m.watchTimer = setInterval(function () {
            m.watchMode && s(function (e, t, n, r, i) {
                t && l(t.toCSS(), r, i.lastModified)
            })
        }, m.poll)) : m.optimization = 3
    }

    function i() {
        var e = document.getElementsByTagName("style");
        for (var t = 0; t < e.length; t++)e[t].type.match(N) && (new m.Parser({filename: document.location.href.replace(/#.*$/, ""), dumpLineNumbers: m.dumpLineNumbers})).parse(e[t].innerHTML || "", function (n, r) {
            var i = r.toCSS(), s = e[t];
            s.type = "text/css", s.styleSheet ? s.styleSheet.cssText = i : s.innerHTML = i
        })
    }

    function s(e, t) {
        for (var n = 0; n < m.sheets.length; n++)a(m.sheets[n], e, t, m.sheets.length - (n + 1))
    }

    function o(e, t) {
        var n = u(e), r = u(t), i, s, o, a, f = "";
        if (n.hostPart !== r.hostPart)return"";
        s = Math.max(r.directories.length, n.directories.length);
        for (i = 0; i < s; i++)if (r.directories[i] !== n.directories[i])break;
        a = r.directories.slice(i), o = n.directories.slice(i);
        for (i = 0; i < a.length - 1; i++)f += "../";
        for (i = 0; i < o.length - 1; i++)f += o[i] + "/";
        return f
    }

    function u(e, t) {
        var n = /^((?:[a-z-]+:)?\/\/(?:[^\/\?#]*\/)|([\/\\]))?((?:[^\/\\\?#]*[\/\\])*)([^\/\\\?#]*)([#\?].*)?$/, r = e.match(n), i = {}, s = [], o, u;
        if (!r)throw new Error("Could not parse sheet href - '" + e + "'");
        if (!r[1] || r[2]) {
            u = t.match(n);
            if (!u)throw new Error("Could not parse page url - '" + t + "'");
            r[1] = u[1], r[2] || (r[3] = u[3] + r[3])
        }
        if (r[3]) {
            s = r[3].replace("\\", "/").split("/");
            for (o = 0; o < s.length; o++)s[o] === ".." && o > 0 && (s.splice(o - 1, 2), o -= 2)
        }
        return i.hostPart = r[1], i.directories = s, i.path = r[1] + s.join("/"), i.fileUrl = i.path + (r[4] || ""), i.url = i.fileUrl + (r[5] || ""), i
    }

    function a(t, n, r, i) {
        var s = t.contents || {}, a = t.files || {}, h = u(t.href, e.location.href), d = h.url, g = S && S.getItem(d), y = S && S.getItem(d + ":timestamp"), b = {css: g, timestamp: y}, w;
        m.relativeUrls ? m.rootpath ? t.entryPath ? w = u(m.rootpath + o(h.path, t.entryPath)).path : w = m.rootpath : w = h.path : m.rootpath ? w = m.rootpath : t.entryPath ? w = t.entryPath : w = h.path, c(d, t.type, function (e, o) {
            k += e.replace(/@import .+?;/ig, "");
            if (!r && b && o && (new Date(o)).valueOf() === (new Date(b.timestamp)).valueOf())l(b.css, t), n(null, null, e, t, {local: !0, remaining: i}, d); else try {
                s[d] = e, (new m.Parser({optimization: m.optimization, paths: [h.path], entryPath: t.entryPath || h.path, mime: t.type, filename: d, rootpath: w, relativeUrls: t.relativeUrls, contents: s, files: a, dumpLineNumbers: m.dumpLineNumbers})).parse(e, function (r, s) {
                    if (r)return v(r, d);
                    try {
                        n(r, s, e, t, {local: !1, lastModified: o, remaining: i}, d), p(document.getElementById("less-error-message:" + f(d)))
                    } catch (r) {
                        v(r, d)
                    }
                })
            } catch (u) {
                v(u, d)
            }
        }, function (e, t) {
            throw new Error("Couldn't load " + t + " (" + e + ")")
        })
    }

    function f(e) {
        return e.replace(/^[a-z]+:\/\/?[^\/]+/, "").replace(/^\//, "").replace(/\.[a-zA-Z]+$/, "").replace(/[^\.\w-]+/g, "-").replace(/\./g, ":")
    }

    function l(e, t, n) {
        var r, i = t.href || "", s = "less:" + (t.title || f(i));
        if ((r = document.getElementById(s)) === null) {
            r = document.createElement("style"), r.type = "text/css", t.media && (r.media = t.media), r.id = s;
            var o = t && t.nextSibling || null;
            (o || document.getElementsByTagName("head")[0]).parentNode.insertBefore(r, o)
        }
        if (r.styleSheet)try {
            r.styleSheet.cssText = e
        } catch (u) {
            throw new Error("Couldn't reassign styleSheet.cssText.")
        } else(function (e) {
            r.childNodes.length > 0 ? r.firstChild.nodeValue !== e.nodeValue && r.replaceChild(e, r.firstChild) : r.appendChild(e)
        })(document.createTextNode(e));
        if (n && S) {
            d("saving " + i + " to cache.");
            try {
                S.setItem(i, e), S.setItem(i + ":timestamp", n)
            } catch (u) {
                d("failed to save")
            }
        }
    }

    function c(e, t, n, r) {
        function i(t, n, r) {
            t.status >= 200 && t.status < 300 ? n(t.responseText, t.getResponseHeader("Last-Modified")) : typeof r == "function" && r(t.status, e)
        }

        var s = h(), o = b ? m.fileAsync : m.async;
        typeof s.overrideMimeType == "function" && s.overrideMimeType("text/css"), s.open("GET", e, o), s.setRequestHeader("Accept", t || "text/x-less, text/css; q=0.9, */*; q=0.5"), s.send(null), b && !m.fileAsync ? s.status === 0 || s.status >= 200 && s.status < 300 ? n(s.responseText) : r(s.status, e) : o ? s.onreadystatechange = function () {
            s.readyState == 4 && i(s, n, r)
        } : i(s, n, r)
    }

    function h() {
        if (e.XMLHttpRequest)return new XMLHttpRequest;
        try {
            return new ActiveXObject("MSXML2.XMLHTTP.3.0")
        } catch (t) {
            return d("browser doesn't support AJAX."), null
        }
    }

    function p(e) {
        return e && e.parentNode.removeChild(e)
    }

    function d(e) {
        m.env == "development" && typeof console != "undefined" && console.log("less: " + e)
    }

    function v(e, t) {
        var n = "less-error-message:" + f(t), r = '<li><label>{line}</label><pre class="{class}">{content}</pre></li>', i = document.createElement("div"), s, o, u = [], a = e.filename || t, c = a.match(/([^\/]+(\?.*)?)$/)[1];
        i.id = n, i.className = "less-error-message", o = "<h3>" + (e.message || "There is an error in your .less file") + "</h3>" + '<p>in <a href="' + a + '">' + c + "</a> ";
        var h = function (e, t, n) {
            e.extract[t] && u.push(r.replace(/\{line\}/, parseInt(e.line) + (t - 1)).replace(/\{class\}/, n).replace(/\{content\}/, e.extract[t]))
        };
        e.stack ? o += "<br/>" + e.stack.split("\n").slice(1).join("<br/>") : e.extract && (h(e, 0, ""), h(e, 1, "line"), h(e, 2, ""), o += "on line " + e.line + ", column " + (e.column + 1) + ":</p>" + "<ul>" + u.join("") + "</ul>"), i.innerHTML = o, l([".less-error-message ul, .less-error-message li {", "list-style-type: none;", "margin-right: 15px;", "padding: 4px 0;", "margin: 0;", "}", ".less-error-message label {", "font-size: 12px;", "margin-right: 15px;", "padding: 4px 0;", "color: #cc7777;", "}", ".less-error-message pre {", "color: #dd6666;", "padding: 4px 0;", "margin: 0;", "display: inline-block;", "}", ".less-error-message pre.line {", "color: #ff0000;", "}", ".less-error-message h3 {", "font-size: 20px;", "font-weight: bold;", "padding: 15px 0 5px 0;", "margin: 0;", "}", ".less-error-message a {", "color: #10a", "}", ".less-error-message .error {", "color: red;", "font-weight: bold;", "padding-bottom: 2px;", "border-bottom: 1px dashed red;", "}"].join("\n"), {title: "error-message"}), i.style.cssText = ["font-family: Arial, sans-serif", "border: 1px solid #e00", "background-color: #eee", "border-radius: 5px", "-webkit-border-radius: 5px", "-moz-border-radius: 5px", "color: #e00", "padding: 15px", "margin-bottom: 15px"].join(";"), m.env == "development" && (s = setInterval(function () {
            document.body && (document.getElementById(n) ? document.body.replaceChild(i, document.getElementById(n)) : document.body.insertBefore(i, document.body.firstChild), clearInterval(s))
        }, 10))
    }

    Array.isArray || (Array.isArray = function (e) {
        return Object.prototype.toString.call(e) === "[object Array]" || e instanceof Array
    }), Array.prototype.forEach || (Array.prototype.forEach = function (e, t) {
        var n = this.length >>> 0;
        for (var r = 0; r < n; r++)r in this && e.call(t, this[r], r, this)
    }), Array.prototype.map || (Array.prototype.map = function (e) {
        var t = this.length >>> 0, n = new Array(t), r = arguments[1];
        for (var i = 0; i < t; i++)i in this && (n[i] = e.call(r, this[i], i, this));
        return n
    }), Array.prototype.filter || (Array.prototype.filter = function (e) {
        var t = [], n = arguments[1];
        for (var r = 0; r < this.length; r++)e.call(n, this[r]) && t.push(this[r]);
        return t
    }), Array.prototype.reduce || (Array.prototype.reduce = function (e) {
        var t = this.length >>> 0, n = 0;
        if (t === 0 && arguments.length === 1)throw new TypeError;
        if (arguments.length >= 2)var r = arguments[1]; else do {
            if (n in this) {
                r = this[n++];
                break
            }
            if (++n >= t)throw new TypeError
        } while (!0);
        for (; n < t; n++)n in this && (r = e.call(null, r, this[n], n, this));
        return r
    }), Array.prototype.indexOf || (Array.prototype.indexOf = function (e) {
        var t = this.length, n = arguments[1] || 0;
        if (!t)return-1;
        if (n >= t)return-1;
        n < 0 && (n += t);
        for (; n < t; n++) {
            if (!Object.prototype.hasOwnProperty.call(this, n))continue;
            if (e === this[n])return n
        }
        return-1
    }), Object.keys || (Object.keys = function (e) {
        var t = [];
        for (var n in e)Object.prototype.hasOwnProperty.call(e, n) && t.push(n);
        return t
    }), String.prototype.trim || (String.prototype.trim = function () {
        return String(this).replace(/^\s\s*/, "").replace(/\s\s*$/, "")
    });
    var m, g, y;
    typeof environment == "object" && {}.toString.call(environment) === "[object Environment]" ? (typeof e == "undefined" ? m = {} : m = e.less = {}, g = m.tree = {}, m.mode = "rhino") : typeof e == "undefined" ? (m = exports, g = n("./tree"), m.mode = "node") : (typeof e.less == "undefined" && (e.less = {}), m = e.less, g = e.less.tree = {}, m.mode = "browser"), m.Parser = function (e) {
        function t() {
            E = T[w], S = b, N = b
        }

        function r() {
            T[w] = E, b = S, N = b
        }

        function i() {
            b > N && (T[w] = T[w].slice(b - N), N = b)
        }

        function s(e) {
            var t = e.charCodeAt(0);
            return t === 32 || t === 10 || t === 9
        }

        function o(e) {
            var t, n, r, s, o;
            if (e instanceof Function)return e.call(C.parsers);
            if (typeof e == "string")t = y.charAt(b) === e ? e : null, r = 1, i(); else {
                i();
                if (!(t = e.exec(T[w])))return null;
                r = t[0].length
            }
            if (t)return u(r), typeof t == "string" ? t : t.length === 1 ? t[0] : t
        }

        function u(e) {
            var t = b, n = w, r = b + T[w].length, i = b += e;
            while (b < r) {
                if (!s(y.charAt(b)))break;
                b++
            }
            return T[w] = T[w].slice(e + (b - i)), N = b, T[w].length === 0 && w < T.length - 1 && w++, t !== b || n !== w
        }

        function a(e, t) {
            var n = o(e);
            if (!!n)return n;
            f(t || (typeof e == "string" ? "expected '" + e + "' got '" + y.charAt(b) + "'" : "unexpected token"))
        }

        function f(e, t) {
            var n = new Error(e);
            throw n.index = b, n.type = t || "Syntax", n
        }

        function l(e) {
            return typeof e == "string" ? y.charAt(b) === e : e.test(T[w]) ? !0 : !1
        }

        function c(e, t) {
            return e.filename && t.filename && e.filename !== t.filename ? C.imports.contents[e.filename] : y
        }

        function h(e, t) {
            for (var n = e, r = -1; n >= 0 && t.charAt(n) !== "\n"; n--)r++;
            return{line: typeof e == "number" ? (t.slice(0, e).match(/\n/g) || "").length : null, column: r}
        }

        function p(e) {
            return m.mode === "browser" || m.mode === "rhino" ? e.filename : n("path").resolve(e.filename)
        }

        function d(e, t, n) {
            return{lineNumber: h(e, t).line + 1, fileName: p(n)}
        }

        function v(e, t) {
            var n = c(e, t), r = h(e.index, n), i = r.line, s = r.column, o = n.split("\n");
            this.type = e.type || "Syntax", this.message = e.message, this.filename = e.filename || t.filename, this.index = e.index, this.line = typeof i == "number" ? i + 1 : null, this.callLine = e.call && h(e.call, n).line + 1, this.callExtract = o[h(e.call, n).line], this.stack = e.stack, this.column = s, this.extract = [o[i - 1], o[i], o[i + 1]]
        }

        var y, b, w, E, S, x, T, N, C, k = this, e = e || {};
        e.contents || (e.contents = {}), e.rootpath = e.rootpath || "", e.files || (e.files = {});
        var L = function () {
        }, A = this.imports = {paths: e.paths || [], queue: [], files: e.files, contents: e.contents, mime: e.mime, error: null, push: function (t, n) {
            var r = this;
            this.queue.push(t), m.Parser.importer(t, this.paths, function (e, i, s) {
                r.queue.splice(r.queue.indexOf(t), 1);
                var o = s in r.files;
                r.files[s] = i, e && !r.error && (r.error = e), n(e, i, o), r.queue.length === 0 && L(r.error)
            }, e)
        }};
        return this.env = e = e || {}, this.optimization = "optimization"in this.env ? this.env.optimization : 1, this.env.filename = this.env.filename || null, C = {imports: A, parse: function (t, r) {
            var i, s, u, a, f, l, c = [], h, p = null;
            b = w = N = x = 0, y = t.replace(/\r\n/g, "\n"), y = y.replace(/^\uFEFF/, ""), T = function (t) {
                var n = 0, r = /(?:@\{[\w-]+\}|[^"'`\{\}\/\(\)\\])+/g, i = /\/\*(?:[^*]|\*+[^\/*])*\*+\/|\/\/.*/g, s = /"((?:[^"\\\r\n]|\\.)*)"|'((?:[^'\\\r\n]|\\.)*)'|`((?:[^`]|\\.)*)`/g, o = 0, u, a = t[0], f;
                for (var l = 0, c, h; l < y.length;) {
                    r.lastIndex = l, (u = r.exec(y)) && u.index === l && (l += u[0].length, a.push(u[0])), c = y.charAt(l), i.lastIndex = s.lastIndex = l;
                    if (u = s.exec(y))if (u.index === l) {
                        l += u[0].length, a.push(u[0]);
                        continue
                    }
                    if (!f && c === "/") {
                        h = y.charAt(l + 1);
                        if (h === "/" || h === "*")if (u = i.exec(y))if (u.index === l) {
                            l += u[0].length, a.push(u[0]);
                            continue
                        }
                    }
                    switch (c) {
                        case"{":
                            if (!f) {
                                o++, a.push(c);
                                break
                            }
                            ;
                        case"}":
                            if (!f) {
                                o--, a.push(c), t[++n] = a = [];
                                break
                            }
                            ;
                        case"(":
                            if (!f) {
                                f = !0, a.push(c);
                                break
                            }
                            ;
                        case")":
                            if (f) {
                                f = !1, a.push(c);
                                break
                            }
                            ;
                        default:
                            a.push(c)
                    }
                    l++
                }
                return o != 0 && (p = new v({index: l - 1, type: "Parse", message: o > 0 ? "missing closing `}`" : "missing opening `{`", filename: e.filename}, e)), t.map(function (e) {
                    return e.join("")
                })
            }([
                []
            ]);
            if (p)return r(p, e);
            try {
                i = new g.Ruleset([], o(this.parsers.primary)), i.root = !0
            } catch (d) {
                return r(new v(d, e))
            }
            i.toCSS = function (t) {
                var r, i, s;
                return function (r, i) {
                    var s = [], o;
                    r = r || {}, typeof i == "object" && !Array.isArray(i) && (i = Object.keys(i).map(function (e) {
                        var t = i[e];
                        return t instanceof g.Value || (t instanceof g.Expression || (t = new g.Expression([t])), t = new g.Value([t])), new g.Rule("@" + e, t, !1, 0)
                    }), s = [new g.Ruleset(null, i)]);
                    try {
                        var u = t.call(this, {frames: s}).toCSS([], {compress: r.compress || !1, dumpLineNumbers: e.dumpLineNumbers})
                    } catch (a) {
                        throw new v(a, e)
                    }
                    if (o = C.imports.error)throw o instanceof v ? o : new v(o, e);
                    return r.yuicompress && m.mode === "node" ? n("ycssmin").cssmin(u) : r.compress ? u.replace(/(\s)+/g, "$1") : u
                }
            }(i.eval);
            if (b < y.length - 1) {
                b = x, l = y.split("\n"), f = (y.slice(0, b).match(/\n/g) || "").length + 1;
                for (var E = b, S = -1; E >= 0 && y.charAt(E) !== "\n"; E--)S++;
                p = {type: "Parse", message: "Syntax Error on line " + f, index: b, filename: e.filename, line: f, column: S, extract: [l[f - 2], l[f - 1], l[f]]}
            }
            this.imports.queue.length > 0 ? L = function (e) {
                e = p || e, e ? r(e) : r(null, i)
            } : r(p, i)
        }, parsers: {primary: function () {
            var e, t = [];
            while ((e = o(this.mixin.definition) || o(this.rule) || o(this.ruleset) || o(this.mixin.call) || o(this.comment) || o(this.directive)) || o(/^[\s\n]+/) || o(/^;+/))e && t.push(e);
            return t
        }, comment: function () {
            var e;
            if (y.charAt(b) !== "/")return;
            if (y.charAt(b + 1) === "/")return new g.Comment(o(/^\/\/.*/), !0);
            if (e = o(/^\/\*(?:[^*]|\*+[^\/*])*\*+\/\n?/))return new g.Comment(e)
        }, entities: {quoted: function () {
            var e, t = b, n;
            y.charAt(t) === "~" && (t++, n = !0);
            if (y.charAt(t) !== '"' && y.charAt(t) !== "'")return;
            n && o("~");
            if (e = o(/^"((?:[^"\\\r\n]|\\.)*)"|'((?:[^'\\\r\n]|\\.)*)'/))return new g.Quoted(e[0], e[1] || e[2], n)
        }, keyword: function () {
            var e;
            if (e = o(/^[_A-Za-z-][_A-Za-z0-9-]*/))return g.colors.hasOwnProperty(e) ? new g.Color(g.colors[e].slice(1)) : new g.Keyword(e)
        }, call: function () {
            var t, n, r, i, s = b;
            if (!(t = /^([\w-]+|%|progid:[\w\.]+)\(/.exec(T[w])))return;
            t = t[1], n = t.toLowerCase();
            if (n === "url")return null;
            b += t.length;
            if (n === "alpha") {
                i = o(this.alpha);
                if (typeof i != "undefined")return i
            }
            o("("), r = o(this.entities.arguments);
            if (!o(")"))return;
            if (t)return new g.Call(t, r, s, e.filename)
        }, arguments: function () {
            var e = [], t;
            while (t = o(this.entities.assignment) || o(this.expression)) {
                e.push(t);
                if (!o(","))break
            }
            return e
        }, literal: function () {
            return o(this.entities.ratio) || o(this.entities.dimension) || o(this.entities.color) || o(this.entities.quoted) || o(this.entities.unicodeDescriptor)
        }, assignment: function () {
            var e, t;
            if ((e = o(/^\w+(?=\s?=)/i)) && o("=") && (t = o(this.entity)))return new g.Assignment(e, t)
        }, url: function () {
            var t;
            if (y.charAt(b) !== "u" || !o(/^url\(/))return;
            return t = o(this.entities.quoted) || o(this.entities.variable) || o(/^(?:(?:\\[\(\)'"])|[^\(\)'"])+/) || "", a(")"), new g.URL(t.value != null || t instanceof g.Variable ? t : new g.Anonymous(t), e.rootpath)
        }, variable: function () {
            var t, n = b;
            if (y.charAt(b) === "@" && (t = o(/^@@?[\w-]+/)))return new g.Variable(t, n, e.filename)
        }, variableCurly: function () {
            var t, n, r = b;
            if (y.charAt(b) === "@" && (n = o(/^@\{([\w-]+)\}/)))return new g.Variable("@" + n[1], r, e.filename)
        }, color: function () {
            var e;
            if (y.charAt(b) === "#" && (e = o(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})/)))return new g.Color(e[1])
        }, dimension: function () {
            var e, t = y.charCodeAt(b);
            if (t > 57 || t < 43 || t === 47 || t == 44)return;
            if (e = o(/^([+-]?\d*\.?\d+)(px|%|em|pc|ex|in|deg|s|ms|pt|cm|mm|rad|grad|turn|dpi|dpcm|dppx|rem|vw|vh|vmin|vm|ch)?/))return new g.Dimension(e[1], e[2])
        }, ratio: function () {
            var e, t = y.charCodeAt(b);
            if (t > 57 || t < 48)return;
            if (e = o(/^(\d+\/\d+)/
            ))return new g.Ratio(e[1])
        }, unicodeDescriptor: function () {
            var e;
            if (e = o(/^U\+[0-9a-fA-F?]+(\-[0-9a-fA-F?]+)?/))return new g.UnicodeDescriptor(e[0])
        }, javascript: function () {
            var e, t = b, n;
            y.charAt(t) === "~" && (t++, n = !0);
            if (y.charAt(t) !== "`")return;
            n && o("~");
            if (e = o(/^`([^`]*)`/))return new g.JavaScript(e[1], b, n)
        }}, variable: function () {
            var e;
            if (y.charAt(b) === "@" && (e = o(/^(@[\w-]+)\s*:/)))return e[1]
        }, shorthand: function () {
            var e, n;
            if (!l(/^[@\w.%-]+\/[@\w.-]+/))return;
            t();
            if ((e = o(this.entity)) && o("/") && (n = o(this.entity)))return new g.Shorthand(e, n);
            r()
        }, mixin: {call: function () {
            var n = [], i, s, u = [], c = [], h, p, d, v, m, w, E, S = b, x = y.charAt(b), T, N, C = !1;
            if (x !== "." && x !== "#")return;
            t();
            while (i = o(/^[#.](?:[\w-]|\\(?:[A-Fa-f0-9]{1,6} ?|[^A-Fa-f0-9]))+/))n.push(new g.Element(s, i, b)), s = o(">");
            if (o("(")) {
                m = [];
                while (d = o(this.expression)) {
                    v = null, N = d;
                    if (d.value.length == 1) {
                        var k = d.value[0];
                        k instanceof g.Variable && o(":") && (m.length > 0 && (w && f("Cannot mix ; and , as delimiter types"), E = !0), N = a(this.expression), v = T = k.name)
                    }
                    m.push(N), c.push({name: v, value: N});
                    if (o(","))continue;
                    if (o(";") || w)E && f("Cannot mix ; and , as delimiter types"), w = !0, m.length > 1 && (N = new g.Value(m)), u.push({name: T, value: N}), T = null, m = [], E = !1
                }
                a(")")
            }
            h = w ? u : c, o(this.important) && (C = !0);
            if (n.length > 0 && (o(";") || l("}")))return new g.mixin.Call(n, h, S, e.filename, C);
            r()
        }, definition: function () {
            var e, n = [], i, s, u, f, c, h = !1;
            if (y.charAt(b) !== "." && y.charAt(b) !== "#" || l(/^[^{]*\}/))return;
            t();
            if (i = o(/^([#.](?:[\w-]|\\(?:[A-Fa-f0-9]{1,6} ?|[^A-Fa-f0-9]))+)\s*\(/)) {
                e = i[1];
                do {
                    o(this.comment);
                    if (y.charAt(b) === "." && o(/^\.{3}/)) {
                        h = !0, n.push({variadic: !0});
                        break
                    }
                    if (!(u = o(this.entities.variable) || o(this.entities.literal) || o(this.entities.keyword)))break;
                    if (u instanceof g.Variable)if (o(":"))f = a(this.expression, "expected expression"), n.push({name: u.name, value: f}); else {
                        if (o(/^\.{3}/)) {
                            n.push({name: u.name, variadic: !0}), h = !0;
                            break
                        }
                        n.push({name: u.name})
                    } else n.push({value: u})
                } while (o(",") || o(";"));
                o(")") || (x = b, r()), o(this.comment), o(/^when/) && (c = a(this.conditions, "expected condition")), s = o(this.block);
                if (s)return new g.mixin.Definition(e, n, s, c, h);
                r()
            }
        }}, entity: function () {
            return o(this.entities.literal) || o(this.entities.variable) || o(this.entities.url) || o(this.entities.call) || o(this.entities.keyword) || o(this.entities.javascript) || o(this.comment)
        }, end: function () {
            return o(";") || l("}")
        }, alpha: function () {
            var e;
            if (!o(/^\(opacity=/i))return;
            if (e = o(/^\d+/) || o(this.entities.variable))return a(")"), new g.Alpha(e)
        }, element: function () {
            var e, t, n, r;
            n = o(this.combinator), e = o(/^(?:\d+\.\d+|\d+)%/) || o(/^(?:[.#]?|:*)(?:[\w-]|[^\x00-\x9f]|\\(?:[A-Fa-f0-9]{1,6} ?|[^A-Fa-f0-9]))+/) || o("*") || o("&") || o(this.attribute) || o(/^\([^()@]+\)/) || o(/^[\.#](?=@)/) || o(this.entities.variableCurly), e || o("(") && (r = o(this.entities.variableCurly) || o(this.entities.variable) || o(this.selector)) && o(")") && (e = new g.Paren(r));
            if (e)return new g.Element(n, e, b)
        }, combinator: function () {
            var e, t = y.charAt(b);
            if (t === ">" || t === "+" || t === "~" || t === "|") {
                b++;
                while (y.charAt(b).match(/\s/))b++;
                return new g.Combinator(t)
            }
            return y.charAt(b - 1).match(/\s/) ? new g.Combinator(" ") : new g.Combinator(null)
        }, selector: function () {
            var e, t, n = [], r, i;
            if (o("("))return e = o(this.entity), o(")") ? new g.Selector([new g.Element("", e, b)]) : null;
            while (t = o(this.element)) {
                r = y.charAt(b), n.push(t);
                if (r === "{" || r === "}" || r === ";" || r === "," || r === ")")break
            }
            if (n.length > 0)return new g.Selector(n)
        }, attribute: function () {
            var e = "", t, n, r;
            if (!o("["))return;
            if (t = o(/^(?:[_A-Za-z0-9-]|\\.)+/) || o(this.entities.quoted))(r = o(/^[|~*$^]?=/)) && (n = o(this.entities.quoted) || o(/^[\w-]+/)) ? e = [t, r, n.toCSS ? n.toCSS() : n].join("") : e = t;
            if (!o("]"))return;
            if (e)return"[" + e + "]"
        }, block: function () {
            var e;
            if (o("{") && (e = o(this.primary)) && o("}"))return e
        }, ruleset: function () {
            var n = [], i, s, u, a;
            t(), e.dumpLineNumbers && (a = d(b, y, e));
            while (i = o(this.selector)) {
                n.push(i), o(this.comment);
                if (!o(","))break;
                o(this.comment)
            }
            if (n.length > 0 && (s = o(this.block))) {
                var f = new g.Ruleset(n, s, e.strictImports);
                return e.dumpLineNumbers && (f.debugInfo = a), f
            }
            x = b, r()
        }, rule: function () {
            var e, n, i = y.charAt(b), s, u;
            t();
            if (i === "." || i === "#" || i === "&")return;
            if (e = o(this.variable) || o(this.property)) {
                e.charAt(0) != "@" && (u = /^([^@+\/'"*`(;{}-]*);/.exec(T[w])) ? (b += u[0].length - 1, n = new g.Anonymous(u[1])) : e === "font" ? n = o(this.font) : n = o(this.value), s = o(this.important);
                if (n && o(this.end))return new g.Rule(e, n, s, S);
                x = b, r()
            }
        }, "import": function () {
            var n, i, s = b;
            t();
            var u = o(/^@import(?:-(once))?\s+/);
            if (u && (n = o(this.entities.quoted) || o(this.entities.url))) {
                i = o(this.mediaFeatures);
                if (o(";"))return new g.Import(n, A, i, u[1] === "once", s, e.rootpath)
            }
            r()
        }, mediaFeature: function () {
            var e, t, n = [];
            do if (e = o(this.entities.keyword))n.push(e); else if (o("(")) {
                t = o(this.property), e = o(this.entity);
                if (!o(")"))return null;
                if (t && e)n.push(new g.Paren(new g.Rule(t, e, null, b, !0))); else {
                    if (!e)return null;
                    n.push(new g.Paren(e))
                }
            } while (e);
            if (n.length > 0)return new g.Expression(n)
        }, mediaFeatures: function () {
            var e, t = [];
            do if (e = o(this.mediaFeature)) {
                t.push(e);
                if (!o(","))break
            } else if (e = o(this.entities.variable)) {
                t.push(e);
                if (!o(","))break
            } while (e);
            return t.length > 0 ? t : null
        }, media: function () {
            var t, n, r, i;
            e.dumpLineNumbers && (i = d(b, y, e));
            if (o(/^@media/)) {
                t = o(this.mediaFeatures);
                if (n = o(this.block))return r = new g.Media(n, t), e.dumpLineNumbers && (r.debugInfo = i), r
            }
        }, directive: function () {
            var n, i, s, u, a, f, l, c, h, p;
            if (y.charAt(b) !== "@")return;
            if (i = o(this["import"]) || o(this.media))return i;
            t(), n = o(/^@[a-z-]+/);
            if (!n)return;
            l = n, n.charAt(1) == "-" && n.indexOf("-", 2) > 0 && (l = "@" + n.slice(n.indexOf("-", 2) + 1));
            switch (l) {
                case"@font-face":
                    c = !0;
                    break;
                case"@viewport":
                case"@top-left":
                case"@top-left-corner":
                case"@top-center":
                case"@top-right":
                case"@top-right-corner":
                case"@bottom-left":
                case"@bottom-left-corner":
                case"@bottom-center":
                case"@bottom-right":
                case"@bottom-right-corner":
                case"@left-top":
                case"@left-middle":
                case"@left-bottom":
                case"@right-top":
                case"@right-middle":
                case"@right-bottom":
                    c = !0;
                    break;
                case"@page":
                case"@document":
                case"@supports":
                case"@keyframes":
                    c = !0, h = !0;
                    break;
                case"@namespace":
                    p = !0
            }
            h && (n += " " + (o(/^[^{]+/) || "").trim());
            if (c) {
                if (s = o(this.block))return new g.Directive(n, s)
            } else if ((i = p ? o(this.expression) : o(this.entity)) && o(";")) {
                var v = new g.Directive(n, i);
                return e.dumpLineNumbers && (v.debugInfo = d(b, y, e)), v
            }
            r()
        }, font: function () {
            var e = [], t = [], n, r, i, s;
            while (s = o(this.shorthand) || o(this.entity))t.push(s);
            e.push(new g.Expression(t));
            if (o(","))while (s = o(this.expression)) {
                e.push(s);
                if (!o(","))break
            }
            return new g.Value(e)
        }, value: function () {
            var e, t = [], n;
            while (e = o(this.expression)) {
                t.push(e);
                if (!o(","))break
            }
            if (t.length > 0)return new g.Value(t)
        }, important: function () {
            if (y.charAt(b) === "!")return o(/^! *important/)
        }, sub: function () {
            var e;
            if (o("(") && (e = o(this.expression)) && o(")"))return e
        }, multiplication: function () {
            var e, t, n, r;
            if (e = o(this.operand)) {
                while (!l(/^\/[*\/]/) && (n = o("/") || o("*")) && (t = o(this.operand)))r = new g.Operation(n, [r || e, t]);
                return r || e
            }
        }, addition: function () {
            var e, t, n, r;
            if (e = o(this.multiplication)) {
                while ((n = o(/^[-+]\s+/) || !s(y.charAt(b - 1)) && (o("+") || o("-"))) && (t = o(this.multiplication)))r = new g.Operation(n, [r || e, t]);
                return r || e
            }
        }, conditions: function () {
            var e, t, n = b, r;
            if (e = o(this.condition)) {
                while (o(",") && (t = o(this.condition)))r = new g.Condition("or", r || e, t, n);
                return r || e
            }
        }, condition: function () {
            var e, t, n, r, i = b, s = !1;
            o(/^not/) && (s = !0), a("(");
            if (e = o(this.addition) || o(this.entities.keyword) || o(this.entities.quoted))return(r = o(/^(?:>=|=<|[<=>])/)) ? (t = o(this.addition) || o(this.entities.keyword) || o(this.entities.quoted)) ? n = new g.Condition(r, e, t, i, s) : f("expected expression") : n = new g.Condition("=", e, new g.Keyword("true"), i, s), a(")"), o(/^and/) ? new g.Condition("and", n, o(this.condition)) : n
        }, operand: function () {
            var e, t = y.charAt(b + 1);
            y.charAt(b) === "-" && (t === "@" || t === "(") && (e = o("-"));
            var n = o(this.sub) || o(this.entities.dimension) || o(this.entities.color) || o(this.entities.variable) || o(this.entities.call);
            return e ? new g.Operation("*", [new g.Dimension(-1), n]) : n
        }, expression: function () {
            var e, t, n = [], r;
            while (e = o(this.addition) || o(this.entity))n.push(e);
            if (n.length > 0)return new g.Expression(n)
        }, property: function () {
            var e;
            if (e = o(/^(\*?-?[_a-z0-9-]+)\s*:/))return e[1]
        }}}
    };
    if (m.mode === "browser" || m.mode === "rhino")m.Parser.importer = function (e, t, n, r) {
        !/^([a-z-]+:)?\//.test(e) && t.length > 0 && (e = t[0] + e), a({href: e, title: e, type: r.mime, contents: r.contents, files: r.files, rootpath: r.rootpath, entryPath: r.entryPath, relativeUrls: r.relativeUrls}, function (e, i, s, o, u, a) {
            e && typeof r.errback == "function" ? r.errback.call(null, a, t, n, r) : n.call(null, e, i, a)
        }, !0)
    };
    (function (e) {
        function t(t) {
            return e.functions.hsla(t.h, t.s, t.l, t.a)
        }

        function n(t, n) {
            return t instanceof e.Dimension && t.unit == "%" ? parseFloat(t.value * n / 100) : r(t)
        }

        function r(t) {
            if (t instanceof e.Dimension)return parseFloat(t.unit == "%" ? t.value / 100 : t.value);
            if (typeof t == "number")return t;
            throw{error: "RuntimeError", message: "color functions take numbers as parameters"}
        }

        function i(e) {
            return Math.min(1, Math.max(0, e))
        }

        e.functions = {rgb: function (e, t, n) {
            return this.rgba(e, t, n, 1)
        }, rgba: function (t, i, s, o) {
            var u = [t, i, s].map(function (e) {
                return n(e, 256)
            });
            return o = r(o), new e.Color(u, o)
        }, hsl: function (e, t, n) {
            return this.hsla(e, t, n, 1)
        }, hsla: function (e, t, n, i) {
            function s(e) {
                return e = e < 0 ? e + 1 : e > 1 ? e - 1 : e, e * 6 < 1 ? u + (o - u) * e * 6 : e * 2 < 1 ? o : e * 3 < 2 ? u + (o - u) * (2 / 3 - e) * 6 : u
            }

            e = r(e) % 360 / 360, t = r(t), n = r(n), i = r(i);
            var o = n <= .5 ? n * (t + 1) : n + t - n * t, u = n * 2 - o;
            return this.rgba(s(e + 1 / 3) * 255, s(e) * 255, s(e - 1 / 3) * 255, i)
        }, hsv: function (e, t, n) {
            return this.hsva(e, t, n, 1)
        }, hsva: function (e, t, n, i) {
            e = r(e) % 360 / 360 * 360, t = r(t), n = r(n), i = r(i);
            var s, o;
            s = Math.floor(e / 60 % 6), o = e / 60 - s;
            var u = [n, n * (1 - t), n * (1 - o * t), n * (1 - (1 - o) * t)], a = [
                [0, 3, 1],
                [2, 0, 1],
                [1, 0, 3],
                [1, 2, 0],
                [3, 1, 0],
                [0, 1, 2]
            ];
            return this.rgba(u[a[s][0]] * 255, u[a[s][1]] * 255, u[a[s][2]] * 255, i)
        }, hue: function (t) {
            return new e.Dimension(Math.round(t.toHSL().h))
        }, saturation: function (t) {
            return new e.Dimension(Math.round(t.toHSL().s * 100), "%")
        }, lightness: function (t) {
            return new e.Dimension(Math.round(t.toHSL().l * 100), "%")
        }, red: function (t) {
            return new e.Dimension(t.rgb[0])
        }, green: function (t) {
            return new e.Dimension(t.rgb[1])
        }, blue: function (t) {
            return new e.Dimension(t.rgb[2])
        }, alpha: function (t) {
            return new e.Dimension(t.toHSL().a)
        }, luma: function (t) {
            return new e.Dimension(Math.round((.2126 * (t.rgb[0] / 255) + .7152 * (t.rgb[1] / 255) + .0722 * (t.rgb[2] / 255)) * t.alpha * 100), "%")
        }, saturate: function (e, n) {
            var r = e.toHSL();
            return r.s += n.value / 100, r.s = i(r.s), t(r)
        }, desaturate: function (e, n) {
            var r = e.toHSL();
            return r.s -= n.value / 100, r.s = i(r.s), t(r)
        }, lighten: function (e, n) {
            var r = e.toHSL();
            return r.l += n.value / 100, r.l = i(r.l), t(r)
        }, darken: function (e, n) {
            var r = e.toHSL();
            return r.l -= n.value / 100, r.l = i(r.l), t(r)
        }, fadein: function (e, n) {
            var r = e.toHSL();
            return r.a += n.value / 100, r.a = i(r.a), t(r)
        }, fadeout: function (e, n) {
            var r = e.toHSL();
            return r.a -= n.value / 100, r.a = i(r.a), t(r)
        }, fade: function (e, n) {
            var r = e.toHSL();
            return r.a = n.value / 100, r.a = i(r.a), t(r)
        }, spin: function (e, n) {
            var r = e.toHSL(), i = (r.h + n.value) % 360;
            return r.h = i < 0 ? 360 + i : i, t(r)
        }, mix: function (t, n, r) {
            r || (r = new e.Dimension(50));
            var i = r.value / 100, s = i * 2 - 1, o = t.toHSL().a - n.toHSL().a, u = ((s * o == -1 ? s : (s + o) / (1 + s * o)) + 1) / 2, a = 1 - u, f = [t.rgb[0] * u + n.rgb[0] * a, t.rgb[1] * u + n.rgb[1] * a, t.rgb[2] * u + n.rgb[2] * a], l = t.alpha * i + n.alpha * (1 - i);
            return new e.Color(f, l)
        }, greyscale: function (t) {
            return this.desaturate(t, new e.Dimension(100))
        }, contrast: function (e, t, n, r) {
            return e.rgb ? (typeof n == "undefined" && (n = this.rgba(255, 255, 255, 1)), typeof t == "undefined" && (t = this.rgba(0, 0, 0, 1)), typeof r == "undefined" ? r = .43 : r = r.value, (.2126 * (e.rgb[0] / 255) + .7152 * (e.rgb[1] / 255) + .0722 * (e.rgb[2] / 255)) * e.alpha < r ? n : t) : null
        }, e: function (t) {
            return new e.Anonymous(t instanceof e.JavaScript ? t.evaluated : t)
        }, escape: function (t) {
            return new e.Anonymous(encodeURI(t.value).replace(/=/g, "%3D").replace(/:/g, "%3A").replace(/#/g, "%23").replace(/;/g, "%3B").replace(/\(/g, "%28").replace(/\)/g, "%29"))
        }, "%": function (t) {
            var n = Array.prototype.slice.call(arguments, 1), r = t.value;
            for (var i = 0; i < n.length; i++)r = r.replace(/%[sda]/i, function (e) {
                var t = e.match(/s/i) ? n[i].value : n[i].toCSS();
                return e.match(/[A-Z]$/) ? encodeURIComponent(t) : t
            });
            return r = r.replace(/%%/g, "%"), new e.Quoted('"' + r + '"', r)
        }, unit: function (t, n) {
            return new e.Dimension(t.value, n ? n.toCSS() : "")
        }, round: function (e, t) {
            var n = typeof t == "undefined" ? 0 : t.value;
            return this._math(function (e) {
                return e.toFixed(n)
            }, e)
        }, ceil: function (e) {
            return this._math(Math.ceil, e)
        }, floor: function (e) {
            return this._math(Math.floor, e)
        }, _math: function (t, n) {
            if (n instanceof e.Dimension)return new e.Dimension(t(parseFloat(n.value)), n.unit);
            if (typeof n == "number")return t(n);
            throw{type: "Argument", message: "argument must be a number"}
        }, argb: function (t) {
            return new e.Anonymous(t.toARGB())
        }, percentage: function (t) {
            return new e.Dimension(t.value * 100, "%")
        }, color: function (t) {
            if (t instanceof e.Quoted)return new e.Color(t.value.slice(1));
            throw{type: "Argument", message: "argument must be a string"}
        }, iscolor: function (t) {
            return this._isa(t, e.Color)
        }, isnumber: function (t) {
            return this._isa(t, e.Dimension)
        }, isstring: function (t) {
            return this._isa(t, e.Quoted)
        }, iskeyword: function (t) {
            return this._isa(t, e.Keyword)
        }, isurl: function (t) {
            return this._isa(t, e.URL)
        }, ispixel: function (t) {
            return t instanceof e.Dimension && t.unit === "px" ? e.True : e.False
        }, ispercentage: function (t) {
            return t instanceof e.Dimension && t.unit === "%" ? e.True : e.False
        }, isem: function (t) {
            return t instanceof e.Dimension && t.unit === "em" ? e.True : e.False
        }, _isa: function (t, n) {
            return t instanceof n ? e.True : e.False
        }, multiply: function (e, t) {
            var n = e.rgb[0] * t.rgb[0] / 255, r = e.rgb[1] * t.rgb[1] / 255, i = e.rgb[2] * t.rgb[2] / 255;
            return this.rgb(n, r, i)
        }, screen: function (e, t) {
            var n = 255 - (255 - e.rgb[0]) * (255 - t.rgb[0]) / 255, r = 255 - (255 - e.rgb[1]) * (255 - t.rgb[1]) / 255, i = 255 - (255 - e.rgb[2]) * (255 - t.rgb[2]) / 255;
            return this.rgb(n, r, i)
        }, overlay: function (e, t) {
            var n = e.rgb[0] < 128 ? 2 * e.rgb[0] * t.rgb[0] / 255 : 255 - 2 * (255 - e.rgb[0]) * (255 - t.rgb[0]) / 255, r = e.rgb[1] < 128 ? 2 * e.rgb[1] * t.rgb[1] / 255 : 255 - 2 * (255 - e.rgb[1]) * (255 - t.rgb[1]) / 255, i = e.rgb[2] < 128 ? 2 * e.rgb[2] * t.rgb[2] / 255 : 255 - 2 * (255 - e.rgb[2]) * (255 - t.rgb[2]) / 255;
            return this.rgb(n, r, i)
        }, softlight: function (e, t) {
            var n = t.rgb[0] * e.rgb[0] / 255, r = n + e.rgb[0] * (255 - (255 - e.rgb[0]) * (255 - t.rgb[0]) / 255 - n) / 255;
            n = t.rgb[1] * e.rgb[1] / 255;
            var i = n + e.rgb[1] * (255 - (255 - e.rgb[1]) * (255 - t.rgb[1]) / 255 - n) / 255;
            n = t.rgb[2] * e.rgb[2] / 255;
            var s = n + e.rgb[2] * (255 - (255 - e.rgb[2]) * (255 - t.rgb[2]) / 255 - n) / 255;
            return this.rgb(r, i, s)
        }, hardlight: function (e, t) {
            var n = t.rgb[0] < 128 ? 2 * t.rgb[0] * e.rgb[0] / 255 : 255 - 2 * (255 - t.rgb[0]) * (255 - e.rgb[0]) / 255, r = t.rgb[1] < 128 ? 2 * t.rgb[1] * e.rgb[1] / 255 : 255 - 2 * (255 - t.rgb[1]) * (255 - e.rgb[1]) / 255, i = t.rgb[2] < 128 ? 2 * t.rgb[2] * e.rgb[2] / 255 : 255 - 2 * (255 - t.rgb[2]) * (255 - e.rgb[2]) / 255;
            return this.rgb(n, r, i)
        }, difference: function (e, t) {
            var n = Math.abs(e.rgb[0] - t.rgb[0]), r = Math.abs(e.rgb[1] - t.rgb[1]), i = Math.abs(e.rgb[2] - t.rgb[2]);
            return this.rgb(n, r, i)
        }, exclusion: function (e, t) {
            var n = e.rgb[0] + t.rgb[0] * (255 - e.rgb[0] - e.rgb[0]) / 255, r = e.rgb[1] + t.rgb[1] * (255 - e.rgb[1] - e.rgb[1]) / 255, i = e.rgb[2] + t.rgb[2] * (255 - e.rgb[2] - e.rgb[2]) / 255;
            return this.rgb(n, r, i)
        }, average: function (e, t) {
            var n = (e.rgb[0] + t.rgb[0]) / 2, r = (e.rgb[1] + t.rgb[1]) / 2, i = (e.rgb[2] + t.rgb[2]) / 2;
            return this.rgb(n, r, i)
        }, negation: function (e, t) {
            var n = 255 - Math.abs(255 - t.rgb[0] - e.rgb[0]), r = 255 - Math.abs(255 - t.rgb[1] - e.rgb[1]), i = 255 - Math.abs(255 - t.rgb[2] - e.rgb[2]);
            return this.rgb(n, r, i)
        }, tint: function (e, t) {
            return this.mix(this.rgb(255, 255, 255), e, t)
        }, shade: function (e, t) {
            return this.mix(this.rgb(0, 0, 0), e, t)
        }}
    })(n("./tree")), function (e) {
        e.colors = {aliceblue: "#f0f8ff", antiquewhite: "#faebd7", aqua: "#00ffff", aquamarine: "#7fffd4", azure: "#f0ffff", beige: "#f5f5dc", bisque: "#ffe4c4", black: "#000000", blanchedalmond: "#ffebcd", blue: "#0000ff", blueviolet: "#8a2be2", brown: "#a52a2a", burlywood: "#deb887", cadetblue: "#5f9ea0", chartreuse: "#7fff00", chocolate: "#d2691e", coral: "#ff7f50", cornflowerblue: "#6495ed", cornsilk: "#fff8dc", crimson: "#dc143c", cyan: "#00ffff", darkblue: "#00008b", darkcyan: "#008b8b", darkgoldenrod: "#b8860b", darkgray: "#a9a9a9", darkgrey: "#a9a9a9", darkgreen: "#006400", darkkhaki: "#bdb76b", darkmagenta: "#8b008b", darkolivegreen: "#556b2f", darkorange: "#ff8c00", darkorchid: "#9932cc", darkred: "#8b0000", darksalmon: "#e9967a", darkseagreen: "#8fbc8f", darkslateblue: "#483d8b", darkslategray: "#2f4f4f", darkslategrey: "#2f4f4f", darkturquoise: "#00ced1", darkviolet: "#9400d3", deeppink: "#ff1493", deepskyblue: "#00bfff", dimgray: "#696969", dimgrey: "#696969", dodgerblue: "#1e90ff", firebrick: "#b22222", floralwhite: "#fffaf0", forestgreen: "#228b22", fuchsia: "#ff00ff", gainsboro: "#dcdcdc", ghostwhite: "#f8f8ff", gold: "#ffd700", goldenrod: "#daa520", gray: "#808080", grey: "#808080", green: "#008000", greenyellow: "#adff2f", honeydew: "#f0fff0", hotpink: "#ff69b4", indianred: "#cd5c5c", indigo: "#4b0082", ivory: "#fffff0", khaki: "#f0e68c", lavender: "#e6e6fa", lavenderblush: "#fff0f5", lawngreen: "#7cfc00", lemonchiffon: "#fffacd", lightblue: "#add8e6", lightcoral: "#f08080", lightcyan: "#e0ffff", lightgoldenrodyellow: "#fafad2", lightgray: "#d3d3d3", lightgrey: "#d3d3d3", lightgreen: "#90ee90", lightpink: "#ffb6c1", lightsalmon: "#ffa07a", lightseagreen: "#20b2aa", lightskyblue: "#87cefa", lightslategray: "#778899", lightslategrey: "#778899", lightsteelblue: "#b0c4de", lightyellow: "#ffffe0", lime: "#00ff00", limegreen: "#32cd32", linen: "#faf0e6", magenta: "#ff00ff", maroon: "#800000", mediumaquamarine: "#66cdaa", mediumblue: "#0000cd", mediumorchid: "#ba55d3", mediumpurple: "#9370d8", mediumseagreen: "#3cb371", mediumslateblue: "#7b68ee", mediumspringgreen: "#00fa9a", mediumturquoise: "#48d1cc", mediumvioletred: "#c71585", midnightblue: "#191970", mintcream: "#f5fffa", mistyrose: "#ffe4e1", moccasin: "#ffe4b5", navajowhite: "#ffdead", navy: "#000080", oldlace: "#fdf5e6", olive: "#808000", olivedrab: "#6b8e23", orange: "#ffa500", orangered: "#ff4500", orchid: "#da70d6", palegoldenrod: "#eee8aa", palegreen: "#98fb98", paleturquoise: "#afeeee", palevioletred: "#d87093", papayawhip: "#ffefd5", peachpuff: "#ffdab9", peru: "#cd853f", pink: "#ffc0cb", plum: "#dda0dd", powderblue: "#b0e0e6", purple: "#800080", red: "#ff0000", rosybrown: "#bc8f8f", royalblue: "#4169e1", saddlebrown: "#8b4513", salmon: "#fa8072", sandybrown: "#f4a460", seagreen: "#2e8b57", seashell: "#fff5ee", sienna: "#a0522d", silver: "#c0c0c0", skyblue: "#87ceeb", slateblue: "#6a5acd", slategray: "#708090", slategrey: "#708090", snow: "#fffafa", springgreen: "#00ff7f", steelblue: "#4682b4", tan: "#d2b48c", teal: "#008080", thistle: "#d8bfd8", tomato: "#ff6347", turquoise: "#40e0d0", violet: "#ee82ee", wheat: "#f5deb3", white: "#ffffff", whitesmoke: "#f5f5f5", yellow: "#ffff00", yellowgreen: "#9acd32"}
    }(n("./tree")), function (e) {
        e.Alpha = function (e) {
            this.value = e
        }, e.Alpha.prototype = {toCSS: function () {
            return"alpha(opacity=" + (this.value.toCSS ? this.value.toCSS() : this.value) + ")"
        }, eval: function (e) {
            return this.value.eval && (this.value = this.value.eval(e)), this
        }}
    }(n("../tree")), function (e) {
        e.Anonymous = function (e) {
            this.value = e.value || e
        }, e.Anonymous.prototype = {toCSS: function () {
            return this.value
        }, eval: function () {
            return this
        }, compare: function (e) {
            if (!e.toCSS)return-1;
            var t = this.toCSS(), n = e.toCSS();
            return t === n ? 0 : t < n ? -1 : 1
        }}
    }(n("../tree")), function (e) {
        e.Assignment = function (e, t) {
            this.key = e, this.value = t
        }, e.Assignment.prototype = {toCSS: function () {
            return this.key + "=" + (this.value.toCSS ? this.value.toCSS() : this.value)
        }, eval: function (t) {
            return this.value.eval ? new e.Assignment(this.key, this.value.eval(t)) : this
        }}
    }(n("../tree")), function (e) {
        e.Call = function (e, t, n, r) {
            this.name = e, this.args = t, this.index = n, this.filename = r
        }, e.Call.prototype = {eval: function (t) {
            var n = this.args.map(function (e) {
                return e.eval(t)
            }), r;
            if (this.name in e.functions)try {
                r = e.functions[this.name].apply(e.functions, n);
                if (r != null)return r
            } catch (i) {
                throw{type: i.type || "Runtime", message: "error evaluating function `" + this.name + "`" + (i.message ? ": " + i.message : ""), index: this.index, filename: this.filename}
            }
            return new e.Anonymous(this.name + "(" + n.map(function (e) {
                return e.toCSS(t)
            }).join(", ") + ")")
        }, toCSS: function (e) {
            return this.eval(e).toCSS()
        }}
    }(n("../tree")), function (e) {
        e.Color = function (e, t) {
            Array.isArray(e) ? this.rgb = e : e.length == 6 ? this.rgb = e.match(/.{2}/g).map(function (e) {
                return parseInt(e, 16)
            }) : this.rgb = e.split("").map(function (e) {
                return parseInt(e + e, 16)
            }), this.alpha = typeof t == "number" ? t : 1
        }, e.Color.prototype = {eval: function () {
            return this
        }, toCSS: function () {
            return this.alpha < 1 ? "rgba(" + this.rgb.map(function (e) {
                return Math.round(e)
            }).concat(this.alpha).join(", ") + ")" : "#" + this.rgb.map(function (e) {
                return e = Math.round(e), e = (e > 255 ? 255 : e < 0 ? 0 : e).toString(16), e.length === 1 ? "0" + e : e
            }).join("")
        }, operate: function (t, n) {
            var r = [];
            n instanceof e.Color || (n = n.toColor());
            for (var i = 0; i < 3; i++)r[i] = e.operate(t, this.rgb[i], n.rgb[i]);
            return new e.Color(r, this.alpha + n.alpha)
        }, toHSL: function () {
            var e = this.rgb[0] / 255, t = this.rgb[1] / 255, n = this.rgb[2] / 255, r = this.alpha, i = Math.max(e, t, n), s = Math.min(e, t, n), o, u, a = (i + s) / 2, f = i - s;
            if (i === s)o = u = 0; else {
                u = a > .5 ? f / (2 - i - s) : f / (i + s);
                switch (i) {
                    case e:
                        o = (t - n) / f + (t < n ? 6 : 0);
                        break;
                    case t:
                        o = (n - e) / f + 2;
                        break;
                    case n:
                        o = (e - t) / f + 4
                }
                o /= 6
            }
            return{h: o * 360, s: u, l: a, a: r}
        }, toARGB: function () {
            var e = [Math.round(this.alpha * 255)].concat(this.rgb);
            return"#" + e.map(function (e) {
                return e = Math.round(e), e = (e > 255 ? 255 : e < 0 ? 0 : e).toString(16), e.length === 1 ? "0" + e : e
            }).join("")
        }, compare: function (e) {
            return e.rgb ? e.rgb[0] === this.rgb[0] && e.rgb[1] === this.rgb[1] && e.rgb[2] === this.rgb[2] && e.alpha === this.alpha ? 0 : -1 : -1
        }}
    }(n("../tree")), function (e) {
        e.Comment = function (e, t) {
            this.value = e, this.silent = !!t
        }, e.Comment.prototype = {toCSS: function (e) {
            return e.compress ? "" : this.value
        }, eval: function () {
            return this
        }}
    }(n("../tree")), function (e) {
        e.Condition = function (e, t, n, r, i) {
            this.op = e.trim(), this.lvalue = t, this.rvalue = n, this.index = r, this.negate = i
        }, e.Condition.prototype.eval = function (e) {
            var t = this.lvalue.eval(e), n = this.rvalue.eval(e), r = this.index, i, i = function (e) {
                switch (e) {
                    case"and":
                        return t && n;
                    case"or":
                        return t || n;
                    default:
                        if (t.compare)i = t.compare(n); else {
                            if (!n.compare)throw{type: "Type", message: "Unable to perform comparison", index: r};
                            i = n.compare(t)
                        }
                        switch (i) {
                            case-1:
                                return e === "<" || e === "=<";
                            case 0:
                                return e === "=" || e === ">=" || e === "=<";
                            case 1:
                                return e === ">" || e === ">="
                        }
                }
            }(this.op);
            return this.negate ? !i : i
        }
    }(n("../tree")), function (e) {
        e.Dimension = function (e, t) {
            this.value = parseFloat(e), this.unit = t || null
        }, e.Dimension.prototype = {eval: function () {
            return this
        }, toColor: function () {
            return new e.Color([this.value, this.value, this.value])
        }, toCSS: function () {
            var e = this.value + this.unit;
            return e
        }, operate: function (t, n) {
            return new e.Dimension(e.operate(t, this.value, n.value), this.unit || n.unit)
        }, compare: function (t) {
            return t instanceof e.Dimension ? t.value > this.value ? -1 : t.value < this.value ? 1 : t.unit && this.unit !== t.unit ? -1 : 0 : -1
        }}
    }(n("../tree")), function (e) {
        e.Directive = function (t, n) {
            this.name = t, Array.isArray(n) ? (this.ruleset = new e.Ruleset([], n), this.ruleset.allowImports = !0) : this.value = n
        }, e.Directive.prototype = {toCSS: function (e, t) {
            return this.ruleset ? (this.ruleset.root = !0, this.name + (t.compress ? "{" : " {\n  ") + this.ruleset.toCSS(e, t).trim().replace(/\n/g, "\n  ") + (t.compress ? "}" : "\n}\n")) : this.name + " " + this.value.toCSS() + ";\n"
        }, eval: function (t) {
            var n = this;
            return this.ruleset && (t.frames.unshift(this), n = new e.Directive(this.name), n.ruleset = this.ruleset.eval(t), t.frames.shift()), n
        }, variable: function (t) {
            return e.Ruleset.prototype.variable.call(this.ruleset, t)
        }, find: function () {
            return e.Ruleset.prototype.find.apply(this.ruleset, arguments)
        }, rulesets: function () {
            return e.Ruleset.prototype.rulesets.apply(this.ruleset)
        }}
    }(n("../tree")), function (e) {
        e.Element = function (t, n, r) {
            this.combinator = t instanceof e.Combinator ? t : new e.Combinator(t), typeof n == "string" ? this.value = n.trim() : n ? this.value = n : this.value = "", this.index = r
        }, e.Element.prototype.eval = function (t) {
            return new e.Element(this.combinator, this.value.eval ? this.value.eval(t) : this.value, this.index)
        }, e.Element.prototype.toCSS = function (e) {
            var t = this.value.toCSS ? this.value.toCSS(e) : this.value;
            return t == "" && this.combinator.value.charAt(0) == "&" ? "" : this.combinator.toCSS(e || {}) + t
        }, e.Combinator = function (e) {
            e === " " ? this.value = " " : this.value = e ? e.trim() : ""
        }, e.Combinator.prototype.toCSS = function (e) {
            return{"": "", " ": " ", ":": " :", "+": e.compress ? "+" : " + ", "~": e.compress ? "~" : " ~ ", ">": e.compress ? ">" : " > ", "|": e.compress ? "|" : " | "}[this.value]
        }
    }(n("../tree")), function (e) {
        e.Expression = function (e) {
            this.value = e
        }, e.Expression.prototype = {eval: function (t) {
            return this.value.length > 1 ? new e.Expression(this.value.map(function (e) {
                return e.eval(t)
            })) : this.value.length === 1 ? this.value[0].eval(t) : this
        }, toCSS: function (e) {
            return this.value.map(function (t) {
                return t.toCSS ? t.toCSS(e) : ""
            }).join(" ")
        }}
    }(n("../tree")), function (e) {
        e.Import = function (t, n, r, i, s, o) {
            var u = this;
            this.once = i, this.index = s, this._path = t, this.features = r && new e.Value(r), this.rootpath = o, t instanceof e.Quoted ? this.path = /(\.[a-z]*$)|([\?;].*)$/.test(t.value) ? t.value : t.value + ".less" : this.path = t.value.value || t.value, this.css = /css([\?;].*)?$/.test(this.path), this.css || n.push(this.path, function (t, n, r) {
                t && (t.index = s), r && u.once && (u.skip = r), u.root = n || new e.Ruleset([], [])
            })
        }, e.Import.prototype = {toCSS: function (e) {
            var t = this.features ? " " + this.features.toCSS(e) : "";
            return this.css ? (typeof this._path.value == "string" && !/^(?:[a-z-]+:|\/)/.test(this._path.value) && (this._path.value = this.rootpath + this._path.value), "@import " + this._path.toCSS() + t + ";\n") : ""
        }, eval: function (t) {
            var n, r = this.features && this.features.eval(t);
            return this.skip ? [] : this.css ? this : (n = new e.Ruleset([], this.root.rules.slice(0)), n.evalImports(t), this.features ? new e.Media(n.rules, this.features.value) : n.rules)
        }}
    }(n("../tree")), function (e) {
        e.JavaScript = function (e, t, n) {
            this.escaped = n, this.expression = e, this.index = t
        }, e.JavaScript.prototype = {eval: function (t) {
            var n, r = this, i = {}, s = this.expression.replace(/@\{([\w-]+)\}/g, function (n, i) {
                return e.jsify((new e.Variable("@" + i, r.index)).eval(t))
            });
            try {
                s = new Function("return (" + s + ")")
            } catch (o) {
                throw{message: "JavaScript evaluation error: `" + s + "`", index: this.index}
            }
            for (var u in t.frames[0].variables())i[u.slice(1)] = {value: t.frames[0].variables()[u].value, toJS: function () {
                return this.value.eval(t).toCSS()
            }};
            try {
                n = s.call(i)
            } catch (o) {
                throw{message: "JavaScript evaluation error: '" + o.name + ": " + o.message + "'", index: this.index}
            }
            return typeof n == "string" ? new e.Quoted('"' + n + '"', n, this.escaped, this.index) : Array.isArray(n) ? new e.Anonymous(n.join(", ")) : new e.Anonymous(n)
        }}
    }(n("../tree")), function (e) {
        e.Keyword = function (e) {
            this.value = e
        }, e.Keyword.prototype = {eval: function () {
            return this
        }, toCSS: function () {
            return this.value
        }, compare: function (t) {
            return t instanceof e.Keyword ? t.value === this.value ? 0 : 1 : -1
        }}, e.True = new e.Keyword("true"), e.False = new e.Keyword("false")
    }(n("../tree")), function (e) {
        e.Media = function (t, n) {
            var r = this.emptySelectors();
            this.features = new e.Value(n), this.ruleset = new e.Ruleset(r, t), this.ruleset.allowImports = !0
        }, e.Media.prototype = {toCSS: function (e, t) {
            var n = this.features.toCSS(t);
            return this.ruleset.root = e.length === 0 || e[0].multiMedia, "@media " + n + (t.compress ? "{" : " {\n  ") + this.ruleset.toCSS(e, t).trim().replace(/\n/g, "\n  ") + (t.compress ? "}" : "\n}\n")
        }, eval: function (t) {
            t.mediaBlocks || (t.mediaBlocks = [], t.mediaPath = []);
            var n = new e.Media([], []);
            return this.debugInfo && (this.ruleset.debugInfo = this.debugInfo, n.debugInfo = this.debugInfo), n.features = this.features.eval(t), t.mediaPath.push(n), t.mediaBlocks.push(n), t.frames.unshift(this.ruleset), n.ruleset = this.ruleset.eval(t), t.frames.shift(), t.mediaPath.pop(), t.mediaPath.length === 0 ? n.evalTop(t) : n.evalNested(t)
        }, variable: function (t) {
            return e.Ruleset.prototype.variable.call(this.ruleset, t)
        }, find: function () {
            return e.Ruleset.prototype.find.apply(this.ruleset, arguments)
        }, rulesets: function () {
            return e.Ruleset.prototype.rulesets.apply(this.ruleset)
        }, emptySelectors: function () {
            var t = new e.Element("", "&", 0);
            return[new e.Selector([t])]
        }, evalTop: function (t) {
            var n = this;
            if (t.mediaBlocks.length > 1) {
                var r = this.emptySelectors();
                n = new e.Ruleset(r, t.mediaBlocks), n.multiMedia = !0
            }
            return delete t.mediaBlocks, delete t.mediaPath, n
        }, evalNested: function (t) {
            var n, r, i = t.mediaPath.concat([this]);
            for (n = 0; n < i.length; n++)r = i[n].features instanceof e.Value ? i[n].features.value : i[n].features, i[n] = Array.isArray(r) ? r : [r];
            return this.features = new e.Value(this.permute(i).map(function (t) {
                t = t.map(function (t) {
                    return t.toCSS ? t : new e.Anonymous(t)
                });
                for (n = t.length - 1; n > 0; n--)t.splice(n, 0, new e.Anonymous("and"));
                return new e.Expression(t)
            })), new e.Ruleset([], [])
        }, permute: function (e) {
            if (e.length === 0)return[];
            if (e.length === 1)return e[0];
            var t = [], n = this.permute(e.slice(1));
            for (var r = 0; r < n.length; r++)for (var i = 0; i < e[0].length; i++)t.push([e[0][i]].concat(n[r]));
            return t
        }, bubbleSelectors: function (t) {
            this.ruleset = new e.Ruleset(t.slice(0), [this.ruleset])
        }}
    }(n("../tree")), function (e) {
        e.mixin = {}, e.mixin.Call = function (t, n, r, i, s) {
            this.selector = new e.Selector(t), this.arguments = n, this.index = r, this.filename = i, this.important = s
        }, e.mixin.Call.prototype = {eval: function (t) {
            var n, r, i, s = [], o = !1, u, a, f, l, c;
            i = this.arguments && this.arguments.map(function (e) {
                return{name: e.name, value: e.value.eval(t)}
            });
            for (u = 0; u < t.frames.length; u++)if ((n = t.frames[u].find(this.selector)).length > 0) {
                c = !0;
                for (a = 0; a < n.length; a++) {
                    r = n[a], l = !1;
                    for (f = 0; f < t.frames.length; f++)if (!(r instanceof e.mixin.Definition) && r === (t.frames[f].originalRuleset || t.frames[f])) {
                        l = !0;
                        break
                    }
                    if (l)continue;
                    if (r.matchArgs(i, t)) {
                        if (!r.matchCondition || r.matchCondition(i, t))try {
                            Array.prototype.push.apply(s, r.eval(t, i, this.important).rules)
                        } catch (h) {
                            throw{message: h.message, index: this.index, filename: this.filename, stack: h.stack}
                        }
                        o = !0
                    }
                }
                if (o)return s
            }
            throw c ? {type: "Runtime", message: "No matching definition was found for `" + this.selector.toCSS().trim() + "(" + (i ? i.map(function (e) {
                var t = "";
                return e.name && (t += e.name + ":"), e.value.toCSS ? t += e.value.toCSS() : t += "???", t
            }).join(", ") : "") + ")`", index: this.index, filename: this.filename} : {type: "Name", message: this.selector.toCSS().trim() + " is undefined", index: this.index, filename: this.filename}
        }}, e.mixin.Definition = function (t, n, r, i, s) {
            this.name = t, this.selectors = [new e.Selector([new e.Element(null, t)])], this.params = n, this.condition = i, this.variadic = s, this.arity = n.length, this.rules = r, this._lookups = {}, this.required = n.reduce(function (e, t) {
                return!t.name || t.name && !t.value ? e + 1 : e
            }, 0), this.parent = e.Ruleset.prototype, this.frames = []
        }, e.mixin.Definition.prototype = {toCSS: function () {
            return""
        }, variable: function (e) {
            return this.parent.variable.call(this, e)
        }, variables: function () {
            return this.parent.variables.call(this)
        }, find: function () {
            return this.parent.find.apply(this, arguments)
        }, rulesets: function () {
            return this.parent.rulesets.apply(this)
        }, evalParams: function (t, n, r, i) {
            var s = new e.Ruleset(null, []), o, u, a = this.params.slice(0), f, l, c, h, p, d;
            if (r) {
                r = r.slice(0);
                for (f = 0; f < r.length; f++) {
                    u = r[f];
                    if (h = u && u.name) {
                        p = !1;
                        for (l = 0; l < a.length; l++)if (!i[l] && h === a[l].name) {
                            i[l] = u.value.eval(t), s.rules.unshift(new e.Rule(h, u.value.eval(t))), p = !0;
                            break
                        }
                        if (p) {
                            r.splice(f, 1), f--;
                            continue
                        }
                        throw{type: "Runtime", message: "Named argument for " + this.name + " " + r[f].name + " not found"}
                    }
                }
            }
            d = 0;
            for (f = 0; f < a.length; f++) {
                if (i[f])continue;
                u = r && r[d];
                if (h = a[f].name)if (a[f].variadic && r) {
                    o = [];
                    for (l = d; l < r.length; l++)o.push(r[l].value.eval(t));
                    s.rules.unshift(new e.Rule(h, (new e.Expression(o)).eval(t)))
                } else {
                    c = u && u.value;
                    if (c)c = c.eval(t); else {
                        if (!a[f].value)throw{type: "Runtime", message: "wrong number of arguments for " + this.name + " (" + r.length + " for " + this.arity + ")"};
                        c = a[f].value.eval(n)
                    }
                    s.rules.unshift(new e.Rule(h, c)), i[f] = c
                }
                if (a[f].variadic && r)for (l = d; l < r.length; l++)i[l] = r[l].value.eval(t);
                d++
            }
            return s
        }, eval: function (t, n, r) {
            var i = [], s = this.frames.concat(t.frames), o = this.evalParams(t, {frames: s}, n, i), u, a, f, l;
            return o.rules.unshift(new e.Rule("@arguments", (new e.Expression(i)).eval(t))), a = r ? this.parent.makeImportant.apply(this).rules : this.rules.slice(0), l = (new e.Ruleset(null, a)).eval({frames: [this, o].concat(s)}), l.originalRuleset = this, l
        }, matchCondition: function (e, t) {
            return this.condition && !this.condition.eval({frames: [this.evalParams(t, {frames: this.frames.concat(t.frames)}, e, [])].concat(t.frames)}) ? !1 : !0
        }, matchArgs: function (e, t) {
            var n = e && e.length || 0, r, i;
            if (!this.variadic) {
                if (n < this.required)return!1;
                if (n > this.params.length)return!1;
                if (this.required > 0 && n > this.params.length)return!1
            }
            r = Math.min(n, this.arity);
            for (var s = 0; s < r; s++)if (!this.params[s].name && !this.params[s].variadic && e[s].value.eval(t).toCSS() != this.params[s].value.eval(t).toCSS())return!1;
            return!0
        }}
    }(n("../tree")), function (e) {
        e.Operation = function (e, t) {
            this.op = e.trim(), this.operands = t
        }, e.Operation.prototype.eval = function (t) {
            var n = this.operands[0].eval(t), r = this.operands[1].eval(t), i;
            if (n instanceof e.Dimension && r instanceof e.Color) {
                if (this.op !== "*" && this.op !== "+")throw{name: "OperationError", message: "Can't substract or divide a color from a number"};
                i = r, r = n, n = i
            }
            if (!n.operate)throw{name: "OperationError", message: "Operation on an invalid type"};
            return n.operate(this.op, r)
        }, e.operate = function (e, t, n) {
            switch (e) {
                case"+":
                    return t + n;
                case"-":
                    return t - n;
                case"*":
                    return t * n;
                case"/":
                    return t / n
            }
        }
    }(n("../tree")), function (e) {
        e.Paren = function (e) {
            this.value = e
        }, e.Paren.prototype = {toCSS: function (e) {
            return"(" + this.value.toCSS(e) + ")"
        }, eval: function (t) {
            return new e.Paren(this.value.eval(t))
        }}
    }(n("../tree")), function (e) {
        e.Quoted = function (e, t, n, r) {
            this.escaped = n, this.value = t || "", this.quote = e.charAt(0), this.index = r
        }, e.Quoted.prototype = {toCSS: function () {
            return this.escaped ? this.value : this.quote + this.value + this.quote
        }, eval: function (t) {
            var n = this, r = this.value.replace
            (/`([^`]+)`/g,function (r, i) {
                return(new e.JavaScript(i, n.index, !0)).eval(t).value
            }).replace(/@\{([\w-]+)\}/g, function (r, i) {
                    var s = (new e.Variable("@" + i, n.index)).eval(t);
                    return s instanceof e.Quoted ? s.value : s.toCSS()
                });
            return new e.Quoted(this.quote + r + this.quote, r, this.escaped, this.index)
        }, compare: function (e) {
            if (!e.toCSS)return-1;
            var t = this.toCSS(), n = e.toCSS();
            return t === n ? 0 : t < n ? -1 : 1
        }}
    }(n("../tree")), function (e) {
        e.Ratio = function (e) {
            this.value = e
        }, e.Ratio.prototype = {toCSS: function (e) {
            return this.value
        }, eval: function () {
            return this
        }}
    }(n("../tree")), function (e) {
        e.Rule = function (t, n, r, i, s) {
            this.name = t, this.value = n instanceof e.Value ? n : new e.Value([n]), this.important = r ? " " + r.trim() : "", this.index = i, this.inline = s || !1, t.charAt(0) === "@" ? this.variable = !0 : this.variable = !1
        }, e.Rule.prototype.toCSS = function (e) {
            return this.variable ? "" : this.name + (e.compress ? ":" : ": ") + this.value.toCSS(e) + this.important + (this.inline ? "" : ";")
        }, e.Rule.prototype.eval = function (t) {
            return new e.Rule(this.name, this.value.eval(t), this.important, this.index, this.inline)
        }, e.Rule.prototype.makeImportant = function () {
            return new e.Rule(this.name, this.value, "!important", this.index, this.inline)
        }, e.Shorthand = function (e, t) {
            this.a = e, this.b = t
        }, e.Shorthand.prototype = {toCSS: function (e) {
            return this.a.toCSS(e) + "/" + this.b.toCSS(e)
        }, eval: function () {
            return this
        }}
    }(n("../tree")), function (e) {
        e.Ruleset = function (e, t, n) {
            this.selectors = e, this.rules = t, this._lookups = {}, this.strictImports = n
        }, e.Ruleset.prototype = {eval: function (t) {
            var n = this.selectors && this.selectors.map(function (e) {
                return e.eval(t)
            }), r = new e.Ruleset(n, this.rules.slice(0), this.strictImports), i;
            r.originalRuleset = this, r.root = this.root, r.allowImports = this.allowImports, this.debugInfo && (r.debugInfo = this.debugInfo), t.frames.unshift(r), (r.root || r.allowImports || !r.strictImports) && r.evalImports(t);
            for (var s = 0; s < r.rules.length; s++)r.rules[s]instanceof e.mixin.Definition && (r.rules[s].frames = t.frames.slice(0));
            var o = t.mediaBlocks && t.mediaBlocks.length || 0;
            for (var s = 0; s < r.rules.length; s++)r.rules[s]instanceof e.mixin.Call && (i = r.rules[s].eval(t), r.rules.splice.apply(r.rules, [s, 1].concat(i)), s += i.length - 1, r.resetCache());
            for (var s = 0, u; s < r.rules.length; s++)u = r.rules[s], u instanceof e.mixin.Definition || (r.rules[s] = u.eval ? u.eval(t) : u);
            t.frames.shift();
            if (t.mediaBlocks)for (var s = o; s < t.mediaBlocks.length; s++)t.mediaBlocks[s].bubbleSelectors(n);
            return r
        }, evalImports: function (t) {
            var n, r;
            for (n = 0; n < this.rules.length; n++)this.rules[n]instanceof e.Import && (r = this.rules[n].eval(t), typeof r.length == "number" ? (this.rules.splice.apply(this.rules, [n, 1].concat(r)), n += r.length - 1) : this.rules.splice(n, 1, r), this.resetCache())
        }, makeImportant: function () {
            return new e.Ruleset(this.selectors, this.rules.map(function (e) {
                return e.makeImportant ? e.makeImportant() : e
            }), this.strictImports)
        }, matchArgs: function (e) {
            return!e || e.length === 0
        }, resetCache: function () {
            this._rulesets = null, this._variables = null, this._lookups = {}
        }, variables: function () {
            return this._variables ? this._variables : this._variables = this.rules.reduce(function (t, n) {
                return n instanceof e.Rule && n.variable === !0 && (t[n.name] = n), t
            }, {})
        }, variable: function (e) {
            return this.variables()[e]
        }, rulesets: function () {
            return this._rulesets ? this._rulesets : this._rulesets = this.rules.filter(function (t) {
                return t instanceof e.Ruleset || t instanceof e.mixin.Definition
            })
        }, find: function (t, n) {
            n = n || this;
            var r = [], i, s, o = t.toCSS();
            return o in this._lookups ? this._lookups[o] : (this.rulesets().forEach(function (i) {
                if (i !== n)for (var o = 0; o < i.selectors.length; o++)if (s = t.match(i.selectors[o])) {
                    t.elements.length > i.selectors[o].elements.length ? Array.prototype.push.apply(r, i.find(new e.Selector(t.elements.slice(1)), n)) : r.push(i);
                    break
                }
            }), this._lookups[o] = r)
        }, toCSS: function (t, n) {
            var r = [], i = [], s = [], o = [], u = [], a, f, l;
            this.root || this.joinSelectors(u, t, this.selectors);
            for (var c = 0; c < this.rules.length; c++) {
                l = this.rules[c];
                if (l.rules || l instanceof e.Media)o.push(l.toCSS(u, n)); else if (l instanceof e.Directive) {
                    var h = l.toCSS(u, n);
                    if (l.name === "@charset") {
                        if (n.charset) {
                            l.debugInfo && (o.push(e.debugInfo(n, l)), o.push((new e.Comment("/* " + h.replace(/\n/g, "") + " */\n")).toCSS(n)));
                            continue
                        }
                        n.charset = !0
                    }
                    o.push(h)
                } else l instanceof e.Comment ? l.silent || (this.root ? o.push(l.toCSS(n)) : i.push(l.toCSS(n))) : l.toCSS && !l.variable ? i.push(l.toCSS(n)) : l.value && !l.variable && i.push(l.value.toString())
            }
            o = o.join("");
            if (this.root)r.push(i.join(n.compress ? "" : "\n")); else if (i.length > 0) {
                f = e.debugInfo(n, this), a = u.map(function (e) {
                    return e.map(function (e) {
                        return e.toCSS(n)
                    }).join("").trim()
                }).join(n.compress ? "," : ",\n");
                for (var c = i.length - 1; c >= 0; c--)s.indexOf(i[c]) === -1 && s.unshift(i[c]);
                i = s, r.push(f + a + (n.compress ? "{" : " {\n  ") + i.join(n.compress ? "" : "\n  ") + (n.compress ? "}" : "\n}\n"))
            }
            return r.push(o), r.join("") + (n.compress ? "\n" : "")
        }, joinSelectors: function (e, t, n) {
            for (var r = 0; r < n.length; r++)this.joinSelector(e, t, n[r])
        }, joinSelector: function (t, n, r) {
            var i, s, o, u, a, f, l, c, h, p, d, v, m, g, y;
            for (i = 0; i < r.elements.length; i++)f = r.elements[i], f.value === "&" && (u = !0);
            if (!u) {
                if (n.length > 0)for (i = 0; i < n.length; i++)t.push(n[i].concat(r)); else t.push([r]);
                return
            }
            g = [], a = [
                []
            ];
            for (i = 0; i < r.elements.length; i++) {
                f = r.elements[i];
                if (f.value !== "&")g.push(f); else {
                    y = [], g.length > 0 && this.mergeElementsOnToSelectors(g, a);
                    for (s = 0; s < a.length; s++) {
                        l = a[s];
                        if (n.length == 0)l.length > 0 && (l[0].elements = l[0].elements.slice(0), l[0].elements.push(new e.Element(f.combinator, "", 0))), y.push(l); else for (o = 0; o < n.length; o++)c = n[o], h = [], p = [], v = !0, l.length > 0 ? (h = l.slice(0), m = h.pop(), d = new e.Selector(m.elements.slice(0)), v = !1) : d = new e.Selector([]), c.length > 1 && (p = p.concat(c.slice(1))), c.length > 0 && (v = !1, d.elements.push(new e.Element(f.combinator, c[0].elements[0].value, 0)), d.elements = d.elements.concat(c[0].elements.slice(1))), v || h.push(d), h = h.concat(p), y.push(h)
                    }
                    a = y, g = []
                }
            }
            g.length > 0 && this.mergeElementsOnToSelectors(g, a);
            for (i = 0; i < a.length; i++)t.push(a[i])
        }, mergeElementsOnToSelectors: function (t, n) {
            var r, i;
            if (n.length == 0) {
                n.push([new e.Selector(t)]);
                return
            }
            for (r = 0; r < n.length; r++)i = n[r], i.length > 0 ? i[i.length - 1] = new e.Selector(i[i.length - 1].elements.concat(t)) : i.push(new e.Selector(t))
        }}
    }(n("../tree")), function (e) {
        e.Selector = function (e) {
            this.elements = e
        }, e.Selector.prototype.match = function (e) {
            var t = this.elements, n = t.length, r, i, s, o;
            r = e.elements.slice(e.elements.length && e.elements[0].value === "&" ? 1 : 0), i = r.length, s = Math.min(n, i);
            if (i === 0 || n < i)return!1;
            for (o = 0; o < s; o++)if (t[o].value !== r[o].value)return!1;
            return!0
        }, e.Selector.prototype.eval = function (t) {
            return new e.Selector(this.elements.map(function (e) {
                return e.eval(t)
            }))
        }, e.Selector.prototype.toCSS = function (e) {
            return this._css ? this._css : (this.elements[0].combinator.value === "" ? this._css = " " : this._css = "", this._css += this.elements.map(function (t) {
                return typeof t == "string" ? " " + t.trim() : t.toCSS(e)
            }).join(""), this._css)
        }
    }(n("../tree")), function (e) {
        e.UnicodeDescriptor = function (e) {
            this.value = e
        }, e.UnicodeDescriptor.prototype = {toCSS: function (e) {
            return this.value
        }, eval: function () {
            return this
        }}
    }(n("../tree")), function (e) {
        e.URL = function (e, t) {
            this.value = e, this.rootpath = t
        }, e.URL.prototype = {toCSS: function () {
            return"url(" + this.value.toCSS() + ")"
        }, eval: function (t) {
            var n = this.value.eval(t), r;
            return typeof n.value == "string" && !/^(?:[a-z-]+:|\/)/.test(n.value) && (r = this.rootpath, n.quote || (r = r.replace(/[\(\)'"\s]/g, function (e) {
                return"\\" + e
            })), n.value = r + n.value), new e.URL(n, this.rootpath)
        }}
    }(n("../tree")), function (e) {
        e.Value = function (e) {
            this.value = e, this.is = "value"
        }, e.Value.prototype = {eval: function (t) {
            return this.value.length === 1 ? this.value[0].eval(t) : new e.Value(this.value.map(function (e) {
                return e.eval(t)
            }))
        }, toCSS: function (e) {
            return this.value.map(function (t) {
                return t.toCSS(e)
            }).join(e.compress ? "," : ", ")
        }}
    }(n("../tree")), function (e) {
        e.Variable = function (e, t, n) {
            this.name = e, this.index = t, this.file = n
        }, e.Variable.prototype = {eval: function (t) {
            var n, r, i = this.name;
            i.indexOf("@@") == 0 && (i = "@" + (new e.Variable(i.slice(1))).eval(t).value);
            if (this.evaluating)throw{type: "Name", message: "Recursive variable definition for " + i, filename: this.file, index: this.index};
            this.evaluating = !0;
            if (n = e.find(t.frames, function (e) {
                if (r = e.variable(i))return r.value.eval(t)
            }))return this.evaluating = !1, n;
            throw{type: "Name", message: "variable " + i + " is undefined", filename: this.file, index: this.index}
        }}
    }(n("../tree")), function (e) {
        e.debugInfo = function (t, n) {
            var r = "";
            if (t.dumpLineNumbers && !t.compress)switch (t.dumpLineNumbers) {
                case"comments":
                    r = e.debugInfo.asComment(n);
                    break;
                case"mediaquery":
                    r = e.debugInfo.asMediaQuery(n);
                    break;
                case"all":
                    r = e.debugInfo.asComment(n) + e.debugInfo.asMediaQuery(n)
            }
            return r
        }, e.debugInfo.asComment = function (e) {
            return"/* line " + e.debugInfo.lineNumber + ", " + e.debugInfo.fileName + " */\n"
        }, e.debugInfo.asMediaQuery = function (e) {
            return"@media -sass-debug-info{filename{font-family:" + ("file://" + e.debugInfo.fileName).replace(/[\/:.]/g, "\\$&") + "}line{font-family:\\00003" + e.debugInfo.lineNumber + "}}\n"
        }, e.find = function (e, t) {
            for (var n = 0, r; n < e.length; n++)if (r = t.call(e, e[n]))return r;
            return null
        }, e.jsify = function (e) {
            return Array.isArray(e.value) && e.value.length > 1 ? "[" + e.value.map(function (e) {
                return e.toCSS(!1)
            }).join(", ") + "]" : e.toCSS(!1)
        }
    }(n("./tree"));
    var b = /^(file|chrome(-extension)?|resource|qrc|app):/.test(location.protocol);
    m.env = m.env || (location.hostname == "127.0.0.1" || location.hostname == "0.0.0.0" || location.hostname == "localhost" || location.port.length > 0 || b ? "development" : "production"), m.async = m.async || !1, m.fileAsync = m.fileAsync || !1, m.poll = m.poll || (b ? 1e3 : 1500);
    if (m.functions)for (var w in m.functions)m.tree.functions[w] = m.functions[w];
    var E = /!dumpLineNumbers:(comments|mediaquery|all)/.exec(location.hash);
    E && (m.dumpLineNumbers = E[1]), m.watch = function () {
        return m.watchMode || (m.env = "development", r()), this.watchMode = !0
    }, m.unwatch = function () {
        return clearInterval(m.watchTimer), this.watchMode = !1
    }, /!watch/.test(location.hash) && m.watch();
    var S = null;
    if (m.env != "development")try {
        S = typeof e.localStorage == "undefined" ? null : e.localStorage
    } catch (x) {
    }
    var T = document.getElementsByTagName("link"), N = /^text\/(x-)?less$/;
    m.sheets = [];
    for (var C = 0; C < T.length; C++)(T[C].rel === "stylesheet/less" || T[C].rel.match(/stylesheet/) && T[C].type.match(N)) && m.sheets.push(T[C]);
    var k = "";
    m.modifyVars = function (e) {
        var t = k;
        for (name in e)t += (name.slice(0, 1) === "@" ? "" : "@") + name + ": " + (e[name].slice(-1) === ";" ? e[name] : e[name] + ";");
        (new m.Parser).parse(t, function (e, t) {
            l(t.toCSS(), m.sheets[m.sheets.length - 1])
        })
    }, m.refresh = function (e) {
        var t, n;
        t = n = new Date, s(function (e, r, i, s, o) {
            o.local ? d("loading " + s.href + " from cache.") : (d("parsed " + s.href + " successfully."), l(r.toCSS(), s, o.lastModified)), d("css for " + s.href + " generated in " + (new Date - n) + "ms"), o.remaining === 0 && d("css generated in " + (new Date - t) + "ms"), n = new Date
        }, e), i()
    }, m.refreshStyles = i, m.refresh(m.env === "development"), typeof define == "function" && define.amd && define("less", [], function () {
        return m
    })
}(window), function (e) {
    var t;
    return e.event.fix = function (e) {
        return function (t) {
            t = e.apply(this, arguments);
            if (t.type.indexOf("copy") === 0 || t.type.indexOf("paste") === 0)t.clipboardData = t.originalEvent.clipboardData;
            return t
        }
    }(e.event.fix), t = {callback: e.noop, matchType: /image.*/}, e.fn.pasteImageReader = function (n) {
        return typeof n == "function" && (n = {callback: n}), n = e.extend({}, t, n), this.each(function () {
            var t, r;
            return r = this, t = e(this), t.bind("paste", function (e) {
                var t, i;
                return i = !1, t = e.clipboardData, Array.prototype.forEach.call(t.types, function (e, s) {
                    var o, u;
                    if (i)return;
                    if (e.match(n.matchType) || t.items[s].type.match(n.matchType))return o = t.items[s].getAsFile(), u = new FileReader, u.onload = function (e) {
                        return n.callback.call(r, {dataURL: e.target.result, event: e, file: o, name: o.name})
                    }, u.readAsDataURL(o), i = !0
                })
            })
        })
    }
}(jQuery);