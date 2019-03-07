import Observable from "../core/interface/Observable";
import $ from 'jquery';


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

        if(!selector) {
            this.$element = $(Viewport.template());
        } else {
            if(typeof selector === 'function') {
                this.$element = $(selector());
            } else {
                this.$element = $(selector);
            }
        }

        // The body element is used to set the width and height of the scrollable area of the viewport
        // if it manually needs to be set.
        this.$body = this.$element.find('.c-viewport__body');

        // Attaching scrolling event.
        this.$element.on('scroll', () => {
            this._left = this.$element.scrollLeft();
            this._top = this.$element.scrollTop();

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
        return this.$element.appendTo(selector);
    }

    /**
     * Add a component to the viewport.
     * @param component
     * @returns {*}
     */
    append(component) {
        if(component.appendTo) {
            return component.appendTo(this.$body);
        } else {
            this.$body.append(component);
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
            listener = (event) => {
                this._left = event.left;
            };
        } else if(mode === 'y') {
            listener = (event) => {
                this._top = event.top;
            };
        } else {
            listener = (event) => {
                this._left = event.left;
                this._top = event.top;
            };
        }

        viewport.on('scroll', listener);
        return listener;
    }

    set left(value) {
        this._left = value;
        this.$element.scrollLeft(value);
    }

    set top(value) {
        this._top = value;
        this.$element.scrollTop(value);
    }

    get left() {
        return this._left;
    }

    get top() {
        return this._top;
    }

    get viewportWidth() {
        return this.$body.outerWidth();
    }

    get viewportHeight() {
        return this.$body.outerHeight();
    }

    set viewportWidth(value) {
        this.$body.outerWidth(value);
    }

    set viewportHeight(value) {
        this.$body.outerHeight(value);
    }

    static template() {
        return `
            <div class="c-viewport"><div class="c-viewport__body"></div></div>
        `;
    }
}