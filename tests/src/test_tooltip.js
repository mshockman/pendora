import Tooltip from "../../src/core/ui/Tooltip";


export default class ToolTipTestPage {
    constructor() {

    }

    load() {
        for(let node of document.querySelectorAll("[data-tooltip]")) {


            node.addEventListener('click', () => {
                let tooltip = new Tooltip(node.dataset.tooltip);
                tooltip.show(this);
            })
        }
    }
}
