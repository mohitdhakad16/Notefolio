import React, { useState } from 'react'
import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import noteContext from '../context/notes/noteContext';

const Login = () => {

  const context = useContext(noteContext); // using the context API which we created in noteContext
  const { showAlert } = context;

  let navigate = useNavigate();
  let host = 'http://localhost:5000';

  // to show and hide password
  const [hide, sethide] = useState('visibility');
  const [showPass, setShowPass] = useState('password');

  // for the login credentials
  const [credentials, setcredentials] = useState({ email: "", password: "" });

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
    const response = await fetch(`${host}/api/auth/login/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: credentials.email, password: credentials.password })
    });
    const data = await response.json();
    console.log(data);
    if (data.success) {
      // save the authentication token and redirect to the home page of the defined user
      localStorage.setItem("token", data.token);
      showAlert("Logged in successfully", "success")
      navigate("/home");
    }
    else {
      showAlert("Invalid details", "danger")
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setcredentials({ ...credentials, [name]: value }); // Set the value of the note and add or overwrite the further value (name,value)
  };

  return (
    <div className="container my-3">
      <div className="login-container px-lg-5 py-lg-5 p-3 my-3">
        <h4 className='text-center m-3'>Login to your Account</h4>
        <p className='text-center mb-5'>Welcome back! Please  in to your account and start exploring</p>
        <form onSubmit={handleSubmit} >
          {/* onSubmit is used on form not on the submit button */}
          <div className="input-group mb-3">
            <input type="email" className="form-control" placeholder="Email address" aria-label="Recipient's username" aria-describedby="button-addon2" name='email' value={credentials.email} onChange={handleChange} required />
            <button className="btn btn-primary d-flex" type="button" id="button-addon2"><span className="material-symbols-outlined">
              mail</span></button>
          </div>
          <div className="input-group mb-3">
            <input type={showPass} className="form-control" placeholder="Password" name='password' aria-label="Recipient's username" aria-describedby="button-addon2" value={credentials.password} onChange={handleChange} minLength={5} required />
            <button className="btn btn-primary d-flex" type="button" id="button-addon3" onClick={handleClick}><span className="material-symbols-outlined">
              {hide} </span></button>
          </div>
          <div className="d-grid gap-2 mb-3">
            <button type="submit" className="btn btn-primary">Login</button>
          </div>
          <p className='fs-6 mt-3 py-sm-2 text-center'>Don't have any account ? <Link className="link-opacity-100-hover" to="/signup">Sign up now</Link></p>
        </form>
      </div>
    </div>
  )
}

export default Login

