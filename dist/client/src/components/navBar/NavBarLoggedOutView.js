"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const NavBarLoggedOutView = ({ onSignUpClick, onLoginClick, }) => {
    return ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)("button", Object.assign({ className: "w-20 bg-gray-900 text-white rounded-md px-3 py-2 text-sm font-medium", onClick: onSignUpClick }, { children: "Sign Up" })), (0, jsx_runtime_1.jsx)("button", Object.assign({ className: "w-20 bg-gray-900 text-white rounded-md px-3 py-2 ml-2 text-sm font-medium", onClick: onLoginClick }, { children: "Log In" }))] }));
};
exports.default = NavBarLoggedOutView;
