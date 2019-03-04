import {resolveField, assertInstanceHasField} from './functions';
import {ValidationError} from "./errors";


export const drop = {};


export class Model {
    constructor() {
        this._data = {};
        this._states = {};
    }

    /**
     * Returns true if the current model has the specified field, false otherwise.
     * @param field
     * @return {Boolean}
     */
    hasField(field) {
        return !!this.fields[field];
    }

    /**
     * Resolves the field key or throws an error.
     * @param field
     */
    resolve(field) {
        if(field instanceof ModelField) {
            if(field.bound !== this.constructor) {
                throw new Error("Invalid field");
            }

            return field;
        }

        return resolveField(field, [this]);
    }

    /**
     * Tests to see if the specified field is set.  Returns false if it is in the unset state.
     * If multiple fields are passed then isSet will return true if all the fields are set.
     * @param fields
     */
    isSet(...fields) {
        for(let field of fields) {
            if(!this.fields[field].isSet()) {
                return false;
            }
        }

        return true;
    }

    /**
     * Returns true if any field is dirty.
     * @returns {Boolean}
     */
    isDirty() {
        for(let field of Object.values(this.fields)) {
            if(field.isDirty()) return true;
        }

        return false;
    }

    /**
     * Tests to see if the two models are equivalent.
     * @param model
     */
    isEquivalent(model) {
        return !!(model === this || (model.constructor === this.constructor && model.pk && this.pk && model.pk === this.pk));
    }

    /**
     * Returns the models primary key or null if not primary key is not set.
     */
    getPrimaryKey() {
        return this.pk;
    }

    /**
     * Validates each field.  Will throw a ValidationError if an invalid field is found.
     */
    validate() {
        for(let field of Object.values(this.fields)) {
            field.validate(this);
        }
    }

    /**
     * Returns true if the model is valid, false otherwise.
     */
    isValid() {
        try {
            this.validate();
            return true;
        } catch(e) {
            return false;
        }
    }

    /**
     * Validates the object and returns the results as a new dictionary.
     * Raises ValidationError on invalid field.
     */
    serialize(config) {
        if(!config) {
            config = {};

            for(let field of Object.values(this.fields)) {
                config[field.name] = field.getConfig();
            }
        }

        let r = {};

        for(let field of Object.values(this.fields)) {
            let fieldConfig = config[field.name];

            if(typeof fieldConfig === 'function') {
                fieldConfig = fieldConfig(field, this);
            }

            if(fieldConfig) {
                let value = field.serialize(this, fieldConfig);

                if(value !== drop) {
                    r[field.key] = value;
                }
            }
        }

        return r;
    }

    /**
     * Returns a json string representation of the model.
     * @return {String}
     */
    tojson() {

    }

    get pk() {
        return this.constructor.pkField.get();
    }

    get fields() {
        return this.constructor.c;
    }

    static get pkField() {
        for(let field of Object.values(this.c)) {
            if(field.pk) {
                return field;
            }
        }
    }

    static get c() {
        if(!this.prototype.hasOwnProperty('_fields')) {
            let r = {};

            if(this.prototype._fields) {
                for(let [key, value] of Object.entries(this.prototype._fields)) {
                    r[key] = value.bind(this);
                }
            }

            this.prototype._fields = r;
        }

        return this.prototype._fields;
    }

    static deserialize(data) {
        let r = new this();

        for(let field of Object.values(r.fields)) {
            if(data.hasOwnProperty(field.key)) {
                field.set(r, field.deserialize(data[field.key]), 'clean');
            }
        }

        return r;
    }
}


export class FieldBase {
    get(instance) {}
    set(instance, value, state='dirty') {}
    del(instance) {}
    serialize(instance, config) {}
    deserialize(value) {}
    validate(instance) {}
    getConfig() {}
    setState(instance, state) {}
    isDirty(instance) {}
    isSet(instance) {}
    clone() {}
    bind(Class) {}
    decorate(Class) {}
}


/**
 * @type {*}
 */
