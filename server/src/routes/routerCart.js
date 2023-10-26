const { Router } = require("express");

const createPreferenceMP = require("../controllers/Cart/createPreferenceMP");
const receiveWebHookMP = require("../controllers/Cart/recieveWebHook");

const routerCart = Router();

routerCart.post("/create-preference", createPreferenceMP);
routerCart.post("/webhook/:userId", receiveWebHookMP);


module.exports = routerCart;