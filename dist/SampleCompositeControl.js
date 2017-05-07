"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const LiteralControl_1 = require("./control/LiteralControl");
const Panel_1 = require("./control/Panel");
const Control_1 = require("./control/Control");
const TextFieldControl_1 = require("./form/TextFieldControl");
class SampleCompositeControl extends Control_1.Control {
    constructor(_container) {
        super(null);
        this._container = _container;
    }
    createDomElement() {
        return this._container;
    }
    init(p) {
        super.init(p);
        this.getDomElement();
    }
    setValue(v) {
        this._tf.setValue(v);
    }
    getValue() {
        return this._tf.getValue();
    }
    createChildControls() {
        this.addChild(new Panel_1.Panel('<h1>Welcome</h1>', new LiteralControl_1.LiteralControl('<i>test</i>'), '<b>test</b>', new Panel_1.Panel('<u>test</u>', '<em>test</em>')));
        this._tf = new TextFieldControl_1.TextFieldControl('1', 'Text Field Man');
        this.addChild(this._tf);
    }
}
exports.SampleCompositeControl = SampleCompositeControl;
//# sourceMappingURL=SampleCompositeControl.js.map