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
              photo: {
                type: DataTypes.STRING,
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
            // id: {
            //     type: DataTypes.INTEGER,
            //     primaryKey: true,
            //     autoIncrement: true,
            // },
            // name: {
            //     type: DataTypes.STRING,
            //     allowNull: false,
            //     unique: true,
            // },
            // email: {
            //     type: DataTypes.STRING,
            //     allowNull: false,
            //     unique: true,
            // },
            // password: {
            //     type: DataTypes.STRING,
            //     allowNull: false,
            // },
            // address: {
            //     type: DataTypes.STRING,
            //     allowNull: false,
            //     default: "",
            // },
            // imageProfile: {
            //     type: DataTypes.STRING,
            //     allowNull: true,
            // },
            // isSuperuser: {
            //     type: DataTypes.STRING,
            //     allowNull: true,
            //     defaultValue: false,
            // },

            // deleted: {
            //     // Agrega este compo
            //     type: DataTypes.BOOLEAN,
            //     defaultValue: false, // Por defecto, no elimina 
            // },
            // isGoogle: {
            //     type: DataTypes.BOOLEAN,
            //     allowNull: true,
            //     defaultValue: false,
            // },
            // purchaseDate: {
            //     type: DataTypes.DATE, // Agrega un campo para la fecha y hora de la compra
            //     allowNull: false,
            //     defaultValue: DataTypes.NOW // Usa la fecha y hora como valor predeterminado
            // },
        },
        { timestamps: false }
    );
};