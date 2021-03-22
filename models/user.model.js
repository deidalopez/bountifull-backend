const { Schema, model } = require('.');

<<<<<<< HEAD
const NutrientsSchema = new Schema({
    protein: {
        type: Number
    },
    fluids: {
        type: Number
    },
    fiber: {
        type: Number
    },
    vitaminA: {
        type: Number
    },
    thiamin: {
        type: Number
    },
    riboflavin: {
        type: Number
    },
    niacin: {
        type: Number
    },
    vitaminB6: {
        type: Number
    },
    vitaminB12: {
        type: Number
    },
    folate: {
        type: Number
    },
    vitaminC: {
        type: Number
    },
    calcium: {
        type: Number
    },
    iron: {
        type: Number
    },
    magnesium: {
        type: Number
    },
    potassium: {
        type: Number
    },
    sodium: {
        type: Number
    },
});

const ItemsConsumedSchema = new Schema({
    itemName: {
        type: String,
    },
    servingQuantity: {
        type: Number,
    },
    // fluids: {
    //     type: Number,
    // },
    nutrients: {
        nutrients: [NutrientsSchema],
    }
});

const SavedDaysSchema = new Schema({
    date: {
        type: Date,
    },
    itemConsumed: {
        items: [ItemsConsumedSchema],
    }
});

=======
>>>>>>> d338e91e594f2d7245d4d8951717a591b00c6f61
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

<<<<<<< HEAD
module.exports = model('User', UserSchema);
=======
module.exports = model('User', UserSchema);

>>>>>>> d338e91e594f2d7245d4d8951717a591b00c6f61
