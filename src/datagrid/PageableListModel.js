import DataModel from "./DataModel";
import {clamp} from "../core/utility";


/**
 * @implements DataModelInterface
 * @implements PageableInterface
 * @implements PublisherInterface
 */
export default class PageableListModel extends DataModel {
    #data;
    #pageSize;
    #page;

    constructor(columns, data, rowHeight, pageSize) {
        super(columns, null, rowHeight);

        this.#page = 1;
        this.#pageSize = pageSize;

        if(data) {
            this.setData(data);
        }
    }

    getCount() {
        return this.#data.length;
    }

    getPageCount() {
        return Math.ceil(this.getCount() / this.getPageSize());
    }

    getPageNumber() {
        return this.#page;
    }

    getPageSize() {
        return this.#pageSize;
    }

    setPageNumber(number) {
        this.#page = number;
        super.setData(this.#data.slice((this.#page-1)*this.#pageSize, ((this.#page-1)*this.#pageSize)+this.#pageSize));
        this.publish("page");
    }

    setPageSize(size) {
        this.#pageSize = size;
        this.#page = clamp(this.#page, 1, this.getPageCount());
        super.setData(this.#data.slice((this.#page-1)*this.#pageSize, ((this.#page-1)*this.#pageSize)+this.#pageSize));
        this.publish("page");
    }

    setData(data) {
        this.#data = data;
        super.setData(this.#data.slice((this.#page-1)*this.#pageSize, ((this.#page-1)*this.#pageSize)+this.#pageSize));
        this.publish("page");
    }

    getAllData() {
        return this.#data;
    }
}
