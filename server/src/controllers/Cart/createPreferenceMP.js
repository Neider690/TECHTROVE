const { User } = require("../../db");
const mercadopago = require("mercadopago")
const createPreference = async (req, res) => {
  try {

    const { items, transaction_amount, userId } = req.body;
    console.log('USER:',userId);
    console.log('ITEMS:',items);
    let preference = {
      transaction_amount,
      items,
      back_urls: {
        success: 'http://localhost:5173/',
      },
      //URL DE NOTIFICACIONES MERCADOPAGO
      notification_url: `https://4fab-186-28-78-10.ngrok-free.app/api/cart/webhook/${userId}`,
    };

    const response = await mercadopago.preferences.create(preference);
    const data = response.body;
    console.log(data);
    res.status(200).json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred: " + error.message });
  }
};

module.exports = createPreference;
