import React from 'react';
import {useRouteMatch, Redirect, useLocation} from 'react-router-dom';
import { Container, CssBaseline, Avatar, Typography, TextField, Button, makeStyles } from '@material-ui/core';
import { LockOutlined as LockOutlinedIcon } from "@material-ui/icons";
import axios from "axios";

const useStyles = makeStyles((theme) => ({
	paper: {
		marginTop: theme.spacing(8),
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
	},
	avatar: {
		margin: theme.spacing(1),
		backgroundColor: theme.palette.secondary.main,
	},
	form: {
		width: '100%', // Fix IE 11 issue.
		marginTop: theme.spacing(1),
	},
	submit: {
		margin: theme.spacing(3, 0, 2),
	},
}));

export default function Auth(props) {
	const classes = useStyles();
	const [login, setLogin] = React.useState('');
	const [password, setPassword] = React.useState('');
	const [error, setError] = React.useState('');
	const handleAuth = (ev) => {
		ev.preventDefault();
		axios.post('/api/auth', {
			email: login,
			password: password,
		}).then((res) => {
			if (res.data.error) {
				setError(res.data.message);
			} else {
				const user = {
					id: res.data.id,
					login: res.data.login,
					name: `${res.data.firstName} ${res.data.lastName}`
				};
				localStorage.setItem('user', JSON.stringify(user));
				window.location.reload();
			}
		});
	};
	const location = useLocation();
	const query = new URLSearchParams(location.search);
	const isLogin = useRouteMatch('/login');
	const isLogout = useRouteMatch('/logout');
	const user = JSON.parse(localStorage.getItem('user'));
	if (user !== null) {
		if (isLogout) {
			console.log("LOGOUT");
			localStorage.removeItem('user');
			return <Redirect to={'/login'} />;
		} else if (isLogin) {
			console.log("LOGIN");
			return <Redirect to={'/panel'} />
		}
	} else {
		if (isLogout) {
			return <Redirect to={'/login'} />
		} else {
			return (
				<Container component="main" maxWidth="xs">
					<CssBaseline />
					<div className={classes.paper}>
						<Avatar className={classes.avatar}>
							<LockOutlinedIcon />
						</Avatar>
						<Typography component="h1" variant="h5">
							Zaloguj się
						</Typography>
						<form className={classes.form} noValidate>
							<TextField
								variant="outlined"
								margin="normal"
								required
								fullWidth
								id="email"
								label="Adres email"
								name="email"
								autoComplete="email"
								autoFocus
								onChange={(ev) => {
									setLogin(ev.target.value)
								}}
							/>
							<TextField
								variant="outlined"
								margin="normal"
								required
								fullWidth
								name="password"
								label="Hasło"
								type="password"
								id="password"
								autoComplete="current-password"
								onChange={(ev) => {
									setPassword(ev.target.value)
								}}
							/>
							<Button
								type="submit"
								fullWidth
								variant="contained"
								color="primary"
								className={classes.submit}
								onClick={handleAuth}
							>
								Zaloguj się
							</Button>
						</form>
					</div>
				</Container>
			);
		}
	}
}
