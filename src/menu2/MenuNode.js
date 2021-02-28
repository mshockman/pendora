import Publisher, {STOP} from "../core/Publisher";
import {selectElement} from "../core/utility";
import {bindMenuNodeToElement, getClosestMenuNodeByElement, returnTrue, returnFalse, OptionRegistry} from "./core";
import Timer from "../core/utility/timers";
import MenuItem from "../menu/MenuItem";
import Menu from "../menu/Menu";
import {POSITIONERS} from "./positioners";


const MENU_NODE_PARENT_MAP = new WeakMap();


export const TIMEOUT = new OptionRegistry("boolean");
TIMEOUT.register("never", returnFalse);


export const MENU_NODE_TYPE = Symbol("MENU_NODE_TYPE");


export default class MenuNode extends Publisher {
    #element;
    #children;
    #isController;

    #documentClickHandler;

    positioner;
    closeOnSelect;
    closeOnBlur;
    timeout;

    constructor({element, closeOnBlur=false, closeOnSelect=false, positioner=POSITIONERS.noop, timeout=false}) {
        super();

        this.#element = selectElement(element);
        this.#children = [];
        this.#documentClickHandler = null;
        this.closeOnBlur = closeOnBlur;
        this.#isController = false;
        this.closeOnSelect = closeOnSelect;
        this.positioner = positioner;
        this.timeout = timeout;
        this[MENU_NODE_TYPE] = "menunode";

        bindMenuNodeToElement(this.#element, this);

        this.on("menuitem.select", topic => {
            if(this.closeOnSelect) {
                window.queueMicrotask(() => {
                    this.deactivate();
                });
            }
        });
    }

    initController() {
        if(!this.#isController) {
            this.#element.addEventListener("click", this);
            this.#element.addEventListener("mouseover", this);
            this.#element.addEventListener("mouseout", this);
            this.#isController = true;
        }
    }

    destroyController() {
        if(this.#isController) {
            this.#element.removeEventListener("click", this);
            this.#element.removeEventListener("mouseover", this);
            this.#element.removeEventListener("mouseout", this);
            this.#isController = false;
        }
    }

    activate() {
        if(!this.isActive) {
            this.isActive = true;

            Timer.clearTargetTimer(this, "activate");

            if(this.closeOnBlur && !this.#documentClickHandler) {
                this.#documentClickHandler = {
                    target: document,

                    clear: () => {
                        this.#documentClickHandler.target.removeEventListener("click", this.#documentClickHandler);
                        this.#documentClickHandler = null;
                    },

                    handleEvent: (event) => {
                        let targetNode = getClosestMenuNodeByElement(event.target);

                        if(!targetNode || (targetNode !== this && !this.contains(targetNode))) {
                            this.#documentClickHandler.clear();
                            this.deactivate();
                        }
                    }
                };

                document.addEventListener("click", this.#documentClickHandler);
            }

            window.queueMicrotask(() => {
                this.dispatchTopic(new MenuNodeTopic("menunode.activate"));
            });
        }
    }

    deactivate() {
        if(this.isActive) {
            this.isActive = false;

            if(this.#documentClickHandler) {
                this.#documentClickHandler.clear();
            }

            Timer.clearTargetTimer(this, "activate");
            Timer.clearTargetTimer(this, "timeout");
            Timer.clearTargetTimer(this, "deactivate");

            window.queueMicrotask(() => {
                this.dispatchTopic(new MenuNodeTopic("menunode.deactivate"));
            });
        }
    }

    appendItem(child) {
        if(child.parent) {
            throw new Error("Menu Node already attached to menu.");
        }

        if(!(child instanceof MenuNode)) {
            throw new Error("Child items must of an instance of MenuNode");
        }

        // noinspection JSUnresolvedVariable
        MENU_NODE_PARENT_MAP.set(child, this);
        this.#children.push(child);
    }

    removeItem(item) {
        let index = this.#children.indexOf(item);

        if(index !== -1) {
            MENU_NODE_PARENT_MAP.delete(item);
            this.#children.splice(index, 1);
            return true;
        }

        return false;
    }

    getDisabled() {
        let o = this;

        while(o) {
            if(o.isDisabled) {
                return true;
            }

            o = o.parent;
        }

        return false;
    }

    appendTo(selector) {
        if(typeof selector === "string") {
            document.querySelector(selector).appendChild(this.#element);
        } else if(selector.appendChild) {
            selector.appendChild(this.#element);
        } else {
            selector.append(this.#element);
        }
    }

    removeFromDom() {
        if(this.#element.parentElement) {
            this.#element.parentElement.removeChild(this.#element);
        }
    }

    dispatchTopic(topic) {
        topic.target = this;

        let o = this;
        let name = topic.name;

        while(o && !topic.isPropagationStopped()) {
            topic.currentTarget = o;

            try {
                if(o.publish(name, topic) === STOP) {
                    topic.status = STOP;
                    return topic;
                }
            } catch (e) {
                if(e === STOP) {
                    topic.status = STOP;
                    return topic;
                } else {
                    throw e;
                }
            }

            o = o.parent;
        }

        topic.status = "completed";

        return topic;
    }

    isAncestor(node) {
        let o = this.parent;

        while(o) {
            if(o === node) {
                return true;
            }

            o = o.parent;
        }

        return false;
    }

    contains(node) {
        return node.isAncestor(this);
    }

    closest(test) {
        let o = this;

        while(o) {
            if(test(o)) {
                return o;
            }

            o = o.parent;
        }

        return null;
    }

    isChild(node) {
        return this.#children.indexOf(node) !== -1;
    }

    getController() {
        return this.closest(item => item.isController);
    }

    //------------------------------------------------------------------------------------------------------------------
    // Event Handler

    handleEvent(event) {
        let targetNode = getClosestMenuNodeByElement(event.target),
            topics = [event.type];

        if(targetNode.getController() === this) {
            if(event.type === "mouseover" || event.type === "mouseout") {
                if(!targetNode.element.contains(event.relatedTarget)) {
                    topics.push(event.type === "mouseover" ? "mouseenter" : "mouseleave");
                }
            }

            for(let topic of topics) {
                targetNode.dispatchTopic(new MenuNodeTopic(`event.${topic}`, {originalEvent: event}));
            }
        }
    }

    onMouseOver(topic) {
        Timer.clearTargetTimer(this, "timeout");
    }

    onMouseLeave(topic) {
        if(this.isActive) {
            let timeout = TIMEOUT.getComputedValue(this.timeout, this, topic);

            if(timeout === true) {
                this.deactivate();
            } else if(Timer.isValidInterval(timeout)) {
                Timer.forceSetTargetTimeout(this, "timeout", () => this.deactivate(), timeout);
            }
        }
    }

    //------------------------------------------------------------------------------------------------------------------

    get parent() {
        return MENU_NODE_PARENT_MAP.get(this) || null;
    }

    get parentItem() {
        return this.parent ? this.parent.closest(item => item[MENU_NODE_TYPE] === "menuitem") : null;
    }

    get parentMenu() {
        return this.parent ? this.parent.closest(item => item[MENU_NODE_TYPE] === "menu") : null;
    }

    get element() {
        return this.#element;
    }

    get children() {
        return this.#children;
    }

    get root() {
        let o = this;

        while(o.parent) {
            o = o.parent;
        }

        return o;
    }

    get isDisabled() {
        return this.#element.classList.contains("disabled");
    }

    set isDisabled(value) {
        value = !!value;

        if(value !== this.isDisabled) {
            if(value) {
                this.#element.classList.add("disabled");
            } else {
                this.#element.classList.remove("disabled");
            }
        }
    }

    get isVisible() {
        return !this.element.classList.contains("hidden");
    }

    set isVisible(value) {
        value = !!value;

        if(value !== this.isVisible) {
            if(value) {
                this.element.classList.remove("hidden");
                this.element.classList.add("visible");
            } else {
                this.element.classList.remove("visible");
                this.element.classList.add("hidden");
            }
        }
    }

    get isActive() {
        return this.element.classList.contains("active");
    }

    set isActive(value) {
        value = !!value;

        if(value !== this.isActive) {
            if(value) {
                this.element.classList.add("active");
            } else {
                this.element.classList.remove("active");
            }
        }
    }

    get parentElement() {
        return this.#element.parentElement;
    }

    get isController() {
        return this.#isController;
    }
}


export class MenuNodeTopic {
    constructor(name, options=null) {
        this.name = name;
        this.currentTarget = null;
        this.target = null;
        this.status = "running";
        this.returnValue = null;
        this.timestamp = Date.now();
        this.isDefaultPrevented = returnFalse;
        this.isPropagationStopped = returnFalse;
        this.promise = null;
        if(options) Object.assign(this, options);
    }

    preventDefault() {
        this.isDefaultPrevented = returnTrue;
    }

    stopPropagation() {
        this.isPropagationStopped = returnTrue;
    }
}