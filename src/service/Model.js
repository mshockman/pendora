import {resolveField, assertInstanceHasField, getForeignKeyConstraint, getFieldSignature} from './functions';
import {ValidationError} from "./errors";


/**
 * A flag object that is used to mark a property to be dropped from serialization.
 * @type {{}}
 */
export const drop = {};


/**
 * The base model class.  All other models should inherit from this.
 */
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

    // noinspection JSUnusedGlobalSymbols
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

    static getDefaultConfig() {
        let config = {};

        for(let field of Object.values(this.c)) {
            config[field.name] = field.getConfig();
        }

        return config;
    }

    /**
     * Validates the object and returns the results as a new dictionary.
     * Raises ValidationError on invalid field.
     */
    serialize(config) {
        if(!config) {
            config = this.constructor.getDefaultConfig();
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
                } else {
                    console.log("Dropping");
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

    /**
     * Returns the primary key value.
     * @returns {*}
     */
    get pk() {
        return this.constructor.getPrimaryKeyField().get();
    }

    /**
     * Returns a list of all of the models fields.
     * @returns {*}
     */
    get fields() {
        return this.constructor.c;
    }

    /**
     * Static method that returns the primary key field.
     * @returns {{pk}|*}
     */
    static getPrimaryKeyField() {
        for(let field of Object.values(this.c)) {
            if(field.pk) {
                return field;
            }
        }
    }

    /**
     * Static property that returns a list of all of the models properties.
     * @returns {{}}
     */
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

    /**
     * Takes an unserialized data object and deserializes into a new model.
     * @param data
     * @returns {Model}
     */
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


/**
 * The ModelField class is used to describe the behavior of individual model properties and control how they are
 * serialized, deserialized, set, get, deleted, and validated.
 */
export class ModelField {
    constructor({type=null, missing=undefined, nullable=false, validator=null, serialize=true, pk=false, constraints=null, initializer=() => undefined, unique=false, ...config}={}) {
        this.name = null; // The name of the name on the model.
        // noinspection JSUnusedGlobalSymbols
        this.key = null; // The name of the key in the database.
        this.bound = null;
        this.constaints = [];

        this.type = type;
        this.missing = missing;
        this.nullable = nullable;
        this.validator = validator;
        this.pk = pk;
        this.unique = unique;
        this.initializer = initializer;

        this._serialize = serialize;

        if(constraints) {
            for(let constraint of constraints) {
                this.addConstraint(constraint);
            }
        }

        if(config) Object.assign(config);
    }

    /**
     * The getter method of the property.
     * @param instance
     * @returns {*}
     */
    get(instance) {
        assertInstanceHasField(instance, this);
        return instance._data[this.name];
    }

    // noinspection JSUnusedGlobalSymbols
    /**
     * The setter method of the property.
     * @param instance - The model instance to set the value on.
     * @param value - The value to set.
     * @param state - The state to update the property to.  Defaults to dirty.
     */
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

    /**
     * Clears the field on the instance and sets its state to undefined.
     * @param instance
     */
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
    /**
     * Returns the instances serialized property.
     * @param instance
     * @param config
     * @returns {*}
     */
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

    /**
     * Deserializes the value for the field.
     * @param value
     * @returns {*}
     */
    deserialize(value) {
        if(this.type) {
            value = this.type.deserialize(value);
        }

        return value;
    }

    /**
     * Returns the validated value for the instance.
     * @param instance
     * @returns {*}
     */
    validate(instance) {
        let value = this.get(instance);

        if(value === undefined) {
            if(this.missing === undefined) {
                throw new ValidationError(`Field ${this.name} undefined`, this);
            } else {
                return this.missing;
            }
        }

        if(value === null) {
            if(!this.nullable) {
                throw new ValidationError(`Field ${this.name} cannot be null`, this);
            } else if(this.nullable === drop) {
                return drop;
            } else {
                return null;
            }
        }

        if(this.validator) {
            this.validator(value);
        }

        return value;
    }

    /**
     * Adds a constraint to the field.
     * @param constraint
     */
    addConstraint(constraint) {
        if(constraint.field) {
            throw new Error("Constraint is already bound to field.");
        }

        constraint.field = this;
        this.constaints.push(constraint);
    }

    /**
     * Retrieves the default config for the field.
     * @returns {*}
     */
    getConfig() {
        return this._serialize;
    }

    /**
     * Set the fields state.
     * @param instance
     * @param state Can be dirty, clean to undefined.
     */
    setState(instance, state) {
        assertInstanceHasField(instance, this);

        if(['dirty', 'clean', undefined].indexOf(state) === -1) {
            throw new Error("Unknown state");
        }

        instance._states[this.name] = state;

        for(let constraint of this.constaints) {
            constraint.onStateChange(instance, state);
        }
    }

    /**
     * Tests to see if the field is dirty.
     * @param instance
     * @returns {boolean}
     */
    isDirty(instance) {
        assertInstanceHasField(instance, this);

        return instance._states[this.name] === 'dirty';
    }

    /**
     * Tests to see if the field is set.
     * @param instance
     * @returns {boolean}
     */
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

    // noinspection JSUnusedGlobalSymbols
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

    /**
     * Returns the bound models name as a string.
     * @returns {String}
     */
    getModelName() {
        return this.bound.name;
    }

    /**
     * Returns the field full signature.
     * @returns {string}
     */
    getFieldSignature() {
        return `${this.bound.name}.${this.name}`;
    }
}


/**
 * Adds a foreign key constraint to a field.
 */
export class ForeignKey {
    constructor(fk) {
        this.field = null;
        this.fk = getFieldSignature(fk);
    }

    getModelName() {
        let parts = this.fk.split('.');

        if(parts.length === 2) {
            return parts[0] || this.field.bound.name;
        } else {
            return this.field.bound.name;
        }
    }

    getFieldName() {
        let parts = this.fk.split('.');

        if(parts.length === 2) {
            return parts[1];
        } else {
            return parts[0];
        }
    }

    onSet(instance, value) {

    }

    validate(instance, value) {

    }

    onStateChange(instance, newState) {

    }
}


/**
 * Creates a relationship field.  A relationship field can point to another model or a list of models depending on
 * where the foreign key is located.
 */
export class Relationship extends ModelField {
    constructor({rel, fk=null, type=null, ...config}={}) {
        super(config);
        this._related = rel;
        this.fk = fk;
        // The relationship type.  Can be either OneToOne, OneToMany or null.  If null the
        // true relationship type will be determined by where the Foreign key is located.
        // If it is located on the related model then it is a OneToMany.  If it is located
        // on the bound model this it is a OneToOne.  If no Foreign key is set then this
        // field is required to that the relationship knows how to handle the models.
        this.type = type;
    }

    /**
     * Returns the relationship model.
     */
    getRelatedModel() {
        if(!this._related.prototype || !(this._related.prototype instanceof Model)) {
            this._related = this._related();
        }

        return this._related;
    }

    /**
     * Returns the foreign key field.
     * @returns {*}
     */
    getForeignKeyField() {
        let related = this.getRelatedModel();

        if(!this.fk) {
            for(let field of this.bound.fields) {
                let foreignKeyConstraint = getForeignKeyConstraint(field);

                if(foreignKeyConstraint && related.name === foreignKeyConstraint.getModelName()) {
                    return field;
                }
            }
        } else {
            return resolveField(this.fk, [this.bound, related]);
        }
    }

    /**
     * Returns the type of relationship this is.  Can be either OneToOne or OneToMany.
     *
     * OneToOne relationship are pointers to other models.
     * OneToMany relationships are lists of other models.
     *
     * @returns {string}
     */
    getRelationshipType() {
        if(this.type) return type;

        let field = this.getForeignKeyField();

        if(field.bound === this.bound) {
            return "OneToOne";
        } else {
            return "OneToMany";
        }
    }

    serialize(instance, config) {
        let value = this.validate(instance);

        if(value === drop || value === null || value === undefined) return value;

        if(!config) {
            config = this.getConfig();
        }

        if(this.getRelationshipType() === "OneToMany") {
            let r = [];

            for(let item of value) {
                r.push(item.serialize(config));
            }

            return r;
        } else { // OneToOne
            return value.serialize(config);
        }
    }

    deserialize(value) {
        let related = this.getRelatedModel();

        if(this.getRelationshipType() === 'OneToMany') {
            let r = [];

            for(let item of value) {
                r.push(related.deserialize(item));
            }

            return r;
        } else {
            return related.deserialize(value);
        }
    }
}


/**
 * Decorator that registers a model field.
 * @param kind
 * @param key
 * @param placement
 * @param descriptor
 * @param initializer
 * @returns {*}
 */
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
