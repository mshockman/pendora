import VirtualViewport, {VirtualNodeList} from "../core/ui/VirtualViewport";


/**
 * @implements DataGridPluginInterface
 */
export default class DataGridView {
    #element;
    #viewport;
    #nodeList;

    #model;
    #preprocessRows;

    #cellEventHandler;

    #onRender;
    #onDataChange;

    constructor(model=null, {padding=500, preprocessRows=false}={}) {
        this.#element = document.createElement("div");
        this.#element.className = "data-grid-view";
        this.#viewport = new VirtualViewport(null, {overflow: padding, virtualizationEnabled: true});
        this.#viewport.appendTo(this.#element);
        this.#nodeList = null;
        this.#model = null;
        this.#preprocessRows = preprocessRows;

        this.#viewport.onRenderNode = (node) => {
            let row = this.#nodeList.getRowByElement(node);
            row.render();
        };

        if(model) {
            this.setModel(model);
        }

        this.#cellEventHandler = event => {
            let cell = this.#getTargetCell(event.target);

            if(cell && cell.onChange) {
                cell.onChange(event);
            }
        };

        this.#element.addEventListener("change", this.#cellEventHandler);

        this.#onRender = () => {
            this.render();
        };

        this.#onDataChange = () => {
            this.#viewport.scrollTop = 0;
            this.#nodeList = new DataGridRowList(this.#model, this.#preprocessRows);
            this.#viewport.setNodes(this.#nodeList);
        };
    }

    plugin(grid) {
        this.appendTo(grid.body);
        this.setModel(grid.model);
    }

    setModel(model) {
        this.#model = model;

        this.#model.on("data-change", this.#onDataChange);

        this.#model.on(['col-resize', 'column-change', 'refresh'], this.#onRender);

        this.#nodeList = new DataGridRowList(this.#model, this.#preprocessRows);
        this.#viewport.setNodes(this.#nodeList);
    }

    appendTo(selector) {
        if(typeof selector === 'string') {
            document.querySelector(selector).appendChild(this.element);
        } else if(selector.appendChild) {
            selector.appendChild(this.element);
        } else {
            selector.append(this.element);
        }
    }

    render() {
        this.#viewport.render();
    }

    #getTargetCell(target) {
        let row = this.#nodeList.getContainingRow(target);

        if(row) {
            return row.getTargetCell(target);
        }

        return null;
    }

    get element() {
        return this.#element;
    }

    get model() {
        return this.#model;
    }
}


/**
 * @implements VirtualNodeListInterface
 */
class DataGridRowList {
    #model;
    #rowMap;
    #elementToRowMap;
    #preprocessRows;

    // computed details
    #height;
    #rowDetails;

    constructor(model, preprocessRows=false) {
        this.#rowMap = new WeakMap();
        this.#elementToRowMap = new WeakMap();
        this.#height = null;
        this.#model = null;
        this.#rowDetails = null;
        this.#preprocessRows = preprocessRows;

        if(model) {
            this.setModel(model);
        }
    }

    setModel(model) {
        this.#rowMap = new WeakMap();
        this.#elementToRowMap = new WeakMap();
        this.#height = null;
        this.#rowDetails = null;
        this.#model = model;

        if(this.#preprocessRows) {
            for(let i = 0, l = this.#model.getRowLength(); i < l; i++) {
                this.getRow(i);
            }
        }
    }

    getRow(index) {
        let data = this.#model.getRow(index);

        if(!data) return null;

        let row = this.#rowMap.get(data);

        if(!row) {
            row = this.#model.rowFactory(this, this.#model, data, index);
            this.#rowMap.set(data, row);
            this.#elementToRowMap.set(row.element, row);
        }

        return row;
    }

    getRowByElement(element) {
        return this.#elementToRowMap.get(element);
    }

    getContainingRow(element) {
        while(element) {
            let r = this.getRowByElement(element);

            if(r) {
                return r;
            }

            element = element.parentElement;
        }

        return null;
    }

    append(node) {
        throw new Error("Does not support appending of nodes directly.");
    }

    getHeight() {
        let rowHeight = this.#model.getRowHeight();

        if(typeof rowHeight === "number") {
            return rowHeight * this.#model.getRowLength();
        } else {
            this.#computeRowDetails();
            return this.#height;
        }
    }

    getLength() {
        return this.#model.getRowLength();
    }

    getNode(index) {
        let row = this.getRow(index);
        return row ? row.element : null;
    }

    getNodeHeight(index) {
        if(index < 0 || index >= this.getLength()) {
            return null;
        }

        let rowHeight = this.#model.getRowHeight();

        if(typeof rowHeight === "number") {
            return rowHeight;
        } else {
            this.#computeRowDetails();
            return this.#rowDetails[index].height;
        }
    }

    getNodeIndexAtPosition(pos) {
        let rowHeight = this.#model.getRowHeight();

        if(typeof rowHeight === 'function') {
            this.#computeRowDetails();
            return VirtualNodeList.searchForRowIndex(this, pos);
        } else {
            let index = Math.floor(pos / rowHeight);
            return index < 0 || index >= this.getLength() ? -1 : index;
        }
    }

    getNodePosition(index) {
        if(index < 0 || index >= this.getLength()) {
            return null;
        }

        let rowHeight = this.#model.getRowHeight();

        if(typeof rowHeight === "number") {
            return index * rowHeight;
        } else {
            this.#computeRowDetails();
            return this.#rowDetails[index].position;
        }
    }

    #computeRowDetails() {
        let rowHeight = this.#model.getRowHeight();

        if(typeof rowHeight !== 'function' || this.#rowDetails !== null) {
            return;
        }

        let details = VirtualNodeList.getComputedRowDetails(rowHeight, this.#model, this.#model, 0, this.#model.getRowLength());
        this.#height = details.height;
        this.#rowDetails = details.details;
    }
}