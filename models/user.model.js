const { Schema, model } = require('.');

const DaySchema = new Schema({
    date: {
        type: Date
    },
    totalGoalMet: {
        type: Number
    }
});

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
    days: {
        type: DaySchema,
    }
},
    {
        timestamps: { createdAt: 'createdAt' }
    }
);

module.exports = model('User', UserSchema);