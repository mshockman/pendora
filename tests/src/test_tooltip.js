import Tooltip from "../../src/core/ui/Tooltip";


export default class ToolTipTestPage {
    constructor() {

    }

    load() {
        this.initDebug();
        let tooltips = new WeakMap();

        for(let node of document.querySelectorAll("[data-tooltip]")) {
            node.addEventListener('click', (event) => {
                /**
                 * @type {Tooltip}
                 */
                let tooltip = tooltips.get(event.target);

                if(!tooltip) {
                    // noinspection JSUnresolvedVariable
                    tooltip = new Tooltip(event.target.dataset.tooltip);
                    tooltips.set(event.target, tooltip);
                    tooltip.appendTo(document.body);
                }

                if(tooltip.state === Tooltip.hidden || tooltip.state === Tooltip.hiding) {
                    tooltip.show(event.target, node.dataset.placement);
                } else {
                    tooltip.hide();
                }

                console.log(tooltip.state);

                // tooltip.show(event.target, event.target.dataset.placement);
            })
        }
    }

    initDebug() {
        let debug = document.querySelector('#debug_output');

        document.addEventListener('mousemove', event => {
            debug.innerHTML = `(${event.clientX}, ${event.clientY})`;
        });
    }
}
