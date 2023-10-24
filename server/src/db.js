require("dotenv").config();
const { Sequelize } = require("sequelize");

// aca van las rutas de los modelos 
// ejemplo 
// const orderModel = require("./models/Order");

const productModel = require("./models/Product");
const cartModel = require("./models/Cart.js");
const orderModel = require("./models/Order");
const userModel = require("./models/User");
const watchListModel = requiere("./models/WatchList");

const { DB_USER, DB_PASSWORD, DB_HOST, DB_NAME } = process.env;

const sequelize = new Sequelize(
  `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/${DB_NAME}`,
  {
    logging: false,
    native: false,
  }
);

productModel(sequelize);
cartModel(sequelize);
orderModel(sequelize);
userModel(sequelize);
watchListModel(sequelize);

const { User, Order, Product } = sequelize.models;

Product.belongsToMany(User, { through: "ProductsUser" });
User.belongsToMany(Product, { through: "ProductsUser" });

User.hasMany(Order);
Order.belongsTo(User);

module.exports = {
  ...sequelize.models,
  conn: sequelize,
};
