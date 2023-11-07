const { Router } = require("express");


const routerPayment = Router();


routerPayment.get("/succes", succesHandler);
routerPayment.get("/pending", pendingHandler);
routerPayment.get("/failure", failureHandler);