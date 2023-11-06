
const { DataTypes, UUIDV4 } = require("sequelize");


module.exports = (sequelize) => {
    sequelize.define(
          "Brands",
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: UUIDV4
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    }
  },
  {
    timestamps: false,
  }
  );
};
