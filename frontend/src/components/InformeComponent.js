import React, { useState } from "react";
import {
  Row,
  Nav,
  NavLink,
  NavItem,
  TabContent,
  TabPane,
  Col,
  Card,
  CardImg,
  CardImgOverlay,
  CardTitle,
  Breadcrumb,
  BreadcrumbItem,
  Label,
  Button,
} from "reactstrap";
import classnames from "classnames";
import { Link } from "react-router-dom";
import { Loading } from "./LoadingComponent";
import { LocalForm, Control, Errors } from "react-redux-form";

const required = (val) => val && val.length;

function RenderReport({ informe, errMess, crearInforme, auditoriaId, eliminarInforme }) {
  const handleSubmit = (values) => {
    crearInforme(auditoriaId, {
      nombre: values.name,
    });
  };

  return (
    <div>
      {informe !== null ? (
        <Row>
          <Col sm={6}>
            <Card className="m-5">
              <Link to="/informe">
                <CardImg
                  width="100%"
                  src="/assets/images/report-icon.png"
                  alt="report-icon"
                />
                <CardImgOverlay>
                  <CardTitle>Ingresar</CardTitle>
                </CardImgOverlay>
              </Link>
            </Card>
          </Col>
          <Col sm={6} className="mx-auto my-auto">
            <Row>
              <Col sm={12}>
                <Link className="m-5 col-10 btn btn-lg btn-info">
                  Enviar Informe
                </Link>
              </Col>
              <Col sm={12}>
                <Button
                  color="info"
                  className="m-5 col-10 btn-lg"
                  onClick={() => {
                    if (
                      window.confirm(
                        "¿Estás seguro de eliminar esta auditoría?"
                      )
                    ) {
                      eliminarInforme(auditoriaId);
                    }
                  }}
                >
                  Eliminar Informe
                </Button>
              </Col>
            </Row>
          </Col>
        </Row>
      ) : null}
      {errMess !== null ? (
        <Row>
          <Col sm={12}>
            <h1 className="m-5 text-muted">{errMess}</h1>
          </Col>
          <Col sm={12}>
            <LocalForm onSubmit={(values) => handleSubmit(values)}>
              <Row className="form-group m-5">
                <Label htmlFor="name">Nombre</Label>
                <Col sm={4}>
                  <Control.text
                    model=".name"
                    id="name"
                    name="name"
                    placeholder="Nombre Informe"
                    className="form-control"
                    validators={{ required }}
                  />
                  <Errors
                    className="text-danger"
                    model=".name"
                    show="touched"
                    messages={{ required: "El campo nombre es requerido." }}
                  />
                </Col>
                <Col sm={4}>
                  <Button type="submit" color="info">
                    Crear Informe
                  </Button>
                </Col>
              </Row>
            </LocalForm>
          </Col>
        </Row>
      ) : null}
    </div>
  );
}

const Informe = (props) => {
  const [activeTab, setActiveTab] = useState("3");

  const toggle = (tab) => {
    if (activeTab !== tab) setActiveTab(tab);
  };

  if (props.isLoading) {
    return (
      <div className="container">
        <div className="row">
          <Loading />
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      <div className="row">
        <Breadcrumb>
          <BreadcrumbItem>
            <Link to="/misAuditorias">Mis Auditorías</Link>
          </BreadcrumbItem>
          <BreadcrumbItem active>{props.auditoria.nombre}</BreadcrumbItem>
        </Breadcrumb>
      </div>
      <Nav tabs>
        <NavItem>
          <NavLink
            className={(classnames({ active: activeTab === "1" }), "disabled")}
            onClick={() => {
              toggle("1");
            }}
          >
            Etapa 1
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            className={(classnames({ active: activeTab === "2" }), "disabled")}
            onClick={() => {
              toggle("2");
            }}
          >
            Etapa 2
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            className={classnames({ active: activeTab === "3" })}
            onClick={() => {
              toggle("3");
            }}
          >
            Etapa 3
          </NavLink>
        </NavItem>
      </Nav>
      <TabContent activeTab={activeTab}>
        <TabPane tabId="3">
          <RenderReport
            informe={props.informe}
            errMess={props.errMess}
            crearInforme={props.postInforme}
            auditoriaId={props.auditoria._id}
            eliminarInforme={props.eliminarInforme}
          />
        </TabPane>
      </TabContent>
    </div>
  );
};

export default Informe;
