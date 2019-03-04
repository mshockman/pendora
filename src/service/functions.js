/**
 * Resolves a field name string by searching in the list of Model classes.
 * A field name string can either just be the field name or the Model name and the field name separated by a period.
 *
 * Examples:
 *      model.name
 *      name
 *
 * Will returned undefined if no field was found.
 *
 * @param field
 * @param lookupList
 * @returns {*}
 */
export function resolveField(field, lookupList) {
    if(!Array.isArray(lookupList)) {
        lookupList = [lookupList];
    }

    let parts = field.split('.'),
        fieldName = null,
        modelName = null;

    if(parts.length === 2) {
        modelName = parts[0];
        fieldName = parts[1];
    } else if(parts.length === 1) {
        fieldName = parts[0];
    } else {
        throw new Error("Invalid field string.  Must be in format modelName.fieldName");
    }

    if(modelName) {
        lookupList = lookupList.filter((item) => item.name === modelName);
    }

    for(let ModelClass of lookupList) {
        let field = ModelClass.c[fieldName];

        if(field) return field;
    }
}


export function assertInstanceHasField(instance, field) {
    // Check to see that the field belongs to the instance.
    if(!instance.fields || instance.fields[field.name] !== field || field.bound !== instance.constructor) {
        throw new Error(`Object does not have the field ${field.name}`);
    }

    if(!instance._data) {
        throw new Error("Object missing _data private property");
    }

    if(!instance._states) {
        throw new Error("Object missing _states private property");
    }
}
