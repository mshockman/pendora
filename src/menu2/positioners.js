import {Rect} from "core/vectors";
import {getClientRect} from "core/position";

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


function flipPositionIfOutOfBounds(target, container, flip) {
    let targetRect = Rect.getBoundingClientRect(target),
        containerRect = typeof container === 'function' ? container() : Rect.getBoundingClientRect(container),
        [posX, posY] = target.dataset.position.split(' '),
        boundX = containerRect.containsX.bind(containerRect),
        boundY = containerRect.containsY.bind(containerRect);

    const fnMap = {
        left: boundX,
        right: boundX,
        top: boundY,
        bottom: boundY
    };

    if(posX && fnMap[posX] && !fnMap[posX](targetRect)) {
        posX = opposites[posX];
    }

    if(posY && fnMap[posY] && !fnMap[posY](targetRect)) {
        posY = opposites[posY];
    }

    target.dataset.position = `${posX} ${posY}`;
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
export function dropdown(container=null, topLevelPosition="bottom left", defaultPosition="right top") {
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
        if (menu.parent && menu.parent.isRoot) {
            menu.element.dataset.position = topLevelPosition;
            flipPositionIfOutOfBounds(menu.element, container, 'xy');
        } else if (menu.parentMenu) {
            menu.element.dataset.position = getInheritedPosition(menu) || defaultPosition;
            flipPositionIfOutOfBounds(menu.element, container, 'xy');
        }
    }
}


export const DROPDOWN = dropdown();
