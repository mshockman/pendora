import Viewport from "../core/ui/Viewport";
import VirtualNodeBase from "./VirtualNodeBase";


export default class VirtualList extends VirtualNodeBase {
    #viewport;
    #rows;

    #overflow;
    #virtualizationEnabled;
    #rowHeight;
    #paddingBottom;
    #paddingTop;

    #rowDetails;

    #startingIndex;
    #endingIndex;

    constructor({overflow=500, paddingBottom=0, paddingTop=0, virtualizationEnabled=true, rowHeight=50}) {
        super(document.createElement("div"));

        this.#viewport = new Viewport();
        this.#element.appendTo(this.#element);
        this.#rows = [];
        this.#rowDetails = null;
        this.#overflow = overflow;
        this.#virtualizationEnabled = virtualizationEnabled;
        this.#rowHeight = rowHeight;
        this.#paddingBottom = paddingBottom;
        this.#paddingTop = paddingTop;

        this.#startingIndex = null;
        this.#endingIndex = null;
    }

    render() {
        let start = this.getRowIndexAtPosition(this.#viewport.scrollTop - this.#overflow),
            end = this.getRowIndexAtPosition(this.#viewport.scrollTop + this.#viewport.innerHeight + this.#overflow);

        if(start === -1) start = 0;
        if(end === -1) end = this.#rows.length -1;

        let removedNodes = [],
            addedNodes = [],
            prependNodes = document.createDocumentFragment(),
            appendNodes = document.createDocumentFragment(),
            prepend = false,
            append = false;

        if(this.#startingIndex !== null) {
            if (this.#startingIndex < start) {
                for (let i = this.#startingIndex, l = Math.min(this.#endingIndex, start); i < l; i++) {
                    let node = this.#rows[i];
                    this.#viewport.removeChild(node);
                    removedNodes.push(node);
                }
            }

            if (this.#endingIndex > end) {
                for (let i = end, l = this.#endingIndex; i < l; i++) {
                    let node = this.#rows[i];
                    this.#viewport.removeChild(node);
                    removedNodes.push(node);
                }
            }

            if (start < this.#startingIndex) {
                prepend = true;

                for (let i = start, l = Math.min(end, this.#startingIndex); i < l; i++) {
                    let node = this.#rows[i];
                    prependNodes.appendChild(node);
                    addedNodes.push(node);
                }
            }
        }

        if(end > this.#endingIndex) {
            append = true;

            for(let i = Math.max(this.#endingIndex === null ? -1 : this.#endingIndex, start); i < end; i++) {
                let node = this.#rows[i];
                appendNodes.appendChild(node);
                addedNodes.push(node);
            }
        }

        if(prepend) {
            this.#viewport.prependChild(prependNodes);
        }

        if(append) {
            this.#viewport.appendChild(appendNodes);
        }

        this.#startingIndex = start;
        this.#endingIndex = end;

        if(removedNodes.length) {
            this.publish("removed-nodes", {topic: "removed-nodes", viewport: this, removedNodes});
        }

        if(addedNodes.length) {
            this.publish("added-nodes", {topic: "added-nodes", viewport: this, addedNodes});
        }
    }

    getRowIndexAtPosition(pos) {
        if(typeof this.#rowHeight === 'function') {
            return this.#searchForRowIndex(pos);
        } else {
            return Math.floor(pos / this.#rowHeight);
        }
    }

    #searchForRowIndex(pos) {
        let start = 0,
            end = this.#rows.length;

        while(start < end) {
            let index = Math.floor((end-start) / 2),
                details = this.getRowDetails(index),
                endPos = details.pos + details.height;

            if(details.pos <= pos && endPos >= pos) {
                return index;
            } else if(pos < details.pos) {
                end = index - 1;
            } else if(pos > endPos) {
                start = index + 1;
            }
        }

        return -1;
    }

    #computeRowDetails() {
        if(typeof this.#rowHeight !== 'function') {
            return;
        }

        this.#rowDetails = [];
        let pos = this.#paddingTop;

        for(let i = 0; i < this.#rows.length; i++) {
            let height = this.#rowHeight.call(this, i, this.#rows[i]);
            this.#rowDetails.push({
                pos,
                height: height
            });

            pos += height;
        }
    }

    getRowDetails(index) {
        if(index < 0 || index >= this.#rows.length) {
            return null;
        }

        if(typeof this.#rowHeight === 'number') {
            return {
                pos: index * this.#rowHeight,
                height: this.#rowHeight
            };
        }

        if(!this.#rowDetails) {
            this.#computeRowDetails();
        }

        return this.#rowDetails[index];
    }

    get viewport() {
        return this.#viewport;
    }
}
