const express = require('express');
const userRoutes = express.Router();

// Require a User model in the routes module
// let User = require('./user.model');

// Define storage route for User
userRoutes.route('/add').post(function (request, response) {
    let user = new user(request.body);
    user.save()
      .then(() => {
          response.status(200).send("saved successfully");
      })
      .catch(() => {
          response.status(400).send("unable to save to the database");
      });
});