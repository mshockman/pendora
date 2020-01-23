import Component from "../Component";


export class Notification extends Component {
    #state;
    #timer;

    constructor(element, {closeOnClick=false, timeout=null, showFX='slideIn', showDuration=200, hideFX='slideOut', hideDuration=200}={}) {
        super(element);
    }

    reposition() {

    }

    async show() {
        if(this.#timer) {
            clearTimeout(this.#timer);
        }
    }

    async hide() {

    }

    get state() {

    }
}


const PLACEMENTS = {};
for(let placement of ['top-left', 'top', 'top-right', 'left', 'right', 'bottom-left', 'bottom', 'bottom-right']) {
    let node = document.createElement('div');
    node.className = `notification-placement-${placement}`;
    PLACEMENTS[placement] = node;
}


export class BasicNotificationMessage extends Notification {
    constructor(text) {
        let element = document.createElement('div'),
            inner = document.createElement('div');

        element.appendChild(inner);
        element.className = "notification";
        inner.className = "notification__inner";
        inner.innerHTML = text;

        super(element);
    }

    static notify(message, type, placement) {
        let notification = new this(message);

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

        return placement;
    }
}
