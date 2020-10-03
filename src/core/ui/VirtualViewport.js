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

    #offset;
    #precision;
    #virtualizationEnabled;

    #rowDetails;

    #startingIndex;
    #endingIndex;

    #renderId;
    #renderer;

    /**
     * @type {null|function}
     */
    onRenderNode = null;

    constructor(nodeList, {offset=500, virtualizationEnabled=true, onRenderNode, renderer=addAndRemoveRenderFunction, precision=1}={}) {
        super(document.createElement("div"));
        this.addClass("virtual-viewport");

        this.#viewport = new Viewport();
        this.#viewport.element.classList.add('virtual-viewport');
        this.#viewport.appendTo(this.element);
        this.#rows = nodeList;
        this.#rowDetails = null;
        this.#offset = offset;
        this.#precision = precision;
        this.#virtualizationEnabled = virtualizationEnabled;

        this.#startingIndex = null;
        this.#endingIndex = null;
        this.#renderId = null;

        this.onRenderNode = onRenderNode;
        this.#renderer = renderer;

        this.#viewport.on("scroll", topic => {
            this.render();

            this.publish("scroll", {
                ...topic,
                viewport: this
            });
        });
    }

    setNodes(nodeList) {
        this.#startingIndex = null;
        this.#endingIndex = null;
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
        let startPos = Math.floor(((this.#viewport.scrollTop - this.#offset) / this.#precision)) * this.#precision,
            endPos = Math.ceil(((this.#viewport.scrollTop + this.#viewport.offsetHeight + this.#offset) / this.#precision)) * this.#precision;

        let start = this.#rows.getNodeIndexAtPosition(startPos),
            end = this.#rows.getNodeIndexAtPosition(endPos),
            rowLength = this.#rows.getLength();

        if(start === -1 && end === -1) {
            start = 0;
            end = rowLength;
        } else {
            if(start >= 0 && end === -1) {
                end = rowLength;
            }

            if(end >= 0 && start === -1) {
                start = 0;
            }
        }

        console.log({start, end, startingIndex: this.#startingIndex, endingIndex: this.#endingIndex});

        if(start >= end) {
            this.#viewport.emptyViewport();
            this.#startingIndex = 0;
            this.#endingIndex = 0;
            return;
        }

        start = Math.max(0, start);
        end = Math.min(end, rowLength);

        if(start === this.#startingIndex && end === this.#endingIndex) {
            this.#refreshRows();
            return;
        }

        this.#renderer(this.#viewport, this.#startingIndex, this.#endingIndex, this.#rows, start, end);

        this.#viewport.innerHeight = this.#rows.getHeight();
        this.#startingIndex = start;
        this.#endingIndex = end;

        this.#refreshRows();
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

    #refreshRows() {
        if(this.onRenderNode) {
            for (let i = this.#startingIndex, l = this.#endingIndex; i < l; i++) {
                this.onRenderNode(this.#rows.getNode(i));
            }
        }
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

    get rows() {
        return this.#rows;
    }

    get viewport() {
        return this.#viewport;
    }
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
            end = virtualNodeList.getLength(),
            index = -1;

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

        return index;
    }
}


/**
 *
 * @param viewport {Viewport}
 * @param startingIndex {Number}
 * @param endingIndex {Number}
 * @param nodeList {VirtualNodeListInterface}
 * @param start {Number}
 * @param end {Number}
 */
export function addAndRemoveRenderFunction(viewport, startingIndex, endingIndex, nodeList, start, end) {
    let prependNodes = document.createDocumentFragment(),
        appendNodes = document.createDocumentFragment(),
        prepend = false,
        append = false,
        rowLength = nodeList.getLength();

    if(startingIndex !== null) {
        // Remove nodes before new starting
        if (startingIndex < start) {
            for (let i = startingIndex, l = Math.min(endingIndex, start); i < l; i++) {
                let node = nodeList.getNode(i);

                try {
                    viewport.removeChild(node);
                } catch(e) {}
            }
        }

        // Remove Nodes after new ending
        if (endingIndex > end) {
            for (let i = Math.max(end, startingIndex), l = endingIndex; i < l; i++) {
                let node = nodeList.getNode(i);

                try {
                    viewport.removeChild(node);
                } catch(e) {}
            }
        }

        // Add nodes after new starting but before old starting.
        if (start < startingIndex) {
            prepend = true;

            for (let i = Math.max(start, 0), l = Math.min(end, startingIndex, rowLength); i < l; i++) {
                let node = nodeList.getNode(i),
                    position = nodeList.getNodePosition(i),
                    height = nodeList.getNodeHeight(i);

                node.style.transform = `translateY(${position}px)`;
                node.style.height = height + "px";
                prependNodes.appendChild(node);
            }
        }
    }

    // Add nodes before new ending but after old ending.
    if(end > endingIndex) {
        append = true;

        for(let i = Math.max(endingIndex === null ? -1 : endingIndex, start, 0); i < Math.min(end, rowLength); i++) {
            let node = nodeList.getNode(i),
                position = nodeList.getNodePosition(i),
                height = nodeList.getNodeHeight(i);

            node.style.transform = `translateY(${position}px)`;
            node.style.height = height + "px";
            appendNodes.appendChild(node);
        }
    }

    if(prepend) {
        viewport.prependChild(prependNodes);
    }

    if(append) {
        viewport.appendChild(appendNodes);
    }
}


/**
 *
 * @param viewport {Viewport}
 * @param startingIndex {Number}
 * @param endingIndex {Number}
 * @param rows {VirtualNodeListInterface}
 * @param start {Number}
 * @param end {Number}
 */
export function simpleRenderFunction(viewport, startingIndex, endingIndex, rows, start, end) {
    viewport.emptyViewport();

    if(end > start) {
        let fragment = document.createDocumentFragment();

        for (let i = start; i < end; i++) {
            let node = rows.getNode(i),
                position = rows.getNodePosition(i),
                height = rows.getNodeHeight(i);

            node.style.transform = `translateY(${position}px)`;
            node.style.height = height + "px";
            fragment.appendChild(node);
        }

        viewport.appendChild(fragment);
    }
}