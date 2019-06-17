import {privateCache} from 'core/data';
import {AssertionError} from 'core/errors';
import MenuNode from './MenuNode';


/**
 * Retrieves an attached MenuNode object from the element.
 * @param element {Element}
 * @returns {MenuNode}
 */
export function getMenuNode(element) {
    return privateCache.get(element, 'menu-node');
}


/**
 * Attaches a MenuNode element to a dom element.
 * @param element {Element}
 * @param node {MenuNode}
 */
export function attachMenuNode(element, node) {
    privateCache.set(element, 'menu-node', node);
}


export function assertMenuNode(obj) {
    if(!obj) {
        throw AssertionError("Assert: Must be MenuNode");
    }

    if(!(obj instanceof MenuNode)) {
        throw AssertionError("Assert: Must be MenuNode");
    }
}


export function getClosestMenuNode(element, context) {
    while(element) {
        let node = getMenuNode(element);

        if(node) {
            return node;
        }

        if(element === context) {
            break;
        }

        element = element.parentElement;
    }
}


/**
 * Returns the closest Menu node.
 * @param element
 * @param context
 * @returns {Menu}
 */
export function getClosestMenu(element, context) {
    while(element) {
        let node = getMenuNode(element);

        if(node && isMenu(node)) {
            // noinspection JSValidateTypes
            return node;
        }

        if(element === context) {
            break;
        }

        element = element.parentElement;
    }
}


/**
 * Returns the closest MenuItem
 * @param element
 * @param context
 * @returns {MenuItem}
 */
export function getClosestMenuItem(element, context) {
    while(element) {
        let node = getMenuNode(element);

        if(node && isMenuItem(node)) {
            // noinspection JSValidateTypes
            return node;
        }

        if(element === context) {
            break;
        }

        element = element.parentElement;
    }
}


export function isMenuItem(node) {
    if(node && node.nodeType) node = getMenuNode(node);

    if(node) {
        if(node.menuNodeType === 'menuitem' || node.menuNodeType === 'dropdown') {
            return true;
        }
    }

    return false;
}


export function isMenu(node) {
    if(node && node.nodeType) node = getMenuNode(node);

    if(node) {
        if(node.menuNodeType === 'menu') {
            return true;
        }
    }

    return false;
}


export function isMenuNode(node) {
    if(node && node.nodeType) node = getMenuNode(node);
    return node && node instanceof MenuNode;
}


export function getTargetChild(parent, targetElement) {
    let node = getClosestMenuNode(targetElement, parent.element);

    while(node) {
        if(node === parent) {
            return;
        }

        let _parent = node.parent;

        if(parent === _parent) {
            return node;
        }

        node = _parent;
    }
}