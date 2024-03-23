require("dotenv").config()
const mongoose = require('mongoose');

exports.homePage = (req, res) => {
  res.send('This is homepage');
};


