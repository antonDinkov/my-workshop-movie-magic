const { getAllMovies, getMovieById } = require("../services/movie");

module.exports = {
    home: async (req, res) => {
        console.log(req.user);
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

        const { title, genre, year } = req.query;
        if (!title && !genre && !year) {
            res.render("search", { title: "Search", movies })
        } else {
            const filteredMovies = movies.filter(movie => {
                
                const movieTitle = movie.title.toLowerCase();
                const searchTerm = (title || "").toLowerCase();
                const movieGenre = (movie.genre || "").toLowerCase();
                const genreFilter = (genre || "").toLowerCase();

                
                const movieYear = Number(movie.year);
                const yearFilter = Number(year);

                
                const matchesTitle = !searchTerm || movieTitle.includes(searchTerm);
                const matchesGenre = !genreFilter || movieGenre === genreFilter;
                const matchesYear = !yearFilter || movieYear === yearFilter;

                return matchesTitle && matchesGenre && matchesYear;
            });

            res.render('search', { title: 'Search', movies: filteredMovies, title, genre, year})
        }
    }
};