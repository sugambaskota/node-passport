const express = require('express');
const router = express.Router();

const authCheck = (req, res, next) => {
    if(!req.user) {
       return res.redirect('/auth/login');
    }
    next();
}

router.get('/', authCheck, (req, res) => {
    res.render('profile', {
        user: req.user
    });
});

module.exports = router;