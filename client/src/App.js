import React from 'react';
import indexRoutes from './routes';
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import { Provider } from "react-redux";
import { configureStore } from "./redux/store";
import Blanklayout from './layouts/blanklayout';

import { getUser } from './helpers/authentication';

class AuthRoute extends React.Component {
    state = {
        currentUser: null
    }

    async componentDidMount() {
        const currentUser = await getUser();
        this.setState({ currentUser });
    }

    render() {
        const { component: Component, ...props } = this.props;

        if (this.state.currentUser === null) {
            return (
                <></>
            )
        } else if (!this.state.currentUser) {
            return (
                <Route {...props}>
                    <Redirect to={{ pathname: '/authentication/login', state: { from: props.location } }} />
                </Route>
            )
        } else {
            return (
                <Route {...props}>
                    <Component {...props} />
                </Route>
            )
        }
    }
}

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
