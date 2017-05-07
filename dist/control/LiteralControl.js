"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Control_1 = require("./Control");
class LiteralControl extends Control_1.Control {
    get html() {
        return this._inner[0].outerHTML;
    }
    set html(v) {
        if (typeof v === 'string') {
            this._inner.replaceWith(v);
        }
        else {
            const replace = $(v);
            this._inner.replaceWith(replace);
            // this._inner = replace;
        }
    }
    constructor(html) {
        super(null);
        this._inner = typeof html === 'string' ? $(html) : html;
    }
    createDomElement() {
        return this._inner;
    }
}
exports.LiteralControl = LiteralControl;
//# sourceMappingURL=LiteralControl.js.map