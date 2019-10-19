import Publisher from "core/Publisher";
import {KeyError} from "core/errors";
import {addClasses, removeClasses} from "core/utility";


export const MENU_MAP = new WeakMap();


export default class MenuNode extends Publisher {
    constructor() {
        super();
        this._parent = null;
        this._children = [];
        this._props = {};
        this._timers = {};
        /**
         * @type {undefined|null|HTMLElement}
         * @private
         */
        this._element = undefined;

        this._isActive = false;
        this._isVisible = true;
        this._isDisabled = false;

        this.nodeType = null;
        this.isController = false;
    }

    init() {
        if(this.boundEvents) return;

        this.boundEvents = {};

        let handleEvent = (event) => {
            let target = this.getTargetNode(event.target);

            if(target.getEventDelegator() === this) {
                target.dispatchTopic(`event.${event.type}`, {
                    target,
                    originalEvent: event
                });
            }
        };

        this.boundEvents.onMouseOver = handleEvent;
        this.boundEvents.onMouseOut = handleEvent;
        this.boundEvents.onClick = handleEvent;

        this.element.addEventListener('click', this.boundEvents.onClick);
        this.element.addEventListener('mouseover', this.boundEvents.onMouseOver);
        this.element.addEventListener('mouseout', this.boundEvents.onMouseOut);
        this.isController = true;
    }

    destroy() {
        if(this.events && this.hasElement()) {
            this.element.removeEventListener('click', this.boundEvents.onClick);
            this.element.removeEventListener('onMouseOut', this.boundEvents.onMouseOut);
            this.element.removeEventListener('onMouseOver', this.boundEvents.onMouseOver);
        }

        this.isController = false;
        this.boundEvents = null;
        this.element = null;
    }

    /**
     * Renders the component.
     */
    render() {

    }

    //------------------------------------------------------------------------------------------------------------------
    // Actions

    /**
     * Returns the parent MenuNode
     * @returns {null|MenuNode}
     */
    get parent() {
        return this._parent || null;
    }

    /**
     * Returns the root node of the menu tree.
     *
     * @returns {MenuNode}
     */
    get root() {
        let r = this,
            o = this;

        while(o) {
            o = o.parent;

            if(o) {
                r = o;
            }
        }

        return r;
    }

    /**
     * Returns the closest parent menu.
     * @returns {MenuNode|null}
     */
    get parentMenu() {
        let parent = this.parent;
        return parent.closest(node => node.nodeType === 'menu');
    }

    /**
     * Returns the closest parent item.
     * @returns {MenuNode|null}
     */
    get parentItem() {
        let parent = this.parent;
        return parent.closest(node => node.nodeType === 'menuitem' || node.nodeType === 'dropdown');
    }

    /**
     * Returns the next sibling node.
     * @returns {MenuNode|null}
     */
    get nextSibling() {
        return this.getOffsetSibling(1);
    }

    /**
     * Returns the previous sibling node.
     * @returns {MenuNode|null}
     */
    get previousSibling() {
        return this.getOffsetSibling(-1);
    }

    get children() {
        return this._children.slice(0);
    }

    get isActive() {
        return this._isActive;
    }

    set isActive(value) {
        value = !!value;

        if(value !== this._isActive) {
            if(value) {
                this.element.classList.add('active');
            } else {
                this.element.classList.remove('active');
            }

            this._isActive = value;
        }
    }

    get isDisabled() {
        return this._isDisabled;
    }

    set isDisabled(value) {
        value = !!value;

        if(value !== this._isDisabled) {
            if(value) {
                this.element.classList.add('disabled');
            } else {
                this.element.classList.remove('disabled');
            }

            this._isDisabled = value;
        }
    }

    get isVisible() {
        return this._isVisible;
    }

    set isVisible(value) {
        value = !!value;

        if(value !== this._isVisible) {
            if(value) {
                this.element.classList.remove('hidden');
            } else {
                this.element.classList.add('hidden');
            }

            this._isVisible = value;
        }
    }

    hasElement() {
        return !!this._element;
    }

    get element() {
        if(this._element === undefined) {
            this.element = this.render();
        }

        return this._element;
    }

    set element(value) {
        if(this._element) {
            MENU_MAP.delete(this._element);
            this._element = undefined;
        }

        if(typeof value === 'string') {
            this._element = document.querySelector(value);
            MENU_MAP.set(this._element, this);
        } else if(typeof value === 'function') {
            this._element = value.call(this);
            MENU_MAP.set(this._element, this);
        } else if(value) {
            this._element = value;
            MENU_MAP.set(this._element, this);
        } else {
            this._element = value; // null or undefined
        }
    }

