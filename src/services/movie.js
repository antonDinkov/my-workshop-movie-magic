const fs = require('fs/promises');
const { Movie } = require('../models/Movie');

const filePath = './data/database.json'

async function readFile(params) {
    const data = await fs.readFile(filePath);

    return JSON.parse(data.toString());
};

async function writeFile(data) {
    await fs.writeFile(filePath, JSON.stringify(data));
};

function toMovieModel(data) {
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
};

async function getAllMovies() {
    const movies = await readFile();
    return movies.map(toMovieModel)//приема data от всяко movie
};

async function getMovieById(id) {
    const movies = await readFile();

    const movie = movies.find(m => m.id == id);

    return movie ? toMovieModel(movie) : movie;//ако има филм върни филма, ако няма пак връща филма, който ще бъде undefined
};

module.exports = {
    getAllMovies,
    getMovieById
};