const express = require('express');
const fireRoutes = require('./fire/index.js');

const route = express.Router();

route.use('/fire', fireRoutes);

module.exports =  route