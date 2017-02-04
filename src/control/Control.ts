namespace Controls {
    export class Control {

        private _element: JQuery;
        private _children: Array<Control> = [];

        private _enabled: boolean = true;
        public get enabled(): boolean {
            if (this._parent)
                return this._enabled && this._parent.enabled;

            return this._enabled;
        }

        public set enabled(v: boolean) {
            if (v !== this._enabled) {
                const temp = this.getValue();
                this._enabled = v;
                this.rebuildDom();
                this.setValue(temp);
            }
        }

        private _visible: boolean = true;
        public get visible(): boolean {
            return this._visible;
        }
        public set visible(v: boolean) {
            this._visible = v;
        }

        private _domInitialzed: boolean = false;
        public get domInitialzed(): boolean {
            return this._domInitialzed;
        }

        public set domInitialzed(v: boolean) {
            this._domInitialzed = v;
        }

        private _domCreated: boolean = false;
        public get domCreated(): boolean {
            return this._domCreated;
        }
        public set domCreated(v: boolean) {
            this._domCreated = v;
        }

        private _parent: Control;
        public get parent(): Control {
            return this._parent;
        }
        public set parent(v: Control) {
            this._parent = v;
        }

        private _uniqueId: string;
        public get uniqueId(): string {
            return this._uniqueId;
        }
        public set uniqueId(v: string) {
            this._uniqueId = v;
        }

        constructor(private _id: string = null) { }


        // virtual
        getValue(): any {
            return null;
        }

        setValue(v: any) { }

        protected rebuildDom(): void {
            if (this.domCreated) {
                const parent = this._element.parents(":first");
                this.removeFromDom();
                this.resetFlags();
                parent.prepend(this.getDomElement());
            } else {
                this.resetFlags();
            }
        }

        protected removeFromDom(remove: boolean = true) {
            this._children.forEach(c => c.removeFromDom());
            if (remove) {
                this._element.remove();
            }
        }

        protected resetFlags() {
            this._domInitialzed = false;
            this._domCreated = false;
            this._children.forEach(c => c.resetFlags());
        }

        public addChild<T extends Control>(control: T): T {
            control._parent = this;
            this._children.push(control);

            if(this._domCreated){
                Control.addChildToDom(this._element, control);
            }
            return control;
        }

        public getDomElement(): JQuery {
            if (!this._domCreated) {
                this._element = this.createDomElement();
                this._children.forEach(c => Control.addChildToDom(this._element, c));
                this._domCreated = true;
                this.initDomElement(this._element);
                this._domInitialzed = true;
            }
            return this._element;
        }

        protected createDomElement(): JQuery {
            return $("<div>");
        }

        protected initDomElement(element: JQuery): void {
            if (!this.visible) {
                element.hide();
            }
        }

        protected static addChildToDom(element: JQuery, control: Control): void {
            element.append(control.getDomElement());
        }
    }
}
