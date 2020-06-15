import Publisher from "../core/Publisher";
import DataGridModelBase from "./DataGridModelBase";


export default class DataModel extends DataGridModelBase {
    #data;

    constructor(data) {
        super();
        this.#data = data;
    }

    getRow(rowIndex) {
        return this.#data[rowIndex];
    }

    getValue(rowIndex, key) {
        return this.getRow(rowIndex)[key];
    }

    setValue(rowIndex, key, value) {
        let originalValue = this.#data[rowIndex][key];

        if(originalValue !== value) {
            this.#data[rowIndex][key] = value;

            this.publish("data.change", {
                model: this,
                topic: "value.change",
                type: "cell",
                originalValue,
                rowIndex,
                key,
                value
            });
        }
    }

    setData(data) {
        if(data !== this.#data) {
            let originalData = this.#data;
            this.#data = data;

            this.publish("data.change", {
                model: this,
                topic: "data.change",
                type: "data",
                originalData,
                data
            });
        }
    }

    getLength() {
        return this.#data.length;
    }

    *[Symbol.iterator]() {
        for(let i = 0; i < this.#data.length; i++) {
            yield this.#data[i];
        }
    }
}
