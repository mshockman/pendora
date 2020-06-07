import {Rect} from "../core/vectors";
import {getClientRect, setElementClientPosition} from "../core/ui/position";

const opposites = {
    left: 'right',
    top: 'bottom',
    right: 'left',
    bottom: 'top',
    center: 'center',
    middle: 'middle'
};


function getInheritedPosition(menu) {
    if(menu.parentMenu && !menu.parentMenu.isRoot) {
        return menu.parentMenu.element.dataset.position;
    }
}


function _applyPosition(target, overlay, container) {
    let position = overlay.dataset.position,
        [my, at, method] = position.split(/\s*;\s*/),
        overlayRect = Rect.getBoundingClientRect(overlay),
        targetRect = Rect.getBoundingClientRect(target),
        containerRect = container.nodeType ? Rect.getBoundingClientRect(container) : container;

    my = my.trim();
    at = at.trim();

    let [myX, myY] = my.split(/\s+/),
        [atX, atY] = at.split(/\s+/),
        methodX, methodY;

    if(method) {
        method = method.trim();
        [methodX, methodY] = method.split(/\s+/);
    }

    let pos = overlayRect.position({my: `${myX} ${myY}`, at: `${atX} ${atY}`, of: targetRect, inside: containerRect, collision: null}),
        refresh = false; // flag that determines is position will be refreshed.

    if(!containerRect.containsX(pos)) {
        myX = opposites[myX];
        atX = opposites[atX];
        if(methodX) methodX = opposites[methodX];
        refresh = true;
    }

    if(!containerRect.containsY(pos)) {
        myY = opposites[myY];
        atY = opposites[atY];
        if(methodY) methodY = opposites[methodY];
        refresh = true;
    }

    if(refresh) {
        pos = overlayRect.position({my: `${myX} ${myY}`, at: `${atX} ${atY}`, of: targetRect, inside: containerRect, collision: null});

        if(methodX && methodY) {
            overlay.dataset.position = `${myX} ${myY}; ${atX} ${atY}; ${methodX} ${methodY};`;
        } else {
            overlay.dataset.position = `${myX} ${myY}; ${atX} ${atY};`;
        }
    }

    methodX = methodX || 'left';
    methodY = methodY || 'top';

    setElementClientPosition(overlay, pos, `${methodY}-${methodX}`);
}


/**
 * Positions first level of menus statically
 * Then position second level of menus at the bottom left of the first level.
 * Finally positions every other level to the top right of the previous level.
 * Menu's can flip if they fall out of bounds of the container.
 * By default the container is the client area.
 *
 * @param container
 * @param topLevelPosition
 * @param defaultPosition
 * @returns {Function}
 */
export function dropdown(container=null, topLevelPosition="left top; left bottom; left top;", defaultPosition="left top; right top; left top;") {
    if(!container) {
        container = getClientRect;
    } else if(typeof container === 'string') {
        let target = document.querySelector(container);
        container = () => Rect.getBoundingClientRect(target);
    } else {
        let target = container;
        container = () => Rect.getBoundingClientRect(target);
    }

    return function(menu) {
        let parentMenu = menu.parentMenu,
            containerElement = container,
            target = menu.parent;

        if(typeof containerElement === 'function') {
            containerElement = containerElement(target, menu);
        }

        if (!parentMenu || parentMenu.isRoot) {
            menu.element.dataset.position = topLevelPosition;
            // flipPositionIfOutOfBounds(menu.element, container, 'xy');
            _applyPosition(target.element, menu.element, containerElement);
        } else if(!parentMenu.parentMenu || parentMenu.parentMenu.isRoot) {
            menu.element.dataset.position = defaultPosition;
            _applyPosition(target.element, menu.element, containerElement);
        } else {
            menu.element.dataset.position = getInheritedPosition(menu) || defaultPosition;
            // flipPositionIfOutOfBounds(menu.element, container, 'xy');
            _applyPosition(target.element, menu.element, containerElement);
        }
    };
}


export function contextMenuPosition(container=null, position="left top; right top;") {
    if(!container) {
        container = getClientRect;
    } else if(typeof container === 'string') {
        let target = document.querySelector(container);
        container = () => Rect.getBoundingClientRect(target);
    } else {
        let target = container;
        container = () => Rect.getBoundingClientRect(target);
    }

    return function(menu) {
        let containerElement = container,
            target = menu.parent;

        if(typeof containerElement === 'function') {
            containerElement = containerElement(target, menu);
        }

        menu.element.dataset.position = getInheritedPosition(menu) || position;
        _applyPosition(target.element, menu.element, containerElement);
    };
}


export const DROPDOWN = dropdown();
// noinspection JSUnusedGlobalSymbols
export const SIDE_MENU = dropdown(null, "left top; right top;", "left top; right top;");
export const CONTEXT_MENU = contextMenuPosition();
