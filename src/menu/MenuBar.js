import Menu, {AbstractMenu} from "./Menu";
import AutoLoader from "autoloader";
import * as positioners from "./positioners";


export default class MenuBar extends AbstractMenu {
    constructor({target=null, closeOnBlur=true, timeout=false, autoActivate=false, multiple=false, openOnHover=true,
                    toggle="both", closeOnSelect=true, delay=false, enableKeyboardNavigation=true, ...context}={}) {
        super();
        this.positioner = positioners.DROPDOWN;
        this.direction = 'horizontal';
        this.enableKeyboardNavigation = true;
        this.closeOnBlur = closeOnBlur;
        this.timeout = timeout;
        this.autoActivate = autoActivate;
        this.openOnHover = openOnHover;
        this.toggle = toggle;
        this.closeOnSelect = closeOnSelect;
        this.delay = delay;

        if(target) {
            this.element = target;
        } else {
            this.element = this.render(context);
        }

        this.SubMenuClass = class SubMenu extends Menu {
            constructor(args={}) {
                super({
                    delay,
                    ...args
                });

                this.SubMenuClass = SubMenu;
            }
        };

        this.isVisible = true;

        this.registerTopics();
        this.parseDOM();
        this.init();

        if(enableKeyboardNavigation) {
            this.initKeyboardNavigation();
        }
    }

    render(context) {
        let element = document.createElement('div');

        element.className = "menubar";

        return element;
    }

    getMenuBody() {
        return [this.element];
    }
}


AutoLoader.register('menubar', (element) => MenuBar.FromHTML(element));
