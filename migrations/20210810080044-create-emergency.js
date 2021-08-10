'use strict';
module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.createTable('Emergencies', {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER
			},
			status: {
				type: Sequelize.STRING
			},
			isFire: {
				type: Sequelize.BOOLEAN
			},
			isLifeDanger: {
				type: Sequelize.BOOLEAN
			},
			issuerNeedsHelp: {
				type: Sequelize.BOOLEAN
			},
			type: {
				type: Sequelize.INTEGER
			},
			phoneNumber: {
				type: Sequelize.STRING
			},
			address: {
				type: Sequelize.STRING
			},
			dispatcher: {
				type: Sequelize.INTEGER
			},
			createdAt: {
				allowNull: false,
				type: Sequelize.DATE
			},
			updatedAt: {
				allowNull: false,
				type: Sequelize.DATE
			}
		});
	},
	down: async (queryInterface, Sequelize) => {
		await queryInterface.dropTable('Emergencies');
	}
};