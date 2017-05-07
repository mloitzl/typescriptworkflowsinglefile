"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Control {
    constructor(_id = null) {
        this._id = _id;
        this._children = [];
        this._enabled = true;
        this._visible = true;
        this._childrenInitialized = false;
        this._childControlsCreated = false;
        this._domInitialzed = false;
        this._domCreated = false;
    }
    get enabled() {
        if (this._parent) {
            return this._enabled && this._parent.enabled;
        }
        return this._enabled;
    }
    static addChildToDom(element, control) {
        element.append(control.getDomElement());
    }
    set enabled(v) {
        if (v !== this._enabled) {
            const temp = this.getValue();
            this._enabled = v;
            this.rebuildDom();
            this.setValue(temp);
        }
    }
    getValue() {
        throw 'Should be overwritten in FieldControl';
    }
    ;
    setValue(v) {
        throw 'Should be overwritten in FieldControl';
    }
    ;
    get visible() {
        return this._visible;
    }
    //        public get children(): Array<Control> {
    //            return this._children;
    //        }
    set visible(v) {
        this._visible = v;
    }
    get domInitialzed() {
        return this._domInitialzed;
    }
    set domInitialzed(v) {
        this._domInitialzed = v;
    }
    get domCreated() {
        return this._domCreated;
    }
    set domCreated(v) {
        this._domCreated = v;
    }
    get parent() {
        return this._parent;
    }
    set parent(v) {
        this._parent = v;
    }
    get uniqueId() {
        return this._uniqueId;
    }
    set uniqueId(v) {
        this._uniqueId = v;
    }
    init(p) {
        this._page = p;
        this.ensureChildControls();
        this._childrenInitialized = true;
        this._children.forEach(c => {
            c.init(p);
        });
    }
    ensureChildControls() {
        if (!this._childControlsCreated) {
            this.createChildControls();
            this._childControlsCreated = true;
        }
    }
    createChildControls() { }
    rebuildDom() {
        if (this.domCreated) {
            const parent = this._element.parents(':first');
            this.removeFromDom();
            this.resetFlags();
            parent.prepend(this.getDomElement());
        }
        else {
            this.resetFlags();
        }
    }
    removeFromDom(remove = true) {
        this._children.forEach(c => c.removeFromDom());
        if (remove) {
            this._element.remove();
        }
    }
    resetFlags() {
        this._domInitialzed = false;
        this._domCreated = false;
        this._children.forEach(c => c.resetFlags());
    }
    addChild(control) {
        control._parent = this;
        this._children.push(control);
        if (this._childrenInitialized) {
            control.init(this._page);
        }
        if (this._domCreated) {
            Control.addChildToDom(this._element, control);
        }
        return control;
    }
    getDomElement() {
        if (!this._domCreated) {
            this._element = this.createDomElement();
            this._children.forEach(c => Control.addChildToDom(this._element, c));
            this._domCreated = true;
            this.initDomElement(this._element);
            this._domInitialzed = true;
        }
        return this._element;
    }
    createDomElement() {
        return $('<span>');
    }
    initDomElement(element) {
        if (!this.visible) {
            element.hide();
        }
    }
}
exports.Control = Control;
//# sourceMappingURL=Control.js.map