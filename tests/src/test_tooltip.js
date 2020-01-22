import Tooltip from "../../src/core/ui/Tooltip";


export default class ToolTipTestPage {
    constructor() {

    }

    load() {
        this.initDebug();
        let tooltips = new WeakMap();
        let counter = 1;

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

                console.log("++++++++++++++++++++++++++++++++++++++++++++++");
                let before = tooltip.state;
                console.log("Counter: " + counter);
                counter++;

                if(tooltip.state === Tooltip.hidden || tooltip.state === Tooltip.hiding) {
                    console.log("Showing from " + tooltip.state);
                    tooltip.show(event.target, node.dataset.placement);
                } else if(tooltip.state === Tooltip.showing || tooltip.state === Tooltip.visible) {
                    console.log("Hiding from " + tooltip.state);
                    tooltip.hide();
                }

                console.log({
                    before,
                    after: tooltip.state
                });

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
