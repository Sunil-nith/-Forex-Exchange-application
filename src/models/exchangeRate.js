const mongoose = require('mongoose');


const exchangeRateSchema = new mongoose.Schema({
  baseCurrency: String,
  date: Date,
  rates: Object, 
});


const ExchangeRate = mongoose.model('ExchangeRate', exchangeRateSchema);

module.exports = ExchangeRate;
