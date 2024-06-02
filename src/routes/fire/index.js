const express = require("express");
const authRoute = require("./auth.route.js");

const fireRoutes = express.Router();

fireRoutes.use('/auth', authRoute );

module.exports = fireRoutes;
