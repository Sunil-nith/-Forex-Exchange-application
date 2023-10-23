const HistoricalRate = require('../models/exchangeRate');
const redisClient = require('../redis');

const getHistoricalExchangeRate = async (req, res) => {
    try {
        const { sourceCurrency, targetCurrency } = req.body;
        const endDate = new Date();
        const startDate = new Date(endDate);
        startDate.setDate(startDate.getDate() - 7);
        const cacheKey = `exchangeRate_${sourceCurrency}_${targetCurrency}`;
        const cachedData = await redisClient.get(cacheKey);
        if (cachedData) {
            const exchangeRates = JSON.parse(cachedData);
            return res.json(exchangeRates);
        }else{
        const historicalRates = await HistoricalRate.find({
            date: { $gte: startDate, $lte: endDate },
        });
        const exchangeRates = historicalRates.map((rate) => {
            const sourceRate = rate.rates[sourceCurrency];
            const targetRate = rate.rates[targetCurrency];
            const exchangeRate = targetRate / sourceRate;
            return {
                date: rate.date,
                rate: exchangeRate,
            };
        });
        redisClient.set(cacheKey, JSON.stringify(exchangeRates), 'EX', 120);
        return res.json(exchangeRates);
    }
    } catch (error) {
        console.error('Error calculating historical exchange rate:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};

module.exports = {
    getHistoricalExchangeRate,
};