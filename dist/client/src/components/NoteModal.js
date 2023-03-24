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
const NotesApi = __importStar(require("../network/notes_api"));
const NoteModal = ({ noteToEdit, onHideNoteModal, onNoteSave, }) => {
    var _a, _b;
    const { register, handleSubmit, formState: { errors, isSubmitting }, } = (0, react_hook_form_1.useForm)({
        defaultValues: {
            title: (noteToEdit === null || noteToEdit === void 0 ? void 0 : noteToEdit.title) || "",
            text: (noteToEdit === null || noteToEdit === void 0 ? void 0 : noteToEdit.text) || "",
        },
    });
    const onSubmit = (0, react_1.useCallback)((input) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            let noteResponse;
            if (noteToEdit) {
                noteResponse = yield NotesApi.updateNote(noteToEdit._id, input);
            }
            else {
                noteResponse = yield NotesApi.createNote(input);
            }
            onNoteSave(noteResponse);
        }
        catch (error) {
            console.log(error);
        }
    }), [noteToEdit, onNoteSave]);
    return ((0, jsx_runtime_1.jsx)("div", Object.assign({ id: "noteModal", tabIndex: -1, "aria-hidden": "true", className: "fixed top-0 left-0 right-0 z-50 w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] md:h-full" }, { children: (0, jsx_runtime_1.jsx)("div", Object.assign({ className: "relative w-full h-full max-w-2xl m-auto md:h-auto" }, { children: (0, jsx_runtime_1.jsxs)("div", Object.assign({ className: "relative bg-white rounded-lg shadow" }, { children: [(0, jsx_runtime_1.jsxs)("div", Object.assign({ className: "flex items-start justify-between p-4 border-b rounded-t" }, { children: [(0, jsx_runtime_1.jsx)("h3", Object.assign({ className: "text-xl font-semibold text-gray-900" }, { children: noteToEdit ? "Edit note" : "Add note" })), (0, jsx_runtime_1.jsxs)("button", Object.assign({ type: "button", className: "text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center", "data-modal-hide": "defaultModal", onClick: onHideNoteModal }, { children: [(0, jsx_runtime_1.jsx)("svg", Object.assign({ "aria-hidden": "true", className: "w-5 h-5", fill: "currentColor", viewBox: "0 0 20 20", xmlns: "http://www.w3.org/2000/svg" }, { children: (0, jsx_runtime_1.jsx)("path", { fillRule: "evenodd", d: "M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z", clipRule: "evenodd" }) })), (0, jsx_runtime_1.jsx)("span", Object.assign({ className: "sr-only" }, { children: "Close modal" }))] }))] })), (0, jsx_runtime_1.jsx)("div", Object.assign({ className: "w-full" }, { children: (0, jsx_runtime_1.jsxs)("form", Object.assign({ className: "bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4", id: "addEditNoteForm", onSubmit: handleSubmit(onSubmit) }, { children: [(0, jsx_runtime_1.jsx)("div", Object.assign({ className: "mb-4" }, { children: (0, jsx_runtime_1.jsx)(TextInputField_1.default, { name: "title", label: "Title", type: "text", placeholder: "Title", register: register, registerOptions: { required: "Required" }, error: errors.title }) })), (0, jsx_runtime_1.jsxs)("div", Object.assign({ className: "mb-6" }, { children: [(0, jsx_runtime_1.jsx)("label", Object.assign({ className: "block text-gray-700 text-sm font-bold mb-2", htmlFor: "text" }, { children: "Text" })), (0, jsx_runtime_1.jsx)("textarea", Object.assign({ className: "shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline", id: "text", placeholder: "Text", rows: 3 }, register("text"))), ((_a = errors.text) === null || _a === void 0 ? void 0 : _a.message) ? ((0, jsx_runtime_1.jsx)("p", Object.assign({ className: "text-red-600" }, { children: (_b = errors.text) === null || _b === void 0 ? void 0 : _b.message }))) : null] })), (0, jsx_runtime_1.jsx)("div", Object.assign({ className: "flex items-center justify-between" }, { children: (0, jsx_runtime_1.jsx)("button", Object.assign({ className: "bg-black hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline", type: "submit", form: "addEditNoteForm", disabled: isSubmitting }, { children: noteToEdit ? "Edit note" : "Add note" })) }))] })) }))] })) })) })));
};
exports.default = NoteModal;
