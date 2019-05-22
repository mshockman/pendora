import Menu from './Menu';


export default class MenuBar extends Menu {
    constructor({target=null, ...options}={}) {
        super({
            target,
            closeOnBlur: true,
            timeout: false,
            autoActivate: false,
            delay: false,
            multiple: false,
            toggleItem: 'both',
            toggleMenu: 'none',
            closeOnSelect: true,
            ...options
        });

        this.element.classList.add('c-menubar');
        this.visible = true;
    }
}
