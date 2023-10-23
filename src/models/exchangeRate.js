const mongoose = require('mongoose');

const exchangeRateSchema = new mongoose.Schema({
  baseCurrency: String,
  date: Date,
  rates: Object,
});

module.exports = mongoose.model('ExchangeRate', exchangeRateSchema);