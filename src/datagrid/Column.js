
export default class Column {
    constructor({name, label, width=100, resizeable=false, maxWidth=null, minWidth=null, id=null, style=null, classes=null, cellClasses=null, cellStyle=null, sortable=false, ...options}) {
        this.name = name;
        this.label = label;
        this.width = width;

        this.resizeable = resizeable;
        this.maxWidth = maxWidth;
        this.minWidth = minWidth;

        this.id = id;
        this.style = style;
        this.classes = classes;

        this.cellClasses = cellClasses;
        this.cellStyle = cellStyle;

        this.sortable = sortable;

        Object.assign(this, options);
    }

    /**
     * Called when the column is added to the grid.  Can be used to add additional event listeners.
     * @param grid
     */
    init(grid) {

    }

    /**
     * Called when the column is removed from the grid.  Used to remove placed event listeners.
     * @param grid
     */
    destroy(grid) {

    }

    /**
     * Returns the cell value for the passed row.
     * @param data
     * @return {*}
     */
    getCellValue(data) {
        return data[this.name];
    }

    setCellValue(data, value) {
        data[this.name] = value;
    }

    /**
     * Renders a cell for the (column, data) pair.  The column is used to retrieve the value of the cell from the
     * second parameter `data`.  Data is all of the data for the entire row.
     *
     * The first parameter is the cell who's contents need to be rendered.  The renderer function should render the
     * cells value into the `$cell` element or reject in entirely and return a new cell to be used.
     *
     * The renderer function must return a dom element.
     * @param $cell
     * @param data
     */
    cellRenderer($cell, data) {
        let cell = $cell[0];
        cell.innerHTML = this.getCellValue(data);
        if(this.cellClasses) cell.classList.add(this.cellClasses);
        return $cell;


        // $cell.html(this.getCellValue(data));
        //
        // if(this.cellClasses) $cell.addClass(this.cellClasses);
        // if(this.cellStyle) $cell.css(this.cellStyle);
        //
        // return $cell;
    }

    columnRenderer($column) {
        $column.html(this.label);
        return $column;
    }

    /**
     * Called after the cell has rendered async.  This can be used to process
     */
    postProcess() {

    }
}