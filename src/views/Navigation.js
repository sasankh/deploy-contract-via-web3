import React from 'react'
import { Link } from 'react-router-dom'

const Navigation = () => (
  <header>
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav mr-auto">
          <li className="nav-item active">
            <Link className="nav-link" to='/'>Home</Link>
          </li>
          <li className="nav-item active">
            <Link className="nav-link" to='/simpleStorage'>Simple Storage</Link>
          </li>
          <li className="nav-item active">
            <Link className="nav-link" to='/deployStorageContract'>Deploy Contract</Link>
          </li>
        </ul>
      </div>
    </nav>
  </header>
)

export default Navigation
