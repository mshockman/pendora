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
            let components = element.dataset.init.split(/\s+/);

            for(let c of components) {
                let parts = c.split(':'),
                    cls = this.registry[parts[0]],
                    namespace = parts.length > 1 ? c[1] : '',
                    key = namespace ? `${c[0]}.${namespace}` : cls;

                if(cls) {
                    let initialized = privateCache.get(element, 'initialized');

                    if(!initialized) {
                        initialized = {};
                        privateCache.set(element, 'initialized', initialized);
                    }

                    if(!initialized[key]) {
                        initialized[key] = cls(element);
                    }
                } else {
                    throw new Error(`No component registered called ${cls}`);
                }
            }
        }
    }

    static register(name, fn) {
        return this.loader.register(name, fn);
    }

    static load(context) {
        return this.loader.load(context);
    }
}


AutoLoader.loader = new AutoLoader();


window.addEventListener('load', () => {
    if(AutoLoader.autoLoad) {
        AutoLoader.load();
    }
});