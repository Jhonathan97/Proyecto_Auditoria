import React, { Component } from "react";
import {
  Navbar,
  NavbarBrand,
  Nav,
  NavbarToggler,
  Collapse,
  NavItem,
  Button,
  Row,
  Label,
  Col,
  Modal,
  ModalHeader,
  ModalBody,
} from "reactstrap";
import { NavLink } from "react-router-dom";
import { Control, LocalForm, Errors } from "react-redux-form";

const required = (val) => val && val.length;

class CrearItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isModalOpen: false,
    };
    this.toggleModal = this.toggleModal.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  toggleModal() {
    this.setState({
      isModalOpen: !this.state.isModalOpen,
    });
  }

  handleSubmit(values) {
    this.toggleModal();
    this.props.postItem(this.props.auditoriaId, {
      nombre: values.nombre_item,
    });
  }

  render() {
    return (
      <div>
        <Button
          size="md"
          onClick={this.toggleModal}
          color="white"
          className="text-white"
        >
          <span className="fa fa-plus-circle fa-lg"></span> Crear Item
        </Button>
        <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
          <ModalHeader toggle={this.toggleModal}>Crear Item</ModalHeader>
          <ModalBody>
            <LocalForm onSubmit={(values) => this.handleSubmit(values)}>
              <Row className="form-group">
                <Label htmlFor="nombre_item" md={4}>
                  Nombre Item
                </Label>
                <Col md={8}>
                  <Control.text
                    model=".nombre_item"
                    id="nombre_item"
                    placeholder="Nombre del Item"
                    name="nombre_item"
                    className="form-control"
                    validators={{ required }}
                  />
                  <Errors
                    className="text-danger"
                    model=".nombre_item"
                    show="touched"
                    messages={{
                      required: "El campo Nombre del Item es requerido",
                    }}
                  />
                </Col>
              </Row>
              <Row className="form-group">
                <Col sm={{ offset: 9 }}>
                  <Button type="submit" color="info">
                    Crear Item
                  </Button>
                </Col>
              </Row>
            </LocalForm>
          </ModalBody>
        </Modal>
      </div>
    );
  }
}

class NavInforme extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isNavOpen: false,
    };
    this.toggleNav = this.toggleNav.bind(this);
  }

  toggleNav() {
    this.setState({
      isNavOpen: !this.state.isNavOpen,
    });
  }

  render() {
    var informe = null;
    if (this.props.informe.informe !== null) {
      informe = this.props.informe.informe.items.map((item) => {
        return (
          <div key={item.id}>
            <NavItem>
              <NavLink className="nav-link" to={`/informe/${item._id}`}>
                <span className="fa fa-edit fa-lg"></span> {item.nombre}
              </NavLink>
            </NavItem>
          </div>
        );
      });
    }

    return (
      <React.Fragment>
        <Navbar dark>
          <div className="container">
            <NavbarToggler onClick={this.toggleNav} />
            <NavbarBrand className="mr-auto" href="/">
              Informe
            </NavbarBrand>
            <Collapse isOpen={this.state.isNavOpen} navbar>
              <Nav navbar>{informe}</Nav>
            </Collapse>
            <Nav className="mb-auto" navbar>
              <NavItem>
                <div>
                  <CrearItem
                    postItem={this.props.postItem}
                    auditoriaId={this.props.auditoriaId}
                  />
                </div>
              </NavItem>
            </Nav>
          </div>
        </Navbar>
      </React.Fragment>
    );
  }
}

export default NavInforme;
