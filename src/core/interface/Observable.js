const reg_whitespace = /\s+/;


export default class Observable {
    constructor() {
        this._events = {};
    }

    on(events, fn) {
        events = events.split(reg_whitespace);

        for(let event of events) {
            if(!this._events[event]) {
                this._events[event] = [];
            }

            if(typeof fn !== 'function') {
                throw new TypeError('Callback was not a function.')
            }

            if(this._events[event].indexOf(fn) === -1) {
                this._events[event].push(fn);
            }
        }
    }

    indexOfEvent(event, fn) {
        if(this._events && this._events[event]) {
            return this._events[event].indexOf(fn);
        }

        return -1;
    }

    off(events, fn) {
        events = events.split(reg_whitespace);

        for(let event of events) {
            let i = this.indexOfEvent(event, fn);

            if(i !== -1) {
                this._events[event].splice(i, 1);
            }
        }
    }

    trigger(event, ...args) {
        if(this._events && this._events[event]) {
            for(let fn of this._events[event]) {
                if(fn(...args) === Observable.BREAK) {
                    break;
                }
            }
        }
    }
}


Observable.BREAK = {};
