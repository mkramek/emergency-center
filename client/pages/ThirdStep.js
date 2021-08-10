import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import axios from "axios";

const useStyles = makeStyles((theme) => ({
	listItem: {
		padding: theme.spacing(1, 0),
	},
	total: {
		fontWeight: 700,
	},
	title: {
		marginTop: theme.spacing(2),
	},
}));

export default function ThirdStep(props) {
	const { data } = props;
	const classes = useStyles();
	const [emergencyTypeName, setEmergencyTypeName] = React.useState();

	useEffect(() => {
		axios.get(`/api/emergency/type/${data.type}`).then((res) => {
			const emergType = res.data;
			setEmergencyTypeName(emergType.name);
		});
	}, []);

	return (
		<React.Fragment>
			<Typography variant="h6" gutterBottom>
				Podsumowanie
			</Typography>
			<List disablePadding>
				<ListItem className={classes.listItem}>
					<ListItemText primary="Zgłaszający potrzebuje pomocy" />
					<Typography variant="subtitle1" className={classes.total}>
						{data.issuerNeedsHelp ? 'Tak' : 'Nie'}
					</Typography>
				</ListItem>
				<ListItem className={classes.listItem}>
					<ListItemText primary="Typ zgłoszenia" />
					<Typography variant="subtitle1" className={classes.total}>
						{emergencyTypeName}
					</Typography>
				</ListItem>
				<ListItem className={classes.listItem}>
					<ListItemText primary="Potrzebne jednostki" />
					<Typography variant="subtitle1" className={classes.total}>
						{data.fireDeptRequired || data.rescueTeamRequired ? '' : 'Brak'}
						{data.fireDeptRequired ? 'Straż pożarna\n' : ''}
						{data.rescueTeamRequired ? 'Pogotowie ratunkowe\n' : ''}
					</Typography>
				</ListItem>
				<ListItem className={classes.listItem}>
					<ListItemText primary="Adres zgłoszenia" />
					<Typography variant="subtitle1" className={classes.total}>
						{data.address}
					</Typography>
				</ListItem>
				<ListItem className={classes.listItem}>
					<ListItemText primary="Imię i nazwisko zgłaszającego" />
					<Typography variant="subtitle1" className={classes.total}>
						{`${data.firstName} ${data.lastName}`}
					</Typography>
				</ListItem>
				<ListItem className={classes.listItem}>
					<ListItemText primary="Numer kontaktowy" />
					<Typography variant="subtitle1" className={classes.total}>
						{data.phone}
					</Typography>
				</ListItem>
			</List>
		</React.Fragment>
	);
}