import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAlignLeft } from "@fortawesome/free-solid-svg-icons";
import { Navbar, Button, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";

const NavBar = ({ toggle }) => {
  return (
    <Navbar
      bg="light"
      className="navbar shadow-sm p-3 mb-5 bg-white rounded"
      expand
    >
      <Button variant="outline-info" onClick={toggle}>
        <FontAwesomeIcon icon={faAlignLeft} />
      </Button>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="ml-auto nav__list" navbar>
          <Link to="/dashboard/home" className="px-2">Home</Link>
          <Link to="/dashboard/about" className="px-2">About</Link>
          <Link to="/dashboard/faq" className="px-2">FAQ</Link>
          <Link to="/dashboard/contact" className="px-2">Contact</Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default NavBar;
