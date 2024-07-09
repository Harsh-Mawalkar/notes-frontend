import React, { useEffect, useState } from "react";
import "./App.css";

import Note from "./components/Note/Note";
import INote from "./interfaces/notes.interface";
import {
  getNotes,
  createNote,
  DeleteNote,
  UpdateNote,
} from "./services/noteServices";
import { Button, Modal, FloatingLabel, Form } from "react-bootstrap";

function App() {
  const [notesList, setNotesList] = useState<Array<INote>>([]);
  const [showAddNoteModal, setShowAddNoteModal] = useState(false);
  const [newNote, setNewNote] = useState<Partial<INote>>({
    link: "",
    text: "",
  });
  const handleCloseAddModal = () => {
    setNewNote({
      link: "",
      text: "",
    });
    setShowAddNoteModal(false);
  };
  const handleShowAddModal = () => setShowAddNoteModal(true);

  useEffect(() => {
    getNotesFromServer();
  }, []);

  const getNotesFromServer = async () => {
    const notes = await getNotes();
    setNotesList(notes);
  };

  console.log("rerendering");
  console.log("all:", notesList);

  const updatedNoteItem = async (updatedNote: INote) => {
    const noteFromSever = await UpdateNote(updatedNote);

    const updatedList = notesList.map((noteItem: INote) => {
      if (noteItem._id === noteFromSever._id) {
        return noteFromSever;
      }
      return noteItem;
    });
    setNotesList(updatedList);
  };

  const deleteNoteItem = async (noteToDelete: INote) => {
    await DeleteNote(noteToDelete._id);
    const remainingNotes = notesList.filter((noteItem) => {
      return noteItem._id !== noteToDelete._id;
    });
    setNotesList(remainingNotes);
  };

  const addNote = async () => {
    const savedNote = await createNote(newNote);
    setNotesList([...notesList, savedNote]);
    handleCloseAddModal();
  };

  return (
    <div className="App">
      <Button
        variant="dark"
        className="add-button"
        onClick={handleShowAddModal}
      >
        <div className="add-button-text">+</div>
      </Button>

      <Modal show={showAddNoteModal} onHide={handleCloseAddModal}>
        <Modal.Header closeButton>
          <Modal.Title>Add Notes</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <FloatingLabel controlId="floatingTextarea2" label="text">
            <Form.Control
              onChange={(event) => {
                const newVal = event.currentTarget.value;
                setNewNote({
                  ...newNote,
                  text: newVal,
                });
              }}
              as="textarea"
              placeholder="Leave a comment here"
              style={{ height: "100px" }}
            />
          </FloatingLabel>

          <FloatingLabel
            controlId="floatingInput"
            label="Link"
            className="mb-3 note-link"
          >
            <Form.Control
              type="url"
              placeholder="Enter note link "
              onChange={(event) => {
                const newVal = event.currentTarget.value;
                setNewNote({
                  ...newNote,
                  link: newVal,
                });
              }}
            />
          </FloatingLabel>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseAddModal}>
            Close
          </Button>
          <Button variant="primary" onClick={addNote}>
            Create
          </Button>
        </Modal.Footer>
      </Modal>

      <div className="notes-list">
        {notesList.map((noteItem, index) => {
          return (
            <Note
              note={noteItem}
              onNoteDelete={deleteNoteItem}
              onNoteUpdate={updatedNoteItem}
              key={index}
            />
          );
        })}
      </div>
    </div>
  );
}

export default App;
