import "./App.css";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import About from "./components/About";
import NoteState from "./context/notes/NoteState";
import Alert from "./components/Alert";
import Login from "./components/Login";
import Signup from "./components/Signup";
import { useState } from "react";
import Profile from "./components/Profile";

function App() {
  const [alert, setAlert] = useState(null);

  const showAlert = (message, type) => {
    setAlert({
      message,
      type,
    });
    setTimeout(() => {
      setAlert(null);
    }, 2000);
  };
  return (
    <>
      <NoteState>
        <Navbar />
        <Alert alert={alert} />
        <div className="container">
          <Routes>
            <Route path="/" element={<Home showAlert={showAlert} />} />
            <Route path="/about" element={<About />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/login" element={<Login showAlert={showAlert} />} />
            <Route path="/signup" element={<Signup showAlert={showAlert} />} />
          </Routes>
        </div>
      </NoteState>
    </>
  );
}

export default App;
