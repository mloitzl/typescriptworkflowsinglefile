import { Control } from "./Control";
import { InlineConfigurationFile } from "../config/InlineConfigurationFile";
import { IConfigurationFile } from "../config/IConfigurationFile";
import { Serializer } from "../config/serialization/Serializer";

export class GenericClientWebPart extends Control {
    _control: Control;
    _title: any;
    _configurationFile: IConfigurationFile;
    _isInline: boolean;

    constructor(private _container: JQuery) {
        super(null);

        var mode = _container.attr("data-configMode");
        this._isInline = mode && mode.toLowerCase() === "inline";
        if (this._isInline) {
            var json = _container.attr("data-configData");
            if (json) {
                Serializer.deserialize(json).then(_ => {
                    this._configurationFile = new InlineConfigurationFile(_);
                    this.loaded();
                    //debugger;
                });
            }
        } else {
            // later
            // this._configUrl = _container.attr("data-configUrl");
        }
    }
    public createChildControls() {
        this.ready.then(c => {
            if (this._isInline) {
                this.addWebPartControl();
            }
        });
    }

    private addWebPartControl() {
        if (this._configurationFile) {
            // var configuration = <BaseWebPart>this._configurationFile.getConfiguration();
            // this._title = configuration.toString();
            this.addChild(this._control = this._configurationFile.createInstance());
        }

        this.getDomElement();
    }

}