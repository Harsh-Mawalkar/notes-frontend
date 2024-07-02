import { FC, FocusEvent } from "react";
import INote from "../../interfaces/notes.interface";
import "./Note.css";

type Props = {
  note: INote;
  onNoteUpdate: (note: INote) => void;
};

const Note: FC<Props> = ({ note, onNoteUpdate }) => {
  const noteTextUpdated = (event: FocusEvent<HTMLDivElement>) => {
    const newTextValue = event.currentTarget.textContent;
    if (newTextValue === note.text) {
      return;
    }
    console.log("note change text");

    const updatedNoteObject: INote = {
      ...note,
      text: newTextValue || "",
    };
    onNoteUpdate(updatedNoteObject);
  };

  return (
    <div className="note">
      <div
        onBlur={noteTextUpdated}
        contentEditable="true"
        suppressContentEditableWarning
        className="note__text"
      >
        {note.text}
      </div>
      <div className="note__link">
        <a href={note.link}>{note.link}</a>
      </div>
    </div>
  );
};

export default Note;
