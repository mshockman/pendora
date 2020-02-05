import Menu, {AbstractMenu} from "./Menu";
import MenuItem from "./MenuItem";
import * as positioners from "./positioners";
import {createFragment} from "../core/utility";
import {Rect, setElementClientPosition} from "../core/ui/position";


export default class ContextMenu extends AbstractMenu {
    constructor({target=null, targetMenu=null, closeOnBlur=true, timeout=false, autoActivate=true, multiple=false, openOnHover=true,
                toggle=true, closeOnSelect=true, delay=500, enableKeyboardNavigation=true, ...context}) {
        if(!target) {
            target = createFragment(`
                <div class="menu">
                    <div class="menu__body" data-body></div>
                </div>
            `).children[0];
        }

        super({
            closeOnBlur,
            timeout,
            autoActivate,
            openOnHover,
            toggle,
            closeOnSelect,
            delay,
            positioner: positioners.CONTEXT_MENU,
            direction: 'vertical',
            target,
            ...context
        });

        this.element.classList.add('context-menu');
        this.isVisible = false;
        this.registerTopics();
        this.parseDOM();
        this.init();
        this.initKeyboardNavigation();

        this._onContextMenu = event => {
            if(this.isActive) {
                this.deactivate();
                this.hide();
            }

            event.preventDefault();
            this.show();

            let rect = Rect.getBoundingClientRect(this.element),
                space = Rect.getBoundingClientRect(event.target),
                deltaX = event.clientX - space.left,
                deltaY = event.clientY - space.top;

            rect = rect.position({
                my: "left top",
                at: `${deltaX}px ${deltaY}px`,
                of: space,
                inside: space,
                collision: 'fit fit'
            });

            setElementClientPosition(this.element, rect);
        };
    }

    registerTopics() {
        super.registerTopics();

        let onClick = event => {
            // noinspection JSUnresolvedFunction
            if(!this.element.contains(event.target)) {
                this.hide();
            }
        };

        this.on('menu.show', () => {
            document.addEventListener('click', onClick);
        });

        this.on('menu.hide', topic => {
            if(topic.target === this) {
                if(this.isActive) this.deactivate();
                document.removeEventListener('click', onClick);
            }
        });

        this.on('menuitem.select', () => {
            if(this.closeOnSelect) {
                this.hide();
                if(this.isActive) this.deactivate();
            }
        });
    }

    constructMenuItem(config) {
        return new MenuItem(config);
    }

    constructSubMenu(config) {
        return new Menu(config);
    }

    setContainer(container) {
        if(typeof container === 'string') {
            container = document.querySelector(container);
        }

        this.positioner = positioners.contextMenuPosition(container);
    }

    setTargetMenu(target) {
        if(this._targetMenu) {
            this._targetMenu.removeEventListener('contextmenu', this._onContextMenu);
            this._targetMenu = null;
        }

        if(!target) return;

        if(typeof target === 'string') {
            target = document.querySelector(target);
        }

        this._targetMenu = target;
        this._targetMenu.addEventListener('contextmenu', this._onContextMenu);
    }
}
