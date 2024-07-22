import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faBriefcase,
  faPaperPlane,
  faQuestion,
  faImage,
  faCopy,
  faTimes,
  faServer,
} from "@fortawesome/free-solid-svg-icons";
import SubMenu from "./../../components/sidebar/SubMenu";
import { Nav, Button } from "react-bootstrap";
import classNames from "classnames";
import { Link } from "react-router-dom";


// const menu = [
//     {
//         name: "View All Products",
//         link: "/dashboard/products/all"
//     },
//     {
//         name: "Add new Product",
//         link: "/dashboard/products/add"
//     },
//     {
//         name: "Track Product",
//         link: "/dashboard/products/search"
//     },
//     // {
//     //     name: "View Products",
//     //     link: "/dashboard/products/all"
//     // },


// ]

const SideBar = ({ isOpen, toggle }) => {

  return (
    <div className={classNames("sidebar", { "is-open": isOpen })}>
      <div className="sidebar-header">
        <Button
          variant="link"
          onClick={toggle}
          style={{ color: "#fff" }}
          className="mt-4"
        >
          <FontAwesomeIcon icon={faTimes} pull="right" size="xs" />
        </Button>
        <h3>MedScan IPR</h3>
      </div>

      <Nav className="flex-column pt-2">
        {/* <p className="ml-3">{company.name}</p> */}

        <Link to="/dashboard/home" className="link">
            <FontAwesomeIcon icon={faHome} className="mr-4" />
            <span className="ml-4">Home</span>
        </Link>

        {/* <SubMenu
          title="Products"
          icon={faCopy}
          items={menu}
        /> */}

        
          <Link to="/dashboard/products/all" className="link">
            <FontAwesomeIcon icon={faImage} className="mr-2" />
            All Products
          </Link>
        

        
          <Link to="/dashboard/products/add" className="link">
            <FontAwesomeIcon icon={faQuestion} className="mr-2" />
            Add new Product
          </Link>
        

        
          <Link to="/dashboard/products/track" className="link">
            <FontAwesomeIcon icon={faPaperPlane} className="mr-2" />
            Track Product
          </Link>
        

        
          <Link to="/dashboard/profile" className="link">
            <FontAwesomeIcon icon={faBriefcase} className="mr-2" />
            Profile
          </Link>
        
        
          <Link to="/dashboard/settings" className="link">
            <FontAwesomeIcon icon={faServer} className="mr-2" />
            Settings
          </Link>
        

        {/* 
          <Link to="/">
            <FontAwesomeIcon icon={faPaperPlane} className="mr-2" />
            Contact
          </Link>
         */}
      </Nav>
    </div>
  );
};

export default SideBar;
