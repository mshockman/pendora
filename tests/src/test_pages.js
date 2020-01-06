
import Application from 'app';
import AutoLoader from 'autoloader';

import {privateCache} from "core/data";
import Modal from 'ui/modal';
import Tabs from 'ui/tabs';


__webpack_public_path__ = "dist/";


let app = new Application({
    'test_resizeable': () => import("test_resizeable.js"),
    'test_overlay': () => import("test_overlay.js"),
    'test_animation': () => import("test_animation.js"),
    'test_positioner': () => import("test_positioner.js")
});


window.app = app;
window.privateCache = privateCache;
