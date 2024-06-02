const express = require('express');
const helmet = require('helmet');
const logger  = require('./config/logger.js');
const route = require('./routes/index.js');
const connectDB = require( './config/database.js');
const ApiError = require('./config/apiError.js');
const httpStatus = require('http-status');
const cors = require('cors');
const morgan = require('./config/morganConfig.js')
const compression = require('compression');
const passport =require("passport")
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const cookieSession = require('cookie-session')

const { errorConvertor, errorHandler } = require('./middlewares/error.js');

const app = express();
const port = process.env.PORT || 3000;

app.use(cookieSession({
  name: 'google-auth-session',
  keys: ['auth-sec-1', 'auth-sec-1']
}))

app.use(helmet());

app.use(cors());
app.options('*', cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(morgan.successHandler);
app.use(morgan.errorHandler);

app.use(compression());

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
      done(null, user);
});


app.use('/', route)

app.use((req, res, next) => {
  throw new ApiError(httpStatus.NOT_FOUND, "no such api")
})

app.use(errorConvertor);

app.use(errorHandler);

connectDB();

app.listen(port, () => {
  logger.info(`server is running on http://localhost:${port}`);
});
