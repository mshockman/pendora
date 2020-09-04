/**
 * @interface
 */
export class PublisherInterface {
    on(topic, callback) {}

    once(topic, fn) {}

    off(topic, callback) {}

    hasEvent(topic, callback) {}

    publish(topic, ...args) {}

    passTopic(target, topic) {}
}
