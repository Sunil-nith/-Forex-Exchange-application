const redisClient = require('../redis');

const axios = require('axios');
require('dotenv').config();
const API_KEY = process.env.API_KEY;
const convertCurrency = async (req, res) => {
    try {
        const { sourceCurrency, targetCurrency, amount } = req.body;
        if (!sourceCurrency || !targetCurrency || !amount || !API_KEY) {
            return res.status(400).json({ message: 'Invalid input data' });
        }
        const cacheKey = `exchangeRate_${sourceCurrency}_${targetCurrency}_${amount}`;
        const cachedExchangeRate = await redisClient.get(cacheKey);

        if (cachedExchangeRate) {
            const exchangeRate = parseFloat(cachedExchangeRate);
            const convertedAmount = amount * exchangeRate;
            return res.json({ result: convertedAmount, cached: true });
        } else {
            const exchangeRatesApiUrl = `http://api.exchangeratesapi.io/v1/latest?access_key=${API_KEY}`;
            const response = await axios.get(exchangeRatesApiUrl);

            if (response.status !== 200) {
                return res.status(response.status).json({ message: 'API request failed' });
            }

            const ratesData = response.data.rates;
            if (!(sourceCurrency in ratesData) || !(targetCurrency in ratesData)) {
                return res.status(400).json({ message: 'Invalid currency codes' });
            }

            const exchangeRate = ratesData[targetCurrency] / ratesData[sourceCurrency];
            const convertedAmount = amount * exchangeRate;

            
            await redisClient.set(cacheKey, exchangeRate.toString(), 'EX', 120);


            return res.json({ result: convertedAmount, cached: false });
        }
    } catch (error) {
        console.error('Currency conversion error:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};

module.exports = {
    convertCurrency,
};
