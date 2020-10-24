import React from 'react';
import {BrowserRouter as Router, Route, Switch, Redirect} from 'react-router-dom';
import {ThemeProvider} from '@material-ui/core/styles';
import {theme} from './theme';
import {Home} from './pages/home';
export const App = () => {
	return (
    <ThemeProvider theme={theme}>
			<Router>
					<Switch>
						<Redirect exact from="/" to="/home" />
						<Route exact path="/home" component={Home} />
					</Switch>
			</Router>
    </ThemeProvider>
	);
};
