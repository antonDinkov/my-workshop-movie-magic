const { Schema, SchemaTypes: Types, model } = require('mongoose');

const movieSchema = new Schema({
    title: {
        type: String,
        required: true,
        minLength: [5, 'Min length 5 characters'],
        match: [/^[a-z0-9]+$/gi, 'Inly characters, spaces and numbers']
    },
    genre: {
        type: String,
        required: true
    },
    director: {
        type: String,
        required: true
    },
    year: {
        type: Number,
        required: true,
        min: 1878,
        max: 2100
    },
    rating: {
        type: Number,
        required: true,
        min: 0,
        max: 5
    },
    description: {
        type: String,
        required: true,
        minLength: 20,
        maxLength: 1000
    },
    imageURL: {
        type: String,
        required: true,
        match: /^http?:\/\/.+/
    },
    cast: {
        type: [Types.ObjectId],
        ref: 'Cast',
        default: []
    },
    author: {
        type: Types.ObjectId,
        ref: 'User'
    }
});

const Movie = model('Movie', movieSchema);

/* class Movie {
    id;
    title;
    genre;
    director;
    year;
    imageURL;
    rating;
    description;
}; */

module.exports = {
    Movie
};