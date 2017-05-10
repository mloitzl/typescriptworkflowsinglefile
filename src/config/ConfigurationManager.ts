import { ConfigurationType } from "./ConfigurationType";

export class ConfigurationManager {

    private static _configTypes: { [name: string]: ConfigurationType } = {};
    public static getType(typename: string): ConfigurationType {
        return this._configTypes[typename];
    }

    static registerType(type: ConfigurationType): void {
        this._configTypes[type.name] = type;
    }

}