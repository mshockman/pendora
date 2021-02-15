import MenuNode, {MenuNodeTopic} from "./MenuNode";
import {createFragment} from "../core/utility";
import {getClosestMenuNodeByElement, queryMenu} from "./core";
import MenuItem from "./MenuItem";
import Timer from "../core/utility/timers";
import {POSITIONERS} from "./positioners";


export default class Menu extends MenuNode {
    #body;
    #header;
    #footer;

    constructor({element=null, multiple=false, closeOnBlur=false, timeout=false, positioner=POSITIONERS.inherit, closeOnSelect=false}={}) {
        if(!element) {
            element = createFragment(`
                <div class="menu" data-controller="menu">
                    <div class="menu__content-wrapper">
                        <div class="menu__header" data-controller="menu-header"></div>
                        <div class="menu__body" data-controller="menu-body"></div>
                        <div class="menu__footer" data-controller="menu-footer"></div>
                    </div>
                </div>
            `).firstElementChild;
        }

        super({element, timeout, closeOnSelect, positioner});

        this.#body = queryMenu(this.element, "[data-controller='menu-body']");
        this.#header = queryMenu(this.element, "[data-controller='menu-header']");
        this.#footer = queryMenu(this.element, "[data-controller='menu-footer']");

        this.element.addEventListener("click", this);
        this.element.addEventListener("mouseover", this);
        this.element.addEventListener("mouseout", this);

        this.multiple = multiple;
        this.closeOnBlur = closeOnBlur;
        this.isVisible = false;

        this.on("menunode.activate", (topic) => {
            if(!this.isActive) {
                this.activate();
            }

            if(!this.multiple && this.isChild(topic.target)) {
                for(let child of this.children) {
                    if(child.isActive && child !== topic.target && !topic.target.isAncestor(child)) {
                        child.deactivate();
                    }
                }
            }
        });

        this.on("menunode.deactivate", topic => {
            if(topic.target.parent === this) {
                if(this.isActive && !this.getActiveItems().length) {
                    this.deactivate();
                }
            }
        });

        this.on("event.mouseover", (topic) => this.onMouseOver(topic));
        this.on("event.mouseleave", (topic) => this.onMouseLeave(topic));

        this.initController();
    }

    deactivate() {
        if(this.isActive) {
            super.deactivate();

            for(let child of this.children) {
                if(child.isActive) {
                    child.deactivate();
                }
            }
        }
    }

    show() {
        if(!this.isVisible) {
            this.isVisible = true;

            if(this.positioner) {
                this.positioner(this);
            }

            this.dispatchTopic(new MenuNodeTopic("menu.show"));
        }
    }

    hide() {
        if(this.isVisible) {
            this.isVisible = false;

            this.dispatchTopic(new MenuNodeTopic("menu.hide"));
        }
    }

    appendItem(child) {
        super.appendItem(child);

        if(child.parent === this && !child.element.parentElement) {
            child.appendTo(this.#body);
        }
    }

    getActiveItems() {
        return this.children.filter(child => child.isActive);
    }

    clearActiveItems() {
        for(let child of this.children) {
            if(child.isActive) {
                child.deactivate();
            }
        }
    }

    //------------------------------------------------------------------------------------------------------------------
    // Event Handlers

    // handleEvent(event) {
    //     let targetNode = getClosestMenuNodeByElement(event.target);
    //
    //     if((targetNode === this || this.isChild(targetNode)) && !targetNode.getDisabled()) {
    //         if(event.type === "mouseover") {
    //             targetNode.dispatchTopic(new MenuNodeTopic("mouseover", {originalEvent: event}));
    //
    //             if(!targetNode.element.contains(event.relatedTarget)) {
    //                 targetNode.dispatchTopic(new MenuNodeTopic("mouseenter", {originalEvent: event}));
    //             }
    //         } else if(event.type === "mouseout") {
    //             targetNode.dispatchTopic(new MenuNodeTopic("mouseout", {originalEvent: event}));
    //
    //             if(!targetNode.element.contains(event.relatedTarget)) {
    //                 targetNode.dispatchTopic(new MenuNodeTopic("mouseleave", {originalEvent: event}));
    //             }
    //         } else if(event.type === "click") {
    //             targetNode.dispatchTopic(new MenuNodeTopic("click", {originalEvent: event}));
    //         }
    //     }
    // }

    onMouseOver(topic) {
        Timer.clearTargetTimer(this, "timeout");
    }

    onMouseLeave(topic) {
        if(this.isActive) {
            if(this.timeout === true) {
                this.deactivate();
            } else if(Timer.isValidInterval(this.timeout)) {
                Timer.forceSetTargetTimeout(this, "timeout", () => this.deactivate(), this.timeout);
            }
        }
    }
}