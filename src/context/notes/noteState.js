import { useState } from 'react';
import noteContext from '../notes/noteContext'; // importing noteContext file which we have created
import ServerError from '../../components/ServerError'; // importing serverError 
import user from '../../components/user.png';

// creating a function NoteState and returning it
const NoteState = (props) => {

    const [isServerError, setServerError] = useState(false);
    // creating a state for showing the server error if got any errors
    // initalizing the server error as default false

    let host = 'http://localhost:5000';

    // Storing the notes as hardcode values
    const notesInitial = [];

    const [notes, setNotes] = useState(notesInitial);   // useState with notes and setNotes and setting the value as notesInitial

    // Accessing the user deatails when the user gets logged in
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [notesLength, setnotesLength] = useState('');

    // API call for accessing the user details

    const getUserDetails = async () => {
        try {
            const response = await fetch(`http://localhost:5000/api/auth/getuser/`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "auth-token": localStorage.getItem('token')
                },
            });
            const data = await response.json();
            setUsername(data.username); // Set the username state with the fetched value
            setEmail(data.email); // Set the email state with the fetched value
        } catch (error) {
            setServerError(true);   // if got any error the state will turn to true
            console.log(error + "Internal Server Error");
        }
    };
    
    // the auth token which the localStorage currently is having set the details according to that
    if (localStorage.getItem('token')) {
        getUserDetails();
    }

    // Making a note CRUD
    // API Calls for get all notes
    const getAllNotes = async () => {
        try {
            const response = await fetch(`${host}/api/notes/fetchallnotes/`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "auth-token": localStorage.getItem('token')
                },
            });
            const data = await response.json();
            setNotes(data);
            console.log(data.length)
            setnotesLength(data.length)
            setServerError(false);
        } catch (error) {
            setServerError(true);   // if got any error the state will turn to true
            console.log(error + "Internal Server Error");
        }
    }


    // Add a note: 
    const addNote = async (title, description) => {
        // API Call for adding a note
        try {
            const response = await fetch(`${host}/api/notes/addNote/`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "auth-token": localStorage.getItem('token')
                },
                body: JSON.stringify({ title, description })
            });
            const newNote = await response.json();
            setNotes(notes.concat(newNote));    // concat method is combining the array of notes
            getAllNotes();  // re-updating the notes so that it can show the length of notes
            setServerError(false);
        } catch (error) {
            setServerError(true);   // if got any error the state will turn to true
            console.log(error + "Internal Server Error");
        }

    }

    // Delete a note:
    const deleteNote = async (noteId) => {
        // API Calls: 
        try {
            const response = await fetch(`${host}/api/notes/deleteNote/${noteId}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    "auth-token": localStorage.getItem('token')
                },
            });
            const data = response.json();
            console.log(data);

            // Logic for deleting a note on client side
            const newNotes = notes.filter((note) => {
                return note._id !== noteId
            });    // Filter method with filter out the element which is equal to the id of the note
            setNotes(newNotes);
            getAllNotes();  // re-updating the notes so that it can show the length of notes
            setServerError(false);
            showAlert("Note deleted successfully", "success")
        } catch (error) {
            setServerError(true);   // if got any error the state will turn to true
            console.log(error + "Internal Server Error");
        }
    }

    // Update a note:
    const editNote = async (noteId, title, description) => {
        // API Calls: 
        try {
            const response = await fetch(`${host}/api/notes/updateNote/${noteId}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "auth-token": localStorage.getItem('token')
                },

                body: JSON.stringify({ title, description }), // body data type must match "Content-Type" header
            });
            const data = await response.json();
            console.log(data)
            // Logic for updating a note in client side
            let newNotes = JSON.parse(JSON.stringify(notes));   // creating a deep copy of notes so we can't directly change the state
            for (let index = 0; index < newNotes.length; index++) {
                const element = newNotes[index];
                if (element._id === noteId) {
                    newNotes[index].title = title;
                    newNotes[index].description = description;
                    break;
                }
            }
            setNotes(newNotes);
            setServerError(false);
        } catch (error) {
            setServerError(true);   // if got any error the state will turn to true
            console.log(error + "Internal Server Error");
        }
    }

    // Adding an alert to to these operations

    // Alert adding code
    const [alert, setAlert] = useState(null);

    const showAlert = (message, type) => {
        setAlert({
            msg: message,
            type: type
        })
        setTimeout(() => {
            setAlert(null);
        }, 1500);
    }

    return (

        <><div className="modal fade" id="exampleModal3" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                    <div className="modal-header">
                        <h1 className="modal-title fs-5" id="exampleModalLabel">User Details</h1>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <div className="row">
                            <div className="col-md-4">
                                <div className="userImg m-auto">
                                    <img src={user} alt="" />
                                </div>
                            </div>
                            <div className="col-md-8 d-flex justify-content-center align-items-center">
                                <div className="userInfo">
                                    <p className="fs-6">Username: {username}</p>
                                    <p className="fs-6">Email ID: {email}</p>
                                    <p className="fs-6">No. of notes: {notesLength} </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    </div>
                </div>
            </div>
        </div>

            {/* // Passing the notes states using the context API */}
            <noteContext.Provider value={{ notes, setNotes, addNote, deleteNote, editNote, getAllNotes, alert, setAlert, showAlert, username }}>
                {/* // here passing the username as a context to the navbar.js  */}
                {/* // passing NoteState as a value here */}
                {isServerError ? <ServerError /> : props.children}
                {/* // this will pass the chilren components which are under notestate */}
            </noteContext.Provider></>
    )
}

export default NoteState;