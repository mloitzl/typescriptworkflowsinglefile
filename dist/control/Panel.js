"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Control_1 = require("./Control");
const LiteralControl_1 = require("./LiteralControl");
class Panel extends Control_1.Control {
    constructor(...children) {
        super(null);
        children.forEach(c => {
            this.addChild(typeof c === 'string' ? new LiteralControl_1.LiteralControl($(c)) : c);
        });
    }
    createDOMElement() {
        return $('<div/>');
    }
}
exports.Panel = Panel;
//# sourceMappingURL=Panel.js.map