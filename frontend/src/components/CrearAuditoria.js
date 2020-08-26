import React, { Component } from "react";
import logoAudt from "../images/logo-auditoria.jpg";
import logoPlus from "../images/logo-agregar.jpg";
import { Button, Modal, ModalHeader, ModalBody, Col, Row, Label } from 'reactstrap';
import { Control, LocalForm, Errors } from 'react-redux-form';

const required = (val) => val && val.length;

class CrearAuditoria extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isModalOpen: false
    };
    this.toggleModal = this.toggleModal.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  toggleModal() {
    this.setState({
      isModalOpen: !this.state.isModalOpen
    });
  }

  handleSubmit(values) {
    this.toggleModal();
    this.props.postAuditoria({
      nombre: values.nombre_auditoria,
      nombre_clientes: [{
        nombre: values.nombre_cliente,
        apellido: values.apellido_cliente
      }]
    });
  }

  render() {
    return (
      <div>
        <Button outline size="md" onClick={this.toggleModal} color="info">
          <span className="fa fa-plus-circle fa-lg"></span> Crear Auditoría
        </Button>
        <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
          <ModalHeader toggle={this.toggleModal}>Crear Auditoría</ModalHeader>
          <ModalBody>
            <Row>
              <Col sm="12" md={{ size: 6, offset: 3 }}>
                <img
                  src={logoAudt}
                  alt="logo Auditoria"
                  width="200"
                  height="200"
                />
              </Col>
            </Row>
            <LocalForm onSubmit={(values) => this.handleSubmit(values)}>
              <Row className="form-group">
                <Label htmlFor="nombre_auditoria" md={12}>Nombre de la Auditoria</Label>
                <Col md={12}>
                  <Control.text model=".nombre_auditoria" id="nombre_auditoria" placeholder="Nombre de la Auditoría" name="nombre_auditoria" className="form-control" validators={{ required }} />
                  <Errors className="text-danger" model=".nombre_auditoria" show="touched" messages={{ required: 'El campo Nombre de la Auditoría es requerido' }} />
                </Col>
              </Row>
              <Row className="form-group">
                <Label htmlFor="nombre_clientes" md={12}>Nombre del cliente</Label>
                <Col md={9}>
                  <Control.text model=".nombre_cliente" id="nombre_cliente" placeholder="Nombre" name="nombre_cliente" className="form-control" validators={{ required }} />
                  <Errors className="text-danger" model=".nombre_cliente" show="touched" messages={{ required: 'El campo Nombre del Cliente es requerido' }} />
                </Col>
                <Col md={9}>
                  <Control.text model=".apellido_cliente" id="apellido_cliente" placeholder="Apellido" name="nombre_cliente" className="form-control" validators={{ required }} />
                  <Errors className="text-danger" model=".apellido_cliente" show="touched" messages={{ required: 'El campo Apellido del Cliente es requerido' }} />
                </Col>
              </Row>
              <Row className="form-group">
                <Label htmlFor="equipo_auditor" md={12}>Equipo Auditor</Label>
                <Col md={12}>
                  <Control.select model=".miembros_equipo" name="miembros_equipo" className="form-control">
                    <option>One</option>
                    <option>Two</option>
                    <option>Three</option>
                    <option>Four</option>
                  </Control.select>
                </Col>
                <button class="btn btn-light">
                  <img
                    src={logoPlus}
                    alt="+"
                    width="35"
                    height="35"
                  />
                </button>
              </Row>
              <Row className="form-group">
                <Col>
                  <Button type="submit" color="info">Crear Auditoria</Button>
                </Col>
              </Row>
            </LocalForm>
          </ModalBody>
        </Modal>
      </div>
    );
  }
}
export default CrearAuditoria;
