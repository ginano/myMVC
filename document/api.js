YUI.add("yuidoc-meta", function(Y) {
   Y.YUIDoc = { meta: {
    "classes": [
        "commonjs.Module",
        "modules.mymvc.Controller",
        "modules.mymvc.MVC",
        "modules.mymvc.Model",
        "modules.mymvc.View",
        "window.define"
    ],
    "modules": [
        "modules_class",
        "modules_mymvc",
        "modules_mymvc_controllers",
        "modules_mymvc_model",
        "modules_mymvc_view",
        "window"
    ],
    "allModules": [
        {
            "displayName": "modules/class",
            "name": "modules_class",
            "description": "it is the constuctor of Class from the jdk.\nyou can use it to create a new class"
        },
        {
            "displayName": "modules/mymvc",
            "name": "modules_mymvc",
            "description": "it will return the Class of MVC."
        },
        {
            "displayName": "modules/mymvc/controllers",
            "name": "modules_mymvc_controllers",
            "description": "it will return the Controller  of MVC."
        },
        {
            "displayName": "modules/mymvc/model",
            "name": "modules_mymvc_model",
            "description": "it will return the Module  of MVC."
        },
        {
            "displayName": "modules/mymvc/view",
            "name": "modules_mymvc_view",
            "description": "it will return the View  of MVC."
        },
        {
            "displayName": "window",
            "name": "window",
            "description": "this is an visual Class reference to global scope of window.\nall the properties and functions belong to window or other code exposed to global scope will be classed to this module.\nand all the properties could be for the static class named window, such as window.define"
        }
    ]
} };
});