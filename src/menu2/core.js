const MENU_ELEMENT_MAP = new WeakMap();
const MENU_CONTROLLER_MAP = new WeakMap();


export const INHERIT = {};


export function queryMenu(menuElement, selector) {
    let test;

    if(typeof selector === "string") {
        test = (element) => element.matches(selector);
    } else {
        test = selector;
    }

    for(let child of menuElement.children) {
        if(test(child)) {
            return child;
        }

        let controller = child.dataset.controller;

        if(controller !== "menu" && controller !== "menuitem") {
            let query = queryMenu(child, test);

            if(query) {
                return query;
            }
        }
    }

    return null;
}


export function bindMenuNodeToElement(element, menunode) {
    if(menunode === null) {
        MENU_ELEMENT_MAP.delete(element);
        return;
    }

    if(MENU_ELEMENT_MAP.has(element)) {
        throw new Error("Element already bound to a menu.");
    }

    MENU_ELEMENT_MAP.set(element, menunode);
}


export function getElementBoundMenuNode(element) {
    return MENU_ELEMENT_MAP.get(element) || null;
}


/**
 *
 * @param element
 * @return {null|MenuNode}
 */
export function getClosestMenuNodeByElement(element) {
    while(element) {
        let node = getElementBoundMenuNode(element);

        if(node) {
            return node;
        }

        element = element.parentElement;
    }

    return null;
}


export function bindMenuController(menuNode, controller) {
    if(controller === null) {
        MENU_CONTROLLER_MAP.delete(menuNode);
        return;
    }

    if(MENU_CONTROLLER_MAP.has(menuNode)) {
        throw new Error("Menu Node already has controller");
    }

    MENU_CONTROLLER_MAP.set(menuNode, controller);
}


export function getMenuNodeController(menuNode) {
    while(menuNode) {
        let controller = MENU_CONTROLLER_MAP.get(menuNode);

        if(controller) {
            return controller;
        }

        menuNode = menuNode.parent;
    }

    return null;
}


export function getInheritedProperty(obj, prop, default_value=undefined, getter=null, next=null) {
    if(!next) {
        next = obj => obj.parent;
    }

    if(!getter) {
        getter = (target, property) => target[property];
    }

    let o = obj;

    while(o) {
        let value = getter(o, prop);

        if(value !== undefined && value !== "inherit" && value !== INHERIT) {
            return value;
        }

        o = next(o);
    }

    return default_value;
}


export function returnTrue() {
    return true;
}


export function returnFalse() {
    return false;
}


export class OptionRegistry {
    #registry;
    #handler;

    constructor(handler=null) {
        this.#registry = {};

        if(handler === "boolean") {
            handler = function(value) {
                if(value === "true" || value === "false") {
                    value = value === "true";
                }

                return function() { return value; };
            }
        } else if(!handler || handler === "default") {
            handler = function(value) {
                return function() { return value; };
            }
        }

        this.#handler = handler;
    }

    get(value) {
        let type = typeof value;

        if(this.#registry[value]) {
            return this.#registry[value];
        }

        if(type === "function") {
            return value;
        } else {
            return this.#handler(value);
        }
    }

    getComputedValue(value, ...args) {
        return this.get(value)(...args);
    }

    register(name, fn) {
        if(this.#registry[name]) {
            throw new Error("A function is already registered with that name.");
        }

        if(typeof fn !== "function") {
            throw new Error("Property fn must be a function.");
        }

        this.#registry[name] = fn;
    }

    copy() {
        let r = new OptionRegistry(this.#handler);

        for(let name of Object.keys(this.#registry)) {
            r.register(name, this.#registry[name]);
        }

        return r;
    }

    get registry() {
        return this.#registry;
    }
}