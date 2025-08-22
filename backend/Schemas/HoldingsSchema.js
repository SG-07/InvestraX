const { Schema } = require('mongoose');

const HoldingsSchema = new Schema({
    name: {
        type: String,
        required: true,
        minLength: 1,
    },
    qty: {
        type: Number,
        required: true,
        minLength: 1,
    },
    avg: {
        type: Number,
        required: true,
    },
    price: {
        type: Number,
        required: true,
        min: 1,
    },
    net: {
        type: String,
        required: true,
    },
    day: {
        type: String,
        required: true,
    },
});


module.exports = HoldingsSchema;