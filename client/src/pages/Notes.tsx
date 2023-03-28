import { HTMLAttributes, useCallback, useEffect, useState } from "react";

import Spinner from "../components/Spinner";
import Note from "../components/Note";
import NoteModal from "../components/modals/NoteModal";

import { Note as NoteModel } from "../models/note";
import { User } from "../models/user";
import * as NotesApi from "../network/notes_api";

type Props = HTMLAttributes<HTMLDivElement> & { loggedInUser: User | null };
const Notes = ({ loggedInUser }: Props) => {
  const [notes, setNotes] = useState<NoteModel[]>([]);
  const [notesLoading, setNotesLoading] = useState(true);
  const [showNotesLoadingError, setShowNotesLoadingError] = useState(false);
  const [showAddNoteModal, setShowAddNoteModal] = useState(false);
  const [noteToEdit, setNoteToEdit] = useState<NoteModel | null>(null);

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
  }, [loggedInUser]);

  const handleAddNoteClick = useCallback(() => {
    setShowAddNoteModal(true);
  }, []);

  const handleHideAddNoteModal = useCallback(() => {
    setShowAddNoteModal(false);
    setNoteToEdit(null);
  }, []);

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

  if (notesLoading) {
    return (
      <div className="flex justify-center items-center h-[calc(100vh-64px)] mt-16">
        <Spinner />
      </div>
    );
  }

  if (!loggedInUser) {
    return (
      <div className="mt-16">
        <p className="text-2xl font-medium text-center mt-4">
          Please login to see your notes!
        </p>
      </div>
    );
  }

  if (showNotesLoadingError) {
    return (
      <div className="mt-16">
        <p className="text-2xl text-red-600 font-medium text-center mt-16">
          Something went wrong while fetching notes. Refresh the page!
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center py-4 mt-16">
      <>
        <button
          className="bg-gray-800 text-white rounded-md px-3 py-2 ml-2 text-sm font-medium hover:bg-gray-600"
          onClick={handleAddNoteClick}
        >
          Add Note
        </button>
        <div className="grid grid-cols-1 gap-4 w-full place-items-center p-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {notes?.map((n) => (
            <Note
              key={n._id}
              note={n}
              onNoteClicked={setNoteToEdit}
              onDeleteNoteClicked={handleNoteDelete}
            />
          ))}
        </div>
      </>

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
    </div>
  );
};

export default Notes;
