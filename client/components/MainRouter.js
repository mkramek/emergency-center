import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Auth, MainContainer, Panel } from "../pages";

export default function MainRouter(props) {
	return (
		<Router>
			<Switch>
				<Route
					path={'/login'}
					component={Auth}
				/>
				<Route
					path={'/logout'}
					component={Auth}
				/>
				<Route
					path={'/panel'}
					component={Panel}
				/>
				<Route
					path={'/'}
					component={MainContainer}
				/>
			</Switch>
		</Router>
	)
}