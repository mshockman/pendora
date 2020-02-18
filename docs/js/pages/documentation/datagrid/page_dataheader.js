import DataHeader from "datagrid/DataHeader";


export default class DataHeaderPage {
    load() {
        let header = new DataHeader();

        header.appendTo('.content-area');

        header.addColumn({label: "Column #1"});
        header.addColumn({label: "Column #2"});
        header.addColumn({label: "Column #3"});
        header.addColumn({label: "Column #4"});
        header.addColumn({label: "Column #5"});

        header.refresh();
    }
}
