import React, { useContext, useState, useEffect, useRef } from 'react'
import noteContext from '../context/notes/noteContext';
import NoteItem from './NoteItem';
import AddNote from './AddNote';
import { useNavigate } from 'react-router-dom';

const Notes = () => {
  const context = useContext(noteContext); // using the context API which we created in noteContext
  const { notes, getAllNotes, editNote, showAlert } = context;   // By using destructing taking the elements  outside of the context

  let navigate = useNavigate();
  // Syntax of using useEffect
  useEffect(() => {
    if (localStorage.getItem('token')) {
      getAllNotes();
    }
    else {
      navigate("/login");
    }
    // using this as component didmount function

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const ref = useRef(false); // creating a value for ref
  const [note, setNotes] = useState({ etitle: "", edescription: "" })
  // setting up the note state with etitle,edescription and etag


  const updateNotes = (currentNote) => {
    setNotes({ noteId: currentNote._id, etitle: currentNote.title, edescription: currentNote.description });
    // here the note is considering title,description and tag so we need to write it in destructure form
    ref.current.click();
    // Adding a refrence of current with a value of click over it over a edit button
  }

  const handleClick = (e) => {
    editNote(note.noteId, note.etitle, note.edescription);
    showAlert("Note edited successfully", "success");
    e.preventDefault();
    ref.current.click();
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNotes({ ...note, [name]: value }); // Set the value of the note and add or overwrite the further value (name,value)
  }

  return (
    <>
      <AddNote />
      {/* // giving a refrence to it with a useRef hook */}
      {/* // Modal for editing the note */}
      <button ref={ref} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
        Launch demo modal
      </button>
      <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">Edit Note</h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <form>
                <div className="mb-2">
                  <label htmlFor="etitle" className="form-label">Title</label>
                  <input type='text' className="form-control" name='etitle' id="etitle" value={note.etitle} onChange={handleChange} minLength={5} required />
                </div>
                <div className="mb-3">
                  <label htmlFor="edescription" className="form-label">Description</label>
                  <input type='text' className="form-control" name='edescription' id="edescription" value={note.edescription} onChange={handleChange} minLength={5} required />
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button type="button" disabled={note.etitle.length < 5 || note.edescription.length < 5} className="btn btn-primary" data-bs-dismiss="modal" onClick={handleClick}>Save changes</button>
            </div>
          </div>
        </div>
      </div>

      {/* =================== Displaying the notes ===================== */}

      <div className='box my-3 px-2'>
        <h2>Your notes</h2>
        <div className='mx-1'>
          {notes.length === 0 && `No notes to display`}
        </div>
        <div className="row">
          {notes.map((notes) => {
            return <NoteItem key={notes._id} updateNotes={updateNotes} notes={notes} /> // passing the notes state as props
          })}
        </div>
      </div>
    </>
  )
}

export default Notes
