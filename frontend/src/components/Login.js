import React, { Component } from 'react';
import { Button, Form, FormGroup, Label, Input} from 'reactstrap';
import GoogleButton from 'react-google-button';
import '../App.css';

class Login extends Component {
	render(){
		return(
			<Form className="login-form">
				<FormGroup>
					<Label>Usuario</Label>
					<Input type="" placeholder="Ingrese su usuario"/>
				</FormGroup>
				<FormGroup>
					<label>Contraseña</label>
					<Input type="password" placeholder="Ingrese su contraseña"/>
				</FormGroup>
				<Button className="btn-lg btn-dark btn-block">Iniciar Sesión</Button>
				<div className="text-center pt-3">
					O iniciar sesión con tu cuenta de Google
				</div>
				<div className= "google-button">
					<hr></hr>
					<GoogleButton
						onClick={() => { console.log('Google button clicked') }}
					/>
				</div>
			</Form>
		);
	}
	
}
export default Login;