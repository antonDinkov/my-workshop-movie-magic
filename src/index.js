const express = require("express");
const { configHbs } = require("./config/hbs");
const { configExpress } = require("./config/express");
const { configRoutes } = require("./config/routes");
const { notFound } = require("./controllers/404");
const { configDatabase } = require("./config/database");



const PORT = process.env.PORT || 3000;

async function start() {
    const app = express();

    await configDatabase();
    configHbs(app)
    configExpress(app);
    configRoutes(app);

    app.use(notFound)// <-- тaka ми работи и съответно е махнато от routes.js

    app.listen(PORT, () => {
        console.log(`Application running on port ${PORT}`);
    });
};

start();