    /**
     * Return the sibling offset from the current node.
     *
     * @param offset
     * @returns {null|MenuNode}
     */
    getOffsetSibling(offset=1) {
        let parent = this.parent;

        if(parent) {
            let children = parent.children,
                i = children ? children.indexOf(this) : -1;

            if(i >= 0) {
                i += offset;

                if(i >= 0) {
                    return children[i];
                }
            }
        }

        return null;
    }

    /**
     * Appends the component to the target selector.
     *
     * @param selector {string|HTMLElement|{append}}
     */
    appendTo(selector) {
        if(typeof selector === 'string') {
            document.querySelector(selector).appendChild(this.element);
        } else if(selector.appendChild) {
            selector.appendChild(this.element);
        } else if(selector.append) {
            selector.append(this.element);
        }
    }

    /**
     * Removes the component from the dom.
     *
     * @returns {MenuNode}
     */
    remove() {
        if(this.element.parentElement) {
            this.element.parentElement.removeChild(this.element);
        }

        return this;
    }

    /**
     * Returns the closest MenuNode up the tree that matches the provided test function.
     *
     * @param fn {function(node)}
     * @returns {MenuNode|null}
     */
    closest(fn) {
        let o = this;

        while(o) {
            if(fn.call(this, o)) return o;
            o = o.parent;
        }

        return null;
    }

    /**
     * Yields all descendants.
     *
     * @returns {IterableIterator<MenuNode>}
     */
    *getDescendants() {
        for(let child of this.children) {
            yield child;

            for(let grandchild of child.getDescendants()) {
                yield grandchild;
            }
        }
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
        if(clear && this._timers[name]) {
            this._timers[name].cancel();
        } else if(this._timers[name]) {
            throw new KeyError("Timer already exists.");
        }

        let timer = this._timers[name] = {
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
                if(this._timers[name] === timer) {
                    clearInterval(id);
                    delete this._timers[name];
                    timer.status = 'canceled';
                }
            };
        } else {
            let id = timer.id = setTimeout((timer) => {
                delete this._timers[name];
                timer.status = 'complete';
                fn.call(this, timer);
            }, time, timer);

            timer.type = 'timeout';

            timer.cancel = () => {
                if(this._timers[name] === timer) {
                    clearTimeout(id);
                    delete this._timers[name];
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
        if(this._timers[name]) {
            this._timers[name].cancel();
            return true;
        }

        return false;
    }

    /**
     * Returns the timer object if it exists.
     *
     * @param name
     * @returns {*}
     */
    getTimer(name) {
        return this._timers[name];
    }

    /**
     * Returns the MenuNode that is responsible for delegating the events.
     *
     * @returns {null|{isController}|any}
     */
    getEventDelegator() {
        let o = this.element;

        while(o) {
            let instance = MENU_MAP.get(o);

            if(instance && instance.isController) {
                return instance;
            }

            o = o.parentElement;
        }

        return null;
    }

    getTargetNode(target) {
        let o = target;

        while(o) {
            let instance = MENU_MAP.get(o);

            if(instance) {
                return instance;
            }

            if(o === this.element) {
                break;
            }

            o = o.parentElement;
        }

        return null;
    }

    getTargetItem(target) {
        let o = target;

        while(o) {
            let instance = MENU_MAP.get(o);

            if(instance && instance.isMenuItem()) {
                return instance;
            }

            if(o === this.element) {
                break;
            }

            o = o.parentElement;
        }

        return null;
    }

    getTargetMenu(target) {
        let o = target;

        while(o) {
            let instance = MENU_MAP.get(o);

            if(instance && instance.isMenu()) {
                return instance;
            }

            if(o === this.element) {
                break;
            }

            o = o.parentElement;
        }

        return null;
    }

    isMenuItem() {
        return false;
    }

    isMenu() {
        return false;
    }

    dispatchTopic(topic, ...args) {
        let o = this;

        while(o) {
            o.publish(topic, ...args);
            o = o.parent;
        }

        return this;
    }

    //------------------------------------------------------------------------------------------------------------------
    // Getters and Setters

    get id() {
        return this.element.id;
    }

    set id(id) {
        if(this.element) this.element.id = id;
    }

    get classList() {
        return this.element.classList;
    }

    get dataset() {
        return this.element.dataset;
    }

    get style() {
        return this.element.style;
    }

    set style(style) {
        this.element.style = style;
    }

    addClass(classes) {
        return addClasses(this.element, classes);
    }

    removeClass(classes) {
        return removeClasses(this.element, classes);
    }

    static getInstance(element) {
        return MENU_MAP.get(element);
    }
}