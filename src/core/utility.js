/**
 * Clamps a value between a minimum and maximum values.
 * @param value
 * @param minValue
 * @param maxValue
 * @returns {*}
 */
export function clamp(value, minValue=null, maxValue=null) {
    if(minValue !== null) {
        value = Math.max(value, minValue);
    }

    if(maxValue !== null) {
        value = Math.min(value, maxValue);
    }

    return value;
}


/**
 * Takes an iterable and returns the first none null or undefined value.
 * @param args
 */
export function firstValue(args) {
    for(let item of args) {
        if(item !== null && item !== undefined) {
            return item;
        }
    }
}


/**
 * Takes an iterable and returns true if all of the values are trueish.
 * @param iterable
 */
export function all(iterable) {
    for(let item of iterable) {
        if(!item) {
            return false;
        }
    }

    return true;
}


/**
 * Takes an iterable and returns true if any of the values are trueish.
 * @param iterable
 */
export function any(iterable) {
    for(let item of iterable) {
        if(item) return true;
    }

    return false;
}


export function proto(descriptor) {
    descriptor.placement = "prototype";
    return descriptor;
}


/**
 * Returns a random value from an array.
 * @param array
 * @returns {*}
 */
export function randomChoice(array) {
    return array[Math.floor(Math.random()*array.length)];
}


/**
 * Checks to see if 2 arrays are "equal".
 * @param array1
 * @param array2
 */
export function arraysEqual(array1, array2) {
    if(array1 === array2) return true; // The same object.
    if(array1 == null || array2 == null) return false;
    if(array1.length !== array2.length) return false;

    for(let i = 0, l = array1.length; i < l; i++) {
        if(array1[i] !== array2[i]) return false;
    }

    return true;
}
