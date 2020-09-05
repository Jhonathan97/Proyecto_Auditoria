import React, { Component } from "react";
import { Navbar, NavbarBrand, Nav, NavItem, Button } from "reactstrap";

class Header extends Component {
  constructor(props) {
    super(props);
    this.handleLogout = this.handleLogout.bind(this);
  }

  handleLogout() {
    this.props.logoutUser();
  }

  render() {
    return (
      <React.Fragment>
        <Navbar color="info">
          <div className="container">
            <NavbarBrand className="text-white" href="/">
              Auditoría
            </NavbarBrand>
            <Nav className="ml-auto" navbar>
              <NavItem>
                <div>
                  <div className="navbar-text mr-3">
                    {this.props.auth.user.username}
                  </div>
                  <Button outline onClick={this.handleLogout}>
                    <span className="fa fa-sign-out fa-lg"></span> Logout
                    {this.props.auth.isLoading ? (
                      <span className="fa fa-spinner fa-pulse fa-fw"></span>
                    ) : null}
                  </Button>
                </div>
              </NavItem>
            </Nav>
          </div>
        </Navbar>
      </React.Fragment>
    );
  }
}

export default Header;
