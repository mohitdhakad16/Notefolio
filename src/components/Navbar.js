import React  from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import noteContext from '../context/notes/noteContext';

export default function Navbar() {

    const context = useContext(noteContext); // using the context API which we created in noteContext
    const { username } = context;  

    let location = useLocation();
    let navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    }

    return (
        <div>
            <nav className="navbar navbar-expand-lg" style={{ backgroundColor: '#e3f2fd' }}>
                <div className="container-fluid">
                    <Link className={`navbar-brand ${location.pathname === '/home' ? 'active' : ''}`} to="/home">Notefolio</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link className={`nav-link ${location.pathname === '/home' ? 'active' : ''}`} to="/home">Home</Link>
                            </li>
                        </ul>
                        {!localStorage.getItem('token') ? <form className="d-flex" role="search">
                            <Link className="btn btn-primary mx-2" to="/login" role="button">Log in</Link>
                            <Link className="btn btn-primary" to="/signup" role="button">Sign Up</Link>
                        </form> :
                            <>
                                <div className="d-flex align-items-center" style={{ cursor: 'pointer' }} data-bs-toggle="modal" data-bs-target="#exampleModal3">
                                    <span className="material-symbols-outlined mx-1 text-dark fs-3" >account_circle</span>
                                    <span className=" mx-1 text-dark fs-5" >{username}</span>
                                </div>
                                <button className='btn btn-primary mobile-margin mx-2' onClick={handleLogout}>Log out</button>
                            </>}
                    </div>
                </div>
            </nav>
        </div>
    )
}
