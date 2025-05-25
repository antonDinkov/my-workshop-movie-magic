const {Router} = require("express");
const { home, details } = require("../controllers/catalog");
const { about } = require("../controllers/about");
const { createGet } = require("../controllers/movie");
const { notFound } = require("../controllers/404");

const router = Router();

//TODO add routes

router.get('/', home);
router.get('/about', about);
router.get('/details/:id', details);
router.get('/create', createGet);


/* router.get('/*', notFound) */// <--Тази част от кода ми блокира изцяло приложението и всички пътища спират да работят

module.exports = { router }