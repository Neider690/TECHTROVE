const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
    sequelize.define(
        "User",
        {
            id: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                primaryKey: true,
              },
              clientId: {
                type: DataTypes.STRING,
              },
              name: {
                type: DataTypes.STRING,
              },
              username: {
                type: DataTypes.STRING,
                unique: true,
              },
              email: {
                type: DataTypes.STRING,
                unique: true,
              },
              image: {
                type: DataTypes.JSON,
                allowNull: true,
              },
              address: {
                type: DataTypes.TEXT,
              },
              watchlist: {
                type: DataTypes.ARRAY(DataTypes.STRING),
              },
              isDisable: {
                type: DataTypes.BOOLEAN,
                defaultValue: false,
              },
              isAdmin: {
                type: DataTypes.BOOLEAN,
                defaultValue: false,
            }
        },
        { timestamps: false }
    );
};