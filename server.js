const path = require('path');
const express = require('express');
const server = express();
const routes = require('./routes');
const env = process.env.NODE_ENV || 'development';
const db = require('./models');

const PORT = process.env.PORT || 5000;
const ROOT = '/';

server.use(express.json());
server.use(ROOT, routes.emergencyType);
server.use(ROOT, routes.emergency);
server.use(ROOT, routes.dispatcher);
server.use(ROOT, express.static(path.join(__dirname, 'client', 'dist')));

server.listen(PORT, () => {
	console.info(`Server runs on port ${PORT} in ${env} mode.`);
});

db.sequelize.sync({ force: true, logging: console.log }).then(() => {
	console.log("Database synchronised");
	const { Dispatcher, EmergencyType } = db;
	Dispatcher.create({
		firstName: 'Jan',
		lastName: 'Kowalski',
		email: 'jan.kowalski@112.pl',
		password: '112'
	});
	const defaultEmergencyTypes = [
		'Pożar',
		'Powódź',
		'Trzęsienie ziemi',
		'Huragan',
		'Tornado',
		'Lawina',
		'Zamieć',
		'Susza',
		'Burza piaskowa',
		'Fala upałów',
		'Tsunami',
		'Cyklon'
	];
	for (const type of defaultEmergencyTypes) {
		EmergencyType.create({
			name: type || '',
			image: ''
		});
	}
});