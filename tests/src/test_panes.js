import PanesView from "../../src/core/ui/PanesView";


export default class PanesTestPage {
    constructor() {

    }

    load() {
        let element = document.getElementById('test-pane'),
            vpane = document.getElementById('test-v-pane');

        window.panes = new PanesView(element);
        window.vpane = new PanesView(vpane);
    }
}
