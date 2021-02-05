import {ValidationErrorList, InvalidNode, InvalidErrorBase, SetValueSerializationError} from "./errors";
import {getOwnProperty} from "../core/utility";
import {Validator} from "./validators";


export const DROP = Symbol("DROP"),
    REQUIRED = Symbol("REQUIRED"),
    MISSING = Symbol("MISSING");


export class SchemaNode {
    #prop;

    /**
     *
     * @param name {String|null}
     * @param type {TypeBase|null}
     * @param validator {Function|Validator|null}
     * @param missing {REQUIRED|DROP|*}
     * @param prop {String|null}
     * @param options
     */
    constructor({name=null, type=null, validator=null, missing=REQUIRED, prop=null, ...options}) {
        this.name = name;
        this.type = type;
        this.validator = validator;
        this.missing = missing;
        this.#prop = prop;
        this.options = options;
    }

    deserialize(value) {
        try {
            let error = new ValidationErrorList(this, this.name, null);
            error.cstruct = value;

            value = this._handleMissing(error, value);
            value = this._deserializeType(error, value);
            value = this._deserializeValue(error, value);
            value = this._validate(error, value);
            value = this._clean(error, value);

            return value;
        } catch (e) {
            if(e instanceof SetValueSerializationError) {
                return e.value;
            } else {
                throw e;
            }
        }
    }

    clean(value) {
        return value;
    }

    _deserializeType(errorList, value) {
        if(this.type) {
            try {
                value = this.type.deserialize(value);
            } catch (e) {
                if(e instanceof InvalidErrorBase) {
                    e.setNode(this);
                    errorList.addError(e);
                    throw errorList;
                } else {
                    throw e;
                }
            }
        }

        return value;
    }

    _deserializeValue(errorList, value) {
        return value;
    }

    _validate(errorList, value) {
        if(this.validator) {
            try {
                Validator.call(this.validator, value);
            } catch (e) {
                if(e instanceof InvalidErrorBase) {
                    e.setNode(this);
                    errorList.addError(e);
                    throw errorList;
                } else {
                    throw e;
                }
            }
        }

        return value;
    }

    _clean(errorList, value) {
        try {
            value = this.clean(value);
        } catch (e) {
            if(e instanceof InvalidErrorBase) {
                e.setNode(this);
                errorList.addError(e);
                throw errorList;
            } else {
                throw e;
            }
        }

        return value;
    }

    _handleMissing(errorList, value) {
        if(value === null || value === undefined || value === MISSING) {
            if(this.missing === REQUIRED) {
                errorList.addError(new InvalidNode(this, "Value is required."));
                throw errorList;
            } else {
                throw new SetValueSerializationError(this.missing);
            }
        } else if(value === DROP) {
            return new SetValueSerializationError(value);
        }

        return value;
    }

    get prop() {
        if(this.#prop) {
            return this.#prop;
        } else {
            return this.name;
        }
    }

    set prop(value) {
        this.#prop = value;
    }
}


export class Schema extends SchemaNode {
    /**
     *
     * @param nodes
     * @param name
     * @param type
     * @param validator {function||null}
     * @param missing
     * @param prop
     * @param schema
     * @param options
     */
    constructor({nodes=null, name=null, type=null, validator=null, missing=REQUIRED, prop=null, schema=null, ...options}={}) {
        super({name, type, validator, missing, prop, ...options});

        this.children = [];

        if(nodes) {
            for(let node of nodes) {
                this.addNode(node);
            }
        }

        if(schema) {
            for(let [key, value] of Object.entries(schema)) {
                if(value.name === null) {
                    value.name = key;
                }

                this.addNode(value);
            }
        }
    }

    addNode(node) {
        if(!node.name || this.hasChildNode(node.name)) {
            throw new Error("Node must have a unique name.");
        }

        this.children.push(node);
    }

    hasChildNode(node) {
        return !!this.get(node);
    }

    get(node) {
        for(let child of this.children) {
            if(child === node || child.name === node || child.name === node.name) {
                return true;
            }
        }

        return null;
    }

    _deserializeValue(errorList, value) {
        if(typeof value !== "object") {
            errorList.addError(new InvalidNode(this, "Value must be an object"));
            throw errorList;
        }

        let r = {};
        errorList.pstruct = r;

        for(let node of this.children) {
            try {
                let v = node.deserialize(getOwnProperty(value, node.name, MISSING));

                if(v === DROP) {
                    continue;
                }

                r[node.prop] = v;
            } catch (e) {
                if(e instanceof InvalidErrorBase) {
                    e.setNode(node);
                    errorList.addError(e);
                    r[node.prop] = e;
                } else {
                    throw e;
                }
            }
        }

        if(errorList.length) {
            throw errorList;
        }

        return r;
    }

    *[Symbol.iterator]() {
        for(let child of this.children) {
            yield child;
        }
    }
}


export class SchemaList extends SchemaNode {
    constructor({node, name, type, validator, missing=REQUIRED, prop=null}) {
        super({name, type, validator, missing, prop});
        this.node = node;
    }

    _deserializeType(errorList, value) {
        if(!Array.isArray(value)) {
            errorList.addError(new InvalidNode(this, "Value must be a list."));
            throw errorList;
        }

        let r = [];
        errorList.pstruct = r;

        for(let i = 0, l = value.length; i < l; i++) {
            try {
                let v = this.node.deserialize(value[i]);

                if (v === DROP) {
                    continue;
                }

                r.push(v);
            } catch(e) {
                if(e instanceof InvalidErrorBase) {
                    e.setNode(this.node);
                    e.name = i;
                    e.index = i;
                    errorList.addError(e);
                    r.push(e);
                } else {
                    throw e;
                }
            }
        }

        if(errorList.length) {
            throw errorList;
        }

        return r;
    }

    hasChildNode(node) {
        return node === this.node;
    }
}
