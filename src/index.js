 require('dotenv').config();

const express = require('express');
require('express-async-errors')

const globalErrorHandler = require('./shared/middlewares/global-error-handler.middleware');

const productsRouter = require('./routes/products.routes');

const connectMongoDB = require('./database/mongodb');

connectMongoDB();

const app = express();
const PORT = process.env.PORT || 4001;

app.use(express.json());

app.get('/', (_req, res) => {
  res.json('Everything is fine!');
});

app.use('/products', productsRouter);

app.use(globalErrorHandler);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
})