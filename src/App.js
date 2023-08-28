import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import Navbar from './components/Navbar';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import NoteState from './context/notes/noteState';
import ServerError from './components/ServerError';
import Login from './components/Login';
import Signup from './components/Signup';
import Alert from './components/Alert';

function App() {

  return (
    // Passing the NoteState function so that i can be accessed anywhere
    <NoteState>
      <Router>
        <Navbar />
        <Alert />
        <Routes>
          <Route exact path="/" element={<Home/>} />
          <Route exact path="/home" element={<Home />} />
          <Route exact path="*" element={<ServerError />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/signup" element={<Signup />} />
        </Routes>
      </Router>
    </NoteState>
  );
}

export default App;
