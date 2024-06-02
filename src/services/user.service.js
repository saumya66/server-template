const logger = require("../config/logger.js");
const User = require("../models/user.model.js");

const createUser = async (req, res) => {
  try {
    const { app, name, email, password } = req.body;

    const newUser = new User({app, name, email, password });
    await newUser.save();

    logger.info(`CREATED NEW USER ${newUser}`)

    res.status(200).json(newUser);
  } catch (error) {
    logger.error(`Error creating user: ${error.message}`);
    res.status(500).send('Server Error');
  }
};

module.exports =  { createUser };
