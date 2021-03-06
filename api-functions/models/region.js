"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Region extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    // eslint-disable-next-line no-unused-vars
    static associate(models) {
      // define association here
    }
  }
  Region.init(
    {
      region: DataTypes.STRING,
      codigo: DataTypes.INTEGER,
      quotas: DataTypes.INTEGER,
      curul: DataTypes.INTEGER
    },
    {
      sequelize,
      modelName: "Region"
    }
  );
  return Region;
};
