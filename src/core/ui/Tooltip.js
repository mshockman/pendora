import Component from "../Component";
import Arrow from "./Arrow";
import {setElementClientPosition, Rect} from "./position";
import {addClasses} from "../utility";
import Animation from "./Animation";


const slideCache = Symbol('slideInCache');


export const SLIDE_IN_TOOLTIP_FX = new Animation({
    frames(element) {
        // noinspection JSUnresolvedVariable
        let cache = element[slideCache],
            placement = cache.placement;

        if(placement === 'top' || placement === 'bottom') {
            return {
                '0%': {height: cache.fxHeight},
                '100%': {height: cache.rect.height}
            };
        } else if(placement === "left" || placement === "right") {
            return {
                '0%': {width: cache.fxWidth},
                '100%': {width: cache.rect.width}
            };
        }
    },

    init(fx) {
        let cache = fx.element[slideCache];

        if(!cache) {
            let maxWidth = fx.element.style.maxWidth,
                maxHeight = fx.element.style.maxHeight,
                rect,
                placement = fx.element.dataset.placement;

            fx.element.style.maxWidth = "";
            fx.element.style.maxHeight = "";

            // Find full width and height of element.
            rect = Rect.getBoundingClientRect(fx.element);

            if(placement === "left" || placement === "right") fx.element.style.maxWidth = maxWidth;
            if(placement === "top" || placement === "bottom") fx.element.style.maxHeight = maxHeight;

            fx.element[slideCache] = {
                rect,
                fxWidth: 0,
                fxHeight: 0,
                placement,
                fx
            };
        } else {
            if(cache.fx) {
                cache.fx.cancel();
                cache.fx = null;
            }

            cache = fx.element[slideCache] = {
                ...cache,
                fx: fx
            };
        }

        fx.element[slideCache].fx = fx;
    },

    destroy(fx) {
        delete fx.element[slideCache];
    },

    applyFrame(fx, frame) {
        let cache = fx.element[slideCache],
            placement = cache.placement;

        if(placement === 'top' || placement === 'bottom') {
            fx.element.style.maxHeight = `${frame.height}px`;
            cache.fxHeight = frame.height;
        } else {
            fx.element.style.maxWidth = `${frame.width}px`;
            cache.fxWidth = frame.width;
        }
    }
});


export const SLIDE_OUT_TOOLTIP_FX = new Animation({
    init(fx) {
        let cache = fx.element[slideCache];

        if(!cache) {
            let maxWidth = fx.element.style.maxWidth,
                maxHeight = fx.element.style.maxHeight,
                rect,
                placement = fx.element.dataset.placement;

            fx.element.style.maxWidth = "";
            fx.element.style.maxHeight = "";

            // Find full width and height of element.
            rect = Rect.getBoundingClientRect(fx.element);

            if(placement === "left" || placement === "right") fx.element.style.maxWidth = maxWidth;
            if(placement === "top" || placement === "bottom") fx.element.style.maxHeight = maxHeight;

            cache = fx.element[slideCache] = {
                rect,
                fxWidth: rect.width,
                fxHeight: rect.height,
                placement,
                fx: fx
            };
        } else {
            if(cache.fx) {
                cache.fx.cancel();
                cache.fx = null;
            }

            cache = fx.element[slideCache] = {
                ...cache,
                fx: fx
            };
        }
    },

    destroy(fx) {
        delete fx.element[slideCache];
    },

    frames(element) {
        // noinspection JSUnresolvedVariable
        let cache = element[slideCache],
            placement = cache.placement;

        if(placement === 'top' || placement === 'bottom') {
            return {
                '0%': {height: cache.fxHeight},
                '100%': {height: 0}
            };
        } else if(placement === "left" || placement === "right") {
            return {
                '0%': {width: cache.fxWidth},
                '100%': {width: 0}
            };
        }
    },

    applyFrame(fx, frame) {
        let cache = fx.element[slideCache],
            placement = cache.placement;

        if(placement === 'top' || placement === 'bottom') {
            fx.element.style.maxHeight = `${frame.height}px`;
            cache.fxHeight = frame.height;
        } else {
            fx.element.style.maxWidth = `${frame.width}px`;
            cache.fxWidth = frame.width;
        }
    }
});


