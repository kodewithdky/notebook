import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { CgProfile } from "react-icons/cg";
import {AiOutlineLogin} from 'react-icons/ai'
import {TbLogin, TbLogin2} from 'react-icons/tb'

const Navbar = () => {
  let location = useLocation();
  const navigate = useNavigate();
  //logout
  const handleLogout = () => {
    navigate("/login");
    localStorage.removeItem("token");
    localStorage.removeItem("name");
    localStorage.removeItem("email");
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarTogglerDemo01"
            aria-controls="navbarTogglerDemo01"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
            <Link className="navbar-brand" to="/">
              MyNoteBook
            </Link>
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link
                  className={`nav-link ${
                    location.pathname === "/" ? "active" : ""
                  }`}
                  aria-current="page"
                  to="/"
                >
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className={`nav-link ${
                    location.pathname === "/about" ? "active" : ""
                  }`}
                  aria-current="page"
                  to="/about"
                >
                  About
                </Link>
              </li>
            </ul>
            {!localStorage.getItem("token") ? (
              <form className="d-flex">
                <Link
                  className="nav-link active mx-1"
                  to="/login"
                >
                  {<TbLogin2 color="green" size={35}/>}
                </Link>
                <Link
                  className="nav-link active mx-1"
                  to="/signup"
                >
                  {<TbLogin color="green" size={35}/>}
                </Link>
              </form>
            ) : (
              <>
                <Link className="nav-link active mx-2" to="/profile">
                  {<CgProfile color="blue" size={35} />}
                </Link>
                <Link className="nav-link active mx-2" onClick={handleLogout}>
                {<AiOutlineLogin color="red" size={35}/>}
                </Link>
              </>
            )}
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
