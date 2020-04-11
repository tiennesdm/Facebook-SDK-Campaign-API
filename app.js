const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const db = require('./util/dataBase');
console.log('hello from app.js');
// Import Routes
const fbTokenRoutes = require('./routes/tokenRoutes');
const campaignRoutes = require('./routes/campaignRoutes')
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    res.setHeader(
        "Access-Control-Allow-Methods",
        "GET, POST, PATCH, PUT, DELETE, OPTIONS"
    );
    next();
});
app.use('/api/fb', fbTokenRoutes);
app.use('/api/campaign', campaignRoutes);
app.use((err, req, res, next) => {
    // console.log('error:::,', err);

    res.status(400).send(err.message)
});
module.exports = app;