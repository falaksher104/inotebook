import React from 'react'
import {Link } from 'react-router-dom'
const Navbar = () => {
  return (
    <div>
        
          <nav className="navbar navbar-expand-lg navbar-light bg-light">
              <div className="container-fluid">
                  <h6 className="navbar-brand">iNoteBook</h6>
                  <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                      <span className="navbar-toggler-icon"></span>
                  </button>
                  <div className="collapse navbar-collapse" id="navbarSupportedContent">
                      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                          <li className="nav-item">
                                <Link to="/" exact="true" className="nav-link active">Home </Link>
                          </li>
                          <li className="nav-item">
                              <Link to="/login" exact="true" className="nav-link active">Login </Link>
                          </li>
                          <li className="nav-item">
                              <Link to="/signup" exact="true" className="nav-link active">Signup </Link>
                          </li>
                          <li className="nav-item">
                              <Link to="/addnote" exact="true" className="nav-link active">Add note </Link>
                          </li>
                        
                      </ul>
                   
                  </div>
              </div>
          </nav>
    </div>
  )
}

export default Navbar
