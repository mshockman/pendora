const reg_whitespace = /\s+/;


function returnFalse() {
    return false;
}


function returnTrue() {
    return true;
}


export class Message {
    constructor(topic, options, sender) {
        this.timestamp = Date.now();
        this.topic = topic;
        this.target = null;
        this.sender = sender;
        this.forward = null;
        this.reverse = false;
        this.isMessageIntercepted = returnFalse;

        if(options) {
            Object.assign(this, options);
        }
    }

    interceptMessage() {
        this.isMessageIntercepted = returnTrue;
    }
}


/**
 * Provides an interface for Observable objects.  This class should be extended.
 *
 * Observable objects provide a mechanism for event tracking.  Events can be listened to by registering an event listener
 * with the `on` method.  You can remove an event listener with it's opposite method `off`.  After some listeners have
 * been registered you can fire an event using the `trigger` method.
 *
 * SCOPED EVENTS
 *
 * Events can have sub scopes.  Scopes are events that have the dot operator (.) in their name.  If a scoped event is
 * fired all parent scopes are also fired for that event.  For example the scoped event `modal.open` will all listeners
 * registered to the events modal.open, modal, and *.  * is a special event that fires for any event.  It's the global
 * event listener.
 * @deprecated
 */
export default class Observable {
    constructor() {
        this._events = {};
    }

    /**
     * Registers an event listener to one or more events.
     *
     * @param {String} events - A string of space separated event names to register to.
     * @param {Function} listener - A function to register to the events.
     */
    on(events, listener) {
        let eventList = events.split(reg_whitespace);

        for(let event of eventList) {
            if(!this._events[event]) {
                this._events[event] = [];
            }

            if(typeof listener !== 'function') {
                throw new TypeError('Callback was not a function.')
            }

            if(this._events[event].indexOf(listener) === -1) {
                this._events[event].push(listener);
            }
        }
    }

    /**
     * Removes an event listener.
     *
     * The `off` method removed event listeners that where registered with `on`.  Calling `off` with no arguments clears
     * all event listeners for the object.  Specific event listeners can be removed by providing combinations of
     * the function to remove, event names and event scopes.
     *
     * CLEARING AN EVENT NAME.
     * The `off` method can be used to remove all listeners from a single event by providing the event name with no
     * event listener.  In these cases the `off` method will remove every event listener from that event name.  The
     * `off` method will not remove listeners from child events scopes in these cases.
     *
     * CLEARING CHILD EVENT OR REMOVING A LISTENER FROM SPECIFIC SCOPES
     * The `off` method can be used to remove all listeners from every child event scope by providing the event name
     * suffixed with ".*" at the end of it.  In these cases the `off` method will match any child scope and clear it.
     * Note that this will not clear the top most scope itself.  If you want to clear both children and the root scope
     * you must pass the string formatted like "${eventName} ${eventName}.*".  For example that calling `off` with the
     * arguments "modal modal.*" will clear all modal events and child sub events.
     *
     * The `off` method also allows to remove a specific listeners by passing the listener as `off` second argument.
     * In these cases off will only remove the specified listener instead of clearing all events.
     *
     * REMOVE A LISTENER FROM ALL EVENTS
     * Finally the `off` method can remove an specific listener from any event by passing the listener as the first
     * argument with no second argument.  For example, off(listener).  In this case the `off` method will search for the
     * listener in every registered event.
     *
     * OFF CAN BE USED TO REMOVE A LISTENER FROM MULTIPLE EVENTS BY PASSING THOSE EVENTS AS A SPACE SEPARATED STRING
     * OFF EVENT NAME.
     *
     * @param events
     * @param listener
     */
    off(events, listener) {
        if(!arguments.length) {
            // If no arguments are passed clear all events.
            this._events = {};
        } else if(arguments.length === 1 && typeof arguments[0] === 'function') {
            // If only a function is passed remove that function from EVERY EVENT.
            for(let key in this._events) {
                if(this._events.hasOwnProperty(key) && this._events[key]) {
                    let i = this._events[key].indexOf(arguments[0]);

                    if(i !== -1) {
                        this._events[key].splice(i, 1);
                    }
                }
            }
        } else {
            // Either off(events, listener) or off(events) was called.
            // If off(events, listener) was called remove that listener from every passed event.
            // If off(events) was called clear every listener from every passed event.
            // You can pass multiple events is a space separated list.
            // You can select from scoped events by calling eventName.*
            events = events.split(reg_whitespace);

            for(let eventName of events) {
                if(eventName.endsWith('*')) {
                    eventName = eventName.substr(0, eventName.length-1); // Remove the last character, so *, from the string.

                    // Iterate over every event matching the once start start with the event name.
                    for(let key of this._events) {
                        if(this._events.hasOwnProperty(key) && this._events[key] && key.startsWith(eventName)) {
                            if(!listener) {
                                this._events[key] = [];
                            } else {
                                let i = this._events[key].indexOf(listener);
                                if(i !== -1) this._events[key].splice(i, 1);
                            }
                        }
                    }
                } else if(this._events[eventName]) {
                    if(!listener) {
                        this._events[eventName] = [];
                    } else {
                        let i = this._events[eventName].indexOf(listener);
                        if(i !== -1) this._events[eventName].splice(i, 1);
                    }
                }
            }
        }
    }

