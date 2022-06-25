require("dotenv").config();
const express = require('express');
const cookieParser = require('cookie-parser');
const { default: mongoose } = require('mongoose');
const User = require("./models/User");
const app = express();
const PORT = 8000;
const auth = require('./routers/auth');
const codes = require('./routers/codes');

app.use(cookieParser());
app.use(express.json())
app.use(function (req, res, next) {
    console.log("----------REQUEST LOG---------");
    console.log(new Date());
    console.log("req.method", req.method);
    console.log("req.url", req.url);
    console.log();
    console.log("req.body", req.body);
    console.log();
    console.log("req.params", req.params);
    console.log("-----------REQUEST LOG ENDS---");
    console.log();
    next();
})
app.use('/api/v1/auth', auth);
app.use('/api/v1/codes', codes)

const main = async () => {
    try {
        await mongoose.connect(process.env.MONGO_DATABASE_URI);
        app.listen(PORT, err => console.log(err ? err : `App listening at http://localhost:${PORT}`));
    }
    catch (err) {
        console.log(err)
    }
}

main();