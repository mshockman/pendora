import $ from 'jquery';


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
            context = $(document);
        } else {
            context = $(context);
        }

        let widgets = context.find("[data-init]");

        widgets.each((x, element) => {
            let $target = $(element);
            const classes = ($target.attr('data-init') || '').split(/\s+/);

            for(let c of classes) {
                // noinspection JSValidateTypes
                c = c.split(':');

                let cls = this.registry[c[0]],
                    namespace = c.length > 1 ? c[1] : '',
                    key = namespace ? `${cls}.${namespace}` : cls;

                if(cls) {
                    let initialized = $target.data('initialized');

                    if(!initialized) {
                        initialized = {};
                        $target.data('initialized', initialized);
                    }

                    if(!initialized[key]) {
                        initialized[key] = cls(element);
                    }
                } else {
                    throw new Error(`No component registered called ${cls}`);
                }
            }
        });
    }

    static register(name, fn) {
        return this.loader.register(name, fn);
    }

    static load(context) {
        return this.loader.load(context);
    }
}


AutoLoader.loader = new AutoLoader();


$(() => {
    if(AutoLoader.autoLoad) {
        AutoLoader.load();
    }
});
