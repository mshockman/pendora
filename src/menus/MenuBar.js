import Menu from './Menu';
import AutoLoader from 'autoloader';


export default class MenuBar extends Menu {
    constructor({target=null, ...options}={}) {
        super({
            target,
            closeOnBlur: true,
            timeout: false,
            autoActivate: true,
            timein: false,
            multiple: false,
            toggle: 'both',
            toggleMenu: 'none',
            closeOnSelect: true,
            ...options
        });

        this.element.classList.add('c-menubar');
        this.element.classList.remove('c-menu');
        this.visible = true;
    }
}


AutoLoader.register('menubar', (element) => {
    return MenuBar.widget({target: element});
});
