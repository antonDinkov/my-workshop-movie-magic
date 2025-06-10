const { isUser } = require('../middlewares/guards');

const { home, details, search } = require("../controllers/catalog");
const { about } = require("../controllers/about");
const { movieRouter } = require("../controllers/movie");
const { createGet: createCastGet, createPost: createCastPost } = require('../controllers/cast');
const { attachGet, attachPost } = require("../controllers/attach");
const { userRouter } = require("../controllers/user");


function configRoutes(app) {
    app.get('/', home);
    app.get('/search', search);
    app.get('/details/:id', details);
    
    app.get('/attach/:id', isUser(), attachGet);
    app.post('/attach/:id', isUser(), attachPost);
    
    app.use(movieRouter);
    
    app.get('/create/cast', isUser(), createCastGet);
    app.post('/create/cast', isUser(), createCastPost);
    
    app.use(userRouter);

    app.get('/about', about);
};
/* router.get('/*', notFound) */// <--Тази част от кода ми блокира изцяло приложението и всички пътища спират да работят

module.exports = { configRoutes }