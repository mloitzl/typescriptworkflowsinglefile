"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Control_1 = require("../control/Control");
class FieldControl extends Control_1.Control {
    constructor(id, label) {
        super(id);
        this.label = label;
        this._hasInputControl = false;
    }
    setInputValue(v) {
        this.getDomElement().val(v);
    }
    getInputValue() {
        return this.getDomElement().val();
    }
    setReadOnlyValue(v) {
        this.getDomElement().text(v === null ? '' : v);
    }
    initDomElement(element) {
        super.initDomElement(element);
        this._hasInputControl = this.enabled;
        if (this._hasInputControl) {
            this.setInputValue(this._fieldValue);
        }
        else {
            this.setReadOnlyValue(this._fieldValue);
        }
    }
    // override
    setValue(v) {
        this._fieldValue = v;
        this.setInternalValue(v);
    }
    // override
    getValue() {
        return this.getInternalValue();
    }
    setInternalValue(v) {
        if (this.domInitialzed) {
            if (this.enabled) {
                this.setInputValue(v);
            }
            else {
                this.setReadOnlyValue(v);
            }
        }
    }
    getReadOnlyInputValue() {
        return this._fieldValue;
    }
    getInternalValue() {
        return this._hasInputControl &&
            this.domInitialzed ? this.getInputValue() : this.getReadOnlyInputValue();
    }
}
exports.FieldControl = FieldControl;
//# sourceMappingURL=FieldControl.js.map