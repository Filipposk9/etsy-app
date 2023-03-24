"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteNote = exports.updateNote = exports.createNote = exports.fetchNotes = void 0;
const fetchData_1 = require("../utils/fetchData");
function fetchNotes() {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield (0, fetchData_1.fetchData)("/api/notes", {
            method: "GET",
        });
        return yield response.json();
    });
}
exports.fetchNotes = fetchNotes;
function createNote(note) {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield (0, fetchData_1.fetchData)("/api/notes", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(note),
        });
        return response.json();
    });
}
exports.createNote = createNote;
const updateNote = (noteId, note) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield (0, fetchData_1.fetchData)(`/api/notes/${noteId}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(note),
    });
    return response.json();
});
exports.updateNote = updateNote;
const deleteNote = (noteId) => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, fetchData_1.fetchData)(`/api/notes/${noteId}`, {
        method: "DELETE",
    });
});
exports.deleteNote = deleteNote;
