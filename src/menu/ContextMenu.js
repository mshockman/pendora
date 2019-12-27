import Menu, {AbstractMenu} from "./Menu";
import MenuItem from "./MenuItem";
import * as positioners from "./positioners";
import {createFragment} from "../core/utility";
import AutoLoader from "../autoloader";
import {getClientRect, Rect, setElementClientPosition} from "../core/position";
import {dropdown} from "./positioners";


export default class ContextMenu extends AbstractMenu {
    constructor({target=null, closeOnBlur=true, timeout=false, autoActivate=true, multiple=false, openOnHover=true,
                toggle=true, closeOnSelect=true, delay=500, enableKeyboardNavigation=true, ...context}) {
        super({
            closeOnBlur,
            timeout,
            autoActivate,
            openOnHover,
            toggle,
            closeOnSelect,
            delay,
            positioner: positioners.SIDE_MENU,
            direction: 'vertical',
            target,
            ...context
        });

        this.isVisible = false;
        this.registerTopics();
        this.parseDOM();
        this.init();
        this.initKeyboardNavigation();
    }

    registerTopics() {
        super.registerTopics();

        let onClick = event => {
            // noinspection JSUnresolvedFunction
            if(!this.element.contains(event.target)) {
                this.hide();
            }
        };

        this.on('menu.show', topic => {
            document.addEventListener('click', onClick);
        });

        this.on('menu.hide', topic => {
            if(topic.target === this) {
                if(this.isActive) this.deactivate();
                document.removeEventListener('click', onClick);
            }
        });
    }

    render({target}) {
        console.log(target);
        if(target) {
            this.element = target;
        } else {
            const TEMPLATE = `
                <div class="menu">
                    <div class="menu__body" data-body></div>
                </div>
            `;

            this.element = createFragment(TEMPLATE).children[0];
        }

        this.element.classList.add('context-menu');
    }

    constructMenuItem(config) {
        return new MenuItem(config);
    }

    constructSubMenu(config) {
        return new Menu(config);
    }
}


AutoLoader.register('context-menu', (element) => {
    // todo most of this code should be place in context menu constructor.
    // todo positioner isn't properly inheriting.
    let instance = ContextMenu.FromHTML(element),
        target = document.querySelector(element.dataset.target);

    instance.positioner = positioners.dropdown(target, "left top; right top;", "left top; right top;");

    target.addEventListener('contextmenu', event => {
        if(instance.isActive) {
            instance.deactivate();
            instance.hide();
        }

        event.preventDefault();
        instance.show();

        let rect = Rect.getBoundingClientRect(instance.element),
            space = Rect.getBoundingClientRect(target),
            deltaX = event.clientX - space.left,
            deltaY = event.clientY - space.top;

        rect = rect.position({
            my: "left top",
            at: `${deltaX}px ${deltaY}px`,
            of: space,
            inside: space,
            collision: 'fit fit'
        });

        setElementClientPosition(instance.element, rect);
    });

    return instance;
});
