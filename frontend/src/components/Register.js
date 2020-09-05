import React from 'react';
import { Button, Label, Row, CardBody, Card } from 'reactstrap';
import { Control, LocalForm, Errors } from 'react-redux-form';

const required = (val) => val && val.length;
const validEmail = (val) => /^[A-Z0-9.%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(val);
const minlength = (len) => (val) => (val) && (val.length >= len);

const Register = (props) => {

	const handleSubmit = (values) => {
		props.registerUser({
			username: values.username,
			password: values.password,
			nombre: values.name,
			apellido: values.lastname,
			correo_electronico: values.email
		});
	}

	return (
		<div>
			<Card className="text-center">
				<CardBody>
					<LocalForm className="register-form" model="register" onSubmit={(values) => handleSubmit(values)}>
						<Row className="form-group">
							<Label htmlFor="name">Nombre</Label>
							<Control.text model=".name" id="name" name="name" placeholder="Ingrese su nombre" className="form-control" validators={{ required }} />
							<Errors
								className="text-danger"
								model=".name"
								show="touched"
								messages={{ required: "El campo nombre es requerido." }}
							/>
						</Row>
						<Row className="form-group">
							<Label htmlFor="lastname">Apellido</Label>
							<Control.text model=".lastname" id="lastname" name="lastname" placeholder="Ingrese su apellido" className="form-control" validators={{ required }} />
							<Errors
								className="text-danger"
								model=".lastname"
								show="touched"
								messages={{ required: "El campo apellido es requerido." }}
							/>
						</Row>
						<Row className="form-group">
							<Label htmlFor="username">Usuario</Label>
							<Control.text model=".username" id="username" name="username" placeholder="Ingrese su usuario" className="form-control" validators={{ required }} />
							<Errors
								className="text-danger"
								model=".username"
								show="touched"
								messages={{ required: "El campo usuario es requerido." }}
							/>
						</Row>
						<Row className="form-group">
							<Label htmlFor="password">Contraseña</Label>
							<Control.text type="password" model=".password" id="password" name="password" placeholder="Ingrese su contraseña" className="form-control" validators={{ required, minlength: minlength(8) }} />
							<Errors
								className="text-danger"
								model=".password"
								show="touched"
								messages={{ required: "El campo contraseña es requerido. ", minlength: "La contraseña debe ser mínimo de 8 caracteres" }}
							/>
						</Row>
						<Row className="form-group">
							<Label htmlFor="email">Correo Electrónico</Label>
							<Control.text model=".email" id="email" name="email" placeholder="Ingrese su correo electrónico" className="form-control" validators={{ required, validEmail }} />
							<Errors
								className="text-danger"
								model=".email"
								show="touched"
								messages={{ required: "El campo correo electrónico es requerido. ", validEmail: "El formato del correo electrónico no es valido" }}
							/>
						</Row>
						<Button className="btn btn-dark" type="submit">Registrarse</Button>
					</ LocalForm>
				</CardBody>
			</Card>
		</div >
	);
}

export default Register;