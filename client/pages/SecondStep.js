import React, { useState, useEffect } from 'react';
import { makeStyles } from "@material-ui/core/styles";
import { Typography, Grid, TextField, FormControlLabel, Checkbox, InputLabel, FormControl, Select, MenuItem } from '@material-ui/core';
import axios from 'axios';

const useStyles = makeStyles((theme) => ({
	formControl: {
		margin: theme.spacing(1),
		minWidth: 120,
	},
	selectEmpty: {
		marginTop: theme.spacing(2),
	},
}));

export default function SecondStep(props) {

	const classes = useStyles();
	const [type, setType] = useState('');
	const [types, setTypes] = useState([]);
	const [manualLocation, setManualLocation] = useState(false);

	const handleTypeChange = (event) => {
		setType(event.target.value);
		props.onDataReceived({ type: event.target.value });
	};

	useEffect(() => {
		axios.get('/api/emergency/type').then((res) => {
			const { data } = res;
			setTypes(data);
		});
	}, []);

	useEffect(() => {
		if ("geolocation" in navigator) {
			navigator.geolocation.getCurrentPosition((pos) => {
				props.onDataReceived({ address: `${pos.coords.latitude},${pos.coords.longitude}` })
			});
		} else {
			setManualLocation(true);
		}
	}, []);

	return (
		<React.Fragment>
			<Typography variant="h6" gutterBottom>
				Rodzaj zdarzenia
			</Typography>
			<Grid container spacing={3}>
				<Grid item xs={12} md={6}>
					<FormControl required variant="outlined" fullWidth={true} className={classes.formControl}>
						<Select
							id="emergencyType"
							value={type}
							onChange={handleTypeChange}
						>
							<MenuItem value="">
								<em>-</em>
							</MenuItem>
							{types.map((type) => {
								return <MenuItem key={type.id} value={type.id}><em>{type.name}</em></MenuItem>
							})}
						</Select>
					</FormControl>
				</Grid>
			</Grid>
			<Typography variant="h6" gutterBottom>
				Dane kontaktowe
			</Typography>
			<Grid container spacing={3}>
				<Grid item xs={12}>
					<TextField
						required
						id="phoneNumber"
						label="Nr telefonu"
						fullWidth
						autoComplete="phone"
						onChange={(event) => {
							props.onDataReceived({ phone: event.target.value });
						}}
					/>
				</Grid>
				<Grid item xs={12}>
					<FormControlLabel
						control={
							<Checkbox
								onChange={(ev) => {
									props.onDataReceived({ manualLocation: ev.target.checked })
									setManualLocation(ev.target.checked)
								}}
								color="primary"
								name="manualLocation"
								value="true"
							/>
						}
						label="Wpiszę lokalizację ręcznie"
					/>
				</Grid>
				<Grid item xs={12}>
					<TextField
						id="address"
						label="Adres zdarzenia"
						fullWidth
						onChange={(event) => {
							props.onDataReceived({ address: event.target.value });
						}}
						disabled={!manualLocation}
					/>
				</Grid>
			</Grid>
		</React.Fragment>
	);
}