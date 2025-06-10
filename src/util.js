function parseError(err) {
    if (err instanceof Error) {
        // generic error
        if (!err.errors) {
            err.errors = [err.message];
        }
        //TODO parse Mongoose validation errors here
    } else if (Array.isArray(err)) {
        //express-validator error array
        const error = new Error('Input validation error');
        error.errors = Object.fromEntries(err.map(e => [e.path, e.msg]));

        return error;
    }


    return err;
}

module.exports = { parseError}