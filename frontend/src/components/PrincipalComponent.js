import React, { useState } from 'react';
import { Row, Nav, NavLink, NavItem, TabContent, TabPane, Col } from 'reactstrap';
import classnames from 'classnames';
import Register from './Register';
import Login from './Login';

const Principal = (props) => {
    const [activeTab, setActiveTab] = useState('1');

    const toggle = (tab) => {
        if (activeTab !== tab) setActiveTab(tab);
    }

    return (
        <div className="fondo">
            <div className="imagen">
                <div className="container">
                    <div className="row row-content">
                        <div className="col-1 col-md-6"></div>
                        <div className="col-12 col-md-6">
                            <Nav tabs>
                                <NavItem>
                                    <NavLink
                                        className={classnames({ active: activeTab === '1' })}
                                        onClick={() => { toggle('1'); }}
                                    >
                                        Inicia Sesión
                                 </NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink
                                        className={classnames({ active: activeTab === '2' })}
                                        onClick={() => { toggle('2'); }}
                                    >
                                        Registrarse
                                </NavLink>
                                </NavItem>
                            </Nav>
                            <TabContent activeTab={activeTab}>
                                <TabPane tabId="1">
                                    <Row>
                                        <Col sm={12}>
                                            <Login loginUser={props.loginUser} auth={props.auth} fetchAuditorias={props.fetchAuditorias} userRegister={props.userRegister}/>
                                        </Col>
                                    </Row>
                                </TabPane>
                                <TabPane tabId="2">
                                    <Row>
                                        <Col sm={12}>
                                            <Register registerUser={props.registerUser} />
                                        </Col>
                                    </Row>
                                </TabPane>
                            </TabContent>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Principal;