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
