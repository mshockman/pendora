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
