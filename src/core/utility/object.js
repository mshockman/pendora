/**
 * Returns a random value from an array.
 * @param array
 * @returns {*}
 */
export function randomChoice(array) {
    return array[Math.floor(Math.random() * array.length)];
}

/**
 * Checks to see if 2 arrays are "equal".
 * @param array1
 * @param array2
 */
export function arraysEqual(array1, array2) {
    if (array1 === array2) return true; // The same object.
    if (array1 == null || array2 == null) return false;
    if (array1.length !== array2.length) return false;

    for (let i = 0, l = array1.length; i < l; i++) {
        if (array1[i] !== array2[i]) return false;
    }

    return true;
}

/**
 * Tests to see if the object is empty.
 *
 * @param object
 * @return {boolean}
 */
export function isEmptyObject(object) {
    // noinspection LoopStatementThatDoesntLoopJS
    for (let key in object) {
        return false;
    }

    return true;
}

/**
 * Returns the object own property or the default value if it does not have that property.
 * @param obj
 * @param propName
 * @param defaultValue
 * @returns {*}
 */
export function getOwnProperty(obj, propName, defaultValue = undefined) {
    if (obj.hasOwnProperty(propName)) {
        return obj[propName];
    } else {
        return defaultValue;
    }
}

/**
 * Returns the obj value by following it's property path.  For example getPropertyByPath(a, 'b.c.d') is equivalent to
 * a.b.c.d but can be passed in string form.
 * @param obj
 * @param path
 * @returns {*}
 */
export function getPropertyByPath(obj, path) {
    let parts = path.split('.'),
        r = obj;

    for (let part of parts) {
        r = r[part];
    }

    return r;
}


export function setPropertyByPath(obj, path, value) {
    let parts = path.split("."),
        r = obj;

    for(let i = 0, l = parts.length-1; i < l; i++) {
        let part = parts[i];

        if(!r.hasOwnProperty(part)) {
            r = r[part] = {};
        } else {
            r = r[part];
        }
    }

    r[parts[parts.length-1]] = value;
    return obj;
}


export function hasPropertyPath(obj, path) {
    let parts = path.split("."),
        r = obj;

    for(let part of parts) {
        if(!r.hasOwnProperty(part)) {
            return false;
        }

        r = r[part];
    }

    return true;
}


/**
 * rangeFindItem
 *
 * Searches an array starting at the starting index and heads towards the ending index and returns the first item that
 * matches the predicate function.  If no item is found then undefined will be returned.  This function can search an
 * array both forwards and backwards.  Just start at a greater point then the ending point and the function will
 * handle the rest.
 *
 * @param array - The array to search
 * @param predicate - The matching function.  Should return true if the item is a match.
 * @param startingIndex - The index to start from.
 * @param endingIndex - The index to end at.  (Will also search this index)
 * @returns {*}
 */
export function rangeFindItem(array, predicate, startingIndex=0, endingIndex=null) {
    let i;

    if(endingIndex === null) {
        endingIndex = array.length-1;
    }

    i = startingIndex;

    while(true) {
        let item = array[i];

        if(predicate(item)) {
            return item;
        }

        if(startingIndex > endingIndex) {
            if(i <= endingIndex) return;
            i--;
        } else {
            if(i >= endingIndex) return;
            i++;
        }
    }
}


/**
 * Assigns all own values from the values object that are not null or undefined.
 * @param obj
 * @param values
 * @return {*}
 */
export function assignNotNull(obj, values) {
    for(let key in values) {
        if(values.hasOwnProperty(key)) {
            let v = values[key];

            if(v !== null && v !== undefined) {
                obj[key] = v;
            }
        }
    }

    return obj;
}


export function exportWND(obj) {
    Object.assign(window, obj);
}
