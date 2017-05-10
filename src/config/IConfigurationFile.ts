import { IAttributeProvider } from "./IAttributeProvider";
import { IConfiguration } from "./IConfiguration";
import { Control } from "../control/Control";

export interface IConfigurationFile extends IAttributeProvider {
    getConfiguration(): IConfiguration;
    createInstance(): Control;
}