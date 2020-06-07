import MenuNode from "./MenuNode";
import MenuItem from "./MenuItem";
// import {inherit} from './decorators';
import {Attribute, AttributeSchema, Integer, Bool, CompoundType} from "../core/serialize";
import {modulo} from "../core/utility";
import {createFragment} from "../core/utility";


const INT_OR_BOOL_TYPE = new Attribute(new CompoundType(Bool, Integer), Attribute.DROP, Attribute.DROP),
    BOOL_TYPE = new Attribute(Bool, Attribute.DROP, Attribute.DROP);


export const MENU_ATTRIBUTE_SCHEMA = new AttributeSchema({
    closeOnBlur: INT_OR_BOOL_TYPE,
    timeout: INT_OR_BOOL_TYPE,
    autoActivate: INT_OR_BOOL_TYPE,
    openOnHover: INT_OR_BOOL_TYPE,
    closeOnSelect: INT_OR_BOOL_TYPE,
    delay: INT_OR_BOOL_TYPE,
    toggle: BOOL_TYPE,
    visible: BOOL_TYPE
});


function _isNavigableChild(item) {
    return item.isNavigable;
}


function _findFirstNavigableChild(children) {
    return children.find(_isNavigableChild);
}


function _findAllNavigableChildren(children) {
    return children.filter(_isNavigableChild);
}


/**
 * @abstract
 */
export class AbstractMenu extends MenuNode {
    // @inherit positioner;
    // @inherit delay = false;

    #positioner;
    #delay;

    constructor({
            target,
            closeOnBlur=false, timeout=false, autoActivate=false, openOnHover=false, toggle=false,
            closeOnSelect=true, delay="inherit", positioner="inherit", direction="vertical"}={}
            ) {

        super(target);

        this.closeOnBlur = closeOnBlur; // both sub-item and menu
        this.timeout = timeout; // both sub-item and menu
        // noinspection JSUnusedGlobalSymbols
        this.autoActivate = autoActivate; // sub-item property
        // noinspection JSUnusedGlobalSymbols
        this.openOnHover = openOnHover; // sub-item property
        this.toggle = toggle;
        this.closeOnSelect = closeOnSelect; // both sub-item and menu.
        // noinspection JSUnusedGlobalSymbols
        this.delay = delay; // sub-item property
        this.positioner = positioner;
        this.direction = direction;

        this.parseDOM();
    }

    registerTopics() {
        if(this._isTopicInit) return;
        super.registerTopics();

        // On child is activate
        // deactivate siblings if multiple is false.
        this.on('menuitem.activate', (target) => {
            if(target.parent === this) {
                if (!this.isActive) {
                    this.activate();
                }

                for(let child of this.children) {
                    if(child !== target && child.isActive) {
                        child.deactivate();
                    }
                }
            }
        });

        let _timer = null;

        this.on('menuitem.deactivate', (target) => {
            if(_timer) {
                clearTimeout(_timer);
                _timer = null;
            }

            _timer = setTimeout( () => {
                _timer = null;
                if (target.parent === this) {
                    if (this.isActive && !this.activeChild) {
                        this.deactivate();
                    }
                }
            }, 0);
        });

        this.on('event.click', (event) => this.onClick(event));
        this.on('event.mouseover', (event) => this.onMouseOver(event));
        this.on('event.mouseout', (event) => this.onMouseOut(event));
        this.on('menuitem.select', (event) => this.onSelect(event));
    }

    activate() {
        if(!this.isActive) {
            let parent = this.parent;

            // Set isActivate flag and add active classes.
            this.isActive = true;

            // Register document click handler
            if(this.closeOnBlur && !this._captureDocumentClick) {
                this._captureDocumentClick = {
                    target: document,

                    onDocumentClick: (event) => {
                        if(!this.element.contains(event.target)) {
                            this.deactivate();
                        }
                    }
                };

                // Add to the end of the call stack.
                setTimeout(() => {
                    if(this._captureDocumentClick) {
                        this._captureDocumentClick.target.addEventListener('click', this._captureDocumentClick.onDocumentClick);
                    }
                }, 0);
            }

            // Notify parent that submenu activated.
            if(parent) {
                if(!parent.isActive) parent.activate();
            }

            this.publish('menu.activate');

            this.dispatchTopic('menu.activate', {
                target: this
            });

            // Dispatch dom events.
            this.element.dispatchEvent(new CustomEvent('menu.activate', {
                detail: this,
                bubbles: true
            }));
        }
    }

