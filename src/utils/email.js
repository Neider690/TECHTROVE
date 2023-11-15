const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    
    user: 'matiasavesani1@gmail.com',
    pass: 'rmbz uuup vbqa mqzl'
  }
});

function getStatusBasedEmailHtml(email, paymentId, products, status, total) {
  if (status === "approved") {
    return `<!DOCTYPE html>
    <html>
    
    <head>
        <meta charset="UTF-8">
        <title>Thank you for your purchase at TechTrove!</title>
        <style>
            /* Estilos generales */
            body {
                font-family: 'Poppins', sans-serif;
                background-color: #f8f9fa;
                margin: 0;
                padding: 0;
                display: flex;
                align-items: center;
                justify-content: center;
                min-height: 100vh;
            }
    
            .container {
                max-width: 600px;
                margin: 0 auto;
                padding: 20px;
                background-color: #ffffff;
                border-radius: 5px;
                box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
            }
  
            .cta-button {
              display: inline-block;
              align-items: center;
              justify-content: center;
              padding: 10px 20px;
              background-color: #dd6bbb;
              color: #000000;
              text-decoration: none;
              border-radius: 5px;
            }
    
            /* Estilos para la tarjeta */
            .card {
                padding: 20px;
                background-color: #f7f7f7;
                border-radius: 5px;
                border: 1px solid #e5e5e5;
                margin-bottom: 20px;
            }
    
            /* Estilos para la lista de productos */
            .product-list {
                list-style: none;
                padding: 0;
                margin: 15px 0;
                color: #333333;
            }
    
            .product-list li {
                margin-bottom: 5px;
            }
        </style>
    </head>
    
    <body>
        <div class="container">
            <div class="card">
                <h1>Thank you for your purchase at TechTrove!</h1>
                <p>Hi ${email}!</p>
                <p>Thank you for making your purchase on our site. We hope you are excited to receive your order.</p>
            </div>
            <div class="card">
                <h2>Here are the details of your purchase:</h2>
                <ul class="product-list">
                    ${products
                      .map(
                        (product) =>
                          `<li>Producto: ${product.name}<br>Precio: ${product.price}</li>`
                      )
                      .join("")}
                </ul>
                <p>Date of purchase: ${paymentId}</p>
                <p>If you have any questions or need help with your order, don't hesitate to contact us.</p>
                <p>We hope you enjoy your purchase and come back soon!</p>
                <p>Click the button below to visit our site:</p>
                <a class="cta-button" href="https://techtrove-front.vercel.app/">Visit TechTrove</a>
            </div>
            <p class="footer">© 2023 TechTrove. All rights reserved.</p>
        </div>
    </body>
    
    </html>
    `
}else{
  return `<!DOCTYPE html>
  <html>
  
  <head>
      <meta charset="UTF-8">
      <title>Continue your shopping at TechTrove!</title>
      <style>
          /* Estilos generales */
          body {
              font-family: 'Poppins', sans-serif;
              background-color: #f8f9fa;
              margin: 0;
              padding: 0;
              display: flex;
              align-items: center;
              justify-content: center;
              min-height: 100vh;
          }
  
          .container {
              max-width: 600px;
              margin: 0 auto;
              padding: 20px;
              background-color: #ffffff;
              border-radius: 5px;
              box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
          }
  
          /* Estilos para la tarjeta */
          .card {
              padding: 20px;
              background-color: #fce9e9;
              border-radius: 5px;
              border: 1px solid #e5e5e5;
              margin-bottom: 20px;
          }
  
          /* Estilos para el botón */
          .cta-button {
              display: inline-block;
              padding: 10px 20px;
              background-color: #dd6bbb;
              color: #ffffff;
              text-decoration: none;
              border-radius: 5px;
              transition: background-color 0.3s ease;
          }
  
          .cta-button:hover {
              background-color: #c55fa5;
          }
  
          /* Estilos para el pie de página */
          .footer {
              text-align: center;
              font-size: 14px;
              font-weight: 800;
              color: #888888;
          }
      </style>
  </head>
  
  <body>
      <div class="container">
          <div class="card">
              <h1>Continue your shopping at TechTrove!</h1>
              <p>Hi ${email}!</p>
              <p>We noticed that your payment was not approved, but don't worry. You can continue your purchase at another time.</p>
          </div>
          <div class="card">
              <p>If you have any problems with the payment or need more information, do not hesitate to contact us.</p>
              <p>We hope to see you soon at TechTrove!</p>
              <p>Click the button below to visit our site:</p>
              <a class="cta-button" href="https://techtrove-front.vercel.app/">Visit TechTrove</a>
          </div>
          <p class="footer">© 2023 TechTrove. All rights reserved.</p>
      </div>
  </body>
  
  </html>
  `
}
}

const sendPurchaseEmail = async (email, paymentId, products, status, total) => {

  //text: "TEXTO PLANO Hello world?", // plain text body
await transporter.sendMail({
  from: '"TechTrove 👻" <techtrove@tectrove.com>', // sender address
  to: email, // list of receivers
  subject: "TechTrove ✔", // Subject line
  html: getStatusBasedEmailHtml(email, paymentId, products, status, total)
});

}

 module.exports = {
   sendPurchaseEmail,
 };
