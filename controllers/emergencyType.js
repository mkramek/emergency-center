const models = require('../models');
const { EmergencyType } = models;

const getEmergencyTypes = (req, res) => {
	EmergencyType.findAll().then((types) => {
		res.status(200).send(types);
	});
};

const getEmergencyType = (req, res) => {
	EmergencyType.findOne({
		where: {
			id: req.params.id
		}
	}).then((type) => {
		res.status(!type ? 404 : 200).send(type || {});
	});
};

const createEmergencyType = (req, res) => {
	EmergencyType.create(req.body).then((type) => {
		res.status(!type ? 400 : 200).send(type || { message: 'Error while adding new emergency' });
	});
};

const updateEmergencyType = (req, res) => {
	EmergencyType.findOne({
		where: {
			id: req.params.id
		}
	}).then((type) => {
		type.update(req.body).then((updatedType) => {
			res.status(!updatedType ? 400 : 200).send(updatedType || { message: 'Error while updating an emergency' });
		});
	});
};

const deleteEmergencyType = (req, res) => {
	EmergencyType.findOne({
		where: {
			id: req.params.id
		}
	}).then((type) => {
		type.destroy().then(() => {
			res.status(200).send({ message: `Deleted emergency with ID of ${req.params.id}` });
		});
	});
};

module.exports = {
	getEmergencyTypes,
	getEmergencyType,
	createEmergencyType,
	updateEmergencyType,
	deleteEmergencyType
};