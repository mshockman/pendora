import {Rect} from "../core/vectors";
import {setElementClientPosition} from "../core/ui/position";


function _container(menu) {
    let container = menu.container;

    if(typeof container === "function") {
        return container(menu);
    } else {
        return container;
    }
}


export const POSITIONERS = {
    submenu(menu) {
        let rect = new Rect(menu.element);

        rect = rect.position({
            my: 'left top',
            at: 'right top',
            of: menu.parent.element,
            inside: _container(menu),
            collision: 'flip flip'
        });

        setElementClientPosition(menu.element, rect);
    },

    dropdown(menu) {
        let rect = new Rect(menu.element);

        if(menu.parent) {
            if (!menu.parent.parentItem) {
                rect = rect.position({
                    my: 'left top',
                    at: 'left bottom',
                    of: menu.parent.element,
                    inside: _container(menu),
                    collision: 'flip flip'
                });
            } else {
                rect = rect.position({
                    my: 'left top',
                    at: 'right top',
                    of: menu.parent.element,
                    inside: _container(menu),
                    collision: 'flip flip'
                });
            }

            setElementClientPosition(menu.element, rect);
        }
    },

    inherit(menu) {
        let o = menu.parent;

        while(o) {
            if(o.positioner && o.positioner !== POSITIONERS.inherit) {
                return o.positioner(menu);
            }

            o = o.parent;
        }
    },

    noop() {

    }
};
