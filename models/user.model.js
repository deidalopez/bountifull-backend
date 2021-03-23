const { Schema, model } = require('.');

const UserSchema = new Schema({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    name: {
        type: String,
    },
    birthdate: {
        type: Date,
    },
    sex: {
        type: String,
    },
    dietChoice: {
        type: String,
    }
});

module.exports = model('User', UserSchema);

