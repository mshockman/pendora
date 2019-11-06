import {privateCache} from "./core/data";


export default class AutoLoader {
    static autoLoad = true;

    constructor() {
        this.registry = {};
    }

    register(name, func) {
        if(this.registry.hasOwnProperty(name) && this.registry[name]) {
            throw new Error("Duplicate component registered");
        }

        this.registry[name] = func;
    }

    load(context) {
        if(!context) {
            context = document;
        } else if(typeof context === 'string') {
            context = document.querySelector(context);
        }

        let widgets = context.querySelectorAll('[data-init]');

        for(let element of widgets) {
            let components = element.dataset.init.split(/\s+/),
                windowBind = element.dataset.windowBind;

            for(let c of components) {
                let parts = c.split(':'),
                    cls = this.registry[parts[0]],
                    namespace = parts.length > 1 ? parts[1] : '',
                    key = namespace ? `${parts[0]}.${parts[1]}` : parts[0];

                if(cls) {
                    let initialized = privateCache.get(element, 'initialized');

                    if(!initialized) {
                        initialized = {};
                        privateCache.set(element, 'initialized', initialized);
                    }

                    if(!initialized[key]) {
                        initialized[key] = cls(element);

                        if(windowBind) {
                            window[windowBind] = initialized[key];
                        }
                    } // else component is already loaded do nothing.  Could be encountered if load is called multiple times.
                } else {
                    throw new Error(`No component registered called ${key}`);
                }
            }
        }
    }

    /**
     *  Registers a loader function will the global autoloader instance.
     *
     * @param name {String}
     * @param fn {function(HTMLElement) : Object}
     */
    static register(name, fn) {
        return this.loader.register(name, fn);
    }

    static load(context) {
        return this.loader.load(context);
    }

    static getInitializedInstance(element, name) {
        let initialized = privateCache.get(element, 'initialized');

        if(initialized) {
            return initialized[name] || null;
        } else {
            return null;
        }
    }
}


/**
 * A UI class that adds the toggle behavior to an element.
 * The Toggle behavior is added using the autoloader using `data-init="toggle"` attribute.
 * It will target another element and attempt to call the toggle method of an initialized component.
 *
 * The toggle class takes two configuration attributes, data-target and data-toggle.
 *
 * data-target determines what element is targeted.  It takes a css selector that will be passed to document.querySelector().
 *
 * data-toggle determines the initialized component to toggle.  It takes the name of the component registered with AutoLoader.
 * For instance if you are toggling on a modal you should pass modal here.
 *
 * If the component does not offer a toggle method and another method needs to be called, you can set the optional
 * attribute data-method.  This attribute determines what method is called and defaults to the string toggle.
 *
 * Example Usage:
 *
 * <button type="button" data-init="toggle" data-target="#myModalId" data-toggle="modal">Show Modal</button>
 *
 * ---
 *
 * # Toggle classes on and off
 *
 * If you want to toggle a class on the target element on or off the toggle needs to be a css class string.  For
 * example to toggle the class "test" with a button you can use the following code:
 *
 * <button type="button" data-init="toggle" data-target="#mytarget" data-toggle=".test">Toggle Class</button>
 *
 * ---
 * # Target self
 *
 * If you an element to target itself, specify the string "self" as the target.
 *
 * <button type="button" data-init="toggle" data-target="self" data-toggle=".test">Toggle Class</button>
 */
export class Toggle {
    constructor(element) {
        if(typeof element === 'string') {
            this.element = document.querySelector(element);
        } else {
            this.element = element;
        }

        this._onClick = (event) => {
            this.onClick(event);
        };

        this.element.addEventListener('click', this._onClick);
    }

    destroy() {
        this.element.removeEventListener('click', this._onClick);
        this._onClick = null;
    }

    onClick() {
        let target = this.element.dataset.target,
            toggle = this.element.dataset.toggle,
            method = this.element.dataset.method || 'toggle';

        if(target === 'self') {
            target = this.element;
        } else {
            target = document.querySelector(target);
        }

        if(toggle.startsWith('.')) {
            toggle = toggle.substr(1);
            target.classList.toggle(toggle);
        } else {
            let instance = AutoLoader.getInitializedInstance(target, toggle);

            if(instance) {
                instance[method](this.element);
            } else {
                throw new Error("Could not find initialized instance during toggle action.");
            }
        }
    }
}


AutoLoader.loader = new AutoLoader();
AutoLoader.register('toggle', (element) => new Toggle(element));


window.addEventListener('load', () => {
    if(AutoLoader.autoLoad) {
        AutoLoader.load();
    }
});
