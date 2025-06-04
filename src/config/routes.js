const {Router} = require("express");
const { home, details, search } = require("../controllers/catalog");
const { about } = require("../controllers/about");
const { createGet, createPost } = require("../controllers/movie");
const { createGet: createCastGet, createPost: createCastPost } = require('../controllers/cast');
const { attachGet, attachPost } = require("../controllers/attach");
const { registerGet, registerPost } = require("../controllers/user");

const router = Router();

//TODO add routes

router.get('/', home);
router.get('/about', about);
router.get('/details/:id', details);
router.get('/attach/:id', attachGet);
router.post('/attach/:id', attachPost);
router.get('/create/movie', createGet);
router.post('/create/movie', createPost);
router.get('/create/cast', createCastGet);
router.post('/create/cast', createCastPost);
router.get('/search', search);
router.get('/register', registerGet);
router.post('/register', registerPost);


/* router.get('/*', notFound) */// <--Тази част от кода ми блокира изцяло приложението и всички пътища спират да работят

module.exports = { router }