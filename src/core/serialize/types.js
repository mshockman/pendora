import {ValidationError} from "../errors";


const REG_COMMA = /\s*,\s*/;


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
