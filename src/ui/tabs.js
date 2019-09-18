import AutoLoader from 'autoloader';


/**
 * A component that controls a series of items that display tabbable panes.  Ensures that only 1 tab can be visible at
 * any given time.
 *
 * ---
 *
 * @classdesc
 *
 * #Events
 *
 * | Event Name     | Event Description                           |
 * | ----------     | ------------------------------------------- |
 * | tab.active     | Triggered when an unactive tab activates.   |
 * | tab.deactivate | Triggered when an activate tab deactivates. |
 *
 * ---
 *
 * #Properties
 * itemSelector {String} - A css selector that is used to query for tab items.
 * activeClassName {String} - The class that should be applied when an item is active.
 * openClassName {String} - The class that should be applied when a tab is open.
 *
 * ---
 * #Tab Attributes
 * data-tab - The css selector that is used to query the tab pane that should be displayed.
 *
 * @class
 */
export default class Tabs {
    constructor({element, itemSelector=".tab-item", activeClassName="active", openClassName="open"}={}) {
        if(typeof element === 'string') {
            this.element = document.querySelector(element);
        } else if(element) {
            this.element = element;
        } else {
            this.element = document.createElement('div');
        }

        this.element.classList.add('ui-tabs');

        this.activeClassName = activeClassName;
        this.openClassName = openClassName;
        this.itemSelector = itemSelector;
        this._onClick = (event) => this.onClick(event);

        this.element.addEventListener('click', this._onClick);
    }

    /**
     * Destroys
     */
    destroy() {
        this.element.removeEventListener('click', this._onClick);
        this._onClick = null;
    }

    onClick(event) {
        let tab = event.target.closest(this.itemSelector);

        if(tab && this.element.contains(tab)) {
            this.activateItem(tab);
        }
    }

    appendTo(element) {
        if(typeof element === 'string') {
            document.querySelector(element).appendChild(this.element);
        } else if(element.appendChild) {
            element.appendChild(this.element);
        } else if(element.append) { // jquery
            element.append(this.element);
        }
    }

    activateItem(item) {
        if(this.isActiveItem(item)) return;

        let target = document.querySelector(item.dataset.tab);

        for(let _childItem of this.getActiveItems()) {
            if(_childItem !== item) {
                this.deactivateItem(_childItem);
            }
        }

        item.classList.add(this.activeClassName);
        target.classList.add(this.openClassName);

        let event = new CustomEvent('tab.activate', {
            bubbles: true,
            detail: {
                instance: this,
                tabTarget: target,
                tabItem: item
            }
        });

        item.dispatchEvent(event);
    }

    deactivateItem(item) {
        if(!this.isActiveItem(item)) return;

        let target = document.querySelector(item.dataset.tab);

        item.classList.remove(this.activeClassName);
        target.classList.remove(this.openClassName);

        let event = new CustomEvent('tab.deactivate', {
            bubbles: true,
            detail: {
                instance: this,
                tabTarget: target,
                tabItem: item
            }
        });

        item.dispatchEvent(event);
    }

    /**
     * Clears all active items.
     */
    clear() {
        for(let item of this.getActiveItems()) {
            this.deactivateItem(item);
        }
    }

    getAllItems() {
        return this.element.querySelectorAll(this.itemSelector);
    }

    getActiveItems() {
        return this.element.querySelectorAll(`${this.itemSelector}.${this.activeClassName}`);
    }

    isActiveItem(item) {
        return item.classList.contains(this.activeClassName);
    }

    static buildComponent(element) {
        let args = {
            element: element
        };

        for(let key of ['itemSelector', 'activeClassName', 'openClassName']) {
            if(element.dataset[key] !== undefined) {
                args[key] = element.dataset[key];
            }
        }

        return new Tabs(args);
    }
}


AutoLoader.register('tabs', (element) => Tabs.buildComponent(element));
