import React, { Component } from 'react';
import NavInforme from './NavInformeComponent';
import EditarInforme from './EditarInforme';
import Login from './Login';
import { loginUser, logoutUser, fetchAuditorias, loginUserGoogle, postAuditoria, eliminarAuditoria, actualizarAuditoria } from '../redux/ActionCreators';
import MisAuditorias from './MisAuditorias';
import EnviarInforme from "./EnviarInforme";
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

const mapStateToProps = state => {
    return {
        auditorias: state.auditorias,
        auth: state.auth
    }
}

const mapDispatchToProps = dispatch => ({
    loginUser: (creds) => dispatch(loginUser(creds)),
    logoutUser: () => dispatch(logoutUser()),
    fetchAuditorias: () => dispatch(fetchAuditorias()),
    loginUserGoogle: () => dispatch(loginUserGoogle()),
    postAuditoria: (auditoria) => dispatch(postAuditoria(auditoria)),
    eliminarAuditoria: (auditoriaId) => dispatch(eliminarAuditoria(auditoriaId)),
    actualizarAuditoria: (auditoriaId, auditoria) => dispatch(actualizarAuditoria(auditoriaId, auditoria))
});

class Main extends Component {

    componentDidMount() {
        this.props.fetchAuditorias();
    }

    render() {

        const ItemWithId = ({ match }) => {
            return (
                <EditarInforme item={this.props.items.filter((item) => item.id === match.params.itemId)[0]} />
            );
        }

        const PrivateRoute = ({ component: Component, ...rest }) => (
            <Route {...rest} render={(props) => (
                this.props.auth.isAuthenticated
                    ? <Component {...props} />
                    : <Redirect to={{
                        pathname: '/login',
                        state: { from: props.location }
                    }} />
            )} />
        );

        return (
            <div>

                <Switch>
                    <Route path="/login" component={() => <Login loginUser={this.props.loginUser} auth={this.props.auth} fetchAuditorias={this.props.fetchAuditorias} />} />
                    <PrivateRoute exact path="/misAuditorias" component={() => <MisAuditorias auditorias={this.props.auditorias} postAuditoria={this.props.postAuditoria} eliminarAuditoria={this.props.eliminarAuditoria} actualizarAuditoria={this.props.actualizarAuditoria}/>} />
                    <Route path="/enviarInforme" component={() => <EnviarInforme />} />
                    <PrivateRoute path="/item/:itemId" component={ItemWithId} />
                    {this.props.auth.isAuthenticated ? <Redirect to="/misAuditorias" /> : <Redirect to="/login" />}
                </Switch>
            </div>
        );
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));