const { Router } = require("express");
const router = Router();
const routerUser = require("./routerUser")
const routerProduct = require("./routerProduct")
const routerOrder = require("./routerOrder")
const routerCart = require("./routerCart")
const routerAdmin = require("./routerAdmin")

router.use("/products", routerProduct)
router.use("/users", routerUser)
router.use("/orders", routerOrder)
router.use("/cart", routerCart)
router.use("/admin", routerAdmin)

module.exports = router;