export class ModelField extends FieldBase {
    constructor({type=null, missing=undefined, nullable=false, validator=null, serialize=true, pk=false, constraints=null, initializer=() => undefined, ...config}={}) {
        super();
        this.name = null; // The name of the name on the model.
        this.key = null; // The name of the key in the database.
        this.bound = null;
        this.constaints = [];

        this.type = type;
        this.missing = missing;
        this.nullable = nullable;
        this.validator = validator;
        this.pk = pk;
        this.initializer = initializer;

        this._serialize = serialize;

        if(constraints) {
            for(let constraint of constraints) {
                this.addConstraint(constraint);
            }
        }

        if(config) Object.assign(config);
    }

    get(instance) {
        assertInstanceHasField(instance, this);
        return instance._data[this.name];
    }

    set(instance, value, state='dirty') {
        assertInstanceHasField(instance, this);

        for(let constraint of this.constaints) {
            constraint.validate(instance, value);
        }

        instance._data[this.name] = value;
        this.setState(instance, state);

        for(let constraint of this.constaints) {
            constraint.onSet(instance, value);
        }
    }

    del(instance) {
        assertInstanceHasField(instance, this);

        for(let constraint of this.constaints) {
            constraint.validate(instance, value);
        }

        instance._data[this.name] = undefined;
        instance._states[this.name] = undefined;

        for(let constraint of this.constaints) {
            constraint.onSet(instance, undefined);
        }
    }

    // noinspection JSUnusedLocalSymbols
    serialize(instance, config) {
        assertInstanceHasField(instance, this);

        let value = this.validate(instance);

        if(value === null || value === undefined || value === drop) {
            return value;
        }

        if(this.type) {
            value = this.type.serialize(value);
        }

        return value;
    }

    deserialize(value) {
        if(this.type) {
            value = this.type.deserialize(value);
        }

        return value;
    }

    validate(instance) {
        let value = this.get(instance);

        if(value === undefined && this.missing === undefined) {
            throw new ValidationError("Field undefined", this);
        }

        if(value === null && !this.nullable) {
            throw new ValidationError("Field cannot be null", this);
        }

        if(this.validator) {
            this.validator(value);
        }

        return value;
    }

    addConstraint(constraint) {
        this.constaints.push(constraint);
    }

    getConfig() {
        return this._serialize;
    }

    setState(instance, state) {
        assertInstanceHasField(instance, this);

        if(['dirty', 'clean', undefined].indexOf(state) === -1) {
            throw new Error("Unknown state");
        }

        instance._states[this.name] = state;
    }

    isDirty(instance) {
        assertInstanceHasField(instance, this);

        return instance._states[this.name] === 'dirty';
    }

    isSet(instance) {
        assertInstanceHasField(instance, this);

        return instance._data[this.name] !== undefined;
    }

    /**
     * Creates a clone of the object.
     * @returns {ModelField}
     */
    clone() {
        let r = new this.constructor();
        Object.assign(r, this);
        return r;
    }

    /**
     * Creates a clone of the object and binds it to the class.
     * @param Class
     * @returns {ModelField}
     */
    bind(Class) {
        let r = this.clone();
        r.bound = Class;
        return r;
    }

    /**
     * Method that is used to decorate the class during initialization.  By default does nothing.  It can be
     * overridden.
     * @param Class
     */
    decorate(Class) {

    }
}


export class Relationship extends ModelField {
    constructor({rel, ...config}={}) {
        super(config);
    }
}


export function field({kind, key, placement, descriptor, initializer}) {
    let field = initializer();

    if(!field.key) field.key = key;
    if(!field.name) field.name = key;

    return {
        kind: 'method',
        key,
        placement: 'own',
        descriptor: {
            get() {
                return this.fields[key].get(this);
            },

            set(value) {
                this.fields[key].set(this, value, 'dirty');
            },

            initializer: field.initializer,
            configurable: descriptor.configurable,
            enumerable: descriptor.enumerable
        },

        finisher(Class) {
            Class.c[key] = field.bind(Class);
            field.decorate(Class);
            return Class;
        }
    };
}
