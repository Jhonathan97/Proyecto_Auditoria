import React, { Component } from 'react';
import { Button, Label, Input, Col, Row } from 'reactstrap';
import { Loading } from './LoadingComponent';
import GoogleButton from 'react-google-button';
import { Control, LocalForm, Errors } from 'react-redux-form';

const required = (val) => val && val.length;

class Login extends Component {

	constructor(props) {
		super(props);

		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleSubmit(values) {
		this.props.loginUser({ username: values.username, password: values.password });
	}

	render() {
		if (this.props.auth.isLoading) {
			return (
				<div className="container">
					<div className="row row-content">
						<Loading />
					</div>
				</div>
			);
		}
		return (
			<LocalForm className="login-form" onSubmit={(values) => this.handleSubmit(values)}>
				<Row className="form-group">
					<Label htmlFor="username">Usuario</Label>
					<Control.text model=".username" id="username" name="username" placeholder="Ingrese su usuario" className="form-control" validators={{ required }} />
					<Errors className="text-danger" model=".username" show="touched" messages={{required: 'El campo usuario es requerido'}} />
				</Row>
				<Row className="form-group">
					<Label htmlFor="password">Contraseña</Label>
					<Control.text type="password" model=".password" id="password" name="password" placeholder="Ingrese su contraseña" className="form-control" validators={{ required }}/>
					<Errors className="text-danger" model=".password" show="touched" messages={{required: 'El campo contraseña es requerido'}} />
				</Row>
				<div>
					{this.props.auth.errMess !== null ? <p className="text-danger">{this.props.auth.errMess}</p> : null}
				</div>
				<Button className="btn-lg btn-dark btn-block" type="submit">Iniciar Sesión</Button>
				<div className="text-center pt-3">
					O iniciar sesión con tu cuenta de Google
				</div>
				<div className="google-button">
					<hr></hr>
					<GoogleButton
						onClick={() => this.props.loginUserGoogle()}
					/>
					{/*<a href={`${baseUrl}/users/auth/google`}><GoogleButton /></a>*/}
				</div>
			</ LocalForm>
		);
	}

}
export default Login;