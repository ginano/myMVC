YUI.add("yuidoc-meta", function(Y) {
   Y.YUIDoc = { meta: {
    "classes": [
        "commonjs.Module",
        "commonjs.window",
        "modules.mymvc.MVC"
    ],
    "modules": [
        "modules_class",
        "modules_mvc"
    ],
    "allModules": [
        {
            "displayName": "modules/class",
            "name": "modules_class",
            "description": "it is the constuctor of Class from the jdk.\nyou can use it to create a new class"
        },
        {
            "displayName": "modules/mvc",
            "name": "modules_mvc",
            "description": "it will return the Class of MVC."
        }
    ]
} };
});