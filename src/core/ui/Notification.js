import Component from "../Component";
import Overlay from "./Overlay";
import {addClasses} from "../utility";
import {FadeIn, FadeOut, SlideInX, SlideOutX, SlideInY, SlideOutY} from "../fx/effects";


const ANIMATIONS = {
    slideInY: SlideInY,
    slideOutY: SlideOutY,
    slideInX: SlideInX,
    slideOutX: SlideOutX,
    fadeIn: FadeIn,
    fadeOut: FadeOut
};


const PLACEMENTS = {};
for(let placement of ['top-left', 'top-right', 'left', 'right', 'bottom-left', 'bottom-right']) {
    let node = document.createElement('div');
    node.className = `notification-placement-${placement} notification-placement-body`;
    PLACEMENTS[placement] = node;
}


for(let placement of ['top', 'bottom']) {
    let node = document.createElement('div'),
        body = document.createElement('div');
    node.className = `notification-placement-${placement}`;
    body.className = 'notification-placement-body';
    node.appendChild(body);
    PLACEMENTS[placement] = node;
}


function basicNotificationTemplate(context) {
    let element = document.createElement('div'),
        inner = document.createElement('div'),
        textContainer = document.createElement('div'),
        iconContainer = document.createElement('div');

    element.appendChild(inner);
    element.className = "notification";
    inner.className = "notification__inner";
    textContainer.classname = "notification__text";
    iconContainer.className = "notification__icon";
    textContainer.innerHTML = context.text || "";

    if(context.text) {
        textContainer.innerHTML = context.text;
    }

    if(context.icon) {
        iconContainer.innerHTML = context.icon;
    }

    inner.appendChild(iconContainer);
    inner.appendChild(textContainer);

    if(context.className) {
        addClasses(element, context.className);
    }

    return element;
}


const BASIC_NOTIFICATIONS = {
    success: {
        className: "success",
        template: basicNotificationTemplate,
        timeout: 5000,
        showFX: 'slideInY',
        showDuration: 400,
        hideFX: "slideOutY",
        hideDuration: 200,
        closeOnClick: true,
        icon: `<i class="fas fa-check-square"></i>`
    },

    danger: {
        className: "error",
        template: basicNotificationTemplate,
        timeout: 5000,
        showFX: 'slideInY',
        showDuration: 400,
        hideFX: "slideOutY",
        hideDuration: 200,
        closeOnClick: true,
        icon: `<i class="fas fa-exclamation"></i>`
    },

    warning: {
        className: "warning",
        template: basicNotificationTemplate,
        timeout: 5000,
        showFX: 'slideInY',
        showDuration: 400,
        hideFX: "slideOutY",
        hideDuration: 200,
        closeOnClick: true,
        icon: `<i class="fas fa-exclamation-triangle"></i>`
    },

    info: {
        className: "info",
        template: basicNotificationTemplate,
        timeout: 5000,
        showFX: 'slideInY',
        showDuration: 400,
        hideFX: "slideOutY",
        hideDuration: 200,
        closeOnClick: true,
        icon: `<i class="fas fa-info"></i>`
    }
};


export default class Notification extends Component {
    #overlay;

    constructor(element, {closeOnClick=false, timeout=5000, showFX='slideInY', showDuration=200, hideFX='slideOutY', hideDuration=200, className=null, id=null}={}) {
        super(element);

        if(typeof showFX === 'string') {
            showFX = ANIMATIONS[showFX];
        }

        if(typeof hideFX === 'string') {
            hideFX = ANIMATIONS[hideFX];
        }

        if(className) {
            addClasses(this.element, className);
        }

        if(id) {
            this.element.id = id;
        }

        this.#overlay = new Overlay(this.element, {
            showFX,
            showDuration,
            hideFX,
            hideDuration,
            removeOnHide: true,
            timeout
        });

        this.closeOnClick = closeOnClick;
        this.hide(true);

        this.element.addEventListener('click', event => {
            let dismiss = event.target.closest("[data-dismiss]");

            if(dismiss || this.closeOnClick) {
                if(this.state === Overlay.visible ||  this.state === Overlay.showing) {
                    this.hide();
                }
            }
        });
    }

    async show(immediate) {
        return this.#overlay.show(immediate);
    }

    async hide(immediate) {
        return this.#overlay.hide(immediate);
    }

    get state() {
        return this.#overlay.state;
    }

    static notify(message, type, options) {
        let config = {placement: "top-left", ...BASIC_NOTIFICATIONS.success};

        if(typeof type === 'string') {
            config = {...config, ...BASIC_NOTIFICATIONS[type]};
        } else if(typeof type === 'object') {
            config = {...config, ...type};
        }

        if(typeof options === 'object') {
            config = {...config, ...options};
        }

        config.text = message;

        let element = config.template(config);

        let notification = new this(element, config);

        let placement = config.placement;

        if(typeof placement === 'string') {
            placement = PLACEMENTS[placement];

            if(placement && !placement.parentElement) {
                document.body.appendChild(placement);
            }
        }

        if(placement) {
            let container;

            if(placement.classList.contains('notification-placement-body')) {
                container = placement;
            } else {
                container = document.querySelector('.notification-placement-body');
            }

            if(!container) container = placement;

            notification.appendTo(container);
        }

        notification.show();

        return placement;
    }
}
