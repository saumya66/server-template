const express = require("express");
const { createUser } = require('../../services/user.service.js');
const passport = require("passport");

const authRoute = express.Router();

const isLoggedIn = (req, res, next) => { //checks if passport user is authenticated
    if (req.isAuthenticated()) {
        next();
    } else {
        res.sendStatus(401);
    }
}

// authRoute.post('/signin', createUser); dummy test

authRoute.get("/google/failure", (req, res) => {
    res.send({status: "failed"})
})
authRoute.get("/google/success", isLoggedIn, (req, res) => {
    console.log(req.user)
    res.send({user: req.user,status: "success"})
})

authRoute.get('/google',
    passport.authenticate('google', {
        scope:
            ['email' ,'profile']
        }
));

authRoute.get('/google/callback',
    passport.authenticate( 'google', {
        successRedirect: '/fire/auth/google/success',
        failureRedirect: '/fire/auth/google/failure'
    })
);

authRoute.get("/logout", (req, res) => { //clears all cookies thus logs user out
    req.session = null;
    req.logout();
    res.redirect('/');
})

module.exports = authRoute;