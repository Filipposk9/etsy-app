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
const Note_1 = __importDefault(require("./components/Note"));
const NoteModal_1 = __importDefault(require("./components/NoteModal"));
const Spinner_1 = __importDefault(require("./components/Spinner"));
const SignUpModal_1 = __importDefault(require("./components/SignUpModal"));
const NavBar_1 = __importDefault(require("./components/navBar/NavBar"));
const NotesApi = __importStar(require("./network/notes_api"));
const UsersApi = __importStar(require("./network/user_api"));
const LoginModal_1 = __importDefault(require("./components/LoginModal"));
function App() {
    const [loggedInUser, setLoggedInUser] = (0, react_1.useState)(null);
    const [showSignUpModal, setShowSignUpModal] = (0, react_1.useState)(false);
    const [showLogInModal, setShowLogInModal] = (0, react_1.useState)(false);
    const [notes, setNotes] = (0, react_1.useState)([]);
    const [notesLoading, setNotesLoading] = (0, react_1.useState)(true);
    const [showNotesLoadingError, setShowNotesLoadingError] = (0, react_1.useState)(false);
    const [showAddNoteModal, setShowAddNoteModal] = (0, react_1.useState)(false);
    const [noteToEdit, setNoteToEdit] = (0, react_1.useState)(null);
    (0, react_1.useEffect)(() => {
        function fetchLoggedInUser() {
            return __awaiter(this, void 0, void 0, function* () {
                try {
                    const user = yield UsersApi.getLoggedInUser();
                    setLoggedInUser(user);
                }
                catch (error) {
                    console.log(error);
                }
            });
        }
        fetchLoggedInUser();
    }, []);
    (0, react_1.useEffect)(() => {
        function loadNotes() {
            return __awaiter(this, void 0, void 0, function* () {
                try {
                    setShowNotesLoadingError(false);
                    setNotesLoading(true);
                    const notes = yield NotesApi.fetchNotes();
                    setNotes(notes);
                }
                catch (error) {
                    console.error(error);
                    setShowNotesLoadingError(true);
                }
                finally {
                    setNotesLoading(false);
                }
            });
        }
        loadNotes();
    }, []);
    const handleAddNoteClick = () => {
        setShowAddNoteModal(true);
    };
    const handleHideAddNoteModal = () => {
        setShowAddNoteModal(false);
        setNoteToEdit(null);
    };
    const handleNoteSaved = (0, react_1.useCallback)((note) => {
        setNotes([...notes, note]);
        setShowAddNoteModal(false);
    }, [notes]);
    const handleNoteUpdate = (0, react_1.useCallback)((note) => {
        setNotes(notes.map((n) => (n._id === note._id ? note : n)));
        setNoteToEdit(null);
        setShowAddNoteModal(false);
    }, [notes]);
    const handleNoteDelete = (0, react_1.useCallback)((note) => __awaiter(this, void 0, void 0, function* () {
        try {
            yield NotesApi.deleteNote(note._id);
            setNotes(notes.filter((n) => n._id !== note._id));
        }
        catch (error) {
            console.log(error);
            alert(error);
        }
    }), [notes]);
    return ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)(NavBar_1.default, { loggedInUser: loggedInUser, onSignUpClick: () => {
                    setShowSignUpModal(true);
                }, onLoginClick: () => {
                    setShowLogInModal(true);
                }, onLogoutSuccess: () => {
                    setLoggedInUser(null);
                } }), (0, jsx_runtime_1.jsxs)("div", Object.assign({ className: "flex flex-col h-full items-center py-4" }, { children: [(0, jsx_runtime_1.jsx)("button", Object.assign({ className: "bg-black hover:bg-gray-700 text-white font-bold py-2 px-4 rounded", onClick: handleAddNoteClick }, { children: "Add Note" })), notesLoading ? ((0, jsx_runtime_1.jsx)(Spinner_1.default, {})) : showNotesLoadingError ? ((0, jsx_runtime_1.jsx)("p", Object.assign({ className: "text-red-600 mt-4" }, { children: "Something went wrong while fetching notes. Refresh the page!" }))) : ((0, jsx_runtime_1.jsx)("div", Object.assign({ className: "grid grid-cols-1 gap-4 place-items-center p-4 sm:grid-cols-2 lg:grid-cols-3" }, { children: notes === null || notes === void 0 ? void 0 : notes.map((n) => ((0, jsx_runtime_1.jsx)(Note_1.default, { note: n, onNoteClicked: setNoteToEdit, onDeleteNoteClicked: handleNoteDelete }, n._id))) }))), showAddNoteModal && ((0, jsx_runtime_1.jsx)(NoteModal_1.default, { onHideNoteModal: handleHideAddNoteModal, onNoteSave: handleNoteSaved })), noteToEdit && ((0, jsx_runtime_1.jsx)(NoteModal_1.default, { noteToEdit: noteToEdit, onHideNoteModal: handleHideAddNoteModal, onNoteSave: handleNoteUpdate })), showLogInModal && ((0, jsx_runtime_1.jsx)(LoginModal_1.default, { onHideLoginModal: () => setShowLogInModal(false), onLoginSuccess: (user) => {
                            setLoggedInUser(user);
                            setShowLogInModal(false);
                        } })), showSignUpModal && ((0, jsx_runtime_1.jsx)(SignUpModal_1.default, { onHideSignUpModal: () => {
                            setShowSignUpModal(false);
                        }, onSignUpSuccess: (user) => {
                            setLoggedInUser(user);
                            setShowSignUpModal(false);
                        } }))] }))] }));
}
exports.default = App;
