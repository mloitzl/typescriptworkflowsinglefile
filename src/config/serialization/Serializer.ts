import { IConfiguration } from "../IConfiguration";
import { SerializationError } from "./SerializationError";
import { Dictionary } from "../../collections/Dictionary";
import { Collection } from "../../collections/Collection";
declare function _import<T extends { [K: string]: any; }>(path: string): Promise<T>;

export class Serializer {

    constructor() {
    }

    private static async getModule(templateName) {
        try {
            let template = await _import(`../../${templateName}`)
            console.log(template);
            return template;
        } catch (err) {
            console.error("template error");
            return new Error(err);
        }
    }
    static async deserialize<T extends IConfiguration>(json: string): Promise<T> {
        return await this.fixTree<T>(JSON.parse(json));
    }
    private static async resolveDependency(name: string): Promise<any> {
        try {
            return await this.getModule(name);
            // return Collection.first(this._namespaces, n => n[name])[name];
        } catch (e) {
            throw new SerializationError(`Type "${name}" not found.`);
        }
    }

    static async fixTree<T extends IConfiguration>(obj: any): Promise<T> {
        if (obj instanceof Array) {
            for (let i = 0; i < obj.length; i++) {
                obj[i] = await this.fixTree(obj[i]);
            }
        } else if (typeof obj === "object") {
            if (obj && (obj["__type"] || obj["__constructor"])) {
                const proto = await this.resolveDependency(obj["__type"] || obj["__constructor"]);

                if (proto != null) {
                    /*if (this._supportsProto) {
                        obj["__proto__"] = proto.prototype;
                    } else */
                    //{
                    var t = new proto[obj["__type"] || obj["__constructor"]]();
                    Dictionary.forEach(obj,
                        (k, v) => {
                            if (k !== "__type" && k !== "__constructor" && typeof t[k] != "function") {
                                t[k] = v;
                            }
                        });
                    return t;
                    //}
                } else {
                    throw `Class not found: ${obj["__type"] || obj["__constructor"]}`;
                }
            }

            Dictionary.forEach(obj, (k, v) => obj[k] = this.fixTree(v));
        }
        debugger;
        // return obj;
    }

}