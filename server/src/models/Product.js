const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
    sequelize.define(
        "Product",
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },

            name: {
                type:  DataTypes.STRING,
                allowNull: true,
            },

            category: {
                type: DataTypes.STRING,
                allowNull: true,
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

            isAvalible: {
                type: DataTypes.BOOLEAN,
                allowNull: true,
            },

            price: {
                type: DataTypes.FLOAT,
                allowNull: true,
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
            },

            deleted: {
                type: DataTypes.BOOLEAN,
                allowNull: false,
                default: false,
            },
        },
        { timestamps: false }
    );
};