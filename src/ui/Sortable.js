import {getTranslation} from "core/position";


export default class Sortable {
    constructor(element, {items=".ui-sortable", helper=null}={}) {
        if(typeof element === 'string') {
            this.element = document.querySelector(element);
        } else {
            this.element = element;
        }

        this.items = items;
        this.isSorting = false;

        this.initEvents();
    }

    initEvents() {
        let items = null;

        this.element.addEventListener('drag-start', (event) => {
            items = this.element.querySelectorAll(this.items);
            this.isSorting = true;
        });

        this.element.addEventListener('drag-move', (event) => {
            let before = Sortable.getElementBefore(items, event.detail.clientX, event.detail.clientY, event.target),
                beforeBB = event.detail.helper.getBoundingClientRect();

            if(before !== event.target.previousElementSibling) {
                event.target.parentElement.insertBefore(event.target, before ? before.nextSibling : event.target.parentElement.firstChild);

                let afterBB = event.detail.helper.getBoundingClientRect(),
                    deltaLeft = afterBB.left - beforeBB.left,
                    deltaTop = afterBB.top - beforeBB.top,
                    translation = getTranslation(event.detail.helper);

                event.detail.helper.style.transform = `translate3d(${translation.x - deltaLeft}px, ${translation.y - deltaTop}px, 0)`;
            }
        });

        this.element.addEventListener('drag-complete', (event) => {
            this.isSorting = false;
            event.target.style.transform = "translate3d(0px, 0px, 0px)";
            console.dir(event);
        });
    }

    /**
     *
     * @param elements
     * @param x
     * @param y
     * @param target
     * @returns {Element|null}
     */
    static getElementBefore(elements, x, y, target) {
        let before = null;

        for(let item of elements) {
            if(item === target) continue;

            let box = item.getBoundingClientRect();

            if(box.bottom > y) {
                break;
            } else {
                before = item;
            }
        }

        return before;
    }
}
