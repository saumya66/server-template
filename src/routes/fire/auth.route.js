const express = require("express");
const { createUser } = require('../../services/user.service.js');
const passport = require("passport");

const authRoute = express.Router();

const isLoggedIn = (req, res, next) => {
    if (req.user) {
    next();
    } else {
    res.sendStatus(401);
    }
    }

authRoute.post('/signin', createUser);

authRoute.get("/", (req, res) => {
    res.json({message: "You are not logged in"})
})

authRoute.get("/failed", (req, res) => {
    res.send("Failed")
})
authRoute.get("/success",isLoggedIn, (req, res) => {
    res.send(`Welcome ${req.user.email}`)
})

authRoute.get('/google',
    passport.authenticate('google', {
        scope:
            ['email', 'profile']
        }
));

authRoute.get('/google/callback',
    passport.authenticate('google', {
        failureRedirect: '/failed',
    }),
    function (req, res) {
        res.redirect('/success')
    }
);

authRoute.get("/logout", (req, res) => {
    req.session = null;
    req.logout();
    res.redirect('/');
})

module.exports = authRoute;