import Menu, {AbstractMenu} from "./Menu";
import MenuItem from "./MenuItem";


export default class SlideMenu extends AbstractMenu {
    constructor({target=null, modal=false}) {
        if(!target) {
            if(modal) {
                target = document.createElement('div');
                let menu = document.createElement('div');

                target.className = "modal";
                menu.className = "side-menu";

                target.appendChild(menu);
            } else {
                target = document.createElement('div');
                target.className = 'side-menu';
            }
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

    registerTopics() {
        super.registerTopics();

        let onDocumentClick;


        this.on("menu.show", event => {
            this.activate();

            console.log(this.isActive);

            if(this.closeOnBlur) {
                onDocumentClick = event => {
                    if(!this.element.contains(event.target)) {
                        document.removeEventListener('click', onDocumentClick);
                        onDocumentClick = null;
                        this.hide();
                    }
                };

                setTimeout(() => {
                    if(onDocumentClick) document.addEventListener('click', onDocumentClick);
                }, 0);
            }
        });

        this.on('menu.hide', event => {
            if(onDocumentClick) {
                document.removeEventListener('click', onDocumentClick);
                onDocumentClick = null;
            }

            this.deactivate();
        });

        this.on('event.click', event => {
            let dismiss = event.originalEvent.target.closest("[data-action='dismiss']");

            if(this.isVisible && dismiss && this.getTargetNode(dismiss) === this) {
                this.hide();
            }
        });

        this.on('menu.deactivate', event => {
            console.log('deactivate', this.element.className);
        });

        this.on('menu.activate', event => {
            console.log('activate', this.element.className);
        });
    }

    constructMenuItem(config) {
        return new MenuItem(config);
    }

    constructSubMenu(config) {
        return new Menu(config);
    }
}
