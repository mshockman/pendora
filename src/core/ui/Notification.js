import {FadeIn, FadeOut, SlideIn, SlideInX, SlideInY, SlideOut, SlideOutX, SlideOutY} from "../fx/effects";
import {addClasses} from "../utility";
import {assignNotNull} from "../utility/object";
import Overlay from "./Overlay";
import Arrow from "./Arrow";
import Publisher from "../Publisher";


const ACTIVE_TOOLTIPS_NOTIFICATIONS = new WeakMap();


function getTooltipAnimationAxis(element) {
    let placement = element.dataset.placement;

    if(placement === 'top' || placement === 'bottom') {
        return 'y';
    } else {
        return 'x';
    }
}


export class SlideInToolTip extends SlideIn {
    constructor(duration) {
        super(duration, getTooltipAnimationAxis);
    }
}


export class SlideOutToolTip extends SlideOut {
    constructor(duration) {
        super(duration, getTooltipAnimationAxis);
    }
}


const ANIMATIONS = {
    full: {
        slide: {
            showFX: "slideIn",
            hideFX: "slideOut"
        },

        fade: {
            showFX: "fadeIn",
            hideFX: "fadeOut"
        }
    },

    tooltip: {
        slideIn: {
            showFX: SlideInToolTip,
            showDuration: 200
        },

        slideOut: {
            hideFX: SlideOutToolTip,
            hideDuration: 200
        },
    },

    other: {
        slideInY: {
            showFX: SlideInY,
            showDuration: 200
        },

        slideOutY: {
            hideFX: SlideOutY,
            hideDuration: 200
        },

        slideInX: {
            showFX: SlideInX,
            showDuration: 200
        },

        slideOutX: {
            hideFX: SlideOutX,
            hideDuration: 200
        },

        slideIn: {
            showFX: SlideInY,
            showDuration: 200
        },

        slideOut: {
            hideFX: SlideOutY,
            hideDuration: 200
        },

        fadeIn: {
            showFX: FadeIn,
            showDuration: 200
        },

        fadeOut: {
            hideFX: FadeOut,
            hideDuration: 200
        }
    },

    mapAnimations(options, type) {
        let {fx, showDuration, hideDuration, showFX, hideFX} = options;

        if(fx) {
            if(typeof fx === "string") {
                Object.assign(options, ANIMATIONS.full[fx]);
            } else {
                Object.assign(options, fx);
            }

            delete options.fx;
        }

        if(typeof showFX === "string") {
            if(ANIMATIONS.other[showFX]) {
                Object.assign(options, ANIMATIONS.other[showFX]);
            }

            if(type === "tooltip" && ANIMATIONS.tooltip[showFX]) {
                Object.assign(options, ANIMATIONS.tooltip[showFX]);
            }
        }

        if(typeof hideFX === "string") {
            if(ANIMATIONS.other[hideFX]) {
                Object.assign(options, ANIMATIONS.other[hideFX]);
            }

            if(type === "tooltip" && ANIMATIONS.tooltip[hideFX]) {
                Object.assign(options, ANIMATIONS.tooltip[hideFX]);
            }
        }

        if(showDuration !== null && showDuration !== undefined) {
            options.showDuration = showDuration;
        }

        if(hideDuration !== null && hideDuration !== undefined) {
            options.hideDuration = hideDuration;
        }

        return options;
    }
};


const TEMPLATES = {
    "default": function(context) {
        let element = document.createElement("div"),
            body = document.createElement("div"),
            content = document.createElement("div"),
            label = document.createElement("div"),
            container = document.createElement("div");

        element.className = "notification";
        body.className = "notification__body";
        content.className = "notification__content";
        container.className = "notification__row";
        label.className = "notification__label";
        label.innerHTML = context.message;

        element.appendChild(body);
        body.appendChild(content);
        content.appendChild(container);

        if(context.icon) {
            let icon = document.createElement("div");
            icon.className = "notification__icon";
            icon.innerHTML = context.icon;
            container.appendChild(icon);
        }

        container.appendChild(label);

        return {label, body, element, content};
    }
};


