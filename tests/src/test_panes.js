import PanesView from "../../src/core/ui/PanesView";


export default class PanesTestPage {
    constructor() {

    }

    load() {
        let element = document.getElementById('test-pane');
        window.panes = new PanesView(element);
    }
}
