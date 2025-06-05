/* такъв е шаблона на middlewares - high ordered function */
function isGuest() {
    return function (req, res, next) {
        if (req.user) {
            res.redirect('/');
        } else {
            next();   /* ще изпълни контролера, който идва след гарда */
        }
    };
};

function isUser() {
    return function(req, res, next) {
        if (!req.user) {
            res.redirect('/login');
        } else {
            next();   /* ще изпълни контролера, който идва след гарда */
        }
    }
};

module.exports = {
    isGuest,
    isUser
}