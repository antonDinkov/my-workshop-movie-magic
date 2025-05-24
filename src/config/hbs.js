const handlebars = require("express-handlebars");

function configHbs(app) {
    const hbs = handlebars.create({ // създавам енджина, като специфицирам hbs като екстеншън
        extname: '.hbs'
    });

    app.engine('.hbs', hbs.engine); //регистрираме енджина в приложението върху екстеншъна hbs
    app.set('view engine', '.hbs'); //сетваме настроийката за view engine да е вързана за .hbs
}

module.exports = {configHbs};