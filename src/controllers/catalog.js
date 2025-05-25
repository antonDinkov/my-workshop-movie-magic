const { getAllMovies } = require("../services/movie");

module.exports = {
    home: async (req, res) => {
        const movies = await getAllMovies();

        res.render("home", { title: "Home Page", movies })//контекста се подава като обект
    },
    details: (req, res) => {
         res.render("details", { title: "Details" })
    },
    search: (req, res) => {
         res.render("search", { title: "Search" })
    }
};