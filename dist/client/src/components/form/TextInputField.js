"use strict";
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const TextInputField = (_a) => {
    var { name, label, register, registerOptions, error } = _a, props = __rest(_a, ["name", "label", "register", "registerOptions", "error"]);
    return ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)("label", Object.assign({ className: "block text-gray-700 text-sm font-bold mb-2", htmlFor: label }, { children: label })), (0, jsx_runtime_1.jsx)("input", Object.assign({}, props, { className: "shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline", id: name }, register(name, registerOptions))), error ? (0, jsx_runtime_1.jsx)("p", Object.assign({ className: "text-red-600" }, { children: error.message })) : null] }));
};
exports.default = TextInputField;
