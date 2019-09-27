import express from 'express';
const router = express.Router();

//auth login
router.get('/login', (req, res) => {
    res.render('login');
});

//auth logout
router.get('/logout', (req, res) => {
    //handle with passport
    res.send('Logging out')
});

//auth with google
router.get('/google', (req, res) => {
    //handle with passport
    res.send('Logging in with google!');
});

module.exports = router;