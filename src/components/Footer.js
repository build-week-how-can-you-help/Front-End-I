import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer>
      <ul>
        <li>
          <h4>Who We Are</h4>
          <p>
            We believe there are better ways for
            someone to find non-Profits than just
            Googleing and getting a lot of irrelevant
            results. How Can You Help if designed to
            give you local results that meet your interests. 
          </p>
        </li>
        <li>
          <h4>Contact</h4>
          <p>
            7320 Baltimore Ave.<br />
            College Park, MD 20740
          </p>
          <p>
            contact@howcanyouhelp.com
          </p>
        </li>
        <li>
          <h4>About Us</h4>
          <Link to="/">About Us</Link><br />
          <Link to="/">Volunteering</Link><br />
          <Link to="/">Safety</Link><br />
          <Link to="/">Partners</Link>
        </li>
      </ul>
    </footer>
  )
}

export default Footer;