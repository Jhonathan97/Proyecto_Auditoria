import React, { Component } from 'react';
import { Button, Label, Input, Col, Row} from 'reactstrap';
import { Loading } from './LoadingComponent';
import GoogleButton from 'react-google-button';
import { Link } from 'react-router-dom';
import { Control, LocalForm, Errors } from 'react-redux-form';

class Register extends Component {

	constructor(props) {
		super(props);

		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleSubmit(values) {
		this.props.RegisterUser({ name: values.name,
							   lastname: values.lastname,
							   username: values.username, 
							   password: values.password,
							   email:    values.email});
	}

	render() {
		/*
		if (this.props.auth.isLoading) {
			return (
				<div className="container">
					<div className="row">
						<Loading />
					</div>
				</div>
			);
		}*/
		return (
		<div class="fondo">
		<div class="imagen">
			<div class="contenedor">	
			<div class="card text-center">
				<div class="card-header">
				</div>
				<div>
				<LocalForm className="register-form" model="register" onSubmit={(values) => this.handleSubmit(values)}>
					<Row className="form-group">
						<Label htmlFor="name">Nombre</Label>
						<Control.text model=".name" id="name" name="name" placeholder="Ingrese su nombre" className="form-control" />
					</Row>
					<Row className="form-group">
						<Label htmlFor="lastname">Apellido</Label>
						<Control.text model=".lastname" id="lastname" name="lastname" placeholder="Ingrese su apellido" className="form-control" />
					</Row>
					<Row className="form-group">
						<Label htmlFor="username">Usuario</Label>
						<Control.text model=".username" id="username" name="username" placeholder="Ingrese su usuario" className="form-control" />
					</Row>
					<Row className="form-group">
						<Label htmlFor="password">Contraseña</Label>
						<Control.text type="password" model=".password" id="password" name="password" placeholder="Ingrese su contraseña" className="form-control" />
					</Row>
					<Row className="form-group">
						<Label htmlFor="email">Correo Electrónico</Label>
						<Control.text model=".email" id="email" name="email" placeholder="Ingrese su correo electrónico" className="form-control" />
					</Row>
					<Button class="btn-lg btn-dark" type="submit">Registrarse</Button>
					<div class="cancelar">
					<Button class="btn-lg btn-dark" type="submit">Cancelar</Button>
					</div>
				</ LocalForm>
				</div>
				</div>
				</div>
				</div>
			</div>
		);
	}

}
export default Register;