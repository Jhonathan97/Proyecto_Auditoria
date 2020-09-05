import React from 'react';
import { Button, Label, Row, Card, CardBody, UncontrolledAlert } from 'reactstrap';
import { Loading } from './LoadingComponent';
import GoogleButton from 'react-google-button';
import { Control, LocalForm, Errors } from 'react-redux-form';
import { Redirect } from 'react-router-dom';
import { baseUrl } from '../shared/baseUrl';

const required = (val) => val && val.length;

const Login = (props) => {

  const handleSubmit = (values) => {
    props.loginUser({
      username: values.username,
      password: values.password,
    });
  }

  if (props.auth.isLoading) {
    return (
      <div className="container">
        <div className="row">
          <Loading />
        </div>
      </div>
    );
  }
  else if (props.auth.isAuthenticated) {
    props.fetchAuditorias();
    return (
      <Redirect to="/misAuditorias" />
    );
  }
  return (
    <div>
      <Card className="text-center">
        <CardBody>
          {props.userRegister.isSuccess ? <UncontrolledAlert color="success">Registro Exitoso. Ya puede ingresar a la página con su usuario y contraseña</UncontrolledAlert> : null}
          {props.userRegister.errMess !== null ? <UncontrolledAlert color="danger">{props.userRegister.errMess}</UncontrolledAlert> : null}
          {props.auth.errMess !== null ? <UncontrolledAlert color="danger">{props.auth.errMess}</UncontrolledAlert> : null}
          <LocalForm
            className="login-form"
            onSubmit={(values) => handleSubmit(values)}
          >
            <Row className="form-group">
              <Label htmlFor="username">Usuario</Label>
              <Control.text
                model=".username"
                id="username"
                name="username"
                placeholder="Ingrese su usuario"
                className="form-control"
                validators={{ required }}
              />
              <Errors
                className="text-danger"
                model=".username"
                show="touched"
                messages={{ required: "El campo usuario es requerido" }}
              />
            </Row>
            <Row className="form-group">
              <Label htmlFor="password">Contraseña</Label>
              <Control.text
                type="password"
                model=".password"
                id="password"
                name="password"
                placeholder="Ingrese su contraseña"
                className="form-control"
                validators={{ required }}
              />
              <Errors
                className="text-danger"
                model=".password"
                show="touched"
                messages={{ required: "El campo contraseña es requerido" }}
              />
            </Row>
            <Button className="btn btn-dark btn-block" type="submit">
              Iniciar Sesión
                    </Button>
            <div className="text-center pt-3">
              O iniciar sesión con tu cuenta de Google
                    </div>
            <div className="google-button">
              <hr></hr>
              {/*<GoogleButton onClick={() => this.props.loginUserGoogle()} />*/}
              <a href={`${baseUrl}users/auth/google`}><GoogleButton /></a>
            </div>
          </LocalForm>
        </CardBody>
      </Card>
    </div>
  );
}

export default Login;
