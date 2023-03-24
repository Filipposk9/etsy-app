import { Note as NoteModel } from "../models/note";

import { formatDate } from "../utils/formatDate";

import { MdDelete } from "react-icons/md";
import { useCallback } from "react";

interface NoteProps {
  note: NoteModel;
  onNoteClicked: (note: NoteModel) => void;
  onDeleteNoteClicked: (note: NoteModel) => void;
}
const Note = ({
  note,
  onNoteClicked,
  onDeleteNoteClicked,
}: NoteProps): JSX.Element => {
  const handleDeleteNote = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      onDeleteNoteClicked(note);
    },
    [note, onDeleteNoteClicked]
  );

  const handleNoteClicked = useCallback(() => {
    onNoteClicked(note);
  }, [note, onNoteClicked]);

  return (
    <div
      className="flex flex-col justify-around w-full max-w-sm h-60 p-4 bg-white border border-gray-200 rounded-lg shadow cursor-pointer hover:bg-gray-100"
      onClick={handleNoteClicked}
    >
      <div className="flex justify-between items-center">
        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 ">
          {note.title}
        </h5>
        <MdDelete className="cursor-pointer" onClick={handleDeleteNote} />
      </div>
      <p className="font-normal text-gray-700 h-4/6 gradient-mask-b-70">
        {note.text}
      </p>
      <p className="font-light text-gray-700 mt-2">{`Created: ${formatDate(
        note.createdAt
      )}`}</p>
    </div>
  );
};

export default Note;
