const createError = require('http-errors');
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const logger = require('morgan');
const helmet = require('helmet');
const rfs = require('rotating-file-stream');

const patients = require('./api/patients/routes/index');
const invoices = require('./api/invoices/routes/index');
const documents = require('./api/documents/routes/index');
const users = require('./api/users/routes/index');
const seed = require('./seed/routes');

//import db
const dbmain = require("./config/DB/DBmain");
dbmain.setup(__dirname + '/DBModels');

const app = express();
app.use(helmet());
app.set('view engine', 'hbs');

// create a rotating write stream
// const logStream = rfs(`logfile-${new Date().toLocaleDateString()}.log`,{
//     interval: '1d', // rotate daily
//     size: "10M",
//     path: path.join(__dirname, 'log'),
//     compress: "gzip"
// });
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
// Add headers
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization, x-access-token');
    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);
    // Pass to next layer of middleware
    next();
});

app.use('/patients', patients);
app.use('/invoices', invoices);
app.use('/seed', seed);
app.use('/documents', documents);
app.use('/users', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  console.log(err);
  res.render('error');
});

module.exports = app;
