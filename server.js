const path = require('path');
const express = require('express');
const server = express();
const routes = require('./routes');
const env = process.env.NODE_ENV || 'development';
const db = require('./models');

const PORT = process.env.PORT || 5000;
const route = {
	ROOT: '/',
	ALL: '*'
};

server.use(express.json());
server.use(express.static(path.join(__dirname, 'client', 'dist')));
server.use(route.ROOT, routes.emergencyType);
server.use(route.ROOT, routes.emergency);
server.use(route.ROOT, routes.dispatcher);
server.use(route.ROOT, routes.auth);
server.use((req, res) => {
	res.sendFile('index.html', { root: path.join(__dirname, 'client', 'dist') });
});

server.listen(PORT, () => {
	console.info(`Server runs on port ${PORT} in ${env} mode.`);
});

db.sequelize.sync({ force: true }).then(() => {
	console.log("Database synchronised");

	const { Dispatcher, EmergencyType } = db;
	Dispatcher.create({
		firstName: 'Jan',
		lastName: 'Kowalski',
		email: 'jan.kowalski@112.pl',
		password: '112'
	});

	Dispatcher.create({
		firstName: 'Kamil',
		lastName: 'Nowak',
		email: 'kamil.nowak@112.pl',
		password: '112'
	});

	const defaultEmergencyTypes = [
		'Powódź',
		'Tornado',
		'Rozległy pożar terenu',
		'Trzęsienie ziemi',
		'Susza',
		'Tsunami',
		'Wybuch wulkanu',
		'Ekstremalny upał',
		'Ekstremalny mróz',
		'Wybuch meteorytu',
		'Upadek meteorytu',
		'Lawina śnieżna',
		'Tsunami',
		'Huragan',
		'Osuwisko ziemi'
	];

	for (const type of defaultEmergencyTypes) {
		EmergencyType.create({
			name: type || '',
			image: ''
		});
	}
});