const express = require('express');
const cors = require('cors');
const path = require("path");
const parser = require('body-parser');
const app = express();

// // const MongoClient = require('mongodb').MongoClient;
const mongoURI = "mongodb+srv://mahiman:Stillalive@cluster0-p69lf.mongodb.net/Eshop?retryWrites=true&w=majority";

const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const { json } = require('body-parser');

const mongoose = require('mongoose');

mongoose.connect(mongoURI,
    {
        useNewUrlParser: true, useUnifiedTopology: true,
        useCreateIndex: true, useFindAndModify: false
    })
    .then(() => console.log('DB connected'))
    .catch(err => console.error(err));


app.use(cors());
app.use(parser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());

// app.use('/api/users', require('./routes/users'));
app.use('/api/users2', require('./routes'));

app.use(express.static("../frontend/build"));

app.get('*', (req, res) => {
    res.sendFile(path.join(`${__dirname}/../frontend/build/index.html`));
});
const port = process.env.PORT || 8000

app.listen(port, () => {
    console.log(`server running at port ${port}`)
});