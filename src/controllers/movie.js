const { createMovie } = require("../services/movie");

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
            res.render('create', {movie: req.body, errors})
            return;
        }

        const result = await createMovie(req.body, authorId);

        res.redirect('/details/' + result._id);
    }
};