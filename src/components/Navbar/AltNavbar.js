import React from "react";
import logo from "../../assets/logo.png";
import { Redirect, Link } from "react-router-dom";
import { Navbar, Nav, NavDropdown, Button } from "react-bootstrap";

export const AltNavbar = () => {
  return (
    <div>
      <Navbar bg="light" expand="lg">
        <div className="container">
          <Navbar.Brand>
            <Link to="/">
              <img src={logo} alt="logo" />
            </Link>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="">
              <Nav>
                <Nav.Link href="/posts">Posts</Nav.Link>
                <Nav.Link eventKey={2} href="/careers">
                  Careers
                </Nav.Link>
                <Nav.Link href="/login">Login</Nav.Link>
                <Nav.Link href="/register">Sign Up</Nav.Link>
              </Nav>
            </Nav>
            {/* <div>
              <Button variant="outline-success" className="login-button">
               
              </Button>
              <Button className="signup-button" variant="outline-success">
               
              </Button>
            </div> */}
          </Navbar.Collapse>
        </div>
      </Navbar>
    </div>
  );
};
