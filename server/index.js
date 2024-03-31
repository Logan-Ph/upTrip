require('dotenv').config();
const mongoose = require('mongoose');
const express = require('express');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const flash = require('express-flash');
const methodOverride = require('method-override')
const app = express();
const cors = require('cors')
const port = process.env.PORT;
const routes = require('./routes/userRoutes.js');
const { baseOrigin } = require('./utils/url.js');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors({
  origin: baseOrigin,
  methods: "GET,POST,PUT,DELETE",
  credentials: true
}));
app.use(cookieParser('UpTrip'));
app.use(session({
  secret: process.env.ACCESS_TOKEN,
  saveUninitialized: false,
  resave: false
}));
app.use(flash());
app.use(methodOverride('_method'))
app.use('/', routes);

mongoose.connect(process.env.MONGODB_URL)
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(port, () => {
      console.log(`Listening to port http://localhost:${port}`);
    });
  })
  .catch((error) => {
    console.error('Error connecting to the database', error);
  });
