


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