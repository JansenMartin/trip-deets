const express = require('express');
const userRoutes = express.Router();

// Require a User model in the routes module
// let User = require('./user.model');

// Define storage route for User
userRoutes.route('/add').post(function (request, response) {
    user.save()
      .then(() => {
          response.status(200).json({'business': 'business is added successfully'});
      })
      .catch(() => {
          response.status(400).send("unable to save to the database");
      });
});