const { Schema } = require('mongoose');

const PositionsSchema = new Schema({
    product: {
        type: String,
        required: true,
        minLength: 1,
    },
    name: {
        type: String,
        required: true,
        minLength: 1,
    },
    qty: {
        type: Number,
        required: true,
    },
    price: {
        type: Number,
        required: true,
        min: 1,
    },
    avg: {
        type: Number,
        required: true,
    },
    net: {
        type: String,
        required: true,
        min: 1,
    },
    day: {
        type: String,
        required: true,
    },
    isLoss: {
        type: Boolean,
        required: true,
    },
});


module.exports = PositionsSchema;