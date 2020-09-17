
/**
 * @interface
 */
export class DataColumnInterface {
    get key() {};
    get label() {};
    get resizeable() {};
    get width() {};
    set width(value) {};
    get minWidth() {};
    get maxWidth() {};
    get tableSort() {};
    get tableSortValue() {};
    get sortable() {};
    get columnClasses() {};
    get cellClasses() {};
    get columnId() {};

    get model() {};

    columnFactory(header, model) {};
    cellFactory(row, data, model) {};
}
