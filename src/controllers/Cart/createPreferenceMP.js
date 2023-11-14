const { User } = require("../../db");
const mercadopago = require('mercadopago');
//const ngrok = require('ngrok');
require('dotenv').config()

const { ACCESS_TOKEN } = process.env;

// Configurar mercado pago
mercadopago.configure({
    access_token:ACCESS_TOKEN
})


let userEmail = ""

const createPreference = async (req, res) => {
  try {
    const cart = req.body.cart;
    userEmail = req.body.email;

   
    
    
    //if para ver si carrito esta vacio devolver error throw new Error ("")
    let items =[] 
    for (const item of cart) {
      const price = parseFloat(item.price); 
      if (!isNaN(price)) {
        items.push({
          id: item.id,
          quantity: item.quantity,
          title: item.name,
          unit_price: price, 
          currency_id: "ARS",
        });
      }}
    const result = await mercadopago.preferences.create({
      payer_email: "test_user_1802045022@testuser.com",
      items,        
      back_urls: {
        success: `http://localhost:3001/api/payment/succes`,
        failure: `https://techtrove-back-dev-qpzn.1.us-1.fl0.io/api/payment/succes`,
        pending: `https://techtrove-back-dev-qpzn.1.us-1.fl0.io/api/payment/succes`,

      },      notification_url: `https://ec26-186-155-75-36.ngrok-free.app/payment/webhook/`,

      auto_return: "approved",
    });
    res.json({
      result: result.body.init_point,
      
      // Identificador único que puedes utilizar para referenciar y gestionar esa preferencia en futuras interacciones con la API de Mercado Pago
     });   
  } catch (error) {
    console.error("Error en createPreference:", error);
    res.status(500).json({ error: "An error occurred: " + error.message });
  }
}

module.exports = createPreference;
