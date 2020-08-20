import React, { Component } from "react";
import logoAudt from "../images/logo-auditoria.jpg";
import logoPlus from "../images/logo-agregar.jpg";

class MisAuditorias extends React.Component {
  render() {
    return (
      <div className="container-md">
        <form>
          <div className="container">
            <h1> Mis Auditorias</h1>
            <div className="contenedor-formulario row col-12">
              <div className="col-5">
                <img
                  src={logoAudt}
                  alt="logo Auditoria"
                  width="400"
                  height="400"
                />
              </div>
              <div className="formulario col-7">
                <div className="card  tarjeta-auditoria w-50">
                  <div className="card-body">
                    <h5 className="card-title">Auditoria 1</h5>
                    <p className="card-text">Informacion Sobre auditoria</p>
                    <a href="#" class="btn btn-info">
                      Ingresar
                    </a>
                  </div>
                </div>
                <div class="card  tarjeta-auditoria w-50">
                  <div class="card-body">
                    <h5 class="card-title">Auditoria 2</h5>
                    <p class="card-text">Informacion Sobre auditoria</p>
                    <a href="#" class="btn btn-info">
                      Ingresar
                    </a>
                  </div>
                </div>
                <div>
                  <button class="btn btn-light centrado">
                    <img src={logoPlus} alt="+" width="35" height="35" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    );
  }
}
export default MisAuditorias;
