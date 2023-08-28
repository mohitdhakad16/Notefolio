import React, { useContext } from 'react'
import noteContext from '../context/notes/noteContext';

const NoteItem = (props) => {
    const { notes, updateNotes} = props;  // accessing the value by destructering
    const context = useContext(noteContext); // using the context API which we created in noteContext
    const { deleteNote } = context;

    return (
        <>
            {/* ============== Modal for deleting the note ============= */}
            <button type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal2">
                Launch demo modal
            </button>
            <div className="modal fade" id="exampleModal2" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">Delete Note</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">Do you really want to delete your note {notes.title} ?</div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-danger" onClick={() => { deleteNote(notes._id) }} data-bs-dismiss="modal">Delete note</button>
                        </div>
                    </div>
                </div>
            </div>

            {/* ============== layout for showing the note ============ */}
            <div className="col-md-4">
                <div className="card my-2">
                    <div className="card-body">
                        <h5 className="card-title">{notes.title}</h5>
                        <p className="card-text">{notes.description}</p>
                        <span className="material-symbols-outlined" style={{ color: 'red' }} data-bs-toggle="modal" data-bs-target="#exampleModal2">delete</span>

                        <span className="material-symbols-outlined mx-2" data-bs-toggle="modal" data-bs-target="#exampleModal" style={{ color: 'green' }} onClick={() => { updateNotes(notes) }} >edit</span>
                    </div>
                </div>
            </div>
        </>
    )
}

export default NoteItem
