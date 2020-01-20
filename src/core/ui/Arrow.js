import Component from "../Component";
import Rect from "../vectors/Rect";
import {setElementClientPosition} from "./position";


/**
 * A class that creates an arrow that can be placed at the edge of elements that will point towards the target element.
 * The arrow will be positioned to be as close to the target why still fitting inside it's parent.
 */
export default class Arrow extends Component {
    /**
     * The starting alignment of the arrow.
     * Can be start, end, or center.
     */
    #align;

    constructor(placement="bottom", align="center") {
        let element = document.createElement('div');
        element.className = "arrow";

        super(element);

        this.parent = null;
        this.target = null;
        this.#align = align;

        this.element.dataset.placement = placement;
    }

    set align(value) {
        this.#align = value;
        this.render();
    }

    get align() {
        return this.#align;
    }

    set placement(value) {
        this.element.dataset.placement = value;
        this.render();
    }

    get placement() {
        return this.element.dataset.placement;
    }

    /**
     * Sets the placement and align of the arrow.  Can take a string of placement-align separated by a dash.
     *
     * @param placementString
     */
    setPlacement(placementString) {
        let [placement, align] = placementString.split("-");

        this.placement = placement;
        this.align = align || "center";

        this.render();
    }

    render() {
        this.element.dataset.direction = this.direction;
        this.element.style.left = "";
        this.element.style.right = "";
        this.element.style.top = "";
        this.element.style.bottom = "";

        let parentRect = new Rect(this.parent || this.element.offsetParent),
            targetRect = this.target ? new Rect(this.target) : null,
            pos = new Rect(this.element);

        if(this.placement === "top") {
            if(this.align === "start") {
                pos = pos.position({my: "left bottom", at: "left top", of: parentRect});
            } else if(this.align === "end") {
                pos = pos.position({my: "right bottom", at: "right top", of: parentRect});
            } else {
                pos = pos.position({my: "bottom", at: "top", of: parentRect});
            }

            if(targetRect) pos = pos.fitX(targetRect);
            pos = pos.fitX(parentRect);
        } else if(this.placement === "right") {
            if(this.align === "start") {
                pos = pos.position({my: "left top", at: "right top", of: parentRect});
            } else if(this.align === "end") {
                pos = pos.position({my: "left bottom", at: "right bottom", of: parentRect});
            } else {
                pos = pos.position({my: "left", at: "right", of: parentRect});
            }

            if(targetRect) pos = pos.fitY(targetRect);
            pos = pos.fitY(parentRect);
        } else if(this.placement === "bottom") {
            if(this.align === "start") {
                pos = pos.position({my: "left top", at: "left bottom", of: parentRect});
            } else if(this.align === "end") {
                pos = pos.position({my: "right top", at: "right bottom", of: parentRect});
            } else {
                pos = pos.position({my: "top", at: "bottom", of: parentRect});
            }

            if(targetRect) pos = pos.fitX(targetRect);
            pos = pos.fitX(parentRect);
        } else if(this.placement === "left") {
            if(this.align === "start") {
                pos = pos.position({my: "right top", at: "left top", of: parentRect});
            } else if(this.align === "end") {
                pos = pos.position({my: "right bottom", at: "left bottom", of: parentRect});
            } else {
                pos = pos.position({my: "right", at: "left", of: parentRect});
            }

            if(targetRect) pos = pos.fitY(targetRect);
            pos = pos.fitY(parentRect);
        }

        setElementClientPosition(this.element, pos);
    }
}
