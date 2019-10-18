/**
 * Decorates a property so that it can take special keywords to inherit it's value up the parent tree.
 *
 * If it's value is "inherit" or "root" special actions are taken.
 *
 * On "inherit" the getter will use this.parent[key] as it's value or return undefined.
 * On "root" the getter will use this.root[key] as it's value or return undefined.
 *
 * If the value is anything else is behaves like normal.
 *
 * Usage:
 *  @inherit myField = <default value>;
 *
 * @param target
 * @returns {{kind: string, placement: string, descriptor: {set(*): void, enumerable: boolean, get(): (*|*), configurable: boolean}, key: *}|undefined|*}
 */
export function inherit(target) {
    let key = target.key,
        initializer = target.initializer || function() { return undefined };

    return {
        kind: 'method',
        placement: 'prototype',
        key: target.key,
        descriptor: {
            configurable: true,
            enumerable: false,

            get() {
                let value = this._props[key];
                if(value === undefined) value = initializer();  // todo set to init

                if(value === 'inherit') {
                    return this.parent ? this.parent[key] : undefined;
                } else if(value === 'root') {
                    let root = this.root;
                    return root ? root[key] : undefined;
                } else {
                    return value;
                }
            },

            set(value) {
                this._props[key] = value;
            }
        }
    };
}


export function publishTargetEvent(topic, bubble=false) {
    return function(descriptor) {
        let {value, ...desc} = descriptor.descriptor;

        function wrapper(event) {
            if(this.getTargetNode(event.target) === this) {
                if(bubble) {
                    this.dispatchTopic(topic, this, event);
                } else {
                    this.publish(topic, this, event);
                }

                return value.call(this, event);
            }
        }

        return {
            placement: descriptor.placement,
            key: descriptor.key,
            kind: descriptor.kind,
            descriptor: {
                value: wrapper,
                ...desc
            }
        };
    };
}