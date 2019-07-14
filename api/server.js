const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const PORT = 4000
const cors = require('cors');
const mongoose = require('mongoose');
const config = require('./DB.js');
// const userRoute = require('./user.route'); <<----- Importing routes for user

// Requiring User model and Express router for tutorial purposes
const User = require('./user.model');
const router = express.Router();

// Creating a user for tutorial purposes
router.route('/create/').post((req, res) => {
    let user = new User(req.body);
    user.save().then( user => {
        res.status(200).json({'message': 'User successfully added'});
    })
    .catch(err => {
        res.status(400).send("Error when saving to the database");
    });
});

mongoose.Promise = global.Promise;
mongoose.connect(config.DB, { useNewUrlParser: true }).then(
    () => {console.log('Database is connected') },
    err => { console.log('Can not connect to the database'+ err)}
  );

app.use(cors());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

// app.use('/users', userRoute);  <--------

app.listen(PORT, function() {
    console.log('Server is running on Port:', PORT);
});