    deactivate() {
        if(this.isActive) {
            // Set flag and remove active classes.
            this.isActive = false;

            // Clear any active child items.
            this.clearActiveChild();

            // Remove document click handler that tracks user clicks outside of menu tree.
            if(this._captureDocumentClick) {
                this._captureDocumentClick.target.removeEventListener('click', this._captureDocumentClick.onDocumentClick);
                this._captureDocumentClick = null;
            }

            // clear timers
            this.clearTimer('timeout');

            for(let child of this.children) {
                child.clearTimer('activateItem');
            }

            this.dispatchTopic('menu.deactivate', {
                target: this
            });

            // Dispatch dom events.
            this.element.dispatchEvent(new CustomEvent('menu.deactivate', {
                detail: this,
                bubbles: true
            }));
        }
    }

    show() {
        if(!this.isVisible) {
            this.isVisible = true;
            this.element.classList.add('show');
            this.element.classList.remove('hide');

            this.dispatchTopic('menu.show', {target: this});
        }
    }

    hide() {
        if(this.isVisible) {
            this.isVisible = false;
            this.element.classList.add('hide');
            this.element.classList.remove('show');

            this.dispatchTopic('menu.hide', {target: this});
        }
    }

    position() {
        let positioner = this.positioner;

        if(positioner) {
            positioner.call(this, this);
        }
    }

    //------------------------------------------------------------------------------------------------------------------
    // Tree methods.

    createItems(data) {
        for(let {submenu, ...args} of data) {
            let item = this.constructMenuItem(args);

            if(submenu) {
                let _submenu = this.constructSubMenu(submenu);
                item.attachSubMenu(_submenu);
            }

            this.append(item);
        }
    }

    // noinspection JSUnusedGlobalSymbols
    addItem(text, action=null) {
        let item = this.constructMenuItem({text, action});
        this.append(item);
        return this;
    }

    removeItem(item) {
        if(this.hasItem(item)) {
            this.removeChildMenuNode(item);
            if(item.element.parentElement) item.element.parentElement.removeChild(item.element);
        }
    }

    // noinspection JSUnusedGlobalSymbols
    hasItem(item) {
        return this.hasChild(item);
    }

    append(item) {
        let body = this.getMenuBody();

        body = body[body.length - 1];

        if(item.nodeType) {
            body.appendChild(item);
            return this;
        }

        if(item.parent) {
            item.parent.removeItem(item);
        }

        item.appendTo(body);

        if(item.isMenuItem && item.isMenuItem()) {
            this.appendChildMenuNode(item);
        }

        return this;
    }

    get activeChild() {
        for(let item of this.children) {
            if(item.isActive) {
                return item;
            }
        }

        return null;
    }

    // noinspection JSUnusedGlobalSymbols
    get activeIndex() {
        let children = this.children;

        for(let i = 0, l = children.length; i < l; i++) {
            if(children[i].isActive) {
                return i;
            }
        }

        return -1;
    }

    get firstChild() {
        return this.children[0];
    }

    // noinspection JSUnusedGlobalSymbols
    get lastChild() {
        return this.children[this.children.length-1];
    }

    get firstEnabledChild() {
        let children = this.children;

        for(let i = 0, l = children.length; i < l; i++) {
            if(!children[i].isDisabled) {
                return children[i];
            }
        }

        return null;
    }

    // noinspection JSUnusedGlobalSymbols
    get lastEnabledChild() {
        let children = this.children;

        for(let i = children.length-1, l = 0; i >= l; i--) {
            if(!children[i].isDisabled) {
                return children[i];
            }
        }

        return null;
    }

    get positioner() {
        if(this.#positioner === 'inherit' || this.#positioner === undefined) {
            let parent = this.parent;
            return parent ? parent.positioner : undefined;
        } else if(this.#positioner === 'root') {
            let root = this.root;

            if(root && root !== this) {
                return root.positioner;
            }
        } else {
            return this.#positioner;
        }
    }

    set positioner(value) {
        this.#positioner = value;
    }

    // noinspection JSUnusedGlobalSymbols
    get delay() {
        if(this.#delay === 'inherit' || this.#delay === undefined) {
            let parent = this.parent;
            return parent ? parent.delay : undefined;
        } else if(this.#delay === 'root') {
            let root = this.root;

            if(root && root !== this) {
                return root.delay;
            }
        } else {
            return this.#delay;
        }
    }

    set delay(value) {
        this.#delay = value;
    }

    clearActiveChild() {
        for(let child of this.children) {
            if(child.isActive) {
                child.deactivate();
            }
        }
    }

