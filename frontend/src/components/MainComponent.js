import React, { Component } from "react";
import NavInforme from "./NavInformeComponent";
import Principal from "./PrincipalComponent";
import {
  loginUser,
  logoutUser,
  fetchAuditorias,
  loginUserGoogle,
  postAuditoria,
  eliminarAuditoria,
  actualizarAuditoria,
  registerUser,
  fetchInforme,
  postInforme,
  eliminarInforme,
  postItem,
  editarItem,
} from "../redux/ActionCreators";
import MisAuditorias from "./MisAuditorias";
import EnviarInforme from "./EnviarInforme";
import { Switch, Route, Redirect, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import Informe from "./InformeComponent";
import Header from "./HeaderComponent";
import EditarInforme from "./EditarInforme";

const mapStateToProps = (state) => {
  return {
    auditorias: state.auditorias,
    auth: state.auth,
    userRegister: state.userRegister,
    informe: state.informe,
  };
};

const mapDispatchToProps = (dispatch) => ({
  loginUser: (creds) => dispatch(loginUser(creds)),
  logoutUser: () => dispatch(logoutUser()),
  fetchAuditorias: () => dispatch(fetchAuditorias()),
  loginUserGoogle: () => dispatch(loginUserGoogle()),
  postAuditoria: (auditoria) => dispatch(postAuditoria(auditoria)),
  eliminarAuditoria: (auditoriaId) => dispatch(eliminarAuditoria(auditoriaId)),
  actualizarAuditoria: (auditoriaId, auditoria) =>
    dispatch(actualizarAuditoria(auditoriaId, auditoria)),
  registerUser: (usuario) => dispatch(registerUser(usuario)),
  fetchInforme: (auditoriaId) => dispatch(fetchInforme(auditoriaId)),
  postInforme: (auditoriaId, informe) =>
    dispatch(postInforme(auditoriaId, informe)),
  eliminarInforme: (auditoriaId) => dispatch(eliminarInforme(auditoriaId)),
  postItem: (auditoriaId, item) => dispatch(postItem(auditoriaId, item)),
  editarItem: (auditoriaId, item, itemId) =>
    dispatch(editarItem(auditoriaId, item, itemId)),
});

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      auditoriaId: null,
    };
  }

  componentDidMount() {
    this.props.fetchAuditorias();
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.auditoriaId !== prevState.auditoriaId) {
      this.props.fetchInforme(this.state.auditoriaId);
    }
  }

  onAuditoriaSelect(auditoriaId) {
    this.setState({ auditoriaId: auditoriaId });
  }

  render() {
    const ItemWithId = ({ match }) => {
      return (
        <div>
          <NavInforme
            informe={this.props.informe}
            postItem={this.props.postItem}
            auditoriaId={this.state.auditoriaId}
          />
          <EditarInforme
            item={
              this.props.informe.informe.items.filter(
                (item) => item._id === match.params.itemId
              )[0]
            }
            auditoriaId={this.state.auditoriaId}
            editarItem={this.props.editarItem}
          />
        </div>
      );
    };

    const AuditoriaWithId = ({ match }) => {
      return (
        <Informe
          auditoria={
            this.props.auditorias.auditorias.filter(
              (auditoria) => auditoria._id === match.params.auditoriaId
            )[0]
          }
          isLoading={this.props.auditorias.isLoading}
          errMess={this.props.informe.errMess}
          informe={this.props.informe.informe}
          postInforme={this.props.postInforme}
          eliminarInforme={this.props.eliminarInforme}
        />
      );
    };

    const PrivateRoute = ({ component: Component, ...rest }) => (
      <Route
        {...rest}
        render={(props) =>
          this.props.auth.isAuthenticated ? (
            <div>
              <Header
                auth={this.props.auth}
                logoutUser={this.props.logoutUser}
              />
              <Component {...props} />
            </div>
          ) : (
            <Redirect
              to={{
                pathname: "/login",
                state: { from: props.location },
              }}
            />
          )
        }
      />
    );

    return (
      <div>
        <Switch>
          <Route
            path="/principal"
            component={() => (
              <Principal
                loginUser={this.props.loginUser}
                auth={this.props.auth}
                fetchAuditorias={this.props.fetchAuditorias}
                registerUser={this.props.registerUser}
                userRegister={this.props.userRegister}
              />
            )}
          />
          <PrivateRoute
            exact
            path="/misAuditorias"
            component={() => (
              <MisAuditorias
                auditorias={this.props.auditorias}
                postAuditoria={this.props.postAuditoria}
                eliminarAuditoria={this.props.eliminarAuditoria}
                actualizarAuditoria={this.props.actualizarAuditoria}
                onClick={(auditoriaId) => this.onAuditoriaSelect(auditoriaId)}
              />
            )}
          />
          <Route path="/enviarInforme" component={() => <EnviarInforme />} />
          <PrivateRoute path="/informe/:itemId" component={ItemWithId} />
          <PrivateRoute
            path="/misAuditorias/:auditoriaId"
            component={AuditoriaWithId}
          />
          <PrivateRoute
            exact
            path="/informe"
            component={() => (
              <NavInforme
                informe={this.props.informe}
                postItem={this.props.postItem}
                auditoriaId={this.state.auditoriaId}
              />
            )}
          />
          {this.props.auth.isAuthenticated ? (
            <Redirect to="/misAuditorias" />
          ) : (
            <Redirect to="/principal" />
          )}
        </Switch>
      </div>
    );
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));
