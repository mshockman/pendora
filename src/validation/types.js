import {InvalidNode} from "./errors";


export class TypeBase {
    /**
     * @abstract
     * @param value
     */
    deserialize(value) {

    }

    /**
     * @abstract
     * @param value
     */
    serialize(value) {

    }
}


export class StringType extends TypeBase {
    constructor(allowEmpty=false, strip=false) {
        super();
        this.allowEmpty = allowEmpty;
        this.strip = strip;
    }

    deserialize(value) {
        value = value + "";

        if(this.strip) {
            value = value.trim();
        }

        if(value === "") {
            if(this.allowEmpty) {
                return value;
            } else {
                // todo throw error.
            }
        }

        return value;
    }

    serialize(value) {
        return value + "";
    }
}


export class IntegerType extends TypeBase {
    deserialize(value) {
        value = parseFloat(value);

        if(Number.isInteger(value)) {
            return value;
        } else {
            throw new InvalidNode(null, "Value must be an integer.");
        }
    }

    serialize(value) {
        return this.deserialize(value);
    }
}


export class NumberType extends TypeBase {
    deserialize(value) {
        value = parseFloat(value);

        if(!Number.isNaN(value)) {
            return value;
        } else {
            throw new InvalidNode(null, "Value must be a number.");
        }
    }

    serialize(value) {
        return this.deserialize(value);
    }
}


export class BooleanType extends TypeBase {
    deserialize(value) {
        if(typeof value === "string") {
            value = value.toLowerCase().trim();

            if(value === "true" || value === "false") {
                return value === "true";
            } else {
                throw new InvalidNode(null, "Value must be either true or false.");
            }
        } else if(typeof value === "number") {
            return !!value;
        } else if(typeof value !== "boolean") {
            throw new InvalidNode(null, "Value must be either true or false.");
        }

        return value;
    }

    serialize(value) {
        return this.deserialize(value);
    }
}


export class MapType extends TypeBase {
    constructor(json=false) {
        super();
        this.json = json;
    }

    deserialize(value) {
        if(this.json && typeof value === "string") {
            try {
                value = JSON.parse(value);
            } catch (e) {
                if(e instanceof SyntaxError) {
                    throw new InvalidNode(null, "Invalid JSON");
                } else {
                    throw e;
                }
            }

            if(Array.isArray(value)) {
                throw new InvalidNode(null, "Value must be an key value map.")
            }

            return value;
        } else if(typeof value !== "object") {
            throw new InvalidNode(null, "Value must be an key value map.")
        }

        return value;
    }

    serialize(value) {
        if(this.json && typeof value === "object") {
            return JSON.stringify(value);
        } else {
            return value;
        }
    }
}


export class ListType extends TypeBase {
    constructor(json) {
        super();
        this.json = json;
    }

    deserialize(value) {
        if(this.json && typeof value === "string") {
            try {
                value = JSON.parse(value);
            } catch (e) {
                if(e instanceof SyntaxError) {
                    throw new InvalidNode(null, "Invalid JSON");
                } else {
                    throw e;
                }
            }

            if(!Array.isArray(value)) {
                throw new InvalidNode(null, "Value must be a list.");
            }

            return value;
        } else if(!Array.isArray(value)) {
            throw new InvalidNode(null, "Value must be a list.");
        }

        return value;
    }

    serialize(value) {
        if(this.json) {
            return JSON.stringify(value);
        } else {
            return value;
        }
    }
}


export class JsonType extends TypeBase {
    deserialize(value) {
        try {
            value = JSON.parse(value);
        } catch (e) {
            if(e instanceof SyntaxError) {
                throw new InvalidNode(null, "Invalid JSON");
            } else {
                throw e;
            }
        }

        return value;
    }

    serialize(value) {
        return JSON.stringify(value);
    }
}