import Component from "../Component";
import Overlay from "./Overlay";
import {FadeIn, FadeOut, SlideInX, SlideOutX, SlideInY, SlideOutY} from "../fx/effects";


const ANIMATIONS = {
    slideInY: SlideInY,
    slideOutY: SlideOutY,
    slideInX: SlideInX,
    slideOutX: SlideOutX,
    fadeIn: FadeIn,
    fadeOut: FadeOut
};


export class Notification extends Component {
    #overlay;

    constructor(element, {closeOnClick=false, timeout=null, showFX='slideInY', showDuration=200, hideFX='slideOutY', hideDuration=200}={}) {
        super(element);

        if(typeof showFX === 'string') {
            showFX = ANIMATIONS[showFX];
        }

        if(typeof hideFX === 'string') {
            hideFX = ANIMATIONS[hideFX];
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

    reposition() {

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
}


const PLACEMENTS = {};
for(let placement of ['top-left', 'top', 'top-right', 'left', 'right', 'bottom-left', 'bottom', 'bottom-right']) {
    let node = document.createElement('div');
    node.className = `notification-placement-${placement}`;
    PLACEMENTS[placement] = node;
}


export class BasicNotificationMessage extends Notification {
    constructor(text, {closeOnClick=false, timeout=5000, showFX='slideInY', showDuration=400, hideFX='slideOutY', hideDuration=200}={}) {
        let element = document.createElement('div'),
            inner = document.createElement('div');

        element.appendChild(inner);
        element.className = "notification";
        inner.className = "notification__inner";
        inner.innerHTML = text;

        super(element, {
            closeOnClick,
            timeout,
            showFX,
            hideFX,
            showDuration,
            hideDuration
        });
    }

    static notify(message, type, {placement="top-left", ...options}={}) {
        let notification = new this(message, {...options});

        if(type) notification.addClass(type);

        // top-left top top-right
        // left, middle right
        // bottom-left bottom bottom-right

        if(typeof placement === 'string') {
            placement = PLACEMENTS[placement];

            if(placement && !placement.parentElement) {
                document.body.appendChild(placement);
            }
        }

        if(placement) {
            notification.appendTo(placement);
        }

        notification.show();

        return placement;
    }
}
