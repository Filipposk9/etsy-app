import { useCallback } from "react";
import { useForm } from "react-hook-form";

import TextInputField from "../form/TextInputField";

import { Note } from "../../models/note";
import { NoteInput } from "../../network/notes_api";
import * as NotesApi from "../../network/notes_api";

interface NoteDialogProps {
  noteToEdit?: Note;
  onHideNoteModal: () => void;
  onNoteSave: (note: Note) => void;
}

const NoteModal = ({
  noteToEdit,
  onHideNoteModal,
  onNoteSave,
}: NoteDialogProps): JSX.Element => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<NoteInput>({
    defaultValues: {
      title: noteToEdit?.title || "",
      text: noteToEdit?.text || "",
    },
  });

  const onSubmit = useCallback(
    async (input: NoteInput) => {
      try {
        let noteResponse: Note;

        if (noteToEdit) {
          noteResponse = await NotesApi.updateNote(noteToEdit._id, input);
        } else {
          noteResponse = await NotesApi.createNote(input);
        }

        onNoteSave(noteResponse);
      } catch (error) {
        console.log(error);
      }
    },
    [noteToEdit, onNoteSave]
  );

  return (
    <div
      id="noteModal"
      tabIndex={-1}
      aria-hidden="true"
      className="fixed top-1/4 left-0 right-0 z-50 w-full p-4 overflow-x-hidden overflow-y-auto h-[calc(100%-1rem)] md:h-full"
    >
      <div className="relative w-full h-full max-w-2xl m-auto md:h-auto">
        <div className="relative bg-white rounded-lg shadow">
          <div className="flex items-start justify-between p-4 border-b rounded-t">
            <h3 className="text-xl font-semibold text-gray-900">
              {noteToEdit ? "Edit note" : "Add note"}
            </h3>
            <button
              type="button"
              className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center"
              data-modal-hide="defaultModal"
              onClick={onHideNoteModal}
            >
              <svg
                aria-hidden="true"
                className="w-5 h-5"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                ></path>
              </svg>
              <span className="sr-only">Close modal</span>
            </button>
          </div>
          <div className="w-full">
            <form
              className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
              id="addEditNoteForm"
              onSubmit={handleSubmit(onSubmit)}
            >
              <div className="mb-4">
                <TextInputField
                  name="title"
                  label="Title"
                  type="text"
                  placeholder="Title"
                  register={register}
                  registerOptions={{ required: "Required" }}
                  error={errors.title}
                />
              </div>
              <div className="mb-6">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="text"
                >
                  Text
                </label>
                <textarea
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                  id="text"
                  placeholder="Text"
                  rows={3}
                  {...register("text")}
                />
                {errors.text?.message ? (
                  <p className="text-red-600">{errors.text?.message}</p>
                ) : null}
              </div>
              <div className="flex items-center justify-between">
                <button
                  className="bg-gray-800 text-white rounded-md px-3 py-2 ml-2 text-sm font-medium hover:bg-gray-600"
                  type="submit"
                  form="addEditNoteForm"
                  disabled={isSubmitting}
                >
                  {noteToEdit ? "Edit note" : "Add note"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NoteModal;
