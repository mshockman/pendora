
import Application from 'app';
import AutoLoader from 'autoloader';
import "menus";
import "filters";
import {privateCache} from "core/data";


__webpack_public_path__ = "dist/";


let app = new Application({
    'test_menu': () => import("test_menu.js"),
    'test_resizeable': () => import("test_resizeable.js"),
    'test_overlay': () => import("test_overlay.js")
});


window.app = app;
window.privateCache = privateCache;
AutoLoader.load();