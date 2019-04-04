/**
 * Contains meta information for a grid column.
 */
export default class Column {
    constructor({name, label, width=100, resizeable=false, draggable=false, sortable=false, minWidth=0, maxWidth=null, freeze=false, ...options}) {
        this.name = name;
        this.label = label;
        this.freeze = freeze;

        this.width = width;

        this.grid = null;
        this.resizeable = resizeable;
        this.draggable = draggable;
        this.sortable = sortable;
        this.minWidth = minWidth;
        this.maxWidth = maxWidth;

        this.onRenderCell = null;
        this.onRenderHeader = null;
        this.onPostProcess = null;

        Object.assign(this, options);
    }

    onAdded(grid) {
        this.grid = grid;
    }

    onRemoved(grid) {
        this.grid = null;
    }

    cellRenderer(rowData) {
        let element = document.createElement('div'),
            textNode = document.createTextNode(rowData[this.name]);

        element.classList.add('c-grid__cell');
        element.appendChild(textNode);

        return element;
    }

    columnRenderer() {
        let element = document.createElement('div');
        element.classList.add('c-grid__header');
        element.innerHTML = this.label;
        return element;
    }

    setWidth(width) {
        if(width !== this.width) {
            this.width = width;

            if(this.grid) {
                this.grid.trigger('column-resize', {
                    target: this
                });
            }
        }
    }
}