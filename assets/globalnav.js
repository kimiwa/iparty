if (typeof(AC) == "undefined") {
    AC = {}
}
document.createElement("nav");
AC.addEvent = function(b, a, c) {
    if (b.addEventListener) {
        return b.addEventListener(a, c, false)
    } else {
        return b.attachEvent("on" + a, c)
    }
};
AC.removeEvent = function(b, a, c) {
    if (b.removeEventListener) {
        return b.removeEventListener(a, c, false)
    } else {
        return b.detachEvent("on" + a, c)
    }
};
AC.removeClassName = function(a, b) {
    b = new RegExp(b, "g");
    a.className = a.className.replace(b, "").replace(/ +/g, " ").replace(/ +$/gm, "").replace(/^ +/gm, "")
};
AC.getPreviousSibling = function(a) {
    while (a = a.previousSibling) {
        if (a.nodeType == 1) {
            return a
        }
    }
};
if (typeof(AC.Detector) == "undefined") {
    AC.Detector = {
        _iOSVersion: null,
        iOSVersion: function() {
            if (this._iOSVersion === null) {
                this._iOSVersion = (navigator.userAgent.match(/applewebkit/i) && (navigator.platform.match(/iphone/i) || navigator.platform.match(/ipod/i) || navigator.platform.match(/ipad/i))) ? parseFloat(navigator.userAgent.match(/os ([\d_]*)/i)[1].replace("_", ".")) : false
            }
            return this._iOSVersion
        },
        _svgAsBackground: null,
        svgAsBackground: function(c) {
            if (this._svgAsBackground === null) {
                var b = function() {
                    AC.Detector._svgAsBackground = true;
                    if (typeof(c) == "function") {
                        c()
                    }
                };
                var a = document.createElement("img");
                a.setAttribute("src", "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNzUiIGhlaWdodD0iMjc1Ij48L3N2Zz4%3D");
                if (a.complete) {
                    a.style.visibility = "hidden";
                    a.style.position = "absolute";
                    document.body.appendChild(a);
                    window.setTimeout(function() {
                        AC.Detector._svgAsBackground = false;
                        if (a.width >= 100) {
                            document.body.removeChild(a);
                            b()
                        } else {
                            document.body.removeChild(a)
                        }
                    },
                    1)
                } else {
                    this._svgAsBackground = false;
                    a.onload = b
                }
            } else {
                if (this._svgAsBackground && typeof(c) == "function") {
                    c()
                }
            }
            return this._svgAsBackground
        },
        _style: null,
        _prefixes: null,
        _preFixes: null,
        _css: null,
        isCSSAvailable: function(k) {
            if (!this._style) {
                this._style = document.createElement("browserdetect").style
            }
            if (!this._prefixes) {
                this._prefixes = "-webkit- -moz- -o- -ms- -khtml- ".split(" ")
            }
            if (!this._preFixes) {
                this._preFixes = "Webkit Moz O ms Khtml ".split(" ")
            }
            if (!this._css) {
                this._css = {}
            }
            k = k.replace(/([A-Z]+)([A-Z][a-z])/g, "$1-$2").replace(/([a-z\d])([A-Z])/g, "$1-$2").replace(/^(\-*webkit|\-*moz|\-*o|\-*ms|\-*khtml)\-/, "").toLowerCase();
            switch (k) {
            case "gradient":
                if (this._css.gradient !== undefined) {
                    return this._css.gradient
                }
                var k = "background-image:",
                g = "gradient(linear,left top,right bottom,from(#9f9),to(white));",
                f = "linear-gradient(left top,#9f9, white);";
                this._style.cssText = (k + this._prefixes.join(g + k) + this._prefixes.join(f + k)).slice(0, -k.length);
                this._css.gradient = (this._style.backgroundImage.indexOf("gradient") !== -1);
                return this._css.gradient;
            case "inset-box-shadow":
                if (this._css["inset-box-shadow"] !== undefined) {
                    return this._css["inset-box-shadow"]
                }
                var k = "box-shadow:",
                h = "#fff 0 1px 1px inset;";
                this._style.cssText = this._prefixes.join(k + h);
                this._css["inset-box-shadow"] = (this._style.cssText.indexOf("inset") !== -1);
                return this._css["inset-box-shadow"];
            default:
                var e = k.split("-"),
                a = e.length,
                d,
                c,
                b;
                if (e.length > 0) {
                    k = e[0];
                    for (c = 1; c < a; c++) {
                        k += e[c].substr(0, 1).toUpperCase() + e[c].substr(1)
                    }
                }
                d = k.substr(0, 1).toUpperCase() + k.substr(1);
                if (this._css[k] !== undefined) {
                    return this._css[k]
                }
                for (b = this._preFixes.length - 1; b >= 0; b--) {
                    if (this._style[this._preFixes[b] + k] !== undefined || this._style[this._preFixes[b] + d] !== undefined) {
                        this._css[k] = true;
                        return true
                    }
                }
                return false
            }
            return false
        }
    }
}
AC.GlobalNav = function() {
    var a = this,
    b;
    this.globalHeader = document.getElementById("globalheader");
    this.globalSearch = document.getElementById("sp-searchtext");
    this.globalStylesheet = document.getElementById("globalheader-stylesheet");
    if (this.globalHeader) {
        this.globalHeader.className += " globalheader-js";
        AC.Detector.svgAsBackground(function() {
            a.globalHeader.className += " svg"
        });
        if (navigator.userAgent.match(/applewebkit/i)) {
            if (!navigator.geolocation) {
                this.globalHeader.className += " decelerate"
            } else {
                if (navigator.platform.match(/ipad/i) || navigator.platform.match(/iphone/i) || navigator.platform.match(/ipod/i)) {
                    this.globalHeader.className += " ios"
                }
            }
            if (AC.Detector.iOSVersion() && AC.Detector.iOSVersion() <= 3.2) {
                this.globalHeader.className += " ios3"
            }
            if (!AC.Detector.isCSSAvailable("inset-box-shadow") || navigator.userAgent.match(/chrome/i) && navigator.userAgent.match(/windows/i)) {
                this.globalHeader.className += " noinset"
            }
        }
        this.vml();
        this.decorateTabStates();
        if (AC.GlobalNav.canEnhance() && this.globalStylesheet) {
            this.enhancedGlobalStylesheet = this.globalStylesheet.cloneNode(true);
            this.enhancedGlobalStylesheet.id = "globalheader-enhanced-stylesheet";
            this.enhancedGlobalStylesheet.href = this.globalStylesheet.href.replace("/navigation.css", "/enhanced.css");
            this.globalStylesheet.parentNode.appendChild(this.enhancedGlobalStylesheet)
        }
        this.loaded()
    }
};
AC.GlobalNav._canEnhance = null;
AC.GlobalNav.canEnhance = function() {
    if (AC.GlobalNav.canEnhance._canEnhance == null) {
        var a = navigator.userAgent.replace(/^.*version\/([\d\.]*) .*$/i, "$1").split(".");
        AC.GlobalNav.canEnhance._canEnhance = (AC.Detector.isCSSAvailable("transition-property") && AC.Detector.isCSSAvailable("gradient") && (AC.Detector.iOSVersion() === false || AC.Detector.iOSVersion() >= 3.2) && !(navigator.userAgent.match(/applewebkit/i) && a.length == 3 && (a[0] <= 4 && a[1] <= 0 && a[2] <= 2)))
    }
    return AC.GlobalNav.canEnhance._canEnhance
};
AC.GlobalNav.prototype.vml = function() {
    var e,
    a,
    c,
    b,
    d;
    if (!AC.Detector.isCSSAvailable("border-radius") && document.namespaces && this.globalHeader) {
        document.namespaces.add("v", "urn:schemas-microsoft-com:vml");
        e = document.createDocumentFragment();
        a = document.createElement("v:roundrect");
        a.setAttribute("id", "globalheader-roundrect");
        a.setAttribute("stroked", true);
        a.setAttribute("strokeColor", "#737373");
        a.setAttribute("arcSize", ".1");
        e.appendChild(a);
        c = this.globalHeader.currentStyle.backgroundImage;
        this.globalHeader.style.backgroundImage = "none";
        c = c.replace(/url\(["']*([^"']*)["']*\)/, "$1");
        b = document.createElement("v:fill");
        b.setAttribute("id", "globalheader-fill");
        b.setAttribute("type", "tile");
        b.setAttribute("src", c);
        a.appendChild(b);
        d = document.createElement("v:roundrect");
        d.setAttribute("id", "globalheader-shadow");
        d.setAttribute("stroked", false);
        d.setAttribute("fillColor", "#999");
        d.setAttribute("arcSize", ".1");
        e.appendChild(d);
        this.globalHeader.appendChild(e)
    }
};
AC.GlobalNav.prototype.getPreviousNavItem = function(a) {
    while (a.tagName.toLowerCase() !== "li") {
        a = a.parentNode
    }
    a = AC.getPreviousSibling(a);
    if (!a) {
        return false
    }
    if (a.tagName.toLowerCase() !== "li") {
        return false
    }
    a = a.getElementsByTagName("a");
    if (!a[0]) {
        return false
    }
    return a[0]
};
AC.GlobalNav.prototype.decorateTabStates = function() {
    this.globalNavItems = this.globalHeader.getElementsByTagName("a");
    var a = this,
    c = this.globalHeader.className.replace(/ .*/, ""),
    b;
    for (b = this.globalNavItems.length - 1;
    b >= 0; b--) {
        if (this.globalNavItems[b].href.match(c)) {
            this.currentTab = this.globalNavItems[b]
        }
        AC.addEvent(this.globalNavItems[b], "mousedown",
        function(d) {
            var e = (d.target) ? d.target: d.srcElement;
            e = a.getPreviousNavItem(e);
            if (e && e !== a.currentTab) {
                e.className += " before"
            }
        });
        AC.addEvent(this.globalNavItems[b], "mouseout",
        function(d) {
            var e = (d.target) ? d.target: d.srcElement;
            e = a.getPreviousNavItem(e);
            if (e && e !== a.currentTab) {
                AC.removeClassName(e, "before")
            }
        })
    }
    if (this.currentTab) {
        this.currentTab = this.getPreviousNavItem(this.currentTab);
        this.currentTab.className += " before"
    }
};
AC.GlobalNav.prototype.loaded = function(b) {
    var a = this;
    if (this.loadedTimeout) {
        window.clearTimeout(this.loadedTimeout)
    }
    if (!this.cancelLoadedTimeout) {
        this.cancelLoadedTimeout = window.setTimeout(function() {
            a.loaded(true)
        },
        500)
    }
    if (!this.testEnhancedLoaded) {
        this.testEnhancedLoaded = document.createElement("div");
        this.testEnhancedLoaded.id = "globalheader-loaded-test";
        document.body.appendChild(this.testEnhancedLoaded)
    }
    if (b || this.testEnhancedLoaded.offsetWidth == 0) {
        this.globalHeader.className += " globalheader-loaded"
    } else {
        this.loadedTimeout = window.setTimeout(function() {
            a.loaded()
        },
        10)
    }
};

