const { Router } = require('express');
const { body, validationResult } = require('express-validator')

const { createToken } = require("../services/token");
const { register, login } = require("../services/user");
const { isGuest } = require('../middlewares/guards');
const { parseError } = require('../util');

const userRouter = Router();
/* гардовете се поставят пред контролера */
userRouter.get('/register', isGuest(), (req, res) => {
    res.render('register');
});

userRouter.post('/register',
    isGuest(),
    body('email').trim().isEmail().withMessage('Please enter a valid email'),
    body('password').trim().isAlphanumeric().isLength( {min: 6} ).withMessage('Please enter a valid password'),
    body('repass').trim().custom((value, { req }) => {
        return value == req.body.password;
    }).withMessage('Password don\'t match'),
    async (req, res) => {
        const { email, password } = req.body;

        try {
            const result = validationResult(req);

            if (result.errors.length) {
                throw result.errors;
            }

            const user = await register(email, password);
            const token = createToken(user);

            res.cookie('token', token, { httpOnly: true });

            res.redirect('/');
        } catch (err) {
            res.render('register', { data: { email }, errors: parseError(err).errors });
            return; 
        }
    });

userRouter.get('/login', isGuest(), (req, res) => {
    res.render('login');
});

userRouter.post('/login', isGuest(), async (req, res) => {
    const { email, password } = req.body;

    try {
        if (!email || !password) {
            throw new Error("All fields are required");
        };

        const user = await login(email, password);
        const token = createToken(user);

        res.cookie('token', token, { httpOnly: true });

        res.redirect('/');
    } catch (err) {
        res.render('login', { data: { email }, error: err.message });
        return;
    }
});


userRouter.get('/logout', (req, res) => {
    res.clearCookie('token');
    res.redirect('/');
});

module.exports = {
    userRouter
}