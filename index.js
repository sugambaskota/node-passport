const express = require('express');
const authRoutes = require('./routes/auth-routes');
const profileRoutes = require('./routes/profile-routes');
const passport = require('passport');
require('./config/passport-setup');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const keys = require('./config/keys');

const app = express();

//set up view engine
app.set('view engine', 'ejs');

//use cookieSession
app.use(cookieSession({
    maxAge: 24*60*60*1000,
    keys: [keys.session.cookieKey]
}));

//initialize passport
app.use(passport.initialize());
app.use(passport.session());

//connect to mongodb
// mongoose.connect(keys.mongodb.dbURI, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true
// }, () => {
//     console.log('Connected to cloud database!');
// });

//set up public route
app.use(express.static(__dirname + '/public'));

//set up routes
app.use('/auth', authRoutes);
app.use('/profile', profileRoutes);

//create home route
app.get('/', (req, res) =>{
    res.render('home', {
        user: req.user
    });
});

//create 404 route
app.use('*', (req, res) => {
    res.render('404', {
        user: req.user
    });
});

//set up server
app.listen(3000, () => {
    console.log('App started on port 3000!');
});