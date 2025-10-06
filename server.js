const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
require('dotenv').config();
const errorHandler = require('./middlewares/error');
const authRoutes = require('./routes/auth');
const bookRoutes = require('./routes/book');
const protectedRoutes = require('./routes/protectedRoute');

const app = express();

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log('**CONNECTED TO MONGODB DATABASE**'))
  .catch((err) => console.log('MongoDB connection error:', err));

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}
app.use(cors());
app.use(express.json());
app.use(cookieParser());

app.use('/auth', authRoutes);
app.use('/book', bookRoutes);
app.use('/protected', protectedRoutes);

app.use(errorHandler);

const port = process.env.PORT || 8000;
app.listen(port, () => console.log(`Server running on port ${port}`));
