const models = require('../models');
const { Emergency } = models;

const getEmergencies = (req, res) => {
	Emergency.findAll().then((emergencies) => {
		res.status(200).send(emergencies);
	});
};

const getEmergency = (req, res) => {
	Emergency.findOne({
		where: {
			id: req.params.id
		}
	}).then((emergency) => {
		res.status(!emergency ? 404 : 200).send(emergency || {});
	});
};

const createEmergency = (req, res) => {
	Emergency.create(req.body).then((emergency) => {
		res.status(!emergency ? 400 : 200).send(emergency || { message: 'Error while adding new emergency' });
	});
};

const updateEmergency = (req, res) => {
	Emergency.findOne({
		where: {
			id: req.params.id
		}
	}).then((emergency) => {
		emergency.update(req.body).then((updatedEmergency) => {
			res.status(!updatedEmergency ? 400 : 200).send(updatedEmergency || { message: 'Error while updating an emergency' });
		});
	});
};

const deleteEmergency = (req, res) => {
	Emergency.findOne({
		where: {
			id: req.params.id
		}
	}).then((emergency) => {
		emergency.destroy().then(() => {
			res.status(200).send({ message: `Deleted emergency with ID of ${req.params.id}` });
		});
	});
};

module.exports = {
	getEmergencies,
	getEmergency,
	createEmergency,
	updateEmergency,
	deleteEmergency
};