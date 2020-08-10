import React, { Component } from 'react';
import NavInforme from './NavInformeComponent';
import { ITEMS } from '../shared/items';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';

class Main extends Component {

    constructor(props) {
        super(props);

        this.state = {
            items: ITEMS
        }
    }

    render() {

        const ItemWithId = ({ match }) => {
            return (
               /* <DishDetail dish={this.props.items.filter((item) => item.id === parseInt(match.params.itemId, 10))[0]} />*/
               <div></div>
            );
        }
        
        return (
            <div>
                <NavInforme items={this.state.items} />
                <Switch>
                    <Route path="/item/:itemId" component={ItemWithId} />
                </Switch>
            </div>
        );
    }
}

export default Main;