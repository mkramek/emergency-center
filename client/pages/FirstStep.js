import React from 'react';
import { Grid, Typography, FormControlLabel, Checkbox, Radio, RadioGroup, Divider } from '@material-ui/core';

export default function FirstStep(props) {
	const [issuerNeedsHelp, setIssuerNeedsHelp] = React.useState(null);
	return (
		<React.Fragment>
			<Typography variant="h6" gutterBottom>
				Czy potrzebujesz pomocy?
			</Typography>
			<Grid container spacing={3}>
				<Grid item xs={12}>
					<RadioGroup
						name="issuerNeedsHelp"
						value={issuerNeedsHelp}
						onChange={(ev) => {
							setIssuerNeedsHelp(ev.target.value);
							props.onDataReceived({ issuerNeedsHelp: ev.target.value === "yes" });
						}}
					>
						<FormControlLabel value="yes" control={<Radio />} label="Tak" />
						<FormControlLabel value="no" control={<Radio />} label="Nie" />
					</RadioGroup>
				</Grid>
			</Grid>
			<Divider />
			<Typography variant="h6" gutterBottom>
				Czy wymagana jest pomoc jednostek:
			</Typography>
			<Grid container spacing={3}>
				<Grid item xs={12}>
					<FormControlLabel
						control={
							<Checkbox
								onChange={(ev) => {
									props.onDataReceived({ fireDeptRequired: ev.target.checked })
								}}
								color="secondary"
								name="fireDept"
								value="true"
							/>
						}
						label="Straży pożarnej?"
					/>
				</Grid>
				<Grid item xs={12}>
					<FormControlLabel
						control={
							<Checkbox
								onChange={(ev) => {
									props.onDataReceived({ rescueTeamRequired: ev.target.checked })
								}}
								color="secondary"
								name="rescueTeam"
								value="true"
							/>
						}
						label="Pogotowia ratunkowego?"
					/>
				</Grid>
			</Grid>
		</React.Fragment>
	);
}