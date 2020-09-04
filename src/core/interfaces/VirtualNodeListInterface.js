

/**
 * @interface
 */
export class VirtualNodeListInterface {
    /**
     * Appends the node to the end of the list.
     * @abstract
     * @param node {Element}
     */
    append(node) {}

    /**
     * Returns the number of nodes in the list.
     * @abstract
     * @returns {Number}
     */
    getLength() {}

    /**
     * Returns the total height of all of the rows.
     * @abstract
     * @returns {Number}
     */
    getHeight() {}

    /**
     * Returns the node at the given index or null if outside of range.
     * @param index {Number}
     * @returns {Element|null}
     */
    getNode(index) {}

    /**
     * Returns the height of the node at the given index or null if outside of range.
     * @abstract
     * @param index {Number}
     * @returns {Number|null}
     */
    getNodeHeight(index) {}

    /**
     * Returns the starting position of the node at the given index or null if the index is outside of range.
     * @abstract
     * @param index {Number}
     * @returns {Number|null}
     */
    getNodePosition(index) {}

    /**
     * Returns the index of the node at the given position or -1 if it fall outside of range.
     * @param pos
     */
    getNodeIndexAtPosition(pos) {}
}