const axios = require('axios');
const redisClient = require('../redis');
require('dotenv').config();
const API_KEY = process.env.API_KEY;

const supportedCurrencies = ['USD', 'EUR', 'GBP', 'INR'];
const getLiveExchangeRates = async (req, res) => {
    try {
        const cachedData = await redisClient.get('liveExchangeRates');
        if (cachedData) {
          const exchangeRates = JSON.parse(cachedData);
          return res.json({ rates: exchangeRates });
        }
        const exchangeRatesApiUrl = `http://api.exchangeratesapi.io/v1/latest?access_key=${API_KEY}`;
        const response = await axios.get(exchangeRatesApiUrl);
        if (response.status !== 200) {
            return res.status(response.status).json({ message: 'API request failed' });
        }
        const exchangeRates = {};
        supportedCurrencies.forEach((currency) => {
            if (currency in response.data.rates) {
                exchangeRates[currency] = response.data.rates[currency];
            }
        });
        redisClient.set('liveExchangeRates', JSON.stringify(exchangeRates), 'EX', 120);

        return res.json({ rates: exchangeRates });
    } catch (error) {
        console.error('Live exchange rates error:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};

module.exports = {
    getLiveExchangeRates,
};
