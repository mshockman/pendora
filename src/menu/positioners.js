import {Rect} from "core/vectors";
import {getClientRect, setElementClientPosition} from "core/position";

const opposites = {
    left: 'right',
    top: 'bottom',
    right: 'left',
    bottom: 'top',
    center: 'center',
    middle: 'middle'
};


function getInheritedPosition(menu) {
    if(menu.parent && menu.parent.parent && !menu.parent.parent.isRoot) {
        return menu.element.dataset.position;
    }
}


function _applyPosition(target, overlay, container, flip) {
    let position = overlay.dataset.position,
        [my, at] = position.split(/\s*;\s*/),
        overlayRect = Rect.getBoundingClientRect(overlay),
        targetRect = Rect.getBoundingClientRect(target),
        containerRect = container.nodeType ? Rect.getBoundingClientRect(container) : container;

    my = my.trim();
    at = at.trim();

    let [myX, myY] = my.split(/\s+/),
        [atX, atY] = at.split(/\s+/);

    let pos = overlayRect.position({my: `${myX} ${myY}`, at: `${atX} ${atY}`, of: targetRect, inside: containerRect, collision: null}),
        refresh = false; // flag that determines is position will be refreshed.

    if(!containerRect.containsX(pos)) {
        myX = opposites[myX];
        atX = opposites[atX];
        refresh = true;
    }

    if(!containerRect.containsY(pos)) {
        myY = opposites[myY];
        atY = opposites[atY];
        refresh = true;
    }

    if(refresh) {
        pos = overlayRect.position({my: `${myX} ${myY}`, at: `${atX} ${atY}`, of: targetRect, inside: containerRect, collision: null});
        overlay.dataset.position = `${myX} ${myY}; ${atX} ${atY}`;
    }

    setElementClientPosition(overlay, pos, "top-left");
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
export function dropdown(container=null, topLevelPosition="left top; left bottom;", defaultPosition="left top; right top;") {
    if(!container) {
        container = getClientRect;
    } else if(typeof container === 'string') {
        let target = document.querySelector(container);
        container = () => Rect.getBoundingClientRect(target);
    } else {
        let target = container;
        container = () => Rect.getBoundingClientRect(target);
    }

    return function(target, menu) {
        let parentMenu = menu.parentMenu,
            containerElement = container;

        if(typeof containerElement === 'function') {
            containerElement = containerElement(target, menu);
        }

        if (!parentMenu || parentMenu.isRoot) {
            menu.element.dataset.position = topLevelPosition;
            // flipPositionIfOutOfBounds(menu.element, container, 'xy');
            _applyPosition(target.element, menu.element, containerElement, 'xy');
        } else {
            menu.element.dataset.position = getInheritedPosition(menu) || defaultPosition;
            // flipPositionIfOutOfBounds(menu.element, container, 'xy');
            _applyPosition(target.element, menu.element, containerElement, 'xy');
        }
    }
}


export const DROPDOWN = dropdown();
export const SIDE_MENU = dropdown(null, "left top; right top;", "left top; right top;");
