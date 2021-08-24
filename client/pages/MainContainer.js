import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { CssBaseline, AppBar, Toolbar, Paper, Stepper, Step, StepLabel, Button, Link, Typography } from '@material-ui/core';
import FirstStep from './FirstStep';
import SecondStep from './SecondStep';
import ThirdStep from './ThirdStep';
import axios from "axios";

function Copyright() {
	return (
		<Typography variant="body2" color="textSecondary" align="center">
			{'Copyright © '}
			<Link color="inherit" href="https://material-ui.com/">
				Your Website
			</Link>{' '}
			{new Date().getFullYear()}
			{'.'}
		</Typography>
	);
}

const useStyles = makeStyles((theme) => ({
	appBar: {
		position: 'relative',
	},
	layout: {
		width: 'auto',
		marginLeft: theme.spacing(2),
		marginRight: theme.spacing(2),
		[theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
			width: 600,
			marginLeft: 'auto',
			marginRight: 'auto',
		},
	},
	paper: {
		marginTop: theme.spacing(3),
		marginBottom: theme.spacing(3),
		padding: theme.spacing(2),
		[theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
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

const steps = ['Natychmiastowa pomoc', 'Rodzaj zdarzenia i dane kontaktowe', 'Podsumowanie'];

export default function MainContainer() {

	const [data, setData] = React.useState({});

	const handleData = (newData) => {
		const currentData = {...data, ...newData};
		setData(currentData);
		console.log(currentData);
	};

	const handleDataReset = () => {
		setData({});
	};

	if (data.sendRequest) {
		data.sendRequest = false;
		axios.post('/api/emergency', {
			isFire: data.fireDeptRequired,
			isLifeDanger: data.rescueTeamRequired,
			type: data.type,
			phoneNumber: data.phone,
			address: data.address
		}).then((response) => {
			if (response.status === 200) {
				console.info('Zgłoszenie wysłane');
			} else {
				console.error('Błąd podczas wysyłania zgłoszenia: ' + response.data);
			}
		});
	}

	const getStepContent = (step) => {
		switch (step) {
		case 0:
			return <FirstStep onDataReceived={handleData} />;
		case 1:
			return <SecondStep onDataReceived={handleData} />;
		case 2:
			return <ThirdStep data={data} />;
		default:
			throw new Error('Unknown step');
		}
	};

	const classes = useStyles();
	const [activeStep, setActiveStep] = React.useState(0);
	const [error, setError] = React.useState('');

	const handleNext = () => {
		const validation = () => {
			const mandatoryKeys = ["type", "address"];
			for (const key of mandatoryKeys) {
				if (!Object.keys(data).includes(key)) {
					return false;
				}
			}
			const MIN_KEYS_COUNT = 2;
			let keys = 0;
			for (const key of Object.keys(data)) {
				keys++;
				if (key === "phone" && !data[key].match("^[0-9]{0}|[0-9]{9}$")) {
					setError("Nieprawidłowy numer telefonu");
					return false;
				}
				if (data[key].length < 1) {
					setError("Nie wypełniono wszystkich wymaganych danych");
					return false;
				}
			}
			return keys >= MIN_KEYS_COUNT;
		};
		if (activeStep !== 1 || validation()) {
			if (activeStep === 2) {
				axios.post('/api/emergency', {
					status: 'Otwarte',
					address: data.address,
					type: data.type,
					isFire: data.fireDeptRequired,
					isLifeDanger: data.rescueTeamRequired,
					phoneNumber: data.phone
				});
			}
			setError("");
			setActiveStep(activeStep + 1);
		}
	};

	const handleBack = () => {
		setActiveStep(activeStep - 1);
	};

	const handleStart = () => {
		handleDataReset();
		setActiveStep(0);
	};

	return (
		<React.Fragment>
			<CssBaseline />
			<AppBar position="absolute" color="default" className={classes.appBar}>
				<Toolbar>
					<Typography variant="h6" color="inherit" noWrap>
						Centrum Ratunkowe
					</Typography>
				</Toolbar>
			</AppBar>
			<main className={classes.layout}>
				<Paper className={classes.paper}>
					<Typography component="h1" variant="h4" align="center">
						Zgłoś zdarzenie
					</Typography>
					<Stepper activeStep={activeStep} className={classes.stepper}>
						{steps.map((label) => (
							<Step key={label}>
								<StepLabel>{label}</StepLabel>
							</Step>
						))}
					</Stepper>
					<React.Fragment>
						{activeStep === steps.length ? (
							<React.Fragment>
								<Typography variant="h5" gutterBottom>
									Dziękujemy za zgłoszenie.
								</Typography>
								<Typography variant="subtitle1">
									Zostało nam już przekazane, niedługo skontaktuje się z Tobą operator w celu ustalenia szczegółów zdarzenia.
								</Typography>
								<Button
									variant="contained"
									color="primary"
									onClick={handleStart}
									className={classes.button}
								>
									Powrót
								</Button>
							</React.Fragment>
						) : (
							<React.Fragment>
								{getStepContent(activeStep)}
								{error && <Typography
									color="error"
									align="center"
									display="block"
								>
									{error}
								</Typography>}
								<div className={classes.buttons}>
									{activeStep !== 0 && (
										<Button onClick={handleBack} className={classes.button}>
											Wróć
										</Button>
									)}
									<Button
										variant="contained"
										color="primary"
										onClick={handleNext}
										className={classes.button}
									>
										{activeStep === steps.length - 1 ? 'Zgłoś zdarzenie' : 'Dalej'}
									</Button>
								</div>
							</React.Fragment>
						)}
					</React.Fragment>
				</Paper>
				<Copyright />
			</main>
		</React.Fragment>
	);
}