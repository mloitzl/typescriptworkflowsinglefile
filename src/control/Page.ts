namespace Controls {
    export class Page extends Control {

        constructor() {
            super();
        }

        public initPage() {
            this._children.forEach(c => c.init(this));
        }
    }
}
