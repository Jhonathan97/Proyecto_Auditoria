import React from "react";
import logoAudt from "../images/logo-auditoria.jpg";
import { Loading } from "./LoadingComponent";
import {
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  CardText,
  Button,
} from "reactstrap";
import { Link } from "react-router-dom";
import CrearAuditoria from "./CrearAuditoria";
import EditarAuditoria from "./EditarAuditoriaComponent";

function RenderAuditorias({
  auditoria,
  eliminarAuditoria,
  actualizarAuditoria,
  onClick,
}) {
  const clientes = auditoria.nombre_clientes.map((cliente) => {
    return (
      <div key={cliente._id}>
        <CardText>
          {cliente.nombre} {cliente.apellido}
        </CardText>
      </div>
    );
  });

  return (
    <Card key={auditoria._id} className="tarjeta-auditoria w-50">
      <CardHeader className="text-white bg-info">
        <div className="row">
          <h5 className="col-8">{auditoria.nombre}</h5>
          <EditarAuditoria
            className="col-2"
            auditoria={auditoria}
            actualizarAuditoria={actualizarAuditoria}
          />
          <Button
            className="col-2"
            color="info"
            onClick={() => {
              if (window.confirm("¿Estás seguro de eliminar esta auditoría?")) {
                eliminarAuditoria(auditoria._id);
              }
            }}
          >
            <span className="fa fa-trash fa-lg"></span>
          </Button>
        </div>
      </CardHeader>
      <CardBody>
        <div className="row row-cols-2">
          <CardTitle className="col-6">
            <h6>Lider Auditor:</h6>
          </CardTitle>
          <CardText className="col-6">
            {" "}
            {auditoria.lider_auditor.nombre} {auditoria.lider_auditor.apellido}
          </CardText>
        </div>
        <div className="row row-cols-2">
          <CardTitle className="col-6">
            <h6>Clientes:</h6>
          </CardTitle>
          <div className="col-6">{clientes}</div>
        </div>
        <div className="row mt-4">
          <Button className="mx-auto col-10 btn btn-info" onClick={() => onClick(auditoria._id)}>
            <Link
              to={`/misAuditorias/${auditoria._id}`}
              className="text-white"
            >
              Ingresar
            </Link>
          </Button>
        </div>
      </CardBody>
    </Card>
  );
}

function RenderState({
  auditorias,
  isLoading,
  errMess,
  eliminarAuditoria,
  actualizarAuditoria,
  onClick,
}) {
  if (isLoading) {
    return <Loading />;
  } else if (errMess) {
    return <h4>{errMess}</h4>;
  } else if (auditorias != null) {
    const mis_auditorias = auditorias.map((auditoria) => {
      return (
        <div key={auditoria._id}>
          <RenderAuditorias
            auditoria={auditoria}
            eliminarAuditoria={eliminarAuditoria}
            actualizarAuditoria={actualizarAuditoria}
            onClick={onClick}
          />
        </div>
      );
    });
    return <div>{mis_auditorias}</div>;
  }
}

const MisAuditorias = (props) => {
  return (
    <div className="container-md">
      <form>
        <div className="container">
          <h1 className="text-center"> Mis Auditorias</h1>
          <div className="contenedor-formulario row col-12">
            <div className="col-12 col-md-5">
              <img
                src={logoAudt}
                alt="logo Auditoria"
                width="400"
                height="400"
              />
            </div>
            <div className="formulario col-12 col-md-7">
              <RenderState
                auditorias={props.auditorias.auditorias}
                isLoading={props.auditorias.isLoading}
                errMess={props.auditorias.errMess}
                eliminarAuditoria={props.eliminarAuditoria}
                actualizarAuditoria={props.actualizarAuditoria}
                onClick={props.onClick}
              />
              <div className="offset-2">
                <CrearAuditoria postAuditoria={props.postAuditoria} />
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};
export default MisAuditorias;
