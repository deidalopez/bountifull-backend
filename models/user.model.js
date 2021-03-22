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
    firstName: {
        type: String,
    },
    lastName: {
        type: String,
    },
    avatar: {
        type: String,
    },
    DOB: {
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


