import Component from "../Component";
import Rect from "../vectors/Rect";
import {setElementClientPosition} from "./position";


/**
 * A class that creates an arrow that can be placed at the edge of elements that will point towards the target element.
 * The arrow will be positioned to be as close to the target why still fitting inside it's parent.
 */
export default class Arrow extends Component {
    constructor(direction="down") {
        let element = document.createElement('div');
        element.className = "arrow";

        super(element);

        this.parent = null;
        this.target = null;
        this.direction = direction;
    }

    set direction(value) {
        this.element.dataset.direction = value;
    }

    get direction() {
        return this.element.dataset.direction;
    }

    getTargetPosition(parentRect, targetRect) {
        parentRect = parentRect || new Rect(this.parent);
        targetRect = targetRect || new Rect(this.target);

        let pos;

        pos = new Rect(this.element);

        if(this.direction === "down") {
            pos = pos.position({
                my: "top",
                at: "bottom",
                of: parentRect
            });

            pos = pos.fitX(targetRect);
            pos = pos.fitX(parentRect);
        } else if(this.direction === 'up') {
            pos = pos.position({
                my: "bottom",
                at: "top",
                of: parentRect
            });

            pos = pos.fitX(targetRect);
            pos = pos.fitX(parentRect);
        } else if(this.direction === "left") {
            pos = pos.position({
                my: "right",
                at: "left",
                of: parentRect
            });

            pos = pos.fitY(targetRect);
            pos = pos.fitY(parentRect);
        } else if(this.direction === "right") {
            pos = pos.position({
                my: "left",
                at: "right",
                of: parentRect
            });

            pos = pos.fitY(targetRect);
            pos = pos.fitY(parentRect);
        }

        return pos;
    }

    render() {
        this.element.dataset.direction = this.direction;
        this.element.style.left = "";
        this.element.style.right = "";
        this.element.style.top = "";
        this.element.style.bottom = "";

        let pos = this.getTargetPosition();

        setElementClientPosition(this.element, pos);
    }
}
