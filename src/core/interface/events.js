/**
 * An event interface that can be inherited by other classes or used directly.
 * You can add and remove event listeners by calling the `on` and `off` methods respectively.
 * Event name cannot include a space.  You can add or remove an event listener to multiple events by passing
 * a space separated list of name.
 *
 * Usage:
 *
 * let eventObject = new ObjectEvents();
 *
 * let fn = () => console.log("Hello World");
 * eventObject.on('event', fn);
 * eventObject.trigger('event');
 * >>> Hello World
 * eventObject.off('event', fn);
 * eventObject.trigger('event');
 * >>>
 *
 * CAPTURING EVERY EVENT
 *
 * The special event * is reserved.  The * event gets fired on every event that happens for the object.
 * eventObject.on('*', fn);
 * eventObject.trigger('anything');
 * >>> Hello World
 *
 * BINDING A FUNCTION TO MULTIPLE EVENTS SHORTCUT
 *
 * You can add or remove a function from multiple events with one call by passing a space separated list of event name.
 *
 * eventObject.on('click resize', fn);
 * eventObject.trigger('click'); // Hello World
 * eventObject.trigger('resize'); // Hello World
 */
export class ObjectEvents {
    constructor(decorator) {
        this._events = {};
        this._events.events = {};
        this._events.decorator = decorator;
        this._events.next = null;
    }

    /**
     * Add an event listener.
     * @param events - A space separated string of event names.
     * @param fn - A function to register as the event listener.
     */
    on(events, fn) {

    }

    /**
     * Removes an event listener.
     * @param events - A space separated string of event names.
     * @param fn - A function to register as the event listener.
     */
    off(events, fn) {

    }

    /**
     * Triggers can event.  Any additional arguments are are passed to the event listeners inside the event.args property.
     * Add event listeners are passed an object with the follow properties.
     *
     * event.type // the name of the event that was triggered.
     * event.timestamp // the current unix timestamp when the event was triggered.
     * event.args // Any additional arguments that where passed to trigger.
     * event.returnValue // The value that will be returned from trigger.
     * event.bubbles // true if the event should bubble.  Only works available if next is set.
     * event.data = {}
     * event.stopImmediatePropagation()
     * event.stopPropagation();
     * event.isPropagationStopped()
     * event.isImmediatePropagationStopped()
     *
     * If the first argument is not a string it is considered an event object.
     *
     * @param eventName - The name of the event to trigger.
     * @param args
     */
    trigger(eventName, ...args) {

    }

    /**
     * Returns the current index of the event in the event listener array.
     * @param eventName
     * @param fn
     */
    indexOfEvent(eventName, fn) {

    }

    /**
     * Tests to see if the eventName has the event listener.
     * @param eventName
     * @param fn
     */
    hasEvent(eventName, fn) {

    }
}


/**
 * The Event object represents an event that happens in the ObjectEvents class.
 */
export class Event {
    constructor() {

    }

    static copy(event) {

    }
}
