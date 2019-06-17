import MenuNode from "./MenuNode";
import Menu from "./Menu";
import {getMenuNode, isMenu} from "./core";


export class DropDown extends MenuNode {
    constructor({target=null, text='', closeOnBlur=false, timeout=false, autoActivate=false, toggle="both",
                    closeOnSelect=true, position=null}={}) {
        let element,
            btn,
            menu;

        element = document.createElement('div');
        btn = document.createElement("button");
        btn.type = 'button';
        btn.innerHTML = text;

        element.appendChild(btn);
        menu = new Menu();

        element.appendChild(btn);
        element.appendChild(menu.element);

        super(element, 'dropdown');
        this.menu = menu;
        this.button = btn;
        this.element.classList.add('c-dropdown');
        this.element.dataset.role = 'dropdown';

        this.isMenuController = true;
        this._onMouseOver = this.onMouseOver.bind(this);
        this._onMouseOut = this.onMouseOut.bind(this);
        this._onClick = this.onClick.bind(this);

        this.element.addEventListener('mouseover', this._onMouseOver);
        this.element.addEventListener('mouseout', this._onMouseOut);
        this.element.addEventListener('click', this._onClick);

        this.closeOnBlur = closeOnBlur;
        this.closeOnSelect = closeOnSelect;
        this.timeout = timeout;
        this.autoActivate = autoActivate;
        this.toggle = toggle;
        this.position = position;
    }

    activate() {
        if(!this.isActive) {
            this.isActive = true;

            if(this._autoActivateTimer) {
                clearTimeout(this._autoActivateTimer);
                this._autoActivateTimer = null;
            }

            let submenu = this.submenu;

            if(submenu) {
                submenu.show();
            }

            if(this.closeOnBlur && !this._captureDocumentClick) {
                let doc = document;
                this._captureDocumentClick = {
                    doc: doc,
                    onDocumentClick: (event) => {
                        if(!this.element.contains(event.target)) {
                            this.deactivate();
                        }
                    }
                };

                doc.addEventListener('click', this._captureDocumentClick.onDocumentClick);
            }

            this.trigger('activate', this);
        }
    }

    deactivate() {
        if(this.isActive) {
            this.isActive = false;

            if(this._captureDocumentClick) {
                this._captureDocumentClick.doc.removeEventListener('click', this._captureDocumentClick.onDocumentClick);
                this._captureDocumentClick = null;
            }

            if(this._timeoutTimer) {
                clearTimeout(this._timeoutTimer);
                this._timeoutTimer = null;
            }

            let submenu = this.submenu;

            if(submenu) {
                submenu.deactivate();
                submenu.hide();
            }

            this.trigger('deactivate', this);
        }
    }

    add(item) {

    }

    onMouseOver(event) {
        if(this._timeoutTimer) {
            clearTimeout(this._timeoutTimer);
            this._timeoutTimer = null;
        }

        if(!this.isActive && !this.getDisabled()) {
            if(this.autoActivate === true) {
                this.activate();
            } else if(typeof this.autoActivate === 'number' && this.autoActivate >= 0) {
                this._autoActivateTimer = setTimeout(() => {
                    this._autoActivateTimer = null;
                    this.activate();
                }, this.autoActivate);
            }
        }
    }

    onMouseOut(event) {
        // true mouse out event.  Mouse left the dropdown.
        if(!this.element.contains(event.relatedTarget)) {
            if(this._autoActivateTimer) {
                clearTimeout(this._autoActivateTimer);
                this._autoActivateTimer = null;
            }

            if(this.isActive && typeof this.timeout === 'number' && this.timeout >= 0) {
                if(this._timeoutTimer) {
                    clearTimeout(this._timeoutTimer);
                    this._timeoutTimer = null;
                }

                this._timeoutTimer = setTimeout(() => {
                    this._timeoutTimer = null;
                    this.deactivate();
                }, this.timeout);
            }
        }
    }

    onClick(event) {
        // Prevent action and url anchor clicks.
        if(this.getDisabled()) {
            event.preventDefault();
            return;
        }

        let isActive = this.isActive;

        if(!isActive && this.toggle === "on" || this.toggle === 'both') {
            this.activate();
        } else if(isActive && this.toggle === "off" || this.toggle === "both") {
            this.deactivate();
        }
    }

    get submenu() {
        for(let element of this.element.children) {
            let node = getMenuNode(element);

            if(node && isMenu(node)) {
                return node;
            }
        }
    }

    set closeOnSelect(value) {
        if(value === 'child' || value === true) {
            this._closeOnSelect = value;

            // Attach event if needed.
            if(!this._closeOnSelectHandler) {
                this._closeOnSelectHandler = (event) => {
                    if(this.closeOnSelect === true || (this.closeOnSelect === 'child' && event.detail.item.parent === this)) {
                        this.deactivate();
                    }
                };

                this.element.addEventListener('item-select', this._closeOnSelectHandler);
            }
        } else if(value === false) {
            // Cleanup event handler.
            this.element.removeEventListener('item-select', this._closeOnSelectHandler);
            this._closeOnSelectHandler = null;
            this._closeOnSelect = value;
        } else {
            throw new Error("closeOnSelect must be of type Enum(true, false, 'child')");
        }
    }

    get closeOnSelect() {
        return this._closeOnSelect;
    }
}
