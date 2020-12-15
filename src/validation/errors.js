import {ExtendableError} from "../core/errors";


export class InvalidErrorBase {
    /**
     *
     * @param node {SchemaNode|null}
     * @param name {String|Number|null}
     * @param index {Number|null}
     */
    constructor(node=null, name=null, index=null) {
        this.node = node;
        this.name = name;
        this.index = index;

        if(node) this.setNode(node);
    }

    setNode(node) {
        this.node = node;

        if(!this.name) {
            this.name = this.node.name;
        }
    }
}


export class ValidationErrorList extends InvalidErrorBase {
    constructor(node, name=null, index=null) {
        super(node, name, index);
        this.children = [];
        this.pstruct = null;
        this.cstruct = null;
    }

    addError(error) {
        if(error instanceof ValidationErrorList) {
            for(let child of error.children) {
                this.addError(child);
            }
        } else if(error.node === this.node) {
            if(this.children.indexOf(error) === -1) {
                this.children.push(error);
            }
        } else if(this.node.hasChildNode(error.node)) {
            let childErrorNode = this.get(error.node);

            if(!childErrorNode) {
                childErrorNode = new ValidationErrorList(error.node, error.name);
                this.children.push(childErrorNode);
            }

            childErrorNode.addError(error);
        }
    }

    get(node) {
        for(let child of this.children) {
            if(child === node || child.name === node) {
                return child;
            }
        }

        return null;
    }

    get length() {
        return this.children.length;
    }
}


export class InvalidNode extends InvalidErrorBase {
    constructor(node, message, name=null, index=null) {
        super(node, name, index);
        this.message = message;
    }
}


export class SetValueSerializationError {
    constructor(value) {
        this.value = value;
    }
}
