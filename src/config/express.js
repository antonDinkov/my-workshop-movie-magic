const { urlencoded, static: staticHandler } = require("express");
const cookieParser = require('cookie-parser');
 const secret = 'what a secret';

function configExpress(app) {
    app.use(cookieParser(secret))
    app.use(urlencoded({ extended: true })); //за обработване на формуляри
    app.use('/static', staticHandler('static'))
}

module.exports = { configExpress };