const {} = require('../models/User');

async function register(username, password) {
    //check if user exist -> throw error if true
    //hash password
    //create DB record
    //return saved record
};

async function login(username, password) {
    //check if user exist -> throw error if false
    //compare hashed password -> throe error if false
    //return matched user
};

module.exports = {
    register,
    login
}