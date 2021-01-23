

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
        this.parent = null;

        if(node) this.setNode(node);
    }

    setNode(node) {
        this.node = node;

        if(!this.name) {
            this.name = this.node.name;
        }
    }

    getPath() {
        let r = [],
            o = this;

        while(o) {
            if(o instanceof ValidationErrorList && o.name != null) {
                r.push(o.name);
            }

            o = o.parent;
        }

        r.reverse();
        return r.join('.');
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
                if(error.name == null) {
                    error.name = this.name;
                }

                if(error.index == null) {
                    error.index = this.index;
                }

                error.parent = this;
                this.children.push(error);
            }
        } else if(this.node.hasChildNode(error.node)) {
            let childErrorNode = this.get(error.node);

            if(!childErrorNode) {
                childErrorNode = new ValidationErrorList(error.node, error.name, error.index);
                childErrorNode.parent = this;
                this.children.push(childErrorNode);
            }

            childErrorNode.addError(error);
        }
    }

    getInvalidNodes() {
        let r = [];

        for(let child of this.children) {
            if(child.getInvalidNodes) {
                r = r.concat(child.getInvalidNodes());
            } else {
                r.push(child);
            }
        }

        return r;
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
