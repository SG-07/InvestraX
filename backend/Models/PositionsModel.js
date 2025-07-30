const { model } = require('mongoose');
const PositionsSchema = require('../schemas/PositionsSchema');

const PositionsModel = model('Postion', PositionsSchema);

module.exports = PositionsModel;
