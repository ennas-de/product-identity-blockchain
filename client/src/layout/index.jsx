import React from "react";
import classNames from "classnames";
import { Container } from "react-bootstrap";
import NavBar from "../components/content/Navbar";

const Layout = ({ isOpen, toggle, children }) => {
  return (
    <Container
      fluid
      className={classNames("content", { "is-open": isOpen })}
    >
      <NavBar toggle={toggle} />
      <div className="main-content">
        {children}
      </div>
    </Container>
  );
};

export default Layout;
