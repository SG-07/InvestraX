const { Schema } = require("mongoose");

const OrdersSchema = new Schema({
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
    mode: {
        type: String,
        required: true,
    },
});

module.exports = { OrdersSchema };