
import Application from 'app';
import AutoLoader from 'autoloader';
import "menus";
import "filters";
import {privateCache} from "core/data";
import Modal from 'ui/modal';
import Tabs from 'ui/tabs';


__webpack_public_path__ = "dist/";


let app = new Application({
    'test_menu': () => import("test_menu.js"),
    'test_resizeable': () => import("test_resizeable.js"),
    'test_overlay': () => import("test_overlay.js"),
    'test_modals': () => import("test_modals.js"),
    'test_tabs': () => import("test_tabs.js"),
    'test_animation': () => import("test_animation.js"),
    'test_positioner': () => import("test_positioner.js"),
    'test_colorpicker': () => import("test_colorpicker.js")
});


window.app = app;
window.privateCache = privateCache;
