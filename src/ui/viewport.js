import Observable from "../core/interface/Observable";
import {selectElement, getScroll, setScroll} from "../core/utility";


/**
 * A UI component that tracks scrolling and allows the user to set its scroll content width and height.
 *
 * @property left - Used to get and set the viewports scrollLeft.
 * @property top - Used to get and set the viewports scrollTop.
 * @property viewportWidth - Used to get and set the width of the scrollable area.
 * @property viewportHeight - Used to get and set the height of the scrollable area.
 *
 * @event scroll({left, top, target})
 */
export default class Viewport extends Observable {
    constructor(selector) {
        super();

        this._left = 0;
        this._top = 0;

        if(selector) {
            if (typeof selector === 'string') {
                this.element = document.querySelector(selector);
            } else if (typeof selector === 'function') {
                this.element = selector();
            } else if (selector.jquery) {
                this.element = selector[0];
            } else if (selector.nodeType) {
                this.element = selector;
            }
        }

        if(this.element) {
            this.body = this.element.querySelector('.c-viewport__body');

            if(!this.body) {
                let fragment = document.createDocumentFragment();
                while(this.element.firstChild) fragment.appendChild(this.element.firstChild);

                // Wrap child element in a body.
                this.body = document.createElement('div');
                this.body.classList.add('c-viewport__body');
                this.body.appendChild(fragment);
                this.element.appendChild(this.body);
            }
        } else {
            // Create from scratch.
            this.element = document.createElement('div');
            this.body = document.createElement('div');

            this.element.classList.add('c-viewport');
            this.body.classList.add('c-viewport__body');
            this.element.appendChild(this.body);
        }

        // Attaching scrolling event.
        this.element.addEventListener('scroll', () => {
            let scroll = getScroll(this.element);
            this._left = scroll.scrollLeft;
            this._top = scroll.scrollTop;

            this.trigger('scroll', {
                target: this,
                left: this._left,
                top: this._top
            });
        });
    }

    /**
     * Append to the component to the selector.
     * @param selector
     * @returns {*}
     */
    appendTo(selector) {
        return selectElement(selector).appendChild(this.element);
    }

    /**
     * Add a component to the viewport.
     * @param component
     * @returns {*}
     */
    append(component) {
        if(component.appendTo) {
            return component.appendTo(this.body);
        } else {
            this.body.appendChild(selectElement(component));
        }
    }

    /**
     * Sets the current viewport to mirror the the scrolling of either the x, y, or xy of the passed viewport.
     * @param viewport
     * @param mode - The type of mirroring.  Either x, y or xy.
     *      x - mirror only the x-axis
     *      y - mirrors only the y-axis
     *      xy - mirrors both axises.
     * @returns {listener}
     */
    mirror(viewport, mode='xy') {
        let listener;

        if(mode === 'x') {
            listener = (name, event) => {
                this.left = event.left;
            };
        } else if(mode === 'y') {
            listener = (name, event) => {
                this.top = event.top;
            };
        } else {
            listener = (name, event) => {
                this.left = event.left;
                this.top = event.top;
            };
        }

        viewport.on('scroll', listener);
        return listener;
    }

    set left(value) {
        this._left = value;
        setScroll(this.element, {
            left: value
        });
    }

    set top(value) {
        this._top = value;
        setScroll(this.element, {
            top: value
        });
    }

    get left() {
        return this._left;
    }

    get top() {
        return this._top;
    }

    get viewportWidth() {
        return this.body.offsetWidth;
    }

    get viewportHeight() {
        return this.body.offsetHeight;
    }

    set viewportWidth(value) {
        this.body.style.width = value + 'px';
    }

    set viewportHeight(value) {
        this.body.style.height = value + 'px';
    }
}