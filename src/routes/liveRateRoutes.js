const express = require('express');
const liveRatesRouter = express.Router();
const {getLiveExchangeRates} = require('../controllers/liveRatesController');
const auth = require("../middlewares/auth");


liveRatesRouter.get('/rates',auth, getLiveExchangeRates);

module.exports = liveRatesRouter;
