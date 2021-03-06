import "@babel/polyfill";
import Application from "app";
import "autoloader";
import "menu";

// noinspection JSUnresolvedVariable
__webpack_public_path__ = "/pendora/assets/js/";


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
    'doc_datagrid_dataheader': () => import("./pages/documentation/datagrid/page_dataheader"),
    'sliders_page': () => import("./pages/components/sliders"),
    'viewports_page': () => import("./pages/components/ViewportsPage"),
    'doc_datagrid': () => import("./pages/documentation/datagrid/page_datagrid"),
    'virtual_viewport': () => import("./pages/documentation/test_viewport"),
    'doc_paginator': () => import("./pages/documentation/datagrid/page_paginator"),
    'test_modal': () => import("./pages/documentation/test_modal"),
    'test_overlay': () => import("./pages/documentation/test_overlay"),
    'documentation_validation': () => import("./pages/documentation/test_validation"),
    'documentation_form_validation': () => import("./pages/documentation/form_validation"),
    'test_tooltip': () => import("./pages/documentation/test_toolip"),
    'test_notifications': () => import("./pages/documentation/test_notifications")
});


window.addEventListener('load', async () => {
    if(document.body.dataset.page) {
        await app.init(document.body.dataset.page);
    }
});


window.app = app;
