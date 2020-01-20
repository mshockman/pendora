import Tooltip from "../../src/core/ui/Tooltip";


export default class ToolTipTestPage {
    constructor() {

    }

    load() {
        let tooltips = new WeakMap();

        for(let node of document.querySelectorAll("[data-tooltip]")) {
            node.addEventListener('click', (event) => {
                let tooltip = tooltips.get(event.target);

                if(!tooltip) {
                    // noinspection JSUnresolvedVariable
                    tooltip = new Tooltip(event.target.dataset.tooltip);
                    tooltips.set(event.target, tooltip);
                }

                if(!tooltip.isActive) {
                    tooltip.show(event.target, node.dataset.placement);
                } else {
                    tooltip.hide();
                }
            })
        }
    }
}
