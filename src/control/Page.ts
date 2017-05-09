import { PageManager } from './PageManager';
import { Control } from './Control';

export class Page extends Control {

    private _pageManager: PageManager = null;

    constructor() {
        super();
    }

    public initPage() {
        console.log("Initing Page");
        
        this.children.forEach(c => c.init(this));
    }

}

