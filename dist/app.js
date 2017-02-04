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
            this._childrenInitialized = false;
            this._childControlsCreated = false;
            this._domInitialzed = false;
            this._domCreated = false;
        }
        Object.defineProperty(Control.prototype, "enabled", {
            get: function () {
                if (this._parent) {
                    return this._enabled && this._parent.enabled;
                }
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
        Control.addChildToDom = function (element, control) {
            element.append(control.getDomElement());
        };
        Object.defineProperty(Control.prototype, "visible", {
            get: function () {
                return this._visible;
            },
            //        public get children(): Array<Control> {
            //            return this._children;
            //        }
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
        // virtual
        Control.prototype.setValue = function (v) { };
        Control.prototype.init = function (p) {
            this._page = p;
            this.ensureChildControls();
            this._childrenInitialized = true;
            this._children.forEach(function (c) {
                c.init(p);
            });
        };
        Control.prototype.ensureChildControls = function () {
            if (!this._childControlsCreated) {
                this.createChildControls();
                this._childControlsCreated = true;
            }
        };
        // virtual
        Control.prototype.createChildControls = function () {
        };
        Control.prototype.rebuildDom = function () {
            if (this.domCreated) {
                var parent_1 = this._element.parents(':first');
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
            if (this._childrenInitialized) {
                control.init(this._page);
            }
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
            return $('<div>');
        };
        Control.prototype.initDomElement = function (element) {
            if (!this.visible) {
                element.hide();
            }
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
            _this._inner = typeof html === 'string' ? $(html) : html;
            return _this;
        }
        Object.defineProperty(LiteralControl.prototype, "html", {
            get: function () {
                return this._inner[0].outerHTML;
            },
            set: function (v) {
                if (typeof v === 'string') {
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
    var Page = (function (_super) {
        __extends(Page, _super);
        function Page() {
            return _super.call(this) || this;
        }
        Page.prototype.initPage = function () {
            var _this = this;
            this._children.forEach(function (c) { return c.init(_this); });
        };
        return Page;
    }(Controls.Control));
    Controls.Page = Page;
})(Controls || (Controls = {}));
var Controls;
(function (Controls) {
    var PageManager = (function () {
        function PageManager() {
        }
        PageManager.getRoot = function () {
            if (!PageManager._root) {
                PageManager._root = new Controls.Page();
            }
            return PageManager._root;
        };
        PageManager.init = function () {
            PageManager.getRoot().initPage();
        };
        return PageManager;
    }());
    Controls.PageManager = PageManager;
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
                _this.addChild(typeof c === 'string' ? new Controls.LiteralControl($(c)) : c);
            });
            return _this;
        }
        Panel.prototype.createDOMElement = function () {
            return $('<div/>');
        };
        return Panel;
    }(Controls.Control));
    Controls.Panel = Panel;
})(Controls || (Controls = {}));
var Form;
(function (Form) {
    var FieldControl = (function (_super) {
        __extends(FieldControl, _super);
        function FieldControl(id, label) {
            var _this = _super.call(this, id) || this;
            _this.label = label;
            _this._hasInputControl = false;
            return _this;
        }
        FieldControl.prototype.setInputValue = function (v) {
            this.getDomElement().val(v);
        };
        FieldControl.prototype.getInputValue = function () {
            return this.getDomElement().val();
        };
        FieldControl.prototype.setReadOnlyValue = function (v) {
            this.getDomElement().text(v === null ? '' : v);
        };
        FieldControl.prototype.initDomElement = function (element) {
            _super.prototype.initDomElement.call(this, element);
            this._hasInputControl = this.enabled;
            if (this._hasInputControl) {
                this.setInputValue(this._fieldValue);
            }
            else {
                this.setReadOnlyValue(this._fieldValue);
            }
        };
        // override
        FieldControl.prototype.setValue = function (v) {
            this._fieldValue = v;
            this.setInternalValue(v);
        };
        // override
        FieldControl.prototype.getValue = function () {
            return this.getInternalValue();
        };
        FieldControl.prototype.setInternalValue = function (v) {
            if (this.domInitialzed) {
                if (this.enabled) {
                    this.setInputValue(v);
                }
                else {
                    this.setReadOnlyValue(v);
                }
            }
        };
        FieldControl.prototype.getReadOnlyInputValue = function () {
            return this._fieldValue;
        };
        FieldControl.prototype.getInternalValue = function () {
            return this._hasInputControl &&
                this.domInitialzed ? this.getInputValue() : this.getReadOnlyInputValue();
        };
        return FieldControl;
    }(Controls.Control));
    Form.FieldControl = FieldControl;
})(Form || (Form = {}));
var Form;
(function (Form) {
    var TextFieldControl = (function (_super) {
        __extends(TextFieldControl, _super);
        function TextFieldControl(id, label) {
            return _super.call(this, id, label) || this;
        }
        TextFieldControl.prototype.getInputValue = function () {
            return this._input.val();
        };
        TextFieldControl.prototype.setInputValue = function (v) {
            this._input.val(v);
        };
        TextFieldControl.prototype.createDomElement = function () {
            if (this.enabled) {
                return $("<div class='scs-form textbox'>")
                    .append(this._input = $("<input type='text'>"));
            }
            else {
                return $('<span>');
            }
        };
        return TextFieldControl;
    }(Form.FieldControl));
    Form.TextFieldControl = TextFieldControl;
})(Form || (Form = {}));
var Controls;
(function (Controls) {
    var SampleCompositeControl = (function (_super) {
        __extends(SampleCompositeControl, _super);
        function SampleCompositeControl(_container) {
            var _this = _super.call(this, null) || this;
            _this._container = _container;
            return _this;
        }
        SampleCompositeControl.prototype.createDomElement = function () {
            return this._container;
        };
        SampleCompositeControl.prototype.init = function (p) {
            _super.prototype.init.call(this, p);
            this.getDomElement();
        };
        SampleCompositeControl.prototype.setValue = function (v) {
            this._tf.setValue(v);
        };
        SampleCompositeControl.prototype.getValue = function () {
            return this._tf.getValue();
        };
        SampleCompositeControl.prototype.createChildControls = function () {
            this.addChild(new Controls.Panel('<h1>Welcome</h1>', new Controls.LiteralControl('<i>test</i>'), '<b>test</b>', new Controls.Panel('<u>test</u>', '<em>test</em>')));
            this._tf = new Form.TextFieldControl('1', 'Text Field Man');
            this.addChild(this._tf);
        };
        return SampleCompositeControl;
    }(Controls.Control));
    Controls.SampleCompositeControl = SampleCompositeControl;
})(Controls || (Controls = {}));
//# sourceMappingURL=app.js.map