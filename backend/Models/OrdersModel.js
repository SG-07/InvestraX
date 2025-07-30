const { model } = require('mongoose');

const { OrdersSchema } = require('../Schemas/OrdersSchema');

const OrdersModel = new model('holding' , OrdersSchema);

module.exports = { OrdersModel };