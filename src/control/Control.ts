import { Page } from './Page';

export class Control {
    private _element: JQuery;
    protected _children: Array<Control> = [];
    private _enabled = true;
    private _visible = true;
    private _childrenInitialized = false;
    private _childControlsCreated = false;
    private _domInitialzed = false;
    private _domCreated = false;
    private _parent: Control;
    private _uniqueId: string;
    private _page: Page;
    private _loadingDeferred: (value?: Control) => void;
    public  ready: Promise<Control>;

    constructor(private _id: string = null) {
        this.ready = new Promise<Control>( (res, rej) => {
            this._loadingDeferred = res;
        });
    }

    public get enabled(): boolean {
        if (this._parent) {
            return this._enabled && this._parent.enabled;
        }

        return this._enabled;
    }

    public get children(): Control[]
    {
        return this._children;
    }

    protected static addChildToDom(element: JQuery, control: Control): void {
        element.append(control.getDomElement());
    }

    public loaded() : void{
        this._loadingDeferred(this);
    }

    public set enabled(v: boolean) {
        if (v !== this._enabled) {
            const temp = this.getValue();
            this._enabled = v;
            this.rebuildDom();
            this.setValue(temp);
        }
    }

    protected getValue(): any {
        throw 'Should be overwritten in FieldControl';
    };

    protected setValue(v: any) {
        throw 'Should be overwritten in FieldControl';
    };

    public get visible(): boolean {
        return this._visible;
    }

    //        public get children(): Array<Control> {
    //            return this._children;
    //        }

    public set visible(v: boolean) {
        this._visible = v;
    }

    public get domInitialzed(): boolean {
        return this._domInitialzed;
    }

    public set domInitialzed(v: boolean) {
        this._domInitialzed = v;
    }

    public get domCreated(): boolean {
        return this._domCreated;
    }
    public set domCreated(v: boolean) {
        this._domCreated = v;
    }

    public get parent(): Control {
        return this._parent;
    }
    public set parent(v: Control) {
        this._parent = v;
    }

    public get uniqueId(): string {
        return this._uniqueId;
    }
    public set uniqueId(v: string) {
        this._uniqueId = v;
    }

    public init(p: Page) {
        this._page = p;
        this.ensureChildControls();
        this._childrenInitialized = true;
        this._children.forEach(c => {
            c.init(p);
        }
        );
    }

    protected ensureChildControls() {
        if (!this._childControlsCreated) {
            this.createChildControls();
            this._childControlsCreated = true;
        }
    }

    protected createChildControls() { }

    protected rebuildDom(): void {
        if (this.domCreated) {
            const parent = this._element.parents(':first');
            this.removeFromDom();
            this.resetFlags();
            parent.prepend(this.getDomElement());
        } else {
            this.resetFlags();
        }
    }

    protected removeFromDom(remove = true) {
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

        if (this._childrenInitialized) {
            control.init(this._page);
        }
        if (this._domCreated) {
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
        return $('<span>');
    }

    protected initDomElement(element: JQuery): void {
        if (!this.visible) {
            element.hide();
        }
    }

}