const NOTIFICATIONS = {
    "success": {
        className: "success",
        template: "default",
        timeout: 5000,
        showFX: 'slideInY',
        showDuration: 400,
        hideFX: "slideOutY",
        hideDuration: 200,
        closeOnClick: true,
        icon: `<i class="fas fa-check-square"></i>`
    },

    "warning": {
        className: "warning",
        template: "default",
        timeout: 5000,
        showFX: 'slideInY',
        showDuration: 400,
        hideFX: "slideOutY",
        hideDuration: 200,
        closeOnClick: true,
        icon: `<i class="fas fa-exclamation-triangle"></i>`
    },

    "info": {
        className: "info",
        template: "default",
        timeout: 5000,
        showFX: 'slideInY',
        showDuration: 400,
        hideFX: "slideOutY",
        hideDuration: 200,
        closeOnClick: true,
        icon: `<i class="fas fa-info-circle"></i>`
    },

    "error": {
        className: "error",
        template: "default",
        timeout: 5000,
        showFX: 'slideInY',
        showDuration: 400,
        hideFX: "slideOutY",
        hideDuration: 200,
        closeOnClick: true,
        icon: `<i class="fas fa-exclamation-circle"></i>`
    },
};


export class PlacementArea {
    constructor(element, body) {
        this.element = element;
        this.body = body;
    }

    appendTo(selector) {
        if(typeof selector === "string") {
            document.querySelector(selector).appendChild(this.element);
        } else if(selector.appendChild) {
            selector.appendChild(this.element);
        } else {
            selector.append(this.element);
        }
    }

    appendChild(child) {
        this.body.appendChild(child);
    }

    get parentElement() {
        return this.element.parentElement;
    }
}


const PLACEMENTS = {};
for(let placement of ['top-left', 'top-right', 'left', 'right', 'bottom-left', 'bottom-right']) {
    let node = document.createElement('div');
    node.className = `notification-placement-${placement} notification-placement-body`;
    PLACEMENTS[placement] = new PlacementArea(node, node);
}


for(let placement of ['top', 'bottom']) {
    let node = document.createElement('div'),
        body = document.createElement('div');
    node.className = `notification-placement-${placement}`;
    body.className = 'notification-placement-body';
    node.appendChild(body);
    PLACEMENTS[placement] = new PlacementArea(node, body);
}


PLACEMENTS["left-top"] = PLACEMENTS["top-left"];
PLACEMENTS["left-bottom"] = PLACEMENTS["bottom-left"];
PLACEMENTS["right-top"] = PLACEMENTS["top-right"];
PLACEMENTS["right-bottom"] = PLACEMENTS["bottom-right"];


export default class Notification extends Publisher {
    #element;
    #body;
    #label;
    #content;
    #overlay;
    #arrow;

