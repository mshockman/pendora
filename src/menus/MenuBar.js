import Menu from './Menu';


export default class MenuBar extends Menu {
    constructor({target=null, closeOnBlur=true, timeout=false, autoActivate=false, delay=false, multiple=false,
                    toggleItem='both', toggleMenu='none', closeOnSelect=true}={}) {

        super({target, closeOnBlur, timeout, autoActivate, delay, multiple, toggleItem, toggleMenu, closeOnSelect});
        this.element.classList.add('c-menubar');
        this.visible = true;
    }
}
