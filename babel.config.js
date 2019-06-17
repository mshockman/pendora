module.exports = {
    "presets": ["@babel/preset-env"],
    "plugins": [
        ["@babel/plugin-proposal-decorators", {"decoratorsBeforeExport": true}],
        "@babel/plugin-proposal-class-properties",
        "@babel/plugin-proposal-function-bind",
        "@babel/plugin-proposal-export-default-from",
        "@babel/plugin-syntax-dynamic-import"
    ]
};