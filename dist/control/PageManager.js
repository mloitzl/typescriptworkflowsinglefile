"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Page_1 = require("./Page");
class PageManager {
    static getRoot() {
        if (!PageManager._root) {
            PageManager._root = new Page_1.Page();
        }
        return PageManager._root;
    }
    static init() {
        PageManager.getRoot().initPage();
    }
}
exports.PageManager = PageManager;
//# sourceMappingURL=PageManager.js.map