import Viewport from "./Viewport";
import Component from "../Component";


/**
 *  scroll
 *  removed-nodes
 *  added-nodes
 */
export default class VirtualViewport extends Component {
    #viewport;
    #rows;

    #overflow;
    #virtualizationEnabled;

    #rowDetails;

    #startingIndex;
    #endingIndex;

    #renderId;

    /**
     * @type {null|function}
     */
    onRenderNode = null;

    constructor(nodeList, {overflow=500, virtualizationEnabled=true, onRenderNode}={}) {
        super(document.createElement("div"));
        this.addClass("virtual-viewport");

        this.#viewport = new Viewport();
        this.#viewport.element.classList.add('virtual-viewport');
        this.#viewport.appendTo(this.element);
        this.#rows = nodeList;
        this.#rowDetails = null;
        this.#overflow = overflow;
        this.#virtualizationEnabled = virtualizationEnabled;

        this.#startingIndex = null;
        this.#endingIndex = null;
        this.#renderId = null;

        this.onRenderNode = onRenderNode;

        this.#viewport.on("scroll", topic => {
            this.render();

            this.publish("scroll", {
                ...topic,
                viewport: this
            });
        });
    }

    setNodes(nodeList) {
        this.#rows = nodeList;
        this.#viewport.emptyViewport();
        this.render();
    }

    render() {
        if(!this.#renderId) {
            this.#renderId = window.requestAnimationFrame(() => {
                this.#renderId = null;
                this.#render();
            });
        }
    }

    #render() {
        let start = this.#rows.getNodeIndexAtPosition(this.#viewport.scrollTop - this.#overflow),
            end = this.#rows.getNodeIndexAtPosition(this.#viewport.scrollTop + this.#viewport.offsetHeight + this.#overflow);

        if(start === this.#startingIndex && end === this.#endingIndex) return;

        if(start < 0) start = 0;
        if(end < 0) end = this.#rows.getLength();

        if(start === end) {
            this.#viewport.emptyViewport();
            return;
        }

        let removedNodes = [],
            addedNodes = [],
            prependNodes = document.createDocumentFragment(),
            appendNodes = document.createDocumentFragment(),
            prepend = false,
            append = false;

        if(this.#startingIndex !== null) {
            // Remove nodes before new starting
            if (this.#startingIndex < start) {
                for (let i = this.#startingIndex, l = Math.min(this.#endingIndex, start); i < l; i++) {
                    let node = this.#rows.getNode(i);

                    try {
                        this.#viewport.removeChild(node);
                    } catch(e) {}

                    removedNodes.push(node);
                }
            }

            // Remove Nodes after new ending
            if (this.#endingIndex > end) {
                for (let i = end, l = this.#endingIndex; i < l; i++) {
                    let node = this.#rows.getNode(i);

                    try {
                        this.#viewport.removeChild(node);
                    } catch(e) {}

                    removedNodes.push(node);
                }
            }

            // Add nodes after new starting but before old starting.
            if (start < this.#startingIndex) {
                prepend = true;

                for (let i = Math.max(start, 0), l = Math.min(end, this.#startingIndex, this.#rows.getLength()); i < l; i++) {
                    let node = this.#rows.getNode(i),
                        position = this.#rows.getNodePosition(i),
                        height = this.#rows.getNodeHeight(i);

                    node.style.transform = `translateY(${position}px)`;
                    node.style.height = height + "px";
                    prependNodes.appendChild(node);
                    addedNodes.push(node);
                }
            }
        }

        // Add nodes before new ending but after old ending.
        if(end > this.#endingIndex) {
            append = true;

            for(let i = Math.max(this.#endingIndex === null ? -1 : this.#endingIndex, start, 0); i < Math.min(end, this.#rows.getLength()); i++) {
                let node = this.#rows.getNode(i),
                    position = this.#rows.getNodePosition(i),
                    height = this.#rows.getNodeHeight(i);

                node.style.transform = `translateY(${position}px)`;
                node.style.height = height + "px";
                appendNodes.appendChild(node);
                addedNodes.push(node);
            }
        }

        this.#viewport.innerHeight = this.#rows.getHeight();

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

        if(this.onRenderNode) {
            for (let i = this.#startingIndex, l = this.#endingIndex; i < l; i++) {
                this.onRenderNode(this.#rows.getNode(i));
            }
        }
    }

    appendChild(element) {
        this.#rows.append(element);
    }

    getRow(index) {
        return this.#rows.getNode(index);
    }

    getLength() {
        return this.#rows.getLength();
    }

    // noinspection JSUnusedGlobalSymbols
    get startingIndex() {
        return this.#startingIndex;
    }

    // noinspection JSUnusedGlobalSymbols
    get endingIndex() {
        return this.#endingIndex;
    }

    get innerWidth() {
        return this.#viewport.innerWidth;
    }

    get innerHeight() {
        return this.#viewport.innerHeight;
    }

    set innerWidth(value) {
        this.#viewport.innerWidth = value;
    }

    set innerHeight(value) {
        this.#viewport.innerHeight = value;
    }

    get scrollLeft() {
        return this.#viewport.scrollLeft;
    }

    get scrollTop() {
        return this.#viewport.scrollTop;
    }

    set scrollLeft(value) {
        this.#viewport.scrollLeft = value;
        this.render();
    }

    set scrollTop(value) {
        this.#viewport.scrollTop = value;
        this.render();
    }
}


/**
 * @interface
 */
export class VirtualNodeListInterface {
    /**
     * Appends the node to the end of the list.
     * @abstract
     * @param node {Element}
     */
    append(node) {}

    /**
     * Returns the number of nodes in the list.
     * @abstract
     * @returns {Number}
     */
    getLength() {}

    /**
     * Returns the total height of all of the rows.
     * @abstract
     * @returns {Number}
     */
    getHeight() {}

    /**
     * Returns the node at the given index or null if outside of range.
     * @param index {Number}
     * @returns {Element|null}
     */
    getNode(index) {}

    /**
     * Returns the height of the node at the given index or null if outside of range.
     * @abstract
     * @param index {Number}
     * @returns {Number|null}
     */
    getNodeHeight(index) {}

    /**
     * Returns the starting position of the node at the given index or null if the index is outside of range.
     * @abstract
     * @param index {Number}
     * @returns {Number|null}
     */
    getNodePosition(index) {}

    /**
     * Returns the index of the node at the given position or -1 if it fall outside of range.
     * @param pos
     */
    getNodeIndexAtPosition(pos) {}
}


/**
 * @implements VirtualNodeListInterface
 */
export class VirtualNodeList {
    #rows;
    #rowHeight;

    #rowDetails;
    #height;

    constructor(rows, rowHeight) {
        if(rows) {
            this.#rows = rows;
        } else {
            this.#rows = [];
        }

        this.#rowHeight = rowHeight;
        this.#height = null;
        this.#rowDetails = null;
    }

    append(node) {
        this.#rows.push(node);
    }

    getLength() {
        return this.#rows.length;
    }

    getNode(index) {
        return this.#rows[index] || null;
    }

    getNodeHeight(index) {
        if(index < 0 || index >= this.getLength()) {
            return null;
        }

        if(typeof this.#rowHeight === "number") {
            return this.#rowHeight;
        } else {
            this.#computeRowDetails();
            return this.#rowDetails[index].height;
        }
    }

    getNodePosition(index) {
        if(index < 0 || index >= this.getLength()) {
            return null;
        }

        if(typeof this.#rowHeight === "number") {
            return index * this.#rowHeight;
        } else {
            this.#computeRowDetails();
            return this.#rowDetails[index].position;
        }
    }

    getNodeIndexAtPosition(position) {
        if(typeof this.#rowHeight === 'function') {
            this.#computeRowDetails();
            return VirtualNodeList.searchForRowIndex(this, position);
        } else {
            let index = Math.floor(position / this.#rowHeight);
            return index < 0 || index >= this.getLength() ? -1 : index;
        }
    }

    getHeight() {
        if(typeof this.#rowHeight === "number") {
            return this.#rowHeight * this.#rows.length;
        } else {
            this.#computeRowDetails();
            return this.#height;
        }
    }

    #computeRowDetails() {
        if(typeof this.#rowHeight !== 'function' || this.#rowDetails !== null) {
            return;
        }

        let details = VirtualNodeList.getComputedRowDetails(this.#rowHeight, this, this, 0, this.getLength());
        this.#rowDetails = details.details;
        this.#height = details.height;
    }

    static getComputedRowDetails(rowHeight, model, that, start, stop) {
        let details = [],
            position = 0;

        for(let i = start; i < stop; start++) {
            let height = rowHeight.call(that, model, i);

            details.push({
                height,
                position
            });

            position += height;
        }

        return {details, height: position};
    }

    static searchForRowIndex(virtualNodeList, pos) {
        let start = 0,
            end = virtualNodeList.getLength();

        while(start < end) {
            let index = Math.floor((end-start) / 2),
                rowPosition = virtualNodeList.getNodePosition(index),
                rowHeight = virtualNodeList.getNodeHeight(index),
                endPos = rowPosition + rowHeight;

            if(rowPosition <= pos && endPos >= pos) {
                return index;
            } else if(pos < rowPosition) {
                end = index - 1;
            } else if(pos > endPos) {
                start = index + 1;
            }
        }

        return -1;
    }
}