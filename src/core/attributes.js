import {KeyError} from './errors';


/**
 * Used to help deserialize attributes on an element.
 */
export class Attribute {
    constructor(type, required=false, validator=null) {
        this.type = type;
        this.required = required;
        self.validator = validator;
    }

    static deserialize(data, fields) {
        let r = {};

        for(let key in fields) {
            if(fields.hasOwnProperty(key)) {
                let field = fields[key],
                    required = field ? field.required : false;

                if(!data.hasOwnProperty(key)) {
                    if(required) {
                        throw new KeyError(`${key} is required`);
                    } else {
                        continue;
                    }
                }

                let value = data[key];

                if(field) {
                    if(field.type) {
                        value = field.type(value);
                    }

                    if(field.validator) {
                        value = field.validator(value);
                    }
                }

                r[key] = value;
            }
        }

        return r;
    }
}
