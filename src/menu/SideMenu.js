import Menu, {AbstractMenu} from "./Menu";
import MenuItem from "./MenuItem";


export default class SideMenu extends AbstractMenu {
    constructor({target=null}) {
        if(!target) {
            target = document.createElement('div');
            target.className = 'side-menu';
        }

        super({
            target,
            closeOnBlur: true,
            timeout: false,
            autoActivate: false,
            openOnHover: false,
            toggle: false,
            closeOnSelect: true,
            delay: false,
            positioner: null,
            direction: "vertical"
        });

        this.isVisible = false;
        this.registerTopics();
        this.parseDOM();
        this.init();
    }

    constructMenuItem(config) {
        return new MenuItem(config);
    }

    constructSubMenu(config) {
        return new Menu(config);
    }
}
