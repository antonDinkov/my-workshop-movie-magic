const {Router} = require("express");
const { homeController } = require("../controllers/homeController");

const router = Router();

//TODO add routes

router.get('/', homeController)

module.exports = { router }