import { PageManager } from './PageManager';
import { Control } from './Control';

export class Page extends Control {

    private _pageManager: PageManager = null;

    constructor() {
        super();
    }

    public initPage() {
        this._children.forEach(c => c.init(this));
    }

}

