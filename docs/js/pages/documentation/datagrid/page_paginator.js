import Paginator from "../../../../../src/datagrid/Paginator";


export default class PaginatorPage {
    constructor() {

    }

    load() {
        let paginator = new Paginator();
        paginator.setPageCount(10);
        paginator.appendTo("#paginator-test1");
    }
}
