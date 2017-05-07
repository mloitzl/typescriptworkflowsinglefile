"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Control_1 = require("./Control");
class Page extends Control_1.Control {
    constructor() {
        super();
    }
    initPage() {
        this._children.forEach(c => c.init(this));
    }
}
exports.Page = Page;
//# sourceMappingURL=Page.js.map