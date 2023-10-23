const express = require('express');
const rateLimit = require('express-rate-limit');
const mongoose = require('mongoose');
const app = express();
const cron = require('node-cron');
require('dotenv').config();
const PORT = process.env.PORT || 5000;
const userRouter = require('./routes/userRoutes');
const conversionRouter = require('./routes/conversionRoutes');
const liveRatesRouter = require('./routes/liveRateRoutes');
const historicalRatesRouter = require('./routes/historicalratesRoutes');
const { fetchAndStoreDailyRates } = require('./scripts/dailyRatesFetcher');

const limiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: 100,
  message: 'Too many requests from this IP, please try again in an hour.',
});

app.use(express.json());
app.use('/users', userRouter);
app.use('/money', conversionRouter);
app.use('/money', historicalRatesRouter);
app.use('/money', liveRatesRouter);
app.use('/money', limiter);
mongoose.connect(process.env.MONGO_URL)
  .then(() => {
    console.log('Database Connection Successfull.');
  })
  .catch((error) => {
    console.log(error);
  });

cron.schedule('0 0 * * *', async () => {
  try {
   await fetchAndStoreDailyRates();
    console.log('Daily rates fetched and stored successfully.');
  } catch (error) {
    console.error('Daily rate fetching error:', error);
  }
});

app.listen(PORT, () => {
  console.log('Server is running at port no.' + PORT);
});