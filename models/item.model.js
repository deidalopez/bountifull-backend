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

const ItemSchema = new Schema({
    user: {
        type: String || Number // not quite sure yet
    },
    dateCreated: {
        type: Date
    },
    itemName: {
        type: String,
    },
    servingQuantity: {
        type: Number,
    },
    totalNutrients: {
        nutrients: [NutrientsSchema],
    }
});

module.exports = model('Item', ItemSchema);