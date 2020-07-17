import React from 'react';
import indexRoutes from './routes';
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import { Provider } from "react-redux";
import { configureStore } from "./redux/store";
import Blanklayout from './layouts/blanklayout';

import { getUser } from './helpers/authentication';

const AuthRoute = ({ component: Component, ...props }) => (
    <Route {...props} render={props => {
        const currentUser = getUser();
        if (!currentUser) {
            return <Redirect to={{ pathname: '/authentication/login', state: { from: props.location } }} />
        }
        return <Component {...props} />
    }} />
)

class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            currentUser: null
        };
    }

    render() {
        return (
            <Provider store={configureStore()}>
                <Router basename="/">
                    <Switch>
                        <Route path="/authentication/login" component={Blanklayout} />;
                        {indexRoutes.map((prop, key) => {
                            return <AuthRoute path={prop.path} key={key} component={prop.component} />;
                        })
                        }
                    </Switch>
                </Router>
            </Provider>
        )
    }
}

export default App;
