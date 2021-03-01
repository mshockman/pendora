import Menu from "./Menu";
import {POSITIONERS} from "./positioners";


export default class ContextMenu extends Menu {
    contextMenuEvent;
    #target;
    #contextMenuHandler;

    constructor() {
        super({closeOnBlur: true, positioner: POSITIONERS.contextMenu, closeOnSelect: true});
        this.contextMenuEvent = null;
        this.#target = null;
        this.element.classList.add("context-menu");

        this.on("menunode.activate", topic => {
            if(topic.target === this && !this.isVisible) {
                this.show();
            }
        });

        this.on("menunode.deactivate", topic => {
            if(topic.target === this && this.isVisible) {
                this.hide();
            }
        });

        this.#contextMenuHandler = event => {
            this.contextMenuEvent = event;
            event.preventDefault();

            if(!this.isActive) {
                this.activate();
            } else if(this.positioner) {
                this.positioner(this);
            }
        };
    }

    setTarget(target) {
        if(this.#target) {
            this.#target.removeEventListener("contextmenu", this.#contextMenuHandler);
            this.#target = null;
        }

        this.#target = target;

        if(this.#target) {
            this.#target.addEventListener("contextmenu", this.#contextMenuHandler);
        }
    }

    get target() {
        return this.#target;
    }
}