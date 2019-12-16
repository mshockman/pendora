export const MENU_MAP = new WeakMap();


/**
 * Maps elements to menu node controller instances.
 * @param element
 * @param instance
 */
export function attachMenuInstance(element, instance) {
    if(instance === null) {
        return detachMenuInstance(element);
    }

    if(MENU_MAP.get(element)) {
        throw new Error("Element is already bound to menu node instance.");
    }

    MENU_MAP.set(element, instance);
}


/**
 * Unmaps menu node controller instance from an element.
 * @param element
 */
export function detachMenuInstance(element) {
    MENU_MAP.delete(element);
}


/**
 * Returns true if the element has a menu controller instance mapped.
 * @param element
 * @returns {boolean}
 */
export function hasMenuInstance(element) {
    return MENU_MAP.has(element);
}


/**
 * Retrieves the mapped menu node controller instance for the element.
 * @param element
 * @returns {null|MenuNode|*}
 */
export function getMenuInstance(element) {
    return MENU_MAP.get(element);
}


/**
 * Finds the closest menu node controller for the element in the DOM tree.
 * @param element
 * @returns {null|*}
 */
export function getClosestMenuNodeByElement(element) {
    while(element) {
        let instance = getMenuInstance(element);

        if(instance) {
            return instance;
        }

        element = element.parentElement;
    }

    return null;
}


// noinspection JSUnusedGlobalSymbols
/**
 * Finds the closest menuitem controller for the element in the DOM tree.
 * @param element
 * @returns {null|*}
 */
export function getClosestMenuItemByElement(element) {
    while(element) {
        let instance = getMenuInstance(element);

        if(instance && instance.isMenuItem()) {
            return instance;
        }

        element = element.parentElement;
    }

    return null;
}


/**
 * Finds the closest menu node controller for the element in the DOM tree
 * @param element
 * @returns {null|*}
 */
export function getClosestMenuByElement(element) {
    while(element) {
        let instance = getMenuInstance(element);

        if(instance && instance.isMenu()) {
            return instance;
        }

        element = element.parentElement;
    }

    return null;
}
