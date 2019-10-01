const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;
const keys = require('./keys');
const User = require('../models/user-model');

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    try {
        let user = await User.findById(id);
        return done(null, user);
    } catch (error) {
        return done(error, null);
    }
});

passport.use(new GoogleStrategy({
    callbackURL: '/auth/google/redirect',
    clientID: keys.google.clientID,
    clientSecret: keys.google.clientSecret
}, async (accessToken, refreshToken, profile, done) => {
    //check if user already exits in our db
    try {
        let currentUser = await User.findOne({
            socialId: profile.id
        });
        if (currentUser) {
            return done(null, currentUser);
        }
        let newUser = await User({
            socialId: profile.id,
            username: profile.displayName,
            email: profile.emails[0].value,
            provider: profile.provider,
            picURL: profile.photos[0].value
        }).save();
        done(null, newUser);
    } catch (error) {
        return done(error, null);
    }
}));

passport.use(new FacebookStrategy({
    clientID: keys.facebook.clientID,
    clientSecret: keys.facebook.clientSecret,
    callbackURL: '/auth/facebook/redirect',
    profileFields: ['id', 'displayName', 'picture.width(200).height(200)', 'first_name', 'middle_name', 'last_name', 'gender', 'email']
}, async (accessToken, refreshToken, profile, done) => {
    //check if user already exists in our db
    try {
        let currentUser = await User.findOne({
            socialId: profile.id
        });
        if (currentUser) {
            return done(null, currentUser);
        }
        let newUser = await User({
            socialId: profile.id,
            username: profile.displayName,
            email: profile.emails[0].value,
            provider: profile.provider,
            picURL: profile.photos[0].value
        }).save();
        done(null, newUser);
    } catch (error) {
        return done(error, null);
    }
}
));