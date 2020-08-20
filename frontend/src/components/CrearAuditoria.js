import React, { Component } from "react";
import logoAudt from "../images/logo-auditoria.jpg";
import logoPlus from "../images/logo-agregar.jpg";
class CrearAuditoria extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      values: [
        { name: "One", id: 1 },
        { name: "Two", id: 2 },
        { name: "Three", id: 3 },
        { name: "four", id: 4 },
      ],
    };
  }
  render() {
    let optionTemplate = this.state.values.map((v) => (
      <option value={v.id}>{v.name}</option>
    ));
    return (
      <div class="container-md">
        <form>
          <div class="container">
            <h1> Crear Auditoria </h1>
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
                <div class="row campo ">
                  <label class="col-4" for="exampleInputEmail">
                    Nombre de la Auditoria
                  </label>
                  <input
                    class="form-control col-7"
                    id="nombre-auditoria"
                    placeholder="Nombre de la Auditoria"
                    required
                  ></input>
                </div>
                <div class="row campo ">
                  <label class="col-4" for="exampleInputEmail">
                    Nombre del cliente
                  </label>
                  <input
                    class="form-control col-7"
                    id="nombre-cliente"
                    placeholder="Nombre del cliente"
                    required
                  ></input>
                </div>
                <div class="row campo">
                  <label class="col-4" for="validationTextarea ">
                    Equipo Auditor
                  </label>
                  <select
                    class=" form-control col-7"
                    id="equipo-auditor"
                    value={this.state.value}
                    onChange={this.handleChange}
                  >
                    {optionTemplate}
                  </select>
                  <button class="btn btn-light">
                    <img
                      src={logoPlus}
                      alt="+"
                      width="35"
                      height="35"
                    />
                  </button>
                </div>
                <div class="row centrado">
                  <div class="col-2">
                    <button class="btn btn-info" type="submit">
                      Cancelar
                    </button>
                  </div>
                  <div class="col-4">
                    <button class="btn btn-info" type="reset">
                      Crear Auditoria
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    );
  }
}
export default CrearAuditoria;
