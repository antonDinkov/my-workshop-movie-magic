const { createMovie, getMovieById } = require("../services/movie");
const mongoose = require('mongoose');

module.exports = {
    createGet: (req, res) => {
        res.render('create', { title: 'Create' });
    },
    createPost: async (req, res) => {
        const authorId = req.user._id;

        const errors = {
            title: !req.body.title,
            genre: !req.body.genre,
            director: !req.body.director,
            year: !req.body.year,
            imageURL: !req.body.imageURL,
            rating: !req.body.rating,
            description: !req.body.description
        }

        if (Object.values(errors).some(e => e)) {
            res.render('create', { movie: req.body, errors })
            return;
        }

        const result = await createMovie(req.body, authorId);

        res.redirect('/details/' + result._id);
    },
    editGet: async (req, res) => {
        const movieId = req.params.id;

        if (!mongoose.Types.ObjectId.isValid(movieId)) {
            // Невалиден ID → директно 404
            return res.status(404).render('404');
        }

        const movie = await getMovieById(movieId);
        if (!movie) {
            res.render('404');
            return;
        };

        const isAuthor = req.user._id == movie.author.toString();

        if (!isAuthor) {
            res.redirect('/login');
            return;
        }

        res.render('edit', { title: 'edit', movie });
    },
    editPost: (reg, res) => {

    }
};