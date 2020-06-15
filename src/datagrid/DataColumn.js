

export default class DataColumn {
    constructor({key, label, width=null, minWidth=0, maxWidth=Infinity, resizeable=false, tableSort=false, tableSortValue="none", sortable=false, cellRenderer=null, columnRenderer=null, columnClasses=null, cellClasses=null, columnId=null, ...options}={}) {
        this.key = key;
        this.label = label;

        this.resizeable = resizeable;
        this.width = width;
        this.minWidth = minWidth;
        this.maxWidth = maxWidth;

        this.tableSort = tableSort;
        this.tableSortValue = tableSortValue;

        this.sortable = sortable;

        this.cellRenderer = cellRenderer;
        this.columnRenderer = columnRenderer;

        this.columnClasses = columnClasses;
        this.cellClasses = cellClasses;
        this.columnId = columnId;

        Object.assign(this, options);
    }
}
