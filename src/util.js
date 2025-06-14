function parseError(err) {
    if (err instanceof Error) {
        // generic error
        if (!err.errors) {
            err.errors = [err.message];
        } else {
            //mongoose validation errors
            const error = new Error('Input validation error');
            error.errors = Object.fromEntries(Object.values(err.errors).map(e => [e.path, e.message]));

            return error;
        }
    } else if (Array.isArray(err)) {
        //express-validator error array
        const error = new Error('Input validation error');
        error.errors = Object.fromEntries(err.map(e => [e.path, e.msg]));

        return error;
    }


    return err;
}

module.exports = { parseError }