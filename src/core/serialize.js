/**
 * A module for creating schema that can be used to create objects that can serialize and deserialize data structures
 * into different formats.
 */


import {ValidationError} from './errors';


const REG_COMMA = /\s*,\s*/;


export const NULL = {},
    TRUE = {},
    FALSE = {},
    REQUIRED = {},
    DROP = {};


export class Type {
    /**
     * @abstract
     * @param value
     */
    deserialize(value) {

    }

    /**
     * @param value
     */
    serialize(value) {
        return value;
    }
}


export class Integer extends Type {
    constructor(radix=10, allowInfinity=false) {
        super();
        this.radix = radix;
        this.allowInfinity = allowInfinity;
    }

    deserialize(value) {
        if(this.allowInfinity) {
            if(typeof value === 'string') {
                value = value.trim();
            }

            if(value === 'Infinity') {
                return Infinity;
            } else if(value === '-Infinity') {
                return -Infinity;
            }
        }

        value = parseInt(value, this.radix);

        if(Number.isNaN(value)) {
            throw ValidationError("Could not parse integer.");
        }

        return value;
    }
}


export class Float extends Type {
    constructor(fixed=null, allowInfinity=false) {
        super();
        this.fixed = fixed;
        this.allowInfinity = allowInfinity;
    }

    deserialize(value) {
        if(this.allowInfinity) {
            if(typeof value === 'string') {
                value = value.trim();
            }

            if(value === 'Infinity') {
                return Infinity;
            } else if(value === '-Infinity') {
                return -Infinity;
            }
        }

        if(this.fixed !== null) {
            value = (value + '').toFixed(this.fixed);
        }

        value = parseFloat(value);

        if(Number.isNaN(value)) {
            throw new ValidationError("Could not parse float");
        }

        return value;
    }
}


export class Bool extends Type {
    deserialize(value) {
        if(value === true || value === false) {
            return value;
        }

        if(typeof value === 'string') {
            value = value.toLowerCase().trim();

            if(value === 'true') {
                return true;
            } else if(value === 'false') {
                return false;
            }
        }

        throw new ValidationError("Could not parse boolean from value.");
    }
}


export class Str extends Type {
    constructor(allow_empty=true, trim=false, transform=null) {
        super();
        this.allow_empty = allow_empty;
        this.trim = trim;
        this.transform = transform;
    }

    deserialize(value) {
        value = value + '';

        if(this.trim) {
            value = value.trim();
        }

        if(this.transform) {
            value = value.transform();
        }

        if(value === '' && !this.allow_empty) {
            throw new ValidationError("String cannot be empty");
        }

        return value;
    }
}


export class CSV extends Type {
    constructor(separator=REG_COMMA) {
        super();
        this.separator = separator;
    }

    deserialize(value) {
        let type = typeof value;

        if(type !== 'string') {
            throw new ValidationError(`Could not deserialize ${type}`);
        }

        value = value.trim().split(this.separator);

        return value;
    }

    serialize(value) {
        return value.join(', ');
    }
}


export class CompoundType extends Type {
    constructor(...types) {
        super();
        this.types = [];

        for(let type of types) {
            this.types.push(typeof type === 'function' ? new type() : type);
        }
    }

    deserialize(value) {
        for(let t of this.types) {
            try {
                return t(value);
            } catch (e) {
                if(!(e instanceof ValidationError)) {
                    throw e;
                }
            }
        }

        throw new ValidationError("Value did not match any type.");
    }
}


export function choice(...choices) {
    return function(value) {
        if(choices.indexOf(value) === -1) {
            throw new ValidationError("Invalid choice");
        }

        return value;
    }
}


export function length(minLength=null, maxLength=null) {
    return function(value) {
        let l = value.length;

        if(minLength !== null && l < minLength) {
            throw new ValidationError("Array length is to small");
        }

        if(maxLength !== null && l > maxLength) {
            throw new ValidationError("Array length is to big");
        }

        return value;
    }
}


export function range(min=null, max=null) {
    return function(value) {
        if(min !== null && value < min) {
            throw new ValidationError("Value is to small.");
        }

        if(max !== null && value > max) {
            throw new ValidationError("Value is to big.");
        }

        return value;
    }
}


export function regex(pattern, flags=null) {
    let reg = flags ? new RegExp(pattern, flags) : new RegExp(pattern);

    return function(value) {
        if(!reg.test(value)) {
            throw new ValidationError("Value did not match pattern.");
        }

        return value;
    }
}


export function all(...validators) {
    return function(value) {
        for(let validator of validators) {
            value = validator(value);
        }

        return value;
    }
}


export function any(...validators) {
    return function(value) {
        for(let validator of validators) {
            try {
                value = validator(value);
                return value;
            } catch (e) {
                if(!(e instanceof ValidationError)) {
                    throw e;
                }
            }
        }

        throw new ValidationError("Value did not pass any validator.");
    }
}


export class Attribute {
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


export class AttributeSchema {
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
