import MenuNode, {MenuNodeTopic} from "./MenuNode";
import {createFragment} from "../core/utility";
import Timer from "../core/utility/timers";
import {POSITIONERS} from "./positioners";


export default class MenuItem extends MenuNode {
    constructor({element=null, text=null, href=null, toggle=false, autoActivate=true, delay=false, timeout=false, activateOnMouseOver=true, activateOnClick=true, activateOnSelect=false, positioner=POSITIONERS.inherit, closeOnBlur=false, closeOnSelect=false}) {
        if(!element) {
            element = menuItemTemplate({text, href});
        }

        super({element, positioner, closeOnBlur, closeOnSelect, timeout});

        this.delay = delay;
        this.toggle = toggle;
        this.autoActivate = autoActivate;
        this.activateOnMouseOver = activateOnMouseOver;
        this.activateOnClick = activateOnClick;
        this.activateOnSelect = activateOnSelect;

        this.on("event.mouseenter", topic => this.onMouseEnter(topic));
        this.on("event.mouseleave", topic => this.onMouseLeave(topic));
        this.on("event.mouseover", topic => this.onMouseOver(topic));
        this.on("event.click", topic => this.onClick(topic));
    }

    activate() {
        if(!this.isActive) {
            super.activate();

            if(this.submenu) {
                this.submenu.show();
            }
        }
    }

    deactivate() {
        if(this.isActive) {
            super.deactivate();

            if(this.submenu) {
                this.submenu.hide();
            }
        }
    }

    appendItem(item) {
        if(this.children.length > 0) {
            throw new Error("MenuItems can only have one child at a time.");
        }

        return super.appendItem(item);
    }

    attachMenu(menu) {
        if(menu.parent === this || this.submenu === menu) return;

        if(menu.parent) {
            throw new Error("Menu already attached to an item.");
        }

        if(this.submenu) {
            throw new Error("MenItem already has a submenu.");
        }

        this.appendItem(menu);

        if(!menu.parentElement) {
            menu.appendTo(this.element);
        }

        this.element.classList.add("has-submenu");
    }

    detachMenu() {
        if(this.submenu) {
            this.removeItem(this.submenu);
            this.submenu.removeFromDom();
            this.element.classList.remove("has-submenu");
        }
    }

    select() {
        if(!this.isActive && this.activateOnSelect) {
            this.activate();
        }

        setTimeout(() => {
            this.dispatchTopic(new MenuNodeTopic("menuitem.select"));
        }, 0)
    }

    //------------------------------------------------------------------------------------------------------------------
    // Event handlers

    onClick(topic) {
        if(topic.target !== this || this.getDisabled()) return;

        let active = true;

        if(!this.isActive && this.activateOnClick) {
            this.activate();
        } else if(this.toggle) {
            this.deactivate();
            active = false;
        }

        if(active && !this.submenu) {
            this.select();
        }
    }

    onMouseOver(topic) {
        Timer.clearTargetTimer(this, "timeout");
    }

    onMouseEnter(topic) {
        this.isHover = true;
        if(this.getDisabled()) return;

        if(this.activateOnMouseOver) {
            if (!this.isActive) {
                if (this.parent && this.parent.isActive) {
                    if (Timer.isValidInterval(this.delay)) {
                        Timer.forceSetTargetTimeout(this, "activate", () => this.activate(), this.delay);
                    } else if (this.delay !== true) {
                        this.activate();
                    }
                } else {
                    if (this.autoActivate === true) {
                        this.activate();
                    } else if (Timer.isValidInterval(this.autoActivate)) {
                        Timer.forceSetTargetTimeout(this, "activate", () => this.activate(), this.autoActivate);
                    }
                }
            }
        }
    }

    onMouseLeave(topic) {
        this.isHover = false;

        if(this.isActive) {
            if(this.timeout === true) {
                this.deactivate();
            } else if(Timer.isValidInterval(this.timeout)) {
                Timer.forceSetTargetTimeout(this, "timeout", () => this.deactivate(), this.timeout);
            }
        }
    }

    //------------------------------------------------------------------------------------------------------------------
    // Properties

    get isHover() {
        return this.element.classList.contains("hover");
    }

    set isHover(value) {
        value = !!value;

        if(value) {
            this.element.classList.add("hover");
        } else {
            this.element.classList.remove("hover");
        }
    }

    get submenu() {
        return this.children[0] || null;
    }
}



function menuItemTemplate(context) {
    return createFragment(`
        <div class="menuitem"><a${context.href ? ` ${context.href}` : ""}>${context.text}</a></div>
    `).firstElementChild;
}