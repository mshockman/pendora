import "@babel/polyfill";
import Application from "app";
import "autoloader";
import "menu";

__webpack_public_path__ = "/assets/js/";


let app = new Application({
    // 'menubar': () =>  import("./pages/menubar_example.js"),
    // 'menu_examples': () =>  import("./pages/menu_examples.js"),
    'menu_page_index': () =>  import("./pages/menus/page_index"),
    'documentation_dropdown': () => import("./pages/documentation/dropdown"),
    'test_draggable': () => import("./pages/documentation/test_draggable"),
    'test_sortable': () => import("./pages/documentation/test_sortable"),
    'test_resizeable': () => import("./pages/documentation/test_resizeable"),
    'test_animation': () => import("./pages/documentation/test_animation"),
    'test_positioning': () => import("./pages/documentation/test_positioning"),
});


window.addEventListener('load', async () => {
    if(document.body.dataset.page) {
        await app.init(document.body.dataset.page);
    }
});


window.app = app;
