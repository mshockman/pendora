import {AbstractMenu} from "./Menu";
import * as positioners from "./positioners";


export default class ContextMenu extends AbstractMenu {
    constructor({target=null, closeOnBlur=true, timeout=false, autoActivate=true, multiple=false, openOnHover=true,
                toggle=true, closeOnSelect=true, delay=false, enableKeyboardNavigation=true, ...context}) {
        super({
            closeOnBlur,
            timeout,
            autoActivate,
            openOnHover,
            toggle,
            closeOnSelect,
            delay,
            positioner: positioners.SIDE_MENU,
            direction: 'vertical'
        });

        this.isVisible = false;
        this.registerTopics();
        this.parseDOM();
        this.init();
        this.initKeyboardNavigation();
    }

    render({target}) {

    }
}
