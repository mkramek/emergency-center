const models = require('../models');
const { Dispatcher } = models;

module.exports = {
	login: (req, res) => {
		Dispatcher.findOne({
			where: {
				password: req.body.password,
				email: req.body.email
			}
		}).then((dispatcher) => {
			if (!dispatcher) {
				res.status(404).send({
					message: "Nie znaleziono użytkownika",
					error: true
				});
			} else {
				res.status(200).send(dispatcher);
			}
		});
	}
};