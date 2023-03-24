"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const react_hook_form_1 = require("react-hook-form");
const TextInputField_1 = __importDefault(require("./form/TextInputField"));
const SignUpApi = __importStar(require("../network/user_api"));
const SignUpModal = ({ onHideSignUpModal, onSignUpSuccess, }) => {
    const { register, handleSubmit, formState: { errors, isSubmitting }, } = (0, react_hook_form_1.useForm)();
    const onSubmit = (0, react_1.useCallback)((credentials) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const newUser = yield SignUpApi.signUp(credentials);
            onSignUpSuccess(newUser);
        }
        catch (error) {
            alert(error);
            console.log(error);
        }
    }), [onSignUpSuccess]);
    return ((0, jsx_runtime_1.jsx)("div", Object.assign({ id: "signupModal", tabIndex: -1, "aria-hidden": "true", className: "fixed top-0 left-0 right-0 z-50 w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] md:h-full" }, { children: (0, jsx_runtime_1.jsx)("div", Object.assign({ className: "relative w-full h-full max-w-2xl m-auto md:h-auto" }, { children: (0, jsx_runtime_1.jsxs)("div", Object.assign({ className: "relative bg-white rounded-lg shadow" }, { children: [(0, jsx_runtime_1.jsxs)("div", Object.assign({ className: "flex items-start justify-between p-4 border-b rounded-t" }, { children: [(0, jsx_runtime_1.jsx)("h3", Object.assign({ className: "text-xl font-semibold text-gray-900" }, { children: "Register" })), (0, jsx_runtime_1.jsxs)("button", Object.assign({ type: "button", className: "text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center", "data-modal-hide": "defaultModal", onClick: onHideSignUpModal }, { children: [(0, jsx_runtime_1.jsx)("svg", Object.assign({ "aria-hidden": "true", className: "w-5 h-5", fill: "currentColor", viewBox: "0 0 20 20", xmlns: "http://www.w3.org/2000/svg" }, { children: (0, jsx_runtime_1.jsx)("path", { fillRule: "evenodd", d: "M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z", clipRule: "evenodd" }) })), (0, jsx_runtime_1.jsx)("span", Object.assign({ className: "sr-only" }, { children: "Close modal" }))] }))] })), (0, jsx_runtime_1.jsx)("div", Object.assign({ className: "w-full" }, { children: (0, jsx_runtime_1.jsxs)("form", Object.assign({ className: "bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4", id: "signupForm", onSubmit: handleSubmit(onSubmit) }, { children: [(0, jsx_runtime_1.jsx)("div", Object.assign({ className: "mb-4" }, { children: (0, jsx_runtime_1.jsx)(TextInputField_1.default, { name: "username", label: "Username", type: "text", placeholder: "Username", register: register, registerOptions: { required: "Required" }, error: errors.username }) })), (0, jsx_runtime_1.jsx)("div", Object.assign({ className: "mb-4" }, { children: (0, jsx_runtime_1.jsx)(TextInputField_1.default, { name: "email", label: "Email", type: "email", placeholder: "Email", register: register, registerOptions: { required: "Required" }, error: errors.email }) })), (0, jsx_runtime_1.jsx)("div", Object.assign({ className: "mb-4" }, { children: (0, jsx_runtime_1.jsx)(TextInputField_1.default, { name: "password", label: "Password", type: "password", placeholder: "Password", register: register, registerOptions: { required: "Required" }, error: errors.password }) })), (0, jsx_runtime_1.jsx)("div", Object.assign({ className: "flex items-center justify-between" }, { children: (0, jsx_runtime_1.jsx)("button", Object.assign({ className: "bg-black hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline", type: "submit", form: "signupForm", disabled: isSubmitting }, { children: "Sign Up" })) }))] })) }))] })) })) })));
};
exports.default = SignUpModal;
