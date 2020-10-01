let TOPICS = Symbol('topics');


export function STOP() {
    throw STOP;
}


/**
 * @implements PublisherInterface
 */
export default class Publisher {
    constructor() {
        this[TOPICS] = {};
    }

    clearTopics() {
        this[TOPICS] = {};
    }

    on(topic, callback) {
        if(Array.isArray(topic)) {
            for(let t of topic) {
                this.on(t, callback);
            }

            return this;
        } else {
            if(!this[TOPICS][topic]) this[TOPICS][topic] = [];
            this[TOPICS][topic].push(callback);
            return this;
        }
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
        if(Array.isArray(topic)) {
            for(let t of topic) {
                this.off(t, callback);
            }
            return this;
        }

        if(arguments.length === 0) {
            // CLear all topics.
            this[TOPICS] = {};
            return this;
        } else if(arguments.length === 1) {
            // Clear single topic.
            this[TOPICS][topic] = [];
            return this;
        }

        if(!this[TOPICS] || !this[TOPICS][topic] || !this[TOPICS][topic].length) {
            // Topic list was either empty or didn't exist.  No need to remove anything.  Return;
            return this;
        }

        let callbacks = this[TOPICS][topic];

        for(let i = 0; i < callback.length; i++) {
            let cb = callbacks[i];
            if(cb === callback || cb.fn === callback) {
                callbacks.splice(i, 1);
                break;
            }
        }

        if(callbacks.length === 0) {
            delete this[TOPICS][topic];
        }

        return this;
    }

    hasEvent(topic, callback) {
        if(arguments.length === 1) {
            return !!this[TOPICS][topic];
        } else {
            let callbacks = this[TOPICS][topic];

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
        if(this[TOPICS][topic]) {
            let callbacks = this[TOPICS][topic].slice(0);

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

    passTopic(target, topic) {
        if(Array.isArray(topic)) {
            for(let t of topic) {
                this.passTopic(target, t);
            }
        } else {
            this.on(topic, (...args) => {
                target.publish(topic, ...args);
            });
        }
    }
}


/**
 * @interface
 */
class PublisherInterface {
    on(topic, callback) {}

    once(topic, callback) {}

    off(topic, callback) {}

    passTopic(target, topic) {}

    publish(topic, ...args) {}

    hasEvent(topic, callback) {}

    clearTopics() {}
}