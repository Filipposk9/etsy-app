import React, { useCallback, useEffect, useState } from "react";

import Note from "./components/Note";
import NoteModal from "./components/NoteModal";
import Spinner from "./components/Spinner";
import SignUpModal from "./components/SignUpModal";
import NavBar from "./components/navBar/NavBar";

import { User } from "./models/user";
import { Note as NoteModel } from "./models/note";
import * as NotesApi from "./network/notes_api";
import * as UsersApi from "./network/user_api";
import LoginModal from "./components/LoginModal";

function App() {
  const [loggedInUser, setLoggedInUser] = useState<User | null>(null);
  const [showSignUpModal, setShowSignUpModal] = useState(false);
  const [showLogInModal, setShowLogInModal] = useState(false);
  const [notes, setNotes] = useState<NoteModel[]>([]);
  const [notesLoading, setNotesLoading] = useState(true);
  const [showNotesLoadingError, setShowNotesLoadingError] = useState(false);
  const [showAddNoteModal, setShowAddNoteModal] = useState(false);
  const [noteToEdit, setNoteToEdit] = useState<NoteModel | null>(null);

  useEffect(() => {
    async function fetchLoggedInUser() {
      try {
        const user = await UsersApi.getLoggedInUser();
        setLoggedInUser(user);
      } catch (error) {
        console.log(error);
      }
    }
    fetchLoggedInUser();
  }, []);

  useEffect(() => {
    async function loadNotes() {
      try {
        setShowNotesLoadingError(false);
        setNotesLoading(true);
        const notes = await NotesApi.fetchNotes();
        setNotes(notes);
      } catch (error) {
        console.error(error);
        setShowNotesLoadingError(true);
      } finally {
        setNotesLoading(false);
      }
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

  const handleNoteSaved = useCallback(
    (note: NoteModel) => {
      setNotes([...notes, note]);
      setShowAddNoteModal(false);
    },
    [notes]
  );

  const handleNoteUpdate = useCallback(
    (note: NoteModel) => {
      setNotes(notes.map((n) => (n._id === note._id ? note : n)));
      setNoteToEdit(null);
      setShowAddNoteModal(false);
    },
    [notes]
  );
  const handleNoteDelete = useCallback(
    async (note: NoteModel) => {
      try {
        await NotesApi.deleteNote(note._id);
        setNotes(notes.filter((n) => n._id !== note._id));
      } catch (error) {
        console.log(error);
        alert(error);
      }
    },
    [notes]
  );

  return (
    <>
      <NavBar
        loggedInUser={loggedInUser}
        onSignUpClick={() => {
          setShowSignUpModal(true);
        }}
        onLoginClick={() => {
          setShowLogInModal(true);
        }}
        onLogoutSuccess={() => {
          setLoggedInUser(null);
        }}
      />
      <div className="flex flex-col h-full items-center py-4">
        <button
          className="bg-black hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
          onClick={handleAddNoteClick}
        >
          Add Note
        </button>

        {notesLoading ? (
          <Spinner />
        ) : showNotesLoadingError ? (
          <p className="text-red-600 mt-4">
            Something went wrong while fetching notes. Refresh the page!
          </p>
        ) : (
          <div className="grid grid-cols-1 gap-4 place-items-center p-4 sm:grid-cols-2 lg:grid-cols-3">
            {notes?.map((n) => (
              <Note
                key={n._id}
                note={n}
                onNoteClicked={setNoteToEdit}
                onDeleteNoteClicked={handleNoteDelete}
              />
            ))}
          </div>
        )}

        {showAddNoteModal && (
          <NoteModal
            onHideNoteModal={handleHideAddNoteModal}
            onNoteSave={handleNoteSaved}
          />
        )}
        {noteToEdit && (
          <NoteModal
            noteToEdit={noteToEdit}
            onHideNoteModal={handleHideAddNoteModal}
            onNoteSave={handleNoteUpdate}
          />
        )}
        {showLogInModal && (
          <LoginModal
            onHideLoginModal={() => setShowLogInModal(false)}
            onLoginSuccess={(user) => {
              setLoggedInUser(user);
              setShowLogInModal(false);
            }}
          />
        )}
        {showSignUpModal && (
          <SignUpModal
            onHideSignUpModal={() => {
              setShowSignUpModal(false);
            }}
            onSignUpSuccess={(user) => {
              setLoggedInUser(user);
              setShowSignUpModal(false);
            }}
          />
        )}
      </div>
    </>
  );
}

export default App;
