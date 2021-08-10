'use strict';
const {
	Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
	class Emergency extends Model {
		/**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
		static associate(models) {
		    // associations
		}
	}
	Emergency.init({
		status: DataTypes.STRING,
		isFire: DataTypes.BOOLEAN,
		isLifeDanger: DataTypes.BOOLEAN,
		type: DataTypes.INTEGER,
		phoneNumber: DataTypes.STRING,
		address: DataTypes.STRING,
		dispatcher: DataTypes.INTEGER
	}, {
		sequelize,
		modelName: 'Emergency',
	});
	return Emergency;
};