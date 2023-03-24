"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const formatDate_1 = require("../utils/formatDate");
const md_1 = require("react-icons/md");
const react_1 = require("react");
const Note = ({ note, onNoteClicked, onDeleteNoteClicked, }) => {
    const handleDeleteNote = (0, react_1.useCallback)((e) => {
        e.stopPropagation();
        onDeleteNoteClicked(note);
    }, [note, onDeleteNoteClicked]);
    const handleNoteClicked = (0, react_1.useCallback)(() => {
        onNoteClicked(note);
    }, [note, onNoteClicked]);
    return ((0, jsx_runtime_1.jsxs)("div", Object.assign({ className: "flex flex-col justify-around w-full max-w-sm h-60 p-4 bg-white border border-gray-200 rounded-lg shadow cursor-pointer hover:bg-gray-100", onClick: handleNoteClicked }, { children: [(0, jsx_runtime_1.jsxs)("div", Object.assign({ className: "flex justify-between items-center" }, { children: [(0, jsx_runtime_1.jsx)("h5", Object.assign({ className: "mb-2 text-2xl font-bold tracking-tight text-gray-900 " }, { children: note.title })), (0, jsx_runtime_1.jsx)(md_1.MdDelete, { className: "cursor-pointer", onClick: handleDeleteNote })] })), (0, jsx_runtime_1.jsx)("p", Object.assign({ className: "font-normal text-gray-700 h-4/6 gradient-mask-b-70" }, { children: note.text })), (0, jsx_runtime_1.jsx)("p", Object.assign({ className: "font-light text-gray-700 mt-2" }, { children: `Created: ${(0, formatDate_1.formatDate)(note.createdAt)}` }))] })));
};
exports.default = Note;
