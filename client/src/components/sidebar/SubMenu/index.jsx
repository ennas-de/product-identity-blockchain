import React, { useState } from "react";
import { Accordion, Nav } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown, faCaretUp } from "@fortawesome/free-solid-svg-icons";
import classNames from "classnames";
import { Link } from "react-router-dom";

const SubMenu = ({ icon, title, items }) => {
  const [collapsed, setCollapsed] = useState(true);

  const toggleNavbar = () => {
    setCollapsed(!collapsed);
  };

  return (
    <Nav.Item className={classNames({ open: !collapsed })}>
      <Accordion>
        <Accordion.Item eventKey="0">
          <Accordion.Header onClick={toggleNavbar}>
            <Nav.Link as="div" variant="link">
              <FontAwesomeIcon icon={icon} className="mr-2" />
              {title}
              <FontAwesomeIcon
                icon={collapsed ? faCaretDown : faCaretUp}
                className="float-right"
              />
            </Nav.Link>
          </Accordion.Header>
          <Accordion.Body>
            <nav className="nav flex-column">
              {items.map(item => (
                <Link
                  className={`nav-link nav-item pl-5 `}
                  to={item.link}
                  key={item}
                >
                  {item.name}
                </Link>
              ))}
            </nav>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </Nav.Item>
  );
};

export default SubMenu;
