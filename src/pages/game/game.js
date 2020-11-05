import React, {useEffect, useState} from 'react';
import {Button, CssBaseline, TextField, Grid, Box, Container, CircularProgress} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';
import {useHistory, useLocation} from 'react-router-dom';
import ReactStars from 'react-rating-stars-component';

/* import {AnimatedText} from '../../assets/style/AnimatedText';
import {toast} from 'react-toastify'; */
import 'react-toastify/dist/ReactToastify.css';

const useStyles = makeStyles((theme) => ({
	paper: {
		marginTop: theme.spacing(6),
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		padding: '4%',
		paddingBottom: '2%',
		marginBottom: theme.spacing(6),
	},
	submit: {
		alignContent: 'center',
		margin: theme.spacing(2, 0, 2),
		color: 'white',
	},
	gap: {
		margin: theme.spacing(2, 0, 2),
	},
}));

const notify_object = {
	position: 'bottom-center',
	autoClose: 5000,
	hideProgressBar: false,
	closeOnClick: true,
	pauseOnHover: true,
	draggable: true,
	progress: undefined,
};

export const Game = (props) => {
	const location = useLocation();

	const classes = useStyles();

	//setting the value of the joke to be send
	const [message, setMessage] = useState('');

	//display the joke if receiving
	const [jokeRec, setJokeRec] = useState('');

	//show waiting if send the joke
	const [jokeSen, setJokeSen] = useState(0);

	//set all the clients connected in the room
	const [myRoom, setMyRoom] = useState([]);

	//set the rating to be send for a specific round
	const [rating, setRating] = useState(0);

	//initial waiting time
	const [start, setStart] = useState(0);

	//used for showing the joke
	const [modal, setModal] = useState(0);

	const [status, setStatus] = useState(0);

	//set the socket id of the current client to ckeck the active user
	const [id, setId] = useState(0);

	//overall rating storing array of the different rounds
	const [points, setPoints] = useState([]);

	//check if user is active
	const [activeUser, setActiveUser] = useState(0);

	//render content depending on user type
	const [userType, setUserType] = useState('passive');

	/* let history = useHistory(); */

	useEffect(() => {
		setTimeout(() => {
			setStart(1);
			setId(props.socket.id);
		}, 5000);
		setMyRoom(location.state.myRoom);
	}, []);

	useEffect(() => {
		if (myRoom.length !== 0 && id !== 0) {
			props.socket.emit('setActive', {room: myRoom.players, points: points, RoomId: myRoom.RoomId});
			props.socket.on('ActiveUser', (data) => {
				setActiveUser(data.activeUser);
				if (id == data.activeUser) {
					setUserType('active');
				}
			});
		}

		if (modal === 0) {
			setModal(1);
			props.socket.on('sentJoke', (data) => {
				setJokeRec(data.joke);
				setStatus(1);
			});
		}

		props.socket.on('UpdatedRating', (data) => {
			setPoints(data.points);
		});
	});

	const sendMessage = () => {
		if (message !== '') {
			setJokeSen(1);
			props.socket.emit('handleJoke', {joke: message, RoomId: myRoom.RoomId});
		}
	};

	const sendRating = () => {
		points.push(rating);
		props.socket.emit('UpdateRating', {points: points, RoomId: myRoom.RoomId});
	};

	return (
		<Container component="main">
			<CssBaseline />
			{start === 0 ? (
				<Grid
					container
					spacing={0}
					direction="column"
					alignItems="center"
					justify="center"
					style={{minHeight: '100vh'}}>
					<Grid item xs={3}>
						<CircularProgress color="primary" />
					</Grid>
				</Grid>
			) : userType == 'active' ? (
				jokeSen === 0 ? (
					<Box className={classes.paper} boxShadow={3} bgcolor="rgba(255, 255, 255, 0.67)">
						<Grid container spacing={1} direction="column" alignItems="center" justify="center">
							<TextField
								onChange={(e) => {
									setMessage(e.target.value);
								}}
								label="Enter something funny"
								multiline
								rows={4}
								id="filled-margin-normal"
								defaultValue=""
								margin="normal"
								variant="filled"
								color="secondary"
							/>
							<Button
								onClick={sendMessage}
								size="medium"
								type="submit"
								variant="contained"
								color="primary"
								className={classes.submit}>
								Send Message
							</Button>
						</Grid>
					</Box>
				) : (
					<Grid
						container
						spacing={0}
						direction="column"
						alignItems="center"
						justify="center"
						style={{minHeight: '100vh'}}>
						<Grid item xs={3}>
							<CircularProgress color="primary" />
						</Grid>
						Waiting for people to send their vote
					</Grid>
				)
			) : userType === 'passive' ? (
				jokeRec === '' ? (
					<Grid
						container
						spacing={0}
						direction="column"
						alignItems="center"
						justify="center"
						style={{minHeight: '100vh'}}>
						<Grid item xs={3}>
							<CircularProgress color="primary" />
						</Grid>
						Waiting for the message
					</Grid>
				) : (
					<Box className={classes.paper} boxShadow={3} bgcolor="rgba(255, 255, 255, 0.67)">
						<Grid container spacing={1} direction="column" alignItems="center" justify="center">
							<TextField
								id="standard-multiline-flexible"
								label="the joke"
								multiline
								rowsMax={4}
								value={jokeRec}
								disabled
							/>
							<ReactStars
								count={10}
								onChange={(newRating) => setRating(newRating)}
								size={50}
								isHalf={true}
								emptyIcon={<i className="far fa-star"></i>}
								halfIcon={<i className="fa fa-star-half-alt"></i>}
								fullIcon={<i className="fa fa-star"></i>}
								activeColor="#ffd700"
							/>
							<Button
								onClick={sendRating}
								size="medium"
								type="submit"
								variant="contained"
								color="primary"
								className={classes.submit}>
								Rate the joke
							</Button>
						</Grid>
					</Box>
				)
			) : null}
		</Container>
	);
};
