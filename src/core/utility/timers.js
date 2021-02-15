const TIMERS = new WeakMap();


export class TimersController {
    #timers;

    constructor() {
        this.#timers = {};
    }

    clearAll() {
        for(let name of Object.keys(this.#timers)) {
            this.clearTimer(name);
        }

        this.#timers = {};
    }

    setTimeout(name, handler, timeout, ...args) {
        if(this.#timers[name]) {
            throw new Error(`Timer already exists with the given name ${name}`);
        }

        return this.#timers[name] = new Timer(name, "timeout", this, handler, timeout, ...args);
    }

    setInterval(name, handler, interval, ...args) {
        if(this.#timers[name]) {
            throw new Error(`Timer already exists with the given name ${name}`);
        }

        return this.#timers[name] = new Timer(name, "interval", this, handler, interval, ...args);
    }

    forceSetTimeout(name, handler, timeout, ...args) {
        this.clearTimer(name);
        return this.setTimeout(name, handler, timeout, ...args);
    }

    forceSetInterval(name, handler, interval, ...args) {
        this.clearTimer(name);
        return this.setInterval(name, handler, interval, ...args);
    }

    clearTimer(name) {
        if(this.#timers[name]) {
            let timer = this.#timers[name];

            if(timer.status === "active") {
                return timer.cancel();
            } else {
                this.#timers[name] = null;
            }
        }
    }

    getTimerId(name) {
        if(this.#timers[name]) {
            return this.#timers[name].id;
        }

        return null;
    }

    hasTimer(name) {
        return !!this.#timers[name];
    }

    getTimerType(name) {
        if(this.#timers[name]) {
            return this.#timers[name].type;
        }
    }

    getTimer(name) {
        return this.#timers[name] || null;
    }
}


export default class Timer {
    #name;
    #type;
    #id;
    #controller;
    #status;

    constructor(name, type, controller, handler, timeout, ...args) {
        this.#name = name;
        this.#type = name;
        this.#controller = controller;
        this.#status = "active";

        if(this.#type !== "timeout" && this.#type !== "interval") {
            throw new Error("Invalid timer type.");
        }

        if(this.#controller.hasTimer(this.#name)) {
            throw new Error(`Controller already has active timer with the name ${this.#name}`);
        }

        if(this.#type === "timeout") {
            this.#id = setTimeout(() => {
                this.#id = null;
                this.#status = "complete";
                if(this.#controller) this.#controller.clearTimer(this.#name);
                return handler(...args);
            }, timeout);
        } else {
            this.#id = setInterval(() => {
                return handler(...args);
            });
        }
    }

    get id() {
        return this.#id;
    }

    get type() {
        return this.#type;
    }

    get controller() {
        return this.#controller;
    }

    get name() {
        return this.#name;
    }

    get status() {
        return this.#status;
    }

    cancel() {
        if(this.#id) {
            if(this.#type === "timeout") {
                clearTimeout(this.#id);
            } else {
                clearTimeout(this.#id);
            }

            this.#id = null;
            this.#status = "canceled";
            if(this.#controller) this.#controller.clearTimer(this.#name);
        }
    }

    static setTargetTimeout(object, name, handler, timeout, ...args) {
        if(!TIMERS.has(object)) {
            TIMERS.set(object, new TimersController());
        }

        let controller = TIMERS.get(object);

        return controller.setTimeout(name, handler, timeout, ...args);
    }

    static setTargetInterval(object, name, handler, interval, ...args) {
        if(!TIMERS.has(object)) {
            TIMERS.set(object, new TimersController());
        }

        let controller = TIMERS.get(object);

        return controller.setInterval(name, handler, interval, ...args);
    }

    static clearTargetTimer(target, name) {
        let controller = Timer.getTargetController(target);

        if(controller) {
            controller.clearTimer(name);
        }
    }

    static clearAllTargetTimers(target) {
        let controller = Timer.getTargetController(target);

        if(controller) {
            controller.clearAll();
        }
    }

    static destroyTargetTimers(target) {
        Timer.clearAllTargetTimers(target);
        TIMERS.delete(target);
    }

    static getTargetTimer(target, name) {
        let controller = Timer.getTargetController(target);

        return controller ? controller.getTimer(name) : null;
    }

    static hasTargetTimer(target, name) {
        return !!Timer.getTargetTimer(target, name);
    }

    static getTargetController(target) {
        return TIMERS.get(target) || null;
    }

    static isValidInterval(interval) {
        return typeof interval === "number" && Number.isFinite(interval) && Number.isInteger(interval) && interval >= 0;
    }

    static forceSetTargetTimeout(target, name, handler, timeout, ...args) {
        Timer.clearTargetTimer(target, name);
        return Timer.setTargetTimeout(target, name, handler, timeout, ...args);
    }

    static forceSetTargetInterval(target, name, handler, interval, ...args) {
        Timer.clearTargetTimer(target, name);
        return Timer.setTargetInterval(target, name, handler, interval, ...args);
    }
}