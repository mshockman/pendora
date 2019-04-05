import {isEmptyObject} from "./utility";


let uuid = 1,
    prefix = 'p-' + (''+Math.random()).replace(/\D/g, '');


export class Data {
    constructor() {
        this.expando = `${prefix}-${uuid++}`;
    }

    static acceptData(owner) {
        return owner.nodeType === 1 || owner.nodeType === 9 || !(+owner.nodeType);
    }

    cache(owner) {
        let cache = owner[this.expando];

        if(!cache) {
            cache = {};

            if(Data.acceptData(owner)) {
                if(owner.nodeType) {
                    owner[this.expando] = cache;
                } else {
                    Object.defineProperty(owner, this.expando, {
                        value: cache,
                        configurable: true
                    });
                }
            } else {
                return null;
            }
        }

        return cache;
    }

    set(owner, key, value) {
        let cache = this.cache(owner);

        if(typeof key === 'object') {
            for(let prop in key) {
                cache[prop] = key[prop];
            }
        } else {
            cache[key] = value;
        }

        return cache;
    }

    get(owner, key) {
        if(key === undefined) {
            return this.cache(owner);
        } else {
            let cache = owner[this.expando];

            if(cache) {
                return cache[key];
            }
        }
    }

    access(owner, key, value) {
        if(arguments.length === 2) {
            if(typeof key === 'object') {
                return this.set(owner, key);
            } else {
                return this.get(owner, key);
            }
        } else if(arguments.length === 1) {
            return this.cache(owner);
        } else if(arguments.length === 3) {
            return this.set(owner, key, value);
        }
    }

    remove(owner, ...keys) {
        let cache = owner[this.expando];

        if(!cache) return;

        if(arguments.length === 1) {
            if(owner.nodeType) {
                owner[this.expando] = undefined;
            } else {
                delete owner[this.expando];
            }
        } else {
            for(let key of keys) {
                delete cache[key];
            }
        }
    }

    hasData(owner) {
        let cache = owner[this.expando];
        return cache && !isEmptyObject(cache);
    }
}


export let privateCache = new Data();