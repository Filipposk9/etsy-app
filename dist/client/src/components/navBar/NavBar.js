"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const classnames_1 = __importDefault(require("classnames"));
const NavBarLoggedInView_1 = __importDefault(require("./NavBarLoggedInView"));
const NavBarLoggedOutView_1 = __importDefault(require("./NavBarLoggedOutView"));
const NavBar = ({ loggedInUser, onSignUpClick, onLoginClick, onLogoutSuccess, }) => {
    const [isNavbarOpen, setIsNavbarOpen] = (0, react_1.useState)(false);
    const handleNavbarOpenClick = () => {
        setIsNavbarOpen(!isNavbarOpen);
    };
    return ((0, jsx_runtime_1.jsxs)("nav", Object.assign({ className: "bg-gray-800" }, { children: [(0, jsx_runtime_1.jsx)("div", Object.assign({ className: "mx-auto max-w-7xl px-2 sm:px-6 lg:px-8" }, { children: (0, jsx_runtime_1.jsxs)("div", Object.assign({ className: "relative flex h-16 items-center justify-between" }, { children: [(0, jsx_runtime_1.jsx)("div", Object.assign({ className: "absolute inset-y-0 left-0 flex items-center sm:hidden" }, { children: (0, jsx_runtime_1.jsxs)("button", Object.assign({ type: "button", className: "inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white", "aria-controls": "mobile-menu", "aria-expanded": "false", onClick: handleNavbarOpenClick }, { children: [(0, jsx_runtime_1.jsx)("span", Object.assign({ className: "sr-only" }, { children: "Open main menu" })), (0, jsx_runtime_1.jsx)("svg", Object.assign({ className: "block h-6 w-6", fill: "none", viewBox: "0 0 24 24", strokeWidth: "1.5", stroke: "currentColor", "aria-hidden": "true" }, { children: (0, jsx_runtime_1.jsx)("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" }) })), (0, jsx_runtime_1.jsx)("svg", Object.assign({ className: "hidden h-6 w-6", fill: "none", viewBox: "0 0 24 24", strokeWidth: "1.5", stroke: "currentColor", "aria-hidden": "true" }, { children: (0, jsx_runtime_1.jsx)("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "M6 18L18 6M6 6l12 12" }) }))] })) })), (0, jsx_runtime_1.jsx)("div", Object.assign({ className: "flex flex-1 items-center justify-center sm:items-stretch sm:justify-start" }, { children: (0, jsx_runtime_1.jsx)("div", Object.assign({ className: "hidden sm:ml-6 sm:block" }, { children: (0, jsx_runtime_1.jsxs)("div", Object.assign({ className: "flex space-x-4" }, { children: [(0, jsx_runtime_1.jsx)("a", Object.assign({ href: "client/src/components#", className: "bg-gray-900 text-white rounded-md px-3 py-2 text-sm font-medium", "aria-current": "page" }, { children: "Dashboard" })), (0, jsx_runtime_1.jsx)("a", Object.assign({ href: "client/src/components#", className: "text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium" }, { children: "Team" })), (0, jsx_runtime_1.jsx)("a", Object.assign({ href: "client/src/components#", className: "text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium" }, { children: "Projects" })), (0, jsx_runtime_1.jsx)("a", Object.assign({ href: "client/src/components#", className: "text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium" }, { children: "Calendar" }))] })) })) })), (0, jsx_runtime_1.jsx)("div", Object.assign({ className: "absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0" }, { children: loggedInUser ? ((0, jsx_runtime_1.jsx)(NavBarLoggedInView_1.default, { user: loggedInUser, onLogoutSuccess: onLogoutSuccess })) : ((0, jsx_runtime_1.jsx)(NavBarLoggedOutView_1.default, { onSignUpClick: onSignUpClick, onLoginClick: onLoginClick })) }))] })) })), (0, jsx_runtime_1.jsx)("div", Object.assign({ className: (0, classnames_1.default)("sm:hidden", { hidden: !isNavbarOpen }), id: "mobile-menu" }, { children: (0, jsx_runtime_1.jsxs)("div", Object.assign({ className: "space-y-1 px-2 pt-2 pb-3" }, { children: [(0, jsx_runtime_1.jsx)("a", Object.assign({ href: "client/src/components#", className: "bg-gray-900 text-white block rounded-md px-3 py-2 text-base font-medium", "aria-current": "page" }, { children: "Dashboard" })), (0, jsx_runtime_1.jsx)("a", Object.assign({ href: "client/src/components#", className: "text-gray-300 hover:bg-gray-700 hover:text-white block rounded-md px-3 py-2 text-base font-medium" }, { children: "Team" })), (0, jsx_runtime_1.jsx)("a", Object.assign({ href: "client/src/components#", className: "text-gray-300 hover:bg-gray-700 hover:text-white block rounded-md px-3 py-2 text-base font-medium" }, { children: "Projects" })), (0, jsx_runtime_1.jsx)("a", Object.assign({ href: "client/src/components#", className: "text-gray-300 hover:bg-gray-700 hover:text-white block rounded-md px-3 py-2 text-base font-medium" }, { children: "Calendar" }))] })) }))] })));
};
exports.default = NavBar;