    /**
     * Returns list of all menu bodies for the menu.
     *
     * Menu bodies are where item are appended when using function like addItem or append.  They will be added to the
     * last menu body in the menu.
     *
     * @returns {NodeListOf<HTMLElementTagNameMap[string]> | NodeListOf<Element> | NodeListOf<SVGElementTagNameMap[string]> | HTMLElement[]}
     */
    getMenuBody() {
        let bodies = Array.prototype.slice.call(this.element.querySelectorAll(':scope > .menu__body'));

        if(!bodies.length) {
            return [this.element];
        } else {
            // noinspection JSValidateTypes
            return bodies;
        }
    }

    isMenu() {
        return true;
    }

    //------------------------------------------------------------------------------------------------------------------
    // Event Handlers

    onMouseOver() {
        this.clearTimer('timeout');
    }

    onMouseOut(event) {
        if(!this.element.contains(event.originalEvent.relatedTarget)) {
            if(this.isActive && typeof this.timeout === 'number' && this.timeout >= 0) {
                // noinspection JSCheckFunctionSignatures
                this.startTimer('timeout', () => {
                    this.deactivate();
                }, this.timeout);
            }
        }
    }

    onClick(event) {
        if(event.target === this) {
            if(this.isActive && this.toggle) {
                this.deactivate();
            } else if(!this.isActive) {
                this.activate();
            }

            this.dispatchTopic('menu.click', event);
        }
    }

    onSelect() {
        if(this.closeOnSelect && this.isActive) {
            this.deactivate();
        }
    }

    /**
     * Handles navigating the selection to an item during keyboard navigation.
     * @param item
     * @param showSubMenu
     * @private
     */
    _navigateToItem(item, showSubMenu=false) {
        if(!item) return;

        let parent = item.parent;

        if(!parent.isVisible) parent.show();
        if(!parent.isActive) parent.activate();
        if(!item.isActive) item.activate(false);
        if(showSubMenu && item.hasSubMenu() && !item.submenu.isVisible) item.showSubMenu();
    }

