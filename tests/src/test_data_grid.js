import {DataSource, DataGridTable, DataGridHeader, Column, ResizeHelper} from '../../src/datagrid/';
import {randomChoice} from '../../src/core/utility';
import Viewport from '../../src/ui/viewport';
import $ from 'jquery';


const labels = [
    'shipping',
    'order',
    'food',
    'sales',
    'inventory',
    'tests'
];


const colors = [
    'red',
    'green',
    'blue',
    'orange',
    'purple',
    'black',
    'white',
    'teal',
    'pink',
    'yellow',
    'brown'
];


const status = [
    'error',
    'success',
    'warning',
    'open',
    'closed',
    'returned'
];


function buildRandomData(size) {
    let r = [];

    for(let i = 0; i < size; i++) {
        let cost = (Math.random()*1000),
            ratio = Math.random() + 1,
            price = cost * ratio,
            margin = price-cost;

        r.push({
            sku: `TEST_${i+1}`,
            id: (i+1),
            name: `Test Product ${i+1}`,
            status: randomChoice(status),
            color: randomChoice(colors),
            label: randomChoice(labels),
            price: price.toFixed(2),
            cost: cost.toFixed(2),
            margin: margin.toFixed(2),
            ratio: ratio.toFixed(2),
            percentage: (Math.random()*100).toFixed(2),
            mpn: `MPN_${i+1}`
        });
    }

    return r;
}


const columns = [
    new Column({name: 'id', label: "ID", resizeable: true, width: 100}),
    new Column({name: 'sku', label: "SKU", resizeable: true, width: 100}),
    new Column({name: 'name', label: "Name", resizeable: true, width: 100}),
    new Column({name: 'status', label: "Status", resizeable: true, width: 100}),
    new Column({name: 'color', label: "Color", resizeable: true, width: 100}),
    new Column({name: 'label', label: "Label", resizeable: true, width: 100}),
    new Column({name: 'price', label: "Price", resizeable: true, width: 100}),
    new Column({name: 'cost', label: "Cost", resizeable: true, width: 100}),
    new Column({name: 'margin', label: "Margin", resizeable: true, width: 100}),
    new Column({name: 'ratio', label: "Ratio", resizeable: true, width: 100}),
    new Column({name: 'percentage', label: "Percentage", resizeable: true, width: 100}),
    new Column({name: 'mpn', label: "MPN", resizeable: true, width: 100}),
];


let data = buildRandomData(500),
    source = new DataSource(data, columns, 100);


let table = new DataGridTable(source),
    header = new DataGridHeader(table, {resizeable: true}),
    tableViewport = new Viewport(),
    headerViewport = new Viewport(),
    resizeHelper = new ResizeHelper(header);

headerViewport.$element.addClass("c-datagrid__header");
tableViewport.$element.addClass("c-datagrid__body");

headerViewport.mirror(tableViewport);
headerViewport.append(header);
tableViewport.append(table);
headerViewport.appendTo("#test_output");
tableViewport.appendTo("#test_output");
resizeHelper.appendTo("#test_output");

window.table = table;
window.source = source;