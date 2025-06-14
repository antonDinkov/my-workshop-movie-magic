const bcrypt = require('bcrypt');
const { User } = require('../models/User');

async function register(email, password) {
    //check if user exist -> throw error if true
    //hash password
    //create DB record
    //return saved record

    const existing = await User.findOne({ email });

    if (existing) {
        const err = new Error('Email is already used');
        err.errors = { email: 'Email is already in use'}
        throw err;
    };

    const user = new User({ email, password: await bcrypt.hash(password, 10)});

    await user.save();

    return user;//връщаме го защото ни интересува id-то за да създадем токен с id-to!!!
};

async function login(email, password) {
    //check if user exist -> throw error if false
    //compare hashed password -> throe error if false
    //return matched user

    const user = await User.findOne({ email });

    if (!user) {
        throw new Error('Incorrect email or password');
    };

    const match = await bcrypt.compare(password, user.password);

    if(!match) {
        throw new Error('Incorrect email or password');
    };

    return user;
};

module.exports = {
    register,
    login
}