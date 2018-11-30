import React, { Component } from "react"
import { NavItem, Nav, NavDropdown, MenuItem } from "react-bootstrap"
import { Link } from "react-router-dom"

class HeaderLinks extends Component {
  render() {
    const { isAuthenticated, location, onLogoutClick } = this.props

    const notification = (
      <div>
        <i className="fa fa-globe" />
        <b className="caret" />
        <span className="notification">5</span>
        <p className="hidden-lg hidden-md">Notification</p>
      </div>
    )
    return (
      <div>
        {/*<Nav>
          <NavItem eventKey={3} href="#">
            <i className="fa fa-search" />
            <p className="hidden-lg hidden-md">Search</p>
          </NavItem>
        </Nav>*/}
        <Nav pullRight>
          {/* <NavDropdown
            eventKey={1}
            title="Dropdown"
            id="basic-nav-dropdown-right">
            <MenuItem eventKey={1.1}>Action</MenuItem>
            <MenuItem eventKey={1.2}>Another action</MenuItem>
            <MenuItem eventKey={1.3}>Something</MenuItem>
            <MenuItem eventKey={1.4}>Another action</MenuItem>
            <MenuItem eventKey={1.5}>Something</MenuItem>
            <MenuItem divider />
            <MenuItem eventKey={1.5}>Separated link</MenuItem>
          </NavDropdown>*/}

          {!isAuthenticated && (
            <NavItem
              eventKey={2}
              componentClass={Link}
              href="/login"
              to="/login">
              Login
            </NavItem>
          )}

          {!isAuthenticated && (
            <NavItem
              eventKey={2}
              componentClass={Link}
              href="/register"
              to="/register">
              Register
            </NavItem>
          )}

          {isAuthenticated && (
            <NavItem eventKey={2} href="#" onClick={onLogoutClick}>
              Logout
            </NavItem>
          )}
{/*
          <NavDropdown
            eventKey={2}
            title={notification}
            noCaret
            id="basic-nav-dropdown">
            <MenuItem eventKey={2.1}>Notification 1</MenuItem>
            <MenuItem eventKey={2.2}>Notification 2</MenuItem>
            <MenuItem eventKey={2.3}>Notification 3</MenuItem>
            <MenuItem eventKey={2.4}>Notification 4</MenuItem>
            <MenuItem eventKey={2.5}>Another notifications</MenuItem>
          </NavDropdown>*/}
        </Nav>
      </div>
    )
  }
}

export default HeaderLinks