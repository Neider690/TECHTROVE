const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "Order",
    {
      
      paymentId: {
        type: DataTypes.INTEGER,
        defaultValue: DataTypes.INTEGER,
        primaryKey: true,
        
      },
       userId: {
        type: DataTypes.UUID, 
        references: {
          model: 'Users',
         // key: 'id',
        },
      },
      status: {
        type: DataTypes.STRING,
        defaultValue: false,
      },
      total: {
        type: DataTypes.FLOAT, 
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
