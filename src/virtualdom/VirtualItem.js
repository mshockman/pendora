import VirtualNodeBase from "./VirtualNodeBase";


export default class VirtualItem extends VirtualNodeBase {
    constructor() {
        super(document.createElement("div"));
    }
}