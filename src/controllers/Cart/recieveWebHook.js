const { sendPurchaseEmail } = require("../../utils/email");


const receiveWebHook = async (req, res) => {

  const data = req.body
  const { email, paymentId, products, status, total } = data;
  
sendPurchaseEmail(email, paymentId, products, status, total)
  
}

module.exports = receiveWebHook;
