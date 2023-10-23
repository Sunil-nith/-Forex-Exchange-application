// dailyRatesFetcher.js
const axios = require('axios');
const mongoose = require('mongoose');
const ExchangeRate = require('../models/exchangeRate'); 

const fetchAndStoreDailyRates = async () => {
    try {
      const API_KEY = 'acad4b3080f4c3d153cd898fa55933a4';
      const apiUrl = `http://api.exchangeratesapi.io/latest?access_key=${API_KEY}`;
      
      
      const response = await axios.get(apiUrl);
  
      if (response.data.success) {
        const exchangeRates = response.data.rates;
        const baseCurrency = response.data.base;
        const date = new Date(response.data.date);
  
        
        const exchangeRate = new ExchangeRate({
          baseCurrency,
          date,
          rates: exchangeRates,
        });
        await exchangeRate.save();

      console.log(`Exchange rates saved to the database on ${date}`);
    } else {
      console.error('Failed to fetch exchange rates.');
    }
  } catch (error) {
    console.error('Error fetching or saving exchange rates:', error);
  }
};


fetchAndStoreDailyRates();
module.exports = { fetchAndStoreDailyRates }; 