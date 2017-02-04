var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Controls;
(function (Controls) {
    var Control = (function () {
        function Control(_id) {
            if (_id === void 0) { _id = null; }
            this._id = _id;
            this._children = [];
            this._enabled = true;
            this._visible = true;
            this._domInitialzed = false;
            this._domCreated = false;
        }
        Object.defineProperty(Control.prototype, "enabled", {
            get: function () {
                if (this._parent)
                    return this._enabled && this._parent.enabled;
                return this._enabled;
            },
            set: function (v) {
                if (v !== this._enabled) {
                    var temp = this.getValue();
                    this._enabled = v;
                    this.rebuildDom();
                    this.setValue(temp);
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Control.prototype, "visible", {
            get: function () {
                return this._visible;
            },
            set: function (v) {
                this._visible = v;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Control.prototype, "domInitialzed", {
            get: function () {
                return this._domInitialzed;
            },
            set: function (v) {
                this._domInitialzed = v;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Control.prototype, "domCreated", {
            get: function () {
                return this._domCreated;
            },
            set: function (v) {
                this._domCreated = v;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Control.prototype, "parent", {
            get: function () {
                return this._parent;
            },
            set: function (v) {
                this._parent = v;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Control.prototype, "uniqueId", {
            get: function () {
                return this._uniqueId;
            },
            set: function (v) {
                this._uniqueId = v;
            },
            enumerable: true,
            configurable: true
        });
        // virtual
        Control.prototype.getValue = function () {
            return null;
        };
        Control.prototype.setValue = function (v) { };
        Control.prototype.rebuildDom = function () {
            if (this.domCreated) {
                var parent_1 = this._element.parents(":first");
                this.removeFromDom();
                this.resetFlags();
                parent_1.prepend(this.getDomElement());
            }
            else {
                this.resetFlags();
            }
        };
        Control.prototype.removeFromDom = function (remove) {
            if (remove === void 0) { remove = true; }
            this._children.forEach(function (c) { return c.removeFromDom(); });
            if (remove) {
                this._element.remove();
            }
        };
        Control.prototype.resetFlags = function () {
            this._domInitialzed = false;
            this._domCreated = false;
            this._children.forEach(function (c) { return c.resetFlags(); });
        };
        Control.prototype.addChild = function (control) {
            control._parent = this;
            this._children.push(control);
            if (this._domCreated) {
                Control.addChildToDom(this._element, control);
            }
            return control;
        };
        Control.prototype.getDomElement = function () {
            var _this = this;
            if (!this._domCreated) {
                this._element = this.createDomElement();
                this._children.forEach(function (c) { return Control.addChildToDom(_this._element, c); });
                this._domCreated = true;
                this.initDomElement(this._element);
                this._domInitialzed = true;
            }
            return this._element;
        };
        Control.prototype.createDomElement = function () {
            return $("<div>");
        };
        Control.prototype.initDomElement = function (element) {
            if (!this.visible) {
                element.hide();
            }
        };
        Control.addChildToDom = function (element, control) {
            element.append(control.getDomElement());
        };
        return Control;
    }());
    Controls.Control = Control;
})(Controls || (Controls = {}));
var Controls;
(function (Controls) {
    var LiteralControl = (function (_super) {
        __extends(LiteralControl, _super);
        function LiteralControl(html) {
            var _this = _super.call(this, null) || this;
            _this._inner = typeof html === "string" ? $(html) : html;
            return _this;
        }
        Object.defineProperty(LiteralControl.prototype, "html", {
            get: function () {
                return this._inner[0].outerHTML;
            },
            set: function (v) {
                if (typeof v === "string") {
                    this._inner.replaceWith(v);
                }
                else {
                    var replace = $(v);
                    this._inner.replaceWith(replace);
                }
            },
            enumerable: true,
            configurable: true
        });
        LiteralControl.prototype.createDomElement = function () {
            return this._inner;
        };
        return LiteralControl;
    }(Controls.Control));
    Controls.LiteralControl = LiteralControl;
})(Controls || (Controls = {}));
var Controls;
(function (Controls) {
    var Panel = (function (_super) {
        __extends(Panel, _super);
        function Panel() {
            var children = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                children[_i] = arguments[_i];
            }
            var _this = _super.call(this, null) || this;
            children.forEach(function (c) {
                _this.addChild(typeof c === "string" ? new Controls.LiteralControl($(c)) : c);
            });
            return _this;
        }
        return Panel;
    }(Controls.Control));
    Controls.Panel = Panel;
})(Controls || (Controls = {}));
//# sourceMappingURL=app.js.map