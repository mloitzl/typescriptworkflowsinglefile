import { Control } from './Control';
import { LiteralControl } from './LiteralControl';

export class Panel extends Control {
    constructor(...children: any[]) {
        super(null);
        children.forEach(c => {
            this.addChild(typeof c === 'string' ? new LiteralControl($(c)) : c);
        });
    }

    createDOMElement(): JQuery {
        return $('<div/>');
    }
}
