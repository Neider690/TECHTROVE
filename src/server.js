const express = require("express");
const router = require("./routes");
const morgan = require("morgan");
const cors = require("cors");
const helmet = require("helmet");
const mercadopago = require("mercadopago")

const server = express();


server.use(helmet.contentSecurityPolicy({
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'", "https://http2.mlstatic.com"],
    },
  }));
server.use(express.urlencoded({ extended: true }));
server.use(morgan("dev"));
server.use(express.json());
//server.use(cors())
const allowedOrigins = [
  //"https://deploy",
  "http://localhost:5173", 
];
// server.use(cors({
//   origin: function (origin, callback) {
    
//     if (!origin || allowedOrigins.includes(origin)) {
//       callback(null, true);
//     } else {
//       callback(new Error("No permitido por CORS"));
//     }
//   },
//   credentials: true,
// }));
server.use(cors({
  origin:"*"
}))
server.use("/api", router);



module.exports = server;
