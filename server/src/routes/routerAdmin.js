const { Router } = require("express");

const getAdmins = require("../controllers/Admin/gerAdmins");

const routerAdmin = Router();

routerAdmin.get("/", getAdmins);


module.exports = routerAdmin;