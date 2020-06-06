import Publisher from "../Publisher";
import {addClasses} from "../utility";
import {Rect} from "./position";
import {clamp} from "../utility";


/**
 * scroll
 */
export default class Viewport extends Publisher {
    #element;
    #body;

    #innerWidth = null;
    #innerHeight = null;

    #scrollbars;
    #scrollCache;
    #scrollArea;

    constructor({classes=null, id=null}={}) {
        super();

        this.#element = document.createElement("div");
        this.#scrollArea = document.createElement("div");
        this.#body = document.createElement("div");
        this.#element.appendChild(this.#scrollArea);
        this.#scrollArea.appendChild(this.#body);
        this.#scrollCache = new WeakMap();

        this.#element.className = "viewport";
        this.#scrollArea.className = "viewport__scroll-area";
        this.#body.className = "viewport__body";

        this.#scrollbars = [];

        if(classes) addClasses(this.#element, classes);
        if(id) this.#element.id = id;

        this.#element.addEventListener("wheel", event => {
            event.preventDefault();
            this.scrollTop += event.deltaY;
            this.render();
            this.#publishScroll();
        });

        this.#scrollArea.addEventListener("scroll", event => {
            this.render();
            this.#publishScroll();
        });
    }

    attachScrollBar(scrollbar) {
        let cache = this.#scrollCache.get(scrollbar);
        if(cache) return;

        cache = {};

        let onSlide = topic => {
            let details = this.getScrollDetails(),
                value = topic.value;

            if(scrollbar.axis === 'x') {
                this.scrollLeft = details.width * value;
            } else {
                this.scrollTop = details.height * value;
            }

            this.render();
            this.#publishScroll();
        };

        scrollbar.on("slide", onSlide);
        scrollbar.on("slide-complete", onSlide);
        scrollbar.on("change", onSlide);
        cache.onSlide = onSlide;
        cache.onSlideComplete = onSlide;
        cache.onChange = onSlide;

        this.#scrollbars.push(scrollbar);
        this.#scrollCache.set(scrollbar, cache);

        this.render();
    }

    detachScrollBar(scrollbar) {
        let cache = this.#scrollCache.get(scrollbar);

        if(cache) {
            scrollbar.off('slide', cache.onSlide);
            scrollbar.off('slide-complete', cache.onSlideComplete);
            scrollbar.off("change", cache.onChange);
            this.#scrollCache.delete(scrollbar);
        }
    }

    appendTo(selector) {
        if(typeof selector === 'string') {
            document.querySelector(selector).appendChild(this.#element);
        } else if(selector.appendChild) {
            selector.appendChild(this.#element);
        } else {
            selector.append(this.#element);
        }
    }

    appendChild(element) {
        return this.#body.appendChild(element);
    }

    getScrollDetails() {
        let bv = Rect.getBoundingClientRect(this.#body),
            sv = Rect.getBoundingClientRect(this.#scrollArea),
            width = (bv.width - sv.width),
            height = (bv.height - sv.height);

        return {
            x: width ? this.scrollLeft / width : 1,
            y: height ? this.scrollTop / height : 1,
            width,
            height,
            innerWidth: bv.width,
            innerHeight: bv.height,
            outerWidth: sv.width,
            outerHeight: sv.height
        };
    }

    render() {
        if(this.#scrollbars.length) {
            let detail = this.getScrollDetails(),
                sizeX = (clamp(detail.outerWidth / detail.innerWidth, 0, 1) * 100).toFixed(2),
                sizeY = (clamp(detail.outerHeight / detail.innerHeight, 0, 1) * 100).toFixed(2);

            for(let scrollbar of this.#scrollbars) {
                if(scrollbar.axis === 'x') {
                    scrollbar.sliderSize = `${sizeX}%`;
                    scrollbar.value = detail.x;
                } else {
                    scrollbar.sliderSize = `${sizeY}%`;
                    scrollbar.value = detail.y;
                }
            }
        }
    }

    #publishScroll() {
        this.publish("scroll", {
            ...this.getScrollDetails(),
            topic: "scroll",
            viewport: this
        });
    }

    get innerWidth() {
        return this.#innerWidth;
    }

    get innerHeight() {
        return this.#innerHeight;
    }

    set innerWidth(width) {
        width = parseFloat(width);

        if(!Number.isNaN(width)) {
            this.#innerWidth = width;
            this.#body.style.width = this.#innerWidth+"px";
            this.render();
        }
    }

    set innerHeight(height) {
        height = parseFloat(height);

        if(!Number.isNaN(height)) {
            this.#innerHeight = height;
            this.#body.style.height = this.#innerHeight+"px";
            this.render();
        }
    }

    get scrollLeft() {
        return this.#scrollArea.scrollLeft;
    }

    get scrollTop() {
        return this.#scrollArea.scrollTop;
    }

    set scrollLeft(value) {
        this.#scrollArea.scrollLeft = value;
        this.render();
    }

    set scrollTop(value) {
        this.#scrollArea.scrollTop = value;
        this.render();
    }

    get scrollHeight() {
        return this.#scrollArea.scrollHeight;
    }

    get scrollWidth() {
        return this.#scrollArea.scrollWidth;
    }

    get element() {
        return this.#element;
    }

    get body() {
        return this.#body;
    }

    get scrollArea() {
        return this.#scrollArea;
    }

    get scrollbars() {
        return this.#scrollbars.slice(0);
    }
}
