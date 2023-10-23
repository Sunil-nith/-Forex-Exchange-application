const express = require('express');
const conversionRouter = express.Router();
const {convertCurrency} = require('../controllers/conversionController');
const auth = require("../middlewares/auth");


conversionRouter.get('/convert',auth,convertCurrency);

module.exports = conversionRouter;
