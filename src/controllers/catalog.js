const { getAllMovies, getMovieById } = require("../services/movie");

module.exports = {
    home: async (req, res) => {
        const movies = await getAllMovies();

        res.render("home", { title: "Home Page", movies })//контекста се подава като обект
    },
    details: async (req, res) => {
        const id = req.params.id;
        const movie = await getMovieById(id);

        if (!movie) {
            res.render('404');
            return;
        };

        movie.starRating = '&#x2605;'.repeat(movie.rating);

        res.render("details", { title: "Details", movie });
    },
    search: async (req, res) => {
        const movies = await getAllMovies();
        res.render("search", { title: "Search", movies })
    }
};