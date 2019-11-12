import Publisher, {STOP} from "core/Publisher";
import {KeyError} from "core/errors";
import {addClasses, removeClasses} from "core/utility";
import {attachMenuInstance, detachMenuInstance, hasMenuInstance, getMenuInstance} from "./utility";
import Attribute from "../core/attributes";


/**
 * The base class for Menu and MenuItem.  Provides the utilities that are necessary to manage and transverse the menu tree
 * and propagate events throughout it.
 * @extends {Publisher}
 */
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
        this.menuNodeType = "node";

        this.nodeType = null;
        this.isController = false;

        this.SubMenuClass = null;
        this.MenuItemClass = null;
    }

    /**
     * Initializes the event listeners for the menu tree.  Click, mouse-over and mouse-out are bound.  Events are
     * delegated to their child nodes as needed.  If an event is received where the node is the direct controller of
     * the event will be ignored.
     */
    init() {
        if(this.boundEvents) return;

        this.boundEvents = {};

        let handleEvent = (event) => {
            let target = this.getTargetNode(event.target),
                wrappedEvent = {
                    target,
                    originalEvent: event
                };

            if(target.getEventDelegator() === this) {
                target.dispatchTopic(`event.${event.type}`, wrappedEvent);
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

    /**
     * Unbinds all event listeners.
     */
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
     *
     * @param context {Object} Dictionary of values that may be used to render the component during templating.
     * @abstract
     */
    render(context) {

    }

    //------------------------------------------------------------------------------------------------------------------
    // Actions

    /**
     * Reference to the nodes parent or null if it is the root node of the tree.
     *
     * @returns {null|MenuNode}
     */
    get parent() {
        return this._parent || null;
    }

    /**
     * Reference to the root node of the tree.
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
     * Reference to the first ancestor node in the menu tree who is a menu.  Returns null if it does not exist.
     *
     * @returns {MenuNode|null}
     */
    get parentMenu() {
        let parent = this.parent;
        // noinspection JSUnresolvedVariable,JSUnresolvedFunction
        return parent.closest(node => node.isMenu());
    }

    /**
     * Reference to the first ancestor node in the menu tree who is an item. Returns null if it does not exist.
     *
     * @returns {MenuNode|null}
     */
    get parentItem() {
        let parent = this.parent;
        // noinspection JSUnresolvedVariable,JSUnresolvedFunction
        return parent.closest(node => node.isMenuItem());
    }

    /**
     * Reference to the next sibling node in the menu tree.
     *
     * @returns {MenuNode|null}
     */
    get nextSibling() {
        return this.getOffsetSibling(1);
    }

    /**
     * Reference to the previous sibling node in the menu tree.
     *
     * @returns {MenuNode|null}
     */
    get previousSibling() {
        return this.getOffsetSibling(-1);
    }

    /**
     * A list of all children for the node.
     *
     * @returns {[]}
     */
    get children() {
        return this._children.slice(0);
    }

    /**
     * True if the node is active.
     *
     * @returns {boolean}
     */
    get isActive() {
        return this.element.classList.contains('active');
    }

    /**
     * Sets the isActive state for the node.
     *
     * Will toggle the active class on the root element as needed.
     *
     * @param value
     */
    set isActive(value) {
        value = !!value;

        if(value !== this.isActive) {
            if(value) {
                this.element.classList.add('active');
            } else {
                this.element.classList.remove('active');
            }
        }
    }

    /**
     * Returns true if the current node is disabled.
     *
     * @returns {boolean}
     */
    get isDisabled() {
        return this.element.classList.contains('disabled');
    }

    /**
     * Sets the disabled state for the current node.
     *
     * @param value
     */
    set isDisabled(value) {
        value = !!value;

        if(value !== this.isDisabled) {
            if(value) {
                this.element.classList.add('disabled');
            } else {
                this.element.classList.remove('disabled');
            }
        }
    }

    get isRoot() {
        return this.root === this;
    }

    /**
     * Returns true if the current node is disabled or if any ancestor node is disabled.
     *
     * @returns {boolean}
     */
    getDisabled() {
        let o = this;

        while(o) {
            if(o.isDisabled) {
                return true;
            }

            o = o.parent;
        }

        return false;
    }

    /**
     * Returns true if the current node is visible.
     *
     * @returns {boolean}
     */
    get isVisible() {
        return !this.element.classList.contains('hidden');
    }

    /**
     * Sets the visible state of the node.
     *
     * @param value
     */
    set isVisible(value) {
        value = !!value;

        if(value !== this.isVisible) {
            if(value) {
                this.element.classList.remove('hidden');
            } else {
                this.element.classList.add('hidden');
            }
        }
    }

    /**
     * Returns true if the nodes element is defined.
     *
     * @returns {boolean}
     */
    hasElement() {
        return !!this._element;
    }

    /**
     * Gets the root HTMLElement of the node.
     *
     * @returns {HTMLElement}
     */
    get element() {
        if(this._element === undefined) {
            this.element = this.render({});
        }

        return this._element;
    }

    /**
     * Sets the root HTMLElement of the node.
     *
     * @param element
     */
    set element(element) {
        if(typeof element === 'string') {
            element = document.querySelector(element);
        } else if(typeof element === 'function') {
            element = element.call(this);
        }

        if(this._element === element) return;

        if(hasMenuInstance(element)) {
            throw new Error("Element is already bound to menu controller");
        }

        if(this._element) {
            detachMenuInstance(this._element);
            this._element = undefined;
        }

        attachMenuInstance(element, this);
        this._element = element;
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
     * Returns true if the provided node is a descendant of the current node.
     *
     * @param node
     * @returns {boolean}
     */
    contains(node) {
        while(node) {
            if(node.parent === this) {
                return true;
            }

            node = node.parent;
        }

        return false;
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
            let instance = getMenuInstance(o);

            if(instance && instance.isController) {
                return instance;
            }

            o = o.parentElement;
        }

        return null;
    }

    /**
     * Returns the target node for the given HTMLElement in the current menu tree.
     *
     * @param target {HTMLElement}
     * @returns {null|MenuNode}
     */
    getTargetNode(target) {
        let o = target;

        while(o) {
            let instance = getMenuInstance(o);

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

    /**
     * Returns the target item for the given HTMLElement in the current menu tree.
     *
     * @param target
     * @returns {null}
     */
    getTargetItem(target) {
        let o = target;

        while(o) {
            let instance = getMenuInstance(o);

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

    /**
     * Returns the target menu for the given HTMLElement in the current menu tree.
     *
     * @param target
     * @returns {null}
     */
    getTargetMenu(target) {
        let o = target;

        while(o) {
            let instance = getMenuInstance(o);

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

    /**
     * Returns true if the node is a menu item.  Should be overridden by subclasses that are menu item like.
     *
     * @returns {boolean}
     */
    isMenuItem() {
        return false;
    }

    /**
     * Returns true if the node is a menu.  Method should be defined by any object that should be treated like a menu.
     *
     * @returns {boolean}
     */
    isMenu() {
        return false;
    }

    /**
     * Publishes the topic to itself and bubbles up the menu tree.
     *
     * @param topic
     * @param args
     */
    dispatchTopic(topic, ...args) {
        let o = this;

        while(o) {
            if(o.publish(topic, ...args) === STOP) {
                return STOP;
            }

            o = o.parent;
        }
    }

    //------------------------------------------------------------------------------------------------------------------
    // Tree functions

    /**
     * Parses the dom and initializes any menu or menuitem elements that are found.
     */
    parseDOM() {
        if(this._children.length) {
            for(let child of this._children) {
                child.invalidateTree();
            }
        }

        let walk = (node) => {
            for(let child of node.children) {
                let role = child.dataset.role;

                if(hasMenuInstance(child)) {
                    let instance = getMenuInstance(child);
                    instance.setParent(this);
                } else if(role === 'menu') {
                    let menu = this.SubMenuClass.FromHTML(child);
                    menu.setParent(this);
                } else if(role === 'menuitem') {
                    let item = this.MenuItemClass.FromHTML(child);
                    item.setParent(this);
                } else {
                    walk(child);
                }
            }
        };

        walk(this.element);
    }

    /**
     * Invalidates all parent and child references.
     */
    invalidateTree() {
        this._parent = null;

        for(let child of this.children) {
            child.invalidateTree();
        }

        this._children = [];
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

    /**
     * Returns the bound menu controller for the provided node.
     *
     * @static
     * @param element {HTMLElement}
     */
    static getInstance(element) {
        return getMenuInstance(element);
    }

    /**
     * Constructs a menu node element for an HTMLElement.
     * @param element {HTMLElement|string}
     * @returns {MenuNode}
     * @constructor
     */
    static FromHTML(element) {
        if(typeof element === 'string') {
            element = document.querySelector(element);
        }

        let parameters = Attribute.deserialize(element.dataset, this.__attributes__);

        parameters.target = element;

        return new this(parameters);
    }
}
