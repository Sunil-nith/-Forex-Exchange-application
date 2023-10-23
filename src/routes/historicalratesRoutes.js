const express = require('express');
const historicalRatesRouter = express.Router();
const {getHistoricalExchangeRate} = require('../controllers/historicalRatesController');
const auth = require("../middlewares/auth");


historicalRatesRouter.get("/history",auth, getHistoricalExchangeRate);

module.exports = historicalRatesRouter;
