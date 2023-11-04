const { User } = require("../../db");
const mercadopago = require("mercadopago")




const createPreference = async (req, res) => {
  try {
    const cart = req.body.cart;
    const email = req.body.email;
    //if para ver si carrito esta vacio devolver error throw new Error ("")
    let items =[] 
    for (const item of cart) {
      const price = parseFloat(item.price); // Convertir a número
      if (!isNaN(price)) {
        items.push({
          id: item.id,
          quantity: item.quantity,
          title: item.name,
          unit_price: parseInt(price), // Usar el precio convertido
          currency_id: "ARS",
        });
      }}

    // console.log("cart en preference back",cart );
    // console.log("email en preference back",email );

    //   const productDetail = {
    //   id: 12,
    //   quantity: 1,
    //   title: "microfono",
    //   unit_price: 100,
    //   currency_id: "ARS",
    // };

    //items.push(productDetail);
    const result = await mercadopago.preferences.create({
      payer_email: "test_user_1398180221@testuser.com",
      items,
      back_urls: {
        success: `http://localhost:5173/`,

      },
      notification_url: "https://4040-190-97-127-163.ngrok.io/payment/webhook",
      auto_return: "approved",
    });
    res.json({
      result: result.body.init_point,
      // Identificador único que puedes utilizar para referenciar y gestionar esa preferencia en futuras interacciones con la API de Mercado Pago
    });
  


  
    
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
