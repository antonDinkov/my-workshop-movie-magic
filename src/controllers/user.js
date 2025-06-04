module.exports = {
    registerGet: (req, res) => {
        res.render('register');
    },
    registerPost: (req, res) => {
        const { email, password, repass } = req.body;
        console.log(email, password, repass);
        res.redirect('/register')
    }
};