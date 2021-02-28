import {Rect} from "../core/vectors";
import {setElementClientPosition} from "../core/ui/position";


export const POSITIONERS = {
    submenu(menu) {
        let rect = new Rect(menu.element);

        rect = rect.position({
            my: 'left top',
            at: 'right top',
            of: menu.parent.element,
            collision: 'flip flip'
        });

        setElementClientPosition(menu.element, rect);
    },

    dropdown(menu) {
        let rect = new Rect(menu.element);

        if(!menu.parent.parentItem) {
            rect = rect.position({
                my: 'left top',
                at: 'left bottom',
                of: menu.parent.element,
                inside: Rect.getClientRect(),
                collision: 'flip flip'
            });
        } else {
            rect = rect.position({
                my: 'left top',
                at: 'right top',
                of: menu.parent.element,
                inside: Rect.getClientRect(),
                collision: 'flip flip'
            });
        }

        setElementClientPosition(menu.element, rect);
    },

    inherit(menu) {
        let o = menu.parent;

        while(o) {
            if(o.positioner) {
                return o.positioner(menu);
            }

            o = o.parent;
        }
    },

    noop() {

    }
};
