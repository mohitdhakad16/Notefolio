import React, { useState } from 'react'
import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import noteContext from '../context/notes/noteContext';

const Signup = () => {

    const { showAlert } = useContext(noteContext)

    let navigate = useNavigate(); // useHistory hook is been updated to useNavigate which is use to navigate to any end point
    let host = 'http://localhost:5000';

    // for the creating a user 
    const [credentials, setcredentials] = useState({ username: "", email: "", password: "" });

    // to show and hide password
    const [hide, sethide] = useState('visibility');
    const [showPass, setShowPass] = useState('password');

    const handleClick = () => {
        if (hide === 'visibility') {
            sethide('visibility_off');
            setShowPass('text');
        }
        else {
            sethide('visibility');
            setShowPass('password')
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { username, email, password } = credentials;

        const response = await fetch(`${host}/api/auth/createuser/`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ username, email, password })
        });
        const data = await response.json();
        console.log(data);
        if (data.success) {
            // save the authentication token and redirect to the home page of the defined user
            localStorage.setItem("token", data.token);
            showAlert("Account created successfully", "success")
            navigate("/home");
        }
        else {
            showAlert("User with this email already exist", "danger")
        }
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setcredentials({ ...credentials, [name]: value });
        // removing the credentials values by using destructuring and setting them with the name field to the value
        // Set the value of the note and add or overwrite the further value (name,value)
    };

    return (
        <div className="container my-3">
            <div className="login-container px-lg-5 py-lg-5 p-3 my-3">
                <h4 className='text-center m-3'>Sign up</h4>
                <p className='text-center mb-4'>Get started with our app, just create an account and enjoy the experience</p>
                <form onSubmit={handleSubmit} >
                    {/* onSubmit is used on form not on the submit button */}
                    <div className="input-group mb-3">
                        <input type='text' className="form-control" placeholder="Username" aria-describedby="button-addon1" name='username' onChange={handleChange} minLength={3} required />

                        <button className="btn btn-primary d-flex" type="button" id="button-addon1"><span className="material-symbols-outlined">
                            person</span></button>
                    </div>
                    <div className="input-group mb-3">
                        <input type="email" className="form-control" placeholder="Email address" aria-label="Recipient's username" aria-describedby="button-addon2" name='email' onChange={handleChange} required />

                        <button className="btn btn-primary d-flex" type="button" id="button-addon2"><span className="material-symbols-outlined">
                            mail</span></button>
                    </div>
                    <div className="input-group mb-3">
                        <input type={showPass} className="form-control" placeholder="Password" name="password" aria-label="Recipient's username" aria-describedby="button-addon2" minLength={5} onChange={handleChange} required />

                        <button className="btn btn-primary d-flex" type="button" id="button-addon3" onClick={handleClick}><span className="material-symbols-outlined">
                            {hide} </span></button>
                    </div>
                    <div className="d-grid gap-2 mb-3">
                        <button type="submit" className="btn btn-primary">Sign up</button>
                    </div>
                    <p className='fs-6 mt-3 py-sm-2 text-center'>Already have an account ? <Link className="link-opacity-100-hover" to="/login">Log in</Link></p>
                </form>
            </div>
        </div>
    )
}

export default Signup
