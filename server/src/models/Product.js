const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
    sequelize.define(
        "Product",
        {
            id: {
                type: DataTypes.STRING,
                primaryKey: true,
            },

            name: {
                type:  DataTypes.STRING,
                allowNull: false,
            },

            category: {
                type: DataTypes.STRING,
                allowNull: false,
            },

            color: {
                type: DataTypes.STRING,
                allowNull: true,
            },

            description: {
                type: DataTypes.TEXT,
                allowNull: true,
                defaultValue: null,
            },

            image: {
                type: DataTypes.JSON,
                allowNull: true,
            },

            isAvailible: {
                type: DataTypes.BOOLEAN,
                defaultValue: true,
            },

            price: {
                type: DataTypes.FLOAT,
                allowNull: false,
            },

            stock: {
                type: DataTypes.INTEGER,
                defaultValue: 0,
            },

            rating: {
                type: DataTypes.ARRAY(DataTypes.INTEGER),
            },
            
            averageRating: {
                type: DataTypes.FLOAT,
                defaultValue: null,
            },

            discount: {
                type: DataTypes.FLOAT,
                defaultValue: 0.0,
            }
        },
        { timestamps: false }
    );
};