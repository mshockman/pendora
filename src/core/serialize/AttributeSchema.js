import {DROP} from "./helper";


export default class AttributeSchema {
    constructor(attributes) {
        this.attributes = attributes;
    }

    deserialize(data) {
        let r = {};

        for(let key in this.attributes) {
            if(this.attributes.hasOwnProperty(key)) {
                try {
                    r[key] = this.attributes[key].deserialize(data, key);
                } catch (e) {
                    if(e !== DROP) {
                        throw e;
                    }
                }
            }
        }

        return r;
    }
}
