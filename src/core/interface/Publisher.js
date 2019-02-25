const reg_whitesplace = /\s+/;


/**
 * The Publisher class is an implementation of the pub / sub design pattern.
 *
 * Pub / Sub is a type of messaging pattern that allows for allows for objects to send and receive messages
 * though a message queue without being aware of one another.  This differs from the observable pattern where
 * Observers are aware of there subscribers.
 *
 * To use first create a new Publisher object.
 * let publisher = new Publisher();
 *
 * You can subscribe a topic using the `subscribe` method.
 * publisher.subscribe('my_topic', handlerFunction);
 *
 * Topic names may not contains spaces, * or . as these are reserved for special cases.
 *
 * You can subscribe the name handler function to multiple topics by passing a space separated list of topics
 * as the first parameter.
 * publisher.subscribe('topic1 topic2', handlerFunction);
 *
 * Once subscribe you can publish a message using the `publish` method.
 * publisher.publish('topic1', arg1, arg2...);
 *
 * The first argument passed to handler functions will be the name of the topic.  Additional arguments are passed
 * to the handler as well.
 *
 * SCOPED TOPICS
 *
 * Topics can be nested within each other using the . symbol.
 *
 * Scoped topics will also fire there parent topics.  For example the topic `user.added` will fire all of these events.
 *
 * * // Global topic
 * user
 * user.added
 *
 * The reverse is not true.  AKA firing a user topic will not trigger a user.added topic.
 *
 * CLEARING ALL TOPICS
 * publisher.unsubscribe();
 *
 * CLEARING ALL HANDLERS FROM A SINGLE TOPIC
 * publisher.unsubscribe('topic1');
 *
 * CLEARING SUB TOPICS
 *
 * You can clear all sub topics by using the .* symbol. AKA
 * publisher.unsubscribe('user.*');
 * Will unsubscribe from user.added and user.removed.
 *
 * If you want to unsubscribe from a topic and all of its subtopics you must pass the topic and a wild card matching
 * all subtopics aka:
 * publisher.unsubscribe('user user.*')
 * will unsubscribe from user user.added and user.removed
 */
class Publisher {
    constructor() {
        this._publisher = {};
    }

    subscribe(topics, listener) {
        topics = topics.split(reg_whitesplace);

        for(let topic of topics) {
            if(!this._publisher[topic]) {
                this._publisher[topic] = [];
            }

            this._publisher[topic].push(listener);
        }
    }

    unsubscribe(topics, listener) {
        if(arguments.length === 0) {
            topics = '*.*';
        }

        // handle unsubscribe(listener)
        // In this case remove the listener from every topic.
        if(typeof topics === 'function') {
            for(let key in this._publisher) {
                if(this._publisher.hasOwnProperty(key)) {
                    let i = this._publisher[key].indexOf(topics);

                    if(i !== -1) {
                        this._publisher[key].splice(i, 1);
                    }
                }
            }

            return;
        }

        // handle unsubscribe('*.*');
        // Remove all topics.
        if(arguments.length === 1 && topics === '*.*') {
            this._publisher = {};
            return;
        }

        topics = topics.split(reg_whitesplace);

        for(let topic of topics) {
            if(topic.endsWith('.*')) {
                topic = topic.substr(0, topic.length-1);

                for(let key in this._publisher) {
                    if(this._publisher.hasOwnProperty(key)) {
                        if(key.startsWith(topic)) {
                            if(arguments.length === 1) {
                                this._publisher[key] = [];
                            } else {
                                let i = this._publisher[key].indexOf(listener);

                                if(i !== -1) {
                                    this._publisher[key].splice(i, 1);
                                }
                            }
                        }
                    }
                }
            } else {
                if(this._publisher[topic]) {
                    if(arguments.length === 1) {
                        this._publisher[topic] = [];
                    } else {
                        let i = this._publisher[topic].indexOf(listener);

                        if(i !== -1) {
                            this._publisher[topic].splice(i, 1);
                        }
                    }
                }
            }
        }
    }

    publish(topic, ...args) {
        if(this._publisher['*']) {
            for(let listener of this._publisher['*']) {
                listener(topic, ...args);
            }
        }

        if(topic === '*') return;

        let parts = topic.split('.');

        for(let i = 0, l = parts.length; i < l; i++) {
            let key = parts.slice(0, i+1).join('.');

            if(this._publisher[key]) {
                for(let listener of this._publisher[key]) {
                    listener(topic, ...args);
                }
            }
        }
    }

    clearAllSubscriptions(topic) {
        topic = `${topic} ${topic}.*`;
        return this.unsubscribe(topic);
    }
}
