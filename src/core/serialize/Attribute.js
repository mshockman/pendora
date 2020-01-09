import {ValidationError} from "../errors";
import {NULL, DROP, TRUE, FALSE, REQUIRED} from "./helper";


export default class Attribute {
    static DROP = DROP;
    static TRUE = TRUE;
    static FALSE = FALSE;
    static REQUIRED = REQUIRED;

    constructor(type, missing=DROP, nullable=null, validator=null) {
        this.type = typeof type === 'function' ? new type() : type;

        this.missing = missing;
        this.nullable = nullable;
        this.validator = validator;
    }

    deserialize(data, key) {
        let value = data[key];

        if(value === undefined) {
            if(this.missing === REQUIRED) {
                throw new ValidationError(`Attribute ${key} is required`);
            } else if(this.missing === DROP) {
                throw DROP;
            } else {
                return this.missing;
            }
        } else if(value === null) {
            if(this.nullable === FALSE || this.nullable === REQUIRED) {
                throw new ValidationError(`Attribute ${key} cannot be null.`);
            } if(this.nullable === null || this.nullable === TRUE || this.nullable === NULL) {
                return null;
            } else {
                return this.nullable;
            }
        }

        if(this.type) {
            value = this.type.deserialize(value);
        }

        if(this.validator) {
            value = this.validator(value);
        }

        return value;
    }
}
