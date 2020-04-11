const mongoose = require("mongoose");
mongoose
    .connect(
        "mongodb://localhost:27017/facebook-SDK", { useNewUrlParser: true }
    )
    .then(() => {
        console.log("Connected to database!");
    })
    .catch(() => {
        console.log("Connection failed!");
    });
module.exports = mongoose;