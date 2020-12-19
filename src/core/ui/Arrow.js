import Component from "../Component";
import Rect from "../vectors/Rect";
import {setElementClientPosition} from "./position";


/**
 * A class that creates an arrow that can be placed at the edge of elements that will point towards the target element.
 * The arrow will be positioned to be as close to the target why still fitting inside it's parent.
 */
export default class Arrow extends Component {
    /**
     *
     * @param placement
     * @param align
     * @param setMargins
     */
    constructor(placement="bottom", align="center", setMargins=false) {
        let element = document.createElement('div');
        element.className = "arrow";

        super(element);

        this.parent = null;
        this.target = null;
        this.setMargins = setMargins;

        this.element.dataset.placement = placement;
        this.element.dataset.align = align;
    }

    set align(value) {
        this.element.dataset.align = value;
        this.render();
    }

    get align() {
        return this.element.dataset.align;
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
        this.element.style.left = "";
        this.element.style.right = "";
        this.element.style.top = "";
        this.element.style.bottom = "";
        let parent = this.parent || this.element.offsetParent;

        let parentRect = new Rect(parent),
            targetRect = this.target ? new Rect(this.target) : null,
            pos = new Rect(this.element);

        if(this.setMargins) {
            parent.style.marginLeft = "";
            parent.style.marginTop = "";
            parent.style.marginRight = "";
            parent.style.marginBottom = "";
        }

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

            if(this.setMargins) parent.style.marginTop = pos.height + "px";
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
            if(this.setMargins) parent.style.marginRight = pos.height + "px";
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
            if(this.setMargins) parent.style.marginBottom = pos.height + "px";
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
            if(this.setMargins) parent.style.marginLeft = pos.height + "px";
        }

        setElementClientPosition(this.element, pos);
    }
}
