const { urlencoded, static: staticHandler } = require("express");

function configExpress(app) {
    app.use(urlencoded({ extended: true })); //за обработване на формуляри
    app.use('/static', staticHandler('static'))
}

module.exports = { configExpress };