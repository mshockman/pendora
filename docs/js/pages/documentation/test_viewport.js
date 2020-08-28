import VirtualViewport, {VirtualNodeList} from "../../../../src/core/ui/VirtualViewport";


export default class TestViewportPage {
    constructor() {

    }

    load() {
        let vp1 = document.querySelector("#vp1"),
            list = new VirtualNodeList(null, 50),
            v = new VirtualViewport(list);

        window.v = v;

        v.id = "test-vp1";
        v.appendTo(vp1);

        for(let i = 0; i < 10000; i++) {
            let row = document.createElement("div");
            row.id = `row-${i}`;
            row.className = "virtual-row";
            row.innerHTML = `Row ${i}`;

            if(i % 2 === 0) {
                row.classList.add("even");
            }

            list.append(row);
        }

        window.nodeList = list;
        v.render();
    }
}