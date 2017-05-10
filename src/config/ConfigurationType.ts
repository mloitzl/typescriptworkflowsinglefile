import { IConfiguration } from "./IConfiguration";
import { Control } from "../control/Control";

export class ConfigurationType {
    constructor(public name: string, public createInstance: (c?: IConfiguration) => Control | IConfiguration) { }
}