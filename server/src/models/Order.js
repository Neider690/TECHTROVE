const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "Order",
    {
      paymentId: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        
      },
      status: {
        type: DataTypes.STRING,
        defaultValue: false,
      },
      total: {
        type: DataTypes.INTEGER,
      },
      paymentMethod: {
        type: DataTypes.STRING,
        defaultValue: "Mercado Pago",
      },
      preferenceId: {
        type: DataTypes.STRING,
      },
      products: {
        type: DataTypes.ARRAY(DataTypes.JSON),
        allowNull: false,
      },
    },
    {
      timestamps: true,
      createdAt: "date",
      updatedAt: false,
    }
  );
};
