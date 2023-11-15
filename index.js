const server = require("./src/server");
const { conn  } = require("./src/db.js");
const { PORT } = process.env;


const dataProducts = require("./api/db.json");

const { Product, User } = require("./src/db");
const PORTb = 3001;

const ratingCalculator = require("./src/utils/helpers/Average/ratingAvera");

conn
  .sync({ force: false })
  .then(() => {
    server.listen(PORT || PORTb, async () => {
      let idHard = "SKU000";

      const users = dataProducts.users.map((user) => {
        return user;
      });



      const dbProduct = await Product.findAll();

      if(!dbProduct.length){
        const products = dataProducts.products.map((product) => {
          const rating = product.rating.map((rat) => Math.round(rat));
  
          product.averageRating = ratingCalculator(rating);
          product.discount = Math.floor(Math.random() * 25);

          let number = parseInt(idHard.split("U")[1]);
          number = number + 1;
          if (number >= 100) {
            idHard = idHard;
            return {
              ...product,
              id: `SKU${number}`,
            };
          }
          if (number < 10) {
            idHard = `SKU00${number}`;
            return {
              ...product,
              id: idHard,
            };
          }
          idHard = `SKU0${number}`;
          return {
            ...product,
            id: idHard,
          };
        });
  
        await Product.bulkCreate(products);
        await User.bulkCreate(users);

      }


      console.log(`Server listening on port ${PORTb}`);
    });
  })
  .catch((error) => console.error(error));
