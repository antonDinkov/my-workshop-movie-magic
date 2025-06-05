/* const fs = require('fs/promises'); */
const { Movie } = require('../models/Movie');

/* const filePath = './data/database.json' */

/* async function readFile() {
    const data = await fs.readFile(filePath);

    return JSON.parse(data.toString());
};

async function writeFile(data) {
    await fs.writeFile(filePath, JSON.stringify(data));
}; */

/* function toMovieModel(data) {
    const movie = new Movie();

    movie.id = data.id;
    movie.title = data.title;
    movie.genre = data.genre;
    movie.director = data.director;
    movie.year = data.year;
    movie.imageURL = data.imageURL;
    movie.rating = data.rating;
    movie.description = data.description;

    return movie;
}; */

async function getAllMovies() {
    const movies = await Movie.find().lean();/* lean винаги се закача преди да се ауейтне за да ни върне суровата база данни */    /* readFile(); */
    return movies/* .map(toMovieModel) *///приема data от всяко movie
};

async function getMovieById(id) {
    const movie = await Movie.findById(id).lean().populate('cast');

    return movie;
    
    /* const movies = await readFile();

    const movie = movies.find(m => m.id == id);

    return movie ? toMovieModel(movie) : movie; *///ако има филм върни филма, ако няма пак връща филма, който ще бъде undefined
};

async function createMovie(movieData, authorId) {
    const movie = new Movie({
        title: movieData.title,
        genre: movieData.genre,
        director: movieData.director,
        year: Number(movieData.year),
        rating: Number(movieData.rating),
        description: movieData.description,
        imageURL: movieData.imageURL,
        author: authorId
    });

    await movie.save();

    return movie;
    /* const id = uuid();

    const movie = {
        id,
        title: movieData.title,
        genre: movieData.genre,
        director: movieData.director,
        year: Number(movieData.year),
        imageURL: movieData.imageURL,
        rating: Number(movieData.rating),
        description: movieData.description
    };

    const movies = await readFile();
    movies.push(movie);
    await writeFile(movies);

    return toMovieModel(movie); *//* кото го върна като инстанция на клас това ми дава тайп чекинг(type-checking) */
};

async function attachCastToMovie(movieId, castId) {
    const movie = await Movie.findById(movieId);/* методът е на базата данни - монгууз */

    if (!movie) {
        throw new Error(`Movie ${movieId} not found`);
        
    }

    movie.cast.push(castId);

    await movie.save();

    return movie;
}

/* function uuid() {
    return 'xxxx-xxxx'.replace(/x/g, () => (Math.random() * 16 | 0).toString(16)); *//* 16-тично число на мястото на всеки x(0-F) */
/* } */

module.exports = {
    getAllMovies,
    getMovieById,
    createMovie,
    attachCastToMovie
};