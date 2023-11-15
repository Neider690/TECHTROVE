require("dotenv").config();
const { Sequelize } = require("sequelize");

// aca van las rutas de los modelos 
const orderModel = require("./models/Order");
const productModel = require ("./models/Product");
const userModel = require("./models/User");
const cartModel = require("./models/Cart")
const brandModel = require("./models/Brand");


const { DB_USER, DB_PASSWORD, DB_HOST, DB_NAME } = process.env;

const sequelize = new Sequelize(
  `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/${DB_NAME}`,
  {
    logging: false,
    native: false,
  }
);

// inicializa los modelos
orderModel(sequelize);
cartModel(sequelize);
productModel(sequelize);
userModel(sequelize);
brandModel(sequelize);
const { User, Order, Product, Cart, Brands } = sequelize.models;

Product.belongsToMany(User, { through: "ProductsUser" });
User.belongsToMany(Product, { through: "ProductsUser" });

User.hasMany(Order, { foreignKey: 'userId' });
Order.belongsTo(User, { foreignKey: 'userId' });

User.hasOne(Cart, { foreignKey: 'userId' });
Cart.belongsTo(User, { foreignKey: 'userId' });

Product.hasOne(Brands)
Brands.belongsTo(Product);


module.exports = {
  ...sequelize.models,
  conn: sequelize,
};
