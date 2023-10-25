const { Router } = require("express");
const router = Router();
const userRouter = require("./userRouter")
const routerProduct = require("./routerProduct")
const routerOrder = require("./routerOrder")

router.use("/products", routerProduct)
router.use("/users", userRouter)
router.use("/orders", routerOrder)

module.exports = router;


