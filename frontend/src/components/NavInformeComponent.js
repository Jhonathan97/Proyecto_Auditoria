import React, { Component } from 'react';
import { Navbar, NavbarBrand, Nav, NavbarToggler, Collapse, NavItem, Button } from 'reactstrap';
import { NavLink } from 'react-router-dom';


class NavInforme extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isNavOpen: false
        }
        this.toggleNav = this.toggleNav.bind(this);
    }

    toggleNav() {
        this.setState({
            isNavOpen: !this.state.isNavOpen
        });
    }

    render() {
        const informe = this.props.items.map((item) => {
            return (
                <div key={item.id}>
                    <NavItem>
                        <NavLink className="nav-link" to={`/item/${item.id}`}>
                            <span className="fa fa-edit fa-lg"></span> {item.nombre}
                        </NavLink>
                    </NavItem>
                </div>
            );
        });

        return (
            <React.Fragment>
                <Navbar dark>
                    <div className="container">
                        <NavbarToggler onClick={this.toggleNav} />
                        <NavbarBrand className="mr-auto" href="/">Informe</NavbarBrand>
                        <Collapse isOpen={this.state.isNavOpen} navbar>
                            <Nav navbar>
                                {informe}
                            </Nav>
                        </Collapse>
                    </div>
                </Navbar>
            </React.Fragment>
        );
    }
}

export default NavInforme