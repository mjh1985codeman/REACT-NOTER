import React from "react";

// We import bootstrap to make our application look better.
import "bootstrap/dist/css/bootstrap.css";

// We import NavLink to utilize the react router.
import { NavLink } from "react-router-dom";

import { Navbar } from "react-bootstrap";

// Here, we display our Navbar
const Nav = () => {
  return (
    <Navbar
      collapseOnSelect
      expand="lg"
      bg="light"
      variant="light"
      className="nav-bar"
    >
      <Navbar.Brand as={NavLink} to="/" className="crt-note-header me-auto">
        <h1>React-Noter</h1>
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" className="toggle" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Navbar.Brand
          as={NavLink}
          to="/create"
          className="crt-note-header me-auto"
        >
          Create Note
        </Navbar.Brand>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Nav;
