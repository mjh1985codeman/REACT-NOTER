import React from "react";

// We import bootstrap to make our application look better.
import "bootstrap/dist/css/bootstrap.css";

// We import NavLink to utilize the react router.
import { NavLink } from "react-router-dom";

import { Navbar } from "react-bootstrap";

// Here, we display our Navbar
const Nav = () => {
  return (
    <div className="navbar-style">
      <Navbar collapseOnSelect expand="lg" bg="light" variant="light">
        <Navbar.Brand as={NavLink} to="/">
          React-Noter
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <NavLink as={NavLink} to="/create">
            Create Note
          </NavLink>
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
};

export default Nav;
