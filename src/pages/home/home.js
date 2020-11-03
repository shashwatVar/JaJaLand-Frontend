import React, {useEffect, useState} from 'react';
import {
	Button,
	CssBaseline,
	TextField,
	Grid,
	Box,
	Divider,
	Container,
	List,
	ListItem,
	ListItemText,
} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';

import {AnimatedText} from '../../assets/style/AnimatedText';
import {toast} from 'react-toastify';
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

export const Home = (props) => {
	const classes = useStyles();
	const [name, setName] = useState('');
	const [room, setRoom] = useState('');
	const [activeRoom, setActiveRoom] = useState([]);
	const [myRoom, setMyRoom] = useState([]);
	const [render, setRender] = useState('home');

	useEffect(() => {
		props.socket.on('ActiveRooms', (data) => {
			setActiveRoom(data);
		});
	});

	const createRoom = () => {
		if (name) {
			let d = new Date();
			if (props.socket) {
				props.socket.emit('createRoom', {PlayerName: name, RoomId: d.getTime().toString()});
				props.socket.on('playerJoined', (data) => toast.dark(data, notify_object));
			}
			props.socket.on('MyRoom', (data) => {
				setMyRoom(data);
			});
			props.socket.on('ActiveRooms', (data) => {
				setActiveRoom(data);
			});
			setRender('lobby');
		} else {
			toast.dark('please enter a name', notify_object);
		}
	};

	const joinRoom = () => {
		if (name) {
			if (activeRoom.includes(room)) {
				if (props.socket) {
					props.socket.emit('joinRoom', {PlayerName: name, RoomId: room});
					props.socket.on('playerJoined', (data) => toast.dark(data, notify_object));
				}
				props.socket.on('MyRoom', (data) => {
					setMyRoom(data);
				});
				props.socket.on('ActiveRooms', (data) => {
					setActiveRoom(data);
				});
				setRender('lobby');
			} else {
				toast.dark('Room not available', notify_object);
			}
		} else {
			toast.dark('please enter a name', notify_object);
		}
	};

	return (
		<Container component="main">
			<CssBaseline />
			{render === 'home' ? (
				<Container maxWidth="sm">
					<Grid container direction="column" alignItems="center" justify="center">
						<AnimatedText textColor="white" overlayColor="#03A9F4">
							JaJaLand
						</AnimatedText>
					</Grid>

					<Box className={classes.paper} boxShadow={3} bgcolor="rgba(255, 255, 255, 0.67)">
						<Grid container spacing={1} direction="column" alignItems="center" justify="center">
							<TextField
								onChange={(e) => {
									setName(e.target.value);
								}}
								label="Enter Your Name"
								id="filled-margin-normal"
								margin="normal"
								variant="filled"
								color="primary"
								size="small"
							/>
							<Divider />
							<Button
								onClick={createRoom}
								size="medium"
								type="submit"
								variant="contained"
								color="primary"
								className={classes.submit}>
								{' '}
								Create Room{' '}
							</Button>

							<Divider />

							<TextField
								onChange={(e) => {
									setRoom(e.target.value);
								}}
								label="Room Id"
								id="filled-margin-normal"
								defaultValue="Enter Room Id"
								margin="normal"
								variant="filled"
								size="small"
								color="secondary"
							/>
							<Button
								onClick={joinRoom}
								size="medium"
								type="submit"
								variant="contained"
								color="primary"
								className={classes.submit}>
								Join Room
							</Button>
						</Grid>

						<Divider />
					</Box>
				</Container>
			) : (
				<Container maxWidth="sm">
					<Grid container direction="column" alignItems="center" justify="center">
						<AnimatedText textColor="white" overlayColor="#03A9F4">
							lobby
						</AnimatedText>
					</Grid>

					<Box className={classes.paper} boxShadow={3} bgcolor="rgba(255, 255, 255, 0.67)">
						<Grid container spacing={1} direction="column" alignItems="center" justify="center">
							<List dense className={classes.root}>
								{myRoom.map((room, index) => {
									const labelId = `checkbox-list-secondary-label`;
									return (
										<ListItem key={index} button>
											<ListItemText id={labelId} primary={room['name']} />
										</ListItem>
									);
								})}
							</List>
						</Grid>
					</Box>
				</Container>
			)}
		</Container>
	);
};
