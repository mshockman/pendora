import {KeyError, ValueError} from './errors';


const DROP = {};
const REQUIRED = {};
const FALSE = {};
const TRUE = {};


/**
 * Used to help deserialize attributes on an element.
 */
export class Attribute {
    static DROP = DROP;
    static REQUIRED = REQUIRED;
    static FALSE = FALSE;
    static TRUE = TRUE;

    constructor(type, missing=DROP, nullable=null, validator=null) {
        this.type = type;
        this.missing = missing;
        self.validator = validator;
        this.nullable = nullable;
    }

    static deserialize(data, fields) {
        let r = {};

        for(let key in fields) {
            if(fields.hasOwnProperty(key)) {
                let field = fields[key],
                    missing = field ? field.missing : DROP,
                    nullable = field ? field.nullable : null,
                    value = data.hasOwnProperty(key) ? data[key]: undefined;

                if(value === undefined) {
                    if(missing === REQUIRED) {
                        throw new KeyError(`${key} is required`);
                    } else if(missing === DROP) {
                        continue;
                    } else {
                        r[key] = missing;
                        continue;
                    }
                }

                if(value === null) {
                    if(nullable === FALSE) {
                        throw new ValueError(`${key} cannot be null`);
                    } else if(nullable === TRUE || nullable === null) {
                        r[key] = null;
                        continue;
                    } else if(nullable === DROP) {
                        continue;
                    } else {
                        r[key] = nullable;
                        continue;
                    }
                }

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
