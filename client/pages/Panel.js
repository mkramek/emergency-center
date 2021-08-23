import React from 'react';
import axios from 'axios';
import {
	Typography,
	CssBaseline,
	AppBar,
	Toolbar,
	Paper,
	Button,
	Link,
	Table,
	TableHead,
	TableBody,
	TableRow,
	TableCell,
	makeStyles
} from "@material-ui/core";
import { Redirect } from "react-router";

export default function Panel(props) {
	const [emergencies, setEmergencies] = React.useState([]);
	const [emergencyTypes, setEmergencyTypes] = React.useState([]);
	const [dispatchers, setDispatchers] = React.useState([]);
	const [redirectToAuth, setRedirectToAuth] = React.useState(false);

	const Status = {
		RESOLVED: "Zamknięte",
		IN_PROGRESS: "W trakcie",
		OPENED: "Otwarte"
	};

	React.useEffect(() => {
		const user = JSON.parse(localStorage.getItem('user'));
		if (!user) {
			setRedirectToAuth(true);
		} else {
			console.log(user);
		}
	}, []);

	React.useEffect(() => {
		axios.get('/api/emergency/type').then((res) => {
			setEmergencyTypes(res.data);
		}).then(() => {
			axios.get('/api/dispatcher').then((res) => {
				setDispatchers(res.data);
			}).then(() => {
				axios.get('/api/emergency').then((res) => {
					setEmergencies(res.data);
				});
			});
		});
	}, []);

	if (redirectToAuth) {
		return <Redirect to={'/login'} />
	}

	const useStyles = makeStyles((theme) => ({
		appBar: {
			position: 'relative',
		},
		layout: {
			width: '100%',
			marginLeft: 'auto',
			marginRight: 'auto',
		},
		paper: {
			marginTop: theme.spacing(3),
			marginBottom: theme.spacing(3),
			padding: theme.spacing(2),
			[theme.breakpoints.up(800 + theme.spacing(3) * 2)]: {
				marginTop: theme.spacing(6),
				marginBottom: theme.spacing(6),
				padding: theme.spacing(3),
			},
		},
		stepper: {
			padding: theme.spacing(3, 0, 5),
		},
		buttons: {
			display: 'flex',
			justifyContent: 'flex-end',
		},
		button: {
			marginTop: theme.spacing(3),
			marginLeft: theme.spacing(1),
		},
	}));

	const classes = useStyles();
	const user = JSON.parse(localStorage.getItem('user'));
	if (!user) {
		return <Redirect to={'/login'} />;
	}

	const updateStatus = (id, status) => event => {
		const dispatcherId = JSON.parse(localStorage.getItem('user')).id;
		axios.put(`/api/emergency/${id}`, {
			status: status,
			dispatcher: dispatcherId
		}).then((res) => {
			window.location.reload();
		});
	};

	const getTypeById = (id) => {
		const type = emergencyTypes.filter((type) => {
			return type.id === id;
		});
		return type[0].name;
	};

	const getDispatcherById = (id) => {
		if (id === null) return "";
		const dispatcher = dispatchers.filter((dispatcher) => {
			return dispatcher.id === id;
		})[0];
		return `${dispatcher.firstName} ${dispatcher.lastName}`;
	};

	return (
		<React.Fragment>
			<CssBaseline />
			<AppBar position="absolute" color="default" className={classes.appBar}>
				<Toolbar style={{ justifyContent: 'space-between' }}>
					<Typography variant="h6" color="inherit" noWrap>
						Centrum Ratunkowe - Panel
					</Typography>
					<Typography variant={"subtitle1"}>{user.name} - <Link href={'/logout'} color={'error'}>Wyloguj</Link></Typography>
				</Toolbar>
			</AppBar>
			<main className={classes.layout}>
				<Paper className={classes.paper}>
					<React.Fragment>
						<Table size="small">
							<TableHead>
								<TableRow>
									<TableCell>Data zgłoszenia</TableCell>
									<TableCell>Typ</TableCell>
									<TableCell>Lokalizacja</TableCell>
									<TableCell>Straż pożarna?</TableCell>
									<TableCell>Pogotowie rat.?</TableCell>
									<TableCell>Status</TableCell>
									<TableCell>Dyspozytor</TableCell>
									<TableCell>Zmiana statusu</TableCell>
								</TableRow>
							</TableHead>
							<TableBody>
								{emergencies.length === 0 &&
									<TableRow>
										<TableCell colSpan={8}>Brak zgłoszeń.</TableCell>
									</TableRow>
								}
								{emergencies.map((emergency) => {
									const type = getTypeById(emergency.type);
									const dispatcher = getDispatcherById(emergency.dispatcher);
									return (
										<TableRow key={emergency.id}>
											<TableCell>{emergency.createdAt}</TableCell>
											<TableCell>{type}</TableCell>
											<TableCell>{emergency.address}</TableCell>
											<TableCell>{emergency.isFire ? "Tak" : "Nie"}</TableCell>
											<TableCell>{emergency.isLifeDanger ? "Tak" : "Nie"}</TableCell>
											<TableCell>{emergency.status}</TableCell>
											<TableCell>{dispatcher}</TableCell>
											<TableCell>
												<Button disabled={emergency.status === Status.RESOLVED} onClick={updateStatus(emergency.id, Status.IN_PROGRESS)}
													color={"primary"}>{Status.IN_PROGRESS}</Button>
												<Button disabled={emergency.status === Status.RESOLVED} onClick={updateStatus(emergency.id, Status.RESOLVED)}
													color={"secondary"}>{Status.RESOLVED}</Button>
											</TableCell>
										</TableRow>
									)
								})}
							</TableBody>
						</Table>
					</React.Fragment>
				</Paper>
			</main>
		</React.Fragment>
	);
}