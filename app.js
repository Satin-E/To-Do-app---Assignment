const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const methodOverride = require('method-override');
const authRoutes = require('./routes/auth');
const taskRoutes = require('./routes/tasks');
const debugRoutes = require('./routes/debug');
const errorHandler = require('./middleware/errorHandler');

dotenv.config();

const app = express(); 

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(methodOverride('_method'));

app.set('view engine', 'ejs');

app.use('/auth', authRoutes); 
app.use('/tasks', taskRoutes); 
app.use('/debug', debugRoutes);

app.use(errorHandler);

module.exports = app;