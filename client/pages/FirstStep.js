import React from 'react';
import { Grid, Typography, FormControlLabel, Checkbox } from '@material-ui/core';

export default function FirstStep(props) {
	return (
		<React.Fragment>
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