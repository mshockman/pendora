


export function *items(object) {
    for(let key in object) {
        if(object.hasOwnProperty(key)) {
            yield [key, object[key]];
        }
    }
}


export function *keys(object) {
    for(let key in object) {
        if(object.hasOwnProperty(key)) {
            yield key;
        }
    }
}


export function *values(object) {
    for(let key in object) {
        if(object.hasOwnProperty(key)) {
            yield object[key];
        }
    }
}


export function *enumerate(iterable) {
    let i = 0;

    for(let value of iterable) {
        yield [i, value];
    }
}


export function *chain(...iterables) {
    for(let iter of iterables) {
        for(let value of iter) {
            yield value;
        }
    }
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
