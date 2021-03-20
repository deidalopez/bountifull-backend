const { Schema, model } = require('.');

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
        required: true
    },
    servingQuantity: {
        type: Number,
        required: true
    },
    nutrients: {
        nutrients: [NutrientsSchema],
    }
});

const SavedDaysSchema = new Schema({
    date: {
        type: Date,
        required: true
    },
    itemConsumed: {
        items: [ItemsConsumedSchema],
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
        required: true
    },
    sex: {
        type: String,
    },
    dietChoice: {
        type: String,
    },
    achievements: {
        type: Array,
    },
    days: {
        savedDays: [SavedDaysSchema],
    }
});



module.exports = model('User', UserSchema);

