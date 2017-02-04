namespace Controls {
    export class SampleCompositeControl extends Control {

        constructor(private _container: JQuery) {
            super(null);
        }

        public createDomElement(): JQuery {
            return this._container;
        }

        public init(p: Page) {
            super.init(p);
            this.getDomElement();
        }

        public createChildControls() {
            this.addChild(
                new Panel(
                    '<h1>Welcome</h1>',
                    new LiteralControl('<i>test</i>'), 
                    '<b>test</b>',
                    new Panel('<u>test</u>', '<em>test</em>')
                ));
        }
    }
}
