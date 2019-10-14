import {privateCache} from "core/data";


export function getMenuInstance(element) {
    return privateCache.get(element, 'menunode');
}


export function setMenuInstance(element, instance) {
    privateCache.set(element, 'menunode', instance);
}


export function isMenuNode(node) {

}


export function isMenuItem(node) {

}


export function isMenu(node) {

}
