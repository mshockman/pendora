const MENU_ELEMENT_MAP = new WeakMap();
const MENU_CONTROLLER_MAP = new WeakMap();


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