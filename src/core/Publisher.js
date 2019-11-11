

export function STOP() {
    throw STOP;
}


export default class Publisher {
    constructor() {
        this._topics = {};
    }

    on(topic, callback) {
        if(!this._topics[topic]) this._topics[topic] = [];
        this._topics[topic].push(callback);
        return this;
    }

    once(topic, fn) {
        let on = (...args) => {
            this.off(topic, fn);
            return fn.apply(this, args);
        };

        on.fn = fn;
        this.on(topic, fn);
        return this;
    }

    off(topic, callback) {
        if(arguments.length === 0) {
            // CLear all topics.
            this._topics = {};
            return this;
        } else if(arguments.length === 1) {
            // Clear single topic.
            this._topics[topic] = [];
            return this;
        }

        if(!this._topics || !this._topics[topic] || !this._topics[topic].length) {
            // Topic list was either empty or didn't exist.  No need to remove anything.  Return;
            return this;
        }

        let callbacks = this._topics[topic];

        for(let i = 0; i < callback.length; i++) {
            let cb = callbacks[i];
            if(cb === callback || cb.fn === callback) {
                callbacks.splice(i, 1);
                break;
            }
        }

        if(callbacks.length === 0) {
            delete this._topics[topic];
        }

        return this;
    }

    hasEvent(topic, callback) {
        if(arguments.length === 1) {
            return !!this._topics[topic];
        } else {
            let callbacks = this._topics[topic];

            for(let i = 0; i < callbacks.length; i++) {
                let cb = callbacks[i];
                if(cb === callback || cb.fn === callback) {
                    return true;
                }
            }
        }

        return false;
    }

    publish(topic, ...args) {
        if(this._topics[topic]) {
            let callbacks = this._topics[topic].slice(0);

            for(let cb of callbacks) {
                try {
                    cb.apply(this, args);
                } catch (e) {
                    if(e === STOP) {
                        return e;
                    } else {
                        throw e;
                    }
                }
            }
        }

        return true;
    }
}