    constructor({message, className=null, icon=null, id=null, showFX=null, hideFX=null, showDuration=null, hideDuration=null, template="default", timeout=null, closeOnClick=false, removeOnHide=true}) {
        super();

        if(typeof template === "string") {
            template = TEMPLATES[template];
        }

        let {element, body, label, content} = template({
            message, icon, notification:this
        });

        this.#element = element;
        this.#body = body;
        this.#label = label;
        this.#content = content;
        this.closeOnClick = closeOnClick;

        if(id !== null) {
            this.#element.id = id;
        }

        if(className !== null) {
            addClasses(this.#element, className);
        }

        this.#overlay = new Overlay(this.#element, {showFX, showDuration, hideFX, hideDuration, timeout, removeOnHide});

        this.element.addEventListener('click', event => {
            let dismiss = event.target.closest("[data-dismiss]");

            if(dismiss || this.closeOnClick) {
                if(this.state === Overlay.visible ||  this.state === Overlay.showing) {
                    this.hide();
                }
            }
        });

        this.#overlay.on("notification.removed", {name: "notification.removed", target: this, overlay: this.#overlay});
    }

    destroy() {
        this.#overlay.destroy();
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

    setArrow(arrow) {
        if(this.#arrow) {
            this.#arrow.parent = null;
            this.#overlay.setArrow(null);
            this.#arrow = null;
        }

        if(arrow) {
            this.#overlay.setArrow(arrow);
            arrow.parent = this.#content;
            arrow.appendTo(this.#content);
            this.#arrow = arrow;
        }
    }

    setTarget(target) {
        this.#overlay.setTarget(target);
    }

    addPlacement(name, options=undefined) {
        this.#overlay.addPlacement(name, options);
    }

    setPlacement(name, options=undefined) {
        this.#overlay.setPlacement(name, options);
    }

    removeFrom() {
        this.#overlay.removeFrom();
    }

    async show(immediate) {
        return this.#overlay.show(immediate);
    }

    async hide(immediate) {
        return this.#overlay.hide(immediate);
    }

    get element() {
        return this.#element;
    }

    get body() {
        return this.#body;
    }

    get label() {
        return this.#label;
    }

    get content() {
        return this.#content;
    }

    get overlay() {
        return this.#overlay;
    }

    get state() {
        return this.#overlay.state;
    }

    get target() {
        return this.#overlay.target;
    }

    get arrow() {
        return this.#arrow;
    }

    static notify(message, type, {target=null, placement=null, className=null, icon=null, id=null, showFX=null, hideFX=null, showDuration=null, hideDuration=null, template=null, timeout=null, closeOnClick=null, fx=null}={}) {
        let args = {showFX: null, hideFX: null, showDuration: null, hideDuration: null, id: null, className: null, timeout: null, closeOnClick: null, message: null, icon: null, template: "default"};

        if(fx) {
            Object.assign(args, ANIMATIONS[fx]);
        }

        if(type) {
            Object.assign(args, NOTIFICATIONS[type]);
        }

        assignNotNull(args, {fx, showFX, showDuration, hideFX, hideDuration, icon, timeout, template, closeOnClick});

        if(target) {
            args = ANIMATIONS.mapAnimations(args, "tooltip");
            Object.assign(args, {message, id});

            let notification = new Notification(args);

            addClasses(notification.element, "notification--tooltip");

            if(className !== null) {
                addClasses(notification.element, className);
            }

            let arrow = new Arrow("bottom", "center", true);
            notification.setArrow(arrow);
            notification.setTarget(target);
            notification.addPlacement(placement);

            notification.on("notification.removed", () => {
                ACTIVE_TOOLTIPS_NOTIFICATIONS.delete(notification.target);
                notification.setTarget(null);
            });

            if(ACTIVE_TOOLTIPS_NOTIFICATIONS.has(notification.target)) {
                let current = ACTIVE_TOOLTIPS_NOTIFICATIONS.get(notification.target);
                current.destroy();
                ACTIVE_TOOLTIPS_NOTIFICATIONS.set(notification.target, notification);
            }

            notification.appendTo(notification.target.parentElement);
            ACTIVE_TOOLTIPS_NOTIFICATIONS.set(notification.target, notification);
            notification.hide(true);
            notification.show();
        } else {
            args = ANIMATIONS.mapAnimations(args, "other");
            Object.assign(args, {message, id});

            let notification = new Notification(args);

            addClasses(notification.element, "notification--basic");

            if(PLACEMENTS[placement]) {
                placement = PLACEMENTS[placement];

                if(placement && !placement.parentElement) {
                    if(placement.appendTo) {
                        placement.appendTo(document.body);
                    } else {
                        document.body.appendChild(placement);
                    }
                }
            }

            if(typeof placement === "string") {
                placement = document.querySelector(placement);
            }

            notification.appendTo(placement);
            notification.hide(true);
            notification.appendTo(placement);
            notification.show();
        }
    }
}