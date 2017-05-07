import { Control } from './Control';

export class Page extends Control {

    constructor() {
        super();
    }

    public initPage() {
        this._children.forEach(c => c.init(this));
    }

}