    /**
     * Triggers an event and the global event *.
     *
     * Event listeners of that event are called with the event name passed as the first argument and any additional
     * arguments provided to trigger are also passed.
     *
     * IF ANY EVENT RETURNS THE `BREAK` FLAG IMMEDIATE PROPAGATION OF THE EVENT WILL BE STOPPED.
     * @param event
     * @param args
     */
    trigger(event, ...args) {
        if(this._events['*']) {
            for(let listener of this._events['*']) {
                if(listener(event, ...args) === Observable.BREAK) return Observable.BREAK;
            }
        }

        if(event === '*') return;

        let parts = event.split('.');

        for(let i = 0, l = parts.length; i < l; i++) {
            let key = parts.slice(0, i+1).join('.');

            if(this._events[key]) {
                for(let listener of this._events[key]) {
                    if(listener(event, ...args) === Observable.BREAK) return Observable.BREAK;
                }
            }
        }
    }

    /**
     * Tests to see if the event listener is registered to the event name.
     *
     * @param eventName
     * @param listener
     * @returns {boolean}
     */
    hasEvent(eventName, listener) {
        if(this._events && this._events[eventName]) {
            return this._events[eventName].indexOf(listener) !== -1;
        } else {
            return false;
        }
    }

    /**
     * A shortcut for calling off("eventName eventName.*");
     * @param eventName
     */
    clearEvent(eventName) {
        this.off(eventName);
        this.off(`${eventName}.*`);
    }

    handleMessage(message) {
        let topics = ["*"];

        for(let _topic of message.address.split('.')) {
            if(topics.indexOf(_topic) === -1) {
                topics.push(_topic);
            }
        }
    }

    /**
     * Triggers an event that gets passed the OEvent object as it's only parameter.
     * @param topic
     * @param options
     * @param sender
     * @param reverse
     */
    sendMessage(topic, options, sender=null, reverse=false) {
        let message,
            events = ['*'];

        // User can pass an object as the only parameter.
        // In these cases the object should have a name property that will be used
        // as the event name.
        if(typeof name === 'object') {
            message = topic;
            message.target = this;
        } else {
            message = new Message(topic, options, sender);
            message.target = this;
        }

        if(topic !== '*') {
            let parts = topic.split('.');

            for(let i = 0, l = parts.length; i < l; i++) {
                events.push(parts.slice(0, i+1).join('.'));
            }
        }

        if(reverse) {
            events.reverse();
        }

        for(let e of events) {
            if(this._events[e]) {
                let listener = this._events[e];
                message.topic = e;

                if(listener(message) === Observable.BREAK || (message.isMessageIntercepted && message.isMessageIntercepted())) {
                    break;
                }
            }
        }

        if(message.forward) {
            let forward;

            if(typeof message.forward === 'function') {
                forward = message.forward(this);
            } else {
                forward = message.forward;
                message.forward = null;
            }

            if(forward && forward !== this) {
                forward.sendMessage(message);
            }
        }

        return message;
    }
}


export const BREAK = {};
Observable.BREAK = BREAK;
