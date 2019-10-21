export const MENU_MAP = new WeakMap();


export function attachMenuInstance(element, instance) {
    if(instance === null) {
        return detachMenuInstance(element);
    }

    if(MENU_MAP.get(element)) {
        throw new Error("Element is already bound to menu node instance.");
    }

    MENU_MAP.set(element, instance);
}


export function detachMenuInstance(element) {
    MENU_MAP.delete(element);
}


export function hasMenuInstance(element) {
    return MENU_MAP.has(element);
}


export function getMenuInstance(element) {
    return MENU_MAP.get(element);
}
