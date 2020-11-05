import React from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import {ThemeProvider} from '@material-ui/core/styles';
import io from 'socket.io-client';
import {ToastContainer} from 'react-toastify';
import {theme} from './theme';
import {Home} from './pages/home';
import {Game} from './pages/game';
import {SOCKET_URL} from './config';

let socket;
socket = io(SOCKET_URL);
console.log(`Connecting socket...`);
if (socket) socket.connect();

export const App = () => {
	return (
		<ThemeProvider theme={theme}>
			<ToastContainer
				position="bottom-center"
				autoClose={5000}
				hideProgressBar={false}
				newestOnTop={false}
				closeOnClick
				rtl={false}
				pauseOnFocusLoss
				draggable
				pauseOnHover
			/>

			{socket ? (
				<Router>
					<Switch>
						<Route exact path="/" component={() => <Home socket={socket} />} />
						<Route exact path="/game" component={() => <Game socket={socket} />} />
					</Switch>
				</Router>
			) : null}
		</ThemeProvider>
	);
};
