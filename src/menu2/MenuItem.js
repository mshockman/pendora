import MenuNode, {MenuNodeTopic, MENU_NODE_TYPE} from "./MenuNode";
import {createFragment} from "../core/utility";
import Timer from "../core/utility/timers";
import {POSITIONERS} from "./positioners";
import {OptionRegistry, queryMenu, returnFalse, returnTrue} from "./core";


export const TOGGLE = new OptionRegistry("boolean");
TOGGLE.register("never", returnFalse);

TOGGLE.register("ctrl", function(item, topic) {
    return topic?.originalEvent?.ctrlKey === true;
});


export const ACTIVATE = new OptionRegistry("boolean");
ACTIVATE.register("never", returnFalse);


ACTIVATE.whenParentActive = function(delay=false) {
    return function(item, topic) {
        if(item.parent && item.parent.isActive) {
            return typeof delay === "boolean" ? !delay : delay;
        } else {
            return false;
        }
    }
};


ACTIVATE.always = function(delay, parentInactiveOverride=null) {
    return function(item, topic) {
        if(!item.parent || !item.parent.isActive) {
            return parentInactiveOverride === null ? delay : parentInactiveOverride;
        } else {
            return delay;
        }
    }
};


export default class MenuItem extends MenuNode {
    #textContainer;
    #altContainer;
    #iconContainer;
    #btn;
    #locationHandler;
    #location;

    // closeOnSelect;
    // closeOnBlur;
    // positioner;

    /**
     * This property is only used when the property `activateOnClick` is true.
     *
     * If true the MenuItem can be toggled off on click.
     * If "ctrl" the MenuItem can be toggled off on click if the ctrl key is pressed.
     *
     * @type {boolean|"ctrl"|String|Function}
     */
    toggle;
    autoActivate;
    timeout;

    constructor({element=null, text=null, href=null, toggle=false, autoActivate=true,
                    timeout=false, positioner=POSITIONERS.inherit, closeOnBlur=false,
                    closeOnSelect=false, altText=null, icon=null}) {
        if(!element) {
            element = menuItemTemplate({text, href, altText, icon});
        }

        super({element, positioner, closeOnBlur, closeOnSelect});

        this.toggle = toggle;
        this.autoActivate = autoActivate;
        this.timeout = timeout;
        this.#location = null;
        this[MENU_NODE_TYPE] = "menuitem";

        this.element.dataset.controller = "menuitem";

        this.#textContainer = queryMenu(this.element, "[data-controller='text']");
        this.#altContainer = queryMenu(this.element, "[data-controller='alt']");
        this.#iconContainer = queryMenu(this.element, "[data-controller='icon']");
        this.#btn = queryMenu(this.element, "[data-controller='btn']");

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

                if(this.submenu.isActive) {
                    this.submenu.deactivate();
                }
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
        let submenu = this.submenu;

        if(submenu) {
            this.removeItem(submenu);
            submenu.removeFromDom();
            this.element.classList.remove("has-submenu");
        }
    }

    select(trigger=null) {
        if(!this.isActive) {
            this.activate();
        }

        if(!this.submenu) {
            window.queueMicrotask(() => {
                this.dispatchTopic(new MenuNodeTopic("menuitem.select", {trigger}));
                this.publish("select", new MenuNodeTopic("select", {trigger}));
            });
        }
    }

    deselect(trigger=null) {
        if(this.isActive) {
            this.deactivate();
        }

        if(!this.submenu) {
            window.queueMicrotask(() => {
                this.dispatchTopic(new MenuNodeTopic("menuitem.deselect", {trigger}));
                this.publish("deselect", new MenuNodeTopic("deselect", {trigger}));
            });
        }
    }

    //------------------------------------------------------------------------------------------------------------------
    // Event handlers

    onClick(topic) {
        if(topic.target !== this || this.getDisabled()) return;

        let toggle = TOGGLE.getComputedValue(this.toggle, this, topic);

        if(this.isActive && toggle === true) {
            this.deselect(topic);
        } else {
            this.select(topic);
        }
    }

    onMouseEnter(topic) {
        this.isHover = true;
        if(this.getDisabled()) return;

        if (!this.isActive) {
            let autoActivate = ACTIVATE.getComputedValue(this.autoActivate, this, topic);

            if(autoActivate === true) {
                this.activate();
            } else if(Timer.isValidInterval(autoActivate)) {
                Timer.forceSetTargetTimeout(this, "activate", () => this.activate(), this.autoActivate);
            }
        }
    }

    onMouseLeave(topic) {
        this.isHover = false;
        super.onMouseLeave(topic);
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

    get textContainer() {
        return this.#textContainer;
    }

    get altContainer() {
        return this.#altContainer;
    }

    get iconContainer() {
        return this.#iconContainer;
    }

    get text() {
        if(this.#textContainer.nodeName === "INPUT") {
            return this.#textContainer.value;
        } else {
            return this.#textContainer.innerHTML;
        }
    }

    set text(value) {
        if(this.#textContainer.nodeName === "INPUT") {
            this.#textContainer.value = value;
        } else {
            this.#textContainer.innerHTML = value;
        }
    }

    get location() {
        return this.#location;
    }

    set location(location) {
        if(this.#locationHandler) {
            this.off("select", this.#locationHandler);
            this.#locationHandler = null;
        }

        this.#location = location;

        if(this.#location) {
            this.#locationHandler = () => window.location = location;
            this.on("select", this.#locationHandler);
        }
    }

    get href() {
        if(this.#btn && this.#btn.nodeName === "A") {
            return this.#btn.href;
        }

        return null;
    }

    set href(value) {
        if(this.#btn && this.#btn.nodeName === "A") {
            if(value === null) {
                this.#btn.removeAttribute("href");
            } else {
                this.#btn.href = value;
            }
        }
    }
}


function menuItemTemplate(context) {
    return createFragment(`
        <div class="menuitem" data-controller="menuitem"><a ${context.href ? `${context.href}` : ""} data-controller="btn" class="menuitem__btn"><span class="menuitem__icon" data-controller="icon">${context.icon || ''}</span><span data-controller="text">${context.text}</span><span class="menuitem__alt" data-controller="alt">${context.altText || ''}</span></a></div>
    `).firstElementChild;
}