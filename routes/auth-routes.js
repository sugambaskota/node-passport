const express = require('express');
const router = express.Router();
const passport = require('passport');

//auth login
router.get('/login', (req, res) => {
    res.render('login', {
        user: req.user
    });
});

//auth logout
router.get('/logout', (req, res) => {
    //handle with passport
    req.logOut();
    res.redirect('/');
});

//auth with google
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

//calback route for google to redirect to
router.get('/google/redirect', passport.authenticate('google'), (req, res) => {
    res.redirect('/profile');
});

//auth with facebook
router.get('/facebook', passport.authenticate('facebook', { scope: ['email'] }));

//calback route for facebook to redirect to
router.get('/facebook/redirect', passport.authenticate('facebook'), (req, res) => {
    res.redirect('/profile');
});

module.exports = router;