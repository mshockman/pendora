import Paginator from "../../../../../src/datagrid/Paginator";


export default class PaginatorPage {
    constructor() {

    }

    load() {
        let paginator = Paginator.BuildUrlPaginator({pageNumberCount: 100});
        paginator.appendTo("#paginator-test1");
    }
}
