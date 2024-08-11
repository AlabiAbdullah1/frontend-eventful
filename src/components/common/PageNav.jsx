/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import { Navbar, Nav, Container } from "react-bootstrap";

const NavBar = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 992);
  const [expanded, setExpanded] = useState(false);

  const handleResize = () => {
    setIsMobile(window.innerWidth <= 992);
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <Navbar
      expanded={expanded}
      expand="lg"
      bg="dark"
      variant="dark"
      className="p-3"
    >
      <Container>
        <Link to="/" className="navbar-brand">
          <h1 className="text-primary">EVENTFUL</h1>
        </Link>
        <Navbar.Toggle
          aria-controls="basic-navbar-nav"
          onClick={() => setExpanded(expanded ? false : "expanded")}
        />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <NavLink
              to="/creator-signup"
              className="nav-link"
              onClick={() => setExpanded(false)}
            >
              Signup as Creator
            </NavLink>
            <NavLink
              to="/eventee-signup"
              className="nav-link"
              onClick={() => setExpanded(false)}
            >
              Signup as Eventee
            </NavLink>
            <NavLink
              to="/creator-login"
              className="btn btn-primary ms-2"
              onClick={() => setExpanded(false)}
            >
              Creator Login
            </NavLink>
            <NavLink
              to="/eventee-login"
              className="btn btn-primary ms-2"
              onClick={() => setExpanded(false)}
            >
              Eventee Login
            </NavLink>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
