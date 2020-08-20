import React, { Component } from 'react';
import NavInforme from './NavInformeComponent';
import EditarInforme from './EditarInforme';
import Login from './Login';
import { loginUser, logoutUser, fetchAuditorias, loginUserGoogle } from '../redux/ActionCreators';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

const mapStateToProps = state => {
    return {
        items: state.items,
        auth: state.auth
    }
}

const mapDispatchToProps = dispatch => ({
    loginUser: (creds) => dispatch(loginUser(creds)),
    logoutUser: () => dispatch(logoutUser()),
    fetchAuditorias: () => dispatch(fetchAuditorias()),
    loginUserGoogle: () => dispatch(loginUserGoogle()),
});

class Main extends Component {

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
                    <Route path="/login" component={() => <Login loginUser={this.props.loginUser} auth={this.props.auth} loginUserGoogle={this.props.loginUserGoogle} />} />
                    <PrivateRoute path="/item/:itemId" component={ItemWithId} />
                    <Redirect to="/login" />
                </Switch>
            </div>
        );
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));