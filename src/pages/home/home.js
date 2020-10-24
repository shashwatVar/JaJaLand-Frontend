import React from 'react';
import {CssBaseline, Container} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
	paper: {
		marginTop: theme.spacing(6),
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		padding: '4%',
		paddingBottom: '2%',
		marginBottom: theme.spacing(6),
	}
}));

export const Home = () => {
	const classes = useStyles();

	return (
		<Container component="main" className={classes.paper}>
			<CssBaseline />
            HOME
		</Container>
	);
};