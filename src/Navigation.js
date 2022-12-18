import React, { Component } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Navbar, Nav } from "react-bootstrap";

export class Navigation extends Component {
  logoutHandler() {
    localStorage.clear();
    this.props.setIsLogin = false;
  }
  render() {
    return (
      <Navbar bg="dark" expand="lg">
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav>
            <NavLink className="d-inline p-2 bg-dark text-white" to="/">
              Home
            </NavLink>
            <NavLink
              className="d-inline p-2 bg-dark text-white"
              to="/department"
            >
              Department
            </NavLink>

            <NavLink className="d-inline p-2 bg-dark text-white" to="/employee">
              Employee
            </NavLink>

            <NavLink
              to=""
              className="d-inline p-2 bg-dark text-white"
              onClick={this.logoutHandler}
            >
              logout
            </NavLink>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}
