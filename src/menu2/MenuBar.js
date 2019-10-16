import Menu from "./Menu";


export default class MenuBar extends Menu {
    constructor({target=null, closeOnBlur=true, timeout=false, autoActivate=false, multiple=false, openOnHover=true,
                    toggle="both", closeOnSelect=true, deactivateOnItemHover=true}={}) {

        super({
            target, closeOnBlur, timeout, autoActivate, multiple, openOnHover,
            toggle, closeOnSelect, deactivateOnItemHover
        });

        this.element.className = "menubar";
    }
}
