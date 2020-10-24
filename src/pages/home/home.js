import React, {useEffect} from 'react';
import {initiateSocket} from /*disconnectSocket*/ '../../sockets/sockets';
import {Button, CssBaseline, TextField, Grid, Box, Divider, Container} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';

import {AnimatedText} from '../../assets/style/AnimatedText';

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
	input_label: {
		color: 'whitesmoke',
	},
}));

export const Home = () => {
	const classes = useStyles();

	useEffect(() => {
		initiateSocket();
	}, []);

	return (
		<Container component="main">
			<CssBaseline />
			<Container maxWidth="sm">
				<Grid container direction="column" alignItems="center" justify="center">
					<AnimatedText textColor="white" overlayColor="#03A9F4">
						JaJaLand
					</AnimatedText>
				</Grid>

				<Box className={classes.paper} boxShadow={3} bgcolor="rgb(60, 60, 60)">
					<Grid container spacing={1} direction="column" alignItems="center" justify="center">
						<Button
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
							label="Room Id"
							id="filled-margin-normal"
							defaultValue="Enter Room Id"
							margin="normal"
							variant="filled"
							size="small"
							color="secondary"
						/>
						<Button
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
		</Container>
	);
};
