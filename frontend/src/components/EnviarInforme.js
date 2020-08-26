import React, { Component } from "react";
import logoAudt from "../images/logo-auditoria.jpg";

class EnviarInforme extends Component {
  state = {
    correo: "",
    contenido: "",
  };
  valueToState = ({ correo, contenido }) => {
    this.setState(() => {
      return { correo: correo, contenido: contenido };
    });
  };

  handleSubmit(event) {
    console.log("aqui estoy");
    alert("hello");
  }
  render() {
    return (
      <div class="container-md">
        <form>
          <div class="container">
            <h1> Enciar Informe </h1>
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
                    Correo Destinatario
                  </label>
                  <input
                    type="email"
                    class="form-control col-7"
                    id="exampleInputEmail"
                    placeholder="Ejemplo@gmail.com"
                    required
                  ></input>
                  <small id="emailHelp" class="form-text text-muted"></small>
                </div>
                <div class="row campo ">
                  <label class="col-4" for="validationTextarea ">
                    Contenido Correo
                  </label>
                  <textarea
                    class="form-control col-7"
                    id="validationTextarea"
                    placeholder="Contenido del correo"
                  ></textarea>
                </div>
                <div class="row centrado">
                  <div class="col-2">
                    <button class="btn btn-info" >
                      Cancelar
                    </button>
                  </div>
                  <div class="col-4">
                    <button class="btn btn-info" >
                      Enviar Informe
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
export default EnviarInforme;