    /**
     * Handles keyboard navigation.
     * @param event
     * @param allowTargetKeys
     * @param _depth
     * @returns {boolean|boolean|*}
     * @private
     */
    _navigate(event, allowTargetKeys=true, _depth=0) {
        let key = event.key,
            ARROW_BACK = 'ArrowUp',
            ARROW_FORWARD = 'ArrowDown',
            ARROW_NEXT = 'ArrowRight',
            ARROW_PREVIOUS = 'ArrowLeft',
            arrowKeys = ['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown'],
            arrowKeyPressed = arrowKeys.indexOf(key) !== -1;

        if(this.direction === 'vertical') {
            ARROW_BACK = 'ArrowLeft';
            ARROW_FORWARD = 'ArrowRight';
            ARROW_NEXT = 'ArrowDown';
            ARROW_PREVIOUS = 'ArrowUp';
        }

        if(arrowKeyPressed) {
            if(!this.isVisible) {
                this.show();
                event.preventDefault();
                return true;
            }

            let children = _findAllNavigableChildren(this.children),
                index = children.indexOf(this.activeChild),
                child = children[index];

            if(key === ARROW_PREVIOUS) {
                if(index === -1) {
                    // When their is no active item, activate the last item.
                    this._navigateToItem(children[children.length-1], this.isRoot);
                } else {
                    this._navigateToItem(children[modulo(index-1, children.length)], this.isRoot);
                }

                event.preventDefault();
                return true;
            } else if(key === ARROW_NEXT) {
                if(index === -1) {
                    this._navigateToItem(children[0], this.isRoot);
                } else {
                    this._navigateToItem(children[modulo(index+1, children.length)], this.isRoot);
                }

                event.preventDefault();
                return true;
            } else if(key === ARROW_FORWARD) {
                if(child && child.hasSubMenu() && (!child.submenu.isVisible || !child.submenu.activeChild)) {
                    let ret = false;

                    if(!child.submenu.isVisible) {
                        ret = true;
                        child.showSubMenu();
                    }

                    let firstChild = _findFirstNavigableChild(child.submenu.children);

                    if(firstChild) {
                        ret = true;
                        this._navigateToItem(firstChild, false);
                    }

                    if(ret) {
                        event.preventDefault();
                        return true;
                    }
                } else if(!child) {
                    let firstChild = _findFirstNavigableChild(this.children);

                    if(firstChild) {
                        this._navigateToItem(firstChild, this.isRoot);

                        if(firstChild.hasSubMenu() && firstChild.submenu.isVisible) {
                            let firstSubMenuChild = _findFirstNavigableChild(firstChild.submenu.children);

                            if(firstSubMenuChild) {
                                this._navigateToItem(firstSubMenuChild, false);
                            }
                        }

                        event.preventDefault();
                        return true;
                    }
                } else if(!this.isRoot) {
                    return this.parent._navigate(event, allowTargetKeys, _depth+1);
                }
            } else if(key === ARROW_BACK) {
                if(!this.isRoot) {
                    if (this.activeChild && this.activeChild.hasSubMenu() && this.activeChild.submenu.isVisible) {
                        this.activeChild.hideSubMenu();
                        event.preventDefault();
                        return true;
                    } else {
                        return this.parent._navigate(event, allowTargetKeys, _depth + 1);
                    }
                } else if(_depth === 0) {
                    if(child && child.submenu) {
                        return child._navigate(event, allowTargetKeys, 0);
                    } else if(!child) {
                        let firstChild = _findFirstNavigableChild(this.children);

                        if(firstChild) {
                            return firstChild._navigate(event, allowTargetKeys, 0);
                        }
                    }
                }
            }
        } else if(key === "Enter") {
            // The menu is not visible at this point make it visible and return.
            if(!this.isVisible) {
                this.show();
                event.preventDefault();

                if(!this.activeChild) {
                    let childToActivate = _findFirstNavigableChild(this.children);
                    if(childToActivate) this.firstEnabledChild.activate();
                }

                return true;
            }

            if(this.activeChild) {
                if(this.activeChild.hasSubMenu()) {
                    let ret = false;

                    if(!this.activeChild.submenu.isVisible) {
                        this.activeChild.showSubMenu();
                        event.preventDefault();
                        ret = true;
                    }

                    if(!this.activeChild.submenu.activeChild) {
                        let childToActivate = _findFirstNavigableChild(this.activeChild.submenu.children);

                        if(childToActivate) {
                            childToActivate.activate(false);
                            event.preventDefault();
                            ret = true;
                        }
                    }

                    if(ret) return true;
                } else {
                    this.activeChild.select();
                    event.preventDefault();
                    return true;
                }
            } else {
                let firstChild = _findFirstNavigableChild(this.children);

                if(firstChild) {
                    firstChild.activate();

                    if(firstChild.hasSubMenu()) {
                        firstChild.showSubMenu();

                        if(!firstChild.submenu.activeChild) {
                            let targetChild = _findFirstNavigableChild(firstChild.submenu.children);

                            if(targetChild) targetChild.activate(false);
                        }
                    }

                    event.preventDefault();
                    return true;
                }
            }
        } else if(allowTargetKeys) {
            let children = _findAllNavigableChildren(this.children);

            for(let child of children) {
                if(child.targetKey === key) {
                    event.preventDefault();

                    if(child.hasSubMenu()) {
                        if(!child.isActive) {
                            child.activate();
                            child.showSubMenu();
                        } else if(!child.submenu.isVisible) {
                            child.showSubMenu();
                        }
                    } else {
                        child.select();
                    }

                    return true;
                }
            }
        }

        return false;
    }

    static getAttributes(element) {
        return {
            ...super.getAttributes(element),
            ...MENU_ATTRIBUTE_SCHEMA.deserialize(element.dataset)
        };
    }
}


/**
 * A component for rendering nestable list of selectable items.
 */
export default class Menu extends AbstractMenu {
    /**
     *
     * @param target {String|HTMLElement|Element}
     * @param closeOnBlur {Boolean|Number}
     * @param timeout {Boolean|Number}
     * @param autoActivate {Boolean|Number}
     * @param openOnHover {Boolean|Number}
     * @param toggle {boolean}
     * @param closeOnSelect {Boolean}
     * @param delay {Boolean|Number|'inherit'}
     * @param id {String}
     * @param children {Array}
     */
    constructor({target=null, closeOnBlur=false, timeout=false, autoActivate=true, openOnHover=true,
                    toggle=false, closeOnSelect=true, delay='inherit', children=null, arrow=false}={}) {
        if(!target) {
            target = createFragment(`
                <div class="menu">
                    ${arrow ? `<div class="menu__arrow"></div>` : ""}
                    <div class="menu__body" data-body></div>
                </div>
            `).children[0];
        }

        super({
            closeOnBlur, timeout, autoActivate, toggle, closeOnSelect, delay, positioner: 'inherit',
            direction: 'vertical', openOnHover, target
        });

        this.events = null;

        this.registerTopics();
        this.init();

        if(children) {
            this.createItems(children);
        }
    }

    constructSubMenu(config) {
        return new Menu(config);
    }

    constructMenuItem(config) {
        return new MenuItem(config);
    }
}
