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
                    tooltip = new Tooltip(event.target.dataset.tooltip, node.dataset.placement, event.target, {animation: 'fade', animationDuration: 200});
                    tooltips.set(event.target, tooltip);
                    tooltip.appendTo(document.body);
                }

                if(tooltip.state === Tooltip.hidden || tooltip.state === Tooltip.hiding) {
                    tooltip.show();
                } else if(tooltip.state === Tooltip.showing || tooltip.state === Tooltip.visible) {
                    tooltip.hide();
                }
            });
        }
    }

    initDebug() {
        let debug = document.querySelector('#debug_output');

        document.addEventListener('mousemove', event => {
            debug.innerHTML = `(${event.clientX}, ${event.clientY})`;
        });
    }
}
