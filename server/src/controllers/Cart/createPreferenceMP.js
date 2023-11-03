const { User } = require("../../db");
const mercadopago = require("mercadopago")




const createPreference = async (req, res) => {
  //const { items, transaction_amount, userId } = req.body;
  try {
    const cart = req.body.cart;
    const email = req.body.email;

    console.log("cart en preference back",cart );
    console.log("email en preference back",email );
    let items =[] 

      const productDetail = {
      id: 12,
      quantity: 1,
      title: "microfono",
      unit_price: 100, // Usar el precio convertido
      currency_id: "ARS",
    };

    items.push(productDetail);
    const result = await mercadopago.preferences.create({
      payer_email: "test_user_1398180221@testuser.com",
      items,
      back_urls: {
        success: `http://localhost:5173/`,

      },
      notification_url: "https://4040-190-97-127-163.ngrok.io/payment/webhook",
      auto_return: "approved",
    });

    console.log("Result de Create Order", result);


    const data = response.body;
    console.log(data);
    res.status(200).json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred: " + error.message });
  }
    // let preference = {
    //   transaction_amount,
    //   items: productDetail,
    //   back_urls: {
    //     success: 'http://localhost:5173/',
    //   },
    //   URL DE NOTIFICACIONES MERCADOPAGO
    //   notification_url: `https://4fab-186-28-78-10.ngrok-free.app/api/cart/webhook/${userId}`,
    // };

    // const response = await mercadopago.preferences.create(preference);
};

module.exports = createPreference;
