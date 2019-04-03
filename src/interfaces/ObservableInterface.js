/**
 * @interface
 */
class ObservableInterface {
    on(events, listener) {}

    off(events, listener) {}

    trigger(event, ...args) {}

    hasEvent(eventName, listener) {}

    clearEvent(eventName) {}
}