const PLACEMENTS = {
    top: {
        my: "bottom",
        at: "top",
        collision: "flip",
        name: "top"
    },

    right: {
        my: 'left',
        at: 'right',
        collision: "flip",
        name: "right"
    },

    bottom: {
        my: "top",
        at: "bottom",
        collision: "flip",
        name: "bottom"
    },

    left: {
        my: "right",
        at: "left",
        collision: "flip",
        name: "left"
    }
};


export default class Tooltip extends Component {
    #timer;
    #isActive;

    constructor(text) {
        let element = document.createElement('div'),
            body = document.createElement('div'),
            label = document.createElement('div'),
            arrow = document.createElement('div');

        element.appendChild(body);
        body.appendChild(label);
        body.appendChild(arrow);
        label.innerHTML = text;

        element.className = "tooltip";
        body.className = "tooltip__body";
        label.className = "tooltip__label";
        arrow.className = "arrow";

        super(element);

        this.#timer = null;

        this.showFX = SLIDE_IN_TOOLTIP_FX.bind(null, 200);
        this.hideFX = SLIDE_OUT_TOOLTIP_FX.bind(null, 200);
        this.isVisible = false;
        this.#isActive = false;
    }

    show(target, placement, timeout=null) {
        if(this.#isActive) {
            return;
        }

        this.#isActive = true;

        this.publish("tooltip.activate", this);

        if(this.#timer) {
            clearTimeout(this.#timer);
            this.#timer = null;
        }

        if(typeof placement === 'string') {
            placement = PLACEMENTS[placement];
        }

        if(typeof placement.name === 'string') {
            this.element.dataset.placement = placement.name;
        }

        if(!this.element.parentElement) {
            target.offsetParent.appendChild(this.element);
        }

        let targetRect = Rect.getBoundingClientRect(target);

        if(typeof this.hideFX === 'string') {
            this.removeClass(this.hideFX);
        }

        this.isVisible = true;

        let state = {};

        // for(let i = 0; i < this.element.style.length; i++) {
        //     state[this.element.style[i]] = this.element.style[this.element.style[i]];
        //     state[this.element.style[i]] = '';
        // }

        let rect = Rect.getBoundingClientRect(this.element);

        Object.assign(this.element.style, state);

        let pos = rect.position({
            inside: Rect.getClientRect(),
            of: targetRect,
            ...placement
        });

        let methodX = "left",
            methodY = "top";

        if(pos.top <= targetRect.top) {
            methodY = "bottom";
        }

        if(pos.left < targetRect.left) {
            methodX = "right";
        }

        setElementClientPosition(this.element, pos, `${methodY}-${methodX}`);

        let onComplete = () => {
            this.publish('tooltip.shown', this);

            if(typeof timeout === 'number' && timeout >= 0) {
                this.#timer = setTimeout(() => {
                    this.#timer = null;
                    this.hide();
                }, timeout);
            }
        };

        if(typeof this.showFX === 'string') {
            this.addClass(this.showFX);
            onComplete();
        } else if(typeof this.showFX === 'function') {
            this.showFX(this.element, undefined, {
                onComplete
            });
        }
    }

    hide() {
        if(this.#timer) {
            clearTimeout(this.#timer);
            this.#timer = null;
        }

        if(!this.#isActive) {
            return;
        }

        this.#isActive = false;

        this.publish("tooltip.deactivate", this);

        if(typeof this.showFX === 'string') {
            this.removeClass(this.showFX);
        }

        let onComplete = () => {
            this.isVisible = false;
            this.publish("tooltip.hidden", this);
        };

        if(typeof this.hideFX === 'string') {
            this.addClass(this.hideFX);
            onComplete();
        } else if(typeof this.hideFX === 'function') {
            this.hideFX(this.element, undefined, {onComplete});
        } else {
            this.isVisible = false;
        }
    }

    get isActive() {
        return this.#isActive;
    }
}
