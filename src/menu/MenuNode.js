import Publisher, {STOP} from "core/Publisher";
import {KeyError} from "core/errors";
import {addClasses, removeClasses} from "core/utility";
import {attachMenuInstance, detachMenuInstance, hasMenuInstance, getMenuInstance, getClosestMenuNodeByElement} from "./utility";


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
        this._eventListeners = {};
        this._keyboardNavigationEnabled = false;
        this._timers = {};
        /**
         * @type {undefined|null|HTMLElement}
         * @private
         */
        this._element = undefined;

        this.nodeType = null;
        this.isController = false;
        // noinspection JSUnusedGlobalSymbols
        this.closeOnSelect = false;
    }

    /**
     * Initializes the event listeners for the menu tree.  Click, mouse-over and mouse-out are bound.  Events are
     * delegated to their child nodes as needed.  If an event is received where the node is the direct controller of
     * the event will be ignored.
     */
    init() {
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

        this.addEventListener('mousedown', handleEvent);
        this.addEventListener('mouseover', handleEvent);
        this.addEventListener('mouseout', handleEvent);
        this.addEventListener('click', handleEvent);
        this.addEventListener('keydown', handleEvent);

        this.isController = true;

        this.publish('init', this);
    }

    initKeyboardNavigation() {
        if(!this._keyboardNavigationEnabled) {
            this._keyboardNavigationEnabled = true;
        }
    }

    registerTopics() {
        if (this._isTopicInit) return;
        this._isTopicInit = true;

        this.on('event.keydown', (topic) => this.onKeyDown(topic));
    }

    /**
     * Unbinds all event listeners.
     */
    destroy() {
        this.clearAllRegisteredEvents();

        this.isController = false;
        // noinspection JSUnusedGlobalSymbols
        this._keyboardNavigationEnabled = false;
        this.element = null;

        this.publish('destroy', this);

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
    // Tree transversal and manipulation functions.

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
        return parent ? parent.closest(node => node.isMenu()) : null;
    }

    // noinspection JSUnusedGlobalSymbols
    /**
     * Reference to the first ancestor node in the menu tree who is an item. Returns null if it does not exist.
     *
     * @returns {MenuNode|null}
     */
    get parentItem() {
        let parent = this.parent;
        // noinspection JSUnresolvedVariable,JSUnresolvedFunction
        return parent ? parent.closest(node => node.isMenuItem()) : null;
    }

    /**
     * Reference to the next sibling node in the menu tree.
     *
     * @returns {MenuNode|null}
     */
    get nextSibling() {
        return this.getOffsetSibling(1);
    }

    // noinspection JSUnusedGlobalSymbols
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

    get isRoot() {
        return this.root === this;
    }

    // noinspection JSUnusedGlobalSymbols
    get enabledChildren() {
        return this.children.filter(item => !item.isDisabled);
    }

    /**
     * Returns the target active item in the tree.
     * @returns {*|{isActive}|null}
     */
    get activeItem() {
        let activeItem = null;

        if(this.isActive) {
            for(let child of this.children) {
                if(child.isActive) {
                    if(child.isMenuItem && child.isMenuItem()) {
                        activeItem = child.activeItem || child;
                    } else {
                        activeItem = child.activeItem || activeItem;
                    }
                    break;
                }
            }
        }

        return activeItem;
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
        if(node.nodeType) {
            node = getClosestMenuNodeByElement(node);
            return node ? this.contains(node) : false;
        }

        while(node) {
            if(node === this) {
                return true;
            }

            node = node.parent;
        }

        return false;
    }

    /**
     * Checks to see if the element is contained within the menu node.  Has to check every child manually since
     * it's not guaranteed that children are descendants of their parent menu nodes in the dom tree.  Probably a very
     * costly method, shouldn't be overused.
     *
     * @param element
     * @returns {boolean}
     */
    containsElement(element) {
        if(this.element.contains(element)) {
            return true;
        }

        for(let child of this.children) {
            if(child.containsElement(element)) {
                return true;
            }
        }

        return false;
    }

    // noinspection JSUnusedGlobalSymbols
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
     * Returns the closest menu node instance bound to an element for the target HTMLElement in the current menu tree.
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

    // noinspection JSUnusedGlobalSymbols
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

    // noinspection JSUnusedGlobalSymbols
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

    //------------------------------------------------------------------------------------------------------------------
    // Widget functions
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

    /**
     * Alias for isDisabled getter.
     * @returns {boolean}
     */
    get disabled() {
        return this.isDisabled;
    }

    /**
     * Alias for isDisabled setter.
     * @param value
     */
    set disabled(value) {
        this.isDisabled = value;
    }

    // noinspection JSUnusedGlobalSymbols
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
            this.clearAllRegisteredEvents();
            detachMenuInstance(this._element);
            this._element = undefined;
        }

        attachMenuInstance(element, this);
        this._element = element;
        this._registerAllEvents();
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

    get id() {
        return this.element.id;
    }

    set id(id) {
        if(this.element) this.element.id = id;
    }

    get classList() {
        return this.element.classList;
    }

    set classList(value) {
        this.element.classList = value;
    }

    get dataset() {
        return this.element.dataset;
    }

    set dataset(value) {
        this.element.dataset = value;
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

    // noinspection JSUnusedGlobalSymbols
    removeClass(classes) {
        return removeClasses(this.element, classes);
    }

    //------------------------------------------------------------------------------------------------------------------
    // Menu state functions

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

    //------------------------------------------------------------------------------------------------------------------
    // Timer, topic and event functions

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

    // noinspection JSUnusedGlobalSymbols
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
     * @returns {null|{isController}|*}
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

    clearAllRegisteredEvents() {
        if(this.element) {
            for(let key of Object.keys(this._eventListeners)) {
                for(let listener of this._eventListeners[key]) {
                    this.element.removeEventListener(key, listener.callback, listener.bubble);
                }
            }
        }

        this._eventListeners = {};
    }

    _registerAllEvents() {
        for(let key of Object.keys(this._eventListeners)) {
            for(let listener of this._eventListeners[key]) {
                this.element.addEventListener(key, listener.callback, listener.bubble);
            }
        }
    }

    /**
     * A wrapper function around calling this.element.addEventListener.  Will register a listener on the element.
     * This function keeps a record of the event listeners that are attached to the element.  If the element
     * hasn't been rendered yet and this function is called attaching the element will be delayed until element is set.
     *
     * @param name
     * @param callback
     * @param bubble
     */
    addEventListener(name, callback, bubble=false) {
        if(!this._eventListeners[name]) {
            this._eventListeners[name] = [];
        }

        let listener = {callback, bubble};
        this._eventListeners[name].push(listener);

        if(this.element) {
            this.element.addEventListener(name, callback, bubble);
        }
    }

    removeEventListener(name, callback, bubble=false) {
        if(this._eventListeners[name]) {
            for(let i = 0, l = this._eventListeners[name].length; i < l; i++) {
                let listener = this._eventListeners[name][i];

                if(listener.callback === callback && listener.bubble === bubble) {
                    this._eventListeners.splice(i, 1);

                    if(!this._eventListeners[name].length) {
                        delete this._eventListeners[name];
                    }

                    return listener;
                }
            }
        }

        return null;
    }

    // noinspection JSUnusedGlobalSymbols
    hasEventListener(name, callback, bubble=false) {
        if(this._eventListeners[name]) {
            for(let listener of this._eventListeners[name]) {
                if(listener.callback === callback && listener.bubble === bubble) {
                    return true;
                }
            }
        }

        return false;
    }

    _rootKeyDown(topic) {
        if(this.isRoot) {
            let event = topic.originalEvent;

            if(event.key === "Escape") {
                this.deactivate();
                // noinspection JSUnresolvedFunction
                document.activeElement.blur();
                return;
            }

            let activeItem = this.activeItem,
                target = activeItem ? activeItem.parentMenu : this;

            target._navigate(event);
        }
    }

    onKeyDown(topic) {
        if(this._keyboardNavigationEnabled) {
            this._rootKeyDown(topic);
        }
    }

    //------------------------------------------------------------------------------------------------------------------
    // Tree parsing functions.

    /**
     * Parses the dom and initializes any menu or menuitem elements that are found.
     */
    parseDOM() {
        // if(this._children.length) {
        //     for(let child of this._children) {
        //         child.invalidateTree();
        //     }
        // }

        let walk = (node) => {
            for(let child of node.children) {
                if(hasMenuInstance(child)) {
                    let instance = getMenuInstance(child);
                    instance.setParent(this);
                } else {
                    let hasMenuItemAttribute = child.hasAttribute('data-menuitem'),
                        hasMenuAttribute = child.hasAttribute('data-menu');

                    if(hasMenuAttribute && hasMenuItemAttribute) {
                        throw new Error("Element cannot be both a menuitem and a menu.");
                    } else if(hasMenuAttribute) {
                        let menu = this.constructSubMenu({target: child});
                        menu.setParent(this);
                    } else if(hasMenuItemAttribute) {
                        let item = this.constructMenuItem({target: child});
                        item.setParent(this);
                    } else {
                        walk(child);
                    }
                }
            }
        };

        walk(this.element);
    }

    /**
     * @abstract
     * @param config
     */
    constructMenuItem(config) {

    }

    /**
     * @abstract
     * @param config
     */
    constructSubMenu(config) {

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
    // Static functions

    // noinspection JSUnusedGlobalSymbols
    /**
     * Returns the bound menu controller for the provided node.
     *
     * @static
     * @param element {HTMLElement}
     */
    static getInstance(element) {
        return getMenuInstance(element);
    }

    // noinspection JSUnusedLocalSymbols
    static getAttributes(element) {
        return {};
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

        let config = this.getAttributes(element);

        // let parameters = Attribute.deserialize(element.dataset, this.__attributes__);
        //
        // parameters.target = element;

        return new this({
            target: element,
            ...config
        });
    }

    /**
     * Used to determine if an item is navigable during keyboard navigation.
     * @returns {boolean}
     * @private
     */
    get isNavigable() {
        return !this.isDisabled && this.isVisible;
    }
}
