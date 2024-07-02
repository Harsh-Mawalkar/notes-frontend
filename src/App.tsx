import React, { useEffect, useState } from "react";
import "./App.css";
// import axios from 'axios';
import DUMMY_NOTES from "./DUMMY_NOTES";
import Note from "./components/Note/Note";
import INote from "./interfaces/notes.interface";

function App() {
  const [notesList, setNotesList] = useState<Array<INote>>([]);

  useEffect(() => {
    console.log(
      "useEffect: checking localStorage and setting notes to DUMMY_NOTES"
    ); // Debugging log
    const listFromStorageString = localStorage.getItem("my-notes");
    console.log("listFromStorageString:", listFromStorageString); // Log the value from localStorage

    if (listFromStorageString) {
      const listFromStorageArray = JSON.parse(listFromStorageString);
      console.log("listFromStorageArray:", listFromStorageArray); // Log the parsed value
      setNotesList(listFromStorageArray);
    } else {
      console.log("No data in localStorage, setting DUMMY_NOTES");
      setNotesList(DUMMY_NOTES);
    }
  }, []);

  useEffect(() => {
    console.log("Saving in localStorage");
    const notesListString = JSON.stringify(notesList);
    console.log("notesListString:", notesListString); // Log the value being saved
    localStorage.setItem("my-notes", notesListString);
  }, [notesList]);

  console.log("rerendering");
  console.log("all:", notesList);

  const updatedNoteItem = (updatedNote: INote) => {
    console.log("value updated");
    console.log(updatedNote);

    const updatedList = notesList.map((noteItem: INote) => {
      if (noteItem._id === updatedNote._id) {
        return updatedNote;
      }
      return noteItem;
    });
    setNotesList(updatedList);
  };

  return (
    <div className="App">
      <div className="notes-list">
        {notesList.map((noteItem, index) => {
          return (
            <Note note={noteItem} onNoteUpdate={updatedNoteItem} key={index} />
          );
        })}
      </div>
    </div>
  );
}

export default App;
