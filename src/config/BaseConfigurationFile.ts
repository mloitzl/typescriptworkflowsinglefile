import { IConfiguration } from "./IConfiguration";
import { IConfigurationFile } from "./IConfigurationFile";
import { Control } from "../control/Control";
import { ConfigurationType } from "./ConfigurationType";
import { ConfigurationManager } from "./ConfigurationManager";

export class BaseConfigurationFile implements IConfigurationFile {
    createInstance(): Control {
        return <Control>this.getType().createInstance();
    }

    getType(): ConfigurationType {
        var typeName = this.getConfiguration().getTypename();
        return ConfigurationManager.getType(typeName);
    }

    getConfiguration(): IConfiguration {
        return null;
    }
}