const { createMovie } = require("../services/movie");

module.exports = {
    createGet: (req, res) => {
        res.render('create', { title: 'Create' });
    },
    createPost: async (req, res) => {
        const result = await createMovie(req.body);
        
        res.redirect('/details/' + result.id);
    }
};