const { Router } = require("express");
const router = Router();
const routerUser = require("./routerUser")
const routerProduct = require("./routerProduct")
const routerOrder = require("./routerOrder")
const routerCart = require("./routerCart")
const routerAdmin = require("./routerAdmin")
const routerFavorites = require("./routerFavorites")
// const routerBrand = require("./routerBrand")
const brandsRouter = require("./routerBrands");
router.use("/products", routerProduct)
router.use("/users", routerUser)
router.use("/orders", routerOrder)
router.use("/payment", routerCart)
router.use("/admin", routerAdmin)
router.use("/favorites", routerFavorites)
// router.use("/brands", routerBrand)
router.use("/brands", brandsRouter)
module.exports = router;


