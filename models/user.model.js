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
    avatar: {
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
    },
    days: [
        {
            date: {
                type: String,
            },
            totalGoalMet: {
                type: Number
            }
        }
    ],
},
    {
        timestamps: { createdAt: 'createdAt' }
    }
);

module.exports = model('User', UserSchema);