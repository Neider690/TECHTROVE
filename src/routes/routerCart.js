const { Router } = require("express");

const createPreferenceMP = require("../controllers/Cart/createPreferenceMP");
const receiveWebHookMP = require("../controllers/Cart/recieveWebHook");
const succesHandler = require("../controllers/Cart/succesHandler")
const pendingHandler = require("../controllers/Cart/pendingHandlers")
const failureHandler = require("../controllers/Cart/failure.Handlers") 
const routerCart = Router();

routerCart.post("/create-order", createPreferenceMP);
routerCart.post("/webhook/:userId", receiveWebHookMP);
routerCart.get("/succes", succesHandler);
routerCart.get("/pending", pendingHandler);
routerCart.get("/failure", failureHandler);

module.exports = routerCart;