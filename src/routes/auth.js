var express = require('express');
var router = express.Router();

const redirectToProperties = res =>
    res.redirect(302, '/properties');

/* Sign in page */
router.get('/signin', function(req, res, next) {
    if (req.user) {
        return redirectToProperties(res);
    }

    res.render('auth/signin', {});
});

router.post('/signin', function(req, res, next) {
    // Save logged in user to our session
    req.session.user = {
        username: req.body.username || 'anonymous',
    };

    return redirectToProperties(res);
});

/* Sign Out */
router.get('/signout', function(req, res, next) {
    req.session.destroy();

    return redirectToProperties(res);
});

module.exports = router;
