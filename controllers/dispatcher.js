const models = require('../models');
const { Dispatcher: Dispatcher } = models;

const getDispatchers = (req, res) => {
	Dispatcher.findAll().then((dispatchers) => {
		res.status(200).send(dispatchers);
	});
};

const getDispatcher = (req, res) => {
	Dispatcher.findOne({
		where: {
			id: req.params.id
		}
	}).then((dispatcher) => {
		res.status(!dispatcher ? 404 : 200).send(dispatcher || {});
	});
};

const createDispatcher = (req, res) => {
	Dispatcher.create(req.body).then((dispatcher) => {
		res.status(!dispatcher ? 400 : 200).send(dispatcher || { message: 'Error while adding new dispatcher' });
	});
};

const updateDispatcher = (req, res) => {
	Dispatcher.findOne({
		where: {
			id: req.params.id
		}
	}).then((dispatcher) => {
		dispatcher.update(req.body).then((updatedDispatcher) => {
			res.status(!updatedDispatcher ? 400 : 200).send(updatedDispatcher || { message: 'Error while updating a dispatcher' });
		});
	});
};

const deleteDispatcher = (req, res) => {
	Dispatcher.findOne({
		where: {
			id: req.params.id
		}
	}).then((dispatcher) => {
		dispatcher.destroy().then(() => {
			res.status(200).send({ message: `Destroyed dispatcher with ID of ${req.params.id}` });
		});
	});
};

module.exports = {
	getDispatchers,
	getDispatcher,
	createDispatcher,
	updateDispatcher,
	deleteDispatcher
};