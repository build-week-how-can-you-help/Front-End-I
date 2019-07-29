import React from 'react';
import { NavLink } from 'react-router-dom';

const Navigation = () => {
  return(
    <nav>
      <ul>
        { localStorage.getItem("token") ? (
          <>
            <li><NavLink to="/home">Home</NavLink></li>
            <li><NavLink to="/search">Search</NavLink></li>
          </>
        ) : (
          <>
            <li><NavLink to="/">Login</NavLink></li>
          </>
        )
        }
      </ul>
    </nav>
  )
}

export default Navigation;