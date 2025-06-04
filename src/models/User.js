const { Schema, model } = require('mongoose');

const userSchema = new Schema ({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String, 
        required: true
    }
}, {
    collation: { locale: 'en', strength: 2 }/* това е втори параметър на new Schema */
});

const User = model('User', userSchema);

module.exports = { User };