const { Router } = require("express");
const router = Router();
const routerUser = require("./routerUser")
const routerProduct = require("./routerProduct")
const routerOrder = require("./routerOrder")
const routerCart = require("./routerCart")


router.use("/products", routerProduct)
router.use("/users", routerUser)
router.use("/orders", routerOrder)
router.use("/cart", routerCart)

module.exports = router;


