import React, { useContext, useState } from 'react';
import noteContext from '../context/notes/noteContext';

const AddNote = () => {
    const context = useContext(noteContext); // using the context API which we created in noteContext
    const { addNote, showAlert } = context;   // By using destructing taking the notes and setNotes outside of the context

    const [note, setNotes] = useState({ title: "", description: "" })
    const handleClick = (e) => {
        e.preventDefault();
        addNote(note.title, note.description);
        setNotes({ title: "", description: "" });   // once the user adds a note , then empty the input fields
        showAlert("Note added successfully", "success");
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNotes({ ...note, [name]: value }); // Set the value of the note and add or overwrite the further value (name,value)
    }

    return (
        <div className="container my-3">
            <div className="box">
                <h2 className='my-2'>Add your note</h2>
                <form>
                    <div className="mb-2">
                        <label htmlFor="title" className="form-label">Title</label>
                        <input type='text' className="form-control" name='title' value={note.title} id="title" onChange={handleChange} minLength={5} required />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="description" className="form-label">Description</label>
                        <input type='text' className="form-control" name='description' value={note.description} id="description" onChange={handleChange} minLength={5} required />
                    </div>
                    <button type="submit" disabled={note.title.length < 5 || note.description.length < 5} className="btn btn-primary" onClick={handleClick}>Add Note</button>
                </form>
            </div>
        </div>
    )
}

export default AddNote
