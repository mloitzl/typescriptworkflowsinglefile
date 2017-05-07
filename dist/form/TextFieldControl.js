"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const FieldControl_1 = require("./FieldControl");
class TextFieldControl extends FieldControl_1.FieldControl {
    constructor(id, label) {
        super(id, label);
    }
    getInputValue() {
        return this._input.val();
    }
    setInputValue(v) {
        this._input.val(v);
    }
    createDomElement() {
        if (this.enabled) {
            return $(`<div class='scs-form textbox'>`)
                .append(this._input = $(`<input type='text'>`));
        }
        else {
            return $('<span>');
        }
    }
}
exports.TextFieldControl = TextFieldControl;
//# sourceMappingURL=TextFieldControl.js.map