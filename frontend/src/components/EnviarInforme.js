import React, { Component } from "react";
import logoAudt from "../images/logo-auditoria.jpg";
import { Button, Label, Input, Col, Row } from "reactstrap";
import logoPlus from "../images/logo-agregar.jpg";
import { Control, LocalForm, Errors } from "react-redux-form";

const required = (val) => val && val.length;
class EnviarInforme extends React.Component {
  constructor(props) {
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(values) {
    this.props.enviarInforme({
      correo: values.correo,
      contenidoContido: values.contenidoCorreo,
    });
  }
  render() {
    return (
      <div className="container-md">
        <LocalForm onSubmit={(values) => this.handleSubmit(values)}>
          <div className="container">
            <h1 className="centrado"> Enviar Informe </h1>
            <div class="contenedor-formulario row col-12">
              <div class="col-5">
                <img
                  src={logoAudt}
                  alt="logo Auditoria"
                  width="400"
                  height="400"
                />
              </div>
              <div class="formulario col-7">
                <Row className="row campo">
                  <Label className="col-4" htmlFor="username">
                    Usuario
                  </Label>
                  <Row className="col-8">
                    <Control.text
                      model=".correo"
                      id="correo"
                      name="correo"
                      placeholder="ejemplo@gmail.com"
                      className="form-control col-12"
                      validators={{ required }}
                    />
                    <Errors
                      className="text-danger col-12"
                      model=".correo"
                      show="touched"
                      messages={{ required: "El campo correo es requerido" }}
                    />{" "}
                  </Row>
                </Row>
                <Row className="row campo ">
                  <Label className="col-4" htmlFor="contenidoCorreo">
                    Contenido Correo
                  </Label>
                  <Row className="col-8">
                    <Input
                      type="textarea"
                      id="contenidoCorreo"
                      model=".contenidoCorreo"
                      name="contenidoCorreo"
                      placeholder="Contenido del correo"
                      className="form-control col-12"
                    />
                  </Row>
                </Row>
                <div class="row centrado">
                  <div class="col-2">
                    <Button className="btn btn-info">Cancelar</Button>
                  </div>
                  <div class="col-4">
                    <Button class="btn" color="info" type="submit">
                      Enviar Informe
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </LocalForm>
      </div>
    );
  }
}
export default EnviarInforme;
