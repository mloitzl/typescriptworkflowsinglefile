import { LiteralControl } from './control/LiteralControl';
import { Panel } from './control/Panel';
import { Control } from './control/Control';
import { TextFieldControl } from './form/TextFieldControl';
import { Page } from './control/Page';

export class SampleCompositeControl extends Control {

    private _tf: TextFieldControl;

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

    public setValue(v: any) {
        this._tf.setValue(v);
    }

    public getValue(): any {
        return this._tf.getValue();
    }

    public createChildControls(): void {
        this.addChild(
            new Panel(
                '<h1>Welcome</h1>',
                new LiteralControl('<i>test</i>'),
                '<b>test</b>',
                new Panel('<u>test</u>', '<em>test</em>')
            ));
        this._tf = new TextFieldControl('1', 'Text Field Man');
        this.addChild(this._tf);
    }

}
