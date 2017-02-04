namespace Controls {
    export class SampleCompositeControl extends Control {

        constructor(private _container: JQuery) {
            super(null);
        }

        public createDomElement(): JQuery {
            return this._container;
        }

        public createChildControls() {
            this.addChild(new Panel([
                new LiteralControl('<h1>Welcome</h1>')
            ]));
        }
    }
}
