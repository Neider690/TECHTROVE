const { DataTypes } = require(sequelize);

module.export = (sequelize) => {
    sequelize.define(
        "WatchList",
        {
            deleteWatchList: {
                type: DataTypes.BOOLEAN,
                allowNull: false,
                defaultValue: false,
            },
        },
        { timestamps: false }
    );
};