import Viewport from "core/ui/Viewport";
import {addClasses, randomChoice} from "core/utility";
import Slider, {Scrollbar} from "../../../../src/core/ui/Slider";


export default class ViewportsPage {
    load() {
        this.container = document.querySelector("#viewports-container");
        let viewport = new Viewport();

        let table = this.createTable(
            ["Column #1", "Column #2", "Column #3", "Column #4", "Column #5"],
            tableFactory1,
            50,
            "p-table fluid-width table-dark"
        );

        let tableHead = document.createElement("table");
        tableHead.className = "p-table fluid-width table-dark";
        tableHead.appendChild(table.querySelector("thead"));

        this.container.appendChild(tableHead);
        viewport.appendTo(this.container);
        viewport.appendChild(table);

        let scrollBarY = new Scrollbar({axis: "y", classes: "scrollbar-dark-green"});

        viewport.attachScrollBar(scrollBarY);

        viewport.element.appendChild(scrollBarY.element);

        viewport.render();

        window.viewport = viewport;
    }

    createTable(columns, factory, rows, classes=null) {
        let table = document.createElement("table"),
            thead = document.createElement("thead"),
            tbody = document.createElement("tbody"),
            columnRow = document.createElement("tr");

        table.appendChild(thead);
        table.appendChild(tbody);
        thead.appendChild(columnRow);

        if(classes) addClasses(table, classes);

        for(let column of columns) {
            let th = document.createElement("th");
            th.innerHTML = column
            columnRow.appendChild(th);
        }

        for(let i = 0; i < rows; i++) {
            let tr = document.createElement("tr");

            for(let column of columns) {
                let td = document.createElement("td");
                td.innerHTML = factory[column]();
                tr.appendChild(td);
            }

            tbody.appendChild(tr);
        }

        return table;
    }
}


const tableFactory1 = {
    i: 0,

    "Column #1": function() {
        return this.i++;
    },

    "Column #2": function() {
        return randomChoice(["Red", "Green", "Blue", "Orange", "Purple"]);
    },

    "Column #3": function() {
        return Math.round(Math.random()*1000);
    },

    "Column #4": function() {
        return Math.round(Math.random()*1000);
    },

    "Column #5": function() {
        return Math.round(Math.random()*1000);
    },
};