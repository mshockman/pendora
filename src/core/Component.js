import Publisher from "./Publisher";
import {selectElement, addClasses, removeClasses} from "./utility";
import Rect from "./vectors/Rect";
import {KeyError} from "./errors";


export const SYMBOLS = {
    appendChild: Symbol("appendChild")
};


export default class Component extends Publisher {
    #element;
    #timers;

    constructor(element) {
        super();

        this.#element = selectElement(element);
    }

    render() {

    }

    appendTo(selector) {
        if(typeof selector === 'string') {
            document.querySelector(selector).appendChild(this.#element);
        } else if(selector.nodeType && selector.appendChild) {
            selector.appendChild(this.#element);
        } else if(selector[SYMBOLS.appendChild]) {
            selector[SYMBOLS].appendChild(this.#element);
        } else if(selector.#element) {
            selector.#element.appendChild(this.#element);
        }
    }

    // noinspection JSUnusedGlobalSymbols
    removeFrom() {
        if(this.#element.parentElement) {
            this.#element.parentElement.removeChild(this.#element);
        }
    }

    getBoundingClientRect() {
        return Rect.getBoundingClientRect(this.#element);
    }

    getAttribute(name) {
        return this.#element.getAttribute(name);
    }

    hasAttribute(name) {
        return this.#element.hasAttribute(name);
    }

    removeAttribute(name) {
        return this.#element.removeAttribute(name);
    }

    setAttribute(name, value) {
        return this.#element.setAttribute(name, value);
    }

    addClass(classes) {
        return addClasses(this.#element, classes);
    }

    removeClass(classes) {
        return removeClasses(this.#element, classes);
    }

    /**
     * Creates a timer with the given name.  Only one timer with that name can be active per object.
     * If another timer with the same name is created the previous one will be cleared if `clear` is true.
     * Otherwise if `clear` is false a KeyError with be thrown.  The callback function for the timer is called
     * with the current object as it's `this` and the timer object as it's only parameter following the pattern
     *
     * this::fn(timer);
     *
     * @param name {String} The name of the timer.
     * @param fn {function(timer)} Function to call.
     * @param time {Number} The time to wait.
     * @param interval If true setInterval will be used instead of setTimeout
     * @param clear If true an previous timers of the same name will be canceled before creating a new one.  Otherwise a KeyError will be thrown.
     * @returns {{status, id, cancel, type}}
     */
    startTimer(name, fn, time, interval=false, clear=true) {
        if(!this.#timers) {
            this.#timers = {};
        }

        if(clear && this.#timers[name]) {
            this.#timers[name].cancel();
        } else if(this._timers[name]) {
            throw new KeyError("Timer already exists.");
        }

        let timer = this.#timers[name] = {
            status: 'running',
            id: null,
            cancel: null,
            type: null,
        };

        if(interval) {
            let id = timer.id = setInterval((timer) => {
                fn.call(this, timer);
            }, time, timer);

            timer.type = 'interval';

            timer.cancel = () => {
                if(this.#timers[name] === timer) {
                    clearInterval(id);
                    delete this.#timers[name];
                    timer.status = 'canceled';
                }
            };
        } else {
            let id = timer.id = setTimeout((timer) => {
                delete this.#timers[name];
                timer.status = 'complete';
                fn.call(this, timer);
            }, time, timer);

            timer.type = 'timeout';

            timer.cancel = () => {
                if(this.#timers[name] === timer) {
                    clearTimeout(id);
                    delete this.#timers[name];
                    timer.status = 'canceled';
                }
            };
        }

        return timer;
    }

    /**
     * Clears the timer with the given name.
     *
     * @param name
     * @returns {boolean} True if a timer was canceled. False if not timer exists.
     */
    clearTimer(name) {
        if(this.#timers && this.#timers[name]) {
            this.#timers[name].cancel();
            return true;
        }

        return false;
    }

    // noinspection JSUnusedGlobalSymbols
    /**
     * Returns the timer object if it exists.
     *
     * @param name
     * @returns {*}
     */
    getTimer(name) {
        return this.#timers && this.#timers[name] ? this.#timers[name] : null;
    }

    hasTimer(name) {
        return !!this.getTimer(name);
    }

    get isDisabled() {
        return this.classList.contains('disabled');
    }

    set isDisabled(value) {
        let isDisabled = this.isDisabled;

        if(!isDisabled && value) {
            this.classList.remove('disabled');
        } else if(isDisabled && !value) {
            this.classList.add('disabled');
        }
    }

    get disabled() {
        return this.isDisabled;
    }

    set disabled(value) {
        this.isDisabled = value;
    }

    get id() {
        return this.#element.id;
    }

    set id(value) {
        this.#element.id = value;
    }

    get style() {
        return this.#element.style;
    }

    set style(value) {
        this.#element.style = value;
    }

    get classList() {
        return this.#element.classList;
    }

    set classList(value) {
        this.#element.classList = value;
    }

    get dataset() {
        return this.#element.dataset;
    }

    set dataset(value) {
        this.#element.dataset = value;
    }

    get element() {
        return this.#element;
    }
}
