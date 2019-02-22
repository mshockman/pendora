

export class Model {
    constructor() {

    }

    /**
     * Returns the value of the field or undefined if the field is unset.  If the field does not exist
     * for the specified model, a KeyError si thrown.
     * @param field
     */
    get(field) {

    }

    /**
     * Sets the value of the field on the specified Model.  If the field does not exist a KeyError is thrown.
     * If dirty is true then the fields state will be set to dirty.  If false the fields state will not be changed.
     * You can clean the fields state by calling the `setFieldDirtyState` method.
     * @param field
     * @param value
     * @param dirty
     */
    set(field, value, dirty=true) {

    }

    /**
     * Deletes the value of the given field from the specified model.  A deleted value means that the field will be set
     * to the unset state.  It will return undefined when get is called.
     *
     * Throws KeyError if the model does not have the specified field.
     * @param field
     */
    del(field) {

    }

    /**
     * Sets the state of the field.  The field can be either clean or dirty.
     * Clean means that the field has not been updated since it's last been save or retrieved from the server.
     * Dirty means that the field has unsaved changes.
     *
     * If the specified model does not have the given field, then a KeyError will be thrown.
     * If the specified field is unset then StateError will be thrown.
     *
     * @param field
     * @param dirty
     */
    setFieldDirty(field, dirty) {

    }

    /**
     * Returns true if the current model has the specified field, false otherwise.
     * @param field
     * @return {Boolean}
     */
    hasField(field) {

    }

    /**
     * Will return the specified field or throw KeyError.
     * @param field
     */
    getField(field) {

    }

    /**
     * Tests to see if the specified field is set.  Returns false if it is in the unset state.
     * If multiple fields are passed then isSet will return true if all the fields are set.
     * @param fields
     */
    isSet(...fields) {

    }

    /**
     *
     * @param fields
     */
    isFieldDirty(...fields) {

    }

    /**
     * Returns true if any field is dirty.
     * @returns {Boolean}
     */
    isDirty() {

    }

    /**
     * Tests to see if the two models are equivalent.
     * @param model
     */
    isEquivalent(model) {

    }

    /**
     * Returns the models primary key or null if not primary key is set.
     */
    getPrimaryKey() {

    }

    /**
     * Validates each field.  Will throw a ValidationError if an invalid field is found.
     */
    validate() {

    }

    /**
     * Returns true if the model is valid, false otherwise.
     */
    isValid() {

    }

    /**
     * Validates the object and returns the results as a new dictionary.
     * Raises ValidationError on invalid field.
     */
    clean() {

    }

    /**
     * Returns a json string representation of the model.
     * @return {String}
     */
    tojson() {

    }

    static deserialize(data) {

    }

    static serialize(data) {

    }
}


export class ModelField {

}


export class Relationship {

}


export function field() {

}
