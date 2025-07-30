const { model } = require('mongoose');
const PositionsSchema = require('../Schemas/PositionsSchema');

const PositionsModel = model('Postion', PositionsSchema);

module.exports = PositionsModel;
