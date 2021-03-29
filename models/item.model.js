const { Schema, model } = require('.');
const Nutrients = require('./nutrients.model').schema;

const ItemSchema = new Schema({
    user: {
        type: String || Number // not quite sure yet
    },
    uniqueId: {
        type: String
    },
    itemName: {
        type: String,
    },
    servingQuantity: {
        type: Number,
    },
    dateCreated: {
        type: Date
    },
    totalNutrients: {
        type: Nutrients
    },
},
    {
        timestamps: { createdAt: 'createdAt' }
    },
);

module.exports = model('Item', ItemSchema);