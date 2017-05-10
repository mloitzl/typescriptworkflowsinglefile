import { BaseConfigurationFile } from "./BaseConfigurationFile";
import { IConfiguration } from "./IConfiguration";

export class InlineConfigurationFile extends BaseConfigurationFile {
    constructor(private _configuration: IConfiguration) {
        super();
    }
    public getConfiguration(): IConfiguration {
        return this._configuration;
    }
}