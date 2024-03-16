import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import Auth from '../../utils/auth';

function Nav() {
  const handleLogout = () => {
    Auth.logout();
    // Additional logic for logout if needed
  };

  function showNavigation() {
    if (Auth.loggedIn()) {
      return (
        <ul className="flex-row">
          <li className="mx-1">
            <NavLink to="/orderHistory" activeClassName="active">
              Order History
            </NavLink>
          </li>
          <li className="mx-1">
            <a href="/" onClick={handleLogout}>
              Logout
            </a>
          </li>
        </ul>
      );
    } else {
      return (
        <ul className="flex-row">
          <li className="mx-1">
            <NavLink to="/signup" activeClassName="active">
              Signup
            </NavLink>
          </li>
          <li className="mx-1">
            <NavLink to="/login" activeClassName="active">
              Login
            </NavLink>
          </li>
        </ul>
      );
    }
  }

  return (
    <header className="flex-row px-1">
      <h1>
        <Link to="/">
          <span role="img" aria-label="shopping bag">🛍️</span>
          -Shop-Shop
        </Link>
      </h1>
      <nav>{showNavigation()}</nav>
    </header>
  );
}

export default Nav;