import React from 'react';
import { Link ,NavLink } from 'react-router-dom';

const Navigation = () => {
  return(
    <nav>
      <ul>
        <li className="logo-li"><Link to="/"><h2 className="logo" title="How Can I Help?">How Can I Help?</h2></Link></li>
        { localStorage.getItem("token") ? (
          <>
            <li><NavLink to="/home">Home</NavLink></li>
            <li><NavLink to="/nonprofits">Manage Non-Profits</NavLink></li>
            <li><NavLink to="/users">Manage Users</NavLink></li>
            <li><NavLink to="/logout">Logout</NavLink></li>
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